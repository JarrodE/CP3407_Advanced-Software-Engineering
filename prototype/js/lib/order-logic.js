/**
 * order-logic.js — Pure business logic for order management.
 * Used by the restaurant portal (US-07, US-08).
 */

const ORDER_STATUSES = ["pending", "accepted", "preparing", "ready", "completed"];

/**
 * Update the status of a single order in an orders array.
 *
 * @param {Array} orders  All orders
 * @param {string} orderId
 * @param {string} newStatus  Must be one of ORDER_STATUSES
 * @returns {Array} Updated orders array (new)
 */
function updateOrderStatus(orders, orderId, newStatus) {
  if (!ORDER_STATUSES.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }
  return orders.map(o =>
    o.id === orderId ? { ...o, status: newStatus } : o
  );
}

/**
 * Filter orders by restaurant id.
 *
 * @param {Array} orders
 * @param {string} rid
 * @returns {Array}
 */
function filterByRestaurant(orders, rid) {
  return orders.filter(o => o.restaurantId === rid);
}

/**
 * Sort orders newest-first by placedAt date.
 *
 * @param {Array} orders
 * @returns {Array} New sorted array
 */
function sortNewestFirst(orders) {
  return [...orders].sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));
}

/**
 * Check whether a status transition is valid (forward-only progression).
 *
 * @param {string} currentStatus
 * @param {string} newStatus
 * @returns {boolean}
 */
function isValidTransition(currentStatus, newStatus) {
  const currentIdx = ORDER_STATUSES.indexOf(currentStatus);
  const newIdx = ORDER_STATUSES.indexOf(newStatus);
  return currentIdx !== -1 && newIdx !== -1 && newIdx > currentIdx;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ORDER_STATUSES, updateOrderStatus, filterByRestaurant, sortNewestFirst, isValidTransition };
}
