# User story title: Driver accepts a delivery
Other title versions: Accept delivery job, Driver picks up order

## Priority: 30
Optional/later milestone, assigned to iteration-2.

## Estimation: 1 day
Planning poker / estimates:
* Jarrod: 1 day (before iteration-2)

## Assumptions (if any):
- Delivery jobs can be represented as orders in a "Ready for pickup" state.
- Driver identity/auth can be mocked initially.

## Description
Description-v1: The driver can accept an available delivery so they can deliver an order.

As a **delivery driver**, I want to **see available deliveries and accept one** so that I **can deliver food to customers**.

### Acceptance Criteria
- Driver can see a list of orders with status "ready" that haven't been assigned
- Each delivery shows restaurant name, customer address, items, and total
- Driver can click "Accept delivery" to claim a job
- Accepted deliveries update the order status to "completed"
- Driver can see their history of accepted/completed jobs

## Tasks (see chapter 4)
- [x] [done] Create "Available deliveries" list page (`driver.html`) (0.50 days)
- [x] [done] Add "Accept job" action that assigns driver and updates status (0.25 days)
- [x] [done] Persist assignment + show accepted state in history section (0.25 days)

# UI Design
- Two-section layout: "Available Deliveries" and "My Accepted Jobs"
- Available deliveries show restaurant, address, items summary, and total
- "Accept delivery" primary button per card
- Completed jobs shown with reduced opacity and ✅ badge

# Completed
- `prototype/driver.html` — Driver portal page
- `prototype/js/driver.js` — Delivery listing, acceptance, and history logic
- Uses `feedme_driver_assignments` localStorage key for assignment tracking
- Accessible from: index.html nav bar
