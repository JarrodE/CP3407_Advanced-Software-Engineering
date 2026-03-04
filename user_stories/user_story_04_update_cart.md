# User story title: Update cart quantities
Other title versions: Edit cart, Remove cart items

## Priority: 20
Important usability, but not required to browse/see menu.

## Estimation: 1 day
Planning poker / estimates:
* Jarrod: 1 day (before iteration-1)

## Assumptions (if any):
- A cart view exists (from US-03).
- Quantity changes update totals.

## Description
Description-v1: The customer can change quantities or remove items so the cart matches what they want.

## Tasks (see chapter 4)
- [x] [done] Add quantity controls (+ / -) in cart view (0.40 days)
- [x] [done] Add remove item action (0.20 days)
- [x] [done] Recalculate totals and validate cart updates (0.40 days)

# UI Design
- Add a screenshot/mockup here (later).

# Completed
## Completed-v1 (Iteration 1)
- Date: 2026-03-04
- Evidence:
  - `prototype/js/cart.js` — `updateQty()` (+ / −, removes at 0), `removeItem()`, totals recalculated in `renderCart()` on every change
