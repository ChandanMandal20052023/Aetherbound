'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';


interface Operative {
  id: string;
  name: string;
  role: string;
  level: number;
  avatar: string;
  streak: number;
  status: 'online' | 'in-mission' | 'offline';
  pinged?: boolean;
}

const INITIAL_OPERATIVES: Operative[] = [
  {
    id: 'op-1',
    name: 'Kaelen Vance',
    role: 'Void Ranger',
    level: 14,
    avatar: '/avatars/Avatar-2.jpg',
    streak: 21,
    status: 'online',
  },
  {
    id: 'op-2',
    name: 'Lyra Moonwhisper',
    role: 'Aether Scholar',
    level: 11,
    avatar: '/avatars/Avatar-3.jpg',
    streak: 9,
    status: 'in-mission',
  },
  {
    id: 'op-3',
    name: 'Darius Thorne',
    role: 'Ironclad Paladin',
    level: 16,
    avatar: '/avatars/Avatar-4.jpg',
    streak: 30,
    status: 'online',
  },
  {
    id: 'op-4',
    name: 'Sylvia Cross',
    role: 'Chrono Alchemist',
    level: 10,
    avatar: '/avatars/Avatar-5.jpg',
    streak: 12,
    status: 'offline',
  },
];

export default function NetworkPage() {
  const [operatives, setOperatives] = useState(INITIAL_OPERATIVES);
  const [loadingOperatives, setLoadingOperatives] = useState(true);

  useEffect(() => {
    fetch('/api/network/operatives')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setOperatives(data);
      })
      .catch(() => {/* fallback to INITIAL_OPERATIVES already set */})
      .finally(() => setLoadingOperatives(false));
  }, []);

  const [transmissions, setTransmissions] = useState([
    {
      id: 't-1',
      sender: 'Kaelen Vance',
      message: 'Email Hydra resolved. Starlight cloak holding firm.',
      time: '3m ago',
    },
    {
      id: 't-2',
      sender: 'Commander Varyn',
      message: 'Raid window opening in 2 hours. Equip shadow-resist gear.',
      time: '18m ago',
    },
    {
      id: 't-3',
      sender: 'Lyra Moonwhisper',
      message: 'Brew Focus Potion mastery bonus shared with party.',
      time: '45m ago',
    },
  ]);
  const [newBroadcast, setNewBroadcast] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePing = (id: string, name: string) => {
    setOperatives((prev) =>
      prev.map((op) => (op.id === id ? { ...op, pinged: true } : op))
    );
    setToastMessage(`Aether ping dispatched to ${name}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBroadcast.trim()) return;

    setTransmissions([
      {
        id: `t-${Date.now()}`,
        sender: 'Arcane_Trailblazer (You)',
        message: newBroadcast,
        time: 'Just now',
      },
      ...transmissions,
    ]);
    setNewBroadcast('');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#7ef9c7] text-black font-black text-sm px-4 py-3 rounded-xl border-pixel-thick shadow-solid-lg flex items-center gap-2 animate-bounce">
          <span>📡</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sub-header Ticker Tape */}
      <section className="bg-[#201335] border-3 border-black shadow-solid rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#ffb68d] text-black px-2.5 py-0.5 border-2 border-black font-black text-xs shadow-solid-sm -rotate-1 uppercase rounded">
            ARCANE NETWORK • NODE CONNECTIVITY
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7ef9c7] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7ef9c7] border border-black" />
            </span>
            <span className="text-xs font-black text-[#7ef9c7] tracking-wider uppercase">
              AETHER-NET SYNC: ONLINE • 42 ALLIES DOCKED
            </span>
          </div>
        </div>
        <div className="text-[11px] font-mono text-[#bccac1] font-bold">
          LATENCY: 12ms // HUB: TOKYO-WEST
        </div>
      </section>

      {/* Guild Vanguard Raid Banner */}
      <div className="bg-[#6853a8] border-pixel-thick shadow-solid-lg rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-block px-3 py-0.5 bg-[#fad02c] text-black text-xs font-black rounded border-2 border-black shadow-solid-sm -rotate-1 uppercase">
            ACTIVE GUILD ALLIANCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading">
            Moonfall Vanguard Guild
          </h2>
          <p className="text-xs sm:text-sm text-[#ebdcff] font-medium leading-relaxed">
            Co-op Raid Active: &ldquo;The Chrono Siphon Distortions&rdquo;. Slay high-friction procrastination bosses as a unified squad to unlock guild-wide XP multipliers.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="bg-[#130728] text-[#7ef9c7] text-xs font-black px-3 py-1 rounded border border-black uppercase">
              RAID PROGRESS: 74%
            </span>
            <span className="bg-[#ffb68d] text-black text-xs font-black px-3 py-1 rounded border border-black uppercase">
              PARTY SIZE: 8/10
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-2">
          <Button
            variant="gold"
            size="lg"
            onClick={() => {
              setToastMessage('Joined Chrono Siphon Raid Squad!');
              setTimeout(() => setToastMessage(null), 3000);
            }}
            withArrow
          >
            JOIN CO-OP RAID
          </Button>
          <span className="text-[11px] text-[#ebdcff] font-mono font-bold">
            Bonus Reward: +400 XP + Guild Relic
          </span>
        </div>
      </div>

      {/* 2-Column Grid: Allied Operatives + Transmission Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Allied Operatives (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#201335] border-4 border-black p-5 shadow-solid-lg rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black/50 pb-3">
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight font-heading">
                  ALLIED OPERATIVES ROSTER
                </h3>
                <p className="text-xs text-[#bccac1] font-semibold">
                  Fellow habit strikers and deep work warriors in your network
                </p>
              </div>
              <span className="bg-[#7ef9c7] text-black font-black text-[10px] px-2 py-0.5 rounded border border-black uppercase">
                4 AVAILABLE
              </span>
            </div>

            <div className="space-y-3">
              {operatives.map((op) => (
                <div
                  key={op.id}
                  className="bg-[#190c2d] border-2 border-black p-3.5 rounded-xl shadow-solid-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:-translate-y-0.5 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl border-2 border-black overflow-hidden relative shrink-0 shadow-solid-sm bg-[#130728]">
                      <Image
                        src={op.avatar}
                        alt={op.name}
                        fill
                        className="object-cover object-top"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-sm text-white uppercase">
                          {op.name}
                        </h4>
                        <span className="bg-[#b892ff] text-black font-black text-[9px] px-1.5 py-0.2 rounded border border-black uppercase">
                          L{op.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#bccac1] mt-0.5">
                        <span>{op.role}</span>
                        <span>•</span>
                        <span className="text-[#ffb68d] font-bold">
                          🔥 {op.streak}d streak
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border border-black ${
                        op.status === 'online'
                          ? 'bg-[#7ef9c7] text-black'
                          : op.status === 'in-mission'
                          ? 'bg-[#fad02c] text-black'
                          : 'bg-[#130728] text-[#86948c]'
                      }`}
                    >
                      {op.status}
                    </span>
                    <Button
                      variant={op.pinged ? 'ghost' : 'primary'}
                      size="sm"
                      disabled={op.pinged}
                      onClick={() => handlePing(op.id, op.name)}
                    >
                      {op.pinged ? 'PINGED ✓' : 'AETHER PING'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transmission Log / Broadcast (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#201335] border-4 border-black p-5 shadow-solid-lg rounded-2xl space-y-4">
            <div className="border-b-2 border-black/50 pb-3">
              <h3 className="text-xl font-black text-white uppercase tracking-tight font-heading">
                SIGNAL TRANSMISSIONS
              </h3>
              <p className="text-xs text-[#bccac1] font-semibold">
                Live frequency log of tactical completions and intel
              </p>
            </div>

            {/* Broadcast composer */}
            <form onSubmit={handleSendBroadcast} className="space-y-2">
              <input
                type="text"
                value={newBroadcast}
                onChange={(e) => setNewBroadcast(e.target.value)}
                placeholder="Broadcast aether status to network..."
                className="w-full bg-[#130728] border-2 border-black rounded-lg px-3 py-2 text-xs text-white placeholder-[#86948c] focus:outline-none focus:border-[#7ef9c7] shadow-solid-sm"
              />
              <div className="flex justify-end">
                <Button type="submit" variant="secondary" size="sm" withArrow>
                  TRANSMIT
                </Button>
              </div>
            </form>

            {/* Feed items */}
            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {transmissions.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#190c2d] border border-black p-3 rounded-lg space-y-1 shadow-solid-sm"
                >
                  <div className="flex items-center justify-between text-[11px] font-black">
                    <span className="text-[#7ef9c7] uppercase">{t.sender}</span>
                    <span className="text-[#86948c] font-mono">{t.time}</span>
                  </div>
                  <p className="text-xs text-[#ebdcff] font-medium leading-relaxed">
                    {t.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
