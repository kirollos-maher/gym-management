import { supabase } from '../supabase/client';
import { 
  NotificationQueue, 
  NotificationChannel,
  NotificationTemplateType,
  CreateNotificationInput
} from '../types/database';
import { User, Subscription, StaffSalary } from '../types/database';

// External API clients (placeholders - actual implementation would use real APIs)
const whatsappClient = {
  send: async (to: string, body: string) => {
    console.log(`[WhatsApp] Sending to ${to}: ${body}`);
    // Implement actual WhatsApp API call here
    return { success: true, messageId: 'whatsapp_' + Date.now() };
  }
};

const smsClient = {
  send: async (to: string, body: string) => {
    console.log(`[SMS] Sending to ${to}: ${body}`);
    // Implement actual SMS gateway call here
    return { success: true, messageId: 'sms_' + Date.now() };
  }
};

const emailClient = {
  send: async (to: string, subject: string, body: string) => {
    console.log(`[Email] Sending to ${to}: ${subject}`);
    // Implement actual email service call here (Resend, SendGrid, etc.)
    return { success: true, messageId: 'email_' + Date.now() };
  }
};

export class NotificationService {
  /**
   * Create a notification in the queue
   */
  static async createNotification(
    input: CreateNotificationInput
  ): Promise<NotificationQueue | null> {
    const { data, error } = await supabase
      .from('notifications_queue')
      .insert(input)
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return null;
    }
    return data;
  }

  /**
   * Send a notification immediately (bypass queue)
   */
  static async sendNotificationImmediately(
    recipientId: string,
    gymId: string,
    channel: NotificationChannel,
    templateType: NotificationTemplateType,
    templateData: Record<string, any>
  ): Promise<boolean> {
    // Get recipient details
    const { data: recipient } = await supabase
      .from('users')
      .select('*')
      .eq('id', recipientId)
      .single();

    if (!recipient) return false;

    // Get gym details for branding
    const { data: gym } = await supabase
      .from('gym_profiles')
      .select('*')
      .eq('id', gymId)
      .single();

    if (!gym) return false;

    // Render template based on type
    const { subject, body } = this.renderTemplate(
      templateType,
      templateData,
      recipient,
      gym
    );

    // Send via appropriate channel
    let success = false;
    let errorMessage = null;

    try {
      switch (channel) {
        case 'whatsapp':
          if (recipient.phone) {
            const result = await whatsappClient.send(recipient.phone, body);
            success = result.success;
          }
          break;
        case 'sms':
          if (recipient.phone) {
            const result = await smsClient.send(recipient.phone, body);
            success = result.success;
          }
          break;
        case 'email':
          if (recipient.email) {
            const result = await emailClient.send(recipient.email, subject, body);
            success = result.success;
          }
          break;
      }
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error sending notification:', error);
    }

    // Update notification status
    await supabase
      .from('notifications_queue')
      .update({
        status: success ? 'sent' : 'failed',
        sent_at: success ? new Date().toISOString() : null,
        error_message: errorMessage
      })
      .eq('recipient_id', recipientId)
      .eq('gym_id', gymId)
      .eq('template_type', templateType)
      .is('scheduled_for', null)
      .order('created_at', { ascending: false })
      .limit(1);

    return success;
  }

  /**
   * Send expiration reminder notification
   */
  static async sendExpirationReminder(
    member: User,
    subscription: Subscription,
    gym: GymProfile,
    daysUntilExpiration: number
  ): Promise<void> {
    const templateData = {
      member_name: member.full_name || 'Member',
      gym_name: gym.name,
      days_remaining: daysUntilExpiration,
      expiration_date: new Date(subscription.end_date).toLocaleDateString(),
      plan_name: subscription.membership_id // This would be fetched from membership table
    };

    const channels = gym.notification_channels;
    
    // Queue notifications for each enabled channel
    const channelTypes: NotificationChannel[] = [];
    if (channels.whatsapp) channelTypes.push('whatsapp');
    if (channels.sms) channelTypes.push('sms');
    if (channels.email) channelTypes.push('email');

    for (const channel of channelTypes) {
      await this.createNotification({
        recipient_id: member.id,
        gym_id: gym.id,
        channel,
        template_type: 'expiration_reminder',
        scheduled_for: new Date().toISOString()
      });
    }
  }

  /**
   * Send salary due reminder to gym owner
   */
  static async sendSalaryDueReminder(
    staff: User,
    salary: StaffSalary,
    gym: GymProfile
  ): Promise<void> {
    // Find gym owner
    const { data: owner } = await supabase
      .from('users')
      .select('*')
      .eq('gym_id', gym.id)
      .eq('role', 'gym_owner')
      .single();

    if (!owner) return;

    const templateData = {
      staff_name: staff.full_name || 'Staff Member',
      gym_name: gym.name,
      due_date: new Date(salary.payment_due_date).toLocaleDateString(),
      amount: salary.base_salary + salary.bonuses - salary.deductions
    };

    const channels = gym.notification_channels;
    const channelTypes: NotificationChannel[] = [];
    if (channels.whatsapp) channelTypes.push('whatsapp');
    if (channels.sms) channelTypes.push('sms');
    if (channels.email) channelTypes.push('email');

    for (const channel of channelTypes) {
      await this.createNotification({
        recipient_id: owner.id,
        gym_id: gym.id,
        channel,
        template_type: 'salary_due',
        scheduled_for: new Date().toISOString()
      });
    }
  }

  /**
   * Send loyalty earned notification
   */
  static async sendLoyaltyEarnedNotification(
    memberId: string,
    gymId: string,
    points: number,
    source: string
  ): Promise<void> {
    const { data: member } = await supabase
      .from('users')
      .select('*')
      .eq('id', memberId)
      .single();

    const { data: gym } = await supabase
      .from('gym_profiles')
      .select('*')
      .eq('id', gymId)
      .single();

    if (!member || !gym) return;

    const templateData = {
      member_name: member.full_name || 'Member',
      gym_name: gym.name,
      points_earned: points,
      source: source,
      current_balance: await this.getMemberBalance(memberId, gymId)
    };

    const channels = gym.notification_channels;
    const channelTypes: NotificationChannel[] = [];
    if (channels.whatsapp) channelTypes.push('whatsapp');
    if (channels.sms) channelTypes.push('sms');
    if (channels.email) channelTypes.push('email');

    for (const channel of channelTypes) {
      await this.createNotification({
        recipient_id: memberId,
        gym_id: gymId,
        channel,
        template_type: 'loyalty_earned',
        scheduled_for: new Date().toISOString()
      });
    }
  }

  /**
   * Get member's current loyalty balance (helper)
   */
  private static async getMemberBalance(memberId: string, gymId: string): Promise<number> {
    const { data, error } = await supabase
      .from('loyalty_transactions')
      .select('points, transaction_type')
      .eq('member_id', memberId)
      .eq('gym_id', gymId);

    if (error || !data) return 0;

    return data.reduce((balance, transaction) => {
      return transaction.transaction_type === 'earned' 
        ? balance + transaction.points 
        : balance - transaction.points;
    }, 0);
  }

  /**
   * Render notification template
   */
  private static renderTemplate(
    templateType: NotificationTemplateType,
    data: Record<string, any>,
    recipient: User,
    gym: GymProfile
  ): { subject: string; body: string } {
    const templates: Record<NotificationTemplateType, (data: any) => { subject: string; body: string }> = {
      expiration_reminder: (d) => ({
        subject: `⏰ Membership Expiring Soon - ${d.gym_name}`,
        body: `Dear ${d.member_name},\n\nYour membership at ${d.gym_name} will expire in ${d.days_remaining} days (${d.expiration_date}).\n\nPlease renew your subscription to continue enjoying our services.\n\nBest regards,\n${d.gym_name} Team`
      }),
      salary_due: (d) => ({
        subject: `💰 Salary Due Reminder - ${d.gym_name}`,
        body: `Dear Admin,\n\nThis is a reminder that salary for ${d.staff_name} is due on ${d.due_date}.\n\nAmount: $${d.amount.toFixed(2)}\n\nPlease process the payment accordingly.\n\nBest regards,\n${d.gym_name} Payroll System`
      }),
      loyalty_earned: (d) => ({
        subject: `⭐ Loyalty Points Earned - ${d.gym_name}`,
        body: `Congratulations ${d.member_name}!\n\nYou've earned ${d.points_earned} loyalty points from ${d.source}.\n\nCurrent balance: ${d.current_balance} points\n\nKeep earning more points for exclusive rewards!\n\nBest regards,\n${d.gym_name} Team`
      }),
      welcome: (d) => ({
        subject: `👋 Welcome to ${d.gym_name}!`,
        body: `Welcome ${d.member_name}!\n\nWe're excited to have you at ${d.gym_name}.\n\nYour membership is now active. Feel free to check in using your QR code or member ID.\n\nBest regards,\n${d.gym_name} Team`
      }),
      checkin_success: (d) => ({
        subject: `✅ Check-in Successful - ${d.gym_name}`,
        body: `Hi ${d.member_name},\n\nYou've successfully checked in at ${d.gym_name}.\n\nTime: ${d.checkin_time}\n\nThank you for visiting!\n\nBest regards,\n${d.gym_name} Team`
      }),
      subscription_renewed: (d) => ({
        subject: `🔄 Subscription Renewed - ${d.gym_name}`,
        body: `Dear ${d.member_name},\n\nYour subscription at ${d.gym_name} has been successfully renewed.\n\nNew expiration date: ${d.new_expiration_date}\n\nWe appreciate your continued trust!\n\nBest regards,\n${d.gym_name} Team`
      })
    };

    const template = templates[templateType];
    if (!template) {
      return {
        subject: `Notification from ${gym.name}`,
        body: `You have a new notification from ${gym.name}`
      };
    }

    return template(data);
  }

  /**
   * Process pending notifications (background job)
   */
  static async processPendingNotifications(): Promise<void> {
    const { data: notifications, error } = await supabase
      .from('notifications_queue')
      .select('*')
      .eq('status', 'pending')
      .or(`scheduled_for.is.null,scheduled_for.lte.${new Date().toISOString()}`)
      .limit(100);

    if (error || !notifications) {
      console.error('Error fetching pending notifications:', error);
      return;
    }

    for (const notification of notifications) {
      await this.sendNotificationImmediately(
        notification.recipient_id,
        notification.gym_id,
        notification.channel,
        notification.template_type,
        {} // Template data would need to be fetched
      );
    }
  }
}

// Export singleton instance
export const notificationService = NotificationService;