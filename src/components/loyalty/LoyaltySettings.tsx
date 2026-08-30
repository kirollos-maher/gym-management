'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoyaltyService } from '@/lib/services/loyalty.service';
import { useSupabase } from '@/hooks/useSupabase';
import { Save, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface LoyaltySettingsData {
  points_per_checkin: number;
  points_per_renewal_currency: number;
  points_per_canteen_purchase: number;
  points_redemption_rate: number;
}

export function LoyaltySettings() {
  const { profile } = useSupabase();
  const [settings, setSettings] = useState<LoyaltySettingsData>({
    points_per_checkin: 0,
    points_per_renewal_currency: 0,
    points_per_canteen_purchase: 0,
    points_redemption_rate: 0
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile?.gym_id) {
      fetchSettings();
    }
  }, [profile]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await LoyaltyService.getGymSettings(profile!.gym_id!);
      if (data) {
        setSettings({
          points_per_checkin: data.points_per_checkin || 0,
          points_per_renewal_currency: data.points_per_renewal_currency || 0,
          points_per_canteen_purchase: data.points_per_canteen_purchase || 0,
          points_redemption_rate: data.points_redemption_rate || 0
        });