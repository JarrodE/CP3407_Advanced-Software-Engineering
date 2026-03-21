# Cloud Services — FeedMe App

## Overview

FeedMe uses **Firebase Realtime Database** (Google Cloud) as its cloud database backend,
satisfying the HD criterion for "modern tools and cloud services."

## Architecture

```
┌─────────────────────┐         ┌──────────────────────────┐
│   Browser Client    │ ←────── │  Firebase Realtime DB     │
│                     │ ──────→ │  (Google Cloud / Asia SE) │
│  StorageBackend     │         │                           │
│  abstraction layer  │         │  feedme_cart              │
│                     │         │  feedme_orders            │
│  Falls back to      │         │  feedme_menus             │
│  localStorage if    │         │  feedme_driver_assignments│
│  offline            │         └──────────────────────────┘
└─────────────────────┘
```

## Storage Backend Abstraction

The `StorageBackend` module (`prototype/js/lib/firebase-config.js`) provides a unified
interface that works with both Firebase and localStorage:

| Method | Description |
|--------|-------------|
| `init()` | Connect to Firebase; falls back to localStorage if unavailable |
| `get(key)` | Read data from cloud or local storage || `set(key, value)` | Write data (syncs to both Firebase and localStorage) |
| `onChange(key, cb)` | Subscribe to real-time updates (Firebase) or poll (localStorage) |
| `isCloud()` | Check if using cloud or local storage |

## Why Firebase?

| Factor | Decision |
|--------|----------|
| **Free tier** | Firebase Spark plan: 1GB storage, 10GB/month transfer — sufficient for a prototype |
| **No server needed** | Client-side SDK connects directly to the database |
| **Real-time sync** | Orders update live across customer and restaurant portals |
| **Graceful fallback** | App works offline with localStorage when Firebase is unavailable |
| **Google Cloud** | Hosted on Google Cloud infrastructure (Asia Southeast region) |

## Data Model (Firebase paths)

```
feedme-cp3407-default-rtdb/
├── feedme_cart/          → Shopping cart items
├── feedme_orders/        → All placed orders with status
├── feedme_menus/         → Custom menu overrides by restaurant
└── feedme_driver_assignments/  → Driver delivery history
```

## Setup Instructions

1. The Firebase SDK is loaded via CDN in all HTML pages:
   ```html
   <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
   ```
2. Configuration is in `prototype/js/lib/firebase-config.js`

3. The app auto-detects Firebase availability and displays the connection status

## Offline Mode

When Firebase is unavailable (no internet, demo mode, etc.):
- The app automatically falls back to localStorage
- All features continue to work identically
- Data is stored locally in the browser
- This dual-mode approach ensures the app is always functional