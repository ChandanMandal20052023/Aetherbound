import React from 'react';
import { cn } from '@/lib/utils';
import type { Rarity } from '@/types/player';

interface RarityBadgeProps {
  rarity: Rarity | 'trivial';
  className?: string;
  size?: 'sm' | 'md';
}

export function RarityBadge({ rarity, className, size = 'sm' }: RarityBadgeProps) {
  const styles: Record<string, string> = {
    trivial: 'bg-[#94a3b8] text-black',
    common: 'bg-[#88dfbc] text-black',
    rare: 'bg-[#70c5ff] text-black',
    epic: 'bg-[#b892ff] text-black',
    legendary: 'bg-[#fad02c] text-black',
  };

  const textStyle = styles[rarity] || styles.common;

  return (
    <span
      className={cn(
        'inline-flex items-center uppercase font-black tracking-widest border-2 border-black shadow-solid-sm rounded px-2 py-0.5',
        size === 'sm' ? 'text-[10px]' : 'text-xs',
        textStyle,
        className
      )}
    >
      {rarity}
    </span>
  );
}
