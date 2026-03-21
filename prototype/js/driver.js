// US-10: Driver accepts a delivery
// Shows orders that are "ready" for pickup. Driver can accept and mark as completed.

const ORDERS_KEY = "feedme_orders";
const DRIVER_KEY = "feedme_driver_assignments";

const statusEl = document.getElementById("status");
const deliveriesListEl = document.getElementById("deliveriesList");
const acceptedStatus = document.getElementById("acceptedStatus");
const acceptedListEl = document.getElementById("acceptedList");

function loadOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch { return []; }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function loadAssignments() {
  try { return JSON.parse(localStorage.getItem(DRIVER_KEY)) || []; }
  catch { return []; }
}

function saveAssignments(assignments) {
  localStorage.setItem(DRIVER_KEY, JSON.stringify(assignments));
}

// Accept a delivery: assigns it to the driver and updates order status
function acceptDelivery(orderId) {
  const orders = loadOrders();
  const updated = orders.map(o =>
    o.id === orderId ? { ...o, status: "completed", driverAssigned: true } : o
  );
  saveOrders(updated);

  // Track the assignment
  const assignments = loadAssignments();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    assignments.push({
      orderId: order.id,
      restaurantName: order.restaurantName,
      customerName: order.customer.name,
      address: order.customer.address,
      total: order.total,
      acceptedAt: new Date().toISOString(),
    });
    saveAssignments(assignments);
  }

  renderAll();
}

function renderAvailableDeliveries() {
  const orders = loadOrders().filter(o => o.status === "ready" && !o.driverAssigned);
  deliveriesListEl.innerHTML = "";

  if (orders.length === 0) {
    statusEl.textContent = "No deliveries available right now.";
    return;
  }

  statusEl.textContent = `${orders.length} delivery(ies) available`;

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.marginBottom = "12px";

    const placed = new Date(order.placedAt).toLocaleString();
    const itemSummary = order.items.map(i => `${i.name} ×${i.qty}`).join(", ");

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <div>
          <strong>${order.id}</strong>
          <div class="meta" style="margin-top:4px;">
            <span class="badge">${order.restaurantName || "Restaurant"}</span>
            <span class="badge">${placed}</span>
          </div>
        </div>
        <div style="font-size:1.1rem; font-weight:bold;">$${order.total.toFixed(2)}</div>
      </div>

      <div class="meta" style="margin-bottom:8px;">
        <span class="badge">📍 Deliver to: ${order.customer.address}</span>
        <span class="badge">👤 ${order.customer.name}</span>
      </div>

      <div class="meta" style="margin-bottom:12px;">
        <span class="badge">🍽️ ${itemSummary}</span>
      </div>

      <button class="btn btn-primary accept-btn" data-id="${order.id}">Accept delivery</button>
    `;

    card.querySelector(".accept-btn").addEventListener("click", () => {
      acceptDelivery(order.id);
    });

    deliveriesListEl.appendChild(card);
  });
}

function renderAcceptedJobs() {
  const assignments = loadAssignments();
  acceptedListEl.innerHTML = "";

  if (assignments.length === 0) {
    acceptedStatus.textContent = "No jobs accepted yet.";
    return;
  }

  // Sort newest first
  assignments.sort((a, b) => new Date(b.acceptedAt) - new Date(a.acceptedAt));
  acceptedStatus.textContent = `${assignments.length} completed delivery(ies)`;

  assignments.forEach(job => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.marginBottom = "8px";
    card.style.opacity = "0.7";

    const accepted = new Date(job.acceptedAt).toLocaleString();

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px;">
        <div>
          <strong>${job.orderId}</strong>
          <div class="meta" style="margin-top:4px;">
            <span class="badge">${job.restaurantName}</span>
            <span class="badge">📍 ${job.address}</span>
            <span class="badge">$${job.total.toFixed(2)}</span>
          </div>
        </div>
        <div class="meta">
          <span class="badge" style="color:#7ecb7e;">✅ Delivered</span>
          <span class="badge">${accepted}</span>
        </div>
      </div>
    `;

    acceptedListEl.appendChild(card);
  });
}

function renderAll() {
  renderAvailableDeliveries();
  renderAcceptedJobs();
}

renderAll();
