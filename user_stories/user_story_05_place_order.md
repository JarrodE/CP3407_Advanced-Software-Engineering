# User story title: Place an order
Other title versions: Submit order, Checkout

## Priority: 10
Required for MVP milestone: customer must be able to place an order.

## Estimation: 2 days
Planning poker / estimates:
* Jarrod: 2 days (before iteration-1)

## Assumptions (if any):
- Payment is out of scope initially (use “pay on delivery” / placeholder).
- Delivery details can be minimal (name + address + phone).
- Orders can be stored in a simple database table or JSON store initially.

## Description
Description-v1: The customer can place an order with delivery details so the restaurant receives the request.

## Tasks (see chapter 4)
- [x] [done] Create checkout form for delivery details (0.50 days)
- [x] [done] Validate checkout input (0.25 days)
- [x] [done] Persist order (DB/stub) (0.75 days) — saved to localStorage under `feedme_orders`
- [x] [done] Show confirmation screen with order id (0.50 days)

# UI Design
- Add a checkout screen mockup here (later).

# Completed
## Completed-v1 (Iteration 1)
- Date: 2026-03-04
- Evidence:
  - `prototype/checkout.html` — delivery form (name, address, phone) + confirmation section
  - `prototype/js/checkout.js` — field validation, order persisted to `feedme_orders` in localStorage, cart cleared on submit, confirmation shown inline with order ID and status
