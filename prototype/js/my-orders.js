// US-09: Customer tracks order status
// Shows all orders placed by the customer, with live status display.

const ORDERS_KEY = "feedme_orders";
const statusEl = document.getElementById("status");
const ordersListEl = document.getElementById("ordersList");
const refreshBtn = document.getElementById("refreshBtn");

function loadOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch { return []; }
}

const STATUS_LABELS = {
  pending: { text: "Order placed — waiting for restaurant", color: "#e8c87e", icon: "⏳" },
  accepted: { text: "Restaurant accepted your order", color: "#7ec8e8", icon: "✅" },
  preparing: { text: "Your food is being prepared", color: "#c87ee8", icon: "👨‍🍳" },
  ready: { text: "Ready for pickup / on its way!", color: "#7ecb7e", icon: "🚗" },
  completed: { text: "Delivered — enjoy your meal!", color: "#777", icon: "🎉" },
};

function renderOrders() {
  const orders = loadOrders();
  ordersListEl.innerHTML = "";

  if (orders.length === 0) {
    statusEl.textContent = "You haven't placed any orders yet.";
    return;
  }

  // Sort newest first
  orders.sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));
  statusEl.textContent = `${orders.length} order(s)`;

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.marginBottom = "12px";

    const info = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
    const placed = new Date(order.placedAt).toLocaleString();

    const itemRows = order.items.map(i =>
      `<div class="meta" style="margin-bottom:3px;">
        <span class="badge">${i.name}</span>
        <span class="badge">× ${i.qty}</span>
        <span class="badge">$${(i.price * i.qty).toFixed(2)}</span>
      </div>`
    ).join("");

    // Status progress bar
    const steps = ["pending", "accepted", "preparing", "ready", "completed"];
    const currentIdx = steps.indexOf(order.status);
    const progressBar = steps.map((s, i) => {
      const active = i <= currentIdx;
      return `<div style="
        flex:1; height:6px; border-radius:3px;
        background:${active ? info.color : '#333'};
        transition: background 0.3s;
      "></div>`;
    }).join("");

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <div>
          <strong>${order.id}</strong>
          <div class="meta" style="margin-top:4px;">
            <span class="badge">${placed}</span>
            <span class="badge">${order.restaurantName || "Unknown"}</span>
          </div>
        </div>
        <div style="font-size:1.1rem; font-weight:bold;">$${order.total.toFixed(2)}</div>
      </div>

      <!-- Status display -->
      <div style="padding:12px; background:#1a1a2e; border-radius:8px; margin-bottom:12px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <span style="font-size:1.4rem;">${info.icon}</span>
          <span style="color:${info.color}; font-weight:bold;">${info.text}</span>
        </div>
        <div style="display:flex; gap:4px;">${progressBar}</div>
        <div class="meta" style="margin-top:6px;">
          ${steps.map((s, i) =>
            `<span style="font-size:0.7rem; color:${i <= currentIdx ? info.color : '#555'};">${s}</span>`
          ).join("")}
        </div>
      </div>

      <!-- Delivery info -->
      <div class="meta" style="margin-bottom:10px;">
        <span class="badge">📍 ${order.customer.address}</span>
        <span class="badge">📞 ${order.customer.phone}</span>
      </div>

      <!-- Order items -->
      <div>${itemRows}</div>
    `;

    ordersListEl.appendChild(card);
  });
}

// Refresh button to check for status updates
refreshBtn.addEventListener("click", () => {
  renderOrders();
  statusEl.textContent += " (refreshed)";
});

renderOrders();
