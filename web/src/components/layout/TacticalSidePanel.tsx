'use client';

import React, { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';
import { sound } from '@/lib/audio';

export function TacticalSidePanel() {
  const {
    showTacticalPanel,
    openTacticalPanel,
    closeTacticalPanel,
    openAlchemist,
    openFocusChamber,
    openBattleCard,
    openTerms,
    openCode,
    player,
    playSfx,
  } = useGame();

  const [droneOn, setDroneOn] = React.useState(false);

  // Sync drone state
  useEffect(() => {
    setDroneOn(sound.isDroneActive());
  }, [showTacticalPanel]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showTacticalPanel) {
        closeTacticalPanel();
      }
      // Shortcut: 't' or 'T' when not in input
      if (
        (e.key === 't' || e.key === 'T') &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
      ) {
        if (!showTacticalPanel) openTacticalPanel();
        else closeTacticalPanel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTacticalPanel, openTacticalPanel, closeTacticalPanel]);

  const handleToggleDrone = () => {
    playSfx('toggle');
    const next = sound.toggleAmbientDrone();
    setDroneOn(next);
  };

  return (
    <>
      {/* ─── DOCKED RIGHT-EDGE FLOATING TRIGGER ─── */}
      {!showTacticalPanel && (
        <button
          type="button"
          onClick={openTacticalPanel}
          title="Open Tactical Command (Press 'T')"
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#fad02c] hover:bg-[#ffe169] text-black border-2 border-r-0 border-black rounded-l-2xl shadow-solid p-2.5 sm:py-3.5 sm:px-3 flex flex-col items-center gap-2 transition-transform hover:-translate-x-1 cursor-pointer group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black" />
          </span>
          <span className="text-[11px] font-black tracking-widest uppercase [writing-mode:vertical-lr] rotate-180">
            TACTICAL FORGE ⚡
          </span>
        </button>
      )}

      {/* ─── BACKDROP OVERLAY ─── */}
      {showTacticalPanel && (
        <div
          onClick={closeTacticalPanel}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 animate-fade-in"
        />
      )}

      {/* ─── SLIDE-OUT SIDE DRAWER ─── */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-[380px] sm:max-w-[420px] bg-[#1a0d2e]/95 backdrop-blur-md border-l-4 border-black z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
          showTacticalPanel ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="p-5 border-b-2 border-[#362354] bg-[#201335] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fad02c] border-2 border-black flex items-center justify-center text-black text-xl font-black shadow-solid-sm">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#fad02c] text-black font-black text-[9px] px-2 py-0.2 rounded border border-black uppercase shadow-solid-sm">
                  SIDE DOCK
                </span>
                <span className="text-[10px] font-mono text-[#7ef9c7] font-bold">
                  PRESS &apos;T&apos; TO TOGGLE
                </span>
              </div>
              <h2 className="text-lg font-black uppercase text-white font-heading tracking-tight">
                TACTICAL COMMAND
              </h2>
              <p className="text-[11px] text-[#bccac1] font-semibold">
                AETHER FORGE SUITE
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeTacticalPanel}
            className="w-8 h-8 rounded-lg bg-[#130728] border-2 border-black flex items-center justify-center text-sm font-black text-[#bccac1] hover:text-white hover:bg-[#ff5a5a] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Tools Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-white">
          {/* Card 1: AI Quest Alchemist */}
          <div className="bg-[#201335] border-2 border-black rounded-xl p-4 shadow-solid-sm space-y-2 hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚗️</span>
                <h3 className="font-black text-xs sm:text-sm uppercase text-white tracking-wide">
                  AI QUEST ALCHEMIST
                </h3>
              </div>
              <span className="bg-[#fad02c] text-black text-[9px] font-black px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
                GOAL AI
              </span>
            </div>
            <p className="text-xs text-[#bccac1] leading-relaxed">
              Deconstruct complex goals into 3-stage tactical RPG quest chains with auto-calculated XP & Gold.
            </p>
            <Button
              variant="gold"
              size="sm"
              onClick={() => {
                closeTacticalPanel();
                openAlchemist();
              }}
              className="w-full text-xs font-black uppercase shadow-solid-sm mt-1"
              withArrow
            >
              LAUNCH ALCHEMIST ⚡
            </Button>
          </div>

          {/* Card 2: Chrono Focus Chamber */}
          <div className="bg-[#201335] border-2 border-black rounded-xl p-4 shadow-solid-sm space-y-2 hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">⏳</span>
                <h3 className="font-black text-xs sm:text-sm uppercase text-white tracking-wide">
                  CHRONO FOCUS CHAMBER
                </h3>
              </div>
              <span className="bg-[#7ef9c7] text-black text-[9px] font-black px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
                POMODORO
              </span>
            </div>
            <p className="text-xs text-[#bccac1] leading-relaxed">
              Timed deep work crucible (15m, 25m, 45m). Harvest bonus XP and Gold upon surviving the sprint.
            </p>
            <Button
              variant="lavender"
              size="sm"
              onClick={() => {
                closeTacticalPanel();
                openFocusChamber();
              }}
              className="w-full text-xs font-black uppercase shadow-solid-sm mt-1"
              withArrow
            >
              ENTER CHAMBER ⏳
            </Button>
          </div>

          {/* Card 3: Operative Battle Card */}
          <div className="bg-[#201335] border-2 border-black rounded-xl p-4 shadow-solid-sm space-y-2 hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎴</span>
                <h3 className="font-black text-xs sm:text-sm uppercase text-white tracking-wide">
                  OPERATIVE BATTLE CARD
                </h3>
              </div>
              <span className="bg-[#ffb68d] text-black text-[9px] font-black px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
                DOSSIER
              </span>
            </div>
            <p className="text-xs text-[#bccac1] leading-relaxed">
              Render an ultra-crisp holographic combat card. Download PNG or copy straight to clipboard to flex online.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                closeTacticalPanel();
                openBattleCard();
              }}
              className="w-full text-xs font-black uppercase shadow-solid-sm mt-1"
              withArrow
            >
              EXPORT CARD 🎴
            </Button>
          </div>

          {/* Card 4: Binaural Focus Drone */}
          <div className="bg-[#170c28] border-2 border-black rounded-xl p-3.5 shadow-solid-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{droneOn ? '🎧' : '🔇'}</span>
              <div>
                <p className="text-xs font-black uppercase text-white">Binaural Focus Drone</p>
                <p className="text-[10px] text-[#bccac1]">Zero-bandwidth synth focus frequency</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleDrone}
              className={`px-3 py-1.5 rounded-lg border border-black text-[10px] font-black uppercase shadow-solid-sm transition-all cursor-pointer ${
                droneOn
                  ? 'bg-[#7ef9c7] text-black'
                  : 'bg-[#2b1947] text-[#bccac1] hover:text-white'
              }`}
            >
              {droneOn ? 'ACTIVE 🔊' : 'MUTED 🔇'}
            </button>
          </div>

          {/* Quick Lore & Charters */}
          <div className="pt-2 border-t border-[#362354] grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                closeTacticalPanel();
                openTerms();
              }}
              className="p-2 bg-[#130728] hover:bg-[#201335] border border-black rounded-lg text-[10px] font-black text-[#bccac1] hover:text-white uppercase transition-colors text-center cursor-pointer"
            >
              📜 TERMS OF TRIAL
            </button>
            <button
              type="button"
              onClick={() => {
                closeTacticalPanel();
                openCode();
              }}
              className="p-2 bg-[#130728] hover:bg-[#201335] border border-black rounded-lg text-[10px] font-black text-[#bccac1] hover:text-white uppercase transition-colors text-center cursor-pointer"
            >
              🌌 AETHER CODE
            </button>
          </div>
        </div>

        {/* Bottom Operative Footer Bar */}
        {player && (
          <div className="p-4 border-t-2 border-[#362354] bg-[#201335] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7ef9c7] border border-black animate-pulse" />
              <span className="text-xs font-black text-white uppercase">{player.username}</span>
              <span className="text-[10px] font-mono text-[#7ef9c7]">LVL {player.stats.level}</span>
            </div>
            <span className="text-xs font-black text-[#ffb68d]">
              🔥 {player.stats.streakDays}d streak
            </span>
          </div>
        )}
      </aside>
    </>
  );
}
