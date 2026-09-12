'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { PlayerProfile } from '@/types/player';
import { xpPercent } from '@/lib/utils';

interface HeroSagaCardProps {
  player: PlayerProfile;
  onClaimDailyBonus?: () => void;
  onSelectAvatar?: (index: number) => void;
}

export function HeroSagaCard({
  player,
  onClaimDailyBonus,
}: HeroSagaCardProps) {
  const [bonusClaimed, setBonusClaimed] = useState(
    player.stats.dailyBonusClaimed
  );
  const percent = xpPercent(player.stats.xp, player.stats.xpToNextLevel);

  const handleClaimBonus = () => {
    setBonusClaimed(true);
    if (onClaimDailyBonus) onClaimDailyBonus();
  };

  return (
    <section className="bg-[#6853a8] border-pixel-thick shadow-solid-lg rounded-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Top Info Header Overlay */}
      <div className="p-6 pb-0 relative z-10">
        {/* Tilted Header Tab */}
        <div className="inline-block -rotate-2 mb-2">
          <span className="bg-[#ffb295] text-black font-black text-sm px-4 py-1.5 rounded-md border-pixel shadow-solid tracking-wide inline-block uppercase">
            Your Saga
          </span>
        </div>
        {/* Massive Mint Level Header */}
        <h2 className="text-4xl sm:text-5xl font-black text-[#7ef9c7] drop-shadow-[0_2px_0_#000000] tracking-tight font-heading">
          Level {player.stats.level}
        </h2>
      </div>

      {/* Anime Character Illustration Stage */}
      <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center overflow-hidden my-1">
        {/* Aura Backlight */}
        <div className="absolute w-72 h-72 bg-[#7d67bd] rounded-full blur-3xl opacity-70" />

        {/* Character Avatar Showcase */}
        <div className="relative w-64 h-80 border-4 border-black rounded-2xl overflow-hidden shadow-solid-lg bg-[#190c2d] -rotate-1 group transition-transform hover:rotate-0">
          <Image
            src={`/avatars/Avatar-${player.avatarIndex}.jpg`}
            alt={player.username}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 768px) 100vw, 320px"
          />
          {/* Subtle Cyber Decal overlay */}
          <div className="absolute bottom-2 left-2 right-2 bg-[#130728]/90 border-2 border-black rounded px-2 py-1 text-[10px] font-black uppercase text-[#7ef9c7] flex justify-between items-center">
            <span>{player.stats.rank}</span>
            <span className="text-[#ffb68d]">MK-IV</span>
          </div>
        </div>
      </div>

      {/* Progress and Stats Footer Section */}
      <div className="bg-[#120822] border-t-4 border-black p-5 space-y-4">
        {/* XP Bar Container */}
        <div>
          <div className="flex justify-between items-center text-xs font-black tracking-wider uppercase mb-1.5 font-heading">
            <span className="text-white">
              XP • {player.stats.xp.toLocaleString()} /{' '}
              {player.stats.xpToNextLevel.toLocaleString()} • {percent}%
            </span>
            <span className="text-[#7ef9c7] font-black text-sm">
              +{percent}%
            </span>
          </div>
          {/* Progress Track */}
          <div className="h-4 bg-[#1f1633] border-2 border-black rounded-full p-0.5 overflow-hidden flex items-center shadow-solid-sm">
            <div
              className="h-full bg-[#7ef9c7] bg-stripes-mint rounded-full border-r-2 border-black transition-all duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Bottom Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {/* Streak Badge */}
          <div className="bg-[#ffb295] text-black font-extrabold text-xs px-3 py-2 rounded-lg border-pixel shadow-solid flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xl leading-none">🔥</span>
            <div className="leading-tight text-left">
              <p className="text-[9px] uppercase font-black text-[#5e2b19]">
                Streak
              </p>
              <p className="text-xs font-black">{player.stats.streakDays} days</p>
            </div>
          </div>

          {/* Rank Badge */}
          <div className="bg-[#cbbeeb] text-black font-extrabold text-xs px-3 py-2 rounded-lg border-pixel shadow-solid flex items-center justify-center sm:justify-start gap-1.5">
            <span className="text-sm">✦</span>
            <div className="leading-none text-left">
              <span className="text-[9px] uppercase font-black block text-[#3f2a63]">
                Rank
              </span>
              <span className="font-black text-[10px] tracking-tight">
                {player.stats.rank}
              </span>
            </div>
          </div>

          {/* Daily Bonus Claimed */}
          <button
            type="button"
            onClick={handleClaimBonus}
            disabled={bonusClaimed}
            className={`font-extrabold text-xs px-3 py-2 rounded-lg border-pixel shadow-solid flex items-center justify-center sm:justify-start gap-1.5 transition-all ${
              bonusClaimed
                ? 'bg-[#7ef9c7] text-black cursor-default'
                : 'bg-[#fad02c] text-black hover:bg-[#ffe380] active:translate-x-0.5 active:translate-y-0.5'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-black text-[#7ef9c7] flex items-center justify-center text-[10px] font-black shrink-0">
              {bonusClaimed ? '✓' : '!'}
            </span>
            <span className="font-black text-[10px] leading-tight text-left">
              {bonusClaimed ? 'Bonus Claimed' : 'Claim Daily +50'}
            </span>
          </button>
        </div>
      </div>

      {/* Season Status Bottom Bar */}
      <div className="bg-[#0b0416] py-2 px-4 text-center border-t-2 border-black text-[11px] font-bold tracking-widest text-[#a196ba] uppercase">
        Season {player.stats.season} • {player.stats.seasonName} •{' '}
        {player.stats.seasonDaysRemaining} Days Remaining
      </div>
    </section>
  );
}
