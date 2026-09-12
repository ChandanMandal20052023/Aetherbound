'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';
import {
  generateBattleCardCanvas,
  downloadBattleCard,
  copyBattleCardToClipboard,
} from '@/lib/battleCard';

interface BattleCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BattleCardModal({ isOpen, onClose }: BattleCardModalProps) {
  const { player, playSfx } = useGame();
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isOpen && player) {
      setLoading(true);
      generateBattleCardCanvas(player)
        .then((canvas) => {
          canvasRef.current = canvas;
          setDataUrl(canvas.toDataURL('image/png'));
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, player]);

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDownload = () => {
    playSfx('click');
    if (canvasRef.current) {
      downloadBattleCard(canvasRef.current, `${player?.username ?? 'operative'}-battle-card.png`);
      triggerToast('Operative Battle Card downloaded!');
    }
  };

  const handleCopyImage = async () => {
    playSfx('click');
    if (canvasRef.current) {
      const ok = await copyBattleCardToClipboard(canvasRef.current);
      if (ok) {
        playSfx('purchase');
        triggerToast('Battle Card image copied to clipboard!');
      } else {
        triggerToast('Clipboard direct image copy not supported; downloading PNG.');
        handleDownload();
      }
    }
  };

  const handleCopyTweet = () => {
    playSfx('click');
    const text = `⚔️ Level ${player?.stats.level ?? 1} ${player?.stats.rank ?? 'Operative'} on Aetherbound Life RPG! 🔥 ${player?.stats.streakDays ?? 0}-Day Momentum Streak. Defend your deep work: https://aetherbound.net`;
    navigator.clipboard.writeText(text);
    playSfx('dailyBonus');
    triggerToast('Share tweet copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 md:p-8 space-y-6 text-white border-[#000000]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#362354] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎴</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#fad02c] text-black text-[10px] font-black px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
                  VIRAL DOSSIER
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black uppercase font-heading text-white tracking-tight">
                OPERATIVE BATTLE CARD
              </h2>
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

        {/* Toast */}
        {toastMsg && (
          <div className="bg-[#7ef9c7] text-black font-black text-xs px-3.5 py-2 rounded-xl border border-black shadow-solid-sm flex items-center gap-2 animate-bounce">
            <span>✨</span>
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Card Preview */}
        <div className="bg-[#130728] border-2 border-black rounded-xl p-2.5 flex items-center justify-center shadow-solid-sm min-h-[220px]">
          {loading ? (
            <div className="flex flex-col items-center gap-2 py-10">
              <div className="w-8 h-8 border-3 border-[#7ef9c7] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-[#7ef9c7]">RENDERING HOLOGRAPHIC CARD...</span>
            </div>
          ) : dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dataUrl}
              alt="Operative Battle Card"
              className="w-full h-auto rounded-lg border border-black shadow-solid"
            />
          ) : null}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t-2 border-[#362354] flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyTweet}
            className="text-xs font-black uppercase"
          >
            COPY SHARE TWEET 💬
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyImage}
              className="text-xs font-black uppercase"
            >
              COPY IMAGE 📋
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={handleDownload}
              withArrow
              className="text-xs font-black uppercase"
            >
              DOWNLOAD PNG 💾
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
