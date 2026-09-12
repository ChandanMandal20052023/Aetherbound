export type QuestCategory = 'main' | 'side' | 'active';
export type QuestRarity = 'trivial' | 'common' | 'rare' | 'epic' | 'legendary';
export type QuestRisk = 'low' | 'medium' | 'high';
export type QuestStatus = 'available' | 'active' | 'completed' | 'failed';

export interface QuestReward {
  xp: number;
  gold?: number;
  item?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  rarity: QuestRarity;
  risk: QuestRisk;
  status: QuestStatus;
  reward: QuestReward;
  emoji: string;
  deadline?: string;
}
