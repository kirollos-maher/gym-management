'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  CheckCircle, 
  User, 
  Calendar, 
  Clock, 
  RefreshCw
} from 'lucide-react';

interface CheckInSuccessProps {
  userData: {
    id: string;
    name: string;
    email: string;
    membershipStatus: string;
    membershipType: string;
    expiryDate: string;
  };
  checkInTime: string;
  onReset: () => void;
}

export function CheckInSuccess({ userData, checkInTime, onReset }: CheckInSuccessProps) {
  const [countdown, setCountdown] = React.useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onReset]);

  return (
    <Card className="p-6 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center animate-bounce">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          Check-In Successful!
        </h2>
        <p className="text-green-700 mb-6">
          Welcome to the gym. Have a great workout!
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{userData.name}</p>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Member ID</p>
              <p className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {userData.id.substring(0, 8)}...
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Membership</span>
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {userData.membershipStatus.toUpperCase()}
                </span>
              </div>
              <p className="font-semibold text-gray-900 mt-1">
                {userData.membershipType}
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Expires</span>
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
              <p className="font-semibold text-gray-900 mt-1">
                {new Date(userData.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Check-in Time</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                <span className="text-sm font-medium">
                  {new Date(checkInTime).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={onReset}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          New Check-In
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
          className="border-gray-300"
        >
          Done
        </Button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          This window will close automatically in {countdown} seconds...
        </p>
      </div>
    </Card>
  );
}