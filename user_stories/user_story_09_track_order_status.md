# User story title: Track order status
Other title versions: View order progress, Order tracking

## Priority: 20
Iteration-2 goal: customer visibility into progress.

## Estimation: 2 days
Planning poker / estimates:
* Jarrod: 2 days (before iteration-2)

## Assumptions (if any):
- Order status exists and is being updated (US-08).
- Customer can view their latest order (even if customer identity is mocked initially).

## Description
Description-v1: The customer can view order status so they know what's happening.

As a **customer**, I want to **track the status of my order** so that I **know when my food will arrive**.

### Acceptance Criteria
- Customer can view all placed orders on a "My Orders" page
- Each order shows its current status with a visual progress bar
- Status labels are human-friendly (e.g., "Your food is being prepared")
- Orders are sorted newest-first
- Customer can refresh to check for status updates

## Tasks (see chapter 4)
- [x] [done] Create customer "My Orders" page (`my-orders.html`) (0.75 days)
- [x] [done] Show order details + current status with progress bar (0.75 days)
- [x] [done] Add refresh button to check for updates (0.50 days)

# UI Design
- "My Orders" page with card-based layout
- Visual progress bar showing: pending → accepted → preparing → ready → completed
- Status icons and colour coding for each stage
- Delivery address and phone displayed per order

# Completed
- `prototype/my-orders.html` — Customer order tracking page
- `prototype/js/my-orders.js` — Order display logic with progress bar and status labels
- Accessible from: index.html nav bar, checkout confirmation page
