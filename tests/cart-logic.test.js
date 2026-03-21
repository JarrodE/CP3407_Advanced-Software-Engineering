/**
 * Unit tests for cart-logic.js
 * Covers: addToCart, updateQty, removeItem, cartTotal, cartItemCount, groupByRestaurant
 * TDD approach per Ch 8 of textbook.
 */

const { addToCart, updateQty, removeItem, cartTotal, cartItemCount, groupByRestaurant } = require("../prototype/js/lib/cart-logic");

// --- Fixtures ---
const ITEM_A = { id: "m1", name: "Pad Thai", price: 12.50 };
const ITEM_B = { id: "m2", name: "Green Curry", price: 14.00 };
const RID = "r1";
const RNAME = "Thai Palace";

function makeCart() {
  return [
    { id: "m1", name: "Pad Thai", price: 12.50, qty: 2, rid: "r1", restaurantName: "Thai Palace" },
    { id: "m2", name: "Green Curry", price: 14.00, qty: 1, rid: "r1", restaurantName: "Thai Palace" },
  ];
}

// ============================================================
// addToCart
// ============================================================
describe("addToCart", () => {
  test("adds a new item to an empty cart", () => {
    const result = addToCart([], ITEM_A, RID, RNAME);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: "m1", name: "Pad Thai", price: 12.50, qty: 1, rid: RID, restaurantName: RNAME });
  });

  test("increments qty when item already exists", () => {
    const cart = [{ id: "m1", name: "Pad Thai", price: 12.50, qty: 1, rid: RID, restaurantName: RNAME }];
    const result = addToCart(cart, ITEM_A, RID, RNAME);
    expect(result).toHaveLength(1);
    expect(result[0].qty).toBe(2);
  });

  test("does not mutate original cart", () => {
    const cart = [{ id: "m1", name: "Pad Thai", price: 12.50, qty: 1, rid: RID, restaurantName: RNAME }];
    const result = addToCart(cart, ITEM_B, RID, RNAME);
    expect(cart).toHaveLength(1); // original unchanged
    expect(result).toHaveLength(2);
  });

  test("handles adding items from different restaurants", () => {
    const cart = addToCart([], ITEM_A, "r1", "Thai Palace");
    const result = addToCart(cart, ITEM_B, "r2", "Sushi Bar");
    expect(result).toHaveLength(2);
    expect(result[1].rid).toBe("r2");
  });
});

// ============================================================
// updateQty
// ============================================================
describe("updateQty", () => {
  test("increments quantity by +1", () => {
    const cart = makeCart();
    const result = updateQty(cart, "m1", 1);
    expect(result.find(c => c.id === "m1").qty).toBe(3);
  });

  test("decrements quantity by -1", () => {
    const cart = makeCart();
    const result = updateQty(cart, "m1", -1);
    expect(result.find(c => c.id === "m1").qty).toBe(1);
  });

  test("removes item when qty reaches 0", () => {
    const cart = [{ id: "m1", name: "Pad Thai", price: 12.50, qty: 1, rid: RID, restaurantName: RNAME }];
    const result = updateQty(cart, "m1", -1);
    expect(result).toHaveLength(0);
  });

  test("removes item when qty goes negative", () => {
    const cart = [{ id: "m1", name: "Pad Thai", price: 12.50, qty: 1, rid: RID, restaurantName: RNAME }];
    const result = updateQty(cart, "m1", -5);
    expect(result).toHaveLength(0);
  });

  test("returns unchanged cart for non-existent item id", () => {
    const cart = makeCart();
    const result = updateQty(cart, "nonexistent", 1);
    expect(result).toHaveLength(2);
    expect(result).toEqual(cart);
  });

  test("does not mutate original cart", () => {
    const cart = makeCart();
    updateQty(cart, "m1", 1);
    expect(cart[0].qty).toBe(2); // original unchanged
  });
});

// ============================================================
// removeItem
// ============================================================
describe("removeItem", () => {
  test("removes item by id", () => {
    const cart = makeCart();
    const result = removeItem(cart, "m1");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("m2");
  });

  test("returns same-length array when id not found", () => {
    const cart = makeCart();
    const result = removeItem(cart, "nonexistent");
    expect(result).toHaveLength(2);
  });

  test("returns empty array when removing last item", () => {
    const cart = [{ id: "m1", name: "Pad Thai", price: 12.50, qty: 1, rid: RID, restaurantName: RNAME }];
    const result = removeItem(cart, "m1");
    expect(result).toHaveLength(0);
  });
});

// ============================================================
// cartTotal
// ============================================================
describe("cartTotal", () => {
  test("calculates total for multiple items", () => {
    const cart = makeCart(); // 12.50*2 + 14.00*1 = 39.00
    expect(cartTotal(cart)).toBeCloseTo(39.00);
  });

  test("returns 0 for empty cart", () => {
    expect(cartTotal([])).toBe(0);
  });

  test("handles single item", () => {
    const cart = [{ id: "m1", price: 9.99, qty: 3 }];
    expect(cartTotal(cart)).toBeCloseTo(29.97);
  });
});

// ============================================================
// cartItemCount
// ============================================================
describe("cartItemCount", () => {
  test("sums all quantities", () => {
    const cart = makeCart(); // 2 + 1 = 3
    expect(cartItemCount(cart)).toBe(3);
  });

  test("returns 0 for empty cart", () => {
    expect(cartItemCount([])).toBe(0);
  });
});

// ============================================================
// groupByRestaurant
// ============================================================
describe("groupByRestaurant", () => {
  test("groups items under their restaurant id", () => {
    const cart = makeCart();
    const groups = groupByRestaurant(cart);
    expect(Object.keys(groups)).toEqual(["r1"]);
    expect(groups["r1"].name).toBe("Thai Palace");
    expect(groups["r1"].items).toHaveLength(2);
  });

  test("separates items from different restaurants", () => {
    const cart = [
      { id: "m1", rid: "r1", restaurantName: "Thai Palace", price: 10, qty: 1 },
      { id: "m2", rid: "r2", restaurantName: "Sushi Bar", price: 15, qty: 2 },
    ];
    const groups = groupByRestaurant(cart);
    expect(Object.keys(groups)).toHaveLength(2);
    expect(groups["r2"].name).toBe("Sushi Bar");
  });

  test("returns empty object for empty cart", () => {
    expect(groupByRestaurant([])).toEqual({});
  });
});
