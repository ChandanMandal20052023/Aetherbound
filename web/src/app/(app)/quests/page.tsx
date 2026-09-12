import { QuestBoard } from '@/components/quests/QuestBoard';
import { mockQuests } from '@/lib/mock/quests';

export const metadata = {
  title: 'Quest Codex — Aetherbound Life RPG',
};

export default function QuestsPage() {
  return <QuestBoard initialQuests={mockQuests} />;
}
