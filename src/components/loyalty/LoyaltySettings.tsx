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
  const { profile, supabase } = useSupabase();
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
      }
    } catch (err) {
      setError('Failed to fetch loyalty settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const { error } = await supabase
        .from('loyalty_settings')
        .update({
          points_per_checkin: settings.points_per_checkin,
          points_per_renewal_currency: settings.points_per_renewal_currency,
          points_per_canteen_purchase: settings.points_per_canteen_purchase,
          points_redemption_rate: settings.points_redemption_rate
        })
        .eq('gym_id', profile!.gym_id!);

      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save settings');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof LoyaltySettingsData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setSettings({
      ...settings,
      [field]: numValue
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Loyalty Points Settings</CardTitle>
        <p className="text-sm text-gray-500">
          Configure how members earn and redeem loyalty points
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Points per check-in */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Points per Check-in
            </label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min="0"
                value={settings.points_per_checkin}
                onChange={(e) => handleChange('points_per_checkin', e.target.value)}
                className="max-w-[150px]"
              />
              <span className="text-sm text-gray-500">
                points per successful check-in
              </span>
            </div>
          </div>

          {/* Points per renewal currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Points per $1 on Renewal
            </label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={settings.points_per_renewal_currency}
                onChange={(e) => handleChange('points_per_renewal_currency', e.target.value)}
                className="max-w-[150px]"
              />
              <span className="text-sm text-gray-500">
                points per dollar spent on renewal
              </span>
            </div>
          </div>

          {/* Points per canteen purchase */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Points per $1 on Canteen Purchase
            </label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={settings.points_per_canteen_purchase}
                onChange={(e) => handleChange('points_per_canteen_purchase', e.target.value)}
                className="max-w-[150px]"
              />
              <span className="text-sm text-gray-500">
                points per dollar spent at canteen
              </span>
            </div>
          </div>

          {/* Points redemption rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Points Redemption Rate ($ per point)
            </label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min="0"
                step="0.001"
                value={settings.points_redemption_rate}
                onChange={(e) => handleChange('points_redemption_rate', e.target.value)}
                className="max-w-[150px]"
              />
              <span className="text-sm text-gray-500">
                dollars value per point (e.g., 0.01 = 1 cent per point)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={fetchSettings}
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {error && (
              <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Settings saved successfully!</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
