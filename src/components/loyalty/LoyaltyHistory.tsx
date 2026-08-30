'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoyaltyService } from '@/lib/services/loyalty.service';
import { Database } from '@/lib/types/database.types';
import { formatDateTime } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Award, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react';

type LoyaltyTransaction = Database['public']['Tables']['loyalty_transactions']['Row'];

interface LoyaltyHistoryProps {
  memberId: string;
  gymId: string;
}

export function LoyaltyHistory({ memberId, gymId }: LoyaltyHistoryProps) {
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (memberId && gymId) {
      fetchHistory();
    }
  }, [memberId, gymId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await LoyaltyService.getMemberHistory(memberId, gymId);
      setTransactions(data || []);
    } catch (err) {
      setError('Failed to fetch loyalty history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSourceIcon = (source: string) => {
    const icons: Record<string, string> = {
      attendance: '🏋️',
      renewal: '🔄',
      canteen: '☕',
      manual: '✏️'
    };
    return icons[source] || '📌';
  };

  const getSourceLabel = (source: string) => {
    const labels: Record<string, string> = {
      attendance: 'Check-in',
      renewal: 'Renewal',
      canteen: 'Canteen',
      manual: 'Manual'
    };
    return labels[source] || source;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
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
            <p>{error}</p>
            <button
              onClick={fetchHistory}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              Try again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Award className="h-12 w-12 mx-auto text-gray-300" />
            <p className="mt-2">No loyalty transactions yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Transaction History</CardTitle>
          <p className="text-sm text-gray-500">Recent loyalty point activity</p>
        </div>
        <button
          onClick={fetchHistory}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Refresh
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.transaction_type === 'earned'
                    ? 'bg-green-100'
                    : 'bg-red-100'
                }`}>
                  {transaction.transaction_type === 'earned' ? (
                    <ArrowUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <ArrowDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {getSourceLabel(transaction.source)}
                    </span>
                    <Badge
                      variant={transaction.transaction_type === 'earned' ? 'success' : 'error'}
                    >
                      {transaction.transaction_type === 'earned' ? 'Earned' : 'Redeemed'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatDateTime(transaction.created_at)}</span>
                    <span>•</span>
                    <span>{getSourceIcon(transaction.source)}</span>
                  </div>
                  {transaction.description && (
                    <p className="text-xs text-gray-400 mt-1">
                      {transaction.description}
                    </p>
                  )}
                </div>
              </div>
              <div className={`text-lg font-bold ${
                transaction.transaction_type === 'earned'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {transaction.transaction_type === 'earned' ? '+' : '-'}
                {transaction.points}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
