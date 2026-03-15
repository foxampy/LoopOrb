#!/usr/bin/env python3
"""Generate PWA icons for LoopOrb"""

from PIL import Image, ImageDraw
import os

# Icon sizes needed for PWA
SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

# Colors - LoopOrb water theme
BACKGROUND = (10, 22, 40)      # #0a1628 - dark blue
PRIMARY = (14, 165, 233)       # #0ea5e9 - sky blue
ACCENT = (0, 228, 255)         # #00e4ff - cyan

def create_icon(size):
    """Create a water-themed icon with gradient effect"""
    img = Image.new('RGBA', (size, size), BACKGROUND + (255,))
    draw = ImageDraw.Draw(img)
    
    # Calculate proportions
    padding = size // 8
    center = size // 2
    
    # Draw water drop shape (simplified as circle with gradient effect)
    # Outer glow ring
    outer_radius = (size - padding * 2) // 2
    for i in range(5, 0, -1):
        alpha = int(50 * (6 - i) / 5)
        glow_color = PRIMARY + (alpha,)
        draw.ellipse(
            [center - outer_radius - i, center - outer_radius - i,
             center + outer_radius + i, center + outer_radius + i],
            fill=glow_color
        )
    
    # Main circle
    main_radius = outer_radius - 2
    draw.ellipse(
        [center - main_radius, center - main_radius,
         center + main_radius, center + main_radius],
        fill=PRIMARY + (255,)
    )
    
    # Inner highlight (gradient effect)
    highlight_radius = main_radius // 2
    highlight_offset = main_radius // 4
    draw.ellipse(
        [center - highlight_radius - highlight_offset, 
         center - highlight_radius - highlight_offset,
         center + highlight_radius - highlight_offset, 
         center + highlight_radius - highlight_offset],
        fill=ACCENT + (180,)
    )
    
    # Center dot
    dot_radius = main_radius // 5
    draw.ellipse(
        [center - dot_radius, center - dot_radius,
         center + dot_radius, center + dot_radius],
        fill=(255, 255, 255, 230)
    )
    
    return img

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    for size in SIZES:
        icon = create_icon(size)
        filename = f"icon-{size}x{size}.png"
        filepath = os.path.join(script_dir, filename)
        icon.save(filepath, 'PNG')
        print(f"Created: {filename}")
    
    # Create shortcut icons
    shortcuts = ['feed.png', 'wallet.png', 'projects.png']
    for shortcut in shortcuts:
        icon = create_icon(96)
        filepath = os.path.join(script_dir, shortcut)
        icon.save(filepath, 'PNG')
        print(f"Created: {shortcut}")
    
    print("\nAll icons generated successfully!")

if __name__ == '__main__':
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        print("Installing Pillow...")
        import subprocess
        subprocess.check_call(['pip', 'install', 'Pillow'])
        from PIL import Image, ImageDraw
    
    main()
