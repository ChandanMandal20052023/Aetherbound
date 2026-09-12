import React from 'react';
import { cn } from '@/lib/utils';

interface TileBadgeProps {
  children: React.ReactNode;
  variant?: 'mint' | 'peach' | 'lavender' | 'gold' | 'red';
  rotation?: 'left' | 'right' | 'none';
  className?: string;
}

export function TileBadge({
  children,
  variant = 'mint',
  rotation = 'none',
  className,
}: TileBadgeProps) {
  const variantStyles = {
    mint: 'bg-[#7ef9c7] text-[#002115]',
    peach: 'bg-[#ffb68d] text-[#331200]',
    lavender: 'bg-[#b892ff] text-[#260059]',
    gold: 'bg-[#fad02c] text-[#3a2c00]',
    red: 'bg-[#ff5a5a] text-white',
  };

  const rotationStyles = {
    left: '-rotate-2',
    right: 'rotate-2',
    none: 'rotate-0',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 font-black text-xs uppercase tracking-wider',
        'border-2 border-black shadow-solid-sm rounded',
        variantStyles[variant],
        rotationStyles[rotation],
        className
      )}
    >
      {children}
    </div>
  );
}
