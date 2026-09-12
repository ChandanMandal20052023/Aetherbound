'use client';

import React from 'react';
import type { MomentumData } from '@/types/player';
import { useGame } from '@/contexts/GameContext';

interface MomentumStreakProps {
  momentum: MomentumData;
}

const DAY_FULL_NAMES: Record<string, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

export function MomentumStreak({ momentum }: MomentumStreakProps) {
  const { t, playSfx } = useGame();

  // Determine today's day abbreviation
  const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayName = daysShort[new Date().getDay()];

  // Calculate dynamic maximum XP for proportional bar height
  const maxXP = Math.max(200, ...momentum.weeklyBreakdown.map((d) => d.xp));

  const isPositiveChange = momentum.weeklyChange >= 0;
  const streakDays = momentum.currentStreak || 0;

  // Streak multiplier calculation
  const multiplier = Math.min(2.0, 1.0 + Math.floor(streakDays / 3) * 0.1).toFixed(1);

  return (
    <section className="bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-5 sm:p-6 lg:p-7 text-white border-[#000000]">
      {/* Top Banner Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#362354] pb-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-[#ffb68d] text-[#2e1005] font-black text-xs px-3 py-1 rounded border-2 border-black uppercase shadow-solid-sm flex items-center gap-1.5">
              <span>🔥</span>
              <span>{t.streak}: {streakDays} {streakDays === 1 ? 'DAY' : 'DAYS'}</span>
            </span>
            <span className="bg-[#7ef9c7] text-[#002115] font-black text-xs px-2.5 py-1 rounded border-2 border-black uppercase shadow-solid-sm">
              ⚡ {multiplier}x XP MULTIPLIER ACTIVE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-heading pt-1">
            Weekly Momentum & Habit Streak
          </h2>
          <p className="text-xs sm:text-sm text-[#bccac1] font-semibold">
            {momentum.weeklyTotal.toLocaleString()} {t.xp} recorded across the 7-day protocol
          </p>
        </div>

        {/* Weekly Change & Best Day Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="bg-[#170c28] border-2 border-black rounded-xl px-3.5 py-2 shadow-solid-sm flex items-center gap-2.5">
            <span className="text-xl">📈</span>
            <div className="leading-tight">
              <span className="text-[10px] uppercase font-black text-[#bccac1] block">
                7-Day Velocity
              </span>
              <span
                className={`font-mono font-black text-xs ${
                  isPositiveChange ? 'text-[#7ef9c7]' : 'text-[#ff5a5a]'
                }`}
              >
                {isPositiveChange ? `+${momentum.weeklyChange}%` : `${momentum.weeklyChange}%`} vs prior cycle
              </span>
            </div>
          </div>

          <div className="bg-[#170c28] border-2 border-black rounded-xl px-3.5 py-2 shadow-solid-sm flex items-center gap-2.5">
            <span className="text-xl">🏆</span>
            <div className="leading-tight">
              <span className="text-[10px] uppercase font-black text-[#bccac1] block">
                Peak Output Day
              </span>
              <span className="font-mono font-black text-xs text-[#fad02c]">
                {momentum.bestDay} • {momentum.bestDayXP} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar Visualizer */}
      <div className="pt-6">
        <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4 items-end min-h-[190px] pt-4 pb-2 px-1">
          {momentum.weeklyBreakdown.map((item) => {
            const isToday = item.day === todayName;
            const hasActivity = item.xp > 0;
            const percentHeight = Math.max(14, Math.min(100, Math.round((item.xp / maxXP) * 100)));

            return (
              <div
                key={item.day}
                onClick={() => playSfx('click')}
                className="flex flex-col items-center gap-2 group cursor-pointer"
                title={`${DAY_FULL_NAMES[item.day] || item.day}: ${item.xp} XP`}
              >
                {/* Value Pill Above Bar */}
                <div
                  className={`text-[10px] sm:text-xs font-mono font-black px-1.5 py-0.5 rounded transition-transform group-hover:-translate-y-1 ${
                    hasActivity
                      ? 'bg-[#fad02c] text-[#332500] border border-black shadow-solid-sm'
                      : 'text-[#86759f]'
                  }`}
                >
                  {hasActivity ? `${item.xp}` : '—'}
                </div>

                {/* The Bar Column */}
                <div className="w-full flex items-end justify-center h-32 relative">
                  <div
                    style={{ height: `${percentHeight}%` }}
                    className={`w-full max-w-[42px] sm:max-w-[52px] rounded-xl border-2 border-black transition-all duration-300 shadow-solid-sm group-hover:scale-105 relative ${
                      isToday
                        ? 'bg-gradient-to-t from-[#7ef9c7] to-[#80ffec] ring-2 ring-[#7ef9c7] ring-offset-2 ring-offset-[#201335]'
                        : hasActivity
                        ? 'bg-gradient-to-t from-[#ffb68d] to-[#ffd2b8]'
                        : 'bg-[#170c28] border-dashed border-[#443063] opacity-60'
                    }`}
                  >
                    {/* Active checkmark glow on completed days */}
                    {hasActivity && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black text-[#7ef9c7] border border-black flex items-center justify-center text-[9px] font-black shadow-solid-sm">
                        ✓
                      </div>
                    )}
                  </div>
                </div>

                {/* Day Label with Today indicator */}
                <div className="flex flex-col items-center gap-0.5 pt-1">
                  <span
                    className={`text-xs sm:text-sm font-black uppercase tracking-wider ${
                      isToday ? 'text-[#7ef9c7] font-heading font-black underline' : 'text-[#d3c8e4]'
                    }`}
                  >
                    {item.day}
                  </span>
                  {isToday && (
                    <span className="bg-[#7ef9c7] text-[#002115] text-[9px] font-black px-1.5 py-0.2 rounded border border-black uppercase shadow-solid-sm tracking-tighter">
                      TODAY
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Habit Feedback Bar */}
      <div className="mt-5 pt-4 border-t border-[#362354] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#bccac1] font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7ef9c7] inline-block animate-pulse" />
          <span>
            {streakDays >= 3
              ? `🔥 Impressive flow! You've maintained your streak for ${streakDays} consecutive cycles.`
              : 'Complete your active quests today to keep your streak burning hot!'}
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#ffb68d] font-black uppercase tracking-wider">
          PROTOCOL: 7-DAY RECURSIVE SYNC
        </span>
      </div>
    </section>
  );
}
