'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface MemberDistributionProps {
  data: Array<{ name: string; count: number }>;
}

export function MemberDistribution({ data }: MemberDistributionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    const width = rect?.width || 300;
    const height = 300;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const total = data.reduce((sum, item) => sum + item.count, 0);
    if (total === 0) return;

    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    ctx.clearRect(0, 0, width, height);

    let startAngle = -Math.PI / 2;
    let currentIndex = 0;

    data.forEach((item) => {
      const sliceAngle = (item.count / total) * Math.PI * 2;
      const endAngle = startAngle + sliceAngle;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = colors[currentIndex % colors.length];
      ctx.fill();

      // Draw slice border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.6;
      const labelX = centerX + Math.cos(midAngle) * labelRadius;
      const labelY = centerY + Math.sin(midAngle) * labelRadius;

      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      if (sliceAngle > 0.5) {
        const percentage = Math.round((item.count / total) * 100);
        ctx.fillText(`${percentage}%`, labelX, labelY);
      }

      startAngle = endAngle;
      currentIndex++;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Center text
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Total`, centerX, centerY - 12);
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(total.toString(), centerX, centerY + 18);

  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Member Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
        <div className="flex flex-wrap gap-3 mt-4 justify-center">
          {data.map((item, index) => {
            const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
            const percentage = Math.round((item.count / data.reduce((sum, i) => sum + i.count, 0)) * 100);
            return (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-xs text-gray-600">
                  {item.name} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}