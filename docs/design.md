# Design & Architecture — FeedMe App

## System Architecture

FeedMe is a client-side web application for food delivery ordering. The architecture follows a
**layered separation** between UI rendering and business logic.

```
┌─────────────────────────────────────────────────┐
│                  Browser (Client)                │
├──────────────┬──────────────────────────────────┤
│   UI Layer   │      Business Logic Layer        │
│              │                                   │
│  app.js      │  lib/filter-logic.js             │
│  menu.js     │  lib/cart-logic.js               │
│  cart.js     │  lib/cart-logic.js               │
│  checkout.js │  lib/checkout-logic.js           │
│  manage-     │  lib/menu-logic.js               │
│  menu.js     │                                   │
│  restaurant- │  lib/order-logic.js              │
│  orders.js   │                                   │
├──────────────┴──────────────────────────────────┤
│              Data / Persistence                  │
│                                                  │
│  localStorage          JSON seed files           │
│  (cart, orders,        (restaurants.json,         │
│   custom menus)         menus.json)              │
└─────────────────────────────────────────────────┘
```

## Data Flow

### Customer Ordering Flow
```
index.html          menu.html           cart.html           checkout.html
┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────────┐
│ Browse &  │──────>│ View menu│──────>│ Review   │──────>│ Enter details│
│ filter    │       │ + add to │       │ cart,    │       │ validate,    │
│ restaurants│      │ cart     │       │ adjust   │       │ place order  │
└──────────┘       └──────────┘       │ qty      │       └──────┬───────┘
                                       └──────────┘              │
                                                                 v
                                                        ┌──────────────┐
                                                        │ Confirmation │
                                                        │ (order ID,   │
                                                        │  summary)    │
                                                        └──────────────┘
```

### Restaurant Management Flow
```
manage-menu.html                    restaurant-orders.html
┌────────────────┐                 ┌──────────────────────┐
│ Select          │                │ Select restaurant    │
│ restaurant     │                 │                      │
│       │        │                 │       │              │
│       v        │                 │       v              │
│ Add / Edit /   │                 │ View orders          │
│ Delete items   │                 │ (newest first)       │
│                │                 │       │              │
│ Persisted to   │                 │       v              │
│ localStorage   │                 │ Update status:       │
└────────────────┘                 │ pending → accepted → │
                                   │ preparing → ready →  │
                                   │ completed            │
                                   └──────────────────────┘
```

## Database Design

### Current: localStorage (Prototype)

The prototype uses browser localStorage as a lightweight database stub.
Three storage keys are used:

| Key | Structure | Purpose |
|-----|-----------|---------|
| `feedme_cart` | `[{ id, name, price, qty, rid, restaurantName }]` | Active shopping cart |
| `feedme_orders` | `[{ id, placedAt, customer, restaurantId, items, total, status }]` | Order history |
| `feedme_menus` | `{ [rid]: [{ id, name, price, available }] }` | Custom menu overrides |

### Seed Data (JSON files)

| File | Structure | Records |
|------|-----------|---------|
| `restaurants.json` | `[{ id, name, category, rating, etaMins }]` | Restaurant listings |
| `menus.json` | `{ [rid]: [{ id, name, price }] }` | Default menus per restaurant |

### Entity Relationship

```
Restaurant (1) ──────< Menu Item (many)
     │
     │
     └────< Order (many)
                │
                ├── Customer { name, address, phone }
                ├── Items [{ id, name, price, qty }]
                ├── Status (pending|accepted|preparing|ready|completed)
                └── Total (calculated)
```

## UI Design

### Design Principles
- **Dark theme** with card-based layout for readability
- **Badge system** for metadata (price, rating, ETA, status)
- **Responsive** flex/grid layout adapting to screen sizes
- **Feedback patterns**: "Added!" confirmation, disabled states during async
- **Colour-coded statuses**: pending (amber), accepted (blue), preparing (purple), ready (green), completed (grey)

### Page Structure

| Page | File | Purpose | User Stories |
|------|------|---------|-------------|
| Home | `index.html` | Browse & filter restaurants | US-01, US-02 |
| Menu | `menu.html` | View restaurant menu, add to cart | US-03 |
| Cart | `cart.html` | Review cart, adjust quantities | US-03, US-04 |
| Checkout | `checkout.html` | Enter details, place order | US-05 |
| Manage Menu | `manage-menu.html` | Restaurant menu CRUD | US-06 |
| Orders Portal | `restaurant-orders.html` | View & manage incoming orders | US-07, US-08 |

### Shared Styles

All pages share `css/style.css` which provides:
- CSS custom properties for theming (`--bg`, `--card-bg`, `--accent`)
- `.card` component with hover states
- `.badge` metadata chips
- `.btn` and `.btn-danger` button styles
- Form input styling with error state display

## Technology Choices

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Language | Vanilla JavaScript (ES6+) | No framework overhead, direct DOM control |
| Styling | Custom CSS | Lightweight, no build step needed |
| Data | localStorage + JSON seeds | Suitable for prototype; easy to swap for real DB |
| Testing | Jest | Industry-standard, fast, good coverage reporting |
| Package Mgmt | npm | Standard Node.js tooling |
| Version Control | Git + GitHub | Required by rubric; branches + PRs |
