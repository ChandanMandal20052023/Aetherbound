'use client';

import React, { useState, useEffect } from 'react';
import { QuestBoard } from '@/components/quests/QuestBoard';
import { questService } from '@/services/quest.service';
import type { Quest } from '@/types/quest';

export default function QuestsPage() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    questService
      .getQuests()
      .then(setQuests)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#7ef9c7] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#bccac1] font-bold text-sm uppercase tracking-wider">
            Loading Quest Codex...
          </p>
        </div>
      </div>
    );
  }

  return (
    <QuestBoard
      initialQuests={quests}
      onQuestComplete={async (quest) => {
        try {
          const result = await questService.resolveQuest(quest.id);
          return result;
        } catch (err) {
          console.error(err);
        }
      }}
    />
  );
}
