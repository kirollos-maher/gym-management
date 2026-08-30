import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = createServerSupabaseClient();
        const { data, error } = await supabase
            .from('gym_profiles')
            .select('*')
            .limit(1);
        
        if (error) {
            return NextResponse.json({ 
                success: false, 
                error: error.message 
            }, { status: 500 });
        }
        
        return NextResponse.json({ 
            success: true, 
            data,
            message: '✅ Connected to Supabase successfully!'
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}