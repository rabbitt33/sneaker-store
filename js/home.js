function initHome() {
  const heroProduct = byId("jordan-1-chicago");
  const heroArt = document.getElementById("hero-art");
  if (heroArt && heroProduct) heroArt.innerHTML = sneakerSVG(heroProduct);

  const dropProduct = byId("nb-2002r");
  const dropArt = document.getElementById("drop-art");
  if (dropArt && dropProduct) dropArt.innerHTML = sneakerSVG(dropProduct);

  const promoDark = document.getElementById("promo-art-1");
  const p1 = byId("nike-dunk-low-panda");
  if (promoDark && p1) promoDark.innerHTML = sneakerSVG(p1);

  const promoVolt = document.getElementById("promo-art-2");
  const p2 = byId("jordan-4-military");
  if (promoVolt && p2) promoVolt.innerHTML = sneakerSVG(p2);

  const grid = document.getElementById("new-arrivals");
  if (grid) {
    const sorted = PRODUCTS.slice().sort((a, b) => b.newest - a.newest).slice(0, 8);
    grid.innerHTML = sorted.map(productCard).join("");
  }

  document.querySelectorAll("[data-count-cat]").forEach((el) => {
    const cat = el.dataset.countCat;
    const count = PRODUCTS.filter((p) => p.category === cat).length;
    const label = el.closest("em");
    const text = `${count} ${plural(count, "модель", "модели", "моделей")}`;
    if (label) label.textContent = text;
    else el.textContent = count;
  });

  const brandGrid = document.getElementById("brand-grid");
  if (brandGrid) {
    const brands = [...new Set(PRODUCTS.map((product) => product.brand))];
    brandGrid.innerHTML = brands.map((brand) => {
      const count = PRODUCTS.filter((p) => p.brand === brand).length;
      return `<a class="brand-tile" href="catalog.html?brand=${encodeURIComponent(brand)}">
        <span>${brand}</span><em>${count} моделей</em>
      </a>`;
    }).join("");
  }

  startCountdown();

  const form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      toast("Готово! Проверь почту — там −10% на первый заказ");
      form.reset();
    });
  }
}

function startCountdown() {
  const daysEl = document.getElementById("cd-days");
  if (!daysEl) return;

  const now = new Date();
  const target = new Date(now);
  const daysUntil = (6 - now.getDay() + 7) % 7 || 7;
  target.setDate(now.getDate() + daysUntil);
  target.setHours(20, 0, 0, 0);

  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const diff = Math.max(0, target - new Date());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = pad(value);
    };
    set("cd-days", days);
    set("cd-hours", hours);
    set("cd-mins", mins);
    set("cd-secs", secs);
  }

  tick();
  setInterval(tick, 1000);
}

initHome();
