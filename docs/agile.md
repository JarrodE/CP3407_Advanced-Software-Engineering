# 7. Agile Software Engineering

## Process Overview

FeedMe was developed using an **Agile iterative approach** inspired by Scrum, adapted for a solo developer. The textbook's guidance (Chapters 1–5, 12) informed the process: deliver working software in short iterations, gather feedback, and adapt.

## Iteration Structure

| Iteration | Duration | Focus | Outcome |
|-----------|----------|-------|---------|
| **1** | Weeks 1–2 | Core ordering flow (US-01 to US-08) | 8 working pages deployed to GitHub Pages, all acceptance criteria met |
| **2** | Weeks 3–4 | Tracking, driver portal, cloud, quality (US-09, US-10) | Firebase integration, UI overhaul, CI pipeline, ESLint, 95 tests passing |

## How Each Iteration Worked

1. **Planning:** Selected user stories from the prioritised backlog based on value and dependencies
2. **Development:** Implemented features, wrote tests alongside code (TDD where practical)
3. **Review/Demo:** Deployed to GitHub Pages, verified all features work in production
4. **Retrospective:** Identified what went well and what to improve for next iteration

## Iteration Boards

- [Iteration 1 Board](../iteration_1.md) — Stories planned vs delivered, velocity
- [Iteration 2 Board](../iteration_2.md) — Stories + technical improvements
- [Iteration 1 Task Board](./iteration_1_tasks.md) — Detailed task breakdown

## Key Agile Practices Applied

| Practice | How Applied |
|----------|------------|
| **User Stories** | All features defined as user stories with acceptance criteria before coding |
| **Prioritised Backlog** | MoSCoW prioritisation ensuring highest-value features built first |
| **Timeboxed Iterations** | 2-week iterations with fixed scope, working software at end of each |
| **Continuous Integration** | GitHub Actions runs all tests on every push — broken builds caught immediately |
| **Working Software** | Each iteration deployed to GitHub Pages — always a live, runnable demo |
| **Refactoring** | Iteration 2 included UI overhaul and StorageBackend abstraction (Ch 5) |
| **Velocity Tracking** | Story points estimated and tracked per iteration |

## Adapting the Process (Solo Developer)

As a solo developer, some Scrum ceremonies were adapted:
- **Daily standups** replaced with personal task tracking via iteration boards
- **Sprint reviews** done by self-testing the deployed site and comparing against acceptance criteria
- **Retrospectives** captured in iteration board notes — e.g., after Iteration 1, identified need for CI pipeline and cloud storage, which drove Iteration 2 scope

This aligns with the textbook's Ch 12 principle: a good process is one that lets *your* team be successful.
