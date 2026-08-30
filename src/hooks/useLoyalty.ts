'use client';

import { useEffect, useState } from 'react';
import { LoyaltyService } from '@/lib/services/loyalty.service';
import { Database } from '@/lib/types/database.types';

type LoyaltyTransaction = Database['public']['Tables']['loyalty_transactions']['Row'];

export function useLoyalty(memberId: string, gymId: string) {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (memberId && gymId) {
      fetchLoyaltyData();
    }
  }, [memberId, gymId]);

  const fetchLoyaltyData = async () => {
    try {
      setLoading(true);
      const [balanceData, historyData] = await Promise.all([
        LoyaltyService.getMemberBalance(memberId, gymId),
        LoyaltyService.getMemberHistory(memberId, gymId)
      ]);
      setBalance(balanceData);
      setHistory(historyData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch loyalty data'));
    } finally {
      setLoading(false);
    }
  };

  const redeemPoints = async (points: number, description?: string) => {
    try {
      const result = await LoyaltyService.redeemPoints(memberId, gymId, points, description);
      if (result) {
        await fetchLoyaltyData();
        return result;
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to redeem points'));
      return null;
    }
  };

  return {
    balance,
    history,
    loading,
    error,
    refresh: fetchLoyaltyData,
    redeemPoints
  };
}