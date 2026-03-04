// US-05: Checkout — validate input, persist order, show confirmation

const CART_KEY = "feedme_cart";
const ORDERS_KEY = "feedme_orders";

const formSection = document.getElementById("formSection");
const confirmSection = document.getElementById("confirmSection");
const checkoutForm = document.getElementById("checkoutForm");
const cartSummaryEl = document.getElementById("cartSummary");
const confirmMsg = document.getElementById("confirmMsg");
const confirmDetails = document.getElementById("confirmDetails");
const formError = document.getElementById("formError");

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function loadOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch { return []; }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function generateOrderId() {
  return "ORD-" + Date.now().toString(36).toUpperCase();
}

// Show cart summary above the form
function renderCartSummary() {
  const cart = loadCart();
  if (cart.length === 0) {
    cartSummaryEl.innerHTML = '<p class="status">Your cart is empty. <a href="./index.html">Browse restaurants</a>.</p>';
    checkoutForm.querySelector("button[type=submit]").disabled = true;
    return;
  }
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const rows = cart.map(i =>
    `<div class="meta" style="margin-bottom:4px;">
      <span class="badge">${i.name}</span>
      <span class="badge">× ${i.qty}</span>
      <span class="badge">$${(i.price * i.qty).toFixed(2)}</span>
    </div>`
  ).join("");
  cartSummaryEl.innerHTML = `
    <div class="card">
      <strong>Order summary</strong>
      <div style="margin-top:8px;">${rows}</div>
      <div style="margin-top:10px; font-weight:bold;">Total: $${total.toFixed(2)}</div>
    </div>`;
}

// --- Validation ---
function setError(fieldId, msg) {
  document.getElementById(fieldId).textContent = msg;
}
function clearErrors() {
  ["errName", "errAddress", "errPhone"].forEach(id => document.getElementById(id).textContent = "");
  formError.textContent = "";
}

function validate(name, address, phone) {
  let valid = true;
  if (!name.trim()) { setError("errName", "Name is required."); valid = false; }
  if (!address.trim()) { setError("errAddress", "Address is required."); valid = false; }
  const phoneClean = phone.replace(/\s/g, "");
  if (!phoneClean) { setError("errPhone", "Phone is required."); valid = false; }
  else if (!/^\+?[\d]{7,15}$/.test(phoneClean)) { setError("errPhone", "Enter a valid phone number."); valid = false; }
  return valid;
}

// --- Submit ---
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const name = document.getElementById("custName").value;
  const address = document.getElementById("custAddress").value;
  const phone = document.getElementById("custPhone").value;

  if (!validate(name, address, phone)) return;

  const cart = loadCart();
  if (cart.length === 0) {
    formError.textContent = "Your cart is empty.";
    return;
  }

  // Persist order (DB stub via localStorage)
  const order = {
    id: generateOrderId(),
    placedAt: new Date().toISOString(),
    customer: { name: name.trim(), address: address.trim(), phone: phone.trim() },
    restaurantId: cart[0]?.rid || null,
    restaurantName: cart[0]?.restaurantName || null,
    items: cart,
    total: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    status: "pending",
  };

  const orders = loadOrders();
  orders.push(order);
  saveOrders(orders);

  // Clear cart
  localStorage.removeItem(CART_KEY);

  // Show confirmation
  showConfirmation(order);
});

function showConfirmation(order) {
  formSection.style.display = "none";
  confirmSection.style.display = "block";

  confirmMsg.textContent = `Order ${order.id} placed successfully! Pay on delivery.`;

  const rows = order.items.map(i =>
    `<div class="meta" style="margin-bottom:4px;">
      <span class="badge">${i.name}</span>
      <span class="badge">× ${i.qty}</span>
      <span class="badge">$${(i.price * i.qty).toFixed(2)}</span>
    </div>`
  ).join("");

  confirmDetails.innerHTML = `
    <div class="card">
      <div style="margin-bottom:10px;">
        <strong>Order ID:</strong> ${order.id}<br>
        <strong>Delivering to:</strong> ${order.customer.name}, ${order.customer.address}<br>
        <strong>Phone:</strong> ${order.customer.phone}
      </div>
      ${rows}
      <div style="margin-top:10px; font-weight:bold;">Total: $${order.total.toFixed(2)}</div>
      <div class="meta" style="margin-top:8px;"><span class="badge">Status: ${order.status}</span></div>
    </div>`;
}

renderCartSummary();
