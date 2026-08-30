'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar, AlertTriangle, User } from 'lucide-react';
import { formatDate, daysBetween } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface UpcomingRenewalsProps {
  subscriptions: Array<{
    id: string;
    end_date: string;
    user: {
      full_name: string;
      email: string;
    };
  }>;
}

export function UpcomingRenewals({ subscriptions }: UpcomingRenewalsProps) {
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Renewals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No upcoming renewals</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Renewals</CardTitle>
        <p className="text-sm text-gray-500">Members expiring in the next 7 days</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {subscriptions.map((sub) => {
            const daysRemaining = daysBetween(new Date(), sub.end_date);
            const isUrgent = daysRemaining <= 2;

            return (
              <div
                key={sub.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {sub.user?.full_name || 'Unknown Member'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {sub.user?.email || 'No email'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatDate(sub.end_date)}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {daysRemaining} days remaining
                    </span>
                    {isUrgent && (
                      <Badge variant="error" className="animate-pulse">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}