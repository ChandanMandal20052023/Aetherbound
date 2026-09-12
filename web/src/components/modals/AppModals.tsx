'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { TutorialModal } from '@/components/modals/TutorialModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { ProfileModal } from '@/components/modals/ProfileModal';
import { TermsModal } from '@/components/modals/TermsModal';
import { CodeModal } from '@/components/modals/CodeModal';

export function AppModals() {
  const { showProfile, closeProfile, showTerms, closeTerms, showCode, closeCode } = useGame();

  return (
    <>
      <TutorialModal />
      <SettingsModal />
      <ProfileModal isOpen={showProfile} onClose={closeProfile} />
      <TermsModal isOpen={showTerms} onClose={closeTerms} />
      <CodeModal isOpen={showCode} onClose={closeCode} />
    </>
  );
}
