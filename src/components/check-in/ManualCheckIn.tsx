'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { 
  Search, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useSupabase } from '@/hooks/useSupabase';

interface ManualCheckInProps {
  onCheckIn: (memberId: string, password?: string) => void;
  isLoading?: boolean;
}

export function ManualCheckIn({ onCheckIn, isLoading = false }: ManualCheckInProps) {
  const { supabase } = useSupabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [password, setPassword] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMembers = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          subscription:subscriptions(
            *,
            membership:memberships(*)
          )
        `)
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
        .eq('role', 'member')
        .limit(10);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search members. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchMembers(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSelectMember = (member: any) => {
    setSelectedMember(member);
    setSearchResults([]);
    setSearchTerm('');
    setError(null);
  };

  const handleClearSelection = () => {
    setSelectedMember(null);
    setPassword('');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) {
      setError('Please select a member first');
      return;
    }

    onCheckIn(selectedMember.id, password || undefined);
  };

  return (
    <div className="space-y-6">
      {!selectedMember ? (
        <div className="space-y-4">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, email, or phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3"
                disabled={isLoading}
              />
            </div>
          </div>

          {isSearching && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Searching...</span>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              {searchResults.map((member) => {
                const isActive = member.subscription?.status === 'active';

                return (
                  <div
                    key={member.id}
                    className="p-4 border-b last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleSelectMember(member)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {member.full_name || 'Unknown Member'}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {member.email || 'No email'}
                            </span>
                            {member.phone && (
                              <span className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {member.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        {member.subscription?.membership && (
                          <p className="text-xs text-gray-500 mt-1">
                            {member.subscription.membership.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {searchTerm && !isSearching && searchResults.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2">No members found. Try a different search term.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>
      ) : (
        <Card className="p-6 border-2 border-blue-200 bg-blue-50">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {selectedMember.full_name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedMember.full_name || 'Unknown Member'}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {selectedMember.email || 'No email'}
                  </p>
                  {selectedMember.phone && (
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedMember.phone}
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedMember.subscription?.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedMember.subscription?.status === 'active' ? 'Active Member' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSelection}
              className="text-gray-500 hover:text-gray-700"
            >
              Change Member
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  PIN/Password (Optional)
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter member PIN for verification..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Leave blank if PIN verification is not required
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Check In
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearSelection}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-2">Manual Check-In Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Search by member name, email, or phone number</li>
          <li>Select the correct member from the search results</li>
          <li>Optionally enter the member's PIN for verification</li>
          <li>Click "Check In" to complete the process</li>
        </ul>
      </div>
    </div>
  );
}