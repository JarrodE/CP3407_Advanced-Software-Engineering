from PIL import Image, ImageDraw, ImageFont
import os

# Output directory
OUT = os.path.dirname(os.path.abspath(__file__))

def get_font(size):
    try:
        return ImageFont.truetype("arial.ttf", size)
    except:
        return ImageFont.load_default()

TITLE = get_font(18)
HEADING = get_font(14)
BODY = get_font(12)
SMALL = get_font(10)

# Colors
BG = "#FFFFFF"
FRAME = "#333333"
HEADER_BG = "#1a73e8"
HEADER_FG = "#FFFFFF"
LIGHT_BG = "#F5F5F5"
ACCENT = "#FF6B35"
BORDER = "#CCCCCC"
TEXT = "#333333"
MUTED = "#999999"

def draw_phone_frame(draw, w, h):
    draw.rectangle([0, 0, w-1, h-1], outline=FRAME, width=3)

def draw_header(draw, w, title, right_text=None):
    draw.rectangle([0, 0, w, 50], fill=HEADER_BG)
    draw.text((15, 15), title, fill=HEADER_FG, font=TITLE)
    if right_text:
        bbox = draw.textbbox((0,0), right_text, font=SMALL)
        tw = bbox[2] - bbox[0]
        draw.text((w - tw - 15, 20), right_text, fill=HEADER_FG, font=SMALL)

def draw_button(draw, x, y, w, h, text, bg=ACCENT, fg="#FFFFFF"):
    draw.rounded_rectangle([x, y, x+w, y+h], radius=5, fill=bg, outline=bg)
    bbox = draw.textbbox((0,0), text, font=BODY)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((x + (w-tw)//2, y + (h-th)//2), text, fill=fg, font=BODY)

def draw_card(draw, x, y, w, h):
    draw.rounded_rectangle([x, y, x+w, y+h], radius=8, fill=LIGHT_BG, outline=BORDER)

# ========== PAGE 1: HOME ==========
def create_home():
    W, H = 360, 700
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    draw_header(draw, W, "FeedMe", "My Orders")

    # Search bar
    draw.rounded_rectangle([15, 65, W-15, 100], radius=20, fill=LIGHT_BG, outline=BORDER)
    draw.text((30, 74), "Search restaurants...", fill=MUTED, font=BODY)

    # Section heading
    draw.text((15, 115), "Nearby Restaurants", fill=TEXT, font=HEADING)

    # Restaurant cards
    for i, name in enumerate(["Thai Palace", "Burger Hub", "Sushi Master"]):
        cy = 145 + i * 160
        draw_card(draw, 15, cy, W-30, 145)
        # Image placeholder
        draw.rectangle([25, cy+10, 135, cy+100], fill="#E0E0E0", outline=BORDER)
        draw.text((55, cy+48), "[Photo]", fill=MUTED, font=SMALL)
        # Restaurant info
        draw.text((145, cy+15), name, fill=TEXT, font=HEADING)
        draw.text((145, cy+38), "Thai / Asian" if i==0 else "Burgers" if i==1 else "Japanese", fill=MUTED, font=SMALL)
        stars = "Rating: 4." + str(5-i) + " stars"
        draw.text((145, cy+55), stars, fill=ACCENT, font=SMALL)
        draw.text((145, cy+75), "Delivery: 25-35 min", fill=MUTED, font=SMALL)
        draw_button(draw, 225, cy+100, 95, 32, "View Menu")

    # Bottom nav
    draw.rectangle([0, H-55, W, H], fill=LIGHT_BG, outline=BORDER)
    draw.text((40, H-40), "Home", fill=HEADER_BG, font=SMALL)
    draw.text((155, H-40), "Orders", fill=MUTED, font=SMALL)
    draw.text((265, H-40), "Cart (0)", fill=MUTED, font=SMALL)

    draw_phone_frame(draw, W, H)
    img.save(os.path.join(OUT, "wireframe-home.png"))
    print("Created wireframe-home.png")

# ========== PAGE 2: MENU ==========
def create_menu():
    W, H = 360, 700
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    draw_header(draw, W, "Thai Palace", "< Back")

    # Restaurant banner
    draw.rectangle([0, 50, W, 120], fill="#E8E8E8")
    draw.text((15, 70), "Thai Palace - Asian Cuisine", fill=TEXT, font=HEADING)
    draw.text((15, 92), "4.5 stars  |  25-35 min delivery", fill=MUTED, font=SMALL)

    # Menu section
    draw.text((15, 135), "Popular Items", fill=TEXT, font=HEADING)
    draw.line([(15, 155), (W-15, 155)], fill=BORDER, width=1)

    items = [
        ("Pad Thai", "$12.50", "Rice noodles, shrimp, peanuts"),
        ("Green Curry", "$14.00", "Coconut milk, vegetables, rice"),
        ("Spring Rolls (4)", "$8.50", "Crispy rolls with dipping sauce"),
        ("Tom Yum Soup", "$11.00", "Spicy & sour prawn soup"),
        ("Mango Sticky Rice", "$7.50", "Sweet dessert with coconut"),
    ]
    for i, (name, price, desc) in enumerate(items):
        iy = 165 + i * 85
        draw.line([(15, iy+80), (W-15, iy+80)], fill=BORDER, width=1)
        draw.text((15, iy+5), name, fill=TEXT, font=HEADING)
        draw.text((15, iy+25), desc, fill=MUTED, font=SMALL)
        bbox = draw.textbbox((0,0), price, font=HEADING)
        pw = bbox[2]-bbox[0]
        draw.text((W-15-pw, iy+5), price, fill=ACCENT, font=HEADING)
        draw_button(draw, W-105, iy+40, 90, 30, "Add to Cart")

    # Bottom nav
    draw.rectangle([0, H-55, W, H], fill=LIGHT_BG, outline=BORDER)
    draw.text((40, H-40), "Home", fill=MUTED, font=SMALL)
    draw.text((155, H-40), "Orders", fill=MUTED, font=SMALL)
    draw.text((265, H-40), "Cart (0)", fill=MUTED, font=SMALL)

    draw_phone_frame(draw, W, H)
    img.save(os.path.join(OUT, "wireframe-menu.png"))
    print("Created wireframe-menu.png")

# ========== PAGE 3: CART ==========
def create_cart():
    W, H = 360, 700
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    draw_header(draw, W, "Your Cart", "< Back")

    # Cart items
    items = [
        ("Pad Thai", "$12.50", "x1"),
        ("Green Curry", "$14.00", "x2"),
        ("Spring Rolls (4)", "$8.50", "x1"),
    ]
    for i, (name, price, qty) in enumerate(items):
        iy = 65 + i * 90
        draw_card(draw, 15, iy, W-30, 80)
        draw.text((30, iy+10), name, fill=TEXT, font=HEADING)
        draw.text((30, iy+32), price, fill=ACCENT, font=BODY)
        # Quantity controls
        draw.rounded_rectangle([W-140, iy+25, W-110, iy+50], radius=3, fill=LIGHT_BG, outline=BORDER)
        draw.text((W-132, iy+28), "-", fill=TEXT, font=BODY)
        draw.text((W-100, iy+28), qty[1:], fill=TEXT, font=BODY)
        draw.rounded_rectangle([W-80, iy+25, W-50, iy+50], radius=3, fill=LIGHT_BG, outline=BORDER)
        draw.text((W-72, iy+28), "+", fill=TEXT, font=BODY)

    # Divider
    draw.line([(15, 345), (W-15, 345)], fill=BORDER, width=2)

    # Order summary
    draw.text((15, 360), "Order Summary", fill=TEXT, font=HEADING)
    draw.text((15, 385), "Subtotal:", fill=TEXT, font=BODY)
    draw.text((W-80, 385), "$49.00", fill=TEXT, font=BODY)
    draw.text((15, 408), "Delivery Fee:", fill=TEXT, font=BODY)
    draw.text((W-80, 408), "$5.00", fill=TEXT, font=BODY)
    draw.line([(15, 430), (W-15, 430)], fill=BORDER, width=1)
    draw.text((15, 440), "Total:", fill=TEXT, font=HEADING)
    draw.text((W-80, 440), "$54.00", fill=ACCENT, font=HEADING)

    # Checkout button
    draw_button(draw, 15, 480, W-30, 50, "Proceed to Checkout", bg=HEADER_BG)

    # Empty state note
    draw.text((15, 560), "Tip: Swipe left to remove items", fill=MUTED, font=SMALL)

    # Bottom nav
    draw.rectangle([0, H-55, W, H], fill=LIGHT_BG, outline=BORDER)
    draw.text((40, H-40), "Home", fill=MUTED, font=SMALL)
    draw.text((155, H-40), "Orders", fill=MUTED, font=SMALL)
    draw.text((265, H-40), "Cart (3)", fill=HEADER_BG, font=SMALL)

    draw_phone_frame(draw, W, H)
    img.save(os.path.join(OUT, "wireframe-cart.png"))
    print("Created wireframe-cart.png")

# ========== PAGE 4: CHECKOUT ==========
def create_checkout():
    W, H = 360, 700
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    draw_header(draw, W, "Checkout", "< Back")

    y = 65
    # Delivery address section
    draw.text((15, y), "Delivery Address", fill=TEXT, font=HEADING)
    y += 25
    draw.rounded_rectangle([15, y, W-15, y+40], radius=5, fill=LIGHT_BG, outline=BORDER)
    draw.text((25, y+12), "123 Main Street, Townsville QLD 4811", fill=TEXT, font=SMALL)
    y += 55

    # Contact
    draw.text((15, y), "Contact Number", fill=TEXT, font=HEADING)
    y += 25
    draw.rounded_rectangle([15, y, W-15, y+40], radius=5, fill=LIGHT_BG, outline=BORDER)
    draw.text((25, y+12), "+61 4XX XXX XXX", fill=TEXT, font=SMALL)
    y += 55

    # Payment method
    draw.text((15, y), "Payment Method", fill=TEXT, font=HEADING)
    y += 25
    draw_card(draw, 15, y, W-30, 45)
    draw.text((30, y+8), "Cash on Delivery", fill=TEXT, font=BODY)
    draw.ellipse([W-55, y+12, W-35, y+32], outline=HEADER_BG, width=2)
    draw.ellipse([W-51, y+16, W-39, y+28], fill=HEADER_BG)
    y += 55

    draw_card(draw, 15, y, W-30, 45)
    draw.text((30, y+8), "Credit / Debit Card", fill=TEXT, font=BODY)
    draw.ellipse([W-55, y+12, W-35, y+32], outline=BORDER, width=2)
    y += 60

    # Delivery notes
    draw.text((15, y), "Delivery Notes (optional)", fill=TEXT, font=HEADING)
    y += 25
    draw.rounded_rectangle([15, y, W-15, y+60], radius=5, fill=LIGHT_BG, outline=BORDER)
    draw.text((25, y+8), "e.g. Ring doorbell, leave at door", fill=MUTED, font=SMALL)
    y += 75

    # Order total
    draw.line([(15, y), (W-15, y)], fill=BORDER, width=2)
    y += 10
    draw.text((15, y), "Order Total:", fill=TEXT, font=HEADING)
    draw.text((W-80, y), "$54.00", fill=ACCENT, font=HEADING)
    y += 35

    # Place order button
    draw_button(draw, 15, y, W-30, 50, "Place Order", bg="#2ea44f")

    # Bottom nav
    draw.rectangle([0, H-55, W, H], fill=LIGHT_BG, outline=BORDER)
    draw.text((40, H-40), "Home", fill=MUTED, font=SMALL)
    draw.text((155, H-40), "Orders", fill=MUTED, font=SMALL)
    draw.text((265, H-40), "Cart (3)", fill=HEADER_BG, font=SMALL)

    draw_phone_frame(draw, W, H)
    img.save(os.path.join(OUT, "wireframe-checkout.png"))
    print("Created wireframe-checkout.png")

# Run all
create_home()
create_menu()
create_cart()
create_checkout()
print("All wireframes created!")
