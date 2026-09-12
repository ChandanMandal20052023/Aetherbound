'use client';

import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';

interface GeneratedQuest {
  title: string;
  description: string;
  category: 'main' | 'side' | 'active';
  rarity: 'trivial' | 'common' | 'rare' | 'epic' | 'legendary';
  risk: 'low' | 'medium' | 'high';
  xpReward: number;
  goldReward: number;
  emoji: string;
  tacticalTip: string;
}

interface QuestAlchemistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestsAdded?: () => void;
}

const PRESET_GOALS = [
  'Build and ship hackathon MVP in 24 hours',
  'Master Dynamic Programming & Graph Algorithms',
  'Prepare high-impact startup pitch deck',
  'Crush 5km running milestone & stretch mobility',
];

export function QuestAlchemistModal({ isOpen, onClose, onQuestsAdded }: QuestAlchemistModalProps) {
  const { playSfx, refreshPlayer } = useGame();
  const [goal, setGoal] = useState('');
  const [difficulty, setDifficulty] = useState<'balanced' | 'rigorous' | 'nightmare'>('balanced');
  const [loading, setLoading] = useState(false);
  const [generatedQuests, setGeneratedQuests] = useState<GeneratedQuest[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [committing, setCommitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTransmute = async (promptGoal?: string) => {
    const targetGoal = promptGoal ?? goal;
    if (!targetGoal.trim()) return;

    playSfx('click');
    setLoading(true);
    setErrorMsg(null);
    setGeneratedQuests([]);

    try {
      const res = await fetch('/api/quests/alchemy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: targetGoal, difficulty }),
      });

      if (!res.ok) {
        throw new Error('Alchemy distillation failed');
      }

      const data = await res.json();
      if (Array.isArray(data.quests)) {
        setGeneratedQuests(data.quests);
        setSelectedIndices(new Set(data.quests.map((_: GeneratedQuest, i: number) => i)));
        playSfx('dailyBonus');
      }
    } catch {
      setErrorMsg('Transmutation disrupted. Please try again.');
      playSfx('error');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (index: number) => {
    playSfx('click');
    setSelectedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleCommitQuests = async () => {
    if (selectedIndices.size === 0) return;
    setCommitting(true);
    playSfx('click');

    try {
      const toAdd = generatedQuests.filter((_, idx) => selectedIndices.has(idx));
      for (const q of toAdd) {
        await fetch('/api/quests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: q.title,
            description: q.description,
            category: q.category,
            rarity: q.rarity,
            risk: q.risk,
            xpReward: q.xpReward,
            goldReward: q.goldReward,
            emoji: q.emoji,
          }),
        });
      }

      playSfx('questComplete');
      await refreshPlayer();
      if (onQuestsAdded) onQuestsAdded();
      onClose();
    } catch {
      setErrorMsg('Failed to commit quests to active log.');
      playSfx('error');
    } finally {
      setCommitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 md:p-8 space-y-6 text-white border-[#000000] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#362354] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-pulse">⚗️</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#fad02c] text-black text-[10px] font-black px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
                  AI QUEST ALCHEMIST
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black uppercase font-heading text-white tracking-tight">
                GOAL TRANSMUTATION CHAMBER
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playSfx('click');
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-[#130728] border-2 border-black flex items-center justify-center text-sm font-black text-[#bccac1] hover:text-white hover:bg-[#ff5a5a] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-[#bccac1] mb-1.5">
              Enter your real-world objective or target:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTransmute()}
                placeholder="e.g. Master Neural Networks, Organize desk and finances, Ship landing page..."
                className="flex-1 bg-[#130728] border-2 border-black rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#71648a] focus:outline-none focus:border-[#7ef9c7] shadow-solid-sm"
              />
              <Button
                variant="gold"
                size="md"
                disabled={loading || !goal.trim()}
                onClick={() => handleTransmute()}
                className="whitespace-nowrap font-black"
              >
                {loading ? 'TRANSMUTING...' : 'TRANSMUTE ⚡'}
              </Button>
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#8f82aa]">
              OR SAMPLE RAPID ALCHEMY PRESETS:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_GOALS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setGoal(preset);
                    handleTransmute(preset);
                  }}
                  className="text-[11px] bg-[#170c28] hover:bg-[#362354] text-[#dcd1ea] border border-black px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-left"
                >
                  &ldquo;{preset}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Tuning */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-[#bccac1]">Crucible Intensity:</span>
            <div className="flex items-center gap-2">
              {(['balanced', 'rigorous', 'nightmare'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    playSfx('click');
                    setDifficulty(d);
                  }}
                  className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-lg border border-black transition-all cursor-pointer ${
                    difficulty === d
                      ? 'bg-[#7ef9c7] text-black shadow-solid-sm -translate-y-0.5'
                      : 'bg-[#170c28] text-[#bccac1]'
                  }`}
                >
                  {d === 'nightmare' ? '🔥 Nightmare (+50%)' : d === 'rigorous' ? '⚡ Rigorous (+25%)' : 'Balanced'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#ff5a5a]/20 border-2 border-[#ff5a5a] text-xs font-bold text-[#ffb68d]">
            {errorMsg}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="py-8 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-[#fad02c] border-t-transparent animate-spin" />
            <p className="font-mono text-xs text-[#fad02c] font-black uppercase tracking-widest animate-pulse">
              Synthesizing Quest Sequence & Calculating XP Curves...
            </p>
          </div>
        )}

        {/* Generated Quest Chain Preview */}
        {generatedQuests.length > 0 && !loading && (
          <div className="space-y-3 pt-2 border-t-2 border-[#362354]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-[#7ef9c7] tracking-wider">
                TRANSMUTED QUEST SEQUENCE ({selectedIndices.size}/{generatedQuests.length} SELECTED)
              </h3>
              <button
                type="button"
                onClick={() => {
                  playSfx('click');
                  if (selectedIndices.size === generatedQuests.length) setSelectedIndices(new Set());
                  else setSelectedIndices(new Set(generatedQuests.map((_, i) => i)));
                }}
                className="text-[10px] text-[#bccac1] hover:text-white uppercase font-bold underline cursor-pointer"
              >
                {selectedIndices.size === generatedQuests.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="space-y-2.5">
              {generatedQuests.map((q, idx) => {
                const isSelected = selectedIndices.has(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleSelect(idx)}
                    className={`p-3.5 rounded-xl border-2 border-black transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#1c0f32] border-[#7ef9c7] shadow-solid-sm'
                        : 'bg-[#130728] opacity-60 border-black'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 accent-[#7ef9c7] rounded cursor-pointer"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{q.emoji}</span>
                          <h4 className="text-xs sm:text-sm font-black text-white uppercase">
                            {q.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded border border-black bg-[#fad02c] text-black">
                            +{q.xpReward} XP
                          </span>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded border border-black bg-[#ffb68d] text-black">
                            +{q.goldReward} G
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-[#bccac1] leading-relaxed">
                        {q.description}
                      </p>
                      <div className="pt-1 flex items-center gap-2 text-[10px] text-[#7ef9c7] font-mono">
                        <span>💡 Tactical Tip:</span>
                        <span className="text-[#ebdcff]">{q.tacticalTip}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#8f82aa] font-bold">
                Total Reward: +{generatedQuests.filter((_, i) => selectedIndices.has(i)).reduce((acc, q) => acc + q.xpReward, 0)} XP
              </span>
              <Button
                variant="primary"
                size="md"
                disabled={selectedIndices.size === 0 || committing}
                onClick={handleCommitQuests}
                withArrow
              >
                {committing ? 'COMMITTING...' : `ACCEPT & COMMIT ${selectedIndices.size} QUESTS ⚔️`}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
