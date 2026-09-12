'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';
import { sound } from '@/lib/audio';

interface FocusChamberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_MINUTES = [
  { label: '15m Scout', minutes: 15, xp: 45, gold: 22 },
  { label: '25m Skirmish', minutes: 25, xp: 75, gold: 38 },
  { label: '45m Boss Raid', minutes: 45, xp: 135, gold: 68 },
];

export function FocusChamberModal({ isOpen, onClose }: FocusChamberModalProps) {
  const { playSfx, refreshPlayer, player } = useGame();

  const [selectedPreset, setSelectedPreset] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [droneEnabled, setDroneEnabled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [rewardStats, setRewardStats] = useState<{ xp: number; gold: number; leveledUp: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSeconds = selectedPreset * 60;

  // Cleanup on unmount or close
  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      sound.stopAmbientDrone();
      setDroneEnabled(false);
      setIsRunning(false);
      setCompleted(false);
      setRewardStats(null);
    }
  }, [isOpen]);

  // Timer loop
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setCompleted(true);
            sound.stopAmbientDrone();
            setDroneEnabled(false);
            handleSprintFinished();
            return 0;
          }
          // Optional ticking audio every second
          if (prev % 5 === 0) {
            sound.play('focusTick');
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  if (!isOpen) return null;

  const handleSelectPreset = (minutes: number) => {
    if (isRunning) return;
    playSfx('click');
    setSelectedPreset(minutes);
    setTimeLeft(minutes * 60);
    setCompleted(false);
    setRewardStats(null);
  };

  const handleTogglePlay = () => {
    playSfx('click');
    if (!isRunning) {
      setIsRunning(true);
      if (droneEnabled) sound.startAmbientDrone();
    } else {
      setIsRunning(false);
      sound.stopAmbientDrone();
    }
  };

  const handleReset = () => {
    playSfx('click');
    setIsRunning(false);
    setTimeLeft(selectedPreset * 60);
    setCompleted(false);
    setRewardStats(null);
    sound.stopAmbientDrone();
  };

  const handleToggleDrone = () => {
    playSfx('toggle');
    const next = !droneEnabled;
    setDroneEnabled(next);
    if (isRunning) {
      if (next) sound.startAmbientDrone();
      else sound.stopAmbientDrone();
    }
  };

  const handleSprintFinished = async () => {
    setSubmitting(true);
    playSfx('levelUp');

    try {
      const res = await fetch('/api/player/focus-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minutes: selectedPreset }),
      });

      if (res.ok) {
        const data = await res.json();
        setRewardStats({
          xp: data.earnedXP,
          gold: data.earnedGold,
          leveledUp: data.leveledUp,
        });
        await refreshPlayer();
      }
    } catch {
      // Fallback
    } finally {
      setSubmitting(false);
    }
  };

  // Progress calculations
  const progressRatio = Math.max(0, Math.min(1, 1 - timeLeft / totalSeconds));
  const strokeDashoffset = 283 * (1 - progressRatio);
  const minutesDisplay = Math.floor(timeLeft / 60);
  const secondsDisplay = timeLeft % 60;
  const formattedTime = `${String(minutesDisplay).padStart(2, '0')}:${String(secondsDisplay).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 sm:p-8 space-y-6 text-white border-[#000000]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#362354] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-spin-slow">⏳</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#7ef9c7] text-black text-[10px] font-black px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
                  DEEP FOCUS CRUCIBLE
                </span>
              </div>
              <h2 className="text-xl font-black uppercase font-heading text-white tracking-tight">
                CHRONO FOCUS CHAMBER
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playSfx('click');
              sound.stopAmbientDrone();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-[#130728] border-2 border-black flex items-center justify-center text-sm font-black text-[#bccac1] hover:text-white hover:bg-[#ff5a5a] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Presets */}
        <div className="flex items-center justify-center gap-2">
          {PRESET_MINUTES.map((p) => (
            <button
              key={p.minutes}
              type="button"
              disabled={isRunning}
              onClick={() => handleSelectPreset(p.minutes)}
              className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs font-black uppercase transition-all cursor-pointer ${
                selectedPreset === p.minutes
                  ? 'bg-[#fad02c] text-black shadow-solid-sm -translate-y-0.5'
                  : 'bg-[#170c28] text-[#bccac1] hover:bg-[#2e1c4a]'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Circular SVG Timer */}
        <div className="flex flex-col items-center justify-center py-2 relative">
          <div className="relative w-56 h-56 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-[#130728]"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Animated Progress ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-[#7ef9c7] transition-all duration-500 ease-linear"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center justify-center text-center space-y-1">
              <span className="font-mono text-4xl sm:text-5xl font-black text-white tracking-wider drop-shadow-md">
                {formattedTime}
              </span>
              <span className="text-[11px] font-black uppercase text-[#fad02c] tracking-widest">
                {isRunning ? 'CRUCIBLE ENGAGED' : completed ? 'VICTORY SEALED' : 'READY TO EMBARK'}
              </span>
              <span className="text-[9px] font-mono text-[#bccac1]">
                +{Math.round(selectedPreset * 3)} XP • +{Math.round(selectedPreset * 1.5)} G
              </span>
            </div>
          </div>
        </div>

        {/* Ambient Drone & Audio Controls */}
        <div className="bg-[#170c28] border-2 border-black rounded-xl p-3 flex items-center justify-between shadow-solid-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">{droneEnabled ? '🎧' : '🔇'}</span>
            <div>
              <p className="text-xs font-black uppercase text-white">Binaural Focus Drone</p>
              <p className="text-[10px] text-[#bccac1]">Low-pass warm sine frequency</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleToggleDrone}
            className={`px-3 py-1 rounded-lg border border-black text-[10px] font-black uppercase shadow-solid-sm transition-all cursor-pointer ${
              droneEnabled ? 'bg-[#7ef9c7] text-black' : 'bg-[#2b1947] text-[#bccac1]'
            }`}
          >
            {droneEnabled ? 'DRONE ACTIVE' : 'MUTED'}
          </button>
        </div>

        {/* Victory Banner */}
        {completed && rewardStats && (
          <div className="p-4 rounded-xl bg-[#7ef9c7]/20 border-2 border-[#7ef9c7] space-y-2 text-center animate-fade-in shadow-solid-sm">
            <div className="text-2xl">🏆</div>
            <h3 className="font-black text-sm uppercase text-[#7ef9c7] tracking-wider">
              FOCUS SPRINT COMPLETED!
            </h3>
            <p className="text-xs text-white">
              Allocated <span className="font-bold text-[#fad02c]">+{rewardStats.xp} XP</span> and{' '}
              <span className="font-bold text-[#ffb68d]">+{rewardStats.gold} Gold</span> to your operative profile.
            </p>
            {rewardStats.leveledUp && (
              <p className="text-xs font-black uppercase text-[#ffb68d] animate-bounce">
                🎉 LEVEL UP ACHIEVED!
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 border-t-2 border-[#362354] flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={submitting}
            className="text-xs font-black uppercase"
          >
            RESET ↺
          </Button>

          {!completed ? (
            <Button
              variant={isRunning ? 'danger' : 'gold'}
              size="md"
              onClick={handleTogglePlay}
              className="flex-1 font-black uppercase text-sm shadow-solid"
            >
              {isRunning ? 'PAUSE CRUCIBLE ⏸' : 'ENGAGE SPRINT ▶'}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                playSfx('click');
                onClose();
              }}
              className="flex-1 font-black uppercase text-sm shadow-solid"
            >
              CLAIM & RETURN ✓
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
