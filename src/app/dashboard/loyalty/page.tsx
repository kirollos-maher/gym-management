'use client';

import { useSupabase } from '@/hooks/useSupabase';
import { LoyaltySettings } from '@/components/loyalty/LoyaltySettings';
import { LoyaltyBalance } from '@/components/loyalty/LoyaltyBalance';
import { LoyaltyHistory } from '@/components/loyalty/LoyaltyHistory';
import { RedeemPoints } from '@/components/loyalty/RedeemPoints';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function LoyaltyPage() {
  const { profile, user } = useSupabase();
  const isGymOwner = profile?.role === 'gym_owner' || profile?.role === 'super_admin';
  const isMember = profile?.role === 'member';
  const memberId = user?.id || '';
  const gymId = profile?.gym_id || '';

  if (isGymOwner) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Loyalty Program</h1>
          <p className="text-sm text-gray-500">
            Manage loyalty points settings and view member activity
          </p>
        </div>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
            <TabsTrigger value="history">📊 History</TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <LoyaltySettings />
          </TabsContent>
          <TabsContent value="history">
            <LoyaltyHistory memberId={memberId} gymId={gymId} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (isMember) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Loyalty Points</h1>
          <p className="text-sm text-gray-500">
            Track your points and redeem rewards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LoyaltyBalance memberId={memberId} gymId={gymId} />
            <RedeemPoints memberId={memberId} gymId={gymId} />
          </div>
          <div>
            <LoyaltyHistory memberId={memberId} gymId={gymId} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <p className="text-gray-500">You don't have access to loyalty features</p>
    </div>
  );
}