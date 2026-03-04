// US-10: Driver portal — accept available deliveries

const ORDERS_KEY = "feedme_orders";

const statusEl      = document.getElementById("status");
const availableList = document.getElementById("availableList");
const acceptedList  = document.getElementById("acceptedList");
const acceptedStatus = document.getElementById("acceptedStatus");
const driverNameInput = document.getElementById("driverName");

function loadOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch { return []; }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// Accept a delivery job: assign driver, update status to "out for delivery"
function acceptJob(orderId) {
  const driverName = driverNameInput.value.trim() || "Driver";
  const orders = loadOrders().map(o =>
    o.id === orderId
      ? { ...o, status: "out for delivery", driverName }
      : o
  );
  saveOrders(orders);
  render();
}

function renderOrderCard(order, showAcceptBtn) {
  const placed = new Date(order.placedAt).toLocaleString();

  const itemRows = order.items.map(i =>
    `<div class="meta" style="margin-bottom:3px;">
      <span class="badge">${i.name}</span>
      <span class="badge">× ${i.qty}</span>
    </div>`
  ).join("");

  const acceptBtn = showAcceptBtn
    ? `<button class="btn btn-primary accept-btn" data-order="${order.id}"
         style="margin-top:12px;">Accept job</button>`
    : `<div class="meta" style="margin-top:10px;">
         <span class="badge" style="color:#e87e7e;">● out for delivery</span>
         <span class="badge">Driver: ${order.driverName || "you"}</span>
       </div>`;

  const card = document.createElement("div");
  card.className = "card";
  card.style.marginBottom = "12px";
  card.innerHTML = `
    <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
      <div>
        <strong>${order.id}</strong>
        <div class="meta" style="margin-top:4px;">
          <span class="badge">${placed}</span>
          <span class="badge">🍽 ${order.restaurantName || "Restaurant"}</span>
        </div>
      </div>
      <div style="font-size:1.1rem; font-weight:bold;">$${order.total.toFixed(2)}</div>
    </div>

    <div class="meta" style="margin-bottom:10px;">
      <span class="badge">📍 ${order.customer.address}</span>
      <span class="badge">👤 ${order.customer.name}</span>
    </div>

    <div style="margin-bottom:6px;">${itemRows}</div>
    ${acceptBtn}`;

  if (showAcceptBtn) {
    card.querySelector(".accept-btn").addEventListener("click", () => {
      acceptJob(order.id);
    });
  }

  return card;
}

function render() {
  availableList.innerHTML = "";
  acceptedList.innerHTML = "";

  const driverName = driverNameInput.value.trim() || "Driver";
  const orders = loadOrders();

  // Available: orders with status "ready" and no driver assigned
  const available = orders.filter(o => o.status === "ready");
  if (available.length === 0) {
    statusEl.textContent = "No deliveries available right now. Orders need 'ready' status from the restaurant.";
  } else {
    statusEl.textContent = `${available.length} delivery job(s) available.`;
    available.forEach(o => availableList.appendChild(renderOrderCard(o, true)));
  }

  // Accepted: orders assigned to this driver
  const accepted = orders.filter(o => o.driverName === driverName && o.status === "out for delivery");
  if (accepted.length === 0) {
    acceptedStatus.style.display = "block";
    acceptedStatus.textContent = "No accepted jobs yet.";
  } else {
    acceptedStatus.style.display = "none";
    accepted.forEach(o => acceptedList.appendChild(renderOrderCard(o, false)));
  }
}

driverNameInput.addEventListener("change", render);

render();
