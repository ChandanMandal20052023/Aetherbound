import React from 'react';
import { cn, formatGold } from '@/lib/utils';

interface CurrencyChipProps {
  type: 'gold' | 'peach';
  amount: number;
  className?: string;
}

export function CurrencyChip({ type, amount, className }: CurrencyChipProps) {
  const isGold = type === 'gold';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-md border-2 border-black shadow-solid-sm font-black text-xs select-none',
        isGold
          ? 'bg-[#fad02c] text-[#3a2c00]'
          : 'bg-[#ffb68d] text-[#4d2200]',
        className
      )}
    >
      <span className="text-sm">{isGold ? '🪙' : '🍑'}</span>
      <span className="font-mono">{formatGold(amount)}</span>
    </div>
  );
}
