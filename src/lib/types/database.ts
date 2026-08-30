import { 
  UserRole, 
  SubscriptionStatus, 
  AttendanceMethod, 
  AttendanceType,
  SalaryStatus,
  LoyaltyTransactionType,
  LoyaltySource,
  NotificationChannel,
  NotificationStatus,
  NotificationTemplateType
} from './enums';

export interface GymProfile {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  currency: string;
  notification_channels: {
    whatsapp: boolean;
    sms: boolean;
    email: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  gym_id: string | null;
  role: UserRole;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Membership {
  id: string;
  gym_id: string;
  name: string;
  description: string | null;
  price: number;
  duration_months: number;
  perks: string[];
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  member_id: string;
  membership_id: string;
  gym_id: string;
  start_date: string;
  end_date: string;
  status: SubscriptionStatus;
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
}

export interface AttendanceLog {
  id: string;
  user_id: string;
  gym_id: string;
  check_in_time: string;
  check_out_time: string | null;
  method: AttendanceMethod;
  type: AttendanceType;
  created_at: string;
}

export interface StaffSalary {
  id: string;
  staff_id: string;
  gym_id: string;
  base_salary: number;
  bonuses: number;
  deductions: number;
  payment_due_date: string;
  status: SalaryStatus;
  created_at: string;
  updated_at: string;
}

export interface LoyaltySettings {
  id: string;
  gym_id: string;
  points_per_checkin: number;
  points_per_renewal_currency: number;
  points_per_canteen_purchase: number;
  points_redemption_rate: number;
  created_at: string;
  updated_at: string;
}

export interface LoyaltyTransaction {
  id: string;
  member_id: string;
  gym_id: string;
  points: number;
  transaction_type: LoyaltyTransactionType;
  source: LoyaltySource;
  description: string | null;
  created_at: string;
}

export interface NotificationQueue {
  id: string;
  recipient_id: string;
  gym_id: string;
  channel: NotificationChannel;
  template_type: NotificationTemplateType;
  status: NotificationStatus;
  scheduled_for: string | null;
  sent_at: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserWithGym extends User {
  gym: GymProfile | null;
}

export interface SubscriptionWithDetails extends Subscription {
  member: User;
  membership: Membership;
  gym: GymProfile;
}

export interface AttendanceLogWithUser extends AttendanceLog {
  user: User;
}

export interface LoyaltyTransactionWithUser extends LoyaltyTransaction {
  user: User;
}