'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { PlayerProfile } from '@/types/player';
import { playerService } from '@/services/player.service';
import { sound, SfxType } from '@/lib/audio';
import { LanguageMode, TranslationDictionary, DICTIONARIES } from '@/lib/dictionary';

interface GameContextType {
  player: PlayerProfile | null;
  loading: boolean;
  refreshPlayer: () => Promise<void>;

  // Audio / Sound FX
  soundEnabled: boolean;
  soundVolume: number;
  toggleSound: () => void;
  setVolume: (v: number) => void;
  playSfx: (type: SfxType) => void;

  // Language Complexity
  languageMode: LanguageMode;
  setLanguageMode: (mode: LanguageMode) => void;
  t: TranslationDictionary;

  // Tutorial / Onboarding
  showTutorial: boolean;
  openTutorial: () => void;
  closeTutorial: () => void;
  completeTutorial: () => void;

  // Settings Modal
  showSettings: boolean;
  openSettings: () => void;
  closeSettings: () => void;

  // Profile Modal (Avatar selector & character dossier)
  showProfile: boolean;
  openProfile: () => void;
  closeProfile: () => void;
  updateAvatar: (index: number) => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Sound State
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [soundVolume, setSoundVolumeState] = useState(0.5);

  // Language Complexity Mode
  const [languageMode, setLanguageModeState] = useState<LanguageMode>('arcane');

  // Modals
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Load player profile
  const refreshPlayer = useCallback(async () => {
    try {
      const data = await playerService.getProfile();
      setPlayer(data);
    } catch {
      // If unauthenticated or network error, silently handle
    }
  }, []);

  // Initialize on mount (load localStorage settings)
  useEffect(() => {
    refreshPlayer().finally(() => setLoading(false));

    if (typeof window !== 'undefined') {
      // Language
      const savedLang = localStorage.getItem('aetherbound_language_mode') as LanguageMode | null;
      if (savedLang && (savedLang === 'arcane' || savedLang === 'standard' || savedLang === 'simple')) {
        setLanguageModeState(savedLang);
      }

      // Audio
      setSoundEnabledState(sound.isEnabled());
      setSoundVolumeState(sound.getVolume());

      // Tutorial: if never completed, show automatically after brief delay
      const tutorialDone = localStorage.getItem('aetherbound_tutorial_completed');
      if (!tutorialDone) {
        const timer = setTimeout(() => setShowTutorial(true), 800);
        return () => clearTimeout(timer);
      }
    }
  }, [refreshPlayer]);

  const toggleSound = useCallback(() => {
    const next = !soundEnabled;
    sound.setEnabled(next);
    setSoundEnabledState(next);
    if (next) {
      sound.play('toggle');
    }
  }, [soundEnabled]);

  const setVolume = useCallback((v: number) => {
    sound.setVolume(v);
    setSoundVolumeState(v);
  }, []);

  const playSfx = useCallback((type: SfxType) => {
    sound.play(type);
  }, []);

  const setLanguageMode = useCallback((mode: LanguageMode) => {
    setLanguageModeState(mode);
    sound.play('click');
    if (typeof window !== 'undefined') {
      localStorage.setItem('aetherbound_language_mode', mode);
    }
  }, []);

  const openTutorial = useCallback(() => {
    sound.play('click');
    setShowTutorial(true);
  }, []);

  const closeTutorial = useCallback(() => {
    sound.play('click');
    setShowTutorial(false);
  }, []);

  const completeTutorial = useCallback(() => {
    sound.play('questComplete');
    setShowTutorial(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aetherbound_tutorial_completed', 'true');
    }
  }, []);

  const openSettings = useCallback(() => {
    sound.play('click');
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    sound.play('click');
    setShowSettings(false);
  }, []);

  const openProfile = useCallback(() => {
    sound.play('click');
    setShowProfile(true);
  }, []);

  const closeProfile = useCallback(() => {
    sound.play('click');
    setShowProfile(false);
  }, []);

  const updateAvatar = useCallback(async (index: number) => {
    setPlayer((prev) => (prev ? { ...prev, avatarIndex: index } : prev));
    await playerService.updateAvatar(index);
    await refreshPlayer();
  }, [refreshPlayer]);

  const t = DICTIONARIES[languageMode];

  return (
    <GameContext.Provider
      value={{
        player,
        loading,
        refreshPlayer,
        soundEnabled,
        soundVolume,
        toggleSound,
        setVolume,
        playSfx,
        languageMode,
        setLanguageMode,
        t,
        showTutorial,
        openTutorial,
        closeTutorial,
        completeTutorial,
        showSettings,
        openSettings,
        closeSettings,
        showProfile,
        openProfile,
        closeProfile,
        updateAvatar,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
