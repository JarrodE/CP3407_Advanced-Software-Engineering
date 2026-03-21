/**
 * Unit tests for filter-logic.js
 * Covers: filterRestaurants, extractCategories
 */

const { filterRestaurants, extractCategories } = require("../prototype/js/lib/filter-logic");

// --- Fixtures ---
const RESTAURANTS = [
  { id: "r1", name: "Thai Palace", category: "Thai", rating: 4.5, etaMins: 30 },
  { id: "r2", name: "Sushi Bar", category: "Japanese", rating: 4.8, etaMins: 25 },
  { id: "r3", name: "Burger Joint", category: "Western", rating: 4.0, etaMins: 20 },
  { id: "r4", name: "Thai Garden", category: "Thai", rating: 4.2, etaMins: 35 },
];

// ============================================================
// filterRestaurants
// ============================================================
describe("filterRestaurants", () => {
  test("returns all when no filters applied", () => {
    const result = filterRestaurants(RESTAURANTS, "", "");
    expect(result).toHaveLength(4);
  });

  test("filters by text search (case-insensitive)", () => {
    const result = filterRestaurants(RESTAURANTS, "thai", "");
    expect(result).toHaveLength(2);
    expect(result.map(r => r.id)).toEqual(["r1", "r4"]);
  });

  test("filters by category", () => {
    const result = filterRestaurants(RESTAURANTS, "", "Japanese");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("r2");
  });

  test("combines text and category filters", () => {
    const result = filterRestaurants(RESTAURANTS, "palace", "Thai");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Thai Palace");
  });

  test("returns empty when nothing matches", () => {
    const result = filterRestaurants(RESTAURANTS, "pizza", "");
    expect(result).toHaveLength(0);
  });

  test("trims whitespace from query", () => {
    const result = filterRestaurants(RESTAURANTS, "  sushi  ", "");
    expect(result).toHaveLength(1);
  });

  test("handles null/undefined inputs", () => {
    const result = filterRestaurants(RESTAURANTS, null, undefined);
    expect(result).toHaveLength(4);
  });
});

// ============================================================
// extractCategories
// ============================================================
describe("extractCategories", () => {
  test("extracts unique sorted categories", () => {
    const result = extractCategories(RESTAURANTS);
    expect(result).toEqual(["Japanese", "Thai", "Western"]);
  });

  test("removes duplicates", () => {
    const result = extractCategories(RESTAURANTS);
    // Thai appears twice in data, but only once in result
    expect(result.filter(c => c === "Thai")).toHaveLength(1);
  });

  test("returns empty array for empty input", () => {
    expect(extractCategories([])).toEqual([]);
  });
});
