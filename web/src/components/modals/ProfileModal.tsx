'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';
import { playerService } from '@/services/player.service';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_OPTIONS = [
  { index: 1, name: 'Rise Vanguard', src: '/avatars/Avatar-1.jpg', tag: 'Vanguard' },
  { index: 2, name: 'Void Ranger', src: '/avatars/Avatar-2.jpg', tag: 'Ranger' },
  { index: 3, name: 'Aether Scholar', src: '/avatars/Avatar-3.jpg', tag: 'Scholar' },
  { index: 4, name: 'Ironclad Paladin', src: '/avatars/Avatar-4.jpg', tag: 'Paladin' },
  { index: 5, name: 'Chrono Alchemist', src: '/avatars/Avatar-5.jpg', tag: 'Alchemist' },
];

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const router = useRouter();
  const { player, updateAvatar, playSfx, openSettings, openBattleCard, t } = useGame();
  const [updating, setUpdating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  if (!isOpen || !player) return null;

  const currentAvatarIndex = player.avatarIndex ?? 1;
  const currentXP = player.stats.xp;
  const nextXP = player.stats.xpToNextLevel || 100;
  const xpPercent = Math.min(100, Math.round((currentXP / nextXP) * 100));

  const handleSelectAvatar = async (index: number) => {
    if (index === currentAvatarIndex || updating) return;
    try {
      setUpdating(true);
      playSfx('equip');
      await updateAvatar(index);
      setToast('Avatar matrix synchronized!');
      setTimeout(() => setToast(null), 2500);
    } catch {
      playSfx('error');
    } finally {
      setUpdating(false);
    }
  };

  const handleGoDashboard = () => {
    playSfx('click');
    onClose();
    router.push('/dashboard');
  };

  const handleOpenSettings = () => {
    onClose();
    openSettings();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 md:p-8 space-y-6 text-white border-[#000000] max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#362354] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <div>
              <h2 className="text-xl font-black uppercase font-heading text-white tracking-tight">
                OPERATIVE DOSSIER
              </h2>
              <p className="text-xs text-[#7ef9c7] font-bold uppercase tracking-wider">
                CHARACTER STATUS & AVATAR MATRIX
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

        {/* Toast Alert */}
        {toast && (
          <div className="bg-[#7ef9c7] text-[#002115] font-black text-xs px-3.5 py-2 rounded-lg border-2 border-black shadow-solid-sm animate-bounce flex items-center gap-2">
            <span>✨</span>
            <span>{toast}</span>
          </div>
        )}

        {/* Active Character Identity Card */}
        <div className="bg-[#170c28] border-pixel-thick rounded-xl p-5 shadow-solid-sm space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-3 border-black overflow-hidden relative bg-[#130728] shadow-solid shrink-0">
              <Image
                src={`/avatars/Avatar-${currentAvatarIndex}.jpg`}
                alt="Active Avatar"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="leading-tight space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#ffb68d] text-black font-black text-[10px] px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
                  LEVEL {player.stats.level}
                </span>
                <span className="bg-[#7ef9c7] text-black font-black text-[10px] px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
                  {player.stats.rank}
                </span>
              </div>
              <h3 className="text-xl font-black text-white uppercase font-heading tracking-wide">
                {player.username}
              </h3>
              <p className="text-xs text-[#bccac1] font-mono">{player.email}</p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1.5 pt-2 border-t border-[#362354]">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#bccac1] uppercase tracking-wider">{t.xp} PROGRESS</span>
              <span className="font-mono text-[#7ef9c7] font-black">
                {currentXP} / {nextXP} XP ({xpPercent}%)
              </span>
            </div>
            <div className="w-full bg-[#130728] border-2 border-black rounded-full h-3.5 overflow-hidden p-0.5 shadow-inner">
              <div
                className="bg-gradient-to-r from-[#7ef9c7] to-[#fad02c] h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Core Stat Pills */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="bg-[#201335] border-2 border-black rounded-lg p-2 shadow-solid-sm">
              <span className="text-[10px] font-black text-[#bccac1] block uppercase">{t.gold}</span>
              <span className="text-sm font-black text-[#fad02c] font-mono">
                🪙 {player.stats.gold.toLocaleString()}
              </span>
            </div>
            <div className="bg-[#201335] border-2 border-black rounded-lg p-2 shadow-solid-sm">
              <span className="text-[10px] font-black text-[#bccac1] block uppercase">{t.streak}</span>
              <span className="text-sm font-black text-[#ffb68d]">
                🔥 {player.stats.streakDays}d
              </span>
            </div>
            <div className="bg-[#201335] border-2 border-black rounded-lg p-2 shadow-solid-sm">
              <span className="text-[10px] font-black text-[#bccac1] block uppercase">PEACH GEMS</span>
              <span className="text-sm font-black text-[#ffb68d]">
                🍑 {player.stats.sunlitPeach}
              </span>
            </div>
          </div>
        </div>

        {/* Avatar Matrix Switcher */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase text-[#ffb68d] tracking-wider flex items-center gap-1.5">
              <span>🎭</span> SELECT OPERATIVE AVATAR
            </h4>
            <span className="text-[10px] text-[#bccac1] font-bold">CLICK TO SWITCH</span>
          </div>

          <div className="grid grid-cols-5 gap-2.5">
            {AVATAR_OPTIONS.map((av) => {
              const isSelected = av.index === currentAvatarIndex;
              return (
                <button
                  key={av.index}
                  type="button"
                  disabled={updating}
                  onClick={() => handleSelectAvatar(av.index)}
                  className={`group relative rounded-xl border-2 border-black overflow-hidden p-1 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#7ef9c7] shadow-solid scale-105 -translate-y-1'
                      : 'bg-[#170c28] hover:bg-[#2c174a] opacity-80 hover:opacity-100'
                  }`}
                  title={av.name}
                >
                  <div className="w-12 h-12 rounded-lg border border-black overflow-hidden relative bg-[#130728]">
                    <Image
                      src={av.src}
                      alt={av.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                      sizes="48px"
                    />
                  </div>
                  <span
                    className={`text-[9px] font-black uppercase truncate max-w-[55px] ${
                      isSelected ? 'text-[#002115]' : 'text-white'
                    }`}
                  >
                    {av.tag}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#002115] text-[#7ef9c7] rounded-full text-[8px] flex items-center justify-center font-black">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="pt-2 border-t-2 border-[#362354] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="gold"
              size="sm"
              onClick={() => {
                playSfx('click');
                onClose();
                openBattleCard();
              }}
              className="text-xs font-black uppercase"
            >
              🎴 BATTLE CARD
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenSettings}
              className="text-xs"
            >
              ⚙️ SETTINGS
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleGoDashboard}
              className="text-xs"
            >
              SANCTUARY HUB →
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                playSfx('click');
                onClose();
              }}
              className="text-xs"
            >
              CLOSE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
