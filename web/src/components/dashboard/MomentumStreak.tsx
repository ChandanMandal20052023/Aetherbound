import React from 'react';
import type { MomentumData } from '@/types/player';

interface MomentumStreakProps {
  momentum: MomentumData;
}

export function MomentumStreak({ momentum }: MomentumStreakProps) {
  return (
    <footer className="bg-[#cbbeeb] border-pixel-thick shadow-solid-lg rounded-2xl p-5 sm:p-6 lg:p-7 text-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Title and Details */}
        <div className="lg:col-span-5 space-y-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black font-heading">
            Momentum Streak
          </h2>
          <p className="text-sm lg:text-base font-bold text-[#352554]">
            {momentum.weeklyTotal} XP this week •{' '}
            <span className="text-black font-extrabold">
              +{momentum.weeklyChange}% from last week
            </span>
          </p>
        </div>

        {/* Center Bar Graph */}
        <div className="lg:col-span-4 flex items-end justify-center gap-3 sm:gap-4 h-28 pt-2">
          {momentum.weeklyBreakdown.map((item, idx) => {
            // Height proportional to max 360 xp
            const heightPx = Math.max(24, Math.round((item.xp / 360) * 96));
            const isMint = idx % 2 === 0;

            return (
              <div key={item.day} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 sm:w-12 border-pixel rounded-2xl shadow-solid-sm transition-all hover:scale-105 ${
                    isMint ? 'bg-[#7ef9c7]' : 'bg-[#ffb68d]'
                  }`}
                  style={{ height: `${heightPx}px` }}
                  title={`${item.day}: ${item.xp} XP`}
                />
                <span className="text-[11px] font-black tracking-tighter text-black">
                  {item.day} {item.xp}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Streak Stats Pills */}
        <div className="lg:col-span-3 flex flex-col gap-2.5">
          {/* Current Streak Card */}
          <div className="bg-[#ffb68d] border-pixel rounded-xl px-4 py-2.5 shadow-solid flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-[#542416] leading-none">
                CURRENT STREAK:
              </p>
              <p className="text-base font-black text-black mt-0.5">
                {momentum.currentStreak} DAYS
              </p>
            </div>
            <span className="text-2xl text-[#f05e3b]">🔥</span>
          </div>

          {/* Best Day Card */}
          <div className="bg-[#7ef9c7] border-pixel rounded-xl px-4 py-2.5 shadow-solid flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-[10px] font-black uppercase text-[#144d38] leading-none">
                Best Day:
              </p>
              <p className="text-sm font-black text-black mt-0.5">
                {momentum.bestDay} • {momentum.bestDayXP} XP
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
