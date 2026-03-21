/**
 * menu-logic.js — Pure business logic for menu management (US-06).
 * No DOM or localStorage dependencies.
 */

/**
 * Get the effective menu for a restaurant.
 * Custom menus override seed menus; returns a copy.
 *
 * @param {Object} customMenus  { [rid]: [...items] }
 * @param {Object} seedMenus    { [rid]: [...items] }
 * @param {string} rid
 * @returns {Array}
 */
function getMenu(customMenus, seedMenus, rid) {
  if (customMenus[rid]) return customMenus[rid].map(i => ({ ...i }));
  if (seedMenus[rid]) return seedMenus[rid].map(i => ({ ...i }));
  return [];
}

/**
 * Add a new item to a menu.
 *
 * @param {Array} menu  Current menu items
 * @param {Object} item { id, name, price, available }
 * @returns {Array} New menu array
 */
function addMenuItem(menu, item) {
  if (!item.name || !item.name.trim()) throw new Error("Name is required.");
  if (typeof item.price !== "number" || isNaN(item.price) || item.price < 0) {
    throw new Error("Enter a valid price.");
  }
  return [...menu, { ...item, name: item.name.trim() }];
}

/**
 * Delete a menu item by id.
 *
 * @param {Array} menu
 * @param {string} itemId
 * @returns {Array}
 */
function deleteMenuItem(menu, itemId) {
  return menu.filter(i => i.id !== itemId);
}

/**
 * Edit a menu item (replace matching id with new data).
 *
 * @param {Array} menu
 * @param {string} itemId
 * @param {Object} updates { name?, price?, available? }
 * @returns {Array}
 */
function editMenuItem(menu, itemId, updates) {
  if (updates.name !== undefined && !updates.name.trim()) throw new Error("Name is required.");
  if (updates.price !== undefined && (isNaN(updates.price) || updates.price < 0)) {
    throw new Error("Enter a valid price.");
  }
  return menu.map(i =>
    i.id === itemId ? { ...i, ...updates } : i
  );
}

/**
 * Validate a menu item's fields.
 *
 * @param {string} name
 * @param {number} price
 * @returns {Object} { valid, errors: { name?, price? } }
 */
function validateMenuItem(name, price) {
  const errors = {};
  let valid = true;
  if (!name || !name.trim()) { errors.name = "Name is required."; valid = false; }
  if (isNaN(price) || price < 0) { errors.price = "Enter a valid price."; valid = false; }
  return { valid, errors };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { getMenu, addMenuItem, deleteMenuItem, editMenuItem, validateMenuItem };
}
