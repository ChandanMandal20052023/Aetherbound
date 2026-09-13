export type QuestCategory =
  | 'INTELLECT'
  | 'STRENGTH'
  | 'DISCIPLINE'
  | 'FOCUS'
  | 'CREATIVITY'
  | 'main'
  | 'side'
  | 'active'
  | string;

export type QuestDifficulty =
  | 'TRIVIAL'
  | 'STANDARD'
  | 'RARE'
  | 'EPIC'
  | 'LEGENDARY'
  | 'trivial'
  | 'common'
  | 'rare'
  | 'epic'
  | 'legendary'
  | string;

export type QuestRarity = QuestDifficulty;
export type QuestRisk = 'low' | 'medium' | 'high';
export type QuestStatus = 'available' | 'active' | 'completed' | 'failed';
export type QuestFrequency = 'ONE_TIME' | 'DAILY' | string;

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
  rarity?: QuestRarity;
  difficulty?: QuestDifficulty;
  frequency?: QuestFrequency;
  risk?: QuestRisk;
  status: QuestStatus;
  reward: QuestReward;
  xp_reward?: number;
  gold_reward?: number;
  emoji: string;
  deadline?: string;
  due_date?: string;
  is_archived?: boolean;
  created_at?: string;
}

export interface CreateQuestInput {
  title: string;
  description?: string;
  category: QuestCategory;
  difficulty?: QuestDifficulty;
  rarity?: QuestRarity;
  frequency?: QuestFrequency;
  due_date?: string;
  deadline?: string;
  risk?: QuestRisk;
  emoji?: string;
  xpReward?: number;
  goldReward?: number;
}
