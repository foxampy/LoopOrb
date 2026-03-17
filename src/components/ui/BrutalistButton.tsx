'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color variant */
  variant?: 'default' | 'yellow' | 'red' | 'blue' | 'mono';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Border thickness */
  borderSize?: 'sm' | 'md' | 'lg';
  /** Enable shadow */
  shadow?: boolean;
  /** Enable hover animation */
  hoverAnimation?: 'lift' | 'press' | 'skew' | 'none';
  /** Icon to display */
  icon?: React.ReactNode;
  /** Children content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
}

/**
 * BrutalistButton - Bold, high-contrast button
 * Raw, unapologetic design with thick borders
 */
export function BrutalistButton({
  variant = 'default',
  size = 'md',
  borderSize = 'md',
  shadow = true,
  hoverAnimation = 'lift',
  icon,
  children,
  className,
  ...props
}: BrutalistButtonProps) {
  const variantClasses = {
    default: 'bg-white text-black border-black hover:bg-gray-200',
    yellow: 'bg-[#fff000] text-black border-black hover:bg-[#ffdd00]',
    red: 'bg-[#ff0000] text-white border-black hover:bg-[#ee0000]',
    blue: 'bg-[#0000ff] text-white border-black hover:bg-[#0000ee]',
    mono: 'bg-black text-white border-white hover:bg-gray-900',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[44px]',
    md: 'px-5 py-3 text-base min-h-[48px]',
    lg: 'px-7 py-4 text-lg font-bold min-h-[56px]',
  };

  const borderClasses = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-[6px]',
  };

  const shadowClass = shadow ? 'brutal-shadow' : '';
  
  const hoverClass = {
    lift: 'brutal-hover-lift',
    press: 'brutal-hover-press',
    skew: 'brutal-hover-skew',
    none: '',
  }[hoverAnimation];

  return (
    <button
      className={cn(
        'brutal-button',
        variantClasses[variant],
        sizeClasses[size],
        borderClasses[borderSize],
        shadowClass,
        hoverClass,
        'font-mono font-bold uppercase tracking-wider',
        'flex items-center justify-center gap-2',
        'transition-all duration-150',
        'touch-manipulation select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        className
      )}
      {...props}
    >
      {icon && <span className="brutal-icon">{icon}</span>}
      {children}
    </button>
  );
}

/**
 * BrutalistCard - Raw, bordered card
 */
interface BrutalistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'yellow' | 'red' | 'blue' | 'mono';
  borderSize?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function BrutalistCard({
  variant = 'default',
  borderSize = 'md',
  shadow = true,
  children,
  className,
  ...props
}: BrutalistCardProps) {
  const variantClasses = {
    default: 'bg-white text-black border-black',
    yellow: 'bg-[#fff000] text-black border-black',
    red: 'bg-[#ff0000] text-white border-black',
    blue: 'bg-[#0000ff] text-white border-black',
    mono: 'bg-black text-white border-white',
  };

  const borderClasses = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-[6px]',
  };

  const shadowClass = shadow ? 'brutal-shadow' : '';

  return (
    <div
      className={cn(
        variantClasses[variant],
        borderClasses[borderSize],
        shadowClass,
        'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * BrutalistBadge - Bold badge/tag
 */
interface BrutalistBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'yellow' | 'red' | 'blue' | 'green';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function BrutalistBadge({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}: BrutalistBadgeProps) {
  const variantClasses = {
    default: 'bg-white text-black border-black',
    yellow: 'bg-[#fff000] text-black border-black',
    red: 'bg-[#ff0000] text-white border-black',
    blue: 'bg-[#0000ff] text-white border-black',
    green: 'bg-[#10b981] text-white border-black',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs border',
    md: 'px-3 py-1.5 text-sm border-2',
    lg: 'px-4 py-2 text-base border-[3px]',
  };

  return (
    <span
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        'font-mono font-bold uppercase',
        'inline-flex items-center gap-1',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * BrutalistInput - Raw text input
 */
interface BrutalistInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'mono';
  className?: string;
}

export function BrutalistInput({
  label,
  error,
  variant = 'default',
  className,
  ...props
}: BrutalistInputProps) {
  const variantClasses = {
    default: 'bg-white text-black border-black placeholder-gray-500',
    mono: 'bg-black text-white border-white placeholder-gray-400',
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="font-mono font-bold uppercase text-sm">
          {label}
        </label>
      )}
      <input
        className={cn(
          variantClasses[variant],
          'border-4',
          'px-4 py-3',
          'font-mono',
          'focus:outline-none focus:ring-4 focus:ring-black/20',
          'transition-all duration-150',
          'min-h-[48px]',
          className
        )}
        {...props}
      />
      {error && (
        <span className="font-mono text-sm text-red-600">{error}</span>
      )}
    </div>
  );
}

export default BrutalistButton;
