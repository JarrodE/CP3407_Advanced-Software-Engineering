/**
 * checkout-logic.js — Pure business logic for checkout validation and order creation.
 * No DOM or localStorage dependencies.
 */

/**
 * Validate customer checkout fields.
 *
 * @param {string} name
 * @param {string} address
 * @param {string} phone
 * @returns {Object} { valid: boolean, errors: { name?, address?, phone? } }
 */
function validateCheckout(name, address, phone) {
  const errors = {};
  let valid = true;

  if (!name || !name.trim()) {
    errors.name = "Name is required.";
    valid = false;
  }
  if (!address || !address.trim()) {
    errors.address = "Address is required.";
    valid = false;
  }

  const phoneClean = (phone || "").replace(/\s/g, "");
  if (!phoneClean) {
    errors.phone = "Phone is required.";
    valid = false;
  } else if (!/^\+?[\d]{7,15}$/.test(phoneClean)) {
    errors.phone = "Enter a valid phone number.";
    valid = false;
  }

  return { valid, errors };
}

/**
 * Generate a unique order ID.
 *
 * @param {number} [timestamp] Optional timestamp for deterministic testing
 * @returns {string} e.g. "ORD-M1ABC2D"
 */
function generateOrderId(timestamp) {
  const ts = timestamp || Date.now();
  return "ORD-" + ts.toString(36).toUpperCase();
}

/**
 * Build an order object from cart and customer data.
 *
 * @param {Array} cart
 * @param {Object} customer { name, address, phone }
 * @param {string} orderId
 * @returns {Object} order
 */
function buildOrder(cart, customer, orderId) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  return {
    id: orderId,
    placedAt: new Date().toISOString(),
    customer: {
      name: customer.name.trim(),
      address: customer.address.trim(),
      phone: customer.phone.trim(),
    },
    restaurantId: cart[0]?.rid || null,
    restaurantName: cart[0]?.restaurantName || null,
    items: cart,
    total,
    status: "pending",
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateCheckout, generateOrderId, buildOrder };
}
