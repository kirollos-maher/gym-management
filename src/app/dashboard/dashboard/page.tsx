'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { DashboardService } from '@/lib/services/dashboard.service';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { UpcomingRenewals } from '@/components/dashboard/UpcomingRenewals';
import { MemberDistribution } from '@/components/dashboard/MemberDistribution';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function DashboardPage() {
  const { profile, loading: authLoading } = useSupabase();
  const [stats, setStats] = useState<any>(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.gym_id) {
      fetchDashboardData();
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const gymId = profile!.gym_id!;

      const [
        statsData,
        attendance,
        revenue,
        distributionData,
        activity
      ] = await Promise.all([
        DashboardService.getDashboardStats(gymId),
        DashboardService.getAttendanceData(gymId),
        DashboardService.getRevenueData(gymId),
        DashboardService.getMemberDistribution(gymId),
        DashboardService.getRecentActivity(gymId)
      ]);

      setStats(statsData);
      setAttendanceData(attendance);
      setRevenueData(revenue);
      setDistribution(distributionData);
      setRecentActivity(activity);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back! Here's what's happening with your gym today.
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <span>🔄</span> Refresh
        </button>
      </div>

      {stats && <DashboardStats stats={stats} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <AttendanceChart data={attendanceData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MemberDistribution data={distribution} />
        </div>
        <div className="lg:col-span-2">
          <UpcomingRenewals subscriptions={stats?.expiringMembers || []} />
        </div>
      </div>

      <RecentActivity activities={recentActivity} />
    </div>
  );
}