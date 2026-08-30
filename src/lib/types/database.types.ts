export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      gym_profiles: {
        Row: {
          id: string
          name: string
          slug: string
          address: string | null
          phone: string | null
          email: string | null
          currency: string
          notification_channels: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          address?: string | null
          phone?: string | null
          email?: string | null
          currency?: string
          notification_channels?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          currency?: string
          notification_channels?: Json
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          gym_id: string | null
          role: 'super_admin' | 'gym_owner' | 'staff' | 'member'
          full_name: string | null
          phone: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          gym_id?: string | null
          role?: 'super_admin' | 'gym_owner' | 'staff' | 'member'
          full_name?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          gym_id?: string | null
          role?: 'super_admin' | 'gym_owner' | 'staff' | 'member'
          full_name?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      memberships: {
        Row: {
          id: string
          gym_id: string
          name: string
          description: string | null
          price: number
          duration_months: number
          perks: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          gym_id: string
          name: string
          description?: string | null
          price: number
          duration_months: number
          perks?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          gym_id?: string
          name?: string
          description?: string | null
          price?: number
          duration_months?: number
          perks?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          member_id: string
          membership_id: string
          gym_id: string
          start_date: string
          end_date: string
          status: 'active' | 'expired' | 'frozen' | 'pending'
          auto_renew: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          member_id: string
          membership_id: string
          gym_id: string
          start_date: string
          end_date: string
          status?: 'active' | 'expired' | 'frozen' | 'pending'
          auto_renew?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          member_id?: string
          membership_id?: string
          gym_id?: string
          start_date?: string
          end_date?: string
          status?: 'active' | 'expired' | 'frozen' | 'pending'
          auto_renew?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      attendance_logs: {
        Row: {
          id: string
          user_id: string
          gym_id: string
          check_in_time: string
          check_out_time: string | null
          method: 'qr_code' | 'id_password' | 'manual'
          type: 'member' | 'staff'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          gym_id: string
          check_in_time?: string
          check_out_time?: string | null
          method: 'qr_code' | 'id_password' | 'manual'
          type: 'member' | 'staff'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          gym_id?: string
          check_in_time?: string
          check_out_time?: string | null
          method?: 'qr_code' | 'id_password' | 'manual'
          type?: 'member' | 'staff'
          created_at?: string
        }
      }
      staff_salaries: {
        Row: {
          id: string
          staff_id: string
          gym_id: string
          base_salary: number
          bonuses: number
          deductions: number
          payment_due_date: string
          status: 'paid' | 'unpaid' | 'partially_paid'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          staff_id: string
          gym_id: string
          base_salary: number
          bonuses?: number
          deductions?: number
          payment_due_date: string
          status?: 'paid' | 'unpaid' | 'partially_paid'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          staff_id?: string
          gym_id?: string
          base_salary?: number
          bonuses?: number
          deductions?: number
          payment_due_date?: string
          status?: 'paid' | 'unpaid' | 'partially_paid'
          created_at?: string
          updated_at?: string
        }
      }
      loyalty_settings: {
        Row: {
          id: string
          gym_id: string
          points_per_checkin: number
          points_per_renewal_currency: number
          points_per_canteen_purchase: number
          points_redemption_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          gym_id: string
          points_per_checkin?: number
          points_per_renewal_currency?: number
          points_per_canteen_purchase?: number
          points_redemption_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          gym_id?: string
          points_per_checkin?: number
          points_per_renewal_currency?: number
          points_per_canteen_purchase?: number
          points_redemption_rate?: number
          created_at?: string
          updated_at?: string
        }
      }
      loyalty_transactions: {
        Row: {
          id: string
          member_id: string
          gym_id: string
          points: number
          transaction_type: 'earned' | 'redeemed'
          source: 'attendance' | 'renewal' | 'canteen' | 'manual'
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          member_id: string
          gym_id: string
          points: number
          transaction_type: 'earned' | 'redeemed'
          source: 'attendance' | 'renewal' | 'canteen' | 'manual'
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          member_id?: string
          gym_id?: string
          points?: number
          transaction_type?: 'earned' | 'redeemed'
          source?: 'attendance' | 'renewal' | 'canteen' | 'manual'
          description?: string | null
          created_at?: string
        }
      }
      notifications_queue: {
        Row: {
          id: string
          recipient_id: string
          gym_id: string
          channel: 'whatsapp' | 'sms' | 'email'
          template_type: 'expiration_reminder' | 'salary_due' | 'loyalty_earned' | 'welcome' | 'checkin_success' | 'subscription_renewed'
          status: 'pending' | 'sent' | 'failed'
          scheduled_for: string | null
          sent_at: string | null
          error_message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          recipient_id: string
          gym_id: string
          channel: 'whatsapp' | 'sms' | 'email'
          template_type: 'expiration_reminder' | 'salary_due' | 'loyalty_earned' | 'welcome' | 'checkin_success' | 'subscription_renewed'
          status?: 'pending' | 'sent' | 'failed'
          scheduled_for?: string | null
          sent_at?: string | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          recipient_id?: string
          gym_id?: string
          channel?: 'whatsapp' | 'sms' | 'email'
          template_type?: 'expiration_reminder' | 'salary_due' | 'loyalty_earned' | 'welcome' | 'checkin_success' | 'subscription_renewed'
          status?: 'pending' | 'sent' | 'failed'
          scheduled_for?: string | null
          sent_at?: string | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}