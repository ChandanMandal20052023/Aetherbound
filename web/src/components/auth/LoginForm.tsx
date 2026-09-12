'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('trailblazer_01@arcane.net');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate authentication service call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  const handleQuickLogin = (demoUser: string) => {
    setEmail(demoUser);
    setPassword('demopassword123');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div className="w-full max-w-md bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header Emblem & Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#130728] border-3 border-black shadow-solid relative overflow-hidden mb-1">
          <Image
            src="/avatars/Rise.jpg"
            alt="Aetherbound Emblem"
            fill
            className="object-cover"
            priority
            sizes="64px"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white font-heading">
          PORTAL ACCESS
        </h2>
        <p className="text-xs sm:text-sm text-[#bccac1] font-semibold">
          Authenticate your aether essence to resume your saga
        </p>
      </div>

      {error && (
        <div className="bg-[#ff5a5a]/20 border-2 border-[#ff5a5a] text-[#ffb4ab] px-3 py-2 rounded-lg text-xs font-bold shadow-solid-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-extrabold uppercase text-[#ebdcff] tracking-wider block">
            Astral Identity (Email)
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#130728] border-2 border-black rounded-lg px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-[#7ef9c7] focus:ring-1 focus:ring-[#7ef9c7] shadow-solid-sm"
            placeholder="pilot@arcane.net"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold uppercase text-[#ebdcff] tracking-wider block">
              Cipher Key (Password)
            </label>
            <a
              href="#"
              className="text-[11px] font-bold text-[#ffb68d] hover:underline"
              onClick={(e) => {
                e.preventDefault();
                alert('Demo key reset: simply click "ENTER GATEWAY"');
              }}
            >
              Lost Cipher?
            </a>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#130728] border-2 border-black rounded-lg px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-[#7ef9c7] focus:ring-1 focus:ring-[#7ef9c7] shadow-solid-sm"
            placeholder="••••••••••••"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          withArrow
          disabled={loading}
          className="mt-2"
        >
          {loading ? 'AUTHENTICATING...' : 'ENTER GATEWAY'}
        </Button>
      </form>

      {/* Quick Access Presets */}
      <div className="pt-2 border-t-2 border-black/40 space-y-2">
        <span className="text-[10px] font-extrabold uppercase text-[#bccac1] tracking-widest block text-center">
          ⚡ Quick Demo Link
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin('trailblazer_01@arcane.net')}
            className="px-2.5 py-1.5 bg-[#25193a] hover:bg-[#351c5e] border-2 border-black rounded-lg text-xs font-black text-[#7ef9c7] shadow-solid-sm transition-all"
          >
            Trailblazer (L12)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('novice_scout@arcane.net')}
            className="px-2.5 py-1.5 bg-[#25193a] hover:bg-[#351c5e] border-2 border-black rounded-lg text-xs font-black text-[#ffb68d] shadow-solid-sm transition-all"
          >
            Guest Scout (L1)
          </button>
        </div>
      </div>

      {/* Switch to Register */}
      <div className="text-center pt-2">
        <p className="text-xs text-[#bccac1] font-semibold">
          Unregistered in the Aether Codex?{' '}
          <Link
            href="/register"
            className="text-[#7ef9c7] font-extrabold hover:underline"
          >
            Initialize Saga →
          </Link>
        </p>
      </div>
    </div>
  );
}
