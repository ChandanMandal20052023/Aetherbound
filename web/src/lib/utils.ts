import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatGold(amount: number): string {
  return amount.toLocaleString('en-US');
}

export function formatXP(current: number, total: number): string {
  return `${current.toLocaleString()} / ${total.toLocaleString()}`;
}

export function xpPercent(current: number, total: number): number {
  return Math.round((current / total) * 100);
}

export function getAvatarPath(index: number): string {
  return `/avatars/Avatar-${index}.jpg`;
}
