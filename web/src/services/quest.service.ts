import type { Quest, QuestCategory, QuestRarity, QuestRisk } from '@/types/quest';

export const questService = {
  async getQuests(): Promise<Quest[]> {
    const res = await fetch('/api/quests', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch quests');
    return res.json();
  },

  async createQuest(data: {
    title: string;
    description?: string;
    category: QuestCategory;
    rarity: QuestRarity;
    risk: QuestRisk;
    emoji?: string;
    deadline?: string;
  }): Promise<Quest> {
    const res = await fetch('/api/quests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? 'Failed to create quest');
    }
    return res.json();
  },

  async resolveQuest(questId: string): Promise<{
    quest: { id: string; status: string };
    rewards: { xp: number; gold: number };
    player: { level: number; xp: number; xpToNextLevel: number; gold: number; rank: string };
    levelUp: { leveled: boolean; levelsGained: number; previousLevel: number; newLevel: number };
  }> {
    const res = await fetch(`/api/quests/${questId}/resolve`, { method: 'POST' });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? 'Failed to resolve quest');
    }
    return res.json();
  },
};
