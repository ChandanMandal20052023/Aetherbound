'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { TutorialModal } from '@/components/modals/TutorialModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { ProfileModal } from '@/components/modals/ProfileModal';

export function AppModals() {
  const { showProfile, closeProfile } = useGame();

  return (
    <>
      <TutorialModal />
      <SettingsModal />
      <ProfileModal isOpen={showProfile} onClose={closeProfile} />
    </>
  );
}
