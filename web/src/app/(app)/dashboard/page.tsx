'use client';

import React, { useState } from 'react';
import { HeroSagaCard } from '@/components/dashboard/HeroSagaCard';
import { QuestCard } from '@/components/dashboard/QuestCard';
import { MomentumStreak } from '@/components/dashboard/MomentumStreak';
import { mockPlayer } from '@/lib/mock/player';
import { mockQuests } from '@/lib/mock/quests';
import type { Quest } from '@/types/quest';

export default function DashboardPage() {
  const [player, setPlayer] = useState(mockPlayer);
  const [quests, setQuests] = useState(mockQuests);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleClaimBonus = () => {
    setPlayer((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        gold: prev.stats.gold + 50,
        xp: prev.stats.xp + 50,
        dailyBonusClaimed: true,
      },
    }));
    triggerToast('Daily bonus claimed! +50 XP & +50 Gold awarded.');
  };

  const handleQuestComplete = (completedQuest: Quest) => {
    setPlayer((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        xp: prev.stats.xp + completedQuest.reward.xp,
        gold: prev.stats.gold + (completedQuest.reward.gold || 50),
      },
    }));
    triggerToast(
      `Quest Resolved: "${completedQuest.title}"! +${completedQuest.reward.xp} XP earned!`
    );
  };

  // Get active and side quests to display
  const activeQuest = quests.find((q) => q.id === 'q-01') || quests[0];
  const sideQuest = quests.find((q) => q.id === 'q-02') || quests[1];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#7ef9c7] text-black font-black text-sm px-4 py-3 rounded-xl border-pixel-thick shadow-solid-lg flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Grid: 12 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Your Saga (6 cols) */}
        <div className="lg:col-span-6">
          <HeroSagaCard
            player={player}
            onClaimDailyBonus={handleClaimBonus}
          />
        </div>

        {/* Right Column: Quest Column (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <QuestCard quest={activeQuest} onAction={handleQuestComplete} />
          <QuestCard quest={sideQuest} onAction={handleQuestComplete} />
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
