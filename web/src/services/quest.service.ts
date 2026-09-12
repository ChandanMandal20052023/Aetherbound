import { mockQuests } from '@/lib/mock/quests';
import type { Quest } from '@/types/quest';

export const questService = {
  async getQuests(): Promise<Quest[]> {
    return mockQuests;
  },

  async resolveQuest(questId: string): Promise<Quest | undefined> {
    const q = mockQuests.find((item) => item.id === questId);
    if (q) {
      q.status = 'completed';
    }
    return q;
  },
};
