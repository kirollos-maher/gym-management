import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/types/database.types';

type AttendanceLog = Database['public']['Tables']['attendance_logs']['Row'];
type AttendanceMethod = 'qr_code' | 'id_password' | 'manual';
type AttendanceType = 'member' | 'staff';

export class AttendanceService {
  private static supabase = createClient();

  static async hasActiveSubscription(userId: string): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await this.supabase
      .from('subscriptions')
      .select('id, end_date, status')
      .eq('member_id', userId)
      .eq('status', 'active')
      .gte('end_date', today)
      .order('end_date', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return false;
    }

    return data.status === 'active' && data.end_date >= today;
  }

  static async checkIn(
    userId: string,
    gymId: string,
    method: AttendanceMethod,
    type: AttendanceType
  ): Promise<AttendanceLog | null> {
    if (type === 'member') {
      const hasActive = await this.hasActiveSubscription(userId);
      if (!hasActive) {
        throw new Error('Member does not have an active subscription');
      }
    }

    const { data: existing, error: checkError } = await this.supabase
      .from('attendance_logs')
      .select('*')
      .eq('user_id', userId)
      .is('check_out_time', null)
      .order('check_in_time', { ascending: false })
      .limit(1);

    if (checkError) {
      console.error('Error checking existing attendance:', checkError);
    }

    if (existing && existing.length > 0) {
      throw new Error('User already checked in without check-out');
    }

    const { data, error } = await this.supabase
      .from('attendance_logs')
      .insert({
        user_id: userId,
        gym_id: gymId,
        method,
        type
      })
      .select()
      .single();

    if (error) {
      console.error('Error recording check-in:', error);
      return null;
    }

    return data;
  }

  static async checkOut(userId: string, gymId: string): Promise<AttendanceLog | null> {
    const { data, error } = await this.supabase
      .from('attendance_logs')
      .update({
        check_out_time: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('gym_id', gymId)
      .is('check_out_time', null)
      .order('check_in_time', { ascending: false })
      .limit(1)
      .select()
      .single();

    if (error) {
      console.error('Error recording check-out:', error);
      return null;
    }
    return data;
  }

  static async getTodayAttendance(gymId: string) {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const { data, error } = await this.supabase
      .from('attendance_logs')
      .select('*, user:users(full_name, email, phone, role)')
      .eq('gym_id', gymId)
      .gte('check_in_time', today)
      .lt('check_in_time', tomorrow)
      .order('check_in_time', { ascending: false });

    if (error) {
      console.error('Error fetching today\'s attendance:', error);
      return [];
    }
    return data;
  }

  static async getMemberHistory(memberId: string, limit: number = 50) {
    const { data, error } = await this.supabase
      .from('attendance_logs')
      .select('*')
      .eq('user_id', memberId)
      .eq('type', 'member')
      .order('check_in_time', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching attendance history:', error);
      return [];
    }
    return data;
  }

  static async validateQRCode(qrData: string): Promise<{
    user_id: string;
    gym_id: string;
    valid: boolean;
  }> {
    try {
      const payload = JSON.parse(atob(qrData));
      
      if (Date.now() - payload.timestamp > 600000) {
        return { ...payload, valid: false };
      }

      const hasActive = await this.hasActiveSubscription(payload.user_id);
      return { ...payload, valid: hasActive };
    } catch (error) {
      return { user_id: '', gym_id: '', valid: false };
    }
  }

  static generateQRCodeData(userId: string, gymId: string): string {
    const payload = {
      user_id: userId,
      gym_id: gymId,
      timestamp: Date.now(),
      type: 'checkin'
    };
    return btoa(JSON.stringify(payload));
  }
}