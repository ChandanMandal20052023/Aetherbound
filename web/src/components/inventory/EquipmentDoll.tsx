'use client';

import React from 'react';
import Image from 'next/image';
import type { EquipmentLoadout } from '@/types/inventory';

interface EquipmentDollProps {
  equipment: EquipmentLoadout;
}

export function EquipmentDoll({ equipment }: EquipmentDollProps) {
  return (
    <div className="bg-[#201335] border-4 border-black p-4 sm:p-5 shadow-solid-lg relative rounded-xl">
      {/* Tape Badge */}
      <div className="absolute -top-3 left-4 bg-[#ffb68d] text-black font-black text-xs uppercase px-3 py-0.5 border-2 border-black shadow-solid-sm rotate-1 tracking-wider">
        EQUIPMENT
      </div>

      <div className="mt-2 flex flex-col items-center">
        {/* Head Slot Quick Pill */}
        <div className="w-full max-w-[220px] bg-[#190c2d] border-2 border-black p-1.5 flex items-center gap-2 shadow-solid-sm mb-2 -rotate-1 rounded-lg">
          <div className="w-8 h-8 bg-[#3b2f51] border border-black flex items-center justify-center text-[#b892ff] rounded">
            <span className="material-symbols-outlined text-[18px]">crown</span>
          </div>
          <div className="leading-tight">
            <span className="text-[10px] font-black uppercase text-[#bccac1] block">
              Head
            </span>
            <span className="text-xs font-black text-[#b892ff]">
              {equipment.head?.name || 'Empty'} [EPIC]
            </span>
          </div>
        </div>

        {/* Center Stage with Flanking Slots */}
        <div className="relative w-full flex items-center justify-center py-2">
          {/* Left Slot: Chest */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="bg-[#7ef9c7] text-black font-black text-[9px] px-2 py-0.5 border-2 border-black -rotate-6 shadow-solid-sm mb-1 rounded uppercase">
              ✦ Chest
            </div>
            <div className="w-14 sm:w-16 h-20 bg-[#302445] border-2 border-black p-1 flex flex-col items-center justify-center shadow-solid-sm rounded-lg">
              <span className="material-symbols-outlined text-[#fad02c] text-[28px]">
                shield
              </span>
              <span className="text-[9px] font-black text-center text-[#fad02c] mt-1 leading-none truncate w-full">
                {equipment.chest?.name || 'None'}
              </span>
            </div>
          </div>

          {/* Character Doll Portrait */}
          <div className="w-36 h-48 bg-[#190c2d] border-3 border-black rounded-xl overflow-hidden flex items-center justify-center relative shadow-solid">
            <Image
              src="/avatars/Avatar-1.jpg"
              alt="Avatar Doll"
              fill
              className="object-cover object-top"
              sizes="144px"
            />
            <div className="absolute bottom-1 bg-[#130728]/90 px-2 py-0.5 border border-black text-[9px] font-black text-[#7ef9c7] uppercase rounded">
              LVL 12 TRAILBLAZER
            </div>
          </div>

          {/* Right Slot: Weapon */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="bg-[#ffb68d] text-black font-black text-[9px] px-2 py-0.5 border-2 border-black rotate-6 shadow-solid-sm mb-1 rounded uppercase">
              🗡 Weapon
            </div>
            <div className="w-14 sm:w-16 h-20 bg-[#302445] border-2 border-black p-1 flex flex-col items-center justify-center shadow-solid-sm rounded-lg">
              <span className="material-symbols-outlined text-[#70c5ff] text-[28px]">
                colorize
              </span>
              <span className="text-[9px] font-black text-center text-[#70c5ff] mt-1 leading-none truncate w-full">
                {equipment.weapon?.name || 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* Boots Slot */}
        <div className="w-full max-w-[220px] bg-[#190c2d] border-2 border-black p-1.5 flex items-center gap-2 shadow-solid-sm mt-1 rotate-1 rounded-lg">
          <div className="w-8 h-8 bg-[#3b2f51] border border-black flex items-center justify-center text-[#7ef9c7] rounded">
            <span className="material-symbols-outlined text-[18px]">hiking</span>
          </div>
          <div className="leading-tight">
            <span className="text-[10px] font-black uppercase text-[#bccac1] block">
              Boots
            </span>
            <span className="text-xs font-black text-white">
              {equipment.boots?.name || 'Empty'} [RARE]
            </span>
          </div>
        </div>

        {/* Stat Summary Bar */}
        <div className="w-full mt-3 bg-[#190c2d] border-2 border-black py-1.5 px-3 text-center shadow-solid-sm rounded-lg">
          <span className="text-xs font-black text-white">
            Equipped Power:{' '}
            <span className="text-[#7ef9c7] font-black">142</span> • DEF{' '}
            <span className="text-[#ffb68d] font-black">38</span>
          </span>
        </div>
      </div>
    </div>
  );
}
