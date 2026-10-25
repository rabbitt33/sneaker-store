const CART_KEY = "sd_cart_v1";
const WISH_KEY = "sd_wish_v1";
const FREE_SHIPPING = 5000;

const ICONS = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 20s-7-4.6-9.2-9.1C1.2 7.4 3.2 4.5 6.3 4.5c2 0 3.4 1.1 4.2 2.3l1.5 2 1.5-2c.8-1.2 2.2-2.3 4.2-2.3 3.1 0 5.1 2.9 3.5 6.4C19 15.4 12 20 12 20z"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 8h12l1 13H5L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>',
};

const NAV = [
  { label: "Новинки", href: "catalog.html?filter=new", key: "new" },
  { label: "Кроссовки", href: "catalog.html", key: "catalog" },
  { label: "Бренды", href: "index.html#brands", key: "brands" },
  { label: "Drop", href: "index.html#drop", key: "drop" },
  { label: "Sale", href: "catalog.html?sale=1", key: "sale" },
];

function money(n) {
  const value = Math.round(Number(n) || 0);
  return value.toLocaleString("ru-RU") + "\u00A0₴";
}

function byId(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function categoryLabel(c) {
  return CATEGORY_LABELS[c] || c;
}

function genderLabel(g) {
  return GENDER_LABELS[g] || g;
}

function readStore(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch (err) {
    return fallback;
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    /* storage may be unavailable */
  }
}

let cart = readStore(CART_KEY, []);
let wishlist = readStore(WISH_KEY, []);

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

function headerHTML() {
  const page = document.body.dataset.page;
  const links = NAV.map((item) => {
    const active =
      (item.key === "catalog" && (page === "catalog" || page === "product")) ||
      (item.key === "sale" && page === "catalog" && new URLSearchParams(location.search).get("sale") === "1");
    return `<a href="${item.href}"${active ? ' class="is-active" aria-current="page"' : ""}>${item.label}</a>`;
  }).join("");

  return `
    <div class="announce">
      <div class="announce-track">
        <span>Бесплатная доставка от ${money(FREE_SHIPPING)}</span><span>✦</span>
        <span>Только оригинальные пары</span><span>✦</span>
        <span>Возврат 30 дней</span><span>✦</span>
        <span>Бесплатная доставка от ${money(FREE_SHIPPING)}</span><span>✦</span>
        <span>Только оригинальные пары</span><span>✦</span>
        <span>Возврат 30 дней</span><span>✦</span>
      </div>
    </div>
    <header class="site-header" id="site-header-el">
      <div class="container header-inner">
        <button class="icon-btn menu-toggle" data-menu-toggle aria-label="Открыть меню" aria-expanded="false">${ICONS.menu}</button>
        <a class="logo" href="index.html" aria-label="DISTRICT SHOP — на главную">
          <span class="logo-mark">DS</span>
          <span class="logo-word">DISTRICT<em>SHOP</em></span>
        </a>
        <nav class="main-nav" aria-label="Основная навигация">${links}</nav>
        <div class="header-actions">
          <button class="icon-btn" data-search-open aria-label="Поиск">${ICONS.search}</button>
          <button class="icon-btn" data-wish-open aria-label="Избранное">
            ${ICONS.heart}<span class="count-badge" data-wish-count>0</span>
          </button>
          <button class="icon-btn" data-cart-open aria-label="Корзина">
            ${ICONS.bag}<span class="count-badge" data-cart-count>0</span>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <div class="mobile-menu-head">
        <a class="logo logo--light" href="index.html">
          <span class="logo-mark">DS</span>
          <span class="logo-word">DISTRICT<em>SHOP</em></span>
        </a>
        <button class="icon-btn icon-btn--light" data-menu-toggle aria-label="Закрыть меню">${ICONS.close}</button>
      </div>
      <nav class="mobile-nav" aria-label="Мобильная навигация">
        ${NAV.map((item) => `<a href="${item.href}"><span>${item.label}</span>↗</a>`).join("")}
        <a href="catalog.html?category=street"><span>Уличные</span>↗</a>
        <a href="catalog.html?category=basketball"><span>Баскетбол</span>↗</a>
      </nav>
      <div class="mobile-menu-foot">
        <p>Доставка 1–3 дня · Возврат 30 дней</p>
        <p>hello@districtshop.demo</p>
      </div>
    </div>`;
}

function footerHTML() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a class="logo logo--light" href="index.html">
              <span class="logo-mark">DS</span>
              <span class="logo-word">DISTRICT<em>SHOP</em></span>
            </a>
            <p>Уличные кроссовки и стритвир с 2026 года. Оригинальные пары, быстрая доставка и культура, которая не стоит на месте.</p>
            <div class="socials">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="TikTok">TT</a>
              <a href="#" aria-label="Telegram">TG</a>
              <a href="#" aria-label="YouTube">YT</a>
            </div>
          </div>
          <div class="footer-cols">
            <div>
              <h4>Каталог</h4>
              <a href="catalog.html?filter=new">Новинки</a>
              <a href="catalog.html?category=street">Уличные</a>
              <a href="catalog.html?category=basketball">Баскетбол</a>
              <a href="catalog.html?category=running">Бег</a>
              <a href="catalog.html?sale=1">Sale</a>
            </div>
            <div>
              <h4>Помощь</h4>
              <a href="#">Доставка</a>
              <a href="#">Оплата</a>
              <a href="#">Возврат</a>
              <a href="#">Таблица размеров</a>
              <a href="#">FAQ</a>
            </div>
            <div>
              <h4>Бренды</h4>
              <a href="catalog.html?brand=Jordan">Jordan</a>
              <a href="catalog.html?brand=Nike">Nike</a>
              <a href="catalog.html?brand=Adidas">adidas</a>
              <a href="catalog.html?brand=New%20Balance">New Balance</a>
              <a href="catalog.html?brand=Asics">Asics</a>
            </div>
            <div>
              <h4>Магазин</h4>
              <a href="index.html#drop">Дропы</a>
              <a href="index.html#brands">Бренды</a>
              <a href="#">О нас</a>
              <a href="#">Контакты</a>
              <a href="#">Вакансии</a>
            </div>
          </div>
        </div>
        <div class="footer-word" aria-hidden="true">DISTRICT SHOP</div>
        <div class="footer-bottom">
          <span>© 2026 DISTRICT SHOP. Демо-проект. Все права на торговые марки принадлежат их владельцам.</span>
          <div class="pay-chips">
            <span>VISA</span><span>Mastercard</span><span>МИР</span><span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>`;
}

function overlaysHTML() {
  return `
    <div class="scrim" id="scrim"></div>

    <aside class="drawer" id="cart-drawer" aria-hidden="true" aria-label="Корзина">
      <div class="drawer-head">
        <h2>Корзина <span class="drawer-count" data-cart-count>0</span></h2>
        <button class="icon-btn" data-close-drawer aria-label="Закрыть корзину">${ICONS.close}</button>
      </div>
      <div class="ship-bar" id="ship-bar">
        <p id="ship-text"></p>
        <div class="ship-progress"><span id="ship-fill"></span></div>
      </div>
      <div class="drawer-body" id="cart-items"></div>
      <div class="drawer-foot" id="cart-foot"></div>
    </aside>

    <aside class="drawer" id="wish-drawer" aria-hidden="true" aria-label="Избранное">
      <div class="drawer-head">
        <h2>Избранное <span class="drawer-count" data-wish-count>0</span></h2>
        <button class="icon-btn" data-close-drawer aria-label="Закрыть избранное">${ICONS.close}</button>
      </div>
      <div class="drawer-body" id="wish-items"></div>
    </aside>

    <div class="search-overlay" id="search-overlay" aria-hidden="true">
      <div class="container search-inner">
        <div class="search-top">
          <form class="search-form" id="search-form" role="search">
            ${ICONS.search}
            <input id="search-input" type="search" placeholder="Модель, бренд, расцветка…" autocomplete="off" aria-label="Поиск по каталогу">
          </form>
          <button class="icon-btn" data-search-close aria-label="Закрыть поиск">${ICONS.close}</button>
        </div>
        <div class="search-results" id="search-results">
          <p class="search-hint">Начни вводить модель или бренд</p>
        </div>
      </div>
    </div>

    <div class="toast-wrap" id="toast-wrap" aria-live="polite"></div>`;
}

function injectLayout() {
  const header = document.getElementById("site-header");
  if (header) header.innerHTML = headerHTML();

  const footer = document.getElementById("site-footer");
  if (footer) footer.innerHTML = footerHTML();

  document.body.insertAdjacentHTML("beforeend", overlaysHTML());

  renderCart();
  renderWish();
  updateCounts();
  syncWishButtons();
  wireLayout();
}

/* ------------------------------------------------------------------ */
/* Product cards                                                       */
/* ------------------------------------------------------------------ */

function productCard(p) {
  const badge = p.badge
    ? `<span class="badge badge--${p.badge.toLowerCase()}">${p.badge === "SALE" ? "SALE" : p.badge}</span>`
    : "";
  const old = p.oldPrice ? `<span class="price-old">${money(p.oldPrice)}</span>` : "";
  const active = wishlist.includes(p.id) ? " is-active" : "";

  return `
    <article class="product-card">
      <div class="product-thumb" style="--tint:${p.colors.bg}">
        <a class="product-media-link" href="product.html?id=${p.id}" aria-label="${p.brand} ${p.name}">
          ${sneakerSVG(p)}
        </a>
        ${badge}
        <button class="wish-btn${active}" data-wish="${p.id}" aria-label="Добавить в избранное" aria-pressed="${active ? "true" : "false"}">${ICONS.heart}</button>
        <button class="quick-add" data-quick-add="${p.id}">Быстро в корзину</button>
      </div>
      <a class="product-info" href="product.html?id=${p.id}">
        <span class="product-brand">${p.brand}</span>
        <h3 class="product-name">${p.name}</h3>
        <span class="product-price">${money(p.price)}${old}</span>
      </a>
    </article>`;
}

/* ------------------------------------------------------------------ */
/* Cart                                                                */
/* ------------------------------------------------------------------ */

function cartSubtotal() {
  return cart.reduce((sum, item) => {
    const p = byId(item.id);
    return p ? sum + p.price * item.qty : sum;
  }, 0);
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(id, size, qty = 1, open = false) {
  const p = byId(id);
  if (!p) return;
  if (!size) {
    toast("Выберите размер");
    return;
  }
  const found = cart.find((item) => item.id === id && String(item.size) === String(size));
  if (found) {
    found.qty += qty;
  } else {
    cart.push({ id, size: Number(size), qty });
  }
  writeStore(CART_KEY, cart);
  renderCart();
  updateCounts();
  toast(`В корзине: ${p.name} · ${size} EU`);
  if (open) openDrawer("cart");
}

function updateQty(id, size, delta) {
  const item = cart.find((i) => i.id === id && String(i.size) === String(size));
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => !(i.id === id && String(i.size) === String(size)));
  }
  writeStore(CART_KEY, cart);
  renderCart();
  updateCounts();
}

function removeFromCart(id, size) {
  cart = cart.filter((i) => !(i.id === id && String(i.size) === String(size)));
  writeStore(CART_KEY, cart);
  renderCart();
  updateCounts();
}

function cartRow(item) {
  const p = byId(item.id);
  if (!p) return "";
  return `
    <div class="cart-row">
      <a class="cart-thumb" style="--tint:${p.colors.bg}" href="product.html?id=${p.id}" aria-label="${p.name}">
        ${sneakerSVG(p)}
      </a>
      <div class="cart-row-info">
        <span class="cart-brand">${p.brand}</span>
        <a class="cart-name" href="product.html?id=${p.id}">${p.name}</a>
        <span class="cart-meta">${p.colorway} · ${item.size} EU</span>
        <div class="cart-row-bottom">
          <div class="qty">
            <button data-qty="-1" data-id="${p.id}" data-size="${item.size}" aria-label="Уменьшить количество">−</button>
            <span>${item.qty}</span>
            <button data-qty="1" data-id="${p.id}" data-size="${item.size}" aria-label="Увеличить количество">+</button>
          </div>
          <strong>${money(p.price * item.qty)}</strong>
        </div>
      </div>
      <button class="cart-remove" data-remove-cart="${p.id}" data-size="${item.size}" aria-label="Удалить из корзины">${ICONS.trash}</button>
    </div>`;
}

function emptyHTML(title, text, href, label) {
  return `
    <div class="drawer-empty">
      <div class="drawer-empty-icon">${ICONS.bag}</div>
      <h3>${title}</h3>
      <p>${text}</p>
      <a class="btn btn--dark" href="${href}">${label}</a>
    </div>`;
}

function renderCart() {
  const list = document.getElementById("cart-items");
  const foot = document.getElementById("cart-foot");
  const bar = document.getElementById("ship-bar");
  if (!list || !foot) return;

  const items = cart.map((item) => ({ ...item, product: byId(item.id) })).filter((i) => i.product);
  const subtotal = cartSubtotal();
  const count = cartCount();

  if (!items.length) {
    list.innerHTML = emptyHTML("Пока пусто", "Закинь в корзину пару, которая задаёт настроение.", "catalog.html", "В каталог");
    foot.innerHTML = "";
    if (bar) bar.hidden = true;
    return;
  }

  list.innerHTML = items.map(cartRow).join("");
  if (bar) {
    bar.hidden = false;
    const remaining = Math.max(0, FREE_SHIPPING - subtotal);
    const fill = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
    const text = document.getElementById("ship-text");
    const fillEl = document.getElementById("ship-fill");
    if (text) {
      text.innerHTML =
        remaining > 0
          ? `До бесплатной доставки <strong>${money(remaining)}</strong>`
          : `Бесплатная доставка активирована ✓`;
    }
    if (fillEl) fillEl.style.width = fill + "%";
  }

  foot.innerHTML = `
    <div class="cart-total"><span>Итого · ${count} шт.</span><strong>${money(subtotal)}</strong></div>
    <p class="cart-note">Доставка и промокод рассчитываются на следующем шаге</p>
    <button class="btn btn--dark btn--wide" id="checkout-btn">Оформить заказ ${ICONS.arrow}</button>`;
}

/* ------------------------------------------------------------------ */
/* Wishlist                                                            */
/* ------------------------------------------------------------------ */

function toggleWish(id) {
  const p = byId(id);
  if (!p) return;
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter((w) => w !== id);
    toast("Удалено из избранного");
  } else {
    wishlist.push(id);
    toast("Добавлено в избранное");
  }
  writeStore(WISH_KEY, wishlist);
  renderWish();
  updateCounts();
  syncWishButtons();
}

function wishRow(p) {
  return `
    <div class="cart-row wish-row">
      <a class="cart-thumb" style="--tint:${p.colors.bg}" href="product.html?id=${p.id}" aria-label="${p.name}">
        ${sneakerSVG(p)}
      </a>
      <div class="cart-row-info">
        <span class="cart-brand">${p.brand}</span>
        <a class="cart-name" href="product.html?id=${p.id}">${p.name}</a>
        <span class="cart-meta">${p.colorway}</span>
        <div class="cart-row-bottom">
          <strong>${money(p.price)}</strong>
          <button class="wish-add" data-wish-add="${p.id}">В корзину</button>
        </div>
      </div>
      <button class="cart-remove" data-wish="${p.id}" aria-label="Убрать из избранного">${ICONS.close}</button>
    </div>`;
}

function renderWish() {
  const list = document.getElementById("wish-items");
  if (!list) return;
  const items = wishlist.map(byId).filter(Boolean);
  list.innerHTML = items.length
    ? items.map(wishRow).join("")
    : emptyHTML("Избранное пусто", "Жми на сердечко, чтобы сохранить пару на потом.", "catalog.html", "Смотреть модели");
}

function syncWishButtons() {
  document.querySelectorAll("[data-wish]").forEach((btn) => {
    const active = wishlist.includes(btn.dataset.wish);
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function updateCounts() {
  const cartTotal = cartCount();
  const wishTotal = wishlist.length;
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = cartTotal;
    el.style.display = cartTotal ? "" : "none";
  });
  document.querySelectorAll("[data-wish-count]").forEach((el) => {
    el.textContent = wishTotal;
    el.style.display = wishTotal ? "" : "none";
  });
}

/* ------------------------------------------------------------------ */
/* Drawers, menu, search, toasts                                       */
/* ------------------------------------------------------------------ */

function openDrawer(name) {
  closeDrawers();
  const drawer = document.getElementById(name + "-drawer");
  const scrim = document.getElementById("scrim");
  if (!drawer) return;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  if (scrim) scrim.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeDrawers() {
  document.querySelectorAll(".drawer.is-open").forEach((d) => {
    d.classList.remove("is-open");
    d.setAttribute("aria-hidden", "true");
  });
  const scrim = document.getElementById("scrim");
  if (scrim) scrim.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

function toggleMenu(force) {
  const menu = document.getElementById("mobile-menu");
  if (!menu) return;
  const open = typeof force === "boolean" ? force : !menu.classList.contains("is-open");
  menu.classList.toggle("is-open", open);
  menu.setAttribute("aria-hidden", open ? "false" : "true");
  document.body.classList.toggle("no-scroll", open);
  document.querySelectorAll("[data-menu-toggle]").forEach((b) => b.setAttribute("aria-expanded", open ? "true" : "false"));
}

function openSearch() {
  const overlay = document.getElementById("search-overlay");
  if (!overlay) return;
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  const input = document.getElementById("search-input");
  if (input) setTimeout(() => input.focus(), 60);
  renderSearch("");
}

function closeSearch() {
  const overlay = document.getElementById("search-overlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function renderSearch(query) {
  const results = document.getElementById("search-results");
  if (!results) return;
  const q = query.trim().toLowerCase();
  if (!q) {
    results.innerHTML = '<p class="search-hint">Начни вводить модель или бренд</p>';
    return;
  }
  const found = PRODUCTS.filter((p) =>
    [p.name, p.brand, p.colorway, categoryLabel(p.category)].join(" ").toLowerCase().includes(q)
  ).slice(0, 6);

  if (!found.length) {
    results.innerHTML = `<p class="search-hint">Ничего не нашли по «${escapeHTML(query)}». Попробуй «Jordan» или «Samba».</p>`;
    return;
  }

  results.innerHTML = found
    .map(
      (p) => `
      <a class="search-row" href="product.html?id=${p.id}">
        <span class="search-thumb" style="--tint:${p.colors.bg}">${sneakerSVG(p)}</span>
        <span class="search-row-info">
          <span class="search-row-brand">${p.brand}</span>
          <strong>${p.name}</strong>
          <em>${p.colorway}</em>
        </span>
        <span class="search-row-price">${money(p.price)}</span>
      </a>`
    )
    .join("");
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

function toast(message) {
  const wrap = document.getElementById("toast-wrap");
  if (!wrap) return;
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `${ICONS.check}<span>${message}</span>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add("is-out");
    setTimeout(() => el.remove(), 350);
  }, 2400);
}

function wireLayout() {
  document.addEventListener("click", (event) => {
    const target = event.target;

    const wishBtn = target.closest("[data-wish]");
    if (wishBtn) {
      event.preventDefault();
      toggleWish(wishBtn.dataset.wish);
      return;
    }

    const quick = target.closest("[data-quick-add]");
    if (quick) {
      const p = byId(quick.dataset.quickAdd);
      if (p) addToCart(p.id, p.sizes[Math.floor(p.sizes.length / 2)]);
      return;
    }

    const wishAdd = target.closest("[data-wish-add]");
    if (wishAdd) {
      const p = byId(wishAdd.dataset.wishAdd);
      if (p) addToCart(p.id, p.sizes[Math.floor(p.sizes.length / 2)], 1, true);
      return;
    }

    const remove = target.closest("[data-remove-cart]");
    if (remove) {
      removeFromCart(remove.dataset.removeCart, remove.dataset.size);
      return;
    }

    const qty = target.closest("[data-qty]");
    if (qty) {
      updateQty(qty.dataset.id, qty.dataset.size, Number(qty.dataset.qty));
      return;
    }

    if (target.closest("[data-cart-open]")) return openDrawer("cart");
    if (target.closest("[data-wish-open]")) return openDrawer("wish");
    if (target.closest("[data-close-drawer]")) return closeDrawers();
    if (target.closest("#scrim")) return closeDrawers();
    if (target.closest("[data-menu-toggle]")) return toggleMenu();
    if (target.closest("[data-search-open]")) return openSearch();
    if (target.closest("[data-search-close]")) return closeSearch();
    if (target.closest("#checkout-btn")) return toast("Демо-режим: оформление заказа скоро появится");

    const menuLink = target.closest("#mobile-menu a");
    if (menuLink) toggleMenu(false);
  });

  const scrim = document.getElementById("scrim");
  if (scrim) scrim.addEventListener("click", closeDrawers);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
      closeDrawers();
      toggleMenu(false);
    }
  });

  const input = document.getElementById("search-input");
  if (input) {
    input.addEventListener("input", () => renderSearch(input.value));
  }

  const form = document.getElementById("search-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const q = input ? input.value.trim() : "";
      if (q) location.href = "catalog.html?q=" + encodeURIComponent(q);
    });
  }

  window.addEventListener("scroll", () => {
    const header = document.getElementById("site-header-el");
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });
}

injectLayout();
