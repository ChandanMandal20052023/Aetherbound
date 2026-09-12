import { mockPlayer } from '@/lib/mock/player';
import type { PlayerProfile } from '@/types/player';

export const playerService = {
  async getProfile(): Promise<PlayerProfile> {
    return mockPlayer;
  },

  async claimDailyBonus(): Promise<PlayerProfile> {
    return {
      ...mockPlayer,
      stats: {
        ...mockPlayer.stats,
        gold: mockPlayer.stats.gold + 50,
        xp: mockPlayer.stats.xp + 50,
        dailyBonusClaimed: true,
      },
    };
  },
};
