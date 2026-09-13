'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SpinningLaunchButton } from './SpinningLaunchButton';

export function LandingPage() {
  const [questResolved, setQuestResolved] = useState(false);
  const [xp, setXp] = useState(2840);
  const totalXp = 4200;

  const handleResolvePreviewQuest = () => {
    if (!questResolved) {
      setQuestResolved(true);
      setXp((prev) => Math.min(totalXp, prev + 300));
    }
  };

  const xpPercent = Math.round((xp / totalXp) * 100);

  return (
    <div className="bg-[#190c2d] text-[#ebdcff] font-sans min-h-screen selection:bg-[#7ef9c7] selection:text-[#002115] overflow-x-hidden">
      {/* TOP APP BAR */}
      <header className="w-full bg-[#211536] border-b-4 border-[#130728] sticky top-0 z-50 shadow-[0_4px_0px_#000000]">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo Cluster */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg border-2 border-black overflow-hidden relative shadow-[2px_2px_0px_#000000] group-hover:rotate-6 transition-transform bg-[#130728] shrink-0">
              <Image
                src="/avatars/Rise.jpg"
                alt="Aetherbound Logo"
                fill
                className="object-cover"
                priority
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg tracking-wider text-[#7ef9c7] drop-shadow-[2px_2px_0px_#000000] leading-none uppercase">
                AETHERBOUND
              </span>
              <span className="text-[10px] font-black tracking-widest text-[#ffb68d] uppercase mt-0.5">
                LIFE RPG SYSTEM
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-[#bccac1] hover:text-white font-bold text-sm tracking-wider uppercase transition-colors"
              href="#features"
            >
              FEATURES
            </a>
            <a
              className="text-[#bccac1] hover:text-white font-bold text-sm tracking-wider uppercase transition-colors"
              href="#how-it-works"
            >
              HOW IT WORKS
            </a>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#3b2f51] border-2 border-black rounded text-[11px] font-black text-[#7ef9c7] shadow-[2px_2px_0px_#000000] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#7ef9c7] animate-ping" />
              SERVER: NA-01
            </span>
          </nav>

          {/* Trailing CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-1.5 bg-[#302445] text-white border-2 md:border-[3px] border-black rounded font-black text-xs uppercase shadow-[2px_2px_0px_#000000] neo-btn hover:text-[#7ef9c7]"
            >
              LOGIN
            </Link>
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 bg-[#7ef9c7] text-[#002115] border-2 md:border-[3px] border-black rounded font-black text-xs uppercase shadow-[3px_3px_0px_#000000] neo-btn"
            >
              JOIN SAGA →
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN HERO CANVAS */}
      <main className="w-full max-w-[1360px] mx-auto px-4 md:px-8 pt-8 md:pt-14 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* HERO LEFT COLUMN: Pitch, Headlines, CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start gap-4">
            {/* Social Proof Tape Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3b2f51] border-[3px] border-black rounded-lg neo-shadow-sm -rotate-1">
              <span className="text-sm">⭐</span>
              <span className="font-black text-xs text-white uppercase tracking-wider">
                42,000+ Active Adventurers
              </span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#7ef9c7] drop-shadow-[3px_3px_0px_#000000] leading-tight uppercase">
              Level Up Your <br className="hidden sm:inline" />
              Real Life.
            </h1>

            {/* Supporting Narrative Subtitle */}
            <p className="text-sm sm:text-base text-[#bccac1] font-medium max-w-xl leading-relaxed">
              Transform your tedious daily habits, work sprints, and fitness
              goals into high-stakes RPG quests. Gain tangible XP, collect rare
              digital relics, and conquer real-world burnout with tactile
              anime-arcade mechanics.
            </p>

            {/* CTA Cluster */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <SpinningLaunchButton
                href="/login"
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-[#7ef9c7] hover:bg-[#68e8b4] text-[#002115] font-black text-sm border-[3px] border-black rounded-lg neo-shadow-md neo-btn tracking-wider uppercase select-none"
              >
                <span>LAUNCH SYSTEM</span>
                <span className="text-base font-mono font-bold">→</span>
              </SpinningLaunchButton>
              <SpinningLaunchButton
                href="/register"
                initialDelayMs={1400}
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-[#ffb68d] hover:bg-[#ffa170] text-[#331200] font-black text-sm border-[3px] border-black rounded-lg neo-shadow-md neo-btn tracking-wider uppercase select-none"
              >
                <span>AWAKEN AVATAR</span>
                <span className="text-base">⚔️</span>
              </SpinningLaunchButton>
            </div>

            {/* Ticker / Benefit Micro Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[#bccac1]">
              <div className="flex items-center gap-1 text-xs font-bold">
                <span className="text-[#7ef9c7]">✓</span>
                <span>Free Core Tier</span>
              </div>
              <span className="text-[#3b2f51]">•</span>
              <div className="flex items-center gap-1 text-xs font-bold">
                <span className="text-[#7ef9c7]">🔄</span>
                <span>Cross-Platform Cloud</span>
              </div>
              <span className="text-[#3b2f51]">•</span>
              <div className="flex items-center gap-1 text-xs font-bold">
                <span className="text-[#7ef9c7]">🛡️</span>
                <span>Zero Dopamine Burnout</span>
              </div>
            </div>
          </div>

          {/* HERO RIGHT COLUMN: Tactical Dashboard Preview */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            {/* Background decorative decal box */}
            <div className="absolute inset-0 bg-[#302445] rounded-xl border-[4px] border-black translate-x-2 translate-y-2 -z-10 neo-shadow-lg" />

            {/* Character Dashboard Preview Card */}
            <div className="bg-[#25193a] border-[4px] border-black rounded-xl p-5 md:p-6 relative overflow-visible neo-shadow-md">
              {/* Top Floating Tape Decal Badge */}
              <div className="absolute -top-3.5 left-4 px-3 py-1 bg-[#ffb68d] text-[#331200] border-[3px] border-black rounded font-black text-xs uppercase shadow-[2px_2px_0px_#000000] -rotate-1 z-10">
                CHARACTER DASHBOARD • LEVEL 12
              </div>

              {/* Hero Avatar & Identity Cluster */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 pb-4 border-b-[3px] border-black">
                {/* Avatar Frame with glowing mint status ring */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-black bg-[#130728] p-1 shadow-[3px_3px_0px_#000000] ring-4 ring-[#7ef9c7] relative overflow-hidden">
                    <Image
                      src="/avatars/Avatar-1.jpg"
                      alt="Character Avatar"
                      fill
                      className="object-cover object-top rounded-full"
                      sizes="96px"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#7ef9c7] text-[#002115] font-black text-[10px] px-2 py-0.5 border-2 border-black rounded shadow-[1px_1px_0px_#000000]">
                    LVL 12
                  </div>
                </div>

                {/* Identity & Progression Bar */}
                <div className="w-full flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h2 className="font-heading font-black text-xl text-white leading-none uppercase">
                        Kaelen Vance
                      </h2>
                      <p className="font-black text-[11px] text-[#7ef9c7] uppercase tracking-wider mt-1">
                        RANK: ARCANE TRAILBLAZER
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-[#130728] border-2 border-black rounded font-black text-[10px] text-[#ffb68d] uppercase">
                      SEASON 3
                    </span>
                  </div>

                  {/* XP Bar Module */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs font-black mb-1 text-[#bccac1]">
                      <span>
                        XP • {xp.toLocaleString()} / {totalXp.toLocaleString()}
                      </span>
                      <span className="text-[#7ef9c7] font-bold">
                        +{xpPercent}%
                      </span>
                    </div>
                    <div className="w-full h-4 bg-[#130728] border-[3px] border-black rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-[#7ef9c7] bg-stripes-mint rounded-full border-r-2 border-black transition-all duration-500"
                        style={{ width: `${xpPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Quests In-Progress List */}
              <div className="space-y-3 mt-4">
                {/* Quest Row 1: Epic Boss Task */}
                <div className="bg-[#211536] border-[3px] border-black rounded-lg p-3 neo-shadow-sm hover:translate-x-0.5 transition-transform">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-[#ffb68d] text-[#331200] border-2 border-black flex items-center justify-center font-bold text-sm shrink-0">
                        ⚔️
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-heading font-black text-sm text-white uppercase">
                            Defeat Email Hydra
                          </span>
                          <span className="px-1.5 py-0.2 bg-[#ff5a5a] text-white font-black text-[9px] border border-black rounded uppercase">
                            EPIC BOSS
                          </span>
                        </div>
                        <p className="text-xs text-[#bccac1] font-medium">
                          Inbox Zero Sprint (3/5 heads cleared)
                        </p>
                      </div>
                    </div>
                    <span className="font-black text-xs text-[#7ef9c7] px-2 py-1 bg-[#130728] border border-black rounded shrink-0">
                      +300 XP
                    </span>
                  </div>
                  {/* Progress mini bar */}
                  <div className="w-full h-2 bg-[#130728] border border-black rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-[#ffb68d] rounded-full"
                      style={{ width: '60%' }}
                    />
                  </div>
                </div>

                {/* Quest Row 2: Side Quest with Live Interactivity */}
                <div className="bg-[#211536] border-[3px] border-black rounded-lg p-3 neo-shadow-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-[#7ef9c7] text-[#002115] border-2 border-black flex items-center justify-center font-bold text-sm shrink-0">
                      🧪
                    </div>
                    <div>
                      <span className="font-heading font-black text-sm text-white block uppercase">
                        Brew Focus Potion
                      </span>
                      <span className="text-xs text-[#7ef9c7] font-semibold">
                        {questResolved
                          ? 'Claimed! +300 XP awarded'
                          : '45m Deep Work Session • Ready to claim'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResolvePreviewQuest}
                    disabled={questResolved}
                    className={`px-3 py-1.5 rounded font-black text-xs uppercase shadow-solid-sm transition-all ${questResolved
                      ? 'bg-[#88dfbc] text-black border border-black cursor-default'
                      : 'bg-[#7ef9c7] hover:bg-[#68e8b4] text-[#002115] border-2 border-black neo-btn-sm'
                      }`}
                  >
                    {questResolved ? 'RESOLVED ✓' : 'RESOLVE ✓'}
                  </button>
                </div>
              </div>

              {/* Bottom Tactical Stat Chips */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t-2 border-[#302445]">
                <div className="bg-[#130728] border-2 border-black rounded p-1.5 text-center shadow-[2px_2px_0px_#000000]">
                  <span className="text-[10px] font-black text-[#bccac1] block uppercase">
                    FOCUS
                  </span>
                  <span className="font-black text-xs text-[#7ef9c7]">94%</span>
                </div>
                <div className="bg-[#130728] border-2 border-black rounded p-1.5 text-center shadow-[2px_2px_0px_#000000]">
                  <span className="text-[10px] font-black text-[#bccac1] block uppercase">
                    STREAK
                  </span>
                  <span className="font-black text-xs text-[#ffb68d]">
                    🔥 14 DAYS
                  </span>
                </div>
                <div className="bg-[#130728] border-2 border-black rounded p-1.5 text-center shadow-[2px_2px_0px_#000000]">
                  <span className="text-[10px] font-black text-[#bccac1] block uppercase">
                    GOLD
                  </span>
                  <span className="font-black text-xs text-[#fad02c]">
                    14,250 G
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FEATURE CARDS SECTION (3-COLUMN BENTO) */}
      <section
        className="w-full max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16"
        id="features"
      >
        {/* Section Header Badge */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block px-3 py-1 bg-[#3b2f51] border-[3px] border-black rounded-lg neo-shadow-sm rotate-1 mb-3">
            <span className="font-black text-xs text-[#7ef9c7] uppercase tracking-widest">
              CORE PROTOCOLS & MECHANICS
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-[2px_2px_0px_#000000] uppercase">
            Engineered For Real-Life Progression
          </h2>
          <p className="text-sm sm:text-base text-[#bccac1] font-medium max-w-xl mt-2 leading-relaxed">
            No boring checklists. Your everyday actions become quests, your effort earns
            rewards, and every choice unlocks the next journey.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Card 1: Quests */}
          <div className="bg-[#25193a] border-[4px] border-black rounded-xl p-6 neo-shadow-md relative hover:-translate-y-1 transition-transform">
            <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-[#7ef9c7] text-[#002115] border-2 border-black rounded font-black text-[10px] uppercase shadow-[2px_2px_0px_#000000]">
              MODULE 01
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#211536] border-[3px] border-black flex items-center justify-center neo-shadow-sm mb-4 text-2xl">
              ⚔️
            </div>
            <h3 className="font-heading font-black text-xl text-[#7ef9c7] mb-2 uppercase drop-shadow-[1px_1px_0px_#000000]">
              Quests
            </h3>
            <p className="text-xs sm:text-sm text-[#bccac1] font-medium leading-relaxed">
              Turn real tasks into daily, weekly, and epic boss-level objectives
              with quantifiable rewards. Break major milestones into digestible
              battle stages.
            </p>
            <div className="mt-6 pt-4 border-t-2 border-[#302445] flex items-center justify-between text-xs font-black text-[#ffb68d] uppercase">
              <span>XP REWARD SYSTEM</span>
              <span>TIER: S-RANK</span>
            </div>
          </div>

          {/* Feature Card 2: Skills */}
          <div className="bg-[#25193a] border-[4px] border-black rounded-xl p-6 neo-shadow-md relative hover:-translate-y-1 transition-transform">
            <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-[#ffb68d] text-[#331200] border-2 border-black rounded font-black text-[10px] uppercase shadow-[2px_2px_0px_#000000]">
              MODULE 02
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#211536] border-[3px] border-black flex items-center justify-center neo-shadow-sm mb-4 text-2xl">
              ⚡
            </div>
            <h3 className="font-heading font-black text-xl text-[#ffb68d] mb-2 uppercase drop-shadow-[1px_1px_0px_#000000]">
              Skills
            </h3>
            <p className="text-xs sm:text-sm text-[#bccac1] font-medium leading-relaxed">
              Level real-life attributes like Focus, Fitness, and Learning as
              your personal stats grow. Allocate attribute points and unlock
              legendary title decors.
            </p>
            <div className="mt-6 pt-4 border-t-2 border-[#302445] flex items-center justify-between text-xs font-black text-[#7ef9c7] uppercase">
              <span>ATTRIBUTE MATRIX</span>
              <span>STAT TREE v2</span>
            </div>
          </div>

          {/* Feature Card 3: Momentum Streak */}
          <div className="bg-[#25193a] border-[4px] border-black rounded-xl p-6 neo-shadow-md relative hover:-translate-y-1 transition-transform">
            <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-[#b892ff] text-[#260059] border-2 border-black rounded font-black text-[10px] uppercase shadow-[2px_2px_0px_#000000]">
              MODULE 03
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#211536] border-[3px] border-black flex items-center justify-center neo-shadow-sm mb-4 text-2xl">
              🔥
            </div>
            <h3 className="font-heading font-black text-xl text-[#b892ff] mb-2 uppercase drop-shadow-[1px_1px_0px_#000000]">
              Momentum Streak
            </h3>
            <p className="text-xs sm:text-sm text-[#bccac1] font-medium leading-relaxed">
              Build consistent streaks with XP multipliers and unlock cosmic
              rewards without burnout. Protected streak shield tokens keep life
              flexible.
            </p>
            <div className="mt-6 pt-4 border-t-2 border-[#302445] flex items-center justify-between text-xs font-black text-white uppercase">
              <span>STREAK MULTIPLIER</span>
              <span>SAFE-SHIELD ON</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS MINI-BREAKDOWN */}
      <section
        className="w-full max-w-[1360px] mx-auto px-4 md:px-8 py-10"
        id="how-it-works"
      >
        <div className="bg-[#211536] border-[4px] border-black rounded-2xl p-6 md:p-10 neo-shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="w-8 h-8 rounded bg-[#7ef9c7] text-[#002115] border-2 border-black flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_#000000]">
                01
              </span>
              <h4 className="font-heading font-black text-base text-white uppercase">
                Define Real Tasks
              </h4>
              <p className="text-xs sm:text-sm text-[#bccac1] font-medium">
                Input workouts, code reviews, writing sprints, or chores as
                categorized guild quests.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="w-8 h-8 rounded bg-[#ffb68d] text-[#331200] border-2 border-black flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_#000000]">
                02
              </span>
              <h4 className="font-heading font-black text-base text-white uppercase">
                Execute & Earn Gold
              </h4>
              <p className="text-xs sm:text-sm text-[#bccac1] font-medium">
                Slay task blocks with focused work sessions. Watch your XP
                gauge surge in real time.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="w-8 h-8 rounded bg-[#b892ff] text-[#260059] border-2 border-black flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_#000000]">
                03
              </span>
              <h4 className="font-heading font-black text-base text-white uppercase">
                Upgrade Your Reality
              </h4>
              <p className="text-xs sm:text-sm text-[#bccac1] font-medium">
                Redeem gold for self-reward tokens, equip cosmetic avatar armor,
                and achieve mastery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CALL TO ACTION SECTION */}
      <section
        className="w-full max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-20"
        id="cta-section"
      >
        <div className="bg-[#25193a] border-[4px] border-black rounded-2xl p-8 md:p-14 text-center neo-shadow-xl relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#7ef9c7] opacity-10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#ffb68d] opacity-10 rounded-full blur-2xl pointer-events-none" />

          {/* Centered content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
            <div className="px-3 py-1 bg-[#3b2f51] border-2 border-black rounded font-black text-xs text-[#7ef9c7] uppercase shadow-[2px_2px_0px_#000000]">
              SEASON 3 ENLISTMENT OPEN
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#7ef9c7] drop-shadow-[3px_3px_0px_#000000] uppercase">
              Begin Your Saga
            </h2>
            <p className="text-sm sm:text-base text-[#bccac1] font-medium leading-relaxed">
              Your journey from distracted wanderer to disciplined hero starts
              with a single tap. Zero subscription paywalls to start. Join
              42,000+ players today.
            </p>
            <div className="pt-2 w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <SpinningLaunchButton
                href="/login"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#7ef9c7] hover:bg-[#68e8b4] text-[#002115] border-[3px] border-black rounded-xl font-black text-sm neo-shadow-lg neo-btn uppercase tracking-wider flex items-center justify-center gap-2 select-none"
              >
                <span>LAUNCH SYSTEM →</span>
              </SpinningLaunchButton>
              <SpinningLaunchButton
                href="/register"
                initialDelayMs={1400}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#ffb68d] hover:bg-[#ffa170] text-[#331200] border-[3px] border-black rounded-xl font-black text-sm neo-shadow-lg neo-btn uppercase tracking-wider flex items-center justify-center gap-2 select-none"
              >
                <span>AWAKEN AVATAR ⚔️</span>
              </SpinningLaunchButton>
            </div>
            <p className="text-xs text-[#86948c] mt-1 font-bold">
              Instant onboarding • Works in browser, iOS, and Android
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t-4 border-black bg-[#130728] py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Copyright & Engine */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border border-black overflow-hidden relative shrink-0 bg-[#190c2d]">
              <Image
                src="/avatars/Rise.jpg"
                alt="Logo"
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
            <span className="font-heading font-black text-sm text-white uppercase">
              AETHERBOUND
            </span>
          </div>
          <span className="hidden sm:inline text-[#86948c]">•</span>
          <span className="text-xs text-[#bccac1] font-bold">
            © 2025 AETHERBOUND SYSTEM • V.2.0.4 ARCANE ENGINE
          </span>
        </div>

        {/* Right Policy & Guild Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/dashboard"
            className="text-xs text-[#bccac1] hover:text-[#7ef9c7] transition-colors font-black uppercase"
          >
            ENTER APP
          </Link>
          <Link
            href="/login"
            className="text-xs text-[#bccac1] hover:text-[#7ef9c7] transition-colors font-black uppercase"
          >
            PORTAL ACCESS
          </Link>
          <Link
            href="/register"
            className="text-xs text-[#bccac1] hover:text-[#7ef9c7] transition-colors font-black uppercase"
          >
            JOIN SAGA
          </Link>
        </div>
      </footer>
    </div>
  );
}
