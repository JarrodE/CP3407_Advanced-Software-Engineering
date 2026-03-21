/**
 * Unit tests for order-logic.js
 * Covers: updateOrderStatus, filterByRestaurant, sortNewestFirst, isValidTransition
 */

const {
  ORDER_STATUSES,
  updateOrderStatus,
  filterByRestaurant,
  sortNewestFirst,
  isValidTransition,
} = require("../prototype/js/lib/order-logic");

// --- Fixtures ---
function makeOrders() {
  return [
    { id: "ORD-1", restaurantId: "r1", status: "pending", placedAt: "2026-03-20T10:00:00Z", total: 25 },
    { id: "ORD-2", restaurantId: "r1", status: "accepted", placedAt: "2026-03-20T12:00:00Z", total: 30 },
    { id: "ORD-3", restaurantId: "r2", status: "preparing", placedAt: "2026-03-20T11:00:00Z", total: 18 },
  ];
}

// ============================================================
// updateOrderStatus
// ============================================================
describe("updateOrderStatus", () => {
  test("updates status of matching order", () => {
    const result = updateOrderStatus(makeOrders(), "ORD-1", "accepted");
    expect(result.find(o => o.id === "ORD-1").status).toBe("accepted");
  });

  test("leaves other orders unchanged", () => {
    const result = updateOrderStatus(makeOrders(), "ORD-1", "accepted");
    expect(result.find(o => o.id === "ORD-2").status).toBe("accepted");
    expect(result.find(o => o.id === "ORD-3").status).toBe("preparing");
  });

  test("does not mutate original array", () => {
    const orders = makeOrders();
    updateOrderStatus(orders, "ORD-1", "accepted");
    expect(orders[0].status).toBe("pending");
  });

  test("throws on invalid status", () => {
    expect(() => updateOrderStatus(makeOrders(), "ORD-1", "cancelled")).toThrow("Invalid status");
  });

  test("returns unchanged array when orderId not found", () => {
    const orders = makeOrders();
    const result = updateOrderStatus(orders, "ORD-999", "accepted");
    expect(result).toEqual(orders);
  });
});

// ============================================================
// filterByRestaurant
// ============================================================
describe("filterByRestaurant", () => {
  test("returns only orders for specified restaurant", () => {
    const result = filterByRestaurant(makeOrders(), "r1");
    expect(result).toHaveLength(2);
    result.forEach(o => expect(o.restaurantId).toBe("r1"));
  });

  test("returns empty array for unknown restaurant", () => {
    const result = filterByRestaurant(makeOrders(), "r999");
    expect(result).toHaveLength(0);
  });

  test("returns empty array for empty orders", () => {
    expect(filterByRestaurant([], "r1")).toHaveLength(0);
  });
});

// ============================================================
// sortNewestFirst
// ============================================================
describe("sortNewestFirst", () => {
  test("sorts orders by placedAt descending", () => {
    const result = sortNewestFirst(makeOrders());
    expect(result[0].id).toBe("ORD-2"); // 12:00
    expect(result[1].id).toBe("ORD-3"); // 11:00
    expect(result[2].id).toBe("ORD-1"); // 10:00
  });

  test("does not mutate original array", () => {
    const orders = makeOrders();
    sortNewestFirst(orders);
    expect(orders[0].id).toBe("ORD-1");
  });

  test("handles single order", () => {
    const result = sortNewestFirst([makeOrders()[0]]);
    expect(result).toHaveLength(1);
  });
});

// ============================================================
// isValidTransition
// ============================================================
describe("isValidTransition", () => {
  test("allows forward transitions", () => {
    expect(isValidTransition("pending", "accepted")).toBe(true);
    expect(isValidTransition("accepted", "preparing")).toBe(true);
    expect(isValidTransition("preparing", "ready")).toBe(true);
    expect(isValidTransition("ready", "completed")).toBe(true);
  });

  test("allows skipping statuses", () => {
    expect(isValidTransition("pending", "completed")).toBe(true);
  });

  test("rejects backward transitions", () => {
    expect(isValidTransition("accepted", "pending")).toBe(false);
    expect(isValidTransition("completed", "pending")).toBe(false);
  });

  test("rejects same-status transition", () => {
    expect(isValidTransition("pending", "pending")).toBe(false);
  });

  test("rejects unknown statuses", () => {
    expect(isValidTransition("pending", "cancelled")).toBe(false);
    expect(isValidTransition("unknown", "accepted")).toBe(false);
  });
});

// ============================================================
// ORDER_STATUSES constant
// ============================================================
describe("ORDER_STATUSES", () => {
  test("contains all five statuses in order", () => {
    expect(ORDER_STATUSES).toEqual(["pending", "accepted", "preparing", "ready", "completed"]);
  });
});
