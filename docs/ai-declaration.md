# Declaration of AI-Generated Material

## Statement

This project used **Claude (Anthropic)** as a generative AI development assistant throughout the development process. All AI-generated output was reviewed, tested, and integrated by the developer. The developer maintained full understanding and ownership of all code and documentation.

AI use is permitted for Assessment Item 3 per the CP3407 assessment overview: *"you can use Generative Artificial Intelligence (GenAI) to assist you in any way."*

## How AI Was Used

| Area | How AI Assisted |
|------|----------------|
| **Code Generation** | Generated initial HTML page structures, CSS styling, JavaScript business logic functions |
| **Architecture** | Suggested the Humble Object pattern to separate testable business logic from DOM rendering |
| **Testing** | Helped write Jest unit tests and acceptance tests, achieving 100% coverage on business logic |
| **Debugging** | Diagnosed runtime errors (e.g., menu.js crash caused by missing DOM element after UI overhaul) |
| **Firebase Integration** | Generated StorageBackend abstraction with localStorage fallback |
| **CI/CD Setup** | Created GitHub Actions workflow for automated testing |
| **Documentation** | Assisted with project documentation, README, and architecture docs |
| **CSS/UI Design** | Generated the dark-theme CSS with custom properties, animations, and responsive breakpoints |
| **ESLint Config** | Set up static analysis configuration for code quality |

## Prompts Used

Below are representative prompts used during development. These show the types of questions and requests made to the AI assistant.

### Requirements & Planning

> "I'm building a FeedMe app (a better FoodPanda) for CP3407. Help me write user stories for a food ordering system with three roles: customer, restaurant owner, and driver. Each story should have acceptance criteria and story point estimates."

> "Prioritise these user stories using MoSCoW. I'm a solo developer with about 4 weeks. Which stories should go in iteration 1 vs iteration 2?"

### Architecture & Design

> "What's a good architecture for a vanilla JS food ordering app that needs to be easily testable? I don't want a framework — it needs to deploy to GitHub Pages as static files."

> "How can I separate my business logic from the DOM so I can unit test the logic with Jest without needing a browser environment?"

> "Design a StorageBackend abstraction that uses Firebase Realtime Database when available and falls back to localStorage when offline."

### Implementation

> "Create an HTML page for browsing restaurants with a search bar and category filter. Use a card-based grid layout with a dark theme."

> "Write the JavaScript business logic for a shopping cart — add items, update quantities, remove items, calculate totals. Keep it as pure functions that don't touch the DOM."

> "Set up Firebase Realtime Database config for my app. I need functions for get, set, and onChange that work with my existing localStorage code."

### Testing

> "Write Jest unit tests for my cart business logic (addToCart, removeFromCart, updateQuantity, getCartTotal). Test edge cases like adding duplicate items, setting quantity to zero, and empty cart."

> "Write acceptance tests that verify the full ordering workflow: browse restaurants → view menu → add to cart → checkout → place order. Use my business logic functions, not the DOM."

> "How do I configure Jest to measure code coverage? I want to see coverage for my lib/ folder specifically."

### CI/CD & DevOps

> "Create a GitHub Actions workflow that runs my Jest tests on every push and pull request to main. Use Node.js 22."

> "My CI pipeline is failing with 'npm error Missing: eslint@8.57.1 from lock file'. How do I fix this? I added eslint to package.json but didn't regenerate the lock file."

### CSS & UI

> "Create a complete dark-theme CSS stylesheet for a food delivery app. Use CSS custom properties for theming, include card animations, a pill-shaped nav bar, toast notifications, and responsive breakpoints."

> "My menu page is stuck on 'Loading menu...' after the UI overhaul. The console shows no errors but the menu data never loads. What could be wrong?"

### Code Quality

> "Set up ESLint for my vanilla JavaScript project. I want rules for eqeqeq and curly braces, and it should work with Jest test files too."

> "Review my project structure and suggest improvements for maintainability. Currently all JS is in one folder."

### Documentation

> "Write a README for my FeedMe project that includes: project overview, quick start instructions, links to all documentation pages, a user stories table, and the testing summary."

> "Document my Firebase integration — the StorageBackend API, data model, and how offline fallback works."

## What AI Did NOT Do

- **Decision-making:** All architectural decisions, feature prioritisation, and scope choices were made by the developer
- **Manual testing:** All deployed features were manually verified by the developer on GitHub Pages
- **Understanding:** The developer understood and could explain every line of generated code before integrating it
- **Debugging judgment:** AI helped diagnose issues, but the developer identified *which* issues to investigate and verified fixes
- **Git operations:** All commits, pushes, and repository management performed by the developer

## Tools Used

| Tool | Version | Purpose |
|------|---------|---------|
| Claude (Anthropic) | Claude Opus / Sonnet | Primary AI assistant for code generation, debugging, and documentation |
