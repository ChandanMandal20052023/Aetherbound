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

  // Legal / Lore Modals
  showTerms: boolean;
  openTerms: () => void;
  closeTerms: () => void;
  showCode: boolean;
  openCode: () => void;
  closeCode: () => void;

  // AI Quest Alchemist
  showAlchemist: boolean;
  openAlchemist: () => void;
  closeAlchemist: () => void;

  // Chrono Focus Chamber (Pomodoro Boss Run)
  showFocusChamber: boolean;
  openFocusChamber: () => void;
  closeFocusChamber: () => void;

  // Operative Battle Card (Dossier Flex)
  showBattleCard: boolean;
  openBattleCard: () => void;
  closeBattleCard: () => void;

  // Tactical Command Side Panel (Aether Forge Suite)
  showTacticalPanel: boolean;
  openTacticalPanel: () => void;
  closeTacticalPanel: () => void;
  toggleTacticalPanel: () => void;
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

  // Modals & Panels
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showAlchemist, setShowAlchemist] = useState(false);
  const [showFocusChamber, setShowFocusChamber] = useState(false);
  const [showBattleCard, setShowBattleCard] = useState(false);
  const [showTacticalPanel, setShowTacticalPanel] = useState(false);

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

  const openTerms = useCallback(() => {
    sound.play('click');
    setShowTerms(true);
  }, []);

  const closeTerms = useCallback(() => {
    sound.play('click');
    setShowTerms(false);
  }, []);

  const openCode = useCallback(() => {
    sound.play('click');
    setShowCode(true);
  }, []);

  const closeCode = useCallback(() => {
    sound.play('click');
    setShowCode(false);
  }, []);

  const openAlchemist = useCallback(() => {
    sound.play('click');
    setShowAlchemist(true);
  }, []);

  const closeAlchemist = useCallback(() => {
    sound.play('click');
    setShowAlchemist(false);
  }, []);

  const openFocusChamber = useCallback(() => {
    sound.play('click');
    setShowFocusChamber(true);
  }, []);

  const closeFocusChamber = useCallback(() => {
    sound.play('click');
    setShowFocusChamber(false);
  }, []);

  const openBattleCard = useCallback(() => {
    sound.play('click');
    setShowBattleCard(true);
  }, []);

  const closeBattleCard = useCallback(() => {
    sound.play('click');
    setShowBattleCard(false);
  }, []);

  const openTacticalPanel = useCallback(() => {
    sound.play('click');
    setShowTacticalPanel(true);
  }, []);

  const closeTacticalPanel = useCallback(() => {
    sound.play('click');
    setShowTacticalPanel(false);
  }, []);

  const toggleTacticalPanel = useCallback(() => {
    sound.play('click');
    setShowTacticalPanel((prev) => !prev);
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
        showTerms,
        openTerms,
        closeTerms,
        showCode,
        openCode,
        closeCode,
        showAlchemist,
        openAlchemist,
        closeAlchemist,
        showFocusChamber,
        openFocusChamber,
        closeFocusChamber,
        showBattleCard,
        openBattleCard,
        closeBattleCard,
        showTacticalPanel,
        openTacticalPanel,
        closeTacticalPanel,
        toggleTacticalPanel,
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
