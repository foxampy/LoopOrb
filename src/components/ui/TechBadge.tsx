'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TechBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Status indicator */
  status?: 'online' | 'offline' | 'warning' | 'error' | 'neutral';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Enable glow effect */
  glow?: boolean;
  /** Enable animated pulse */
  pulse?: boolean;
  /** Icon before text */
  icon?: React.ReactNode;
  /** Children content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
}

/**
 * TechBadge - HUD-style status badge
 * Futuristic tech aesthetic with glowing elements
 */
export function TechBadge({
  status = 'neutral',
  size = 'md',
  glow = true,
  pulse = false,
  icon,
  children,
  className,
  ...props
}: TechBadgeProps) {
  const statusConfig = {
    online: {
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-400',
      text: 'text-cyan-400',
      dot: 'bg-cyan-400',
      glow: 'shadow-cyan-400/50',
    },
    offline: {
      bg: 'bg-gray-500/20',
      border: 'border-gray-400',
      text: 'text-gray-400',
      dot: 'bg-gray-400',
      glow: 'shadow-gray-400/50',
    },
    warning: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-400',
      text: 'text-yellow-400',
      dot: 'bg-yellow-400',
      glow: 'shadow-yellow-400/50',
    },
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-400',
      text: 'text-red-400',
      dot: 'bg-red-400',
      glow: 'shadow-red-400/50',
    },
    neutral: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-400',
      text: 'text-blue-400',
      dot: 'bg-blue-400',
      glow: 'shadow-blue-400/50',
    },
  };

  const config = statusConfig[status];

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5',
  };

  return (
    <span
      className={cn(
        'tech-badge',
        config.bg,
        config.border,
        config.text,
        sizeClasses[size],
        glow && config.glow,
        glow && 'tech-glow',
        pulse && 'tech-pulse',
        'inline-flex items-center font-mono uppercase tracking-wider',
        'border border-opacity-50',
        'backdrop-blur-sm',
        className
      )}
      {...props}
    >
      <span className={cn('tech-status-dot', config.dot, pulse && 'tech-pulse-dot')} />
      {icon && <span className="tech-icon">{icon}</span>}
      {children}
    </span>
  );
}

/**
 * HUDPanel - Heads-up display panel
 */
interface HUDPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Panel title */
  title?: string;
  /** Enable scanline effect */
  scanlines?: boolean;
  /** Enable corner decorations */
  corners?: boolean;
  /** Status indicator */
  status?: 'active' | 'standby' | 'alert';
  children: React.ReactNode;
  className?: string;
}

export function HUDPanel({
  title,
  scanlines = false,
  corners = true,
  status = 'active',
  children,
  className,
  ...props
}: HUDPanelProps) {
  const statusColors = {
    active: 'text-cyan-400 border-cyan-400',
    standby: 'text-yellow-400 border-yellow-400',
    alert: 'text-red-400 border-red-400',
  };

  return (
    <div
      className={cn(
        'hud-panel',
        scanlines && 'hud-scanlines',
        className
      )}
      {...props}
    >
      {corners && (
        <>
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />
        </>
      )}
      
      {title && (
        <div className={cn('hud-panel-header', statusColors[status])}>
          <span className="font-mono text-sm uppercase tracking-widest">
            {title}
          </span>
          <div className="hud-divider" />
        </div>
      )}
      
      <div className="hud-panel-content">
        {children}
      </div>
    </div>
  );
}

/**
 * DataBar - Progress/data visualization bar
 */
interface DataBarProps {
  /** Current value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Label */
  label?: string;
  /** Show percentage */
  showPercentage?: boolean;
  /** Color variant */
  variant?: 'cyan' | 'purple' | 'green' | 'red' | 'yellow';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Animated fill */
  animated?: boolean;
  className?: string;
}

export function DataBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'cyan',
  size = 'md',
  animated = true,
  className,
}: DataBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variantColors = {
    cyan: 'bg-cyan-400 shadow-cyan-400/50',
    purple: 'bg-purple-400 shadow-purple-400/50',
    green: 'bg-green-400 shadow-green-400/50',
    red: 'bg-red-400 shadow-red-400/50',
    yellow: 'bg-yellow-400 shadow-yellow-400/50',
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('data-bar-container', className)}>
      {(label || showPercentage) && (
        <div className="data-bar-labels flex justify-between mb-1">
          {label && (
            <span className="text-xs font-mono text-cyan-400 uppercase">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-xs font-mono text-cyan-400">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'data-bar',
          sizeClasses[size],
          'bg-gray-800/50 border border-cyan-400/30 rounded-sm overflow-hidden'
        )}
      >
        <div
          className={cn(
            'data-bar-fill h-full',
            variantColors[variant],
            animated && 'data-bar-animated',
            'shadow-lg'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/**
 * TechDivider - Futuristic divider with decorations
 */
interface TechDividerProps {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Style */
  variant?: 'simple' | 'double' | 'dotted' | 'tech';
  className?: string;
}

export function TechDivider({
  orientation = 'horizontal',
  variant = 'tech',
  className,
}: TechDividerProps) {
  const variants = {
    simple: 'tech-divider-simple',
    double: 'tech-divider-double',
    dotted: 'tech-divider-dotted',
    tech: 'tech-divider-tech',
  };

  return (
    <div
      className={cn(
        'tech-divider',
        orientation === 'vertical' ? 'tech-divider-vertical' : 'tech-divider-horizontal',
        variants[variant],
        className
      )}
    />
  );
}

export default TechBadge;
