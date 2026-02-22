const listEl = document.getElementById("list");
const statusEl = document.getElementById("status");
const searchEl = document.getElementById("search");
const categoryEl = document.getElementById("category");

let restaurants = [];

function render(items) {
  listEl.innerHTML = "";
  if (items.length === 0) {
    statusEl.textContent = "No restaurants match your filters.";
    return;
  }
  statusEl.textContent = `Showing ${items.length} restaurant(s).`;

    for (const r of items) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.cursor = "pointer";

    card.innerHTML = `
      <h3>${r.name}</h3>
      <div class="meta">
        <span class="badge">${r.category}</span>
        <span class="badge">⭐ ${r.rating.toFixed(1)}</span>
        <span class="badge">⏱️ ${r.etaMins} min</span>
      </div>
      <div class="status" style="margin-top:10px;">Click to view menu →</div>
    `;

    card.addEventListener("click", () => {
      const url = `./menu.html?rid=${encodeURIComponent(r.id)}&name=${encodeURIComponent(r.name)}`;
      window.location.href = url;
    });

    listEl.appendChild(card);
  }
}

function applyFilters() {
  const q = searchEl.value.trim().toLowerCase();
  const cat = categoryEl.value;

  const filtered = restaurants.filter(r => {
    const matchesText = !q || r.name.toLowerCase().includes(q);
    const matchesCat = !cat || r.category === cat;
    return matchesText && matchesCat;
  });

  render(filtered);
}

function loadCategories() {
  const cats = Array.from(new Set(restaurants.map(r => r.category))).sort();
  for (const c of cats) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    categoryEl.appendChild(opt);
  }
}

async function main() {
  try {
    statusEl.textContent = "Loading restaurants...";
    const res = await fetch("./data/restaurants.json");
    restaurants = await res.json();
    loadCategories();
    statusEl.textContent = "";
    render(restaurants);
  } catch (e) {
    statusEl.textContent = "Failed to load data. Open with Live Server (recommended).";
    console.error(e);
  }
}

searchEl.addEventListener("input", applyFilters);
categoryEl.addEventListener("change", applyFilters);

main();
