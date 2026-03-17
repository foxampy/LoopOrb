'use client';

import React, { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface NeumorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant: outset (raised) or inset (pressed) */
  variant?: 'outset' | 'inset';
  /** Size: sm, md, lg, xl */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Enable glow effect */
  glow?: 'cyan' | 'purple' | 'pink' | 'blue' | false;
  /** Enable hover animation */
  hoverable?: boolean;
  /** Children content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
}

/**
 * NeumorphicCard - Soft, volumetric card component
 * Uses light/shadow to create depth
 */
export function NeumorphicCard({
  variant = 'outset',
  size = 'md',
  glow = false,
  hoverable = false,
  children,
  className,
  ...props
}: NeumorphicCardProps) {
  const shadowSize = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  }[size];

  const glowClass = {
    cyan: 'neumorph-glow-cyan',
    purple: 'neumorph-glow-purple',
    pink: 'neumorph-glow-pink',
    blue: 'neumorph-glow-blue',
    false: '',
  }[glow];

  return (
    <div
      className={cn(
        'neumorph-base',
        variant === 'outset' ? `neumorph-outset-${shadowSize}` : `neumorph-inset-${shadowSize}`,
        glowClass,
        hoverable && 'neumorph-hover-lift',
        'rounded-xl p-4 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * NeumorphicButton - Interactive button with neumorphic styling
 */
interface NeumorphicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outset' | 'inset';
  size?: 'sm' | 'md' | 'lg';
  glow?: 'cyan' | 'purple' | 'pink' | 'blue' | false;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function NeumorphicButton({
  variant = 'outset',
  size = 'md',
  glow = false,
  disabled = false,
  children,
  className,
  ...props
}: NeumorphicButtonProps) {
  const shadowSize = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  }[size];

  const sizeClass = {
    sm: 'px-3 py-2 text-sm min-h-[44px]',
    md: 'px-4 py-3 text-base min-h-[48px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]',
  }[size];

  const glowClass = {
    cyan: 'neumorph-glow-cyan',
    purple: 'neumorph-glow-purple',
    pink: 'neumorph-glow-pink',
    blue: 'neumorph-glow-blue',
    false: '',
  }[glow];

  return (
    <button
      className={cn(
        'neumorph-base',
        variant === 'outset' ? `neumorph-outset-${shadowSize}` : `neumorph-inset-${shadowSize}`,
        glowClass,
        sizeClass,
        'rounded-xl font-medium transition-all duration-200',
        'flex items-center justify-center gap-2',
        'touch-manipulation select-none',
        !disabled && hoverable && 'neumorph-hover-lift',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * NeumorphicInput - Text input with inset styling
 */
interface NeumorphicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export function NeumorphicInput({
  label,
  error,
  className,
  ...props
}: NeumorphicInputProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        className={cn(
          'neumorph-base',
          'neumorph-inset-md',
          'w-full px-4 py-3 rounded-xl',
          'text-white placeholder-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
          'transition-all duration-200',
          'min-h-[48px] touch-manipulation',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-400">{error}</span>
      )}
    </div>
  );
}

export default NeumorphicCard;
