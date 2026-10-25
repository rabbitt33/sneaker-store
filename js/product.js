function productVariants(p) {
  return [
    { name: p.colorway, colors: {} },
    {
      name: "Contrast",
      colors: { upper: p.colors.panel, panel: p.colors.upper, accent: p.colors.accent },
    },
    {
      name: "Blackout",
      colors: { upper: "#171717", panel: "#2f2f2f", accent: p.colors.accent, laces: "#e9e9e2", sole: "#e9e9e2" },
    },
  ];
}

function initProduct() {
  const params = new URLSearchParams(location.search);
  const p = byId(params.get("id")) || PRODUCTS[0];
  const root = document.getElementById("product-root");
  if (!root) return;

  if (!p) {
    root.innerHTML = '<div class="pd-missing"><h1>Модель не найдена</h1><a class="btn btn--dark" href="catalog.html">Вернуться в каталог</a></div>';
    return;
  }

  document.title = `${p.brand} ${p.name} «${p.colorway}» — DISTRICT SHOP`;

  const crumbs = document.getElementById("product-crumbs");
  if (crumbs) {
    crumbs.innerHTML = `
      <a href="index.html">Главная</a><span class="sep">/</span>
      <a href="catalog.html">Каталог</a><span class="sep">/</span>
      <a href="catalog.html?brand=${encodeURIComponent(p.brand)}">${p.brand}</a><span class="sep">/</span>
      <span>${p.name}</span>`;
  }

  const variants = productVariants(p);
  const old = p.oldPrice ? `<span class="pd-price-old">${money(p.oldPrice)}</span>` : "";
  const inWish = wishlist.includes(p.id) ? " is-active" : "";
  const badge = p.badge ? `<span class="pd-badge badge badge--${p.badge.toLowerCase()}">${p.badge}</span>` : "";

  root.innerHTML = `
    <div class="product-detail">
      <div class="pd-media">
        <div class="pd-art" id="pd-art" style="--tint:${p.colors.bg}">
          ${badge}
          ${sneakerSVG(p)}
        </div>
        <div class="pd-thumbs" id="pd-thumbs" aria-label="Варианты расцветки">
          ${variants
            .map((v, i) => {
              const upper = v.colors.upper || p.colors.upper;
              const panel = v.colors.panel || p.colors.panel;
              return `<button class="pd-swatch${i === 0 ? " is-active" : ""}" data-variant="${i}" style="--sw-a:${upper};--sw-b:${panel}" aria-label="Вариант ${i + 1}" aria-pressed="${i === 0 ? "true" : "false"}"></button>`;
            })
            .join("")}
        </div>
      </div>

      <div class="pd-info">
        <span class="pd-brand">${p.brand} · ${categoryLabel(p.category)}</span>
        <h1>${p.name}</h1>
        <p class="pd-colorway">Цвет: <span id="pd-variant-name">${p.colorway}</span></p>

        <div class="pd-rating">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <strong>${p.rating.toFixed(1)}</strong>
          <span>· ${p.reviews} отзывов</span>
        </div>

        <div class="pd-price">
          <strong>${money(p.price)}</strong>${old}
          ${p.oldPrice ? `<span class="pd-discount">−${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>` : ""}
        </div>

        <p class="pd-desc">${p.desc}</p>

        <div class="pd-sizes">
          <div class="pd-label">
            <span>Размер (EU)</span>
            <button type="button" id="size-guide">Таблица размеров</button>
          </div>
          <div class="size-grid" id="pd-sizes">
            ${p.sizes
              .map(
                (size) =>
                  `<button type="button" class="size-chip" data-product-size="${size}">${size}</button>`
              )
              .join("")}
          </div>
          <p class="pd-hint" id="size-hint">Выберите размер</p>
        </div>

        <div class="pd-actions">
          <button class="btn btn--dark btn--wide" id="add-to-cart">
            В корзину — ${money(p.price)}
          </button>
          <button class="btn btn--ghost pd-wish${inWish}" data-wish="${p.id}" aria-label="В избранное" aria-pressed="${inWish ? "true" : "false"}">
            ${ICONS.heart}<span class="pd-wish-label">В избранное</span>
          </button>
        </div>

        <ul class="pd-benefits">
          <li>${ICONS.check}<span>Бесплатная доставка от ${money(FREE_SHIPPING)} · 1–3 дня</span></li>
          <li>${ICONS.check}<span>Возврат и обмен в течение 30 дней</span></li>
          <li>${ICONS.check}<span>Проверка подлинности каждой пары</span></li>
        </ul>

        <div class="accordions">
          <details open>
            <summary>Описание и материалы</summary>
            <p>Верх выполнен из премиальных материалов, амортизация рассчитана на ежедневную носку. Пара подходит для города, площадки и всего, что между ними. Расцветка «${p.colorway}», бренд ${p.brand}.</p>
          </details>
          <details>
            <summary>Доставка</summary>
            <p>Доставка по городу — 1–3 рабочих дня. Бесплатно при заказе от ${money(FREE_SHIPPING)}. Курьер свяжется перед вручением, забрать заказ можно и в пункте выдачи.</p>
          </details>
          <details>
            <summary>Возврат и обмен</summary>
            <p>30 дней на возврат или обмен без объяснения причин. Пара должна быть без следов носки, в оригинальной упаковке. Обратная доставка — за наш счёт.</p>
          </details>
        </div>
      </div>
    </div>`;

  let selectedSize = null;
  let variantIndex = 0;

  const art = document.getElementById("pd-art");
  const variantName = document.getElementById("pd-variant-name");

  document.getElementById("pd-thumbs")?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-variant]");
    if (!btn) return;
    variantIndex = Number(btn.dataset.variant);
    const variant = variants[variantIndex];
    if (art) {
      const merged = Object.assign({}, p, { colors: Object.assign({}, p.colors, variant.colors) });
      art.innerHTML = `${badge}${sneakerSVG(merged, null, variantIndex !== 0)}`;
    }
    if (variantName) variantName.textContent = variant.name;
    document.querySelectorAll(".pd-swatch").forEach((el) => {
      const active = el === btn;
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-pressed", active ? "true" : "false");
    });
  });

  const sizeWrap = document.getElementById("pd-sizes");
  sizeWrap?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-product-size]");
    if (!btn) return;
    selectedSize = Number(btn.dataset.productSize);
    sizeWrap.querySelectorAll(".size-chip").forEach((el) => el.classList.toggle("is-active", el === btn));
    const hint = document.getElementById("size-hint");
    if (hint) {
      hint.textContent = `Выбран размер ${selectedSize} EU`;
      hint.classList.remove("is-error");
    }
  });

  document.getElementById("add-to-cart")?.addEventListener("click", () => {
    if (!selectedSize) {
      const hint = document.getElementById("size-hint");
      if (hint) {
        hint.textContent = "Сначала выберите размер";
        hint.classList.remove("is-error");
        void hint.offsetWidth;
        hint.classList.add("is-error");
      }
      toast("Выберите размер");
      return;
    }
    addToCart(p.id, selectedSize, 1, true);
  });

  document.getElementById("size-guide")?.addEventListener("click", () => {
    toast("EU 36–46. Между размерами бери больше — модели маломерят");
  });

  document.querySelectorAll(".pd-wish").forEach((btn) => {
    btn.classList.toggle("is-active", wishlist.includes(p.id));
  });

  const relatedGrid = document.getElementById("related-grid");
  if (relatedGrid) {
    const same = PRODUCTS.filter((x) => x.id !== p.id && x.category === p.category);
    const others = PRODUCTS.filter((x) => x.id !== p.id && x.category !== p.category);
    const related = same.concat(others).slice(0, 4);
    relatedGrid.innerHTML = related.map(productCard).join("");
    syncWishButtons();
  }
}

initProduct();
