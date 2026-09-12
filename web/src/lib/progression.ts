/**
 * Aetherbound Life RPG — Game Progression Math
 *
 * XP_req(L)      = 100 * L^1.65 + 25 * L^2          (XP to reach next level)
 * Difficulty(L)  = 100 * L^1.80                       (task baseline)
 * Gold(L)        = 100 * (1 + ln(1+L))^1.35           (gold baseline, inflation-controlled)
 * Power(L)       = 100 * L^1.72                        (player power)
 * Density(L)     = Gold(L) / Difficulty(L)             (declines monotonically)
 */

import type { QuestRarity, QuestRisk } from '@/types/quest';
import type { PlayerRank } from '@/types/player';

// ─── Core Curves ─────────────────────────────────────────────────────────────

/** XP required to level up FROM level L (reach L+1). */
export function xpRequired(level: number): number {
  return Math.round(100 * Math.pow(level, 1.65) + 25 * Math.pow(level, 2));
}

/** Player's power rating at level L. */
export function playerPower(level: number): number {
  return Math.round(100 * Math.pow(level, 1.72));
}

/** Task difficulty baseline at player level L. */
export function taskDifficulty(level: number): number {
  return Math.round(100 * Math.pow(level, 1.80));
}

/** Gold reward baseline at player level L (log-curve — anti-inflation). */
export function goldBase(level: number): number {
  return Math.round(100 * Math.pow(1 + Math.log(1 + level), 1.35));
}

/** Reward density = gold / difficulty (declines over time — by design). */
export function rewardDensity(level: number): number {
  return goldBase(level) / taskDifficulty(level);
}

// ─── Rarity & Risk Multipliers ───────────────────────────────────────────────

const RARITY_MULT: Record<QuestRarity, number> = {
  trivial:   0.30,
  common:    0.60,
  rare:      1.00,
  epic:      1.80,
  legendary: 3.00,
};

const RISK_MULT: Record<QuestRisk, number> = {
  low:    0.80,
  medium: 1.00,
  high:   1.40,
};

// ─── Quest Rewards ────────────────────────────────────────────────────────────

/** XP reward for completing a quest at playerLevel with given rarity + risk. */
export function questXpReward(
  playerLevel: number,
  rarity: QuestRarity,
  risk: QuestRisk,
): number {
  return Math.max(
    10,
    Math.round(taskDifficulty(playerLevel) * RARITY_MULT[rarity] * RISK_MULT[risk]),
  );
}

/** Gold reward for completing a quest (inflation-controlled). */
export function questGoldReward(
  playerLevel: number,
  rarity: QuestRarity,
  risk: QuestRisk,
): number {
  return Math.max(
    5,
    Math.round(goldBase(playerLevel) * RARITY_MULT[rarity] * RISK_MULT[risk]),
  );
}

// ─── Level-Up Check ──────────────────────────────────────────────────────────

export interface LevelUpResult {
  leveled: boolean;
  newLevel: number;
  newXP: number;
  newXpToNextLevel: number;
  levelsGained: number;
}

/**
 * Given current XP + level + XP gained, computes new level and remaining XP.
 * Handles multi-level-ups in one call.
 */
export function checkLevelUp(
  currentXP: number,
  currentLevel: number,
  xpGained: number,
): LevelUpResult {
  let xp = currentXP + xpGained;
  let level = currentLevel;
  let levelsGained = 0;

  // Keep leveling up while XP exceeds threshold
  let threshold = xpRequired(level);
  while (xp >= threshold) {
    xp -= threshold;
    level += 1;
    levelsGained += 1;
    threshold = xpRequired(level);
  }

  return {
    leveled: levelsGained > 0,
    newLevel: level,
    newXP: xp,
    newXpToNextLevel: xpRequired(level),
    levelsGained,
  };
}

// ─── Rank Lookup ─────────────────────────────────────────────────────────────

export function rankForLevel(level: number): PlayerRank {
  if (level < 5)  return 'Arcane Trailblazer';
  if (level < 15) return 'Void Scout';
  if (level < 30) return 'Aether Knight';
  return 'Celestial Champion';
}

// ─── Starter Rewards (for seeding new players) ────────────────────────────────

export const STARTER_GOLD = 500;
export const STARTER_XP = 0;
export const DAILY_BONUS_XP = 50;
export const DAILY_BONUS_GOLD = 50;
