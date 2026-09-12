import React from 'react';
import { cn, formatXP, xpPercent } from '@/lib/utils';

interface XPBarProps {
  current: number;
  total: number;
  label?: string;
  level?: number;
  className?: string;
  showPercent?: boolean;
}

export function XPBar({
  current,
  total,
  label = 'XP PROGRESS',
  level,
  className,
  showPercent = true,
}: XPBarProps) {
  const percent = Math.min(100, Math.max(0, xpPercent(current, total)));

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
        <div className="flex items-center gap-2">
          {level !== undefined && (
            <span className="bg-[#7ef9c7] text-black px-2 py-0.5 rounded border border-black shadow-solid-sm">
              LVL {level}
            </span>
          )}
          <span className="text-[#ebdcff]">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#bccac1] font-mono text-[11px]">
            {formatXP(current, total)}
          </span>
          {showPercent && (
            <span className="text-[#7ef9c7] font-black">+{percent}%</span>
          )}
        </div>
      </div>

      {/* Bar container */}
      <div className="h-5 w-full bg-[#130728] border-[3px] border-black rounded-full overflow-hidden p-0.5 shadow-solid-sm">
        <div
          className="h-full bg-[#7ef9c7] bg-stripes-mint rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
