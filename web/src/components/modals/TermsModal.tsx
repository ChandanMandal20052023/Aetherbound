'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const { playSfx } = useGame();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 md:p-8 space-y-6 text-white border-[#000000] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#362354] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📜</span>
            <div>
              <h2 className="text-xl md:text-2xl font-black uppercase font-heading text-white tracking-tight">
                TERMS OF TRIAL
              </h2>
              <p className="text-xs text-[#7ef9c7] font-bold uppercase tracking-wider">
                DISCIPLINE PROTOCOL & INTEGRITY CHARTER
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

        {/* Document Content */}
        <div className="space-y-4 text-xs sm:text-sm text-[#dcd1ea] leading-relaxed">
          <div className="bg-[#170c28] border-2 border-black rounded-xl p-4 space-y-2 shadow-solid-sm">
            <h3 className="font-black text-sm uppercase text-[#ffb68d] tracking-wide flex items-center gap-2">
              <span>⚡</span> ARTICLE I: THE SANCTITY OF DAILY FOCUS
            </h3>
            <p>
              Aetherbound is a gamified life system built to transform real-world effort into digital resonance. 
              By accepting these Terms of Trial, each operative pledges to mark quests as resolved only when the underlying 
              real-world task, workout, focus sprint, or habit has been genuinely executed.
            </p>
          </div>

          <div className="bg-[#170c28] border-2 border-black rounded-xl p-4 space-y-2 shadow-solid-sm">
            <h3 className="font-black text-sm uppercase text-[#7ef9c7] tracking-wide flex items-center gap-2">
              <span>📐</span> ARTICLE II: FAIR PROGRESSION & XP CURVE
            </h3>
            <p>
              Your operative progression is mathematically governed by the curve:
            </p>
            <div className="bg-[#10071e] p-2.5 rounded-lg border border-[#362354] font-mono text-[#fad02c] text-xs font-bold text-center">
              XP_required(Level) = 100 · Level^1.65 + 25 · Level^2
            </div>
            <p>
              Initial levels advance generously to build momentum. Higher mastery tiers demand sustained discipline and consistency.
            </p>
          </div>

          <div className="bg-[#170c28] border-2 border-black rounded-xl p-4 space-y-2 shadow-solid-sm">
            <h3 className="font-black text-sm uppercase text-[#fad02c] tracking-wide flex items-center gap-2">
              <span>🛡️</span> ARTICLE III: VAULT CUSTODY & REWARDS
            </h3>
            <p>
              Artifacts, armor pieces, and focus elixirs purchased from the Astral Black Market are synchronized 
              directly to your operative inventory. Equipping gear boosts your loadout aesthetic and reinforces your psychological commitment to deep work.
            </p>
          </div>

          <div className="bg-[#170c28] border-2 border-black rounded-xl p-4 space-y-2 shadow-solid-sm">
            <h3 className="font-black text-sm uppercase text-[#ffb68d] tracking-wide flex items-center gap-2">
              <span>🔥</span> ARTICLE IV: THE UNBROKEN STREAK COVENANT
            </h3>
            <p>
              Discipline streaks award multipliers up to 2.0x. A single cycle of distraction should never derail your campaign: 
              commune with the Astral Core daily to renew your resolve and safeguard your streak.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-[#362354] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#8f82aa] font-bold">
            SANCTUARY REVISION • ARCHIVE 2026.09
          </span>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              playSfx('click');
              onClose();
            }}
          >
            I ACCEPT THE TRIAL ✓
          </Button>
        </div>
      </div>
    </div>
  );
}
