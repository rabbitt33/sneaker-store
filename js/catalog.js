const PRICE_MAX = 10000;

const filtersState = {
  brands: new Set(),
  categories: new Set(),
  genders: new Set(),
  sizes: new Set(),
  maxPrice: PRICE_MAX,
  saleOnly: false,
  onlyNew: false,
  q: "",
  sort: "popular",
};

function readURLState() {
  const params = new URLSearchParams(location.search);
  const addAll = (key, set) => {
    const value = params.get(key);
    if (value) value.split(",").forEach((v) => v && set.add(v));
  };
  addAll("brand", filtersState.brands);
  addAll("category", filtersState.categories);
  addAll("gender", filtersState.genders);
  addAll("size", filtersState.sizes);
  if (params.get("sale") === "1") filtersState.saleOnly = true;
  if (params.get("filter") === "new") filtersState.onlyNew = true;
  if (params.get("q")) filtersState.q = params.get("q");
  if (params.get("max")) filtersState.maxPrice = Number(params.get("max")) || PRICE_MAX;
  if (params.get("sort")) filtersState.sort = params.get("sort");
}

function renderFilterControls() {
  const brandWrap = document.getElementById("brand-filters");
  if (brandWrap) {
    const brands = [...new Set(PRODUCTS.map((product) => product.brand))];
    brandWrap.innerHTML = brands.map((brand) => {
      const count = PRODUCTS.filter((p) => p.brand === brand).length;
      return `<label class="check">
        <input type="checkbox" value="${brand}" data-brand-filter ${filtersState.brands.has(brand) ? "checked" : ""}>
        <span class="box"></span>
        <span class="check-label">${brand}</span><em>${count}</em>
      </label>`;
    }).join("");
  }

  const catWrap = document.getElementById("category-filters");
  if (catWrap) {
    catWrap.innerHTML = Object.keys(CATEGORY_LABELS).map((cat) => {
      const count = PRODUCTS.filter((p) => p.category === cat).length;
      return `<label class="check">
        <input type="checkbox" value="${cat}" data-category-filter ${filtersState.categories.has(cat) ? "checked" : ""}>
        <span class="box"></span>
        <span class="check-label">${CATEGORY_LABELS[cat]}</span><em>${count}</em>
      </label>`;
    }).join("");
  }

  const genderWrap = document.getElementById("gender-filters");
  if (genderWrap) {
    genderWrap.innerHTML = Object.keys(GENDER_LABELS).map((g) => {
      const count = PRODUCTS.filter((p) => p.gender === g).length;
      return `<label class="check">
        <input type="checkbox" value="${g}" data-gender-filter ${filtersState.genders.has(g) ? "checked" : ""}>
        <span class="box"></span>
        <span class="check-label">${GENDER_LABELS[g]}</span><em>${count}</em>
      </label>`;
    }).join("");
  }

  const sizeWrap = document.getElementById("size-filters");
  if (sizeWrap) {
    const sizes = [...new Set(PRODUCTS.flatMap((p) => p.sizes))].sort((a, b) => a - b);
    sizeWrap.innerHTML = sizes
      .map(
        (size) =>
          `<button type="button" class="size-chip${filtersState.sizes.has(String(size)) ? " is-active" : ""}" data-size-filter="${size}">${size}</button>`
      )
      .join("");
  }

  const price = document.getElementById("price-filter");
  const priceOut = document.getElementById("price-out");
  if (price) price.value = filtersState.maxPrice;
  if (priceOut) priceOut.textContent = `до ${money(filtersState.maxPrice)}`;

  const sale = document.getElementById("sale-filter");
  if (sale) sale.checked = filtersState.saleOnly;

  const sort = document.getElementById("sort-select");
  if (sort) sort.value = filtersState.sort;
}

function currentList() {
  let list = PRODUCTS.slice();

  if (filtersState.brands.size) list = list.filter((p) => filtersState.brands.has(p.brand));
  if (filtersState.categories.size) list = list.filter((p) => filtersState.categories.has(p.category));
  if (filtersState.genders.size) list = list.filter((p) => filtersState.genders.has(p.gender));
  if (filtersState.sizes.size) {
    list = list.filter((p) => p.sizes.some((s) => filtersState.sizes.has(String(s))));
  }
  if (filtersState.maxPrice < PRICE_MAX) list = list.filter((p) => p.price <= filtersState.maxPrice);
  if (filtersState.saleOnly) list = list.filter((p) => p.oldPrice);
  if (filtersState.onlyNew) list = list.filter((p) => p.badge === "NEW");

  if (filtersState.q) {
    const q = filtersState.q.toLowerCase();
    list = list.filter((p) =>
      [p.name, p.brand, p.colorway, categoryLabel(p.category)].join(" ").toLowerCase().includes(q)
    );
  }

  switch (filtersState.sort) {
    case "new":
      list.sort((a, b) => b.newest - a.newest);
      break;
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    default:
      list.sort((a, b) => b.reviews - a.reviews);
  }

  return list;
}

function renderChips() {
  const wrap = document.getElementById("active-chips");
  if (!wrap) return;
  const chips = [];

  filtersState.brands.forEach((b) => chips.push({ type: "brand", value: b, label: b }));
  filtersState.categories.forEach((c) => chips.push({ type: "category", value: c, label: CATEGORY_LABELS[c] }));
  filtersState.genders.forEach((g) => chips.push({ type: "gender", value: g, label: GENDER_LABELS[g] }));
  filtersState.sizes.forEach((s) => chips.push({ type: "size", value: s, label: "Размер " + s }));
  if (filtersState.saleOnly) chips.push({ type: "sale", value: "1", label: "Sale" });
  if (filtersState.onlyNew) chips.push({ type: "new", value: "1", label: "Новинки" });
  if (filtersState.maxPrice < PRICE_MAX) chips.push({ type: "price", value: String(filtersState.maxPrice), label: `До ${money(filtersState.maxPrice)}` });
  if (filtersState.q) chips.push({ type: "q", value: filtersState.q, label: `«${filtersState.q}»` });

  wrap.innerHTML = chips
    .map(
      (chip) =>
        `<button class="chip" data-chip-type="${chip.type}" data-chip-value="${escapeHTML(chip.value)}">${escapeHTML(chip.label)}<span>×</span></button>`
    )
    .join("");
}

function renderSubtitle(count) {
  const sub = document.getElementById("catalog-sub");
  if (!sub) return;
  let prefix = "Все модели";
  if (filtersState.q) prefix = `Поиск: «${filtersState.q}»`;
  else if (filtersState.saleOnly) prefix = "Скидки";
  else if (filtersState.onlyNew) prefix = "Новинки";
  else if (filtersState.brands.size === 1) prefix = [...filtersState.brands][0];
  else if (filtersState.categories.size === 1) prefix = CATEGORY_LABELS[[...filtersState.categories][0]];
  sub.textContent = `${prefix} · ${count} ${plural(count, "модель", "модели", "моделей")}`;
}

function updateURL() {
  const params = new URLSearchParams();
  if (filtersState.brands.size) params.set("brand", [...filtersState.brands].join(","));
  if (filtersState.categories.size) params.set("category", [...filtersState.categories].join(","));
  if (filtersState.genders.size) params.set("gender", [...filtersState.genders].join(","));
  if (filtersState.sizes.size) params.set("size", [...filtersState.sizes].join(","));
  if (filtersState.saleOnly) params.set("sale", "1");
  if (filtersState.onlyNew) params.set("filter", "new");
  if (filtersState.q) params.set("q", filtersState.q);
  if (filtersState.maxPrice < PRICE_MAX) params.set("max", String(filtersState.maxPrice));
  if (filtersState.sort !== "popular") params.set("sort", filtersState.sort);

  const query = params.toString();
  try {
    history.replaceState(null, "", location.pathname + (query ? "?" + query : ""));
  } catch (err) {
    /* file:// and sandboxed contexts may block history updates */
  }
}

function applyFilters() {
  const list = currentList();
  const grid = document.getElementById("catalog-grid");
  const empty = document.getElementById("catalog-empty");
  const countEl = document.getElementById("catalog-count");
  if (!grid) return;

  grid.innerHTML = list.map(productCard).join("");
  if (countEl) countEl.textContent = `${list.length} ${plural(list.length, "модель", "модели", "моделей")}`;
  if (empty) empty.hidden = list.length > 0;
  if (grid) grid.hidden = list.length === 0;

  renderChips();
  renderSubtitle(list.length);
  updateURL();
  syncWishButtons();
}

function syncControlStates() {
  document.querySelectorAll("[data-brand-filter]").forEach((input) => {
    input.checked = filtersState.brands.has(input.value);
  });
  document.querySelectorAll("[data-category-filter]").forEach((input) => {
    input.checked = filtersState.categories.has(input.value);
  });
  document.querySelectorAll("[data-gender-filter]").forEach((input) => {
    input.checked = filtersState.genders.has(input.value);
  });
  document.querySelectorAll("[data-size-filter]").forEach((btn) => {
    btn.classList.toggle("is-active", filtersState.sizes.has(btn.dataset.sizeFilter));
  });
  const price = document.getElementById("price-filter");
  const priceOut = document.getElementById("price-out");
  if (price) price.value = filtersState.maxPrice;
  if (priceOut) priceOut.textContent = `до ${money(filtersState.maxPrice)}`;
  const sale = document.getElementById("sale-filter");
  if (sale) sale.checked = filtersState.saleOnly;
  const sort = document.getElementById("sort-select");
  if (sort) sort.value = filtersState.sort;
}

function resetFilters() {
  filtersState.brands.clear();
  filtersState.categories.clear();
  filtersState.genders.clear();
  filtersState.sizes.clear();
  filtersState.maxPrice = PRICE_MAX;
  filtersState.saleOnly = false;
  filtersState.onlyNew = false;
  filtersState.q = "";
  filtersState.sort = "popular";
  syncControlStates();
  applyFilters();
}

function openFilters() {
  document.body.classList.add("filters-open", "no-scroll");
}

function closeFilters() {
  document.body.classList.remove("filters-open", "no-scroll");
}

function initCatalog() {
  readURLState();
  renderFilterControls();

  const art = document.getElementById("catalog-art");
  const featured = byId("asics-kayano-14") || PRODUCTS[0];
  if (art && featured) art.innerHTML = sneakerSVG(featured);

  document.getElementById("filters")?.addEventListener("change", (event) => {
    const input = event.target;
    if (input.matches("[data-brand-filter]")) {
      input.checked ? filtersState.brands.add(input.value) : filtersState.brands.delete(input.value);
      applyFilters();
    } else if (input.matches("[data-category-filter]")) {
      input.checked ? filtersState.categories.add(input.value) : filtersState.categories.delete(input.value);
      applyFilters();
    } else if (input.matches("[data-gender-filter]")) {
      input.checked ? filtersState.genders.add(input.value) : filtersState.genders.delete(input.value);
      applyFilters();
    }
  });

  document.getElementById("filters")?.addEventListener("click", (event) => {
    const sizeBtn = event.target.closest("[data-size-filter]");
    if (sizeBtn) {
      const size = sizeBtn.dataset.sizeFilter;
      if (filtersState.sizes.has(size)) filtersState.sizes.delete(size);
      else filtersState.sizes.add(size);
      sizeBtn.classList.toggle("is-active");
      applyFilters();
    }
  });

  const price = document.getElementById("price-filter");
  if (price) {
    price.addEventListener("input", () => {
      filtersState.maxPrice = Number(price.value);
      const out = document.getElementById("price-out");
      if (out) out.textContent = `до ${money(filtersState.maxPrice)}`;
      applyFilters();
    });
  }

  const sale = document.getElementById("sale-filter");
  if (sale) {
    sale.addEventListener("change", () => {
      filtersState.saleOnly = sale.checked;
      applyFilters();
    });
  }

  const sort = document.getElementById("sort-select");
  if (sort) {
    sort.addEventListener("change", () => {
      filtersState.sort = sort.value;
      applyFilters();
    });
  }

  document.getElementById("active-chips")?.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-chip-type]");
    if (!chip) return;
    const type = chip.dataset.chipType;
    const value = chip.dataset.chipValue;
    if (type === "brand") filtersState.brands.delete(value);
    if (type === "category") filtersState.categories.delete(value);
    if (type === "gender") filtersState.genders.delete(value);
    if (type === "size") filtersState.sizes.delete(value);
    if (type === "sale") filtersState.saleOnly = false;
    if (type === "new") filtersState.onlyNew = false;
    if (type === "price") filtersState.maxPrice = PRICE_MAX;
    if (type === "q") filtersState.q = "";
    syncControlStates();
    applyFilters();
  });

  document.getElementById("reset-filters")?.addEventListener("click", resetFilters);
  document.getElementById("empty-reset")?.addEventListener("click", resetFilters);

  document.getElementById("filters-open")?.addEventListener("click", openFilters);
  document.getElementById("filters-close")?.addEventListener("click", closeFilters);
  document.getElementById("filters-backdrop")?.addEventListener("click", closeFilters);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeFilters();
  });

  // Update checkboxes when navigating back to the page via bfcache.
  window.addEventListener("pageshow", () => {
    syncControlStates();
    applyFilters();
  });

  applyFilters();
}

initCatalog();
