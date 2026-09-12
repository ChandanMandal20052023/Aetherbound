'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  previousLevel?: number;
  newLevel?: number;
}

export function LevelUpModal({
  isOpen,
  onClose,
  previousLevel = 12,
  newLevel = 13,
}: LevelUpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/85 backdrop-blur-md">
      {/* Central Celebratory Container */}
      <div className="relative w-full max-w-2xl my-auto animate-float">
        {/* Arcane Sunburst Rays */}
        <div className="absolute -top-32 sm:-top-40 left-1/2 -translate-x-1/2 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] pointer-events-none -z-10 flex items-center justify-center opacity-80">
          <div className="w-full h-full animate-[spin_40s_linear_infinite]">
            <svg
              className="w-full h-full fill-none drop-shadow-[0_0_25px_rgba(126,249,199,0.35)]"
              viewBox="0 0 400 400"
            >
              <polygon fill="#7EF9C7" opacity="0.22" points="200,200 170,0 230,0" />
              <polygon fill="#FAD02C" opacity="0.18" points="200,200 400,170 400,230" />
              <polygon fill="#7EF9C7" opacity="0.22" points="200,200 170,400 230,400" />
              <polygon fill="#FAD02C" opacity="0.18" points="200,200 0,170 0,230" />
              <polygon fill="#7EF9C7" opacity="0.15" points="200,200 320,40 370,80" />
              <polygon fill="#FAD02C" opacity="0.2" points="200,200 370,320 320,360" />
              <polygon fill="#7EF9C7" opacity="0.15" points="200,200 80,370 40,320" />
              <polygon fill="#FAD02C" opacity="0.2" points="200,200 40,80 80,40" />
            </svg>
          </div>
        </div>

        {/* Floating Top Decal Tape Badge */}
        <div className="flex justify-center -mb-4 relative z-30">
          <div className="bg-[#ffb68d] text-[#331200] px-5 py-1 border-3 border-black font-black text-xs tracking-widest uppercase shadow-solid -rotate-1 flex items-center gap-2 rounded">
            <span>✦</span>
            <span>SAGA ASCENSION • RANK MILESTONE</span>
            <span>✦</span>
          </div>
        </div>

        {/* Main Modal Card */}
        <div className="bg-[#201335] border-4 border-black shadow-solid-lg p-5 sm:p-7 relative rounded-2xl">
          {/* Corner Accent Sticker */}
          <div className="absolute -top-3 -right-3 bg-[#7ef9c7] text-black font-black text-xs px-3 py-1 border-2 border-black shadow-solid-sm rotate-3 z-20 uppercase rounded">
            RANK UP!
          </div>

          {/* Celestial Level Up Title */}
          <div className="text-center pt-3 pb-2">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#7ef9c7] drop-shadow-[3px_3px_0px_#000000] uppercase font-heading">
              LEVEL UP!
            </h1>

            {/* Level Progression Indicator Banner */}
            <div className="mt-3 flex items-center justify-center gap-3 sm:gap-5">
              <div className="bg-[#130728] border-2 border-black px-4 py-1.5 rounded-lg shadow-solid-sm">
                <span className="text-[10px] font-black text-[#bccac1] uppercase block">
                  PREVIOUS
                </span>
                <span className="text-lg font-black text-white">
                  LVL {previousLevel}
                </span>
              </div>
              <div className="w-8 h-8 bg-[#7ef9c7] text-black border-2 border-black rounded-full flex items-center justify-center font-black shadow-solid-sm text-sm">
                →
              </div>
              <div className="bg-[#fad02c] text-black border-2 border-black px-5 py-1.5 rounded-lg shadow-solid rotate-1">
                <span className="text-[10px] font-black uppercase block">
                  ASCENDED
                </span>
                <span className="text-xl font-black">LVL {newLevel}</span>
              </div>
            </div>
          </div>

          {/* Avatar Showcase */}
          <div className="my-3 flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 border-4 border-black shadow-solid bg-gradient-to-tr from-[#7ef9c7] via-[#fad02c] to-[#ffb68d] overflow-hidden relative">
                <Image
                  src="/avatars/Avatar-1.jpg"
                  alt="Avatar"
                  fill
                  className="object-cover object-top rounded-full"
                  sizes="128px"
                />
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#130728] border-2 border-black px-3 py-0.5 rounded-full shadow-solid-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7ef9c7] animate-ping" />
                <span className="text-[10px] font-black text-[#7ef9c7] uppercase">
                  Arcane Trailblazer MK-II
                </span>
              </div>
            </div>
          </div>

          {/* Attribute Buffs Strip */}
          <div className="mt-4 mb-4 bg-[#130728] border-2 border-black p-2.5 rounded-lg shadow-solid-sm flex flex-wrap items-center justify-around gap-2 text-center">
            <div className="flex items-center gap-1.5 text-[#7ef9c7] text-xs font-black">
              <span>⚡</span>
              <span>+5 Focus Capacity</span>
            </div>
            <span className="text-black font-black hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-[#ffb68d] text-xs font-black">
              <span>🛡️</span>
              <span>+3 Discipline Surge</span>
            </div>
            <span className="text-black font-black hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-[#fad02c] text-xs font-black">
              <span>❤️</span>
              <span>Energy Full Refill</span>
            </div>
          </div>

          {/* Unlocked Rewards */}
          <div className="mb-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                <span>🎁</span>
                <span>Ascension Rewards Unlocked</span>
              </span>
              <span className="text-[9px] font-black text-[#7ef9c7] uppercase bg-[#130728] px-2 py-0.5 rounded border border-black">
                4 NEW ASSETS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-[#25193a] border-2 border-black p-2 rounded-lg text-center shadow-solid-sm">
                <span className="text-xl block mb-0.5">🪙</span>
                <span className="font-mono font-black text-sm text-[#fad02c] block">
                  +500
                </span>
                <span className="text-[9px] font-black text-[#bccac1] uppercase">
                  Gold Coins
                </span>
              </div>
              <div className="bg-[#25193a] border-2 border-black p-2 rounded-lg text-center shadow-solid-sm">
                <span className="text-xl block mb-0.5">🍑</span>
                <span className="font-mono font-black text-sm text-[#ffb68d] block">
                  +10
                </span>
                <span className="text-[9px] font-black text-[#bccac1] uppercase">
                  Sunlit Peach
                </span>
              </div>
              <div className="bg-[#25193a] border-2 border-black p-2 rounded-lg text-center shadow-solid-sm">
                <span className="text-xl block mb-0.5">✨</span>
                <span className="font-black text-xs text-[#b892ff] block truncate">
                  Void Shard
                </span>
                <span className="text-[9px] font-black text-[#bccac1] uppercase">
                  Rare Crafting
                </span>
              </div>
              <div className="bg-[#25193a] border-2 border-black p-2 rounded-lg text-center shadow-solid-sm">
                <span className="text-xl block mb-0.5">🏷️</span>
                <span className="font-black text-xs text-[#7ef9c7] block truncate">
                  Trailblazer II
                </span>
                <span className="text-[9px] font-black text-[#bccac1] uppercase">
                  New Title
                </span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onClose}
            withArrow
          >
            CLAIM REWARDS & ASCEND
          </Button>
        </div>
      </div>
    </div>
  );
}
