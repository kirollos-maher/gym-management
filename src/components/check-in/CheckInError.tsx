'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Home,
  HelpCircle
} from 'lucide-react';

interface CheckInErrorProps {
  errorMessage: string;
  onRetry: () => void;
  onHome?: () => void;
  onHelp?: () => void;
}

export function CheckInError({ 
  errorMessage, 
  onRetry, 
  onHome, 
  onHelp 
}: CheckInErrorProps) {
  const isWarning = errorMessage.toLowerCase().includes('expired') || 
                    errorMessage.toLowerCase().includes('inactive') ||
                    errorMessage.toLowerCase().includes('not found');
  const isCameraError = errorMessage.toLowerCase().includes('camera') || 
                        errorMessage.toLowerCase().includes('permission');

  return (
    <Card className={`p-6 border-2 ${
      isWarning ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'
    } max-w-2xl mx-auto`}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isWarning ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {isWarning ? (
              <AlertTriangle className="h-12 w-12 text-white" />
            ) : (
              <XCircle className="h-12 w-12 text-white" />
            )}
          </div>
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${
          isWarning ? 'text-yellow-800' : 'text-red-800'
        }`}>
          {isWarning ? 'Check-In Issue' : 'Check-In Failed'}
        </h2>
        <div className="bg-white rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            {errorMessage}
          </p>
          {isCameraError && (
            <div className="mt-3 text-sm text-gray-600 bg-blue-50 p-3 rounded border border-blue-200">
              <p className="font-medium text-blue-800">💡 Camera Tips:</p>
              <ul className="mt-1 list-disc list-inside text-left">
                <li>Make sure your browser has camera permissions</li>
                <li>Try using the manual check-in method instead</li>
                <li>Check if another application is using the camera</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
        {onHome && (
          <Button
            onClick={onHome}
            variant="outline"
            className="border-gray-300"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        )}
        {onHelp && (
          <Button
            onClick={onHelp}
            variant="outline"
            className="border-gray-300"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Need Help?
          </Button>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>If the issue persists, please contact support or use the manual check-in method.</p>
      </div>
    </Card>
  );
}
