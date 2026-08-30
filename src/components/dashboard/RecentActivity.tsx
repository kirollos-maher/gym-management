'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { User, Clock, CheckCircle } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface RecentActivityProps {
  activities: Array<{
    id: string;
    user: {
      full_name: string;
      email: string;
    };
    check_in_time: string;
    method: string;
  }>;
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.user?.full_name || 'Unknown Member'}
                </p>
                <p className="text-xs text-gray-500">
                  {activity.user?.email || 'No email'}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDateTime(activity.check_in_time)}
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Checked In
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs text-gray-400">
                  {activity.method === 'qr_code' ? '📱 QR' : '✏️ Manual'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}