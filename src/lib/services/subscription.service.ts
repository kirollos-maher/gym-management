import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/types/database.types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export class SubscriptionService {
  private static supabase = createClient();

  static async createSubscription(
    memberId: string,
    membershipId: string,
    gymId: string,
    startDate: string,
    endDate: string,
    autoRenew: boolean = false
  ): Promise<Subscription | null> {
    const { data, error } = await this.supabase
      .from('subscriptions')
      .insert({
        member_id: memberId,
        membership_id: membershipId,
        gym_id: gymId,
        start_date: startDate,
        end_date: endDate,
        auto_renew: autoRenew,
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating subscription:', error);
      return null;
    }
    return data;
  }

  static async getMemberActiveSubscription(memberId: string): Promise<Subscription | null> {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await this.supabase
      .from('subscriptions')
      .select('*, membership:memberships(*)')
      .eq('member_id', memberId)
      .eq('status', 'active')
      .gte('end_date', today)
      .order('end_date', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching active subscription:', error);
      return null;
    }
    return data;
  }

  static async renewSubscription(
    subscriptionId: string,
    newEndDate: string
  ): Promise<Subscription | null> {
    const { data, error } = await this.supabase
      .from('subscriptions')
      .update({
        end_date: newEndDate,
        status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriptionId)
      .select()
      .single();

    if (error) {
      console.error('Error renewing subscription:', error);
      return null;
    }
    return data;
  }

  static async getExpiringSubscriptions(daysThreshold: number = 7) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysThreshold);
    const targetDateStr = targetDate.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await this.supabase
      .from('subscriptions')
      .select('*, member:users(*), gym:gym_profiles(*)')
      .eq('status', 'active')
      .lte('end_date', targetDateStr)
      .gte('end_date', today);

    if (error) {
      console.error('Error fetching expiring subscriptions:', error);
      return [];
    }
    return data;
  }
}