/**
 * Unit tests for menu-logic.js
 * Covers: getMenu, addMenuItem, deleteMenuItem, editMenuItem, validateMenuItem
 */

const { getMenu, addMenuItem, deleteMenuItem, editMenuItem, validateMenuItem } = require("../prototype/js/lib/menu-logic");

// --- Fixtures ---
const SEED = {
  r1: [
    { id: "s1", name: "Pad Thai", price: 12.50, available: true },
    { id: "s2", name: "Spring Roll", price: 5.00, available: true },
  ],
};

const CUSTOM = {
  r1: [
    { id: "c1", name: "Custom Noodle", price: 10.00, available: true },
  ],
};

// ============================================================
// getMenu
// ============================================================
describe("getMenu", () => {
  test("returns custom menu when available", () => {
    const result = getMenu(CUSTOM, SEED, "r1");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Custom Noodle");
  });

  test("falls back to seed menu when no custom", () => {
    const result = getMenu({}, SEED, "r1");
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Pad Thai");
  });

  test("returns empty array for unknown restaurant", () => {
    const result = getMenu({}, SEED, "r999");
    expect(result).toEqual([]);
  });

  test("returns a copy (not a reference)", () => {
    const result = getMenu({}, SEED, "r1");
    result[0].name = "Modified";
    expect(SEED.r1[0].name).toBe("Pad Thai"); // original unmodified
  });
});

// ============================================================
// addMenuItem
// ============================================================
describe("addMenuItem", () => {
  const menu = [{ id: "s1", name: "Pad Thai", price: 12.50, available: true }];

  test("adds a new item to the menu", () => {
    const result = addMenuItem(menu, { id: "s3", name: "Mango Salad", price: 8.00, available: true });
    expect(result).toHaveLength(2);
    expect(result[1].name).toBe("Mango Salad");
  });

  test("trims item name", () => {
    const result = addMenuItem(menu, { id: "s4", name: "  Soup  ", price: 6.00, available: true });
    expect(result[1].name).toBe("Soup");
  });

  test("throws when name is empty", () => {
    expect(() => addMenuItem(menu, { id: "s5", name: "", price: 5.00 })).toThrow("Name is required");
  });

  test("throws when price is negative", () => {
    expect(() => addMenuItem(menu, { id: "s6", name: "Test", price: -1 })).toThrow("valid price");
  });

  test("throws when price is NaN", () => {
    expect(() => addMenuItem(menu, { id: "s7", name: "Test", price: NaN })).toThrow("valid price");
  });

  test("does not mutate original menu", () => {
    addMenuItem(menu, { id: "s8", name: "New", price: 7.00, available: true });
    expect(menu).toHaveLength(1);
  });
});

// ============================================================
// deleteMenuItem
// ============================================================
describe("deleteMenuItem", () => {
  const menu = [
    { id: "s1", name: "Pad Thai", price: 12.50 },
    { id: "s2", name: "Spring Roll", price: 5.00 },
  ];

  test("removes item by id", () => {
    const result = deleteMenuItem(menu, "s1");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("s2");
  });

  test("returns same array when id not found", () => {
    const result = deleteMenuItem(menu, "nonexistent");
    expect(result).toHaveLength(2);
  });
});

// ============================================================
// editMenuItem
// ============================================================
describe("editMenuItem", () => {
  const menu = [
    { id: "s1", name: "Pad Thai", price: 12.50, available: true },
    { id: "s2", name: "Spring Roll", price: 5.00, available: true },
  ];

  test("updates matching item fields", () => {
    const result = editMenuItem(menu, "s1", { name: "Pad Thai Special", price: 15.00 });
    expect(result[0].name).toBe("Pad Thai Special");
    expect(result[0].price).toBe(15.00);
  });

  test("leaves non-matching items unchanged", () => {
    const result = editMenuItem(menu, "s1", { name: "Updated" });
    expect(result[1].name).toBe("Spring Roll");
  });

  test("can toggle availability", () => {
    const result = editMenuItem(menu, "s1", { available: false });
    expect(result[0].available).toBe(false);
  });

  test("throws when name updated to empty", () => {
    expect(() => editMenuItem(menu, "s1", { name: "  " })).toThrow("Name is required");
  });

  test("throws when price updated to negative", () => {
    expect(() => editMenuItem(menu, "s1", { price: -5 })).toThrow("valid price");
  });
});

// ============================================================
// validateMenuItem
// ============================================================
describe("validateMenuItem", () => {
  test("passes with valid data", () => {
    const result = validateMenuItem("Burger", 9.99);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test("fails with empty name", () => {
    const result = validateMenuItem("", 9.99);
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  test("fails with negative price", () => {
    const result = validateMenuItem("Burger", -1);
    expect(result.valid).toBe(false);
    expect(result.errors.price).toBeDefined();
  });

  test("accepts zero price (free items)", () => {
    const result = validateMenuItem("Water", 0);
    expect(result.valid).toBe(true);
  });

  test("collects both errors at once", () => {
    const result = validateMenuItem("", NaN);
    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors)).toHaveLength(2);
  });
});
