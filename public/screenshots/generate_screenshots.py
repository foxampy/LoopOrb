#!/usr/bin/env python3
"""Generate placeholder screenshots for PWA manifest"""

from PIL import Image, ImageDraw, ImageFont
import os

# Screenshot dimensions
SCREENSHOTS = [
    {"name": "feed.png", "width": 1280, "height": 720, "label": "LoopOrb Feed"},
    {"name": "mobile.png", "width": 750, "height": 1334, "label": "LoopOrb Mobile"}
]

# Colors
BACKGROUND = (10, 22, 40)      # #0a1628
PRIMARY = (14, 165, 233)       # #0ea5e9
ACCENT = (0, 228, 255)         # #00e4ff
TEXT = (255, 255, 255)

def create_screenshot(width, height, label):
    """Create a placeholder screenshot"""
    img = Image.new('RGB', (width, height), BACKGROUND)
    draw = ImageDraw.Draw(img)
    
    # Draw header bar
    header_height = height // 12 if height > width else height // 8
    draw.rectangle([0, 0, width, header_height], fill=(15, 30, 55))
    
    # Draw logo circle in header
    circle_radius = header_height // 3
    circle_x = width // 15
    circle_y = header_height // 2
    draw.ellipse(
        [circle_x - circle_radius, circle_y - circle_radius,
         circle_x + circle_radius, circle_y + circle_radius],
        fill=PRIMARY
    )
    
    # Draw app name
    try:
        font_size = header_height // 3
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    draw.text((circle_x + circle_radius + 15, circle_y - font_size//2), 
              "LoopOrb", fill=TEXT, font=font)
    
    # Draw content cards
    card_margin = width // 20
    card_height = height // 4
    start_y = header_height + card_margin
    
    for i in range(3):
        card_y = start_y + i * (card_height + card_margin)
        if card_y + card_height > height:
            break
            
        # Card background
        draw.rounded_rectangle(
            [card_margin, card_y, width - card_margin, card_y + card_height],
            radius=10,
            fill=(20, 40, 70),
            outline=PRIMARY,
            width=1
        )
        
        # Card content lines
        line_y = card_y + card_height // 4
        line_height = card_height // 6
        
        # Title line
        draw.rounded_rectangle(
            [card_margin + 20, line_y, card_margin + width//3, line_y + line_height],
            radius=3,
            fill=ACCENT
        )
        
        # Content lines
        for j in range(2):
            line_y += line_height + 10
            draw.rounded_rectangle(
                [card_margin + 20, line_y, width - card_margin - 20, line_y + line_height//2],
                radius=2,
                fill=(100, 130, 170)
            )
    
    # Bottom bar for mobile
    if height > width:
        bottom_height = height // 12
        draw.rectangle([0, height - bottom_height, width, height], fill=(15, 30, 55))
    
    return img

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    for screenshot in SCREENSHOTS:
        img = create_screenshot(
            screenshot["width"], 
            screenshot["height"],
            screenshot["label"]
        )
        filepath = os.path.join(script_dir, screenshot["name"])
        img.save(filepath, 'PNG')
        print(f"Created: {screenshot['name']} ({screenshot['width']}x{screenshot['height']})")
    
    print("\nAll screenshots generated successfully!")

if __name__ == '__main__':
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("Installing Pillow...")
        import subprocess
        subprocess.check_call(['pip', 'install', 'Pillow'])
        from PIL import Image, ImageDraw, ImageFont
    
    main()
