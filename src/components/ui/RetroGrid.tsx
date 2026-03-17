'use client';

import React, { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface RetroGridProps {
  /** Grid color */
  color?: 'cyan' | 'purple' | 'pink' | 'white';
  /** Grid size in pixels */
  gridSize?: number;
  /** Enable perspective effect */
  perspective?: boolean;
  /** Enable animation */
  animated?: boolean;
  /** Opacity of grid lines */
  opacity?: number;
  /** Children to render over grid */
  children?: React.ReactNode;
  /** Custom className */
  className?: string;
}

/**
 * RetroGrid - Synthwave-style grid background
 * Perfect for retrofuturistic designs
 */
export function RetroGrid({
  color = 'cyan',
  gridSize = 40,
  perspective = false,
  animated = false,
  opacity = 0.3,
  children,
  className,
}: RetroGridProps) {
  const colorMap = {
    cyan: 'rgba(34, 211, 238,',
    purple: 'rgba(157, 78, 221,',
    pink: 'rgba(255, 107, 107,',
    white: 'rgba(255, 255, 255,',
  };

  const gridColor = colorMap[color];

  const style: CSSProperties = {
    '--grid-size': `${gridSize}px`,
    '--grid-color': gridColor,
    '--grid-opacity': opacity,
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  } as CSSProperties;

  return (
    <div
      className={cn(
        'retro-grid-container',
        perspective && 'retro-grid-perspective',
        animated && 'retro-grid-animated',
        className
      )}
      style={style}
    >
      <div className="retro-grid" />
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Scanlines - CRT monitor effect overlay
 */
interface ScanlinesProps {
  opacity?: number;
  animated?: boolean;
  className?: string;
}

export function Scanlines({
  opacity = 0.1,
  animated = false,
  className,
}: ScanlinesProps) {
  return (
    <div
      className={cn(
        'scanlines-overlay',
        animated && 'scanlines-animated',
        className
      )}
      style={{
        '--scanline-opacity': opacity,
      } as CSSProperties}
    />
  );
}

/**
 * RetroSun - Classic synthwave sun
 */
interface RetroSunProps {
  size?: number;
  color?: 'orange' | 'purple' | 'cyan';
  className?: string;
}

export function RetroSun({
  size = 200,
  color = 'orange',
  className,
}: RetroSunProps) {
  const colorMap = {
    orange: 'from-orange-500 via-red-500 to-purple-600',
    purple: 'from-purple-400 via-pink-500 to-purple-800',
    cyan: 'from-cyan-400 via-blue-500 to-purple-600',
  };

  return (
    <div
      className={cn(
        'retro-sun',
        colorMap[color],
        className
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      <div className="retro-sun-stripes" />
    </div>
  );
}

/**
 * Starfield - Animated star background
 */
interface StarfieldProps {
  count?: number;
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function Starfield({
  count = 100,
  speed = 'slow',
  className,
}: StarfieldProps) {
  const speedMap = {
    slow: '30s',
    medium: '20s',
    fast: '10s',
  };

  // Generate random stars
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div
      className={cn('starfield', className)}
      style={{
        '--star-speed': speedMap[speed],
      } as CSSProperties}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default RetroGrid;
