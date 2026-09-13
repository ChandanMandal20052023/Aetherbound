'use client';

import React, { useState } from 'react';
import type { Quest } from '@/types/quest';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  quest: Quest;
  onAction?: (quest: Quest) => void;
}

export function QuestCard({ quest, onAction }: QuestCardProps) {
  const [completed, setCompleted] = useState(quest.status === 'completed');
  const [loading, setLoading] = useState(false);

  const categoryUpper = (quest.category || '').toUpperCase();
  const difficultyDisplay = (quest.difficulty || quest.rarity || 'STANDARD').toUpperCase();
  const categoryBadge =
    categoryUpper === 'ACTIVE'
      ? 'ACTIVE QUEST'
      : categoryUpper === 'MAIN'
      ? 'MAIN QUEST'
      : categoryUpper === 'SIDE'
      ? 'SIDE QUEST'
      : `${categoryUpper} QUEST`;

  const isDarkCard =
    categoryUpper === 'MAIN' ||
    categoryUpper === 'ACTIVE' ||
    difficultyDisplay === 'EPIC' ||
    difficultyDisplay === 'LEGENDARY';

  const xpAmount = quest.xp_reward ?? quest.reward?.xp ?? 50;
  const goldAmount = quest.gold_reward ?? quest.reward?.gold ?? 20;

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      if (onAction) onAction(quest);
    }, 400);
  };

  // Neo-Brutalist Card color themes based on Stitch spec
  const bgTheme = isDarkCard
    ? 'bg-[#6b55ab] text-white'
    : 'bg-[#7ef9c7] text-black';

  const buttonBg = isDarkCard
    ? 'bg-[#ff9873] hover:bg-[#ff865c] text-black'
    : 'bg-[#cbbeeb] hover:bg-[#baa8e6] text-black';

  return (
    <article
      className={cn(
        'border-pixel-thick shadow-solid-lg rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between transition-all',
        bgTheme,
        completed && 'opacity-70 bg-opacity-60'
      )}
    >
      <div>
        {/* Top Badge Header */}
        <div className="flex items-center justify-between mb-3">
          <div
            className={cn(
              'border-pixel font-black text-xs px-3.5 py-1 rounded-md shadow-solid flex items-center gap-1.5 uppercase tracking-wide',
              isDarkCard ? 'bg-[#ffb295] text-black' : 'bg-white text-black'
            )}
          >
            <span>{quest.emoji || '⚡'}</span>
            <span>
              {categoryBadge} • {difficultyDisplay}
            </span>
          </div>

          {quest.risk === 'high' && (
            <span className="bg-[#ff5a5a] text-white font-black text-[10px] tracking-wider px-2.5 py-1 rounded border-2 border-black uppercase shadow-solid-sm">
              RISK HIGH
            </span>
          )}
        </div>

        {/* Quest Title */}
        <div className="space-y-1.5">
          <h3
            className={cn(
              'text-2xl sm:text-3xl font-black tracking-tight font-heading',
              isDarkCard
                ? 'text-white drop-shadow-[0_2px_0_#000000]'
                : 'text-black'
            )}
          >
            {quest.title}
          </h3>
        </div>

        {/* Quest Lore & Reward Details */}
        <div
          className={cn(
            'my-4 space-y-2',
            isDarkCard ? 'text-white' : 'text-black'
          )}
        >
          <p
            className={cn(
              'text-sm font-medium leading-relaxed',
              isDarkCard ? 'text-white/95' : 'text-zinc-900'
            )}
          >
            {quest.description}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span
              className={cn(
                'text-xs font-black tracking-wide uppercase px-2.5 py-1 rounded border-2 border-black shadow-solid-sm',
                isDarkCard
                  ? 'bg-[#fad02c] text-black'
                  : 'bg-white text-black'
              )}
            >
              REWARDS: {xpAmount} XP{' '}
              {quest.reward?.item ? `+ ${quest.reward.item}` : ''}
              {goldAmount ? `• ${goldAmount} GOLD` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Quest Action Button */}
      <button
        type="button"
        disabled={completed || loading}
        onClick={handleAction}
        className={cn(
          'w-full font-black text-base py-3 rounded-xl border-pixel shadow-solid flex items-center justify-center gap-2 tracking-wider uppercase btn-press select-none transition-all',
          completed
            ? 'bg-[#88dfbc] text-black cursor-default shadow-none border-2'
            : buttonBg
        )}
      >
        <span>
          {completed
            ? 'RESOLVED ✓'
            : loading
            ? 'RESOLVING...'
            : isDarkCard
            ? 'RESOLVE'
            : 'START'}
        </span>
        {!completed && <span className="text-xl leading-none">→</span>}
      </button>
    </article>
  );
}
