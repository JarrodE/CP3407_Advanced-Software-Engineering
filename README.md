# FeedMe (CP3407 Project)

## Overview
FeedMe is a food ordering and delivery system — a "better FoodPanda" app. Customers browse restaurants and menus, build a cart, place orders, and track order progress. Restaurants manage menus and incoming orders. Drivers accept and complete deliveries.

## Team
- Jarrod (solo developer)

## How we work
We deliver in short iterations following Agile/Scrum principles (Ch 1–5). Each iteration ends with working, runnable software and a retrospective.

## Live Demo

**[https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/](https://jarrode.github.io/CP3407_Advanced-Software-Engineering/prototype/index.html)**

## Quick Start

```bash
# Run locally — use VS Code Live Server or any static server
# Navigate to prototype/index.html

# Run tests
npm install
npm test

# Run tests with coverage
npm run test:coverage
```

## 📋 Project Documentation (Rubric Criteria)

> **[Documentation Hub](docs/index.md)** — Start here. Links to all project pages.

| # | Criterion | Page |
|---|-----------|------|
| 1 | Requirements | [User Stories & Requirements](docs/requirements.md) |
| 2 | Design | [Architecture & Design](docs/design.md) |
| 3 | Implementation/Code | [Implementation & Delivered Solution](docs/implementation.md) |
| 4 | Test | [Testing Strategy & Coverage](docs/testing.md) |
| 5 | Version Control | [Git & GitHub Usage](docs/version-control.md) |
| 6 | Building & Dev Tools | [Build Tools & Libraries](docs/build-tools.md) |
| 7 | Agile Process | [Agile Iterative Development](docs/agile.md) |
| 8 | Technical Writing | [Documentation Hub](docs/index.md) |

## Additional Documentation

- [AI Declaration & Prompts Used](docs/ai-declaration.md)
- [Cloud Services (Firebase)](docs/cloud-services.md)
- [Initial Backlog Ideas](docs/initial-backlog.md)
- [Iteration 1 Board](iteration_1.md)
- [Iteration 2 Board](iteration_2.md)
- [Iteration 1 Task Board](docs/iteration_1_tasks.md)

## User Stories

| ID | Story | Priority | Iteration | Status |
|----|-------|----------|-----------|--------|
| US-01 | Browse restaurants | 10 | 1 | Done |
| US-02 | View restaurant menu | 10 | 1 | Done |
| US-03 | Add items to cart | 10 | 1 | Done |
| US-04 | Update cart quantities | 20 | 1 | Done |
| US-05 | Place an order | 10 | 1 | Done |
| US-06 | Restaurant manages menu | 20 | 1 | Done |
| US-07 | Restaurant views orders | 10 | 1 | Done |
| US-08 | Restaurant updates status | 20 | 1 | Done |
| US-09 | Track order status | 20 | 2 | Done |
| US-10 | Driver accepts delivery | 30 | 2 | Done |

## Prototype Pages

| Page | File | User Stories |
|------|------|-------------|
| Home (Browse) | `prototype/index.html` | US-01, US-02 |
| Menu | `prototype/menu.html` | US-03 |
| Cart | `prototype/cart.html` | US-03, US-04 |
| Checkout | `prototype/checkout.html` | US-05 |
| My Orders | `prototype/my-orders.html` | US-09 |
| Manage Menu | `prototype/manage-menu.html` | US-06 |
| Restaurant Orders | `prototype/restaurant-orders.html` | US-07, US-08 |
| Driver Portal | `prototype/driver.html` | US-10 |

## Testing

95 automated tests (89 unit + 6 acceptance scenarios) with **100% code coverage** on business logic.

```
Test Suites: 6 passed, 6 total
Tests:       95 passed, 95 total
```

See [docs/testing.md](docs/testing.md) for full details.

## Architecture

Business logic is separated from the DOM layer using the Humble Object pattern:

```
prototype/js/lib/    ← Pure, testable business logic
prototype/js/        ← DOM rendering layer
tests/               ← Jest unit + acceptance tests
```

See [docs/design.md](docs/design.md) for full architecture documentation.

## AI Attribution

This project used Claude (Anthropic) as a generative AI assistant. See [AI Declaration & Prompts Used](docs/ai-declaration.md) for full details.
