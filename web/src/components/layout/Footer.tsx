'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { authService } from '@/services/auth.service';

export function Footer() {
  const router = useRouter();
  const { openTerms, openCode, playSfx } = useGame();

  const handleExit = async () => {
    try {
      playSfx('click');
      await authService.logout();
      router.push('/login');
    } catch {
      router.push('/login');
    }
  };

  return (
    <footer className="mt-12 py-6 border-t-2 border-black/50 bg-[#160b24]/80 text-xs text-[#bccac1]">
      <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7ef9c7] border border-black animate-pulse" />
          <span className="font-mono text-[#7ef9c7]">AETHERBOUND ENGINE V.2.0.4</span>
          <span className="text-[#86948c]">•</span>
          <span>CYCLE 3 : MOONFALL</span>
        </div>
        <div className="flex items-center gap-6 font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={openTerms}
            className="hover:text-[#7ef9c7] transition-colors focus:outline-none cursor-pointer underline-offset-4 hover:underline"
          >
            Terms of Trial
          </button>
          <button
            type="button"
            onClick={openCode}
            className="hover:text-[#7ef9c7] transition-colors focus:outline-none cursor-pointer underline-offset-4 hover:underline"
          >
            Aether Code
          </button>
          <button
            type="button"
            onClick={handleExit}
            className="hover:text-[#ffb68d] transition-colors focus:outline-none cursor-pointer underline-offset-4 hover:underline"
          >
            Exit Portal
          </button>
        </div>
      </div>
    </footer>
  );
}
