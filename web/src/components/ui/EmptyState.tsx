import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  emoji?: string;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  emoji = '📦',
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center bg-[#201335] border-[3px] border-black rounded-xl shadow-solid',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-[#130728] border-2 border-black flex items-center justify-center text-3xl mb-4 shadow-solid-sm">
        {emoji}
      </div>
      <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#bccac1] max-w-md mb-6">{description}</p>
      {actionLabel && (
        <Button variant="primary" size="md" onClick={onAction} withArrow>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
