import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'mint' | 'peach' | 'lavender' | 'gold' | 'red' | 'cyan' | 'dark';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'mint',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    mint: 'bg-[#7ef9c7] text-[#002115]',
    peach: 'bg-[#ffb68d] text-[#331200]',
    lavender: 'bg-[#b892ff] text-[#260059]',
    gold: 'bg-[#fad02c] text-[#3a2c00]',
    red: 'bg-[#ff5a5a] text-white',
    cyan: 'bg-[#70c5ff] text-[#002b4d]',
    dark: 'bg-[#190f2e] text-[#ebdcff]',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] tracking-wider',
    md: 'px-2.5 py-1 text-xs tracking-wider',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-extrabold uppercase rounded border-2 border-black shadow-solid-sm select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
