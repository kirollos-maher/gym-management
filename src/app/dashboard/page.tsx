'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return null;
}