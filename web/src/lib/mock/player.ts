import type { PlayerProfile } from '@/types/player';

export const mockPlayer: PlayerProfile = {
  id: 'player-01',
  username: 'Arcane_Trailblazer',
  email: 'trailblazer_01@arcane.net',
  avatarIndex: 1,
  stats: {
    xp: 2840,
    xpToNextLevel: 4200,
    level: 12,
    streakDays: 14,
    rank: 'Arcane Trailblazer',
    gold: 14250,
    sunlitPeach: 320,
    dailyBonusClaimed: true,
    season: 3,
    seasonName: 'Moonfall Cycle',
    seasonDaysRemaining: 22,
  },
  momentum: {
    weeklyTotal: 1150,
    weeklyChange: 22,
    currentStreak: 14,
    bestDay: 'Thu',
    bestDayXP: 360,
    weeklyBreakdown: [
      { day: 'Mon', xp: 120 },
      { day: 'Tue', xp: 190 },
      { day: 'Wed', xp: 280 },
      { day: 'Thu', xp: 360 },
      { day: 'Fri', xp: 200 },
    ],
  },
};
