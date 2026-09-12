'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { mockPlayer } from '@/lib/mock/player';

const NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Quests', href: '/quests' },
  { label: 'Inventory', href: '/inventory' },
  { label: 'Shop', href: '/shop' },
  { label: 'Network', href: '/network' },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="bg-[#1c122f] border-pixel-thick shadow-solid rounded-xl px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-4 z-40">
      {/* Left Logo & Branding */}
      <Link href="/dashboard" className="flex items-center gap-3 group">
        <div className="w-10 h-10 relative flex items-center justify-center border-2 border-black rounded-lg shadow-solid-sm group-hover:rotate-6 transition-transform overflow-hidden bg-[#130728] shrink-0">
          <Image
            src="/avatars/Rise.jpg"
            alt="Aetherbound Logo"
            fill
            className="object-cover"
            priority
            sizes="40px"
          />
        </div>
        <div className="leading-tight">
          <h1 className="font-black text-white text-base md:text-lg tracking-wider uppercase font-heading">
            AETHERBOUND
          </h1>
          <p className="font-extrabold text-[#7ef9c7] text-[10px] tracking-widest uppercase">
            LIFE RPG
          </p>
        </div>
      </Link>

      {/* Center Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-extrabold tracking-wide">
        {NAV_LINKS.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/dashboard' && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative py-1 flex flex-col items-center transition-colors uppercase',
                isActive
                  ? 'text-[#ffb68d]'
                  : 'text-white hover:text-[#7ef9c7]'
              )}
            >
              <span>{link.label}</span>
              {isActive ? (
                <span className="w-full h-[3px] bg-[#7ef9c7] rounded-full mt-0.5 shadow-sm" />
              ) : (
                <span className="w-0 h-[3px] bg-transparent rounded-full mt-0.5 group-hover:w-full transition-all" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right Action Badges */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Streak Pill */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#ffb68d] text-[#331200] border-2 border-black rounded-lg px-2.5 py-1 text-xs font-black shadow-solid-sm">
          <span>🔥</span>
          <span>{mockPlayer.stats.streakDays}d</span>
        </div>

        {/* Currency Pill */}
        <div className="flex items-center gap-1.5 bg-[#fad02c] text-[#3a2c00] border-2 border-black rounded-lg px-2.5 py-1 text-xs font-black shadow-solid-sm">
          <span>🪙</span>
          <span className="font-mono">{mockPlayer.stats.gold.toLocaleString()}</span>
        </div>

        {/* Player Profile & Level */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 bg-[#25193a] hover:bg-[#302445] border-2 border-black rounded-lg p-1 pr-2.5 shadow-solid-sm transition-colors"
        >
          <div className="w-7 h-7 rounded-md border border-black overflow-hidden relative bg-[#130728]">
            <Image
              src="/avatars/Avatar-1.jpg"
              alt="Avatar"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <div className="hidden xs:flex flex-col text-left leading-none">
            <span className="text-[10px] text-[#bccac1] font-bold">LVL {mockPlayer.stats.level}</span>
            <span className="text-xs text-white font-extrabold truncate max-w-[80px]">
              {mockPlayer.username.split('_')[0]}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
