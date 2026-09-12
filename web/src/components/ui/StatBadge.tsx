import React from 'react';
import { cn } from '@/lib/utils';

interface StatBadgeProps {
  label: string;
  icon?: string;
  className?: string;
}

export function StatBadge({ label, icon, className }: StatBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1c122f] border-2 border-black rounded shadow-solid-sm text-xs font-bold text-[#ebdcff]',
        className
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </span>
  );
}
