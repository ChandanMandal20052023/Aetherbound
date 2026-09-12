'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MOBILE_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { label: 'Quests', href: '/quests', icon: 'swords' },
  { label: 'Inventory', href: '/inventory', icon: 'backpack' },
  { label: 'Shop', href: '/shop', icon: 'storefront' },
  { label: 'Network', href: '/network', icon: 'hub' },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1c122f] border-t-4 border-black px-2 py-1 shadow-solid-lg">
      <div className="flex items-center justify-around">
        {MOBILE_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center py-1.5 px-3 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all',
                isActive
                  ? 'bg-[#7ef9c7] text-black border-2 border-black shadow-solid-sm -translate-y-1'
                  : 'text-[#bccac1] hover:text-white'
              )}
            >
              <span className="material-symbols-outlined text-xl mb-0.5">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
