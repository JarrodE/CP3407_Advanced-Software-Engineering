// US-09: Customer "My Orders" page — track order status

const ORDERS_KEY = "feedme_orders";

const statusEl = document.getElementById("status");
const ordersListEl = document.getElementById("ordersList");

const STATUS_COLOR = {
  pending:          "#e8c87e",
  accepted:         "#7ec8e8",
  preparing:        "#c87ee8",
  ready:            "#7ecb7e",
  "out for delivery": "#e87e7e",
  completed:        "#777",
};

function loadOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch { return []; }
}

function renderOrders() {
  ordersListEl.innerHTML = "";
  const orders = loadOrders();

  if (orders.length === 0) {
    statusEl.textContent = "No orders yet. Place an order to track it here.";
    return;
  }

  // Sort newest first
  orders.sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));
  statusEl.textContent = `${orders.length} order(s)`;

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.marginBottom = "12px";

    const statusColor = STATUS_COLOR[order.status] || "#e8e8e8";
    const placed = new Date(order.placedAt).toLocaleString();

    const itemRows = order.items.map(i =>
      `<div class="meta" style="margin-bottom:3px;">
        <span class="badge">${i.name}</span>
        <span class="badge">× ${i.qty}</span>
        <span class="badge">$${(i.price * i.qty).toFixed(2)}</span>
      </div>`
    ).join("");

    const driverInfo = order.driverName
      ? `<span class="badge">Driver: ${order.driverName}</span>`
      : "";

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <div>
          <strong>${order.id}</strong>
          <div class="meta" style="margin-top:4px;">
            <span class="badge">${placed}</span>
            <span class="badge" style="color:${statusColor};">● ${order.status}</span>
            ${driverInfo}
          </div>
        </div>
        <div style="font-size:1.1rem; font-weight:bold;">$${order.total.toFixed(2)}</div>
      </div>

      <div class="meta" style="margin-bottom:10px;">
        <span class="badge">🍽 ${order.restaurantName || "Restaurant"}</span>
        <span class="badge">📍 ${order.customer.address}</span>
      </div>

      <div style="margin-bottom:6px;">${itemRows}</div>`;

    ordersListEl.appendChild(card);
  });
}

document.getElementById("refreshBtn").addEventListener("click", renderOrders);

renderOrders();
