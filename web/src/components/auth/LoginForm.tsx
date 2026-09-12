'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { authService } from '@/services/auth.service';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await authService.login(email, password);
    setLoading(false);

    if (result.ok) {
      router.push('/dashboard');
      router.refresh();
    } else {
      setError(result.error ?? 'Login failed');
    }
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
          <label className="text-xs font-extrabold uppercase text-[#ebdcff] tracking-wider block">
            Cipher Key (Password)
          </label>
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

      {/* Switch to Register */}
      <div className="text-center pt-2">
        <p className="text-xs text-[#bccac1] font-semibold">
          Unregistered in the Aether Codex?{' '}
          <Link href="/register" className="text-[#7ef9c7] font-extrabold hover:underline">
            Initialize Saga →
          </Link>
        </p>
      </div>
    </div>
  );
}
