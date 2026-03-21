/**
 * Acceptance tests — end-to-end user workflow scenarios.
 * These simulate complete user journeys using the extracted business logic.
 *
 * Ref: CP3407 Ch 9 — Acceptance Testing
 */

const { addToCart, updateQty, removeItem, cartTotal, cartItemCount } = require("../prototype/js/lib/cart-logic");
const { validateCheckout, generateOrderId, buildOrder } = require("../prototype/js/lib/checkout-logic");
const { updateOrderStatus, filterByRestaurant, sortNewestFirst } = require("../prototype/js/lib/order-logic");
const { filterRestaurants } = require("../prototype/js/lib/filter-logic");
const { getMenu, addMenuItem, deleteMenuItem } = require("../prototype/js/lib/menu-logic");

// ============================================================
// US-01 + US-02: Customer browses and filters restaurants
// ============================================================
describe("Acceptance: Browse & filter restaurants", () => {
  const restaurants = [
    { id: "r1", name: "Thai Palace", category: "Thai", rating: 4.5, etaMins: 30 },
    { id: "r2", name: "Sushi Bar", category: "Japanese", rating: 4.8, etaMins: 25 },
    { id: "r3", name: "Thai Garden", category: "Thai", rating: 4.2, etaMins: 35 },
  ];

  test("customer can see all restaurants then narrow by category", () => {
    // Step 1: see all restaurants
    const all = filterRestaurants(restaurants, "", "");
    expect(all).toHaveLength(3);

    // Step 2: filter to Thai only
    const thai = filterRestaurants(restaurants, "", "Thai");
    expect(thai).toHaveLength(2);

    // Step 3: search within Thai for "Palace"
    const palace = filterRestaurants(restaurants, "palace", "Thai");
    expect(palace).toHaveLength(1);
    expect(palace[0].name).toBe("Thai Palace");
  });
});

// ============================================================
// US-03 + US-04 + US-05: Full ordering workflow
// ============================================================
describe("Acceptance: Complete ordering workflow", () => {
  const seedMenus = {
    r1: [
      { id: "m1", name: "Pad Thai", price: 12.50, available: true },
      { id: "m2", name: "Green Curry", price: 14.00, available: true },
      { id: "m3", name: "Spring Roll", price: 5.00, available: true },
    ],
  };

  test("customer adds items, adjusts qty, checks out, and receives confirmation", () => {
    // Step 1: View menu
    const menu = getMenu({}, seedMenus, "r1");
    expect(menu).toHaveLength(3);

    // Step 2: Add items to cart (US-03)
    let cart = [];
    cart = addToCart(cart, menu[0], "r1", "Thai Palace"); // Pad Thai x1
    cart = addToCart(cart, menu[0], "r1", "Thai Palace"); // Pad Thai x2
    cart = addToCart(cart, menu[2], "r1", "Thai Palace"); // Spring Roll x1
    expect(cartItemCount(cart)).toBe(3);

    // Step 3: Adjust quantities (US-04)
    cart = updateQty(cart, "m3", 2); // Spring Roll -> 3
    expect(cart.find(c => c.id === "m3").qty).toBe(3);

    // Step 4: Remove an item (US-04)
    cart = removeItem(cart, "m1"); // Remove Pad Thai
    expect(cart).toHaveLength(1);
    expect(cartTotal(cart)).toBeCloseTo(15.00); // 5.00 * 3

    // Step 5: Re-add Pad Thai
    cart = addToCart(cart, menu[0], "r1", "Thai Palace");
    expect(cartTotal(cart)).toBeCloseTo(27.50); // 15.00 + 12.50

    // Step 6: Validate checkout (US-05)
    const validation = validateCheckout("Jarrod", "14 Smith St, Cairns", "+61412000111");
    expect(validation.valid).toBe(true);

    // Step 7: Place order
    const orderId = generateOrderId(1711000000000);
    const order = buildOrder(cart, { name: "Jarrod", address: "14 Smith St, Cairns", phone: "+61412000111" }, orderId);
    expect(order.status).toBe("pending");
    expect(order.total).toBeCloseTo(27.50);
    expect(order.items).toHaveLength(2);
    expect(order.customer.name).toBe("Jarrod");
  });
});

// ============================================================
// US-05 validation rejection
// ============================================================
describe("Acceptance: Checkout validation rejects bad data", () => {
  test("customer cannot check out with invalid phone", () => {
    const result = validateCheckout("Jarrod", "14 Smith St", "abc");
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  test("customer cannot check out with missing address", () => {
    const result = validateCheckout("Jarrod", "", "+61412000111");
    expect(result.valid).toBe(false);
    expect(result.errors.address).toBeDefined();
  });
});

// ============================================================
// US-06: Restaurant manages menu
// ============================================================
describe("Acceptance: Restaurant menu management", () => {
  test("restaurant owner adds and removes menu items", () => {
    // Start with seed menu
    let menu = getMenu({}, { r1: [{ id: "s1", name: "Pad Thai", price: 12.50, available: true }] }, "r1");
    expect(menu).toHaveLength(1);

    // Add a new item
    menu = addMenuItem(menu, { id: "new1", name: "Tom Yum Soup", price: 9.00, available: true });
    expect(menu).toHaveLength(2);

    // Delete old item
    menu = deleteMenuItem(menu, "s1");
    expect(menu).toHaveLength(1);
    expect(menu[0].name).toBe("Tom Yum Soup");
  });
});

// ============================================================
// US-07 + US-08: Restaurant views and manages orders
// ============================================================
describe("Acceptance: Restaurant order management", () => {
  const orders = [
    { id: "ORD-1", restaurantId: "r1", status: "pending", placedAt: "2026-03-20T08:00:00Z", total: 25, customer: { name: "A" }, items: [] },
    { id: "ORD-2", restaurantId: "r1", status: "pending", placedAt: "2026-03-20T09:30:00Z", total: 30, customer: { name: "B" }, items: [] },
    { id: "ORD-3", restaurantId: "r2", status: "pending", placedAt: "2026-03-20T10:00:00Z", total: 18, customer: { name: "C" }, items: [] },
  ];

  test("restaurant sees only their orders, sorted newest first, and progresses status", () => {
    // US-07: Filter to restaurant r1
    const r1Orders = filterByRestaurant(orders, "r1");
    expect(r1Orders).toHaveLength(2);

    // Sorted newest first
    const sorted = sortNewestFirst(r1Orders);
    expect(sorted[0].id).toBe("ORD-2");

    // US-08: Accept the first order
    let updated = updateOrderStatus(orders, "ORD-2", "accepted");
    expect(updated.find(o => o.id === "ORD-2").status).toBe("accepted");

    // Progress through statuses
    updated = updateOrderStatus(updated, "ORD-2", "preparing");
    updated = updateOrderStatus(updated, "ORD-2", "ready");
    updated = updateOrderStatus(updated, "ORD-2", "completed");
    expect(updated.find(o => o.id === "ORD-2").status).toBe("completed");

    // Other restaurant's order unchanged
    expect(updated.find(o => o.id === "ORD-3").status).toBe("pending");
  });
});
