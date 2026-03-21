# 1. Requirements — User Stories & Prioritisation

## Project Brief
FeedMe is a food ordering and delivery platform — a "better FoodPanda" app. The system serves three user roles: **Customers** (browse, order, track), **Restaurant Owners** (manage menus, process orders), and **Drivers** (accept and complete deliveries).

## User Stories

All requirements are written as user stories following the format: *"As a [role], I want [goal], so that [benefit]."*

| ID | Story | Priority | Est. (pts) | Iteration | Status |
|----|-------|----------|-----------|-----------|--------|
| US-01 | As a customer, I want to browse restaurants so I can choose where to order from | 10 (Must) | 3 | 1 | ✅ Done |
| US-02 | As a customer, I want to view a restaurant's menu so I can decide what to order | 10 (Must) | 3 | 1 | ✅ Done |
| US-03 | As a customer, I want to add items to my cart so I can build my order | 10 (Must) | 5 | 1 | ✅ Done |
| US-04 | As a customer, I want to update cart quantities so I can adjust before ordering | 20 (Should) | 3 | 1 | ✅ Done |
| US-05 | As a customer, I want to place an order so my food gets prepared and delivered | 10 (Must) | 5 | 1 | ✅ Done |
| US-06 | As a restaurant owner, I want to manage my menu so I can add/remove items | 20 (Should) | 5 | 1 | ✅ Done |
| US-07 | As a restaurant owner, I want to view incoming orders so I can prepare food | 10 (Must) | 3 | 1 | ✅ Done |
| US-08 | As a restaurant owner, I want to update order status so customers stay informed | 20 (Should) | 3 | 1 | ✅ Done |
| US-09 | As a customer, I want to track my order status so I know when food will arrive | 20 (Should) | 3 | 2 | ✅ Done |
| US-10 | As a driver, I want to accept delivery requests so I can earn money | 30 (Could) | 5 | 2 | ✅ Done |

## Prioritisation Justification

Stories are prioritised using **MoSCoW** (Must/Should/Could/Won't) with numeric weights:

- **Priority 10 (Must Have):** Core ordering flow — browse, view menu, add to cart, place order, view orders. Without these, the app has no value.
- **Priority 20 (Should Have):** Enhanced experience — cart editing, order status updates, order tracking. Important but the app functions without them.
- **Priority 30 (Could Have):** Driver delivery acceptance. Adds value but is a stretch goal.

## Budget & Iteration Planning

With a solo developer and ~4-week timeline, stories were planned across 2 iterations:

- **Iteration 1 (Week 1–2):** All Must-Have + Should-Have stories (US-01 through US-08). Delivers a complete end-to-end ordering system.
- **Iteration 2 (Week 3–4):** Remaining Should-Have and Could-Have stories (US-09, US-10), plus Firebase cloud integration, UI overhaul, CI pipeline, and ESLint.

This ordering ensures the highest-value features ship first, and each iteration ends with working, deployable software.

## Detailed User Stories

Full user stories with acceptance criteria are in the [user_stories/](https://github.com/JarroDe/CP3407_Advanced-Software-Engineering/tree/main/user_stories) folder.

Each story includes: description, acceptance criteria, priority justification, and story point estimate.
