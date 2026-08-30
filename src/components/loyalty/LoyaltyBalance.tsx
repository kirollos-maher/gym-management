'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLoyalty } from '@/hooks/useLoyalty';
import { Award } from 'lucide-react';

interface LoyaltyBalanceProps {
  memberId: string;
  gymId: string;
}

export function LoyaltyBalance({ memberId, gymId }: LoyaltyBalanceProps) {
  const { balance, loading, error } = useLoyalty(memberId, gymId);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner size="md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Failed to load loyalty balance</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-yellow-800">Loyalty Points</p>
            <p className="text-4xl font-bold text-yellow-900 mt-1">
              {balance.toLocaleString()}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-xs text-yellow-700">
                <Award className="h-3 w-3" />
                <span>Earn points with check-ins</span>
              </div>
            </div>
          </div>
          <div className="p-3 bg-yellow-200 rounded-full">
            <Award className="h-8 w-8 text-yellow-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
