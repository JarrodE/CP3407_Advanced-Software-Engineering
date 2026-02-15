const restaurantNameEl = document.getElementById("restaurantName");
const statusEl = document.getElementById("status");
const menuListEl = document.getElementById("menuList");

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
}

function renderMenu(items) {
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
    `;
    menuListEl.appendChild(card);
  }
}

async function main() {
  const rid = getQueryParam("rid");
  const rname = decodeURIComponent(getQueryParam("name") || "Restaurant");
  restaurantNameEl.textContent = rname;

  if (!rid) {
    statusEl.textContent = "Missing restaurant id (rid). Go back and select a restaurant.";
    return;
  }

  try {
    const res = await fetch("./data/menus.json");
    const menus = await res.json();
    renderMenu(menus[rid]);
  } catch (e) {
    statusEl.textContent = "Failed to load menu data. Open with Live Server.";
    console.error(e);
  }
}

main();
