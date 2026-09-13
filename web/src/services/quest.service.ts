import type { Quest, CreateQuestInput } from '@/types/quest';

export const questService = {
  async getQuests(): Promise<Quest[]> {
    const res = await fetch('/api/quests', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch quests');
    const json = await res.json();
    if (Array.isArray(json)) return json;
    if (json.data && Array.isArray(json.data.quests)) return json.data.quests;
    if (Array.isArray(json.quests)) return json.quests;
    return [];
  },

  async getQuest(id: string): Promise<Quest> {
    const res = await fetch(`/api/quests/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message ?? err.error ?? 'Quest not found');
    }
    const json = await res.json();
    return json.data?.quest ?? json.quest ?? json;
  },

  async createQuest(data: CreateQuestInput): Promise<Quest> {
    const res = await fetch('/api/quests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message ?? err.error ?? 'Failed to forge quest');
    }
    const json = await res.json();
    return json.data?.quest ?? json.quest ?? json;
  },

  async updateQuest(id: string, data: Partial<CreateQuestInput>): Promise<Quest> {
    const res = await fetch(`/api/quests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message ?? err.error ?? 'Failed to update quest');
    }
    const json = await res.json();
    return json.data?.quest ?? json.quest ?? json;
  },

  async deleteQuest(id: string): Promise<boolean> {
    const res = await fetch(`/api/quests/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message ?? err.error ?? 'Failed to delete quest');
    }
    return true;
  },

  async resolveQuest(questId: string): Promise<{
    quest: { id: string; status: string };
    rewards: { xp: number; gold: number };
    player: { level: number; xp: number; xpToNextLevel: number; gold: number; rank: string };
    levelUp: { leveled: boolean; levelsGained: number; previousLevel: number; newLevel: number };
  }> {
    const res = await fetch(`/api/quests/${questId}/resolve`, { method: 'POST' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message ?? err.error ?? 'Failed to resolve quest');
    }
    return res.json();
  },
};
