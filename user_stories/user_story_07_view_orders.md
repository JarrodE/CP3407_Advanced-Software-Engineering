# User story title: Restaurant views incoming orders
Other title versions: View new orders, Order inbox

## Priority: 10
Required for MVP: orders must be visible to restaurant.

## Estimation: 1 day
Planning poker / estimates:
* Jarrod: 1 day (before iteration-1)

## Assumptions (if any):
- Orders exist (from US-05).
- Restaurant can view a list of orders for their restaurant (even if restaurant identity is mocked).

## Description
Description-v1: The restaurant can see new incoming orders so they can start preparing them.

## Tasks (see chapter 4)
- [x] [done] Create restaurant orders list page (0.50 days)
- [x] [done] Load orders from storage and show key details (0.40 days)
- [x] [done] Add basic order detail view (0.10 days) — inline within each order card

# UI Design
- Add orders list mockup here (later).

# Completed
## Completed-v1 (Iteration 1)
- Date: 2026-03-04
- Evidence:
  - `prototype/restaurant-orders.html` — restaurant selector + orders list
  - `prototype/js/restaurant-orders.js` — loads `feedme_orders`, filters by restaurantId, shows customer details + items inline
