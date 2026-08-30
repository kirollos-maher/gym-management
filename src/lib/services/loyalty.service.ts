import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/types/database.types';

type LoyaltyTransaction = Database['public']['Tables']['loyalty_transactions']['Row'];
type LoyaltySettings = Database['public']['Tables']['loyalty_settings']['Row'];
type LoyaltySource = 'attendance' | 'renewal' | 'canteen' | 'manual';

export class LoyaltyService {
  private static supabase = createClient();

  static async getGymSettings(gymId: string): Promise<LoyaltySettings | null> {
    const { data, error } = await this.supabase
      .from('loyalty_settings')
      .select('*')
      .eq('gym_id', gymId)
      .single();

    if (error) {
      console.error('Error fetching loyalty settings:', error);
      return null;
    }
    return data;
  }

  static async getMemberBalance(memberId: string, gymId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('loyalty_transactions')
      .select('points, transaction_type')
      .eq('member_id', memberId)
      .eq('gym_id', gymId);

    if (error || !data) {
      console.error('Error fetching loyalty balance:', error);
      return 0;
    }

    return data.reduce((balance, transaction) => {
      return transaction.transaction_type === 'earned' 
        ? balance + transaction.points 
        : balance - transaction.points;
    }, 0);
  }

  static async addLoyaltyPoints(
    memberId: string,
    gymId: string,
    source: LoyaltySource,
    points: number,
    description?: string
  ): Promise<LoyaltyTransaction | null> {
    const { data, error } = await this.supabase
      .from('loyalty_transactions')
      .insert({
        member_id: memberId,
        gym_id: gymId,
        points,
        transaction_type: 'earned',
        source,
        description: description || `Earned ${points} points from ${source}`
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding loyalty points:', error);
      return null;
    }

    return data;
  }

  static async processCheckInLoyalty(
    memberId: string,
    gymId: string
  ): Promise<LoyaltyTransaction | null> {
    const settings = await this.getGymSettings(gymId);
    if (!settings || settings.points_per_checkin <= 0) {
      return null;
    }

    return this.addLoyaltyPoints(
      memberId,
      gymId,
      'attendance',
      settings.points_per_checkin,
      `Earned ${settings.points_per_checkin} points for check-in`
    );
  }

  static async redeemPoints(
    memberId: string,
    gymId: string,
    pointsToRedeem: number,
    description?: string
  ): Promise<LoyaltyTransaction | null> {
    const balance = await this.getMemberBalance(memberId, gymId);
    if (balance < pointsToRedeem) {
      throw new Error(`Insufficient points. Available: ${balance}, Requested: ${pointsToRedeem}`);
    }

    const { data, error } = await this.supabase
      .from('loyalty_transactions')
      .insert({
        member_id: memberId,
        gym_id: gymId,
        points: pointsToRedeem,
        transaction_type: 'redeemed',
        source: 'manual',
        description: description || `Redeemed ${pointsToRedeem} points`
      })
      .select()
      .single();

    if (error) {
      console.error('Error redeeming points:', error);
      return null;
    }

    return data;
  }

  static async getMemberHistory(memberId: string, gymId: string, limit: number = 50) {
    const { data, error } = await this.supabase
      .from('loyalty_transactions')
      .select('*')
      .eq('member_id', memberId)
      .eq('gym_id', gymId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching loyalty history:', error);
      return [];
    }
    return data;
  }
}