import { mockPlayer } from '@/lib/mock/player';
import type { PlayerProfile } from '@/types/player';

export const authService = {
  async login(email: string): Promise<PlayerProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      ...mockPlayer,
      email,
    };
  },

  async register(username: string, email: string): Promise<PlayerProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      ...mockPlayer,
      username,
      email,
    };
  },

  async getCurrentUser(): Promise<PlayerProfile> {
    return mockPlayer;
  },
};
