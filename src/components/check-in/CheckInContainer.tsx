'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { QRScanner } from './QRScanner';
import { ManualCheckIn } from './ManualCheckIn';
import { CheckInSuccess } from './CheckInSuccess';
import { CheckInError } from './CheckInError';
import { useSupabase } from '@/hooks/useSupabase';
import { AttendanceService } from '@/lib/services/attendance.service';
import { Badge } from '@/components/ui/Badge';
import { QrCode, User, Loader2 } from 'lucide-react';

interface CheckInState {
  status: 'idle' | 'scanning' | 'processing' | 'success' | 'error';
  userData?: {
    id: string;
    name: string;
    email: string;
    membershipStatus: string;
    membershipType: string;
    expiryDate: string;
  };
  errorMessage?: string;
  checkInTime?: string;
}

export function CheckInContainer() {
  const router = useRouter();
  const { user, profile } = useSupabase();
  const [activeTab, setActiveTab] = useState<'qr' | 'manual'>('qr');
  const [checkInState, setCheckInState] = useState<CheckInState>({
    status: 'idle'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
  }, [user, router]);

  const handleQRScan = async (qrData: string) => {
    try {
      setCheckInState({ status: 'processing' });
      setIsLoading(true);

      const validation = await AttendanceService.validateQRCode(qrData);
      
      if (!validation.valid) {
        setCheckInState({
          status: 'error',
          errorMessage: 'Invalid or expired QR code. Please try again.'
        });
        return;
      }

      const hasActive = await AttendanceService.hasActiveSubscription(validation.user_id);
      if (!hasActive) {
        setCheckInState({
          status: 'error',
          errorMessage: 'Member does not have an active subscription.'
        });
        return;
      }

      const supabase = (await import('@/lib/supabase/client')).supabase;
      const { data: memberData, error: memberError } = await supabase
        .from('users')
        .select(`
          *,
          subscription:subscriptions(
            *,
            membership:memberships(*)
          )
        `)
        .eq('id', validation.user_id)
        .single();

      if (memberError || !memberData) {
        setCheckInState({
          status: 'error',
          errorMessage: 'Failed to fetch member details.'
        });
        return;
      }

      const checkIn = await AttendanceService.checkIn(
        validation.user_id,
        validation.gym_id,
        'qr_code',
        'member'
      );

      if (!checkIn) {
        setCheckInState({
          status: 'error',
          errorMessage: 'Failed to process check-in. Please try again.'
        });
        return;
      }

      setCheckInState({
        status: 'success',
        userData: {
          id: memberData.id,
          name: memberData.full_name || 'Member',
          email: memberData.email || '',
          membershipStatus: memberData.subscription?.status || 'Unknown',
          membershipType: memberData.subscription?.membership?.name || 'N/A',
          expiryDate: memberData.subscription?.end_date || 'N/A'
        },
        checkInTime: checkIn.check_in_time
      });

      setTimeout(() => {
        setCheckInState({ status: 'idle' });
      }, 5000);

    } catch (error) {
      console.error('QR scan error:', error);
      setCheckInState({
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualCheckIn = async (memberId: string, password?: string) => {
    try {
      setCheckInState({ status: 'processing' });
      setIsLoading(true);

      const supabase = (await import('@/lib/supabase/client')).supabase;
      const { data: memberData, error: memberError } = await supabase
        .from('users')
        .select(`
          *,
          subscription:subscriptions(
            *,
            membership:memberships(*)
          )
        `)
        .eq('id', memberId)
        .single();

      if (memberError || !memberData) {
        setCheckInState({
          status: 'error',
          errorMessage: 'Member not found. Please check the ID.'
        });
        return;
      }

      const hasActive = await AttendanceService.hasActiveSubscription(memberData.id);
      if (!hasActive) {
        setCheckInState({
          status: 'error',
          errorMessage: 'Member does not have an active subscription.'
        });
        return;
      }

      const checkIn = await AttendanceService.checkIn(
        memberData.id,
        profile?.gym_id || memberData.gym_id,
        'id_password',
        'member'
      );

      if (!checkIn) {
        setCheckInState({
          status: 'error',
          errorMessage: 'Failed to process check-in. Please try again.'
        });
        return;
      }

      setCheckInState({
        status: 'success',
        userData: {
          id: memberData.id,
          name: memberData.full_name || 'Member',
          email: memberData.email || '',
          membershipStatus: memberData.subscription?.status || 'Unknown',
          membershipType: memberData.subscription?.membership?.name || 'N/A',
          expiryDate: memberData.subscription?.end_date || 'N/A'
        },
        checkInTime: checkIn.check_in_time
      });

      setTimeout(() => {
        setCheckInState({ status: 'idle' });
      }, 5000);

    } catch (error) {
      console.error('Manual check-in error:', error);
      setCheckInState({
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setCheckInState({ status: 'idle' });
  };

  if (checkInState.status === 'success' && checkInState.userData) {
    return (
      <CheckInSuccess
        userData={checkInState.userData}
        checkInTime={checkInState.checkInTime || new Date().toISOString()}
        onReset={resetState}
      />
    );
  }

  if (checkInState.status === 'error') {
    return (
      <CheckInError
        errorMessage={checkInState.errorMessage || 'An error occurred'}
        onRetry={resetState}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Member Check-In
            </CardTitle>
            {isLoading && (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span className="text-sm text-gray-600">Processing...</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'qr' | 'manual')}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="qr" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                QR Code Scanner
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Manual Check-In
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qr">
              <QRScanner
                onScan={handleQRScan}
                isLoading={isLoading}
                onError={(error) => {
                  setCheckInState({
                    status: 'error',
                    errorMessage: error.message
                  });
                }}
              />
            </TabsContent>

            <TabsContent value="manual">
              <ManualCheckIn
                onCheckIn={handleManualCheckIn}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}