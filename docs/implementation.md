# 3. Implementation — Delivered Solution

## Live Demo

**[https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/](https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/)**

## What Was Delivered

FeedMe delivers a complete food ordering ecosystem across 8 pages:

| Page | URL | Stories Covered |
|------|-----|----------------|
| Home (Browse Restaurants) | [index.html](https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/index.html) | US-01 |
| Restaurant Menu | [menu.html](https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/menu.html?r=sushi-hub) | US-02, US-03 |
| Shopping Cart | [cart.html](https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/cart.html) | US-03, US-04 |
| Checkout | [checkout.html](https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/checkout.html) | US-05 |
| My Orders (Tracking) | [my-orders.html](https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/my-orders.html) | US-09 |
| Restaurant: Manage Menu | [manage-menu.html](https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/manage-menu.html) | US-06 |
| Restaurant: Orders | [restaurant-orders.html](https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/restaurant-orders.html) | US-07, US-08 |
| Driver Portal | [driver.html](https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/driver.html) | US-10 |

## Technology Choices

| Layer | Choice | Justification |
|-------|--------|---------------|
| Frontend | Vanilla HTML/CSS/JS | No build step required, deploys directly to GitHub Pages |
| Database | Firebase Realtime Database | Cloud-hosted NoSQL, real-time sync, free tier sufficient |
| Fallback Storage | localStorage | Offline-capable when Firebase is unavailable |
| Hosting | GitHub Pages | Free, automatic deployment from main branch |
| CI/CD | GitHub Actions | Automated test runs on every push and PR |

## UI Design

The app uses a custom dark-theme design with:
- CSS custom properties for consistent theming (`--accent: #ff6b35`)
- Responsive grid layouts with card-based restaurant display
- Pill-shaped navigation bar for role switching (Customer / Restaurant / Driver)
- Toast notifications for user feedback
- Card animations (`@keyframes fadeIn`) for smooth loading
- Mobile-responsive breakpoints

## Cloud Services (HD Criterion)

Firebase Realtime Database is used as the cloud backend with a `StorageBackend` abstraction layer that falls back to `localStorage` when offline. See [Cloud Services](./cloud-services.md) for full details.

## Iteration Delivery

- **Iteration 1:** Delivered core ordering flow (8 user stories). All pages functional, deployed to GitHub Pages, tested.
- **Iteration 2:** Added order tracking, driver portal, Firebase integration, UI overhaul, CI pipeline, ESLint static analysis.

Each iteration ended with working deployed software and client feedback incorporated.
