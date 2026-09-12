export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export type PlayerRank =
  | 'Arcane Trailblazer'
  | 'Void Scout'
  | 'Aether Knight'
  | 'Celestial Champion';

export interface PlayerStats {
  xp: number;
  xpToNextLevel: number;
  level: number;
  streakDays: number;
  rank: PlayerRank;
  gold: number;
  sunlitPeach: number;
  dailyBonusClaimed: boolean;
  season: number;
  seasonName: string;
  seasonDaysRemaining: number;
}

export interface WeeklyXP {
  day: string;
  xp: number;
}

export interface MomentumData {
  weeklyTotal: number;
  weeklyChange: number;
  currentStreak: number;
  bestDay: string;
  bestDayXP: number;
  weeklyBreakdown: WeeklyXP[];
}

export interface PlayerProfile {
  id: string;
  username: string;
  email: string;
  avatarIndex: number; // 1–8 mapping to Avatar-{n}.jpg
  stats: PlayerStats;
  momentum: MomentumData;
}
