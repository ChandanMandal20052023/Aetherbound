'use client';

import React from 'react';
import type { SortOption } from '@/types/shop';

interface ShopBannerProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function ShopBanner({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
}: ShopBannerProps) {
  return (
    <section className="bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-5 sm:p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black/40 pb-5">
        <div>
          <div className="inline-block px-3 py-1 bg-[#fad02c] text-black text-xs font-black rounded border-2 border-black shadow-solid-sm -rotate-1 mb-2 uppercase">
            ★ RESTOCKED CELESTIAL BAZAAR
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase drop-shadow-[2px_2px_0px_#000] font-heading">
            ASTRAL EMPORIUM
          </h1>
          <p className="text-xs sm:text-sm text-[#bccac1] font-semibold mt-1">
            Exchange hard-earned Quest spoils for legendary vessels, relics, and celestial gear.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search emporium..."
              className="w-44 sm:w-56 bg-[#130728] text-white text-xs px-3 py-2 rounded-lg border-2 border-black shadow-solid-sm placeholder-[#86948c] focus:outline-none focus:border-[#7ef9c7]"
            />
          </div>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-[#130728] text-white text-xs font-black px-3 py-2 rounded-lg border-2 border-black shadow-solid-sm focus:outline-none focus:border-[#7ef9c7] cursor-pointer uppercase"
          >
            <option value="rarity-high">Rarity: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="affordable-first">Affordable First</option>
          </select>
        </div>
      </div>
    </section>
  );
}
