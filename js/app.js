/**
 * Ateliero — logica paginii (vanilla JS, fără build).
 * Depinde de window.SITE_CONFIG (config.js) și window.SITE_DATA (data.js).
 */
(function () {
  "use strict";

  const CFG = window.SITE_CONFIG;
  const DATA = window.SITE_DATA;
  const ICONS = "./assets/icons.svg";
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (id, cls = "ico") => `<svg class="${cls}" aria-hidden="true"><use href="${ICONS}#${id}"/></svg>`;
  const fmt = (n) => new Intl.NumberFormat("ro-RO").format(n);

  /* ---------- Imagini cu fallback local ---------- */
  function imgTag({ src, fallback, alt, w = 900, h = 600, eager = false }) {
    return `<img src="${esc(src)}" data-fallback="${esc(fallback)}" alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? "" : 'loading="lazy"'} decoding="async">`;
  }
  function wireFallbacks(root = document) {
    $$("img[data-fallback]", root).forEach((img) => {
      const swap = () => {
        if (img.dataset.fellBack) return;
        img.dataset.fellBack = "1";
        img.src = img.dataset.fallback;
      };
      img.addEventListener("error", swap, { once: true });
      if (img.complete && img.naturalWidth === 0 && img.src) swap();
    });
  }

  /* ---------- Config → DOM ---------- */
  function applyConfig() {
    const c = CFG.contact;
    const years = new Date().getFullYear() - CFG.brand.foundedYear;
    const values = {
      name: CFG.brand.name,
      tagline: CFG.brand.tagline,
      city: c.city,
      county: c.county,
      address: c.address,
      addressFull: `${c.address}, ${c.city}`,
      email: c.email,
      phoneDisplay: c.phoneDisplay,
      foundedYear: CFG.brand.foundedYear,
      years,
      yearsLabel: CFG.stats.yearsLabel,
      projects: CFG.stats.projects,
      projectsLabel: CFG.stats.projectsLabel,
      warrantyYears: CFG.stats.warrantyYears,
      serviceArea: c.serviceArea,
      serviceAreaShort: `${c.serviceArea.split(/,| și /).filter(Boolean).length} județe`,
      hoursShort: `${CFG.schedule[0].days} ${CFG.schedule[0].hours}`
    };
    $$("[data-cfg]").forEach((el) => {
      const v = values[el.dataset.cfg];
      if (v !== undefined) el.textContent = v;
    });

    const waText = encodeURIComponent(`Bună ziua! Aș dori un deviz pentru o lucrare de tinichigerie.`);
    const hrefs = {
      tel: `tel:${c.phoneE164}`,
      mailto: `mailto:${c.email}`,
      whatsapp: `https://wa.me/${c.whatsapp}?text=${waText}`,
      maps: c.mapsUrl
    };
    $$("[data-cfg-href]").forEach((el) => { el.href = hrefs[el.dataset.cfgHref] || "#"; });

    $("#footerHours").innerHTML = CFG.schedule
      .map((s) => `<div><dt>${esc(s.days)}</dt><dd>${esc(s.hours)}</dd></div>`).join("");
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- Servicii ---------- */
  function renderServices() {
    $("#servicesGrid").innerHTML = DATA.services.map((s) => `
      <article class="card service" id="serviciu-${esc(s.id)}">
        <div class="service__media">${imgTag({ src: s.img, fallback: s.fallback, alt: s.title })}</div>
        <div class="service__body">
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
          <ul class="service__specs" aria-label="Detalii tehnice">
            ${s.specs.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}
          </ul>
        </div>
      </article>`).join("");

    const sel = $("#f-service");
    DATA.services.forEach((s) => sel.add(new Option(s.title, s.title)));
    sel.add(new Option("Altceva", "Altceva"));
  }

  /* ---------- Portofoliu + filtrare ---------- */
  function renderPortfolio() {
    const grid = $("#portfolioGrid");
    grid.innerHTML = DATA.portfolio.map((p) => `
      <li class="card work" data-category="${esc(p.category)}">
        <div class="work__media">${imgTag({ src: p.img, fallback: p.fallback, alt: p.title, w: 700, h: 525 })}</div>
        <div class="work__body">
          <h3>${esc(p.title)}</h3>
          <p class="work__meta"><span>${esc(p.place)}</span><strong>${esc(p.area)}</strong></p>
        </div>
      </li>`).join("");

    const counts = DATA.portfolio.reduce((acc, p) => ((acc[p.category] = (acc[p.category] || 0) + 1), acc), {});
    const filters = $("#portfolioFilters");
    filters.innerHTML = DATA.portfolioFilters.map((f, i) => {
      const n = f.id === "toate" ? DATA.portfolio.length : counts[f.id] || 0;
      return `<button type="button" class="filter" data-filter="${esc(f.id)}" aria-pressed="${i === 0}">${esc(f.label)}<span class="count">${n}</span></button>`;
    }).join("");

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      const id = btn.dataset.filter;
      $$("[data-filter]", filters).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      grid.classList.remove("is-filtering");
      void grid.offsetWidth; // repornește animația
      grid.classList.add("is-filtering");
      $$(".work", grid).forEach((w) => { w.hidden = id !== "toate" && w.dataset.category !== id; });
    });
  }

  /* ---------- Tarife ---------- */
  function renderPricing() {
    $("#pricingRows").innerHTML = DATA.pricing.map((p) => `
      <div class="price-row" role="row">
        <span class="price-row__work" role="cell">${esc(p.work)}</span>
        <span class="price-row__unit" role="cell">lei / ${esc(p.unit)}</span>
        <span class="price-row__price" role="cell"><small>de la</small> ${fmt(p.from)}–${fmt(p.to)}</span>
        <span class="price-row__note">${esc(p.note)}</span>
      </div>`).join("");
  }

  /* ---------- Proces ---------- */
  function renderProcess() {
    $("#processSteps").innerHTML = DATA.process.map((s) => `
      <li class="step"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join("");
  }

  /* ---------- Recenzii ---------- */
  function renderReviews() {
    $("#reviewsGrid").innerHTML = DATA.reviews.map((r) => `
      <figure class="card review">
        <div class="review__stars" role="img" aria-label="${r.rating} din 5 stele">${icon("star").repeat(r.rating)}</div>
        <blockquote><p>${esc(r.text)}</p></blockquote>
        <figcaption><span><strong>${esc(r.name)}</strong>, ${esc(r.place)}</span><span>${esc(r.work)}</span></figcaption>
      </figure>`).join("");
  }

  /* ---------- Temă light/dark ---------- */
  function initTheme() {
    const root = document.documentElement;
    const btn = $("#themeToggle");
    const sync = () => {
      const dark = root.getAttribute("data-theme") === "dark";
      btn.setAttribute("aria-pressed", String(dark));
      btn.setAttribute("aria-label", dark ? "Comută tema luminoasă" : "Comută tema întunecată");
    };
    sync();
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("ateliero-theme", next); } catch (e) { /* storage indisponibil */ }
      sync();
    });
  }

  /* ---------- Navigare mobil + secțiune activă ---------- */
  function initNav() {
    const menu = $("#navMenu");
    const toggle = $("#navToggle");
    const close = () => { menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Deschide meniul"); };
    toggle.addEventListener("click", () => {
      const open = !menu.classList.contains("is-open");
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Închide meniul" : "Deschide meniul");
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("is-open")) { close(); toggle.focus(); } });

    if (!("IntersectionObserver" in window)) return;
    const links = $$("a", menu);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === `#${en.target.id}`));
        links.forEach((a) => { if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "true"); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((a) => { const s = $(a.getAttribute("href")); if (s) io.observe(s); });
  }

  /* =========================================================
     Formular deviz
     ========================================================= */
  const RULES = {
    name: (v) => v.trim().length >= 3 || "Scrie numele complet (minimum 3 caractere).",
    phone: (v) => /^(\+?40|0)7\d{8}$/.test(v.replace(/[\s.-]/g, "")) || "Scrie un număr de mobil valid, de forma 07xx xxx xxx.",
    service: (v) => !!v || "Alege tipul lucrării din listă.",
    city: (v) => v.trim().length >= 2 || "Scrie localitatea unde e lucrarea.",
    gdpr: (_, el) => el.checked || "Bifează acordul ca să te putem contacta."
  };

  function validateField(el) {
    const rule = RULES[el.name];
    if (!rule) return true;
    const res = rule(el.value, el);
    const err = $(`#e-${el.name}`);
    if (res === true) { el.removeAttribute("aria-invalid"); if (err) err.textContent = ""; return true; }
    el.setAttribute("aria-invalid", "true");
    if (err) err.textContent = res;
    return false;
  }

  /** Datele formularului ca obiect JSON curat — aceeași formă pentru WhatsApp și pentru API. */
  function collectQuote(form) {
    const f = new FormData(form);
    return {
      name: f.get("name").trim(),
      phone: f.get("phone").replace(/[\s.-]/g, ""),
      service: f.get("service"),
      city: f.get("city").trim(),
      size: (f.get("size") || "").trim(),
      when: f.get("when"),
      details: (f.get("details") || "").trim(),
      consent: f.get("gdpr") === "on",
      source: "website",
      createdAt: new Date().toISOString()
    };
  }

  function quoteToWhatsApp(d) {
    const lines = [
      `Cerere deviz — ${CFG.brand.shortName}`,
      ``,
      `Nume: ${d.name}`,
      `Telefon: ${d.phone}`,
      `Lucrare: ${d.service}`,
      `Localitate: ${d.city}`,
      d.size ? `Dimensiune: ${d.size}` : null,
      `Termen dorit: ${d.when}`,
      d.details ? `Detalii: ${d.details}` : null
    ].filter((l) => l !== null);
    return `https://wa.me/${CFG.contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  /**
   * Trimite cererea. DEMO → WhatsApp. Producție → POST JSON.
   * @param {object} data rezultatul collectQuote()
   * @returns {Promise<{ok:boolean, channel:string}>}
   */
  async function submitQuoteForm(data) {
    if (CFG.api.demoMode) {
      window.open(quoteToWhatsApp(data), "_blank", "noopener");
      return { ok: true, channel: "whatsapp" };
    }
    const res = await fetch(`${CFG.api.baseUrl}${CFG.api.quoteEndpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ok: true, channel: "api" };
  }
  window.submitQuoteForm = submitQuoteForm; // expus pentru teste / integrare

  function initForm() {
    const form = $("#quoteForm");
    const summary = $("#formSummary");
    const status = $("#formStatus");
    const submit = $("#quoteSubmit");

    // validare la blur; după prima eroare, revalidare la input
    form.addEventListener("focusout", (e) => { if (e.target.name && e.target.value !== "") validateField(e.target); });
    form.addEventListener("input", (e) => { if (e.target.getAttribute("aria-invalid") === "true") validateField(e.target); });
    form.addEventListener("change", (e) => { if (e.target.type === "checkbox" || e.target.tagName === "SELECT") validateField(e.target); });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      const invalid = Object.keys(RULES).map((n) => form.elements[n]).filter((el) => !validateField(el));

      if (invalid.length) {
        summary.hidden = false;
        summary.innerHTML = `<strong>Mai sunt ${invalid.length === 1 ? "un câmp" : invalid.length + " câmpuri"} de completat:</strong><ul>${invalid
          .map((el) => `<li><a href="#${el.id}">${esc($(`label[for="${el.id}"]`).textContent.replace("*", "").trim())}</a></li>`).join("")}</ul>`;
        invalid.length > 1 ? summary.focus() : invalid[0].focus();
        return;
      }
      summary.hidden = true;

      const data = collectQuote(form);
      submit.disabled = true;
      try {
        const res = await submitQuoteForm(data);
        status.style.color = "";
        status.textContent = res.channel === "whatsapp"
          ? "Cererea s-a deschis în WhatsApp. Apasă Trimite acolo și te sunăm în aceeași zi lucrătoare."
          : "Cererea a fost trimisă. Te sunăm în aceeași zi lucrătoare.";
        form.reset();
      } catch (err) {
        status.style.color = "var(--danger)";
        status.textContent = `Cererea nu a plecat (${err.message}). Încearcă din nou sau sună la ${CFG.contact.phoneDisplay}.`;
      } finally {
        submit.disabled = false;
      }
    });

    summary.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      $(a.getAttribute("href")).focus();
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    renderServices();
    renderPortfolio();
    renderPricing();
    renderProcess();
    renderReviews();
    wireFallbacks();
    initTheme();
    initNav();
    initForm();
  });
})();
