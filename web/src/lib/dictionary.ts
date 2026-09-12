/**
 * Multi-tier Language Complexity Dictionary for Aetherbound
 * Allows users to choose between:
 * - 'arcane': High sci-fi lore & immersive RPG terminology
 * - 'standard': Classic RPG gaming vocabulary
 * - 'simple': Clear, plain everyday English (for casual users & judges)
 */

export type LanguageMode = 'arcane' | 'standard' | 'simple';

export interface TranslationDictionary {
  // Navigation & Page titles
  dashboardTitle: string;
  dashboardSubtitle: string;
  questsTitle: string;
  questsSubtitle: string;
  inventoryTitle: string;
  inventorySubtitle: string;
  shopTitle: string;
  shopSubtitle: string;
  networkTitle: string;
  networkSubtitle: string;

  // Economy & Progression
  gold: string;
  xp: string;
  level: string;
  streak: string;
  rank: string;
  dailyBonus: string;
  claimBonusButton: string;
  claimedBonusButton: string;

  // Quests & Actions
  resolveQuest: string;
  createQuest: string;
  mainQuests: string;
  sideQuests: string;
  riskLow: string;
  riskMedium: string;
  riskHigh: string;

  // Inventory & Shop
  equip: string;
  unequip: string;
  purchase: string;
  owned: string;
  weapon: string;
  armor: string;
  boots: string;
  consumable: string;

  // Network & Social
  operatives: string;
  pingOperative: string;
  broadcast: string;
  sendBroadcast: string;
}

export const DICTIONARIES: Record<LanguageMode, TranslationDictionary> = {
  arcane: {
    dashboardTitle: 'SANCTUARY COMMAND HUB',
    dashboardSubtitle: 'Real-time biological resonance & discipline protocol overview.',
    questsTitle: 'MISSION CODEX & VOID INCURSIONS',
    questsSubtitle: 'Slay daily friction, vanquish procrastination wraiths, and gain resonance.',
    inventoryTitle: 'AETHER VAULT & NEURAL GEAR',
    inventorySubtitle: 'Equip relics, cosmic armor, and forged blades into your active matrix.',
    shopTitle: 'ASTRAL BLACK MARKET',
    shopSubtitle: 'Exchange captured starlight and gold for focus elixirs and legendary relics.',
    networkTitle: 'OPERATIVE TRANSMISSIONS & GUILD NET',
    networkSubtitle: 'Encrypted tactical link between high-resonance life RPG operatives.',

    gold: 'Aether Gold',
    xp: 'Resonance XP',
    level: 'Operative Level',
    streak: 'Discipline Streak',
    rank: 'Arcane Rank',
    dailyBonus: 'Astral Core Resonance',
    claimBonusButton: 'COMMUNE WITH ASTRAL CORE (+50 XP)',
    claimedBonusButton: 'CORE HARMONIZED TODAY',

    resolveQuest: 'NEUTRALIZE THREAT',
    createQuest: 'FORGE INITIATIVE',
    mainQuests: 'CORE CAMPAIGNS',
    sideQuests: 'ORBITAL TASKS',
    riskLow: 'TRIVIAL RISK',
    riskMedium: 'BALANCED RISK',
    riskHigh: 'LETHAL HAZARD',

    equip: 'SYNCHRONIZE MATRIX',
    unequip: 'SEVER LINK',
    purchase: 'ACQUIRE ARTIFACT',
    owned: 'IN POSSESSION',
    weapon: 'VOID BLADE',
    armor: 'ASTRA SUIT',
    boots: 'GRAV BOOTS',
    consumable: 'ELIXIR ESSENCE',

    operatives: 'SYNAPSE OPERATIVES',
    pingOperative: 'DISPATCH BEACON',
    broadcast: 'ENCRYPTED FREQUENCY',
    sendBroadcast: 'TRANSMIT BROADCAST',
  },

  standard: {
    dashboardTitle: 'HERO DASHBOARD',
    dashboardSubtitle: 'Your character stats, daily habits, and active adventures.',
    questsTitle: 'QUEST BOARD',
    questsSubtitle: 'Complete tasks and challenges to level up your character.',
    inventoryTitle: 'INVENTORY & GEAR',
    inventorySubtitle: 'Manage your weapons, armor, and usable items.',
    shopTitle: 'MERCHANT SHOP',
    shopSubtitle: 'Spend your hard-earned gold on potions, boosts, and legendary gear.',
    networkTitle: 'GUILD & ADVENTURERS',
    networkSubtitle: 'Stay in touch with your guild members and fellow adventurers.',

    gold: 'Gold Coins',
    xp: 'Experience (XP)',
    level: 'Character Level',
    streak: 'Daily Streak',
    rank: 'Adventurer Rank',
    dailyBonus: 'Daily Login Reward',
    claimBonusButton: 'CLAIM DAILY REWARD (+50 XP)',
    claimedBonusButton: 'CLAIMED TODAY',

    resolveQuest: 'COMPLETE QUEST',
    createQuest: 'NEW QUEST',
    mainQuests: 'MAIN QUESTS',
    sideQuests: 'SIDE QUESTS',
    riskLow: 'EASY',
    riskMedium: 'MEDIUM',
    riskHigh: 'HARD',

    equip: 'EQUIP ITEM',
    unequip: 'UNEQUIP',
    purchase: 'BUY ITEM',
    owned: 'OWNED',
    weapon: 'WEAPON',
    armor: 'ARMOR',
    boots: 'BOOTS',
    consumable: 'POTION',

    operatives: 'GUILD MEMBERS',
    pingOperative: 'SEND PING',
    broadcast: 'GUILD CHAT',
    sendBroadcast: 'POST MESSAGE',
  },

  simple: {
    dashboardTitle: 'HOME & HABITS',
    dashboardSubtitle: 'Your daily progress, habits, and productivity overview.',
    questsTitle: 'TO-DO LIST & GOALS',
    questsSubtitle: 'Complete your daily tasks to earn points and level up.',
    inventoryTitle: 'ITEMS & BADGES',
    inventorySubtitle: 'Your unlocked tools, badges, and rewards collection.',
    shopTitle: 'REWARDS STORE',
    shopSubtitle: 'Use your points to unlock helpful boosts and bonuses.',
    networkTitle: 'TEAM & FRIENDS',
    networkSubtitle: 'Cheer on friends and see what everyone is accomplishing today.',

    gold: 'Coins',
    xp: 'Points',
    level: 'Level',
    streak: 'Days in a Row',
    rank: 'Badge Tier',
    dailyBonus: 'Daily Check-in',
    claimBonusButton: 'CHECK IN TODAY (+50 PTS)',
    claimedBonusButton: 'CHECKED IN TODAY',

    resolveQuest: 'MARK AS DONE',
    createQuest: 'ADD NEW TASK',
    mainQuests: 'TOP PRIORITIES',
    sideQuests: 'QUICK TASKS',
    riskLow: 'QUICK & EASY',
    riskMedium: 'STANDARD',
    riskHigh: 'IMPORTANT',

    equip: 'USE ITEM',
    unequip: 'REMOVE',
    purchase: 'UNLOCK',
    owned: 'UNLOCKED',
    weapon: 'TOOL',
    armor: 'OUTFIT',
    boots: 'SHOES',
    consumable: 'BOOST',

    operatives: 'TEAM MEMBERS',
    pingOperative: 'SAY HI',
    broadcast: 'TEAM FEED',
    sendBroadcast: 'SEND MESSAGE',
  },
};

export const LANGUAGE_LABELS: Record<LanguageMode, { name: string; tag: string; icon: string }> = {
  arcane: { name: 'Arcane Sci-Fi', tag: 'High RPG Lore', icon: '🌌' },
  standard: { name: 'Standard RPG', tag: 'Classic Gaming', icon: '⚔️' },
  simple: { name: 'Simple English', tag: 'Plain & Casual', icon: '🌱' },
};
