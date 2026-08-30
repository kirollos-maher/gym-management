import { z } from 'zod';

// User validation
export const userSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  role: z.enum(['super_admin', 'gym_owner', 'staff', 'member'])
});

// Membership validation
export const membershipSchema = z.object({
  name: z.string().min(2, 'Membership name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  duration_months: z.number().int().positive('Duration must be positive integer'),
  perks: z.array(z.string()).default([])
});

// Subscription validation
export const subscriptionSchema = z.object({
  member_id: z.string().uuid('Invalid member ID'),
  membership_id: z.string().uuid('Invalid membership ID'),
  gym_id: z.string().uuid('Invalid gym ID'),
  start_date: z.string().date('Invalid start date'),
  end_date: z.string().date('Invalid end date'),
  auto_renew: z.boolean().default(false)
});

// Attendance validation
export const attendanceSchema = z.object({
  user_id: z.string().uuid('Invalid user ID'),
  gym_id: z.string().uuid('Invalid gym ID'),
  method: z.enum(['qr_code', 'id_password', 'manual']),
  type: z.enum(['member', 'staff'])
});

// Loyalty settings validation
export const loyaltySettingsSchema = z.object({
  points_per_checkin: z.number().int().min(0, 'Points must be 0 or more'),
  points_per_renewal_currency: z.number().min(0, 'Points must be 0 or more'),
  points_per_canteen_purchase: z.number().min(0, 'Points must be 0 or more'),
  points_redemption_rate: z.number().min(0, 'Redemption rate must be 0 or more')
});

// Staff salary validation
export const staffSalarySchema = z.object({
  staff_id: z.string().uuid('Invalid staff ID'),
  gym_id: z.string().uuid('Invalid gym ID'),
  base_salary: z.number().positive('Base salary must be positive'),
  bonuses: z.number().min(0, 'Bonuses cannot be negative').default(0),
  deductions: z.number().min(0, 'Deductions cannot be negative').default(0),
  payment_due_date: z.string().date('Invalid date')
});

// Notification validation
export const notificationSchema = z.object({
  recipient_id: z.string().uuid('Invalid recipient ID'),
  gym_id: z.string().uuid('Invalid gym ID'),
  channel: z.enum(['whatsapp', 'sms', 'email']),
  template_type: z.enum([
    'expiration_reminder',
    'salary_due',
    'loyalty_earned',
    'welcome',
    'checkin_success',
    'subscription_renewed'
  ]),
  scheduled_for: z.string().datetime().optional()
});

// Export types from schemas
export type UserInput = z.infer<typeof userSchema>;
export type MembershipInput = z.infer<typeof membershipSchema>;
export type SubscriptionInput = z.infer<typeof subscriptionSchema>;
export type AttendanceInput = z.infer<typeof attendanceSchema>;
export type LoyaltySettingsInput = z.infer<typeof loyaltySettingsSchema>;
export type StaffSalaryInput = z.infer<typeof staffSalarySchema>;
export type NotificationInput = z.infer<typeof notificationSchema>;