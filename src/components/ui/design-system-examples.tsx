/**
 * Design System Usage Examples
 * Looporb Platform - Neumorphism + Retrofuturism + Brutalism
 */

import React from 'react';

// ============================================================================
// EXAMPLE 1: Neumorphic Card with various states
// ============================================================================

export function NeumorphicExample() {
  return (
    <div className="flex flex-col gap-4 p-8">
      {/* Outset card (raised) */}
      <NeumorphicCard variant="outset" size="md">
        <h3>Outset Card (Raised)</h3>
        <p>Default neumorphic style with raised appearance</p>
      </NeumorphicCard>

      {/* Inset card (pressed) */}
      <NeumorphicCard variant="inset" size="md">
        <h3>Inset Card (Pressed)</h3>
        <p>Appears pressed into the surface</p>
      </NeumorphicCard>

      {/* Card with glow */}
      <NeumorphicCard variant="outset" size="lg" glow="cyan">
        <h3>Card with Cyan Glow</h3>
        <p>Perfect for highlighting important content</p>
      </NeumorphicCard>

      {/* Hoverable card */}
      <NeumorphicCard variant="outset" hoverable>
        <h3>Hoverable Card</h3>
        <p>Lifts on hover with floating shadow</p>
      </NeumorphicCard>
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: Neumorphic Buttons
// ============================================================================

export function NeumorphicButtonsExample() {
  return (
    <div className="flex flex-wrap gap-4 p-8">
      <NeumorphicButton size="sm">Small Button</NeumorphicButton>
      <NeumorphicButton size="md">Medium Button</NeumorphicButton>
      <NeumorphicButton size="lg">Large Button</NeumorphicButton>
      
      <NeumorphicButton glow="cyan">Cyan Glow</NeumorphicButton>
      <NeumorphicButton glow="purple">Purple Glow</NeumorphicButton>
      
      <NeumorphicButton variant="inset">Pressed State</NeumorphicButton>
      <NeumorphicButton disabled>Disabled</NeumorphicButton>
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: Retro Grid Background
// ============================================================================

export function RetroBackgroundExample() {
  return (
    <div className="relative h-96 w-full">
      {/* Animated retro grid with perspective */}
      <RetroGrid
        color="cyan"
        gridSize={40}
        perspective
        animated
        opacity={0.3}
      >
        <div className="flex items-center justify-center h-full">
          <h2 className="text-4xl font-bold text-cyan-400">
            Welcome to the Future
          </h2>
        </div>
      </RetroGrid>
      
      {/* Optional scanlines overlay */}
      <Scanlines opacity={0.1} animated />
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Synthwave Scene
// ============================================================================

export function SynthwaveSceneExample() {
  return (
    <div className="relative h-96 w-full overflow-hidden bg-retro-horizon">
      {/* Starfield background */}
      <Starfield count={100} speed="slow" />
      
      {/* Retro sun */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
        <RetroSun size={200} color="orange" />
      </div>
      
      {/* Grid floor */}
      <RetroGrid
        color="purple"
        gridSize={50}
        perspective
        animated
        opacity={0.4}
      />
    </div>
  );
}

// ============================================================================
// EXAMPLE 5: Brutalist Buttons
// ============================================================================

export function BrutalistButtonsExample() {
  return (
    <div className="flex flex-wrap gap-4 p-8">
      <BrutalistButton variant="default">
        Default
      </BrutalistButton>
      
      <BrutalistButton variant="yellow">
        Warning
      </BrutalistButton>
      
      <BrutalistButton variant="red">
        Danger
      </BrutalistButton>
      
      <BrutalistButton variant="blue">
        Action
      </BrutalistButton>
      
      <BrutalistButton variant="mono">
        Monochrome
      </BrutalistButton>
      
      <BrutalistButton shadow={false}>
        No Shadow
      </BrutalistButton>
      
      <BrutalistButton hoverAnimation="skew">
        Skew Hover
      </BrutalistButton>
    </div>
  );
}

// ============================================================================
// EXAMPLE 6: Brutalist Cards & Badges
// ============================================================================

export function BrutalistCardsExample() {
  return (
    <div className="grid grid-cols-2 gap-6 p-8">
      <BrutalistCard variant="yellow" borderSize="md">
        <h3 className="font-mono font-bold text-lg mb-2">
          Important Notice
        </h3>
        <p className="font-mono text-sm">
          This is a brutalist card with bold styling
        </p>
        <div className="mt-4">
          <BrutalistBadge variant="red" size="sm">
            URGENT
          </BrutalistBadge>
        </div>
      </BrutalistCard>
      
      <BrutalistCard variant="mono" borderSize="lg">
        <h3 className="font-mono font-bold text-lg mb-2">
          System Status
        </h3>
        <div className="space-y-2">
          <BrutalistBadge variant="green" size="md">
            ONLINE
          </BrutalistBadge>
          <BrutalistBadge variant="blue" size="md">
            SECURE
          </BrutalistBadge>
        </div>
      </BrutalistCard>
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: HUD Panel with Data Visualization
// ============================================================================

export function HUDPanelExample() {
  return (
    <div className="p-8 max-w-md">
      <HUDPanel
        title="System Monitor"
        status="active"
        scanlines
        corners
      >
        <div className="space-y-4">
          <DataBar
            label="CPU Usage"
            value={75}
            max={100}
            variant="cyan"
            size="md"
            animated
          />
          
          <DataBar
            label="Memory"
            value={60}
            max={100}
            variant="purple"
            size="md"
            animated
          />
          
          <DataBar
            label="Network"
            value={45}
            max={100}
            variant="green"
            size="md"
            animated
          />
          
          <TechDivider variant="tech" />
          
          <div className="flex gap-2">
            <TechBadge status="online" pulse>
              System Online
            </TechBadge>
            <TechBadge status="warning">
              Updates Available
            </TechBadge>
          </div>
        </div>
      </HUDPanel>
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Tech Badges Gallery
// ============================================================================

export function TechBadgesExample() {
  return (
    <div className="flex flex-wrap gap-4 p-8">
      <TechBadge status="online" size="sm">Online</TechBadge>
      <TechBadge status="offline" size="sm">Offline</TechBadge>
      <TechBadge status="warning" size="sm">Warning</TechBadge>
      <TechBadge status="error" size="sm">Error</TechBadge>
      <TechBadge status="neutral" size="sm">Neutral</TechBadge>
      
      <TechBadge status="online" size="md" pulse>
        Pulsing
      </TechBadge>
      
      <TechBadge status="online" size="lg" glow>
        Glowing
      </TechBadge>
    </div>
  );
}

// ============================================================================
// EXAMPLE 9: Mobile-Optimized Layout
// ============================================================================

export function MobileOptimizedExample() {
  return (
    <div className="compact-padding compact-gap">
      {/* Touch-friendly buttons */}
      <div className="flex flex-col gap-4">
        <NeumorphicButton size="md" className="touch-target-comfortable">
          Touch-Friendly Button
        </NeumorphicButton>
        
        <BrutalistButton size="md" className="touch-target-comfortable">
          Brutalist Touch Target
        </BrutalistButton>
      </div>
      
      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NeumorphicCard size="md">
          <h4>Card 1</h4>
        </NeumorphicCard>
        <NeumorphicCard size="md">
          <h4>Card 2</h4>
        </NeumorphicCard>
        <NeumorphicCard size="md">
          <h4>Card 3</h4>
        </NeumorphicCard>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 10: Complete Dashboard Section
// ============================================================================

export function DashboardExample() {
  return (
    <div className="min-h-screen bg-ocean-deep p-8">
      {/* Header with retro grid */}
      <div className="relative h-48 mb-8 rounded-xl overflow-hidden">
        <RetroGrid color="cyan" perspective animated opacity={0.2} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold gradient-text">
            Looporb Dashboard
          </h1>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <NeumorphicCard variant="outset" glow="cyan">
          <div className="text-sm text-gray-400">Total Users</div>
          <div className="text-3xl font-bold text-cyan-400">12,458</div>
          <TechBadge status="online" size="sm" className="mt-2">
            +12% this week
          </TechBadge>
        </NeumorphicCard>
        
        <NeumorphicCard variant="outset" glow="purple">
          <div className="text-sm text-gray-400">Revenue</div>
          <div className="text-3xl font-bold text-purple-400">$45,890</div>
          <TechBadge status="good" size="sm" className="mt-2">
            +8% this week
          </TechBadge>
        </NeumorphicCard>
        
        <BrutalistCard variant="mono" borderSize="sm">
          <div className="text-sm font-mono">System Status</div>
          <div className="text-2xl font-bold font-mono mt-2">ALL SYSTEMS</div>
          <BrutalistBadge variant="green" size="sm" className="mt-2">
            OPERATIONAL
          </BrutalistBadge>
        </BrutalistCard>
      </div>
      
      {/* HUD Panel with metrics */}
      <HUDPanel title="Performance Metrics" status="active" scanlines>
        <div className="space-y-4">
          <DataBar
            label="Server Load"
            value={65}
            variant="cyan"
            animated
          />
          <DataBar
            label="Database Queries"
            value={82}
            variant="purple"
            animated
          />
          <DataBar
            label="Cache Hit Rate"
            value={94}
            variant="green"
            animated
          />
        </div>
      </HUDPanel>
    </div>
  );
}

// ============================================================================
// CSS UTILITIES USAGE (for globals.css classes)
// ============================================================================

/*
// Neumorphic utilities:
<div className="neumorph-base neumorph-outset-md">Raised card</div>
<div className="neumorph-base neumorph-inset-md">Pressed area</div>
<div className="neumorph-glow-cyan">Glowing element</div>
<div className="neumorph-hover-lift">Lifts on hover</div>

// Retro utilities:
<div className="retro-grid-container">
  <div className="retro-grid" />
</div>
<div className="scanlines-overlay">CRT effect</div>

// Brutalist utilities:
<div className="brutal-border">Thick border with shadow</div>
<div className="brutal-shadow">Hard shadow</div>
<button className="brutal-hover-lift">Lift on hover</button>

// HUD utilities:
<div className="hud-panel">
  <div className="hud-corner hud-corner-tl" />
  Content here
</div>
<div className="tech-badge">Tech badge</div>
<div className="data-bar">Progress bar</div>

// Mobile utilities:
<div className="compact-padding">Reduced padding on mobile</div>
<button className="touch-target-comfortable">48px min size</button>
*/
