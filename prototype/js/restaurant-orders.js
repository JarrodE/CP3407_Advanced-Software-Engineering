// US-07: Restaurant views incoming orders
// US-08: Restaurant updates order status

const ORDERS_KEY = "feedme_orders";
const ORDER_STATUSES = ["pending", "accepted", "preparing", "ready", "completed"];

const restaurantSelect = document.getElementById("restaurantSelect");
const portalStatus = document.getElementById("portalStatus");
const ordersListEl = document.getElementById("ordersList");

let currentRid = null;

// --- localStorage helpers ---
function loadOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch { return []; }
}
function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// US-08: update a single order's status
function updateOrderStatus(orderId, newStatus) {
  const orders = loadOrders().map(o =>
    o.id === orderId ? { ...o, status: newStatus } : o
  );
  saveOrders(orders);
  renderOrders(currentRid);
}

// --- US-07: Render orders list ---
function renderOrders(rid) {
  ordersListEl.innerHTML = "";
  const orders = loadOrders().filter(o => o.restaurantId === rid);

  if (orders.length === 0) {
    portalStatus.textContent = "No orders yet for this restaurant.";
    return;
  }
  portalStatus.textContent = `${orders.length} order(s)`;

  // Sort newest first
  orders.sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.marginBottom = "12px";

    const statusColor = {
      pending: "#e8c87e",
      accepted: "#7ec8e8",
      preparing: "#c87ee8",
      ready: "#7ecb7e",
      completed: "#777",
    }[order.status] || "#e8e8e8";

    const itemRows = order.items.map(i =>
      `<div class="meta" style="margin-bottom:3px;">
        <span class="badge">${i.name}</span>
        <span class="badge">× ${i.qty}</span>
        <span class="badge">$${(i.price * i.qty).toFixed(2)}</span>
      </div>`
    ).join("");

    // US-08: status selector buttons
    const statusBtns = ORDER_STATUSES.map(s =>
      `<button class="btn status-btn${order.status === s ? ' btn-primary' : ''}"
        data-order="${order.id}" data-status="${s}"
        style="font-size:0.8rem; padding:6px 10px;"
        ${order.status === s ? 'disabled' : ''}>${s}</button>`
    ).join("");

    const placed = new Date(order.placedAt).toLocaleString();

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <div>
          <strong>${order.id}</strong>
          <div class="meta" style="margin-top:4px;">
            <span class="badge">${placed}</span>
            <span class="badge" style="color:${statusColor};">● ${order.status}</span>
          </div>
        </div>
        <div style="font-size:1.1rem; font-weight:bold;">$${order.total.toFixed(2)}</div>
      </div>

      <!-- Customer details (inline expand, always shown) -->
      <div class="meta" style="margin-bottom:10px;">
        <span class="badge">👤 ${order.customer.name}</span>
        <span class="badge">📍 ${order.customer.address}</span>
        <span class="badge">📞 ${order.customer.phone}</span>
      </div>

      <!-- Order items -->
      <div style="margin-bottom:12px;">${itemRows}</div>

      <!-- US-08: status controls -->
      <div>
        <div class="meta" style="margin-bottom:6px; font-size:0.85rem; color:#b6b6b6;">Update status:</div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">${statusBtns}</div>
      </div>`;

    // Wire status buttons
    card.querySelectorAll(".status-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        updateOrderStatus(btn.dataset.order, btn.dataset.status);
      });
    });

    ordersListEl.appendChild(card);
  });
}

// --- Restaurant selector ---
restaurantSelect.addEventListener("change", () => {
  currentRid = restaurantSelect.value;
  if (!currentRid) {
    ordersListEl.innerHTML = "";
    portalStatus.textContent = "Select a restaurant to see its orders.";
    return;
  }
  renderOrders(currentRid);
});

// --- Bootstrap ---
async function main() {
  try {
    const res = await fetch("./data/restaurants.json");
    const restaurants = await res.json();

    restaurants.forEach(r => {
      const opt = document.createElement("option");
      opt.value = r.id;
      opt.textContent = r.name;
      restaurantSelect.appendChild(opt);
    });

    // Auto-select if rid in query string
    const rid = new URLSearchParams(window.location.search).get("rid");
    if (rid) {
      restaurantSelect.value = rid;
      restaurantSelect.dispatchEvent(new Event("change"));
    }
  } catch (e) {
    portalStatus.textContent = "Failed to load data. Open with Live Server.";
    console.error(e);
  }
}

main();
