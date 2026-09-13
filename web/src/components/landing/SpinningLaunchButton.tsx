'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SpinningLaunchButtonProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  proximityRadius?: number;
  flipIntervalMs?: number;
  initialDelayMs?: number;
}

export function SpinningLaunchButton({
  href = '/login',
  className = '',
  children,
  proximityRadius = 140,
  flipIntervalMs = 2800,
  initialDelayMs = 0,
}: SpinningLaunchButtonProps) {
  const [isNear, setIsNear] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);

  // Periodic 180-degree spin in Y direction when cursor is NOT close
  useEffect(() => {
    if (isNear) {
      return;
    }

    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      setIsFlipped((prev) => !prev);
      interval = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, flipIntervalMs);
    }, initialDelayMs);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [isNear, flipIntervalMs, initialDelayMs]);

  // Proximity detection: check cursor distance to button
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Shortest Euclidean distance from cursor to the button's bounding box
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distance = Math.hypot(dx, dy);

      if (distance < proximityRadius) {
        setIsNear(true);
      } else {
        setIsNear(false);
      }
    };

    const handleMouseLeaveDoc = () => {
      setIsNear(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveDoc);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveDoc);
    };
  }, [proximityRadius]);

  // When cursor is close (isNear === true), stop spinning and smoothly reset to 0deg
  const currentRotation = isNear ? 0 : isFlipped ? 180 : 0;

  return (
    <Link
      ref={containerRef}
      href={href}
      onMouseEnter={() => setIsNear(true)}
      onTouchStart={() => setIsNear(true)}
      className="relative inline-block select-none [perspective:1000px] cursor-pointer group"
      style={{ WebkitPerspective: '1000px' }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: `rotateY(${currentRotation}deg)`,
          transition: 'transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* FRONT FACE (0deg) */}
        <div
          className={`${className} w-full h-full flex items-center justify-center`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {children}
        </div>

        {/* BACK FACE (180deg in Y direction) */}
        <div
          aria-hidden="true"
          className={`${className} absolute inset-0 w-full h-full flex items-center justify-center !pointer-events-none`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}

export const SpinningButton = SpinningLaunchButton;
