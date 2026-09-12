import type { PlayerProfile } from '@/types/player';

export const authService = {
  async login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      return { ok: false, error: data.error ?? 'Login failed' };
    }
    return { ok: true };
  },

  async register(
    username: string,
    email: string,
    password: string,
    avatarIndex = 1,
  ): Promise<{ ok: boolean; error?: string }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, avatarIndex }),
    });
    if (!res.ok) {
      const data = await res.json();
      return { ok: false, error: data.error ?? 'Registration failed' };
    }
    return { ok: true };
  },

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
  },

  async getCurrentUser(): Promise<PlayerProfile | null> {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  },
};
