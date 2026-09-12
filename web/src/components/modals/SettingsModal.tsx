'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';
import { LANGUAGE_LABELS, LanguageMode } from '@/lib/dictionary';
import { authService } from '@/services/auth.service';

export function SettingsModal() {
  const router = useRouter();
  const {
    soundEnabled,
    soundVolume,
    toggleSound,
    setVolume,
    playSfx,
    languageMode,
    setLanguageMode,
    showSettings,
    closeSettings,
    openTutorial,
    openTerms,
    openCode,
    player,
  } = useGame();

  if (!showSettings) return null;

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore
    }
    router.push('/login');
    router.refresh();
  };

  const handleTestSound = () => {
    playSfx('dailyBonus');
  };

  const modes: LanguageMode[] = ['arcane', 'standard', 'simple'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 md:p-8 space-y-6 text-white border-[#000000] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#362354] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <h2 className="text-xl font-black uppercase font-heading text-white tracking-tight">
                SYSTEM CONFIGURATION
              </h2>
              <p className="text-xs text-[#7ef9c7] font-bold uppercase tracking-wider">
                PREFERENCES & AUDIO PROTOCOL
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeSettings}
            className="w-8 h-8 rounded-lg bg-[#130728] border-2 border-black flex items-center justify-center text-sm font-black text-[#bccac1] hover:text-white hover:bg-[#ff5a5a] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* SECTION 1: LANGUAGE COMPLEXITY */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#ffb68d] flex items-center gap-2">
              <span>🌐</span> LANGUAGE COMPLEXITY
            </h3>
            <span className="text-[10px] text-[#bccac1] font-bold uppercase">
              INSTANT TRANSLATION
            </span>
          </div>
          <p className="text-xs text-[#bccac1] leading-relaxed">
            Adjust the in-game terminology. Choose Arcane for immersive sci-fi lore, or Simple for everyday plain English.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {modes.map((mode) => {
              const info = LANGUAGE_LABELS[mode];
              const isSelected = languageMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLanguageMode(mode)}
                  className={`p-3 rounded-xl border-2 border-black flex flex-col items-center text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#7ef9c7] text-[#002115] shadow-solid scale-[1.02] font-black'
                      : 'bg-[#170c28] hover:bg-[#25173e] text-white font-bold'
                  }`}
                >
                  <span className="text-2xl mb-1">{info.icon}</span>
                  <span className="text-xs uppercase font-extrabold">{info.name}</span>
                  <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-[#002115]' : 'text-[#bccac1]'}`}>
                    {info.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: AUDIO & SFX */}
        <div className="space-y-3 border-t-2 border-[#362354] pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#ffb68d] flex items-center gap-2">
              <span>🔊</span> AUDIO & SYNTHESIZED SFX
            </h3>
            <span className="text-[10px] text-[#7ef9c7] font-bold uppercase">
              ZERO-LATENCY SYNTH
            </span>
          </div>

          <div className="bg-[#170c28] border-2 border-black rounded-xl p-4 space-y-4">
            {/* Toggle Row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase text-white">Sound Effects</p>
                <p className="text-[11px] text-[#bccac1]">Plays chimes for quests, level-up, and coins</p>
              </div>
              <button
                type="button"
                onClick={toggleSound}
                className={`px-4 py-1.5 rounded-lg border-2 border-black text-xs font-black uppercase shadow-solid-sm transition-all cursor-pointer ${
                  soundEnabled
                    ? 'bg-[#7ef9c7] text-[#002115]'
                    : 'bg-[#ff5a5a] text-white'
                }`}
              >
                {soundEnabled ? '🔊 ENABLED' : '🔇 MUTED'}
              </button>
            </div>

            {/* Volume Slider & Test Button */}
            {soundEnabled && (
              <div className="space-y-2 pt-2 border-t border-[#362354]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#bccac1]">Master Volume</span>
                  <span className="font-mono font-black text-[#7ef9c7]">
                    {Math.round(soundVolume * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={soundVolume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#25173e] rounded-lg appearance-none cursor-pointer accent-[#7ef9c7]"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTestSound}
                    className="text-[10px] whitespace-nowrap px-2.5 py-1"
                  >
                    TEST CHIME 🔔
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: ONBOARDING TUTORIAL */}
        <div className="space-y-3 border-t-2 border-[#362354] pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#ffb68d] flex items-center gap-2">
              <span>📖</span> GAME GUIDE & ONBOARDING
            </h3>
          </div>
          <div className="bg-[#170c28] border-2 border-black rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase text-white">Interactive Walkthrough</p>
              <p className="text-[11px] text-[#bccac1]">Review the 5-step tutorial on quests, gear, and leveling</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                closeSettings();
                openTutorial();
              }}
              className="text-xs whitespace-nowrap"
            >
              REPLAY GUIDE 🚀
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                closeSettings();
                openTerms();
              }}
              className="text-[11px] font-black uppercase text-left justify-start"
            >
              📜 TERMS OF TRIAL
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                closeSettings();
                openCode();
              }}
              className="text-[11px] font-black uppercase text-left justify-start"
            >
              🌌 THE AETHER CODE
            </Button>
          </div>
        </div>

        {/* SECTION 4: OPERATIVE ACCOUNT */}
        {player && (
          <div className="space-y-3 border-t-2 border-[#362354] pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#ffb68d] flex items-center gap-2">
                <span>👤</span> ACTIVE OPERATIVE
              </h3>
              <span className="text-[10px] text-[#7ef9c7] font-bold uppercase">
                LVL {player.stats.level} • {player.stats.rank}
              </span>
            </div>
            <div className="bg-[#170c28] border-2 border-black rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-white">{player.username}</p>
                <p className="text-[11px] text-[#bccac1] font-mono">{player.email}</p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={handleLogout}
                className="text-xs"
              >
                LOG OUT 🚪
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t-2 border-[#362354] flex justify-end">
          <Button variant="primary" size="sm" onClick={closeSettings} className="min-w-[100px]">
            DONE ✓
          </Button>
        </div>
      </div>
    </div>
  );
}
