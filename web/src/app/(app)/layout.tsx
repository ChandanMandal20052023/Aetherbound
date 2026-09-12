import React from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between p-3 sm:p-4 md:p-8 pb-24 md:pb-8">
      <div className="max-w-[1280px] w-full mx-auto space-y-6 flex-1">
        <TopNav />
        <main>{children}</main>
      </div>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
