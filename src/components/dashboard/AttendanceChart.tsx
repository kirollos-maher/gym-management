'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface AttendanceChartProps {
  data: Array<{ date: string; count: number }>;
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    const width = rect?.width || 400;
    const height = 300;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const padding = { top: 40, bottom: 40, left: 50, right: 20 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxCount = Math.max(...data.map(d => d.count), 10);
    const minCount = 0;

    ctx.clearRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      
      const value = Math.round(maxCount - (maxCount / 4) * i);
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(value.toString(), padding.left - 10, y + 4);
    }

    // Draw line
    ctx.beginPath();
    data.forEach((item, index) => {
      const x = padding.left + (index / (data.length - 1 || 1)) * chartWidth;
      const y = padding.top + chartHeight - (item.count / maxCount) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(139, 92, 246, 0.3)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw area fill
    const lastPoint = data.length - 1;
    const lastX = padding.left + (lastPoint / (data.length - 1 || 1)) * chartWidth;
    const lastY = padding.top + chartHeight - (data[lastPoint].count / maxCount) * chartHeight;
    
    ctx.lineTo(lastX, padding.top + chartHeight);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.02)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw dots
    data.forEach((item, index) => {
      const x = padding.left + (index / (data.length - 1 || 1)) * chartWidth;
      const y = padding.top + chartHeight - (item.count / maxCount) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#8b5cf6';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // X-axis labels (show every 3rd label)
    data.forEach((item, index) => {
      if (index % 3 === 0 || index === data.length - 1) {
        const x = padding.left + (index / (data.length - 1 || 1)) * chartWidth;
        const date = new Date(item.date);
        const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, padding.top + chartHeight + 20);
      }
    });

    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Check-ins', padding.left, 20);

  }, [data]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Check-in Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
}