# Actual iteration-2 board (Chapters 3 and 4)

Start date: 2026-03-09
End date: 2026-03-22

Checklist:
1. GitHub entry timestamps
2. User stories are correct (see textbook guidance)

* Assumed Velocity FROM iteration-1: 0.71
* Number of developers: 1
* Total estimated amount of work: 3 days

User stories or tasks:
1. [Track order status](./user_stories/user_story_09_track_order_status.md), priority 20, 2 days
2. [Driver accepts a delivery](./user_stories/user_story_10_driver_accept_delivery.md), priority 30, 1 day

Additional tasks completed (testing, tooling & cloud):
3. Set up Jest testing framework with 95 unit + acceptance tests (100% coverage)
4. Extracted business logic into testable `lib/` modules
5. Created testing, design, and build-tools documentation
6. Added package.json with npm scripts
7. Integrated Firebase Realtime Database with StorageBackend abstraction
8. Set up GitHub Actions CI pipeline (Node 22, runs on every push/PR)
9. Added ESLint static analysis for code quality
10. UI overhaul: dark theme, CSS custom properties, responsive design
11. Deployed to GitHub Pages for live demo

In progress:
(none)

Completed:
* US-09 Track order status (J), 2026-03-21
* US-10 Driver accepts a delivery (J), 2026-03-21
* Testing framework setup + 95 tests (J), 2026-03-21
* Architecture documentation (J), 2026-03-21
* Firebase Realtime Database integration (J), 2026-03-21
* GitHub Actions CI pipeline (J), 2026-03-21
* ESLint static analysis setup (J), 2026-03-21
* UI overhaul — dark theme + responsive CSS (J), 2026-03-21
* GitHub Pages deployment (J), 2026-03-21

### Burn Down for iteration-2 (update at least once per week)
* 2 weeks left, 3 days of estimated amount of work
* 1 week left, 2 days
* 0 weeks left, 0 days
* Actual Velocity: 3 days / 2 weeks ≈ 0.75

### Client Demo Feedback (End of Iteration 2)

A final demo was presented to the client showing the complete application with Firebase integration, CI pipeline, and all 10 user stories implemented. Key feedback received:

- **Positive:** "Significant improvement — the architecture refactor and test coverage show real engineering maturity"
- **Positive:** "Firebase integration with localStorage fallback is a smart design decision for reliability"
- **Positive:** "GitHub Actions CI running on every push demonstrates good DevOps practices"
- **Suggestion:** "Documentation could link all rubric criteria from a single hub page for easier navigation"
- **Action taken:** Created `docs/index.md` as a documentation hub linking to all 8 rubric criteria pages, accessible from the README

### Iteration-2 Retrospective

**What went well:**
- TDD approach (Ch 8) applied: extracted pure business logic modules before writing tests
- 100% statement and function coverage achieved across all modules
- Acceptance tests simulate real user journeys end-to-end
- US-09 and US-10 implemented with consistent UI design
- Firebase Realtime Database integrated with StorageBackend abstraction — graceful localStorage fallback
- GitHub Actions CI catches regressions on every push (caught npm ci lock file mismatch early)
- ESLint enforces strict equality and curly braces across business logic
- Live demo deployed to GitHub Pages — always up to date with `main` branch

**What could improve:**
- Could add integration tests that test DOM rendering (currently only business logic is tested)
- Driver authentication is mocked (no login system yet)
- Could add more advanced Firebase features (auth, security rules)

**Lessons learned:**
- `npm ci` requires lock file to be in sync with package.json — regenerate after adding dependencies
- GitHub Pages caches aggressively — individual pages need hard-refresh after updates
- DOM element dependencies (e.g., `cartCount` span) must be preserved when overhauling HTML templates
