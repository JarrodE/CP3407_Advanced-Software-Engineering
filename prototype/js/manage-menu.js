// US-06: Restaurant manages menu
// Custom menus are persisted to localStorage under feedme_menus (keyed by restaurantId).
// Falls back to the seed menus.json for restaurants with no customisation yet.

const MENUS_KEY = "feedme_menus";
const restaurantSelect = document.getElementById("restaurantSelect");
const menuSection = document.getElementById("menuSection");
const menuHeading = document.getElementById("menuHeading");
const menuListEl = document.getElementById("menuList");
const portalStatus = document.getElementById("portalStatus");
const addForm = document.getElementById("addForm");
const editOverlay = document.getElementById("editOverlay");
const editForm = document.getElementById("editForm");

let seedMenus = {}; // loaded from menus.json
let currentRid = null;

// --- localStorage helpers ---
function loadCustomMenus() {
  try { return JSON.parse(localStorage.getItem(MENUS_KEY)) || {}; }
  catch { return {}; }
}
function saveCustomMenus(menus) {
  localStorage.setItem(MENUS_KEY, JSON.stringify(menus));
}

// Returns the live menu for a restaurant (custom overrides seed)
function getMenu(rid) {
  const custom = loadCustomMenus();
  return custom[rid] ? custom[rid] : (seedMenus[rid] ? [...seedMenus[rid]] : []);
}

function saveMenu(rid, items) {
  const custom = loadCustomMenus();
  custom[rid] = items;
  saveCustomMenus(custom);
}

function generateId() {
  return "mi-" + Date.now().toString(36);
}

// --- Render ---
function renderMenuList(rid) {
  const items = getMenu(rid);
  menuListEl.innerHTML = "";

  if (items.length === 0) {
    menuListEl.innerHTML = '<p class="status">No items yet. Add one below.</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.marginBottom = "8px";
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div>
          <strong>${item.name}</strong>
          <div class="meta" style="margin-top:4px;">
            <span class="badge">$${Number(item.price).toFixed(2)}</span>
            <span class="badge" style="color:${item.available !== false ? '#7ecb7e' : '#e88'};">
              ${item.available !== false ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn" data-edit="${item.id}">Edit</button>
          <button class="btn btn-danger" data-del="${item.id}">Delete</button>
        </div>
      </div>`;

    card.querySelector(`[data-edit]`).addEventListener("click", () => openEdit(rid, item.id));
    card.querySelector(`[data-del]`).addEventListener("click", () => deleteItem(rid, item.id));
    menuListEl.appendChild(card);
  });
}

// --- Add item ---
addForm.addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("errNewName").textContent = "";
  document.getElementById("errNewPrice").textContent = "";

  const name = document.getElementById("newName").value.trim();
  const price = parseFloat(document.getElementById("newPrice").value);
  const available = document.getElementById("newAvail").checked;

  let valid = true;
  if (!name) { document.getElementById("errNewName").textContent = "Name is required."; valid = false; }
  if (isNaN(price) || price < 0) { document.getElementById("errNewPrice").textContent = "Enter a valid price."; valid = false; }
  if (!valid) return;

  const items = getMenu(currentRid);
  items.push({ id: generateId(), name, price, available });
  saveMenu(currentRid, items);

  addForm.reset();
  document.getElementById("newAvail").checked = true;
  renderMenuList(currentRid);
});

// --- Delete item ---
function deleteItem(rid, itemId) {
  const items = getMenu(rid).filter(i => i.id !== itemId);
  saveMenu(rid, items);
  renderMenuList(rid);
}

// --- Edit item ---
function openEdit(rid, itemId) {
  const item = getMenu(rid).find(i => i.id === itemId);
  if (!item) return;
  document.getElementById("editId").value = itemId;
  document.getElementById("editName").value = item.name;
  document.getElementById("editPrice").value = Number(item.price).toFixed(2);
  document.getElementById("editAvail").checked = item.available !== false;
  document.getElementById("errEditName").textContent = "";
  document.getElementById("errEditPrice").textContent = "";
  editOverlay.style.display = "flex";
}

editForm.addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("errEditName").textContent = "";
  document.getElementById("errEditPrice").textContent = "";

  const itemId = document.getElementById("editId").value;
  const name = document.getElementById("editName").value.trim();
  const price = parseFloat(document.getElementById("editPrice").value);
  const available = document.getElementById("editAvail").checked;

  let valid = true;
  if (!name) { document.getElementById("errEditName").textContent = "Name is required."; valid = false; }
  if (isNaN(price) || price < 0) { document.getElementById("errEditPrice").textContent = "Enter a valid price."; valid = false; }
  if (!valid) return;

  const items = getMenu(currentRid).map(i =>
    i.id === itemId ? { ...i, name, price, available } : i
  );
  saveMenu(currentRid, items);
  editOverlay.style.display = "none";
  renderMenuList(currentRid);
});

document.getElementById("cancelEdit").addEventListener("click", () => {
  editOverlay.style.display = "none";
});

// Close overlay on backdrop click
editOverlay.addEventListener("click", e => {
  if (e.target === editOverlay) editOverlay.style.display = "none";
});

// --- Restaurant selector ---
restaurantSelect.addEventListener("change", () => {
  currentRid = restaurantSelect.value;
  if (!currentRid) {
    menuSection.style.display = "none";
    portalStatus.textContent = "Select a restaurant to manage its menu.";
    return;
  }
  const selected = restaurantSelect.options[restaurantSelect.selectedIndex];
  menuHeading.textContent = `Menu — ${selected.textContent}`;
  portalStatus.textContent = "";
  menuSection.style.display = "block";
  renderMenuList(currentRid);
});

// --- Bootstrap: load restaurants + seed menus ---
async function main() {
  try {
    const [restRes, menuRes] = await Promise.all([
      fetch("./data/restaurants.json"),
      fetch("./data/menus.json"),
    ]);
    const restaurants = await restRes.json();
    seedMenus = await menuRes.json();

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
