import { createServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { AttendanceService } from '@/lib/services/attendance.service';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { user_id, gym_id, method, type } = body;

    // Validate input
    if (!user_id || !gym_id || !method || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Process check-in
    const result = await AttendanceService.checkIn(
      user_id,
      gym_id,
      method,
      type
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to process check-in' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      check_in: result
    });

  } catch (error) {
    console.error('Check-in API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const gymId = searchParams.get('gym_id');

    if (!gymId) {
      return NextResponse.json(
        { error: 'gym_id is required' },
        { status: 400 }
      );
    }

    const attendance = await AttendanceService.getTodayAttendance(gymId);

    return NextResponse.json({
      success: true,
      attendance
    });

  } catch (error) {
    console.error('Attendance fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}