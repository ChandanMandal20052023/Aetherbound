'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useGame } from '@/contexts/GameContext';
import { LANGUAGE_LABELS } from '@/lib/dictionary';

export function TopNav() {
  const pathname = usePathname();
  const {
    player,
    soundEnabled,
    toggleSound,
    languageMode,
    openSettings,
    playSfx,
    t,
  } = useGame();

  const navLinks = [
    { label: t.dashboardTitle.split(' ')[0], href: '/dashboard' },
    { label: t.questsTitle.split(' ')[0], href: '/quests' },
    { label: t.inventoryTitle.split(' ')[0], href: '/inventory' },
    { label: t.shopTitle.split(' ')[0], href: '/shop' },
    { label: t.networkTitle.split(' ')[0], href: '/network' },
  ];

  const currentLang = LANGUAGE_LABELS[languageMode];

  return (
    <header className="bg-[#1c122f] border-pixel-thick shadow-solid rounded-xl px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-4 z-40 border-[#000000]">
      {/* Left Logo & Branding */}
      <Link
        href="/dashboard"
        onClick={() => playSfx('click')}
        className="flex items-center gap-3 group"
      >
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
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/dashboard' && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => playSfx('click')}
              className={cn(
                'relative py-1 flex flex-col items-center transition-colors uppercase',
                isActive ? 'text-[#ffb68d]' : 'text-white hover:text-[#7ef9c7]'
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

      {/* Right Controls & Badges */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Sound Toggle Button */}
        <button
          type="button"
          onClick={toggleSound}
          title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center text-sm shadow-solid-sm transition-all cursor-pointer ${
            soundEnabled
              ? 'bg-[#7ef9c7] text-[#002115] hover:bg-[#6be4b4]'
              : 'bg-[#ff5a5a] text-white hover:bg-[#f34545]'
          }`}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>

        {/* Language Complexity Badge (Click to open Settings) */}
        <button
          type="button"
          onClick={openSettings}
          title={`Current Language Mode: ${currentLang.name} (Click to change)`}
          className="hidden sm:flex items-center gap-1.5 bg-[#2a1745] hover:bg-[#39215c] text-white border-2 border-black rounded-lg px-2.5 py-1 text-xs font-black shadow-solid-sm transition-colors cursor-pointer"
        >
          <span>{currentLang.icon}</span>
          <span className="text-[11px] uppercase font-bold text-[#7ef9c7]">
            {currentLang.name.split(' ')[0]}
          </span>
        </button>

        {/* Streak Pill */}
        <div
          title={`${player?.stats?.streakDays ?? 0} days streak`}
          className="hidden sm:flex items-center gap-1.5 bg-[#ffb68d] text-[#331200] border-2 border-black rounded-lg px-2.5 py-1 text-xs font-black shadow-solid-sm"
        >
          <span>🔥</span>
          <span>{player?.stats?.streakDays ?? 0}d</span>
        </div>

        {/* Currency Pill */}
        <div
          title={`${player?.stats?.gold ?? 0} Gold`}
          className="flex items-center gap-1.5 bg-[#fad02c] text-[#3a2c00] border-2 border-black rounded-lg px-2.5 py-1 text-xs font-black shadow-solid-sm"
        >
          <span>🪙</span>
          <span className="font-mono">{(player?.stats?.gold ?? 0).toLocaleString()}</span>
        </div>

        {/* Settings Gear Icon Button */}
        <button
          type="button"
          onClick={openSettings}
          title="Open System Settings"
          className="w-8 h-8 rounded-lg bg-[#25193a] hover:bg-[#372654] border-2 border-black flex items-center justify-center text-sm font-black text-white shadow-solid-sm transition-colors cursor-pointer"
        >
          ⚙️
        </button>

        {/* Player Profile & Level */}
        <Link
          href="/dashboard"
          onClick={() => playSfx('click')}
          className="flex items-center gap-2 bg-[#25193a] hover:bg-[#302445] border-2 border-black rounded-lg p-1 pr-2.5 shadow-solid-sm transition-colors"
        >
          <div className="w-7 h-7 rounded-md border border-black overflow-hidden relative bg-[#130728] shrink-0">
            <Image
              src={`/avatars/Avatar-${player?.avatarIndex ?? 1}.jpg`}
              alt="Avatar"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <div className="hidden xs:flex flex-col text-left leading-none">
            <span className="text-[10px] text-[#bccac1] font-bold">
              LVL {player?.stats?.level ?? 1}
            </span>
            <span className="text-xs text-white font-extrabold truncate max-w-[80px]">
              {player?.username?.split('_')[0] ?? 'Hero'}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
