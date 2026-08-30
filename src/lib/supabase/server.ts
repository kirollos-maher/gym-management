import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createServerClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ 
    cookies: () => cookieStore,
    supabaseUrl,
    supabaseKey: supabaseAnonKey
  });
};