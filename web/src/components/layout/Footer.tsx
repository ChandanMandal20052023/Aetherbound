import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t-2 border-black/50 bg-[#160b24]/80 text-xs text-[#bccac1]">
      <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7ef9c7] border border-black animate-pulse" />
          <span className="font-mono text-[#7ef9c7]">AETHERBOUND ENGINE V.2.0.4</span>
          <span className="text-[#86948c]">•</span>
          <span>CYCLE 3 : MOONFALL</span>
        </div>
        <div className="flex items-center gap-6 font-bold uppercase">
          <Link href="/dashboard" className="hover:text-[#7ef9c7] transition-colors">
            Terms of Trial
          </Link>
          <Link href="/dashboard" className="hover:text-[#7ef9c7] transition-colors">
            Aether Code
          </Link>
          <Link href="/login" className="hover:text-[#ffb68d] transition-colors">
            Exit Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
