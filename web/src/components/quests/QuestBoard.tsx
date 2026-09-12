'use client';

import React, { useState } from 'react';
import type { Quest, QuestCategory, QuestRarity, QuestRisk } from '@/types/quest';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { useGame } from '@/contexts/GameContext';
import { questService } from '@/services/quest.service';

interface QuestBoardProps {
  initialQuests: Quest[];
  onQuestComplete?: (quest: Quest) => void;
}

export function QuestBoard({
  initialQuests,
  onQuestComplete,
}: QuestBoardProps) {
  const { playSfx, refreshPlayer, openAlchemist, openFocusChamber, t } = useGame();
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | QuestCategory | 'completed'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New quest form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<QuestCategory>('main');
  const [newRarity, setNewRarity] = useState<QuestRarity>('rare');
  const [newRisk, setNewRisk] = useState<QuestRisk>('medium');
  const [newXP, setNewXP] = useState(150);

  const handleResolve = (questId: string) => {
    playSfx('questComplete');
    setQuests((prev) =>
      prev.map((q) =>
        q.id === questId ? { ...q, status: 'completed' } : q
      )
    );
    const resolved = quests.find((q) => q.id === questId);
    if (resolved && onQuestComplete) {
      onQuestComplete(resolved);
    }
    refreshPlayer();
  };

  const handleCreateQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const created = await questService.createQuest({
        title: newTitle,
        description: newDesc || 'No briefing recorded. Venture boldly.',
        category: newCategory,
        rarity: newRarity,
        risk: newRisk,
        emoji: newCategory === 'main' ? '⚡' : newCategory === 'side' ? '🧪' : '🐉',
      });
      playSfx('questComplete');
      setQuests((prev) => [created, ...prev]);
      setShowCreateModal(false);
      setNewTitle('');
      setNewDesc('');
      refreshPlayer();
    } catch (err) {
      console.error('Failed to create quest:', err);
      playSfx('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredQuests = quests.filter((q) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? q.status !== 'completed'
        : selectedCategory === 'completed'
        ? q.status === 'completed'
        : q.category === selectedCategory && q.status !== 'completed';

    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (showErrorState) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowErrorState(false)}
          >
            ← Back to Quest Codex
          </Button>
        </div>
        <ErrorState
          title="QUEST CODEX DISRUPTED"
          message="Quantum entanglement failed to sync with the Moonfall server array. Chrono-telemetry error 0x7E."
          onRetry={() => setShowErrorState(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner / Controls */}
      <div className="bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-[#fad02c] text-black font-black text-xs px-2.5 py-0.5 rounded border border-black shadow-solid-sm uppercase">
              Codex V2.4
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-heading">
              {t.questsTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#bccac1] font-semibold">
            {t.questsSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="gold"
            size="md"
            onClick={openAlchemist}
            className="font-black"
          >
            ⚡ AI ALCHEMIST
          </Button>
          <Button
            variant="lavender"
            size="md"
            onClick={openFocusChamber}
            className="font-black"
          >
            ⏳ FOCUS CRUCIBLE
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowCreateModal(true)}
            withArrow
          >
            {t.createQuest}
          </Button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Active' },
            { id: 'main', label: 'Main Sagas' },
            { id: 'side', label: 'Side Missions' },
            { id: 'active', label: 'In Progress' },
            { id: 'completed', label: 'Resolved' },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-lg border-2 border-black font-black text-xs uppercase tracking-wider shadow-solid-sm transition-all ${
                  isActive
                    ? 'bg-[#7ef9c7] text-black -translate-y-0.5'
                    : 'bg-[#201335] text-white hover:bg-[#302445]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search active quests..."
            className="w-full bg-[#130728] border-2 border-black rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#86948c] focus:outline-none focus:border-[#7ef9c7] shadow-solid-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1.5 text-xs text-[#bccac1] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Quest List */}
      {filteredQuests.length === 0 ? (
        <EmptyState
          title="NO QUESTS FOUND"
          description="All challenges in this quadrant have been conquered or no matches found. Forge a new quest to continue ascending."
          actionLabel="FORGE NEW QUEST"
          onAction={() => setShowCreateModal(true)}
          emoji="🏆"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuests.map((quest) => {
            const isResolved = quest.status === 'completed';

            return (
              <div
                key={quest.id}
                className={`bg-[#201335] border-pixel-thick shadow-solid-lg rounded-xl p-5 flex flex-col justify-between transition-all ${
                  isResolved ? 'opacity-60 bg-[#160b24]' : 'hover:-translate-y-0.5'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl">{quest.emoji}</span>
                      <span className="bg-[#ffb68d] text-black font-black text-[10px] px-2 py-0.5 rounded border border-black uppercase shadow-solid-sm">
                        {quest.category} • {quest.rarity}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border border-black shadow-solid-sm ${
                        quest.risk === 'high'
                          ? 'bg-[#ff5a5a] text-white'
                          : quest.risk === 'medium'
                          ? 'bg-[#ffb68d] text-black'
                          : 'bg-[#7ef9c7] text-black'
                      }`}
                    >
                      Risk {quest.risk}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white font-heading uppercase tracking-wide">
                      {quest.title}
                    </h3>
                    <p className="text-xs text-[#bccac1] font-medium mt-1 leading-relaxed">
                      {quest.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-black/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#fad02c] text-black font-black text-[11px] px-2 py-0.5 rounded border border-black shadow-solid-sm">
                      +{quest.reward.xp} XP
                    </span>
                    {quest.reward.gold && (
                      <span className="text-[11px] font-bold text-[#ffb68d]">
                        +{quest.reward.gold} 🪙
                      </span>
                    )}
                  </div>

                  {isResolved ? (
                    <span className="text-xs font-black text-[#7ef9c7] uppercase">
                      Resolved ✓
                    </span>
                  ) : (
                    <Button
                      variant={quest.category === 'main' ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => handleResolve(quest.id)}
                      withArrow
                    >
                      RESOLVE
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Forge New Quest Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black/50 pb-3">
              <h3 className="text-xl font-black text-white uppercase tracking-wider font-heading">
                FORGE NEW QUEST
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-lg bg-[#130728] border-2 border-black text-white font-black hover:bg-[#ff5a5a] shadow-solid-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuest} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-[#ebdcff] uppercase block mb-1">
                  Quest Objective (Title)
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Finish Sprint Backlog Review"
                  className="w-full bg-[#130728] border-2 border-black rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7ef9c7] shadow-solid-sm"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#ebdcff] uppercase block mb-1">
                  Tactical Briefing (Description)
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Context and win condition..."
                  className="w-full bg-[#130728] border-2 border-black rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7ef9c7] shadow-solid-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-black text-[#bccac1] uppercase block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#130728] border-2 border-black rounded-lg p-2 text-xs text-white font-bold"
                  >
                    <option value="main">Main</option>
                    <option value="side">Side</option>
                    <option value="active">Active</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-[#bccac1] uppercase block mb-1">
                    Risk
                  </label>
                  <select
                    value={newRisk}
                    onChange={(e) => setNewRisk(e.target.value as any)}
                    className="w-full bg-[#130728] border-2 border-black rounded-lg p-2 text-xs text-white font-bold"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-[#bccac1] uppercase block mb-1">
                    XP Reward
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={1000}
                    step={10}
                    value={newXP}
                    onChange={(e) => setNewXP(Number(e.target.value))}
                    className="w-full bg-[#130728] border-2 border-black rounded-lg p-2 text-xs text-white font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t-2 border-black/40">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" withArrow>
                  EMBARK
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
