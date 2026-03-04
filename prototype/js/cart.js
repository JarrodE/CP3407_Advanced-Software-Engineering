// US-03 T3: Cart page — list items + total
// US-03 T4: Clear cart + UX messages

const CART_KEY = "feedme_cart";
const statusEl = document.getElementById("status");
const cartListEl = document.getElementById("cartList");
const cartFooterEl = document.getElementById("cartFooter");
const cartTotalEl = document.getElementById("cartTotal");
const clearBtn = document.getElementById("clearBtn");

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderCart() {
  const cart = loadCart();
  cartListEl.innerHTML = "";

  if (cart.length === 0) {
    statusEl.textContent = "Your cart is empty.";
    cartFooterEl.style.display = "none";
    return;
  }

  statusEl.textContent = "";
  cartFooterEl.style.display = "block";

  // Group by restaurant for display
  const byRestaurant = {};
  for (const item of cart) {
    if (!byRestaurant[item.rid]) byRestaurant[item.rid] = { name: item.restaurantName, items: [] };
    byRestaurant[item.rid].items.push(item);
  }

  let grandTotal = 0;

  for (const rid of Object.keys(byRestaurant)) {
    const group = byRestaurant[rid];
    const section = document.createElement("div");
    section.style.marginBottom = "16px";

    const heading = document.createElement("h3");
    heading.textContent = group.name;
    heading.style.marginBottom = "10px";
    section.appendChild(heading);

    for (const item of group.items) {
      const subtotal = item.price * item.qty;
      grandTotal += subtotal;

      const card = document.createElement("div");
      card.className = "card";
      card.style.marginBottom = "8px";
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <strong>${item.name}</strong>
            <div class="meta" style="margin-top:4px;">
              <span class="badge">$${item.price.toFixed(2)} × ${item.qty}</span>
              <span class="badge">= $${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      `;
      section.appendChild(card);
    }

    cartListEl.appendChild(section);
  }

  cartTotalEl.textContent = `Total: $${grandTotal.toFixed(2)}`;
}

// T4: Clear cart
clearBtn.addEventListener("click", () => {
  saveCart([]);
  statusEl.textContent = "Cart cleared.";
  renderCart();
});

renderCart();
