const restaurantNameEl = document.getElementById("restaurantName");
const statusEl = document.getElementById("status");
const menuListEl = document.getElementById("menuList");
const cartCountEl = document.getElementById("cartCount");

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
}

// --- US-03 T2: Cart helpers (localStorage) ---
const CART_KEY = "feedme_cart";

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item, rid, restaurantName) {
  const cart = loadCart();
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, qty: 1, rid, restaurantName });
  }
  saveCart(cart);
}

function updateCartCount() {
  const count = loadCart().reduce((sum, c) => sum + c.qty, 0);
  cartCountEl.textContent = count > 0 ? `Cart (${count})` : "Cart";
}

// --- US-03 T1+T2+T4: Render menu with wired buttons ---
function renderMenu(items, rid, restaurantName) {
  menuListEl.innerHTML = "";
  if (!items || items.length === 0) {
    statusEl.textContent = "No menu items found for this restaurant.";
    return;
  }

  statusEl.textContent = `Showing ${items.length} item(s).`;

  for (const item of items) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <div class="meta">
        <span class="badge">$${item.price.toFixed(2)}</span>
      </div>
      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn" type="button" data-id="${item.id}">Add to cart</button>
        <span class="add-feedback" style="display:none; color:#7ecb7e; align-self:center;">Added!</span>
      </div>
    `;

    const btn = card.querySelector("button");
    const feedback = card.querySelector(".add-feedback");

    btn.addEventListener("click", () => {
      addToCart(item, rid, restaurantName);
      updateCartCount();
      // T4: brief visual feedback
      feedback.style.display = "inline";
      btn.disabled = true;
      setTimeout(() => {
        feedback.style.display = "none";
        btn.disabled = false;
      }, 1000);
    });

    menuListEl.appendChild(card);
  }
}

async function main() {
  const rid = getQueryParam("rid");
  const restaurantName = decodeURIComponent(getQueryParam("name") || "Restaurant");
  restaurantNameEl.textContent = restaurantName;
  updateCartCount();

  if (!rid) {
    statusEl.textContent = "Missing restaurant id (rid). Go back and select a restaurant.";
    return;
  }

  try {
    const res = await fetch("./data/menus.json");
    const menus = await res.json();
    renderMenu(menus[rid], rid, restaurantName);
  } catch (e) {
    statusEl.textContent = "Failed to load menu data. Open with Live Server.";
    console.error(e);
  }
}

main();