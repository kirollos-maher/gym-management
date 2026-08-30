'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLoyalty } from '@/hooks/useLoyalty';
import { Gift, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface RedeemPointsProps {
  memberId: string;
  gymId: string;
  onRedeem?: () => void;
}

export function RedeemPoints({ memberId, gymId, onRedeem }: RedeemPointsProps) {
  const { balance, redeemPoints, loading, error } = useLoyalty(memberId, gymId);
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRedeem = async () => {
    if (pointsToRedeem <= 0) {
      setRedeemError('Please enter a valid number of points');
      return;
    }

    if (pointsToRedeem > balance) {
      setRedeemError(`You only have ${balance} points available`);
      return;
    }

    try {
      setRedeemError(null);
      const result = await redeemPoints(pointsToRedeem, `Redeemed ${pointsToRedeem} points`);
      if (result) {
        setSuccess(true);
        setPointsToRedeem(0);
        onRedeem?.();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setRedeemError('Failed to redeem points. Please try again.');
      }
    } catch (err) {
      setRedeemError(err instanceof Error ? err.message : 'Failed to redeem points');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Redeem Points</CardTitle>
        <p className="text-sm text-gray-500">
          Convert your loyalty points into discounts and rewards
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Points</p>
                <p className="text-2xl font-bold text-gray-900">
                  {balance.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Gift className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Points to Redeem
            </label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min="0"
                max={balance}
                value={pointsToRedeem || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setPointsToRedeem(isNaN(value) ? 0 : value);
                  setRedeemError(null);
                }}
                placeholder="Enter points"
                className="max-w-[200px]"
                disabled={loading}
              />
              <Button
                onClick={() => setPointsToRedeem(balance)}
                variant="outline"
                size="sm"
                disabled={loading || balance === 0}
              >
                Max
              </Button>
            </div>
            {balance > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Minimum redemption: 10 points
              </p>
            )}
          </div>

          {redeemError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{redeemError}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">Points redeemed successfully!</span>
            </div>
          )}

          <Button
            onClick={handleRedeem}
            disabled={loading || pointsToRedeem <= 0 || pointsToRedeem > balance}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Gift className="h-4 w-4 mr-2" />
                Redeem Points
              </>
            )}
          </Button>

          <p className="text-xs text-gray-400 text-center">
            Points can be used for membership discounts and special privileges
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
