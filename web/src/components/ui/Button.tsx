import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'lavender' | 'gold' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  withArrow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      withArrow = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        'bg-[#7ef9c7] text-[#002115] hover:bg-[#68e8b4] border-[#000000]',
      secondary:
        'bg-[#ffb68d] text-[#331200] hover:bg-[#ffa170] border-[#000000]',
      lavender:
        'bg-[#b892ff] text-[#260059] hover:bg-[#a77aff] border-[#000000]',
      gold:
        'bg-[#fad02c] text-[#3a2c00] hover:bg-[#f5c614] border-[#000000]',
      danger:
        'bg-[#ff5a5a] text-white hover:bg-[#f04848] border-[#000000]',
      ghost:
        'bg-[#25193a] text-[#ebdcff] hover:bg-[#302445] border-[#000000]',
      outline:
        'bg-transparent text-[#ebdcff] hover:bg-[#302445]/50 border-[#ebdcff]/40 hover:border-[#7ef9c7]',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs font-extrabold tracking-wider',
      md: 'px-4 py-2 text-sm font-black tracking-wide',
      lg: 'px-6 py-3 text-base font-black tracking-wider',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg uppercase transition-all select-none',
          'border-[3px] shadow-solid btn-press',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {withArrow && <span className="font-mono text-base font-bold">→</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
