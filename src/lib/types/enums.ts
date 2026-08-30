export type UserRole = 'super_admin' | 'gym_owner' | 'staff' | 'member';
export type SubscriptionStatus = 'active' | 'expired' | 'frozen' | 'pending';
export type AttendanceMethod = 'qr_code' | 'id_password' | 'manual';
export type AttendanceType = 'member' | 'staff';
export type SalaryStatus = 'paid' | 'unpaid' | 'partially_paid';
export type LoyaltyTransactionType = 'earned' | 'redeemed';
export type LoyaltySource = 'attendance' | 'renewal' | 'canteen' | 'manual';
export type NotificationChannel = 'whatsapp' | 'sms' | 'email';
export type NotificationStatus = 'pending' | 'sent' | 'failed';
export type NotificationTemplateType = 
  | 'expiration_reminder'
  | 'salary_due'
  | 'loyalty_earned'
  | 'welcome'
  | 'checkin_success'
  | 'subscription_renewed';

export const UserRoleMap: Record<UserRole, string> = {
  super_admin: 'Super Administrator',
  gym_owner: 'Gym Owner',
  staff: 'Staff',
  member: 'Member'
};

export const SubscriptionStatusMap: Record<SubscriptionStatus, string> = {
  active: 'Active',
  expired: 'Expired',
  frozen: 'Frozen',
  pending: 'Pending'
};