import type { NavItem } from '@/types/nav';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Quests', href: '/quests' },
  { label: 'Inventory', href: '/inventory' },
  { label: 'Shop', href: '/shop' },
];

export const RARITY_COLORS = {
  common: {
    border: 'border-[#88DFBC]',
    bg: 'bg-[#88DFBC]',
    text: 'text-[#88DFBC]',
    label: 'bg-[#88DFBC] text-black',
  },
  rare: {
    border: 'border-[#70C5FF]',
    bg: 'bg-[#70C5FF]',
    text: 'text-[#70C5FF]',
    label: 'bg-[#70C5FF] text-black',
  },
  epic: {
    border: 'border-[#B892FF]',
    bg: 'bg-[#B892FF]',
    text: 'text-[#B892FF]',
    label: 'bg-[#B892FF] text-black',
  },
  legendary: {
    border: 'border-[#FAD02C]',
    bg: 'bg-[#FAD02C]',
    text: 'text-[#FAD02C]',
    label: 'bg-[#FAD02C] text-black',
  },
} as const;

export const RISK_COLORS = {
  low: 'bg-[#7FFAC8] text-black',
  medium: 'bg-[#FFB185] text-black',
  high: 'bg-[#FF5A5A] text-white',
} as const;

export const QUEST_CATEGORY_LABELS = {
  main: 'MAIN QUEST',
  side: 'SIDE QUEST',
  active: 'ACTIVE QUEST',
} as const;

export const SERVER_VERSION = 'v1.2.0 Moonfall Cycle';
export const ENGINE_VERSION = 'V.2.0.4 ARCANE ENGINE';
export const CURRENT_YEAR = 2025;
