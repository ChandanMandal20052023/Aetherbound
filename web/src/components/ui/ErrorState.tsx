import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Dimensional Rift Detected',
  message = 'An unexpected reality distortion occurred. Realign the aether pulse.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center bg-[#2b1424] border-[3px] border-[#ff5a5a] rounded-xl shadow-solid text-white',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-[#3d131f] border-2 border-black flex items-center justify-center text-3xl mb-4 shadow-solid-sm">
        ⚠️
      </div>
      <h3 className="text-xl font-black uppercase tracking-wider mb-2 text-[#ffb4ab]">
        {title}
      </h3>
      <p className="text-sm text-[#bccac1] max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button variant="danger" size="md" onClick={onRetry}>
          Re-establish Connection
        </Button>
      )}
    </div>
  );
}
