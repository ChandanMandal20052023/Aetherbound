'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DIRECTIVES = [
  {
    num: '01',
    title: 'VANQUISH THE HYDRA EARLY',
    text: 'Tackle the most demanding, friction-heavy mission during your morning resonance window. When the hydra falls, the rest of the day yields.',
    icon: '🐉',
  },
  {
    num: '02',
    title: 'DEFEND THE DISCIPLINE CONTINUUM',
    text: 'A streak of 1 day is a spark. A streak of 7 days is a forge. Never allow 2 consecutive days of zero progress.',
    icon: '🔥',
  },
  {
    num: '03',
    title: 'EQUIP FOR VICTORY',
    text: 'Structure your physical and digital sanctuary before embarking. Eliminate notifications, brew your focus elixir, and silence the void.',
    icon: '🛡️',
  },
  {
    num: '04',
    title: 'RESPOND TO ALLIED BEACONS',
    text: 'Discipline is contagious. When an allied operative pings or shares a raid victory, acknowledge their triumph and reinforce the guild.',
    icon: '📡',
  },
  {
    num: '05',
    title: 'ACTION OVER DELIBERATION',
    text: 'A flawed quest started today holds tenfold the resonance of a perfect plan indefinitely postponed. Slay hesitation.',
    icon: '⚡',
  },
];

export function CodeModal({ isOpen, onClose }: CodeModalProps) {
  const { playSfx } = useGame();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 md:p-8 space-y-6 text-white border-[#000000] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#362354] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌌</span>
            <div>
              <h2 className="text-xl md:text-2xl font-black uppercase font-heading text-white tracking-tight">
                THE AETHER CODE
              </h2>
              <p className="text-xs text-[#fad02c] font-bold uppercase tracking-wider">
                SACRED DIRECTIVES OF THE LIFE RPG OPERATIVE
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playSfx('click');
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-[#130728] border-2 border-black flex items-center justify-center text-sm font-black text-[#bccac1] hover:text-white hover:bg-[#ff5a5a] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Directives Cards */}
        <div className="space-y-3">
          {DIRECTIVES.map((d) => (
            <div
              key={d.num}
              className="bg-[#170c28] border-2 border-black rounded-xl p-4 flex items-start gap-4 shadow-solid-sm hover:-translate-y-0.5 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-[#201335] border-2 border-black flex items-center justify-center text-2xl shadow-solid-sm shrink-0">
                {d.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-[#fad02c] text-black font-black text-[10px] px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
                    DIRECTIVE {d.num}
                  </span>
                  <h3 className="font-black text-xs sm:text-sm uppercase text-white tracking-wide">
                    {d.title}
                  </h3>
                </div>
                <p className="text-xs text-[#dcd1ea] leading-relaxed">
                  {d.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-[#362354] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#7ef9c7] font-bold">
            SOVEREIGN COUNCIL • CREED COMMITTED
          </span>
          <Button
            variant="gold"
            size="md"
            onClick={() => {
              playSfx('questComplete');
              onClose();
            }}
          >
            I UPHOLD THE CODE ⚔️
          </Button>
        </div>
      </div>
    </div>
  );
}
