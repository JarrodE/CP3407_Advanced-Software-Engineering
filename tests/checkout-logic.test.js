/**
 * Unit tests for checkout-logic.js
 * Covers: validateCheckout, generateOrderId, buildOrder
 */

const { validateCheckout, generateOrderId, buildOrder } = require("../prototype/js/lib/checkout-logic");

// ============================================================
// validateCheckout
// ============================================================
describe("validateCheckout", () => {
  test("passes with valid inputs", () => {
    const result = validateCheckout("John Doe", "123 Main St", "+61412345678");
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test("fails when name is empty", () => {
    const result = validateCheckout("", "123 Main St", "0412345678");
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe("Name is required.");
  });

  test("fails when name is whitespace only", () => {
    const result = validateCheckout("   ", "123 Main St", "0412345678");
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe("Name is required.");
  });

  test("fails when address is empty", () => {
    const result = validateCheckout("John", "", "0412345678");
    expect(result.valid).toBe(false);
    expect(result.errors.address).toBe("Address is required.");
  });

  test("fails when phone is empty", () => {
    const result = validateCheckout("John", "123 Main St", "");
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBe("Phone is required.");
  });

  test("fails with too-short phone number", () => {
    const result = validateCheckout("John", "123 Main St", "12345");
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBe("Enter a valid phone number.");
  });

  test("fails with phone containing letters", () => {
    const result = validateCheckout("John", "123 Main St", "041abc5678");
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBe("Enter a valid phone number.");
  });

  test("accepts phone with international prefix", () => {
    const result = validateCheckout("John", "123 Main St", "+6591234567");
    expect(result.valid).toBe(true);
  });

  test("accepts phone with spaces (spaces stripped)", () => {
    const result = validateCheckout("John", "123 Main St", "0412 345 678");
    expect(result.valid).toBe(true);
  });

  test("collects multiple errors at once", () => {
    const result = validateCheckout("", "", "abc");
    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors)).toHaveLength(3);
  });

  test("handles null/undefined inputs gracefully", () => {
    const result = validateCheckout(null, undefined, null);
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.address).toBeDefined();
    expect(result.errors.phone).toBeDefined();
  });
});

// ============================================================
// generateOrderId
// ============================================================
describe("generateOrderId", () => {
  test("starts with ORD- prefix", () => {
    const id = generateOrderId();
    expect(id).toMatch(/^ORD-/);
  });

  test("produces deterministic output for a given timestamp", () => {
    const id = generateOrderId(1000000);
    expect(id).toBe("ORD-" + (1000000).toString(36).toUpperCase());
  });

  test("generates unique IDs for different timestamps", () => {
    const id1 = generateOrderId(1000000);
    const id2 = generateOrderId(1000001);
    expect(id1).not.toBe(id2);
  });

  test("contains only uppercase alphanumeric chars after prefix", () => {
    const id = generateOrderId(Date.now());
    const suffix = id.replace("ORD-", "");
    expect(suffix).toMatch(/^[A-Z0-9]+$/);
  });
});

// ============================================================
// buildOrder
// ============================================================
describe("buildOrder", () => {
  const cart = [
    { id: "m1", name: "Pad Thai", price: 12.50, qty: 2, rid: "r1", restaurantName: "Thai Palace" },
    { id: "m2", name: "Spring Roll", price: 5.00, qty: 3, rid: "r1", restaurantName: "Thai Palace" },
  ];
  const customer = { name: "Jane ", address: " 456 Oak Ave ", phone: " +61400000000 " };

  test("builds complete order object", () => {
    const order = buildOrder(cart, customer, "ORD-TEST1");
    expect(order.id).toBe("ORD-TEST1");
    expect(order.status).toBe("pending");
    expect(order.customer.name).toBe("Jane");
    expect(order.customer.address).toBe("456 Oak Ave");
    expect(order.restaurantId).toBe("r1");
    expect(order.restaurantName).toBe("Thai Palace");
  });

  test("calculates total correctly", () => {
    const order = buildOrder(cart, customer, "ORD-TEST2");
    // 12.50*2 + 5.00*3 = 40.00
    expect(order.total).toBeCloseTo(40.00);
  });

  test("includes ISO date string", () => {
    const order = buildOrder(cart, customer, "ORD-TEST3");
    expect(order.placedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  test("handles empty cart gracefully", () => {
    const order = buildOrder([], { name: "X", address: "Y", phone: "Z" }, "ORD-EMPTY");
    expect(order.total).toBe(0);
    expect(order.restaurantId).toBeNull();
  });
});
