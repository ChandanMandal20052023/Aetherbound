import type { InventoryItem, InventoryState, EquipmentLoadout } from '@/types/inventory';

export const mockInventoryItems: InventoryItem[] = [
  {
    id: 'item-01',
    name: 'Astral Aura',
    rarity: 'legendary',
    type: 'cosmetic',
    status: 'equipped',
    icon: 'blur_on',
    slot: 'accessory',
    stats: [
      { label: '+20 Arcane Resonance', value: '20' },
      { label: '+10 Celestial Shielding', value: '10' },
      { label: 'Visual FX: Cosmic Ambient Trail', value: 'FX' },
    ],
    lore: '"A radiant mantle of condensed stardust forged in the Moonfall Crucible. Cascades luminous aether particles around the bearer in combat and hub sanctuaries."',
  },
  {
    id: 'item-02',
    name: 'Moonfall Badge',
    rarity: 'epic',
    type: 'cosmetic',
    status: 'stored',
    icon: 'military_tech',
    stats: [{ label: '+15 Prestige', value: '15' }],
  },
  {
    id: 'item-03',
    name: 'Aether Core Key',
    rarity: 'legendary',
    type: 'key-item',
    status: 'stored',
    icon: 'key',
    stats: [{ label: 'Unlocks Aether Vault', value: 'KEY' }],
    lore: '"Forged from crystallized starlight, this key opens pathways beyond the veil."',
  },
  {
    id: 'item-04',
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
    id: 'item-05',
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
    id: 'item-06',
    name: 'Mana Potion',
    rarity: 'common',
    type: 'consumable',
    status: 'stored',
    icon: 'local_drink',
    stats: [{ label: 'Restores 60 MP', value: '60' }],
  },
  {
    id: 'item-07',
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
    id: 'item-08',
    name: 'Trailboots',
    rarity: 'rare',
    type: 'armor',
    status: 'equipped',
    icon: 'hiking',
    slot: 'boots',
    stats: [{ label: '+8 Mobility', value: '8' }],
    lore: '"Swift boots forged for the relentless trailblazer."',
  },
];

const focusCrown = mockInventoryItems.find((i) => i.id === 'item-07')!;
const starlightCloak = mockInventoryItems.find((i) => i.id === 'item-04')!;
const voidSaber = mockInventoryItems.find((i) => i.id === 'item-05')!;
const trailboots = mockInventoryItems.find((i) => i.id === 'item-08')!;

export const mockEquipment: EquipmentLoadout = {
  head: focusCrown,
  chest: starlightCloak,
  weapon: voidSaber,
  boots: trailboots,
};

export const mockInventoryState: InventoryState = {
  items: mockInventoryItems,
  capacity: 12,
  equipped: mockEquipment,
  totalWeight: 8.4,
  maxWeight: 30,
};
