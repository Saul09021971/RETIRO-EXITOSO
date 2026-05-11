import sys
from PIL import Image
import collections

input_path = sys.argv[1]
output_path = sys.argv[2]

img = Image.open(input_path).convert("RGBA")
datas = img.getdata()

new_data = []
colors = []

for item in datas:
    # item is (R, G, B, A)
    r, g, b, a = item
    
    # Exclude near black from color palette analysis
    if r > 20 or g > 20 or b > 20:
        colors.append((r, g, b))
        
    # Remove black background with anti-aliasing handling
    # The text has a white outline. The transition from white to black is gray.
    # We want to keep the white/gray but make it transparent if it's very dark.
    # But wait, it's a white stroke! So white should be fully opaque.
    # Black is (0,0,0). So the alpha can just be the max of RGB if we assume black background.
    # Since it's a white border on black background, the border pixels are just dimmed white (gray).
    # Setting alpha = max(R,G,B) works perfectly for white-on-black text!
    # Wait, the inner text is blue. If we set alpha to max(R,G,B), the blue will become semi-transparent.
    # Better approach: If the pixel is very dark (r<20, g<20, b<20), make it transparent, but smooth it.
    brightness = (r + g + b) / 3
    if brightness < 15:
        # smooth transition for very dark pixels
        alpha = int(brightness * (255/15))
        new_data.append((r, g, b, alpha))
    else:
        new_data.append((r, g, b, 255))

img.putdata(new_data)
img.save(output_path, "PNG")

# Find most common colors
counter = collections.Counter(colors)
common = counter.most_common(50)

# Filter out white/gray colors to find the blues
blues = []
for color, count in common:
    r, g, b = color
    # Blueish colors: B should be prominent, and not just white/gray
    if b > r + 10 and b > g + 10 and r < 200 and g < 200:
        blues.append(color)

print("Prominent blueish colors:")
for b in blues[:5]:
    hex_color = "#{:02x}{:02x}{:02x}".format(b[0], b[1], b[2])
    print(hex_color)
