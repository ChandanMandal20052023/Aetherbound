'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md bg-[#2b1424] border-pixel-thick border-[#ff5a5a] shadow-solid-lg rounded-2xl p-8 space-y-5">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#3d131f] border-2 border-black flex items-center justify-center text-3xl shadow-solid-sm">
          ⚠️
        </div>
        <div className="space-y-2">
          <span className="bg-[#ff5a5a] text-white font-black text-xs px-3 py-1 rounded border border-black uppercase shadow-solid-sm inline-block">
            CRITICAL DISRUPTION
          </span>
          <h2 className="text-2xl font-black text-[#ffb4ab] uppercase tracking-tight font-heading">
            REALITY MATRIX DESYNC
          </h2>
          <p className="text-xs text-[#bccac1] font-semibold leading-relaxed">
            {error.message ||
              'A critical telemetry fracture occurred while rendering this quadrant.'}
          </p>
        </div>
        <Button variant="danger" size="md" fullWidth onClick={() => reset()}>
          RE-ENGAGE CHRONO PULSE
        </Button>
      </div>
    </div>
  );
}
