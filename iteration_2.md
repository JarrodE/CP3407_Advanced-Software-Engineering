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

Additional tasks completed (testing & documentation):
3. Set up Jest testing framework with 95 unit + acceptance tests (100% coverage)
4. Extracted business logic into testable `lib/` modules
5. Created testing, design, and build-tools documentation
6. Added package.json with npm scripts

In progress:
(none)

Completed:
* US-09 Track order status (J), 2026-03-21
* US-10 Driver accepts a delivery (J), 2026-03-21
* Testing framework setup + 95 tests (J), 2026-03-21
* Architecture documentation (J), 2026-03-21

### Burn Down for iteration-2 (update at least once per week)
* 2 weeks left, 3 days of estimated amount of work
* 1 week left, 2 days
* 0 weeks left, 0 days
* Actual Velocity: 3 days / 2 weeks ≈ 0.75

### Iteration-2 Retrospective

**What went well:**
- TDD approach (Ch 8) applied: extracted pure business logic modules before writing tests
- 100% statement and function coverage achieved across all modules
- Acceptance tests simulate real user journeys end-to-end
- US-09 and US-10 implemented with consistent UI design

**What could improve:**
- Could add integration tests that test DOM rendering
- Database is still localStorage — a real backend would strengthen the implementation
- Driver authentication is mocked (no login system yet)

**Action items for next iteration (if applicable):**
- Consider adding a real database backend (MySQL/Firebase)
- Add user authentication for customer/driver/restaurant roles
- Deploy to GitHub Pages for live demo
