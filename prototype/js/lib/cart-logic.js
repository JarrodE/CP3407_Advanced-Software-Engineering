/**
 * cart-logic.js — Pure business logic for cart operations.
 * No DOM or localStorage dependencies; fully testable.
 *
 * Each function takes the current cart array and returns a new cart array
 * (immutable pattern), plus any extra data the caller needs.
 */

/**
 * Add an item to the cart. If the item already exists (matched by id),
 * increment its quantity; otherwise push a new entry with qty = 1.
 *
 * @param {Array} cart  Current cart items
 * @param {Object} item { id, name, price }
 * @param {string} rid  Restaurant ID
 * @param {string} restaurantName
 * @returns {Array} Updated cart (new array)
 */
function addToCart(cart, item, rid, restaurantName) {
  const copy = cart.map(c => ({ ...c }));
  const existing = copy.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    copy.push({ id: item.id, name: item.name, price: item.price, qty: 1, rid, restaurantName });
  }
  return copy;
}

/**
 * Update item quantity by a delta. If the resulting qty <= 0, remove the item.
 *
 * @param {Array} cart   Current cart
 * @param {string} itemId
 * @param {number} delta  +1 or -1 (or any integer)
 * @returns {Array} Updated cart
 */
function updateQty(cart, itemId, delta) {
  const copy = cart.map(c => ({ ...c }));
  const idx = copy.findIndex(c => c.id === itemId);
  if (idx === -1) return copy;
  copy[idx].qty += delta;
  if (copy[idx].qty <= 0) copy.splice(idx, 1);
  return copy;
}

/**
 * Remove an item entirely from the cart.
 *
 * @param {Array} cart
 * @param {string} itemId
 * @returns {Array} Updated cart
 */
function removeItem(cart, itemId) {
  return cart.filter(c => c.id !== itemId);
}

/**
 * Calculate the grand total price of the cart.
 *
 * @param {Array} cart
 * @returns {number}
 */
function cartTotal(cart) {
  return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

/**
 * Count total items (sum of all quantities) in the cart.
 *
 * @param {Array} cart
 * @returns {number}
 */
function cartItemCount(cart) {
  return cart.reduce((sum, c) => sum + c.qty, 0);
}

/**
 * Group cart items by restaurant id.
 *
 * @param {Array} cart
 * @returns {Object} { [rid]: { name, items: [...] } }
 */
function groupByRestaurant(cart) {
  const groups = {};
  for (const item of cart) {
    if (!groups[item.rid]) {
      groups[item.rid] = { name: item.restaurantName, items: [] };
    }
    groups[item.rid].items.push(item);
  }
  return groups;
}

// Export for Node/Jest; guard for browser usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { addToCart, updateQty, removeItem, cartTotal, cartItemCount, groupByRestaurant };
}
