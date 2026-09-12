'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { TutorialModal } from '@/components/modals/TutorialModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { ProfileModal } from '@/components/modals/ProfileModal';
import { TermsModal } from '@/components/modals/TermsModal';
import { CodeModal } from '@/components/modals/CodeModal';
import { QuestAlchemistModal } from '@/components/modals/QuestAlchemistModal';
import { FocusChamberModal } from '@/components/modals/FocusChamberModal';
import { BattleCardModal } from '@/components/modals/BattleCardModal';

export function AppModals() {
  const {
    showProfile,
    closeProfile,
    showTerms,
    closeTerms,
    showCode,
    closeCode,
    showAlchemist,
    closeAlchemist,
    showFocusChamber,
    closeFocusChamber,
    showBattleCard,
    closeBattleCard,
  } = useGame();

  return (
    <>
      <TutorialModal />
      <SettingsModal />
      <ProfileModal isOpen={showProfile} onClose={closeProfile} />
      <TermsModal isOpen={showTerms} onClose={closeTerms} />
      <CodeModal isOpen={showCode} onClose={closeCode} />
      <QuestAlchemistModal isOpen={showAlchemist} onClose={closeAlchemist} />
      <FocusChamberModal isOpen={showFocusChamber} onClose={closeFocusChamber} />
      <BattleCardModal isOpen={showBattleCard} onClose={closeBattleCard} />
    </>
  );
}
