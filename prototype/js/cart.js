// US-03 T3: Cart page — list items + total
// US-03 T4: Clear cart + UX messages
// US-04:    Quantity controls (+ / -), remove item, recalculate totals

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

// US-04: change qty by delta; remove item if qty reaches 0
function updateQty(itemId, delta) {
  const cart = loadCart();
  const idx = cart.findIndex(c => c.id === itemId);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(cart);
  renderCart();
}

// US-04: remove item entirely
function removeItem(itemId) {
  const cart = loadCart().filter(c => c.id !== itemId);
  saveCart(cart);
  renderCart();
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
              <span class="badge">$${item.price.toFixed(2)} each</span>
              <span class="badge">= $${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="btn qty-btn" data-id="${item.id}" data-delta="-1">−</button>
            <span style="min-width:20px; text-align:center;">${item.qty}</span>
            <button class="btn qty-btn" data-id="${item.id}" data-delta="1">+</button>
            <button class="btn btn-danger remove-btn" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;

      card.querySelectorAll(".qty-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          updateQty(btn.dataset.id, Number(btn.dataset.delta));
        });
      });

      card.querySelector(".remove-btn").addEventListener("click", () => {
        removeItem(item.id);
      });

      section.appendChild(card);
    }

    cartListEl.appendChild(section);
  }

  // US-04: totals recalculated on every render
  cartTotalEl.textContent = `Total: $${grandTotal.toFixed(2)}`;
}

// T4: Clear cart
clearBtn.addEventListener("click", () => {
  saveCart([]);
  statusEl.textContent = "Cart cleared.";
  renderCart();
});

renderCart();
