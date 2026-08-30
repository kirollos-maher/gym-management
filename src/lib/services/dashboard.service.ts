import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/types/database.types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type AttendanceLog = Database['public']['Tables']['attendance_logs']['Row'];

export class DashboardService {
  private static supabase = createClient();

  /**
   * Get dashboard statistics for a gym
   */
  static async getDashboardStats(gymId: string) {
    const today = new Date().toISOString().split('T')[0];
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const startOfMonthStr = startOfMonth.toISOString().split('T')[0];

    try {
      // Get total members
      const { count: totalMembers } = await this.supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('gym_id', gymId)
        .eq('role', 'member');

      // Get active members (with active subscription)
      const { data: activeSubscriptions } = await this.supabase
        .from('subscriptions')
        .select('member_id')
        .eq('gym_id', gymId)
        .eq('status', 'active')
        .gte('end_date', today);

      const activeMembers = activeSubscriptions?.length || 0;

      // Get today's check-ins
      const { data: todayCheckIns } = await this.supabase
        .from('attendance_logs')
        .select('*')
        .eq('gym_id', gymId)
        .eq('type', 'member')
        .gte('check_in_time', today);

      const todayCheckInsCount = todayCheckIns?.length || 0;

      // Get monthly revenue (from subscriptions)
      const { data: monthlySubscriptions } = await this.supabase
        .from('subscriptions')
        .select('membership:memberships(price)')
        .eq('gym_id', gymId)
        .eq('status', 'active')
        .gte('start_date', startOfMonthStr);

      const monthlyRevenue = monthlySubscriptions?.reduce((total, sub) => {
        return total + (sub.membership?.price || 0);
      }, 0) || 0;

      // Get expiring members (next 7 days)
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
      const sevenDaysLaterStr = sevenDaysLater.toISOString().split('T')[0];

      const { data: expiringSubscriptions } = await this.supabase
        .from('subscriptions')
        .select('*, user:users(full_name, email)')
        .eq('gym_id', gymId)
        .eq('status', 'active')
        .lte('end_date', sevenDaysLaterStr)
        .gte('end_date', today);

      // Get upcoming salary dues (next 7 days)
      const { data: upcomingSalaries } = await this.supabase
        .from('staff_salaries')
        .select('*, staff:users(full_name)')
        .eq('gym_id', gymId)
        .eq('status', 'unpaid')
        .lte('payment_due_date', sevenDaysLaterStr)
        .gte('payment_due_date', today);

      return {
        totalMembers: totalMembers || 0,
        activeMembers,
        todayCheckIns: todayCheckInsCount,
        monthlyRevenue,
        expiringMembers: expiringSubscriptions || [],
        upcomingSalaries: upcomingSalaries || [],
        checkInRate: totalMembers ? Math.round((todayCheckInsCount / totalMembers) * 100) : 0
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return null;
    }
  }

  /**
   * Get attendance data for charts (last 30 days)
   */
  static async getAttendanceData(gymId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split('T')[0];

    const { data, error } = await this.supabase
      .from('attendance_logs')
      .select('check_in_time')
      .eq('gym_id', gymId)
      .eq('type', 'member')
      .gte('check_in_time', startDateStr);

    if (error || !data) {
      console.error('Error fetching attendance data:', error);
      return [];
    }

    // Group by date
    const dateMap = new Map();
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dateMap.set(dateStr, 0);
    }

    data.forEach(log => {
      const date = log.check_in_time.split('T')[0];
      if (dateMap.has(date)) {
        dateMap.set(date, dateMap.get(date) + 1);
      }
    });

    return Array.from(dateMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Get revenue data for charts (last 30 days)
   */
  static async getRevenueData(gymId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split('T')[0];

    const { data, error } = await this.supabase
      .from('subscriptions')
      .select('start_date, membership:memberships(price)')
      .eq('gym_id', gymId)
      .eq('status', 'active')
      .gte('start_date', startDateStr);

    if (error || !data) {
      console.error('Error fetching revenue data:', error);
      return [];
    }

    // Group by date
    const dateMap = new Map();
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dateMap.set(dateStr, 0);
    }

    data.forEach(sub => {
      const date = sub.start_date;
      if (dateMap.has(date)) {
        dateMap.set(date, dateMap.get(date) + (sub.membership?.price || 0));
      }
    });

    return Array.from(dateMap.entries())
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Get member distribution (by membership type)
   */
  static async getMemberDistribution(gymId: string) {
    const { data, error } = await this.supabase
      .from('subscriptions')
      .select('membership:memberships(name)')
      .eq('gym_id', gymId)
      .eq('status', 'active');

    if (error || !data) {
      console.error('Error fetching member distribution:', error);
      return [];
    }

    const distribution = new Map();
    data.forEach(sub => {
      const name = sub.membership?.name || 'Unknown';
      distribution.set(name, (distribution.get(name) || 0) + 1);
    });

    return Array.from(distribution.entries())
      .map(([name, count]) => ({ name, count }));
  }

  /**
   * Get recent activity (last 10 check-ins)
   */
  static async getRecentActivity(gymId: string, limit: number = 10) {
    const { data, error } = await this.supabase
      .from('attendance_logs')
      .select('*, user:users(full_name, email)')
      .eq('gym_id', gymId)
      .order('check_in_time', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }

    return data;
  }
}