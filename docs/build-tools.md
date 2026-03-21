# Building & Development Tools — FeedMe App

## Overview

This document describes the build tools, external libraries, and development workflow
used in the FeedMe project, satisfying rubric criterion 6 (Building/Dev Tools).

## Package Manager: npm

The project uses **npm** (Node Package Manager) for dependency management.

```bash
# Install all dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### package.json Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `test` | `jest --verbose` | Run all unit and acceptance tests |
| `test:coverage` | `jest --coverage` | Run tests and generate coverage report |

## Testing Framework: Jest 29

- **Jest** is used for all unit and acceptance testing
- Configuration in `package.json` under the `"jest"` key
- Test environment: `node` (business logic is pure JS, no DOM needed)
- Test files located in `/tests/` directory

## Development Tools

### Live Server (VS Code Extension)
For local development, use the **Live Server** extension to serve the prototype:
1. Install "Live Server" from VS Code marketplace
2. Right-click `prototype/index.html` → "Open with Live Server"
3. Changes auto-reload in the browser

### Git & GitHub
- **Git** for version control with feature branches
- **GitHub** for remote repository, issue tracking, and pull requests
- GitHub issue templates for user stories and tasks
- Pull request template for code review

### Browser DevTools
- Chrome/Firefox DevTools for debugging
- localStorage inspection via Application tab
- Console for error monitoring

## External Libraries

| Library | Version | Purpose | License |
|---------|---------|---------|---------|
| Jest | ^29.7.0 | Testing framework (dev dependency) | MIT |

The prototype intentionally uses **zero runtime dependencies** — only vanilla JavaScript,
HTML, and CSS. This keeps the application lightweight and avoids framework lock-in.
Jest is the sole dev dependency, used exclusively for testing.

## Project Structure

```
CP3407_Advanced-Software-Engineering/
├── package.json              ← npm config & scripts
├── node_modules/             ← installed dependencies (gitignored)
├── prototype/
│   ├── index.html            ← Home page
│   ├── menu.html             ← Restaurant menu
│   ├── cart.html             ← Shopping cart
│   ├── checkout.html         ← Checkout form
│   ├── manage-menu.html      ← Restaurant menu management
│   ├── restaurant-orders.html← Order portal
│   ├── css/
│   │   └── style.css         ← Shared styles
│   ├── js/
│   │   ├── app.js            ← Home page logic
│   │   ├── menu.js           ← Menu page logic
│   │   ├── cart.js           ← Cart page logic
│   │   ├── checkout.js       ← Checkout logic
│   │   ├── manage-menu.js    ← Menu management logic
│   │   ├── restaurant-orders.js ← Order portal logic
│   │   └── lib/              ← Extracted pure business logic
│   │       ├── cart-logic.js
│   │       ├── checkout-logic.js
│   │       ├── filter-logic.js
│   │       ├── menu-logic.js
│   │       └── order-logic.js
│   └── data/
│       ├── restaurants.json  ← Seed restaurant data
│       └── menus.json        ← Seed menu data
├── tests/
│   ├── cart-logic.test.js
│   ├── checkout-logic.test.js
│   ├── filter-logic.test.js
│   ├── menu-logic.test.js
│   ├── order-logic.test.js
│   └── acceptance.test.js
├── docs/
│   ├── testing.md            ← Testing strategy & coverage
│   ├── design.md             ← Architecture & design docs
│   ├── build-tools.md        ← This file
│   └── initial-backlog.md    ← Product backlog
├── user_stories/             ← Individual user story files
├── iteration_1.md            ← Iteration 1 plan & retrospective
├── iteration_2.md            ← Iteration 2 plan & retrospective
└── README.md                 ← Project overview
```

## Continuous Integration

Tests can be run locally or in a CI pipeline:

```bash
npm ci          # Clean install (CI-friendly)
npm test        # All tests must pass
```
