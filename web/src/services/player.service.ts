import type { PlayerProfile } from '@/types/player';

export const playerService = {
  async getProfile(): Promise<PlayerProfile> {
    const res = await fetch('/api/player/profile', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch player profile');
    return res.json();
  },

  async claimDailyBonus(): Promise<{
    goldAwarded: number;
    xpAwarded: number;
    leveled: boolean;
    newLevel: number;
    newXP: number;
    newGold: number;
    rank: string;
  }> {
    const res = await fetch('/api/player/claim-daily', { method: 'POST' });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error ?? 'Failed to claim daily bonus');
    }
    return res.json();
  },

  async updateAvatar(avatarIndex: number): Promise<{ success: boolean; avatarIndex: number }> {
    const res = await fetch('/api/player/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatarIndex }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error ?? 'Failed to update avatar');
    }
    return res.json();
  },
};
