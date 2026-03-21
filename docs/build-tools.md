# 6. Building & Development Tools

## Overview

This document describes the build tools, external libraries, and development workflow
used in the FeedMe project, satisfying rubric criterion 6 (Building/Dev Tools).

## Package Manager: npm

The project uses **npm** (Node Package Manager) for dependency management.

```bash
npm install          # Install all dependencies
npm test             # Run all unit and acceptance tests
npm run test:coverage # Run tests and generate coverage report
npm run lint         # Run ESLint static analysis
```

### package.json Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `test` | `jest --verbose` | Run all 95 unit and acceptance tests |
| `test:coverage` | `jest --coverage` | Run tests with coverage report |
| `lint` | `eslint prototype/js/lib/` | Static analysis on business logic |

## Continuous Integration: GitHub Actions

Automated CI runs on **every push and pull request** to `main`:

```yaml
# .github/workflows/ci.yml
name: CI — Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
```

The CI pipeline:
1. Checks out the repository
2. Installs Node.js 22 (upgraded from 20 due to deprecation)
3. Runs `npm ci` for clean, reproducible installs
4. Executes all 95 tests — build fails if any test fails

## Static Analysis: ESLint

ESLint enforces code quality rules across the business logic layer:

```json
// .eslintrc.json
{
  "env": { "browser": true, "node": true, "es2021": true, "jest": true },
  "rules": {
    "eqeqeq": "error",
    "curly": "error"
  }
}
```

| Rule | Purpose |
|------|---------|
| `eqeqeq` | Enforce strict equality (`===`) to prevent type coercion bugs |
| `curly` | Require braces on all control flow to prevent dangling-else bugs |

## Testing Framework: Jest 29

- **Jest** is used for all unit and acceptance testing
- Configuration in `package.json` under the `"jest"` key
- Test environment: `node` (business logic is pure JS, no DOM needed)
- 95 tests across 6 test suites with 100% coverage on business logic

## Cloud Services: Firebase SDK

The Firebase JavaScript SDK is loaded via CDN in all HTML pages:

```html
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
```

Firebase provides the cloud database backend (Realtime Database) with a `StorageBackend` abstraction layer that falls back to localStorage when offline. See [Cloud Services](./cloud-services.md) for full details.

## Development Tools

| Tool | Purpose |
|------|---------|
| **VS Code + Live Server** | Local development with auto-reload |
| **Git + GitHub** | Version control, issue tracking, pull requests |
| **GitHub Actions** | Automated CI pipeline (test on every push) |
| **GitHub Pages** | Automatic deployment of live demo from `main` branch |
| **ESLint** | Static analysis for code quality |
| **Jest** | Unit and acceptance testing with coverage |
| **Firebase SDK** | Cloud database (Realtime Database) |
| **Chrome DevTools** | Debugging, localStorage inspection, console monitoring |

## External Libraries

| Library | Version | Purpose | Type |
|---------|---------|---------|------|
| Jest | ^29.7.0 | Testing framework | Dev dependency |
| ESLint | ^8.57.1 | Static analysis | Dev dependency |
| Firebase JS SDK | 9.23.0 | Cloud database | CDN (runtime) |

The prototype intentionally uses **zero bundled runtime dependencies** — only vanilla JavaScript, HTML, and CSS. Firebase is loaded via CDN. This keeps the application lightweight and avoids framework lock-in.

## Project Structure

```
CP3407_Advanced-Software-Engineering/
├── .github/workflows/ci.yml  ← GitHub Actions CI pipeline
├── .eslintrc.json             ← ESLint configuration
├── package.json               ← npm config, scripts, dependencies
├── prototype/
│   ├── index.html             ← Home page (browse restaurants)
│   ├── menu.html              ← Restaurant menu
│   ├── cart.html              ← Shopping cart
│   ├── checkout.html          ← Checkout form
│   ├── my-orders.html         ← Order tracking
│   ├── manage-menu.html       ← Restaurant menu management
│   ├── restaurant-orders.html ← Restaurant order portal
│   ├── driver.html            ← Driver delivery portal
│   ├── css/style.css          ← Dark-theme shared styles
│   ├── js/                    ← DOM rendering layer
│   │   └── lib/               ← Pure testable business logic
│   └── data/                  ← JSON seed data
├── tests/                     ← Jest test suites
├── docs/                      ← Project documentation pages
├── user_stories/              ← Individual user story files
└── README.md                  ← Project overview & hub
```
