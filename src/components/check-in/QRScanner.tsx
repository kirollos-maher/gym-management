'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Loader2, Camera, CameraOff, RefreshCw } from 'lucide-react';

interface QRScannerProps {
  onScan: (qrData: string) => void;
  onError: (error: Error) => void;
  isLoading?: boolean;
}

export function QRScanner({ onScan, onError, isLoading = false }: QRScannerProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraActive(true);
        setIsScanning(true);
        startScanning();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access camera';
      setError(errorMessage);
      onError(new Error(errorMessage));
      setIsCameraActive(false);
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsScanning(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const startScanning = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    const scan = () => {
      if (!isScanning) return;

      try {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Simulated QR detection - for demo purposes only
        if (Math.random() < 0.001) {
          const mockQRData = btoa(JSON.stringify({
            user_id: '123e4567-e89b-12d3-a456-426614174000',
            gym_id: '123e4567-e89b-12d3-a456-426614174001',
            timestamp: Date.now(),
            type: 'checkin'
          }));
          onScan(mockQRData);
          stopCamera();
          return;
        }

        animationFrameRef.current = requestAnimationFrame(scan);
      } catch (err) {
        console.error('Scanning error:', err);
        animationFrameRef.current = requestAnimationFrame(scan);
      }
    };

    scan();
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleRefresh = () => {
    stopCamera();
    setTimeout(() => {
      startCamera();
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
          {!isCameraActive ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-white">
              <Camera className="h-16 w-16 mb-4 text-gray-400" />
              <p className="text-gray-300 text-center px-4">
                Click the button below to start the camera and scan QR codes
              </p>
              {error && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm max-w-md">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
              />
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 border-2 border-blue-500/50 rounded-lg">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-48 h-48 border-2 border-blue-500 rounded-lg">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/60 px-4 py-2 rounded-full text-white text-sm">
                    {isLoading ? 'Processing...' : 'Position QR code within frame'}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          {!isCameraActive ? (
            <Button
              onClick={startCamera}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Camera className="h-4 w-4 mr-2" />
              Start Camera
            </Button>
          ) : (
            <>
              <Button
                onClick={handleRefresh}
                variant="outline"
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={stopCamera}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                disabled={isLoading}
              >
                <CameraOff className="h-4 w-4 mr-2" />
                Stop Camera
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">How to scan:</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Position the QR code within the frame</li>
          <li>Hold steady for a moment until it detects</li>
          <li>Check-in will be processed automatically</li>
          <li>Make sure you have a stable internet connection</li>
        </ul>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="mt-3 text-gray-700 font-medium">Processing check-in...</p>
          </div>
        </div>
      )}
    </div>
  );
}