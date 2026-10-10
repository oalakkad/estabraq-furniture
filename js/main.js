/* ==========================================================
   إستبرق للأثاث — الملف البرمجي الرئيسي
   لا حاجة لتعديل هذا الملف — كل البيانات في js/data.js
   ========================================================== */

(function () {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- 1. أدوات مساعدة ---------- */

  // تهريب النصوص لمنع أي مشاكل في العرض
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // رابط واتساب جاهز
  function waLink(msg) {
    const num = String(STORE.whatsapp).replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg || "");
  }

  // أيقونة الصورة البديلة
  const PH_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" ' +
    'stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="3" y="4" width="18" height="14" rx="2"/>' +
    '<circle cx="8.5" cy="9" r="1.6"/><path d="m21 15-5-5L6 18"/></svg>';

  // صورة بديلة تظهر لحين رفع الصور الحقيقية
  function placeholder(label, file) {
    return (
      '<div class="ph">' + PH_ICON +
      '<b>' + esc(label || "صورة") + '</b>' +
      (file ? '<small>' + esc(file) + '</small>' : "") +
      "</div>"
    );
  }

  // صورة فوق بديل خشبي — البديل يظهر تلقائياً إن لم تكن الصورة موجودة
  function img(src, alt, label, pos) {
    const file = String(src || "").split("/").pop();
    const style = pos ? ' style="object-position:' + esc(pos) + '"' : "";
    return (
      placeholder(label || alt, file) +
      '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async"' +
      style + ">"
    );
  }

  // إزالة أي صورة ناقصة ليظهر البديل الخشبي خلفها
  document.addEventListener(
    "error",
    function (e) {
      const el = e.target;
      if (el && el.tagName === "IMG") el.remove();
    },
    true
  );

  // أيقونة واتساب مصغّرة
  const WA_ICON =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.05-1.32A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.14' +
    'l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1 1 12 20.2z"/></svg>';

  const PLAY_ICON =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';

  const CAM_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/>' +
    '<path d="M8 6l1.5-2h5L16 6"/></svg>';

  const ARROW_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';

  /* ---------- 2. بناء الأقسام ---------- */

  function renderCategories() {
    const grid = $("#catsGrid");
    if (!grid) return;

    // ملء الصف الأخير: آخر بطاقة تتمدد لتغطي أي فراغ (٤ أعمدة على الكمبيوتر، ٢ على الجوال)
    const spanOf = (c) => (c.wide ? 2 : 1);
    const cells4 = CATEGORIES.reduce((s, c) => s + spanOf(c), 0);
    const lastSpan = CATEGORIES.length
      ? Math.min(4, spanOf(CATEGORIES[CATEGORIES.length - 1]) + ((4 - (cells4 % 4)) % 4))
      : 1;
    const cells2 = CATEGORIES.reduce((s, c) => s + (c.wide ? 2 : 1), 0);
    const lastFull2 = cells2 % 2 === 1;

    grid.innerHTML = CATEGORIES.map(function (c, i) {
      const count = PRODUCTS.filter((p) => p.cat === c.id).length;
      const isLast = i === CATEGORIES.length - 1;
      const fill =
        (isLast && lastSpan > 1 ? " cat--span-" + lastSpan : "") +
        (isLast && lastFull2 ? " cat--m-full" : "");
      // القسم الفارغ يحمل شارة «قريباً» بدل العدد
      const countTag = count
        ? '<div class="cat__count">' + count + " قطعة</div>"
        : '<div class="cat__count cat__count--soon">قريباً</div>';
      return (
        '<a href="#c-' + encodeURIComponent(c.id) + '" class="cat' + (c.wide ? " cat--wide" : "") + fill +
        (count ? "" : " cat--soon") +
        ' reveal" data-d="' + ((i % 4) + 1) + '">' +
          '<div class="cat__icon">' + categoryIconSvg(c) + "</div>" +
          countTag +
          '<div class="cat__body">' +
            "<h3>" + esc(c.name) + "</h3>" +
            "<p>" + esc(c.desc) + "</p>" +
            '<span class="cat__link">' + (count ? "شوف القسم " : "اسأل عن المتوفر ") + ARROW_ICON + "</span>" +
          "</div>" +
        "</a>"
      );
    }).join("");

  }

  /* ---------- عرض القسم: صفحة كاملة بمنتجات القسم ----------
     يعتمد على رابط الصفحة (#c-معرّف القسم): زر الرجوع في الجوال يغلقه،
     ويمكن مشاركة رابط قسم معيّن مباشرة. */
  let pageNavigated = false;

  function openCategoryView(id) {
    const c = CATEGORIES.find((x) => x.id === id);
    const view = $("#catView");
    if (!c || !view) return;
    applyFilter(id);
    const n = PRODUCTS.filter((p) => p.cat === id).length;
    $("#catViewTitle").textContent = c.name;
    $("#catViewCount").textContent = n ? toArabicNum(n) + " قطعة" : "قريباً";
    $("#catViewIcon").innerHTML = categoryIconSvg(c);
    view.hidden = false;
    view.scrollTop = 0;
    document.body.style.overflow = "hidden";
    $("#catViewBack").focus({ preventScroll: true });
  }

  function hideCategoryView() {
    const view = $("#catView");
    if (!view || view.hidden) return;
    view.hidden = true;
    document.body.style.overflow = "";
  }

  function leaveCategoryView() {
    if (pageNavigated) history.back();
    else location.hash = "#categories";
  }

  function routeFromHash() {
    const mm = location.hash.match(/^#c-(.+)$/);
    const id = mm && decodeURIComponent(mm[1]);
    if (id && CATEGORIES.some((c) => c.id === id)) openCategoryView(id);
    else hideCategoryView();
  }

  function bindCategoryView() {
    window.addEventListener("hashchange", function () { pageNavigated = true; routeFromHash(); });
    const back = $("#catViewBack");
    if (back) back.addEventListener("click", leaveCategoryView);
    document.addEventListener("keydown", function (e) {
      const lbOpen = $("#lightbox") && $("#lightbox").classList.contains("is-open");
      if (e.key === "Escape" && !lbOpen && !$("#catView").hidden) leaveCategoryView();
    });
    routeFromHash();   // فتح رابط قسم مباشرة
  }

  /* ---------- 3. الفلاتر والمنتجات ---------- */

  let activeFilter = "all";

  // عدد المنتجات الظاهرة قبل زر «عرض المزيد»
  const PAGE_SIZE = 12;
  let shownCount = PAGE_SIZE;

  // كل وسائط المنتج: الصورة الرئيسية + الزوايا الإضافية + الفيديو
  function productMedia(p) {
    const items = [{ img: p.img }]
      .concat((p.imgs || []).map((src) => ({ img: src })));
    if (p.video) items.push({ video: p.video });
    return items.map((m, i, all) =>
      Object.assign(m, {
        cap: p.name,
        sub: all.length > 1
          ? (m.video ? "فيديو ٣٦٠°" : "صورة " + toArabicNum(i + 1) + " من " + toArabicNum(all.length - (p.video ? 1 : 0)))
          : p.price
      })
    );
  }

  function interleaveByCategory(items) {
    const queues = CATEGORIES.map((c) => items.filter((p) => p.cat === c.id));
    const out = [];
    while (queues.some((q) => q.length)) {
      queues.forEach((q) => { if (q.length) out.push(q.shift()); });
    }
    // أي منتج بقسم غير معرّف يُضاف في النهاية
    return out.concat(items.filter((p) => !CATEGORIES.some((c) => c.id === p.cat)));
  }

  function toArabicNum(n) {
    return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  }

  function renderFilters() {
    const wrap = $("#filters");
    if (!wrap) return;

    const items = [{ id: "all", name: "الكل" }].concat(
      CATEGORIES.map((c) => ({ id: c.id, name: c.name }))
    );

    wrap.innerHTML = items
      .map(function (f) {
        return (
          '<button class="filter' + (f.id === activeFilter ? " is-active" : "") +
          '" data-filter="' + esc(f.id) + '" role="tab" aria-selected="' +
          (f.id === activeFilter) + '">' + esc(f.name) + "</button>"
        );
      })
      .join("");

    $$(".filter", wrap).forEach(function (btn) {
      btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
    });
  }

  function applyFilter(id) {
    activeFilter = id;
    shownCount = PAGE_SIZE;
    $$("#filters .filter").forEach(function (b) {
      const on = b.dataset.filter === id;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", String(on));
    });
    renderProducts();
  }

  function renderProducts() {
    const grid = $("#productsGrid");
    if (!grid) return;

    // في عرض «الكل» نتناوب بين الأقسام حتى تظهر التشكيلة كاملة من أول صفحة
    const list =
      activeFilter === "all"
        ? interleaveByCategory(PRODUCTS)
        : PRODUCTS.filter((p) => p.cat === activeFilter);

    // زر «عرض المزيد»
    const moreWrap = $("#loadMoreWrap");
    const moreBtn = $("#loadMore");
    const remaining = list.length - shownCount;
    if (moreWrap) moreWrap.hidden = remaining <= 0;
    if (moreBtn && remaining > 0) {
      moreBtn.textContent = "عرض المزيد (" + toArabicNum(remaining) + " قطعة أخرى)";
    }

    if (!list.length) {
      const catName = (CATEGORIES.find((c) => c.id === activeFilter) || {}).name || "";
      const msg = "السلام عليكم، أبي أستفسر عن قسم " + catName + " — شنو المتوفر عندكم؟";
      grid.innerHTML =
        '<div class="empty-note">' +
          "<p>صور قسم <b>" + esc(catName) + "</b> قادمة قريباً — راسلنا وبنرسل لك المتوفر حالياً.</p>" +
          '<a class="btn btn--wa" href="' + waLink(msg) + '" target="_blank" rel="noopener">' +
            WA_ICON + "اسأل عن " + esc(catName) + "</a>" +
        "</div>";
      return;
    }

    grid.innerHTML = list
      .slice(0, shownCount)
      .map(function (p, i) {
        // مؤشر الوسائط: عدد الصور و/أو وجود فيديو
        const nImgs = 1 + (p.imgs || []).length;
        const mediaTag =
          p.video
            ? '<span class="card__media-tag">' + PLAY_ICON + "فيديو ٣٦٠°</span>"
            : nImgs > 1
              ? '<span class="card__media-tag">' + CAM_ICON + toArabicNum(nImgs) + " صور</span>"
              : "";
        const catName = (CATEGORIES.find((c) => c.id === p.cat) || {}).name || "";
        const badgeCls =
          p.badgeType === "new" ? " card__tag--new"
          : p.badgeType === "hot" ? " card__tag--hot"
          : "";
        // أسماء المنتجات تحتوي أصلاً على علامات اقتباس، فلا نضيف غيرها
        const msg =
          "السلام عليكم، مهتم بـ " + p.name +
          (p.price ? " (" + p.price + ")" : "") +
          ". ممكن تفاصيل أكثر؟";

        return (
          '<article class="card" style="animation-delay:' + (i % 8) * 0.05 + 's">' +
            '<div class="card__media" data-lb-product="' + p.id + '">' +
              (p.badge ? '<span class="card__tag' + badgeCls + '">' + esc(p.badge) + "</span>" : "") +
              img(p.img, p.name, p.name, p.pos) +
              mediaTag +
              '<span class="card__zoom"><span>' +
                (p.video ? "شاهد الفيديو" : nImgs > 1 ? "شاهد كل الزوايا" : "عرض الصورة") +
              "</span></span>" +
            "</div>" +
            '<div class="card__body">' +
              '<span class="card__cat">' + esc(catName) + "</span>" +
              '<h3 class="card__title">' + esc(p.name) + "</h3>" +
              '<p class="card__desc">' + esc(p.desc) + "</p>" +
              '<div class="card__meta">' +
                // السعر النصي (مثل "السعر عند الطلب") يُعرض بخط أصغر
                '<span class="card__price' +
                  (/[0-9٠-٩]/.test(p.price || "") ? "" : " card__price--ask") +
                '">' + esc(p.price) + "</span>" +
                '<a class="card__ask" href="' + waLink(msg) + '" target="_blank" rel="noopener">' +
                  WA_ICON + "اسأل عن السعر</a>" +
              "</div>" +
            "</div>" +
          "</article>"
        );
      })
      .join("");

    // فتح المنتج في صندوق العرض:
    // منتج بعدة زوايا/فيديو → يتنقل بين وسائطه، منتج بصورة واحدة → يتنقل بين المنتجات
    $$("[data-lb-product]", grid).forEach(function (el) {
      el.addEventListener("click", function () {
        const p = PRODUCTS.find((x) => String(x.id) === el.dataset.lbProduct);
        if (!p) return;
        const media = productMedia(p);
        if (media.length > 1) {
          openLightbox(media, 0);
        } else {
          const items = list.map((x) => ({ img: x.img, cap: x.name, sub: x.price }));
          openLightbox(items, list.indexOf(p));
        }
      });
    });
  }

  function bindLoadMore() {
    const btn = $("#loadMore");
    if (!btn) return;
    btn.addEventListener("click", function () {
      shownCount += PAGE_SIZE;
      renderProducts();
    });
  }

  /* ---------- 4. المعرض ---------- */

  function renderGallery() {
    const grid = $("#galleryGrid");
    if (!grid) return;
    // بدون صور → يختفي القسم ورابطه
    if (!GALLERY.length) { hideSection(grid, "#gallery"); return; }

    grid.innerHTML = GALLERY.map(function (g) {
      return (
        "<figure>" + img(g.img, g.cap, g.cap) +
        "<figcaption>" + esc(g.cap) + "</figcaption></figure>"
      );
    }).join("");

    $$("figure", grid).forEach(function (fig, i) {
      fig.addEventListener("click", function () {
        openLightbox(GALLERY.map((g) => ({ img: g.img, cap: g.cap })), i);
      });
    });
  }

  function hideSection(inner, navHref) {
    const sec = inner.closest("section");
    if (sec) sec.hidden = true;
    if (navHref) $$('a[href="' + navHref + '"]').forEach((a) => (a.hidden = true));
  }

  /* ---------- 5. آراء العملاء ---------- */

  function renderReviews() {
    const grid = $("#reviewsGrid");
    if (!grid) return;
    // الآراء الفارغة (أُضيفت ولم تُكتب بعد) لا تظهر؛ وبدون آراء يختفي القسم
    const list = REVIEWS.filter((r) => r.text && r.text.trim());
    if (!list.length) { hideSection(grid); return; }

    grid.innerHTML = list.map(function (r, i) {
      return (
        '<article class="review reveal" data-d="' + (i + 1) + '">' +
          '<div class="review__stars" aria-label="خمس نجوم">★★★★★</div>' +
          '<p class="review__text">' + esc(r.text) + "</p>" +
          '<div class="review__who">' +
            '<span class="review__ava" aria-hidden="true">' + esc(r.initial) + "</span>" +
            "<span><b>" + esc(r.name) + "</b><span>" + esc(r.from) + "</span></span>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- 6. معلومات التواصل والتذييل ---------- */

  function renderContact() {
    const icn = {
      pin:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.4-7-10a7 7 0 0 1 14 0c0 5.6-7 10-7 10z"/><circle cx="12" cy="11" r="2.6"/></svg>',
      phone:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
      mail:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
      clock:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
    };

    const list = $("#infoList");
    if (list) {
      list.innerHTML =
        item(icn.pin, "موقع المعرض",
          '<a href="' + esc(STORE.mapsLink) + '" target="_blank" rel="noopener">' +
          esc(STORE.addressLine1) + "<br>" + esc(STORE.addressLine2) + "</a>") +
        item(icn.phone, "اتصل بنا",
          '<a href="tel:' + esc(STORE.phoneDial) + '" dir="ltr" style="display:inline-block">' +
          esc(STORE.phoneDisplay) + "</a>") +
        item(icn.mail, "البريد الإلكتروني",
          '<a href="mailto:' + esc(STORE.email) + '" dir="ltr" style="display:inline-block">' +
          esc(STORE.email) + "</a>") +
        item(icn.clock, "أوقات الدوام",
          "<p>" + STORE.hours.map((h) => esc(h.day) + ": " + esc(h.time)).join("<br>") + "</p>");
    }

    function item(icon, title, body) {
      return (
        '<div class="info-item"><span class="icn" aria-hidden="true">' + icon + "</span>" +
        "<div><b>" + esc(title) + "</b>" + body + "</div></div>"
      );
    }

    // روابط التواصل الاجتماعي
    const soc = $("#socials");
    if (soc) {
      const links = [
        { url: STORE.instagram, label: "انستقرام",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>' },
        { url: STORE.snapchat, label: "سناب شات",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3c2.8 0 4.6 2 4.6 4.7 0 1 0 1.9-.1 2.6.5.3 1.2.2 1.8-.1.7-.3 1.3.6.7 1.2-.5.5-1.4.8-2 1 .5 1.7 2 3.1 3.6 3.4.5.1.6.7.2 1-.7.5-1.9.7-2.6.8-.2.5-.2 1.1-.7 1.2-.7.2-1.8-.2-2.8 0-.9.2-1.6 1.2-2.7 1.2s-1.8-1-2.7-1.2c-1-.2-2.1.2-2.8 0-.5-.1-.5-.7-.7-1.2-.7-.1-1.9-.3-2.6-.8-.4-.3-.3-.9.2-1 1.6-.3 3.1-1.7 3.6-3.4-.6-.2-1.5-.5-2-1-.6-.6 0-1.5.7-1.2.6.3 1.3.4 1.8.1-.1-.7-.1-1.6-.1-2.6C7.4 5 9.2 3 12 3z"/></svg>' },
        { url: STORE.tiktok, label: "تيك توك",
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2 4.2 4.6 4.4"/></svg>' },
        { url: waLink("السلام عليكم"), label: "واتساب", svg: WA_ICON }
      ];
      soc.innerHTML = links
        .map((l) =>
          '<a href="' + esc(l.url) + '" target="_blank" rel="noopener" aria-label="' +
          esc(l.label) + '" title="' + esc(l.label) + '">' + l.svg + "</a>")
        .join("");
    }

    // الخريطة
    const map = $("#mapWrap");
    if (map) {
      const q = encodeURIComponent(STORE.addressLine1 + " " + STORE.addressLine2);
      map.innerHTML =
        '<iframe title="موقع المعرض على الخريطة" loading="lazy" ' +
        'referrerpolicy="no-referrer-when-downgrade" ' +
        'src="https://maps.google.com/maps?q=' + q + '&output=embed&hl=ar"></iframe>';
    }

    // قائمة الأقسام في النموذج
    const sel = $("#fCat");
    if (sel) {
      sel.innerHTML =
        '<option value="">اختر القسم...</option>' +
        CATEGORIES.map((c) => '<option value="' + esc(c.name) + '">' + esc(c.name) + "</option>").join("") +
        '<option value="تفصيل خاص">تفصيل خاص / غير ذلك</option>';
    }

    // أقسام التذييل
    const fc = $("#footerCats");
    if (fc) {
      fc.innerHTML = CATEGORIES.map(
        (c) => '<a href="#c-' + encodeURIComponent(c.id) + '">' + esc(c.name) + "</a>"
      ).join("");
    }

    // أوقات الدوام في التذييل
    const fh = $("#footerHours");
    if (fh) {
      fh.innerHTML = STORE.hours
        .map((h) => "<div><span>" + esc(h.day) + "</span><span>" + esc(h.time) + "</span></div>")
        .join("");
    }

    // حقوق النشر
    const cp = $("#copyright");
    if (cp) {
      cp.textContent =
        "© " + new Date().getFullYear() + " " + (STORE.brandLatin || STORE.name) +
        " — جميع الحقوق محفوظة";
    }
  }

  /* ---------- 7. روابط واتساب في الصفحة ---------- */

  function bindWhatsApp() {
    $$("[data-wa]").forEach(function (a) {
      a.href = waLink(a.dataset.waMsg || "السلام عليكم");
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---------- 8. نموذج الاستفسار ---------- */

  function bindForm() {
    const form = $("#inquiryForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = $("#fName").value.trim();
      const phone = $("#fPhone").value.trim();
      const cat = $("#fCat").value;
      const msg = $("#fMsg").value.trim();

      if (!name || !msg) {
        const empty = !name ? $("#fName") : $("#fMsg");
        empty.focus();
        empty.style.borderColor = "#B4633E";
        setTimeout(() => (empty.style.borderColor = ""), 1800);
        return;
      }

      const text =
        "السلام عليكم 👋\n" +
        "الاسم: " + name + "\n" +
        (phone ? "رقم التواصل: " + phone + "\n" : "") +
        (cat ? "القسم: " + cat + "\n" : "") +
        "الطلب: " + msg;

      window.open(waLink(text), "_blank", "noopener");
    });
  }

  /* ---------- 9. صندوق عرض الصور ---------- */

  const lb = {
    el: $("#lightbox"),
    media: $("#lbMedia"),
    cap: $("#lbCap"),
    items: [],
    i: 0
  };

  function openLightbox(items, index) {
    if (!lb.el || !items || !items.length) return;
    lb.items = items;
    lb.i = index || 0;
    paintLightbox();
    lb.el.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lb.el) return;
    lb.el.classList.remove("is-open");
    const cv = $("#catView");
    document.body.style.overflow = cv && !cv.hidden ? "hidden" : "";
    lb.media.innerHTML = ""; // يوقف أي فيديو قيد التشغيل
  }

  function stepLightbox(dir) {
    if (!lb.items.length) return;
    lb.i = (lb.i + dir + lb.items.length) % lb.items.length;
    paintLightbox();
  }

  function paintLightbox() {
    const it = lb.items[lb.i];
    if (!it) return;
    lb.media.innerHTML = it.video
      ? '<video src="' + esc(it.video) + '" autoplay muted loop playsinline controls></video>'
      : img(it.img, it.cap, it.cap);
    // أسهم التنقل تختفي إذا كان هناك عنصر واحد فقط
    $("#lbPrev").hidden = $("#lbNext").hidden = lb.items.length < 2;
    lb.cap.innerHTML =
      esc(it.cap) + (it.sub ? "<small>" + esc(it.sub) + "</small>" : "");
  }

  function bindLightbox() {
    if (!lb.el) return;
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", () => stepLightbox(-1));
    $("#lbNext").addEventListener("click", () => stepLightbox(1));

    lb.el.addEventListener("click", function (e) {
      if (e.target === lb.el) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!lb.el.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      // في الاتجاه من اليمين لليسار: السهم الأيمن = السابق
      if (e.key === "ArrowRight") stepLightbox(-1);
      if (e.key === "ArrowLeft") stepLightbox(1);
    });
  }

  /* ---------- 10. شريط التنقل ---------- */

  function bindNav() {
    const nav = $("#nav");
    const burger = $("#burger");
    const menu = $("#mobileMenu");
    const toTop = $("#toTop");

    function onScroll() {
      const y = window.scrollY;
      if (nav) nav.classList.toggle("is-stuck", y > 30);
      if (toTop) toTop.classList.toggle("is-shown", y > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      );
    }

    if (burger && menu) {
      function toggleMenu(open) {
        burger.classList.toggle("is-open", open);
        menu.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : "";
      }
      burger.addEventListener("click", () =>
        toggleMenu(!menu.classList.contains("is-open"))
      );
      $$("a", menu).forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
    }

    // تمييز القسم الحالي في القائمة
    const sections = $$("main section[id]");
    const links = $$("#navLinks a");
    if (sections.length && links.length && "IntersectionObserver" in window) {
      const spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            const id = "#" + en.target.id;
            links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === id));
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      sections.forEach((s) => spy.observe(s));
    }
  }

  /* ---------- 11. الظهور التدريجي عند التمرير ---------- */

  function bindReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------- 12. الصور البديلة الثابتة في الصفحة ---------- */

  /* ---------- نصوص الأقسام من CONTENT (تُدار من لوحة التحكم) ---------- */
  function contentAt(path) {
    if (typeof CONTENT === "undefined") return undefined;
    return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), CONTENT);
  }

  function applyContent() {
    $$("[data-c]").forEach(function (el) {
      const v = contentAt(el.dataset.c);
      if (typeof v === "string") el.textContent = v;
    });
    // عنصر يختفي إذا تُرك حقله الأساسي فارغاً (مثل إحصائية أو ميزة محذوفة)
    $$("[data-c-hide]").forEach(function (el) {
      const v = contentAt(el.dataset.cHide);
      if (typeof v === "string" && !v.trim()) el.hidden = true;
    });
  }


  /* ---------- ترتيب أقسام الصفحة + الأقسام المخصّصة (تُدار من لوحة التحكم) ----------
     CONTENT.layout: [{ key, show }] — ترتيب الأقسام بعد شريط المزايا
     CONTENT.custom: { key: { type, menu, eyebrow, title, text, image, side, images, button } } */
  const BUILTIN_SECTIONS = {
    categories: "#categories", about: "#about", gallery: "#gallery",
    reviews: "#reviews", cta: "#cta", contact: "#contact"
  };

  function sectionButton(b) {
    if (!b || !b.label) return "";
    if (b.type === "whatsapp") {
      return '<a href="#" class="btn btn--wa" data-wa data-wa-msg="' + esc(b.value || "السلام عليكم") + '">' +
        WA_ICON + esc(b.label) + "</a>";
    }
    const ext = /^https?:/i.test(b.value || "");
    return '<a class="btn btn--primary" href="' + esc(b.value || "#contact") + '"' +
      (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(b.label) + "</a>";
  }

  function renderCustomSection(key, s) {
    if (!s) return null;
    const sec = document.createElement("section");
    sec.id = key;
    const head =
      (s.eyebrow ? '<span class="eyebrow">' + esc(s.eyebrow) + "</span>" : "") +
      (s.title ? '<h2 class="section-title">' + esc(s.title) + "</h2>" : "");
    const text = s.text ? '<p class="section-sub custom-text">' + esc(s.text) + "</p>" : "";

    if (s.type === "split") {
      sec.className = "section about custom-split" + (s.side === "end" ? " custom-split--flip" : "");
      sec.innerHTML =
        '<div class="container about__grid">' +
          '<div class="about__media reveal">' + (s.image ? img(s.image, s.title || "", s.title || "") : "") + "</div>" +
          '<div class="about__copy reveal">' +
            (s.eyebrow ? '<span class="eyebrow">' + esc(s.eyebrow) + "</span>" : "") +
            (s.title ? '<h2 class="about__title">' + esc(s.title) + "</h2>" : "") +
            (s.text ? '<p class="about__text custom-text">' + esc(s.text) + "</p>" : "") +
            sectionButton(s.button) +
          "</div>" +
        "</div>";
    } else if (s.type === "images") {
      const imgs = (s.images || []).filter((x) => x && x.img);
      sec.className = "section custom-images";
      sec.innerHTML =
        '<div class="container">' +
          (head || text ? '<div class="section-head reveal">' + head + text + '<div class="divider"><span></span></div></div>' : "") +
          '<div class="gallery reveal">' +
            imgs.map((g) => "<figure>" + img(g.img, g.cap || "", g.cap || "") +
              (g.cap ? "<figcaption>" + esc(g.cap) + "</figcaption>" : "") + "</figure>").join("") +
          "</div>" +
          (s.button && s.button.label ? '<div class="more-wrap">' + sectionButton(s.button) + "</div>" : "") +
        "</div>";
      $$("figure", sec).forEach((fig, i) => fig.addEventListener("click", () =>
        openLightbox(imgs.map((g) => ({ img: g.img, cap: g.cap || s.title || "" })), i)));
    } else if (s.type === "banner") {
      sec.className = "section custom-banner";
      sec.innerHTML =
        '<div class="container"><div class="cta-band reveal"><div>' +
          (s.title ? "<h2>" + esc(s.title) + "</h2>" : "") +
          (s.text ? '<p class="custom-text">' + esc(s.text) + "</p>" : "") +
        '</div><div class="cta-band__actions">' + sectionButton(s.button) + "</div></div></div>";
    } else {
      sec.className = "section custom-textsec";
      sec.innerHTML =
        '<div class="container"><div class="section-head reveal">' + head + text +
          (s.button && s.button.label ? '<div class="custom-btn">' + sectionButton(s.button) + "</div>" : "") +
        "</div></div>";
    }
    return sec;
  }

  function buildLayout() {
    const layout = contentAt("layout");
    if (!Array.isArray(layout) || !layout.length) return;
    const custom = contentAt("custom") || {};
    let after = $(".strip");
    if (!after) return;
    const menuItems = [];

    layout.forEach(function (item) {
      if (!item || !item.key) return;
      const el = BUILTIN_SECTIONS[item.key] ? $(BUILTIN_SECTIONS[item.key]) : renderCustomSection(item.key, custom[item.key]);
      if (!el) return;
      after.after(el);
      after = el;
      if (item.show === false) {
        el.hidden = true;
        $$('a[href="#' + el.id + '"]').forEach((a) => (a.hidden = true));
      } else if (custom[item.key] && custom[item.key].menu) {
        menuItems.push({ id: el.id, label: custom[item.key].menu });
      }
    });

    // الأقسام المخصّصة التي لها اسم في القائمة: تُضاف قبل «تواصل معنا»
    menuItems.forEach(function (m) {
      [["#navLinks", ""], ["#mobileMenu", ""], [".footer__links", ""]].forEach(function ([sel]) {
        const box = $(sel);
        if (!box) return;
        const a = document.createElement("a");
        a.href = "#" + m.id;
        a.textContent = m.label;
        const contact = box.querySelector('a[href="#contact"]');
        contact ? box.insertBefore(a, contact) : box.appendChild(a);
      });
    });
  }

  function fillStaticPlaceholders() {
    $$("[data-ph]").forEach(function (el) {
      if (el.querySelector("img, .ph")) return;
      const fromContent = el.dataset.ci && contentAt(el.dataset.ci);
      const src = fromContent || "assets/images/" + el.dataset.phFile;
      const holder = document.createElement("div");
      holder.innerHTML = img(src, el.dataset.ph, el.dataset.ph);
      // الصورة والبديل معاً، قبل أي محتوى آخر داخل العنصر
      Array.from(holder.childNodes).reverse().forEach((n) => el.prepend(n));
    });
  }

  /* ---------- 13. التشغيل ---------- */

  function init() {
    renderCategories();
    renderProducts();
    renderGallery();
    renderReviews();
    renderContact();
    applyContent();
    buildLayout();
    fillStaticPlaceholders();
    bindWhatsApp();
    bindForm();
    bindLoadMore();
    bindCategoryView();
    bindLightbox();
    bindNav();
    bindReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
