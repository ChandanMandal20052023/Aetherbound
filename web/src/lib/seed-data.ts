/**
 * Aetherbound seed data — starter quests and inventory for new players.
 * Also seeds the global shop catalog.
 */
import type { QuestCategory, QuestRarity, QuestRisk } from '@/types/quest';

export const STARTER_QUESTS: Array<{
  title: string;
  description: string;
  category: QuestCategory;
  rarity: QuestRarity;
  risk: QuestRisk;
  emoji: string;
}> = [
  {
    title: 'Defeat Email Hydra',
    description: 'The inbox has multiplied — slay the 5-headed spam hydra before it floods your quest log.',
    category: 'active',
    rarity: 'epic',
    risk: 'high',
    emoji: '🐉',
  },
  {
    title: 'Brew Focus Potion',
    description: 'Mix herbs and mana essence to brew a potion for +10 focus. Completion grants 50 XP.',
    category: 'side',
    rarity: 'trivial',
    risk: 'low',
    emoji: '🧪',
  },
  {
    title: 'Deep Work Sprint',
    description: 'Complete three 90-minute Pomodoro sessions without interruption. Focus is power.',
    category: 'main',
    rarity: 'rare',
    risk: 'medium',
    emoji: '⚡',
  },
  {
    title: 'Morning Ritual Mastery',
    description: 'Complete your morning ritual for 7 consecutive days. Consistency forges champions.',
    category: 'main',
    rarity: 'epic',
    risk: 'medium',
    emoji: '🌅',
  },
  {
    title: 'Vanquish the Procrastination Wraith',
    description: 'Complete a task you have been avoiding for more than 3 days. The wraith grows stronger with delay.',
    category: 'side',
    rarity: 'common',
    risk: 'high',
    emoji: '👻',
  },
];

export const STARTER_INVENTORY: Array<{
  name: string;
  rarity: string;
  type: string;
  status: string;
  icon: string;
  slot?: string;
  stats: Array<{ label: string; value: string }>;
  lore?: string;
}> = [
  {
    name: 'Focus Crown',
    rarity: 'epic',
    type: 'armor',
    status: 'equipped',
    icon: 'crown',
    slot: 'head',
    stats: [{ label: '+12 Focus', value: '12' }],
    lore: '"Bestows clarity of mind upon the wearer."',
  },
  {
    name: 'Starlight Cloak',
    rarity: 'legendary',
    type: 'armor',
    status: 'equipped',
    icon: 'shield',
    slot: 'chest',
    stats: [
      { label: '+15 Shadow Resistance', value: '15' },
      { label: '+8 DEF', value: '8' },
    ],
    lore: '"Woven from threads of starlight, impervious to shadow corruption."',
  },
  {
    name: 'Void Saber',
    rarity: 'rare',
    type: 'weapon',
    status: 'equipped',
    icon: 'colorize',
    slot: 'weapon',
    stats: [{ label: '+22 ATK', value: '22' }],
    lore: '"A blade forged in the null-space between dimensions."',
  },
  {
    name: 'Trailboots',
    rarity: 'rare',
    type: 'armor',
    status: 'equipped',
    icon: 'hiking',
    slot: 'boots',
    stats: [{ label: '+8 Mobility', value: '8' }],
    lore: '"Swift boots forged for the relentless trailblazer."',
  },
  {
    name: 'Mana Potion',
    rarity: 'common',
    type: 'consumable',
    status: 'stored',
    icon: 'local_drink',
    stats: [{ label: 'Restores 60 MP', value: '60' }],
  },
  {
    name: 'Moonfall Badge',
    rarity: 'epic',
    type: 'cosmetic',
    status: 'stored',
    icon: 'military_tech',
    stats: [{ label: '+15 Prestige', value: '15' }],
  },
];

export const SHOP_CATALOG: Array<{
  name: string;
  description: string;
  lore?: string;
  rarity: string;
  category: string;
  goldCost: number;
  peachCost?: number;
  requiredLevel?: number;
  imageUrl: string;
  stats: Array<{ label: string; icon: string }>;
  milestoneProgress?: number;
}> = [
  {
    name: 'Tsukikage Blade',
    description: '"A blade that carries tomorrow"',
    rarity: 'legendary',
    category: 'weapons',
    goldCost: 1800,
    imageUrl: '/avatars/Avatar-1.jpg',
    stats: [
      { label: '+25 Focus', icon: '⚡' },
      { label: '+18 Discipline', icon: '🛡️' },
    ],
  },
  {
    name: 'Ren Kurogane',
    description: 'Swift task execution before cognitive fatigue.',
    rarity: 'epic',
    category: 'characters',
    goldCost: 2500,
    requiredLevel: 15,
    imageUrl: '/avatars/Avatar-2.jpg',
    stats: [{ label: '+16 Stealth Surge', icon: '🗡️' }],
    milestoneProgress: 50,
  },
  {
    name: 'Commander Varyn',
    description: 'Steadfast leader who shields routine habits.',
    rarity: 'epic',
    category: 'characters',
    goldCost: 3000,
    requiredLevel: 18,
    imageUrl: '/avatars/Avatar-3.jpg',
    stats: [{ label: '+15 Routine Discipline', icon: '🛡️' }],
    milestoneProgress: 41,
  },
  {
    name: 'Nova Pulse',
    description: 'Cyber-arcane resonance accelerates deep work.',
    rarity: 'legendary',
    category: 'characters',
    goldCost: 5000,
    imageUrl: '/avatars/Avatar-4.jpg',
    stats: [{ label: '+20 Deep Work Focus', icon: '⚡' }],
    milestoneProgress: 25,
  },
  {
    name: 'Iris Spark',
    description: 'Synthesizes daily micro-rewards efficiently.',
    rarity: 'rare',
    category: 'characters',
    goldCost: 800,
    imageUrl: '/avatars/Avatar-5.jpg',
    stats: [{ label: '+10 Micro-Reward Synthesis', icon: '✨' }],
  },
  {
    name: 'Astral Aura',
    description: 'A radiant mantle of condensed stardust.',
    rarity: 'legendary',
    category: 'apparel',
    goldCost: 2200,
    peachCost: 100,
    imageUrl: '/avatars/Avatar-6.jpg',
    stats: [
      { label: '+20 Arcane Resonance', icon: '🌟' },
      { label: 'Visual FX: Cosmic Trail', icon: '✦' },
    ],
  },
  {
    name: 'Momentum Badge',
    description: 'Awarded to those who never break the chain.',
    rarity: 'rare',
    category: 'badges',
    goldCost: 400,
    imageUrl: '/avatars/Avatar-7.jpg',
    stats: [{ label: '+5 Streak Bonus', icon: '🔥' }],
  },
  {
    name: 'Elixir of Clarity',
    description: 'Clears cognitive fog for one full work session.',
    rarity: 'common',
    category: 'consumables',
    goldCost: 120,
    imageUrl: '/avatars/Avatar-8.jpg',
    stats: [{ label: '+30 Focus (1 session)', icon: '🧪' }],
  },
];
