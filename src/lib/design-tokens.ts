/**
 * Design Tokens for Looporb Platform
 * Neumorphism + Retrofuturism + Brutalism
 */

// ============================================================================
// COLOR PALETTES
// ============================================================================

export const colors = {
  // Ocean palette (base)
  ocean: {
    deep: '#0a1628',
    mid: '#1a3a5c',
    shallow: '#2d5a7b',
    surface: '#162438',
    highlight: '#3b82f6',
  },

  // Neumorphism palette (soft, volumetric)
  neumorph: {
    base: '#1e293b',
    light: '#334155',
    dark: '#0f172a',
    accent: '#22d3ee',
    accentGlow: 'rgba(34, 211, 238, 0.3)',
  },

  // Retro palette (80s synthwave)
  retro: {
    sunset: '#ff6b6b',
    neon: '#f0f',
    cyan: '#0ff',
    purple: '#9d4edd',
    grid: 'rgba(255, 0, 255, 0.2)',
    horizon: '#1a0a2e',
  },

  // Brutalist palette (bold, high contrast)
  brutal: {
    black: '#000000',
    white: '#ffffff',
    yellow: '#fff000',
    red: '#ff0000',
    blue: '#0000ff',
    gray: '#808080',
  },

  // Status colors
  status: {
    good: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  },
};

// ============================================================================
// NEUMORPHIC SHADOWS
// ============================================================================

export const neumorphShadows = {
  // Outset (raised) - light source from top-left
  outset: {
    sm: '2px 2px 4px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.05)',
    md: '4px 4px 8px rgba(0, 0, 0, 0.4), -2px -2px 4px rgba(255, 255, 255, 0.08)',
    lg: '8px 8px 16px rgba(0, 0, 0, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.1)',
    xl: '12px 12px 24px rgba(0, 0, 0, 0.6), -6px -6px 12px rgba(255, 255, 255, 0.12)',
  },

  // Inset (pressed)
  inset: {
    sm: 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -1px -1px 2px rgba(255, 255, 255, 0.05)',
    md: 'inset 4px 4px 8px rgba(0, 0, 0, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.08)',
    lg: 'inset 8px 8px 16px rgba(0, 0, 0, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.1)',
    xl: 'inset 12px 12px 24px rgba(0, 0, 0, 0.6), inset -6px -6px 12px rgba(255, 255, 255, 0.12)',
  },

  // Colored glow shadows
  glow: {
    cyan: '0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)',
    purple: '0 0 20px rgba(157, 78, 221, 0.4), 0 0 40px rgba(157, 78, 221, 0.2)',
    pink: '0 0 20px rgba(255, 107, 107, 0.4), 0 0 40px rgba(255, 107, 107, 0.2)',
    blue: '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)',
  },

  // Floating effect
  float: '0 10px 30px rgba(0, 0, 0, 0.5), 0 -5px 20px rgba(255, 255, 255, 0.05)',
};

// ============================================================================
// GRADIENTS
// ============================================================================

export const gradients = {
  // Ocean gradients
  ocean: {
    vertical: 'linear-gradient(180deg, #0a1628 0%, #1a3a5c 50%, #2d5a7b 100%)',
    horizontal: 'linear-gradient(90deg, #0a1628 0%, #1a3a5c 100%)',
    radial: 'radial-gradient(circle at 50% 50%, #2d5a7b 0%, #0a1628 100%)',
  },

  // Retro synthwave gradients
  retro: {
    sunset: 'linear-gradient(180deg, #1a0a2e 0%, #4a1a5e 50%, #ff6b6b 100%)',
    neon: 'linear-gradient(90deg, #f0f 0%, #0ff 50%, #f0f 100%)',
    cyber: 'linear-gradient(135deg, #9d4edd 0%, #ff6b6b 50%, #0ff 100%)',
    grid: 'linear-gradient(180deg, rgba(255,0,255,0.3) 0%, transparent 100%)',
  },

  // Neumorphic gradients (subtle)
  neumorph: {
    surface: 'linear-gradient(145deg, #334155 0%, #1e293b 100%)',
    pressed: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
    accent: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
  },

  // Brutalist gradients (bold)
  brutal: {
    warning: 'linear-gradient(90deg, #fff000 0%, #ff0000 100%)',
    action: 'linear-gradient(135deg, #0000ff 0%, #ff0000 100%)',
    mono: 'linear-gradient(180deg, #ffffff 0%, #808080 100%)',
  },

  // HUD/Tech gradients
  hud: {
    scanline: 'linear-gradient(180deg, rgba(34, 211, 238, 0.1) 0%, transparent 50%, rgba(34, 211, 238, 0.1) 100%)',
    energy: 'linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.5) 50%, transparent 100%)',
    shield: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(34, 211, 238, 0.3) 100%)',
  },
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
  
  // Retro angles
  retro: '2px 8px 2px 8px',
  brutal: '0',
};

// ============================================================================
// SPACING (for components)
// ============================================================================

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
    retro: '"Press Start 2P", cursive',
    hud: '"Orbitron", sans-serif',
  },
  
  sizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },
};

// ============================================================================
// ANIMATIONS
// ============================================================================

export const animations = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '1000ms',
  },
  
  easings: {
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  keyframes: {
    pulse: `
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    `,
    glow: `
      0% { box-shadow: 0 0 5px rgba(34, 211, 238, 0.5); }
      100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4); }
    `,
    scanline: `
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    `,
    float: `
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    `,
    flicker: `
      0%, 100% { opacity: 1; }
      10% { opacity: 0.8; }
      20% { opacity: 1; }
      30% { opacity: 0.9; }
      40% { opacity: 1; }
      50% { opacity: 0.95; }
      60% { opacity: 1; }
      70% { opacity: 0.9; }
      80% { opacity: 1; }
      90% { opacity: 0.85; }
    `,
  },
};

// ============================================================================
// BREAKPOINTS (mobile-first)
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================================================
// MOBILE OPTIMIZATIONS
// ============================================================================

export const mobile = {
  touchTarget: {
    min: '44px', // WCAG minimum touch target
    comfortable: '48px',
  },
  
  compact: {
    padding: '12px',
    gap: '8px',
    fontSize: '14px',
  },
  
  spacing: {
    xs: '4px',
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
};

// ============================================================================
// CSS CUSTOM PROPERTIES (for globals.css)
// ============================================================================

export const cssVariables = `
:root {
  /* Ocean colors */
  --ocean-deep: ${colors.ocean.deep};
  --ocean-mid: ${colors.ocean.mid};
  --ocean-shallow: ${colors.ocean.shallow};
  --ocean-surface: ${colors.ocean.surface};
  --ocean-highlight: ${colors.ocean.highlight};

  /* Neumorphism colors */
  --neumorph-base: ${colors.neumorph.base};
  --neumorph-light: ${colors.neumorph.light};
  --neumorph-dark: ${colors.neumorph.dark};
  --neumorph-accent: ${colors.neumorph.accent};
  --neumorph-accent-glow: ${colors.neumorph.accentGlow};

  /* Retro colors */
  --retro-sunset: ${colors.retro.sunset};
  --retro-neon: ${colors.retro.neon};
  --retro-cyan: ${colors.retro.cyan};
  --retro-purple: ${colors.retro.purple};
  --retro-grid: ${colors.retro.grid};
  --retro-horizon: ${colors.retro.horizon};

  /* Brutalist colors */
  --brutal-black: ${colors.brutal.black};
  --brutal-white: ${colors.brutal.white};
  --brutal-yellow: ${colors.brutal.yellow};
  --brutal-red: ${colors.brutal.red};
  --brutal-blue: ${colors.brutal.blue};
  --brutal-gray: ${colors.brutal.gray};

  /* Status colors */
  --status-good: ${colors.status.good};
  --status-warning: ${colors.status.warning};
  --status-danger: ${colors.status.danger};
  --status-info: ${colors.status.info};

  /* Neumorphic shadows */
  --shadow-neumorph-outset-sm: ${neumorphShadows.outset.sm};
  --shadow-neumorph-outset-md: ${neumorphShadows.outset.md};
  --shadow-neumorph-outset-lg: ${neumorphShadows.outset.lg};
  --shadow-neumorph-outset-xl: ${neumorphShadows.outset.xl};
  --shadow-neumorph-inset-sm: ${neumorphShadows.inset.sm};
  --shadow-neumorph-inset-md: ${neumorphShadows.inset.md};
  --shadow-neumorph-inset-lg: ${neumorphShadows.inset.lg};
  --shadow-neumorph-inset-xl: ${neumorphShadows.inset.xl};
  --shadow-neumorph-glow-cyan: ${neumorphShadows.glow.cyan};
  --shadow-neumorph-glow-purple: ${neumorphShadows.glow.purple};
  --shadow-neumorph-float: ${neumorphShadows.float};

  /* Gradients */
  --gradient-ocean-vertical: ${gradients.ocean.vertical};
  --gradient-ocean-horizontal: ${gradients.ocean.horizontal};
  --gradient-retro-sunset: ${gradients.retro.sunset};
  --gradient-retro-neon: ${gradients.retro.neon};
  --gradient-retro-cyber: ${gradients.retro.cyber};
  --gradient-neumorph-surface: ${gradients.neumorph.surface};
  --gradient-hud-scanline: ${gradients.hud.scanline};
  --gradient-hud-energy: ${gradients.hud.energy};

  /* Border radius */
  --radius-sm: ${borderRadius.sm};
  --radius-md: ${borderRadius.md};
  --radius-lg: ${borderRadius.lg};
  --radius-xl: ${borderRadius.xl};
  --radius-retro: ${borderRadius.retro};

  /* Typography */
  --font-sans: ${typography.fonts.sans};
  --font-mono: ${typography.fonts.mono};
  --font-hud: ${typography.fonts.hud};

  /* Animations */
  --duration-fast: ${animations.durations.fast};
  --duration-normal: ${animations.durations.normal};
  --duration-slow: ${animations.durations.slow};
  --ease-smooth: ${animations.easings.smooth};
  --ease-bounce: ${animations.easings.bounce};

  /* Mobile */
  --touch-target-min: ${mobile.touchTarget.min};
  --touch-target-comfortable: ${mobile.touchTarget.comfortable};
  --compact-padding: ${mobile.compact.padding};
  --compact-gap: ${mobile.compact.gap};
}
`;

// Export all as single object
export const designTokens = {
  colors,
  neumorphShadows,
  gradients,
  borderRadius,
  spacing,
  typography,
  animations,
  breakpoints,
  mobile,
  cssVariables,
};

export default designTokens;
