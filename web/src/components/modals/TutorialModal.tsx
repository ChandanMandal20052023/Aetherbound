'use client';

import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';

interface TutorialStep {
  title: string;
  subtitle: string;
  emoji: string;
  tag: string;
  description: string;
  bulletPoints: string[];
  tip: string;
}

const STEPS: TutorialStep[] = [
  {
    title: 'WELCOME TO AETHERBOUND',
    subtitle: 'THE GAMIFIED LIFE SYSTEM',
    emoji: '🌌',
    tag: 'STEP 1 • PROTOCOL OVERVIEW',
    description:
      'Aetherbound transforms your everyday productivity, routines, and habits into an immersive sci-fi RPG questing saga.',
    bulletPoints: [
      '⚡ Complete real-world tasks to level up your discipline.',
      '🪙 Earn Aether Gold to unlock legendary gear and perks in the shop.',
      '🔥 Build unbroken streaks to multiply your momentum and climb ranks.',
    ],
    tip: 'Everything in your daily life can become a quest. Slay friction, earn resonance.',
  },
  {
    title: 'COMMAND HUB & DAILY RITUALS',
    subtitle: 'YOUR SANCTUARY BASE',
    emoji: '🏛️',
    tag: 'STEP 2 • DASHBOARD MASTERY',
    description:
      'Your Dashboard is your control deck. Monitor your active operative status, rank tier, and weekly habit momentum in real time.',
    bulletPoints: [
      '🎁 Daily Bonus: Claim your daily login reward (+50 XP & +50 Gold) every 24 hours.',
      '📈 Momentum Streak: Complete quests each day to keep your fire streak alive.',
      '🏆 Ranks: Progress through ranks from Arcane Trailblazer to Cosmic Sovereign.',
    ],
    tip: 'Click "Commune with Astral Core" once per day to claim your free reward.',
  },
  {
    title: 'THE QUEST CODEX',
    subtitle: 'TASKS, HABITS & INCURSIONS',
    emoji: '⚡',
    tag: 'STEP 3 • MISSION SYSTEM',
    description:
      'Conquer procrastination and execute focused sprints. Each completed quest awards real XP and Gold calculated via the game progression curve.',
    bulletPoints: [
      '🐉 Main Quests: Priority goals and deep work sessions for maximum XP.',
      '🧪 Side Quests: Fast daily routines, workouts, and hydration checks.',
      '➕ Forge Initiative: Create custom quests for your own real-life goals anytime.',
    ],
    tip: 'Higher risk quests reward exponentially more Gold and XP when resolved!',
  },
  {
    title: 'VAULT & EQUIPMENT DOLL',
    subtitle: 'GEAR UP YOUR LOADOUT',
    emoji: '🛡️',
    tag: 'STEP 4 • INVENTORY CUSTOMIZATION',
    description:
      'Manage weapons, armor, boots, and relics you forge or acquire. Equip items directly onto your interactive loadout paperdoll.',
    bulletPoints: [
      '⚔️ Weapon Slot: Swords, blasters, and focus catalysts.',
      '🛡️ Armor & Boots: Astral suits and grav-boots for resilience.',
      '🎒 Stored Items: Easily switch loadouts with instant Equip / Unequip actions.',
    ],
    tip: 'Visit the Vault whenever you acquire new loot to synchronize your active matrix.',
  },
  {
    title: 'BLACK MARKET & GUILD NET',
    subtitle: 'SHOPPING & OPERATIVE CONNECTIONS',
    emoji: '📡',
    tag: 'STEP 5 • THE ECOSYSTEM',
    description:
      'Spend your gold in the Astral Market to purchase elixirs, relics, and companions, and stay connected with fellow operatives in the network.',
    bulletPoints: [
      '🛒 Aether Shop: Spend gold on items like the Elixir of Clarity or Void Saber.',
      '📡 Guild Net: Dispatch tactical pings and broadcast encrypted transmissions to allies.',
      '⚙️ Settings: Toggle sound effects or switch language between Arcane, RPG, and Simple.',
    ],
    tip: 'You can replay this tutorial anytime by clicking the ⚙️ gear icon in the top navigation!',
  },
];

export function TutorialModal() {
  const { showTutorial, completeTutorial, closeTutorial, playSfx } = useGame();
  const [currentStep, setCurrentStep] = useState(0);

  if (!showTutorial) return null;

  const step = STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;

  const handleNext = () => {
    playSfx('click');
    if (isLast) {
      completeTutorial();
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    playSfx('click');
    if (!isFirst) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSkip = () => {
    completeTutorial();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 md:p-8 space-y-6 text-white border-[#000000]">
        {/* Header Ribbon & Step Counter */}
        <div className="flex items-center justify-between border-b-2 border-[#362354] pb-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#ffb68d] text-[#2c0e00] font-black text-xs px-2.5 py-0.5 rounded border border-black uppercase shadow-solid-sm">
              {step.tag}
            </span>
          </div>

          {/* Step Dots */}
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  playSfx('click');
                  setCurrentStep(i);
                }}
                className={`w-3 h-3 rounded-full border border-black transition-all ${
                  i === currentStep
                    ? 'bg-[#7ef9c7] scale-125 shadow-solid-sm'
                    : i < currentStep
                    ? 'bg-[#ffb68d]'
                    : 'bg-[#3b275a]'
                }`}
                title={`Step ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="text-xs text-[#bccac1] hover:text-white font-black underline uppercase cursor-pointer"
          >
            Skip Guide ✕
          </button>
        </div>

        {/* Main Content Card */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#130728] border-3 border-black flex items-center justify-center text-3xl shadow-solid shrink-0">
              {step.emoji}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase font-heading text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs font-black text-[#7ef9c7] uppercase tracking-widest">
                {step.subtitle}
              </p>
            </div>
          </div>

          <p className="text-sm text-[#dcd1ea] font-medium leading-relaxed">
            {step.description}
          </p>

          {/* Key Bullet Points */}
          <div className="bg-[#170c28] border-2 border-black rounded-xl p-4 space-y-2 shadow-solid-sm">
            {step.bulletPoints.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-white font-semibold">
                <span className="text-[#7ef9c7] font-black text-sm">▶</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>

          {/* Pro-Tip Box */}
          <div className="bg-[#2a1b42] border border-[#ffb68d]/60 rounded-lg p-3 text-xs text-[#ffb68d] flex items-center gap-2 font-bold">
            <span>💡</span>
            <span>PRO-TIP: {step.tip}</span>
          </div>
        </div>

        {/* Action Controls Footer */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-[#362354]">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={isFirst}
            className={isFirst ? 'opacity-0 pointer-events-none' : ''}
          >
            ← PREVIOUS
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSkip}
              className="hidden sm:inline-flex text-xs"
            >
              SKIP TUTORIAL
            </Button>
            <Button
              variant={isLast ? 'primary' : 'secondary'}
              size="md"
              onClick={handleNext}
              className="min-w-[140px]"
            >
              {isLast ? 'LAUNCH SAGA 🚀' : 'NEXT STEP →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
