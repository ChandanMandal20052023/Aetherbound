'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { questService } from '@/services/quest.service';
import { calculateQuestReward } from '@/lib/progression';
import type { Quest, QuestCategory, QuestDifficulty, QuestFrequency } from '@/types/quest';

interface ForgeQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestForged: (quest: Quest) => void;
  playerLevel?: number;
}

const CATEGORIES: { id: QuestCategory; label: string; icon: string; bg: string; desc: string }[] = [
  { id: 'INTELLECT', label: 'Intellect', icon: '🧠', bg: '#cbbeeb', desc: 'Knowledge, study & mental mastery' },
  { id: 'STRENGTH', label: 'Strength', icon: '⚔️', bg: '#ffb295', desc: 'Physical fitness, vigor & endurance' },
  { id: 'DISCIPLINE', label: 'Discipline', icon: '🔥', bg: '#fad02c', desc: 'Habits, consistency & willpower' },
  { id: 'FOCUS', label: 'Focus', icon: '🧪', bg: '#7ef9c7', desc: 'Deep work, coding & flow states' },
  { id: 'CREATIVITY', label: 'Creativity', icon: '🎨', bg: '#ff9873', desc: 'Writing, art, design & expression' },
];

const DIFFICULTIES: { id: QuestDifficulty; label: string; badgeColor: string; baseMult: string }[] = [
  { id: 'TRIVIAL', label: 'TRIVIAL', badgeColor: 'bg-zinc-700 text-zinc-200', baseMult: 'Quick Warmup' },
  { id: 'STANDARD', label: 'STANDARD', badgeColor: 'bg-[#7ef9c7] text-black', baseMult: 'Balanced' },
  { id: 'RARE', label: 'RARE', badgeColor: 'bg-[#90e0ef] text-black', baseMult: 'Challenging' },
  { id: 'EPIC', label: 'EPIC', badgeColor: 'bg-[#cbbeeb] text-black', baseMult: 'High Stakes' },
  { id: 'LEGENDARY', label: 'LEGENDARY', badgeColor: 'bg-[#fad02c] text-black', baseMult: 'Grand Feat' },
];

const FREQUENCIES: { id: QuestFrequency; label: string; desc: string }[] = [
  { id: 'ONE_TIME', label: 'ONE TIME', desc: 'Single milestone accomplishment' },
  { id: 'DAILY', label: 'DAILY RITUAL', desc: 'Resets and repeats daily' },
];

export function ForgeQuestModal({
  isOpen,
  onClose,
  onQuestForged,
  playerLevel = 1,
}: ForgeQuestModalProps) {
  const { playSfx } = useGame();
  const modalRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<QuestCategory>('INTELLECT');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('EPIC');
  const [frequency, setFrequency] = useState<QuestFrequency>('ONE_TIME');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Today's minimum date string in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Dynamic live reward preview (calculated via server math rules)
  const previewReward = calculateQuestReward(difficulty, category, playerLevel);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        playSfx('click');
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll while open
    document.body.style.overflow = 'hidden';

    // Auto-focus the title input on opening
    const timer = setTimeout(() => {
      titleInputRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [isOpen, onClose, playSfx]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Frontend validation
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrorMessage('Quest title is required.');
      playSfx('error');
      titleInputRef.current?.focus();
      return;
    }

    if (trimmedTitle.length > 120) {
      setErrorMessage('Quest title cannot exceed 120 characters.');
      playSfx('error');
      return;
    }

    if (dueDate) {
      const selected = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setErrorMessage('Due date cannot be earlier than today.');
        playSfx('error');
        return;
      }
    }

    setIsSubmitting(true);
    playSfx('click');

    try {
      const createdQuest = await questService.createQuest({
        title: trimmedTitle,
        description: description.trim() || undefined,
        category,
        difficulty,
        frequency,
        due_date: dueDate || undefined,
      });

      playSfx('questComplete');
      onQuestForged(createdQuest);
      onClose();

      // Reset form fields
      setTitle('');
      setDescription('');
      setCategory('INTELLECT');
      setDifficulty('EPIC');
      setFrequency('ONE_TIME');
      setDueDate('');
    } catch (err: unknown) {
      playSfx('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to forge quest. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          playSfx('click');
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="forge-quest-modal-title"
        className="relative w-full max-w-2xl bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-5 sm:p-7 text-white space-y-5 my-auto max-h-[92vh] overflow-y-auto select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top Accent Tape */}
        <div className="flex justify-between items-center border-b-2 border-[#3d2760] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow-[0_2px_0_#000000]">⚔️</span>
            <div>
              <div className="inline-block -rotate-1">
                <span className="bg-[#fad02c] text-black font-black text-[10px] px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm tracking-wider">
                  QUEST FOUNDRY
                </span>
              </div>
              <h2
                id="forge-quest-modal-title"
                className="text-2xl sm:text-3xl font-black uppercase font-heading text-[#7ef9c7] tracking-tight drop-shadow-[0_2px_0_#000000]"
              >
                FORGE A NEW QUEST
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!isSubmitting) {
                playSfx('click');
                onClose();
              }
            }}
            disabled={isSubmitting}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-xl bg-[#130728] border-2 border-black flex items-center justify-center text-sm font-black text-[#bccac1] hover:text-white hover:bg-[#ff5a5a] transition-all cursor-pointer shadow-solid-sm active:translate-x-0.5 active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef9c7]"
          >
            ✕
          </button>
        </div>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="bg-[#ff5a5a] text-black font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl border-2 border-black shadow-solid flex items-center gap-2 animate-shake">
            <span className="text-base">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field 1: Quest Title */}
          <div className="space-y-1.5">
            <label
              htmlFor="quest-title"
              className="block text-xs font-black uppercase tracking-wider text-[#ffb295]"
            >
              Quest Title <span className="text-[#ff5a5a]">*</span>
            </label>
            <input
              id="quest-title"
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Study Neural Networks"
              maxLength={120}
              required
              disabled={isSubmitting}
              className="w-full bg-[#130728] border-2 border-black rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-white placeholder-zinc-500 shadow-solid-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef9c7] focus:border-[#7ef9c7] transition-all"
            />
          </div>

          {/* Field 2: Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="quest-desc"
              className="block text-xs font-black uppercase tracking-wider text-[#bccac1]"
            >
              Description <span className="text-zinc-400 font-normal text-[10px]">(Optional)</span>
            </label>
            <textarea
              id="quest-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Complete one focused study session on neural networks."
              disabled={isSubmitting}
              className="w-full bg-[#130728] border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium text-white placeholder-zinc-500 shadow-solid-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef9c7] focus:border-[#7ef9c7] transition-all resize-none"
            />
          </div>

          {/* Field 3: Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase tracking-wider text-[#cbbeeb]">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      playSfx('click');
                      setCategory(cat.id);
                    }}
                    disabled={isSubmitting}
                    className={`py-2 px-2.5 rounded-xl border-2 border-black font-extrabold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#7ef9c7] text-black shadow-solid scale-[1.03] font-black'
                        : 'bg-[#130728] text-[#bccac1] hover:bg-[#251540] hover:text-white shadow-solid-sm'
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef9c7]`}
                  >
                    <span className="text-lg leading-none">{cat.icon}</span>
                    <span className="text-[11px] tracking-tight">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field 4: Difficulty */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase tracking-wider text-[#fad02c]">
              Difficulty Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {DIFFICULTIES.map((diff) => {
                const isSelected = difficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => {
                      playSfx('click');
                      setDifficulty(diff.id);
                    }}
                    disabled={isSubmitting}
                    className={`py-2 px-2 rounded-xl border-2 border-black text-center transition-all cursor-pointer select-none ${
                      isSelected
                        ? `${diff.badgeColor} shadow-solid scale-[1.03] font-black`
                        : 'bg-[#130728] text-zinc-400 hover:bg-[#251540] hover:text-white shadow-solid-sm font-extrabold'
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef9c7]`}
                  >
                    <span className="block text-xs tracking-tight">{diff.label}</span>
                    <span className="block text-[9px] opacity-80 uppercase tracking-tighter">
                      {diff.baseMult}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field 5 & 6: Frequency & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Frequency */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-[#ffb295]">
                Frequency
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FREQUENCIES.map((freq) => {
                  const isSelected = frequency === freq.id;
                  return (
                    <button
                      key={freq.id}
                      type="button"
                      onClick={() => {
                        playSfx('click');
                        setFrequency(freq.id);
                      }}
                      disabled={isSubmitting}
                      className={`py-2.5 px-3 rounded-xl border-2 border-black font-black text-xs text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#ffb295] text-black shadow-solid font-black'
                          : 'bg-[#130728] text-zinc-400 hover:bg-[#251540] hover:text-white shadow-solid-sm'
                      } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef9c7]`}
                    >
                      {freq.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label
                htmlFor="quest-due-date"
                className="block text-xs font-black uppercase tracking-wider text-[#bccac1]"
              >
                Due Date <span className="text-zinc-400 font-normal text-[10px]">(Optional)</span>
              </label>
              <input
                id="quest-due-date"
                type="date"
                min={todayStr}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-[#130728] border-2 border-black rounded-xl px-4 py-2 text-sm font-bold text-white placeholder-zinc-500 shadow-solid-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef9c7] focus:border-[#7ef9c7] transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Field 7: Reward Preview Box */}
          <div className="bg-[#120822] border-pixel-thick border-black rounded-xl p-3.5 sm:p-4 shadow-solid-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-[#ffb68d]">
                  ESTIMATED REWARD
                </span>
                <span className="text-[10px] text-zinc-400 font-medium">
                  (Calculated by server)
                </span>
              </div>
              <p className="text-[11px] text-zinc-300">
                Rewards automatically scale with difficulty tier and operative level.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* XP Badge */}
              <div className="bg-[#fad02c] text-black font-black text-sm px-3 py-1.5 rounded-lg border-2 border-black shadow-solid-sm flex items-center gap-1">
                <span>⚡</span>
                <span>+{previewReward.xp} XP</span>
              </div>
              {/* Gold Badge */}
              <div className="bg-[#7ef9c7] text-black font-black text-sm px-3 py-1.5 rounded-lg border-2 border-black shadow-solid-sm flex items-center gap-1">
                <span>🪙</span>
                <span>+{previewReward.gold} GOLD</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 sm:py-4 px-6 rounded-xl border-pixel-thick shadow-solid-lg font-heading font-black text-base sm:text-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all select-none ${
                isSubmitting
                  ? 'bg-[#4b3c6e] text-zinc-300 cursor-not-allowed border-2'
                  : 'bg-[#7ef9c7] text-black hover:bg-[#6be0b0] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer'
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fad02c]`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                  <span>FORGING...</span>
                </>
              ) : (
                <>
                  <span>FORGE QUEST</span>
                  <span className="text-xl leading-none">→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
