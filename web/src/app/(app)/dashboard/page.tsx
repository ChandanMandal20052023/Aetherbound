'use client';

import React, { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { HeroSagaCard } from '@/components/dashboard/HeroSagaCard';
import { QuestCard } from '@/components/dashboard/QuestCard';
import { MomentumStreak } from '@/components/dashboard/MomentumStreak';
import { LevelUpModal } from '@/components/modals/LevelUpModal';
import { ForgeQuestModal } from '@/components/modals/ForgeQuestModal';
import { playerService } from '@/services/player.service';
import { questService } from '@/services/quest.service';
import type { PlayerProfile } from '@/types/player';
import type { Quest } from '@/types/quest';

export default function DashboardPage() {
  const {
    player: gamePlayer,
    playSfx,
    refreshPlayer,
    openTacticalPanel,
    t,
  } = useGame();
  const [player, setPlayer] = useState<PlayerProfile | null>(gamePlayer);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(!gamePlayer);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isForgeModalOpen, setIsForgeModalOpen] = useState(false);
  const [levelUpModal, setLevelUpModal] = useState<{ open: boolean; prev: number; next: number }>({
    open: false,
    prev: 1,
    next: 2,
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleQuestForged = (newQuest: Quest) => {
    setQuests((prev) => [newQuest, ...prev]);
    triggerToast(`[SYSTEM] Quest forged.\n[QUEST] “${newQuest.title}” added to your saga.`);
  };

  // Sync with live GameContext player immediately whenever avatar or stats change
  useEffect(() => {
    if (gamePlayer) {
      setPlayer(gamePlayer);
      setLoading(false);
    }
  }, [gamePlayer]);

  useEffect(() => {
    Promise.all([playerService.getProfile(), questService.getQuests()])
      .then(([p, q]) => {
        setPlayer(p);
        setQuests(q);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleClaimBonus = async () => {
    try {
      const result = await playerService.claimDailyBonus();
      playSfx('dailyBonus');
      setPlayer((prev) =>
        prev
          ? {
              ...prev,
              stats: {
                ...prev.stats,
                gold: result.newGold,
                xp: result.newXP,
                level: result.newLevel,
                dailyBonusClaimed: true,
              },
            }
          : prev,
      );
      refreshPlayer();
      triggerToast(`Daily bonus claimed! +${result.xpAwarded} XP & +${result.goldAwarded} Gold!`);
      if (result.leveled) {
        playSfx('levelUp');
        setLevelUpModal({
          open: true,
          prev: result.newLevel - 1,
          next: result.newLevel,
        });
      }
    } catch (err: unknown) {
      playSfx('error');
      triggerToast(err instanceof Error ? err.message : 'Could not claim bonus');
    }
  };

  const handleQuestComplete = async (quest: Quest) => {
    try {
      const result = await questService.resolveQuest(quest.id);
      playSfx('questComplete');
      setQuests((prev) =>
        prev.map((q) => (q.id === quest.id ? { ...q, status: 'completed' } : q)),
      );
      setPlayer((prev) =>
        prev
          ? {
              ...prev,
              stats: {
                ...prev.stats,
                xp: result.player.xp,
                xpToNextLevel: result.player.xpToNextLevel,
                level: result.player.level,
                gold: result.player.gold,
                rank: result.player.rank as PlayerProfile['stats']['rank'],
              },
            }
          : prev,
      );
      refreshPlayer();
      triggerToast(
        `Quest Resolved: "${quest.title}"! +${result.rewards.xp} XP & +${result.rewards.gold} Gold!`,
      );
      if (result.levelUp.leveled) {
        playSfx('levelUp');
        setLevelUpModal({
          open: true,
          prev: result.levelUp.previousLevel,
          next: result.levelUp.newLevel,
        });
      }
    } catch (err: unknown) {
      playSfx('error');
      triggerToast(err instanceof Error ? err.message : 'Failed to resolve quest');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#7ef9c7] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#bccac1] font-bold text-sm uppercase tracking-wider">
            Loading Saga...
          </p>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="text-center py-20">
        <p className="text-[#ff5a5a] font-bold">Failed to load player data.</p>
      </div>
    );
  }

  const activeAndAvailable = quests.filter(
    (q) => !q.is_archived && q.status !== 'completed' && q.status !== 'failed'
  );
  const displayedQuests = activeAndAvailable.length > 0
    ? activeAndAvailable
    : quests.filter((q) => !q.is_archived);

  return (
    <div className="space-y-6">
      {/* Level Up Modal */}
      <LevelUpModal
        isOpen={levelUpModal.open}
        onClose={() => setLevelUpModal((s) => ({ ...s, open: false }))}
        previousLevel={levelUpModal.prev}
        newLevel={levelUpModal.next}
      />

      {/* Forge Quest Modal */}
      <ForgeQuestModal
        isOpen={isForgeModalOpen}
        onClose={() => setIsForgeModalOpen(false)}
        onQuestForged={handleQuestForged}
        playerLevel={player.stats.level}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#7ef9c7] text-black font-black text-xs sm:text-sm px-5 py-3.5 rounded-xl border-pixel-thick shadow-solid-lg flex items-start gap-3 animate-fade-in">
          <span className="text-xl leading-none mt-0.5">⚡</span>
          <div className="space-y-0.5 text-left font-heading">
            {toastMessage.split('\n').map((line, idx) => (
              <p key={idx} className="leading-tight">{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Grid: 12 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Your Saga (6 cols) */}
        <div className="lg:col-span-6">
          <HeroSagaCard
            player={player}
            onClaimDailyBonus={handleClaimBonus}
            onForgeQuest={() => setIsForgeModalOpen(true)}
          />
        </div>

        {/* Right Column: Quest Column (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {displayedQuests.length === 0 ? (
            <div className="border-pixel-thick border-dashed border-[#5a4880] rounded-2xl p-8 sm:p-12 text-center bg-[#1c122c]/85 flex flex-col items-center justify-center space-y-4 shadow-solid min-h-[360px]">
              <div className="w-16 h-16 rounded-2xl bg-[#2b1b45] border-2 border-black flex items-center justify-center text-3xl shadow-solid-sm">
                📜
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black font-heading text-[#7ef9c7] uppercase tracking-wide">
                  NO ACTIVE QUESTS
                </h3>
                <p className="text-sm font-medium text-zinc-300 max-w-sm">
                  Your saga awaits its next challenge.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSfx('click');
                  setIsForgeModalOpen(true);
                }}
                className="inline-flex items-center gap-2 bg-[#fad02c] hover:bg-[#ffe380] text-black font-black text-sm px-6 py-3 rounded-xl border-pixel-thick shadow-solid uppercase tracking-wider font-heading transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <span className="text-base font-black">＋</span>
                <span>FORGE QUEST</span>
              </button>
            </div>
          ) : (
            displayedQuests.map((q) => (
              <QuestCard key={q.id} quest={q} onAction={handleQuestComplete} />
            ))
          )}
        </div>
      </div>

      {/* Bottom Card: Momentum Streak */}
      <MomentumStreak momentum={player.momentum} />

      {/* System Footer Notice */}
      <div className="text-center py-2 text-xs font-bold text-[#8f82aa] tracking-wider uppercase">
        Aetherbound Life • v1.2.0 • Dashboard • Live Sync Active
      </div>
    </div>
  );
}
