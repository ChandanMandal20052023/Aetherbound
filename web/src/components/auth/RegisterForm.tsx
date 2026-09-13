'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { authService } from '@/services/auth.service';

export function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [classChoice, setClassChoice] = useState<'scout' | 'knight' | 'alchemist'>('scout');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await authService.register(username, email, password);
    setLoading(false);

    if (result.ok) {
      router.push('/dashboard');
      router.refresh();
    } else {
      setError(result.error ?? 'Registration failed');
    }
  };

  return (
    <div className="w-full max-w-md bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#130728] border-3 border-black shadow-solid relative overflow-hidden mb-1">
          <Image
            src="/avatars/Rise.jpg"
            alt="Aetherbound Logo"
            fill
            className="object-cover"
            priority
            sizes="64px"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white font-heading">
          INITIALIZE SAGA
        </h2>
        <p className="text-xs sm:text-sm text-[#bccac1] font-semibold">
          Forge your player codex and begin cycle 3
        </p>
      </div>

      {error && (
        <div className="bg-[#ff5a5a]/20 border-2 border-[#ff5a5a] text-[#ffb4ab] px-3 py-2 rounded-lg text-xs font-bold shadow-solid-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-extrabold uppercase text-[#ebdcff] tracking-wider block">
            Codename / Hero Handle
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#130728] border-2 border-black rounded-lg px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-[#7ef9c7] shadow-solid-sm"
            placeholder="e.g. Arcane_Striker"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-extrabold uppercase text-[#ebdcff] tracking-wider block">
            Astral Frequency (Email)
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#130728] border-2 border-black rounded-lg px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-[#7ef9c7] shadow-solid-sm"
            placeholder="hero@arcane.net"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-extrabold uppercase text-[#ebdcff] tracking-wider block">
            Cipher Key
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#130728] border-2 border-black rounded-lg pl-4 pr-11 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-[#7ef9c7] shadow-solid-sm"
              placeholder="Minimum 8 runes"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bccac1] hover:text-[#7ef9c7] focus:outline-none transition-colors p-1"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Class Specialization Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold uppercase text-[#ebdcff] tracking-wider block">
            Archetype Discipline
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'scout', label: 'Scout', icon: '🏹' },
              { id: 'knight', label: 'Knight', icon: '🛡️' },
              { id: 'alchemist', label: 'Alchemist', icon: '⚗️' },
            ].map((cls) => (
              <button
                key={cls.id}
                type="button"
                onClick={() => setClassChoice(cls.id as any)}
                className={`p-2 rounded-lg border-2 border-black font-extrabold text-xs flex flex-col items-center gap-1 shadow-solid-sm transition-all ${
                  classChoice === cls.id
                    ? 'bg-[#7ef9c7] text-black -translate-y-0.5'
                    : 'bg-[#25193a] text-white hover:bg-[#302445]'
                }`}
              >
                <span className="text-lg">{cls.icon}</span>
                <span>{cls.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          fullWidth
          withArrow
          disabled={loading}
          className="mt-2"
        >
          {loading ? 'FORGING AVATAR...' : 'AWAKEN SAGA'}
        </Button>
      </form>

      {/* Switch to Login */}
      <div className="text-center pt-2">
        <p className="text-xs text-[#bccac1] font-semibold">
          Already bonded to the Aether?{' '}
          <Link
            href="/login"
            className="text-[#ffb68d] font-extrabold hover:underline"
          >
            Access Portal →
          </Link>
        </p>
      </div>
    </div>
  );
}
