import type { Quest } from '@/types/quest';

export const mockQuests: Quest[] = [
  {
    id: 'q-01',
    title: 'Defeat Email Hydra',
    description:
      'The inbox has multiplied — slay the 5-headed spam hydra before it floods your quest log.',
    category: 'active',
    rarity: 'epic',
    risk: 'high',
    status: 'active',
    reward: { xp: 300, item: 'Rare Token' },
    emoji: '🐉',
    deadline: '2026-09-13',
  },
  {
    id: 'q-02',
    title: 'Brew Focus Potion',
    description:
      'Mix herbs and mana essence to brew a potion for +10 focus. Completion grants 50 XP.',
    category: 'side',
    rarity: 'trivial',
    risk: 'low',
    status: 'available',
    reward: { xp: 50 },
    emoji: '🧪',
  },
  {
    id: 'q-03',
    title: 'Deep Work Sprint',
    description:
      'Complete three 90-minute Pomodoro sessions without interruption. Focus is power.',
    category: 'main',
    rarity: 'rare',
    risk: 'medium',
    status: 'available',
    reward: { xp: 200, gold: 50 },
    emoji: '⚡',
  },
  {
    id: 'q-04',
    title: 'Morning Ritual Mastery',
    description:
      'Complete your morning ritual for 7 consecutive days. Consistency forges champions.',
    category: 'main',
    rarity: 'epic',
    risk: 'medium',
    status: 'available',
    reward: { xp: 400, gold: 100 },
    emoji: '🌅',
  },
  {
    id: 'q-05',
    title: 'Vanquish the Procrastination Wraith',
    description:
      'Complete a task you have been avoiding for more than 3 days. The wraith grows stronger with delay.',
    category: 'side',
    rarity: 'common',
    risk: 'high',
    status: 'available',
    reward: { xp: 150, gold: 30 },
    emoji: '👻',
  },
  {
    id: 'q-06',
    title: 'Network Dungeon Cleared',
    description:
      'Reach out to 3 new connections and initiate meaningful conversations.',
    category: 'side',
    rarity: 'rare',
    risk: 'low',
    status: 'completed',
    reward: { xp: 100, gold: 25 },
    emoji: '🌐',
  },
];
