# User story title: Restaurant manages menu
Other title versions: Edit menu items, Add/remove menu item

## Priority: 20
Needed for realistic restaurant workflow; can be minimal in iteration-1.

## Estimation: 2 days
Planning poker / estimates:
* Jarrod: 2 days (before iteration-1)

## Assumptions (if any):
- Restaurant “admin” auth may be deferred; use a simple restaurant management page.
- Menu items have basic fields (name, price, availability).

## Description
Description-v1: The restaurant can create and edit menu items so customers can order accurate products.

## Tasks (see chapter 4)
- [x] [done] Create restaurant management page (0.50 days)
- [x] [done] Implement create menu item (0.50 days)
- [x] [done] Implement edit/update menu item (0.50 days)
- [x] [done] Persist menu items (DB/stub) (0.50 days) — saved to localStorage under `feedme_menus`

# UI Design
- Add a management screen mockup here (later).

# Completed
## Completed-v1 (Iteration 1)
- Date: 2026-03-04
- Evidence:
  - `prototype/manage-menu.html` — restaurant selector, item list, add-item form, inline edit modal
  - `prototype/js/manage-menu.js` — create/edit/delete items; custom menus persisted to `feedme_menus` in localStorage (falls back to seed menus.json)
