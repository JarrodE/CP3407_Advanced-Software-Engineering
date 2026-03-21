/**
 * filter-logic.js — Pure business logic for restaurant filtering (US-01, US-02).
 */

/**
 * Filter restaurants by text search and/or category.
 *
 * @param {Array} restaurants  Array of { id, name, category, rating, etaMins }
 * @param {string} query       Free-text search (matched against name)
 * @param {string} category    Category filter (empty string = all)
 * @returns {Array} Filtered restaurants
 */
function filterRestaurants(restaurants, query, category) {
  const q = (query || "").trim().toLowerCase();
  const cat = (category || "").trim();

  return restaurants.filter(r => {
    const matchesText = !q || r.name.toLowerCase().includes(q);
    const matchesCat = !cat || r.category === cat;
    return matchesText && matchesCat;
  });
}

/**
 * Extract unique sorted categories from a restaurant list.
 *
 * @param {Array} restaurants
 * @returns {Array<string>}
 */
function extractCategories(restaurants) {
  return Array.from(new Set(restaurants.map(r => r.category))).sort();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { filterRestaurants, extractCategories };
}
