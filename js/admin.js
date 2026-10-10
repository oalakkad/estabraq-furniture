/* ==========================================================
   لوحة التحكم — تقرأ js/data.js من GitHub وتحفظ التعديلات
   (مع الصور والفيديو) في commit واحد عبر GitHub API.
   الموقع على GitHub Pages يُعاد بناؤه تلقائياً خلال دقيقة تقريباً.
   ========================================================== */
(function () {
  "use strict";

  /* ---------- الإعدادات ---------- */
  // المستودع يُستنتج من رابط GitHub Pages (owner.github.io/repo)،
  // ويمكن تجاوزه للاختبار: admin.html?repo=owner/name&branch=test
  const CFG = (function () {
    const q = new URLSearchParams(location.search);
    let owner = "oalakkad", repo = "estabraq-furniture";
    const m = location.hostname.match(/^([^.]+)\.github\.io$/i);
    if (m) {
      owner = m[1];
      const seg = location.pathname.split("/").filter(Boolean)[0];
      if (seg && !/\.html?$/i.test(seg)) repo = seg;
    }
    if (q.get("repo")) [owner, repo] = q.get("repo").split("/");
    return { owner, repo, branch: q.get("branch") || "main" };
  })();

  const DATA_PATH = "js/data.js";
  const IMG_DIR = "assets/images/products/";
  const VID_DIR = "assets/videos/";
  const ASK = "السعر عند الطلب";
  const TOKEN_KEY = "estbraq-admin-token";
  const MAX_VIDEO_MB = 25;

  /* ---------- الحالة ---------- */
  let token = "";
  let data = null;          // { STORE, CATEGORIES, PRODUCTS, GALLERY, REVIEWS }
  let dataSha = null;       // نسخة data.js عند التحميل — لاكتشاف تعديلات متزامنة
  let changes = 0;          // عدد التعديلات غير المنشورة
  const pending = {};       // path → { b64, url } ملفات جديدة بانتظار النشر

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  /* ---------- أدوات ---------- */
  function toast(msg, kind) {
    const t = $("#toast");
    t.textContent = msg;
    t.className = "toast is-shown" + (kind ? " toast--" + kind : "");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => (t.className = "toast"), kind === "error" ? 6000 : 3200);
  }

  // رابط معاينة: الملف الجديد من الذاكرة، والموجود من GitHub مباشرة (أحدث من نسخة الموقع)
  function mediaUrl(path) {
    if (!path) return "";
    if (pending[path]) return pending[path].url;
    return "https://raw.githubusercontent.com/" + CFG.owner + "/" + CFG.repo + "/" + CFG.branch + "/" + path;
  }

  const dirtyKeys = new Set();
  function markDirty(key) {
    if (key) { if (dirtyKeys.has(key)) return; dirtyKeys.add(key); }
    changes++;
    $("#publishBtn").disabled = false;
    const c = $("#dirtyCount");
    c.hidden = false;
    c.textContent = changes;
  }

  function clearDirty() {
    changes = 0;
    dirtyKeys.clear();
    $("#publishBtn").disabled = true;
    $("#dirtyCount").hidden = true;
  }

  const utf8ToB64 = (str) => {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  };
  const b64ToUtf8 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0)));
  const blobToB64 = (blob) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1]);
    r.onerror = rej;
    r.readAsDataURL(blob);
  });
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  /* ---------- GitHub API ---------- */
  async function gh(path, opts) {
    opts = opts || {};
    const res = await fetch("https://api.github.com" + path, {
      method: opts.method || "GET",
      cache: "no-store",
      headers: Object.assign({
        Authorization: "Bearer " + token,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, opts.body ? { "Content-Type": "application/json" } : {}),
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
    if (!res.ok) {
      let msg = res.status + "";
      try { msg = (await res.json()).message || msg; } catch (e) { /* ignore */ }
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return res.status === 204 ? null : res.json();
  }

  const repoPath = (p) => "/repos/" + CFG.owner + "/" + CFG.repo + p;

  async function loadData() {
    const f = await gh(repoPath("/contents/" + DATA_PATH + "?ref=" + encodeURIComponent(CFG.branch)));
    const text = b64ToUtf8(f.content);
    // data.js يعرّف ثوابت عادية — نقرأها بأمان داخل دالة منفصلة
    const parsed = new Function(text + "\n;return { STORE: STORE, CATEGORIES: CATEGORIES, PRODUCTS: PRODUCTS," +
      " GALLERY: typeof GALLERY !== 'undefined' ? GALLERY : [], REVIEWS: typeof REVIEWS !== 'undefined' ? REVIEWS : []," +
      " CONTENT: typeof CONTENT !== 'undefined' ? CONTENT : {} };")();
    dataSha = f.sha;
    return parsed;
  }

  function serialize(d) {
    const j = (v) => JSON.stringify(v, null, 2);
    return "/* ==========================================================\n" +
      "   بيانات الموقع — تُدار من لوحة التحكم: admin.html\n" +
      "   يمكن تعديل هذا الملف يدوياً أيضاً، لكن حافظ على صيغة JSON\n" +
      "   (علامات تنصيص مزدوجة، وفواصل بين العناصر).\n" +
      "   ========================================================== */\n\n" +
      "const STORE = " + j(d.STORE) + ";\n\n" +
      "/* نصوص وصور أقسام الصفحة */\n" +
      "const CONTENT = " + j(d.CONTENT || {}) + ";\n\n" +
      "const CATEGORIES = " + j(d.CATEGORIES) + ";\n\n" +
      "const PRODUCTS = " + j(d.PRODUCTS) + ";\n\n" +
      "const GALLERY = " + j(d.GALLERY) + ";\n\n" +
      "const REVIEWS = " + j(d.REVIEWS) + ";\n";
  }

  // نشر كل التعديلات (البيانات + الصور + الفيديو) في commit واحد
  async function publish() {
    const btn = $("#publishBtn");
    btn.disabled = true;
    const label = btn.firstChild.nodeValue;
    btn.firstChild.nodeValue = "جارٍ النشر… ";
    try {
      // هل عدّل أحد البيانات من جهاز آخر منذ التحميل؟
      const cur = await gh(repoPath("/contents/" + DATA_PATH + "?ref=" + encodeURIComponent(CFG.branch)));
      if (cur.sha !== dataSha &&
          !confirm("تم تعديل بيانات الموقع من جهاز آخر بعد فتحك للوحة.\nهل تريد استبدالها بتعديلاتك؟")) {
        throw new Error("أُلغي النشر");
      }

      const ref = await gh(repoPath("/git/ref/heads/" + CFG.branch));
      const headSha = ref.object.sha;
      const head = await gh(repoPath("/git/commits/" + headSha));

      // الملفات المستخدمة فعلاً فقط (صورة رُفعت ثم حُذفت لا تُنشر)
      const used = new Set(usedPaths());
      const files = Object.keys(pending).filter((p) => used.has(p));

      const tree = [];
      for (let i = 0; i < files.length; i++) {
        btn.firstChild.nodeValue = "رفع الملفات " + (i + 1) + "/" + files.length + "… ";
        const blob = await gh(repoPath("/git/blobs"), {
          method: "POST", body: { content: pending[files[i]].b64, encoding: "base64" }
        });
        tree.push({ path: files[i], mode: "100644", type: "blob", sha: blob.sha });
      }
      const dataBlob = await gh(repoPath("/git/blobs"), {
        method: "POST", body: { content: serialize(data), encoding: "utf-8" }
      });
      tree.push({ path: DATA_PATH, mode: "100644", type: "blob", sha: dataBlob.sha });

      const newTree = await gh(repoPath("/git/trees"), { method: "POST", body: { base_tree: head.tree.sha, tree: tree } });
      const commit = await gh(repoPath("/git/commits"), {
        method: "POST",
        body: { message: "تحديث المنتجات من لوحة التحكم", tree: newTree.sha, parents: [headSha] }
      });
      await gh(repoPath("/git/refs/heads/" + CFG.branch), { method: "PATCH", body: { sha: commit.sha } });

      // تحديث النسخة المرجعية
      const after = await gh(repoPath("/contents/" + DATA_PATH + "?ref=" + encodeURIComponent(CFG.branch)));
      dataSha = after.sha;
      clearDirty();
      toast("تم النشر ✓ — ستظهر التعديلات على الموقع خلال دقيقة تقريباً", "ok");
    } catch (e) {
      btn.disabled = false;
      toast(e.message === "أُلغي النشر" ? e.message : "تعذّر النشر: " + friendlyError(e), "error");
    } finally {
      btn.firstChild.nodeValue = label;
    }
  }

  function friendlyError(e) {
    if (e.status === 401) return "مفتاح الدخول غير صحيح أو منتهي الصلاحية";
    if (e.status === 403) return "المفتاح لا يملك صلاحية الكتابة (Contents: Read and write)";
    if (e.status === 404) return "المستودع غير موجود أو المفتاح لا يملك صلاحية عليه";
    if (e.status === 409 || e.status === 422) return "حدث تعارض، أعد تحميل الصفحة وحاول مجدداً";
    return e.message || "خطأ غير معروف";
  }

  function usedPaths() {
    const out = [];
    data.PRODUCTS.forEach((p) => { out.push(p.img); (p.imgs || []).forEach((x) => out.push(x)); if (p.video) out.push(p.video); });
    data.CATEGORIES.forEach((c) => out.push(c.img));
    (data.GALLERY || []).forEach((g) => out.push(g.img));
    const walk = (v) => { if (typeof v === "string") out.push(v); else if (v && typeof v === "object") Object.values(v).forEach(walk); };
    walk(data.CONTENT);
    return out.filter(Boolean);
  }

  /* ---------- معالجة الصور في المتصفح ----------
     تقص الصورة حول القطعة وتوسّطها في مربع ١٠٠٠×١٠٠٠ بخلفية بيضاء،
     وإذا كانت الخلفية سوداء تُزال (تعبئة من الأطراف). */
  async function processImage(file) {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
    const src = document.createElement("canvas");
    src.width = w; src.height = h;
    const sctx = src.getContext("2d", { willReadFrequently: true });
    sctx.fillStyle = "#fff";
    sctx.fillRect(0, 0, w, h);
    sctx.drawImage(bmp, 0, 0, w, h);
    const img = sctx.getImageData(0, 0, w, h);
    const d = img.data;

    const cornerLum = () => {
      const p = Math.max(4, Math.round(Math.min(w, h) / 40));
      let s = 0, n = 0;
      [[0, 0], [w - p, 0], [0, h - p], [w - p, h - p]].forEach(([cx, cy]) => {
        for (let y = cy; y < cy + p; y++) for (let x = cx; x < cx + p; x++) {
          const i = (y * w + x) * 4; s += (d[i] + d[i + 1] + d[i + 2]) / 3; n++;
        }
      });
      return s / n;
    };

    // ١) إزالة الخلفية السوداء
    if (cornerLum() < 40) {
      const T = 24;
      const bg = new Uint8Array(w * h);
      const stack = new Int32Array(w * h * 2);
      let sp = 0;
      const push = (k) => { stack[sp++] = k; };
      for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
      for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
      const mx = (k) => Math.max(d[k * 4], d[k * 4 + 1], d[k * 4 + 2]);
      while (sp > 0) {
        const k = stack[--sp];
        if (bg[k] || mx(k) > T) continue;
        bg[k] = 1;
        const x = k % w, y = (k / w) | 0;
        if (x > 0) push(k - 1);
        if (x < w - 1) push(k + 1);
        if (y > 0) push(k - w);
        if (y < h - 1) push(k + w);
      }
      for (let k = 0; k < w * h; k++) {
        const i = k * 4;
        if (bg[k]) { d[i] = d[i + 1] = d[i + 2] = 255; continue; }
        const x = k % w, y = (k / w) | 0;
        const edge = (x > 0 && bg[k - 1]) || (x < w - 1 && bg[k + 1]) || (y > 0 && bg[k - w]) || (y < h - 1 && bg[k + w]);
        if (edge) {
          const a = Math.min(1, Math.max(0, (mx(k) - T) / 60));
          for (let c = 0; c < 3; c++) d[i + c] = d[i + c] * a + 255 * (1 - a);
        }
      }
      sctx.putImageData(img, 0, 0);
    }

    // ٢) حدود القطعة مقارنة بلون الخلفية
    let br = 0, bgc = 0, bb = 0, n = 0;
    const p = 12;
    [[0, 0], [w - p, 0], [0, h - p], [w - p, h - p]].forEach(([cx, cy]) => {
      for (let y = cy; y < cy + p; y++) for (let x = cx; x < cx + p; x++) {
        const i = (y * w + x) * 4; br += d[i]; bgc += d[i + 1]; bb += d[i + 2]; n++;
      }
    });
    br /= n; bgc /= n; bb /= n;
    let minX = w, minY = h, maxX = -1, maxY = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (Math.max(Math.abs(d[i] - br), Math.abs(d[i + 1] - bgc), Math.abs(d[i + 2] - bb)) > 34) {
        if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
    if (maxX < 0) { minX = 0; minY = 0; maxX = w - 1; maxY = h - 1; }

    // ٣) مربع ١٠٠٠ بكسل والقطعة في المنتصف
    const SIZE = 1000, PAD = 0.07;
    const side = Math.max(maxX - minX + 1, maxY - minY + 1) * (1 + 2 * PAD);
    const sc = SIZE / side;
    const out = document.createElement("canvas");
    out.width = out.height = SIZE;
    const octx = out.getContext("2d");
    octx.fillStyle = "rgb(" + Math.round(br) + "," + Math.round(bgc) + "," + Math.round(bb) + ")";
    octx.fillRect(0, 0, SIZE, SIZE);
    octx.imageSmoothingQuality = "high";
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    octx.drawImage(src, SIZE / 2 - cx * sc, SIZE / 2 - cy * sc, w * sc, h * sc);

    const blob = await new Promise((r) => out.toBlob(r, "image/jpeg", 0.85));
    return { blob: blob, b64: await blobToB64(blob), url: URL.createObjectURL(blob) };
  }

  async function addImageFile(file, prefix) {
    const res = await processImage(file);
    const path = IMG_DIR + prefix + "-" + uid() + ".jpg";
    pending[path] = { b64: res.b64, url: res.url };
    return path;
  }

  /* ---------- تسجيل الدخول ---------- */
  async function tryLogin(t, remember) {
    token = t.trim();
    data = await loadData();      // يتحقق من صحة المفتاح والصلاحية بنفس الوقت
    if (remember) localStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.setItem(TOKEN_KEY, token);
    $("#loginView").hidden = true;
    $("#appView").hidden = false;
    $("#topActions").hidden = false;
    $("#loading").hidden = true;
    renderAll();
  }

  function logout() {
    if (changes && !confirm("لديك تعديلات غير منشورة ستضيع. هل تريد الخروج؟")) return;
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    changes = 0;
    location.reload();
  }

  /* ---------- العرض ---------- */
  function renderAll() {
    renderProductFilter();
    renderProducts();
    renderCategories();
    renderStore();
    renderContent();
    renderGallery();
    renderReviews();
  }

  const catName = (id) => (data.CATEGORIES.find((c) => c.id === id) || {}).name || "— بدون قسم —";

  function renderProductFilter() {
    const sel = $("#productCatFilter");
    const cur = sel.value;
    sel.innerHTML = '<option value="">كل الأقسام</option>' +
      data.CATEGORIES.map((c) => '<option value="' + esc(c.id) + '">' + esc(c.name) + "</option>").join("");
    sel.value = data.CATEGORIES.some((c) => c.id === cur) ? cur : "";
  }

  function filteredProducts() {
    const q = $("#productSearch").value.trim();
    const cat = $("#productCatFilter").value;
    return data.PRODUCTS.filter((p) =>
      (!cat || p.cat === cat) && (!q || (p.name + " " + (p.desc || "")).includes(q)));
  }

  function renderProducts() {
    const list = filteredProducts();
    $("#countProducts").textContent = "(" + data.PRODUCTS.length + ")";
    const box = $("#productList");
    if (!list.length) {
      box.innerHTML = '<div class="empty">لا توجد منتجات مطابقة.</div>';
      return;
    }
    box.innerHTML = list.map((p, i) => {
      const nImg = 1 + (p.imgs || []).length;
      const orphan = !data.CATEGORIES.some((c) => c.id === p.cat);
      return '<div class="item" data-id="' + p.id + '">' +
        (p.img ? '<img class="item__thumb" loading="lazy" src="' + esc(mediaUrl(p.img)) + '" alt="">'
               : '<div class="item__thumb item__thumb--empty">▢</div>') +
        '<div class="item__main">' +
          '<div class="item__name">' + esc(p.name) + "</div>" +
          '<div class="item__meta">' +
            "<span>" + esc(catName(p.cat)) + "</span>" +
            "<b>" + esc(p.price || ASK) + "</b>" +
            (nImg > 1 ? "<span>" + nImg + " صور</span>" : "") +
            (p.video ? "<span>▶ فيديو</span>" : "") +
            (p.badge ? '<span class="tag tag--new">' + esc(p.badge) + "</span>" : "") +
            (orphan ? '<span class="tag tag--warn">القسم محذوف</span>' : "") +
          "</div>" +
        "</div>" +
        '<div class="item__actions">' +
          '<button class="btn btn--icon" data-act="up" title="تحريك للأعلى"' + (i === 0 ? " disabled" : "") + ">▲</button>" +
          '<button class="btn btn--icon" data-act="down" title="تحريك للأسفل"' + (i === list.length - 1 ? " disabled" : "") + ">▼</button>" +
          '<button class="btn btn--ghost btn--sm" data-act="edit">تعديل</button>' +
        "</div>" +
      "</div>";
    }).join("");
  }

  function renderCategories() {
    $("#countCategories").textContent = "(" + data.CATEGORIES.length + ")";
    const box = $("#categoryList");
    if (!data.CATEGORIES.length) {
      box.innerHTML = '<div class="empty">لا توجد أقسام بعد.</div>';
      return;
    }
    box.innerHTML = data.CATEGORIES.map((c, i) => {
      const n = data.PRODUCTS.filter((p) => p.cat === c.id).length;
      return '<div class="item" data-id="' + esc(c.id) + '">' +
        (c.img ? '<img class="item__thumb" loading="lazy" src="' + esc(mediaUrl(c.img)) + '" alt="" onerror="this.style.visibility=\'hidden\'">'
               : '<div class="item__thumb item__thumb--empty">▢</div>') +
        '<div class="item__main">' +
          '<div class="item__name">' + esc(c.name) + "</div>" +
          '<div class="item__meta"><span>' + n + " منتج</span>" +
            (n ? "" : '<span class="tag">يظهر «قريباً»</span>') +
            (c.wide ? '<span class="tag">عريضة</span>' : "") +
          "</div>" +
        "</div>" +
        '<div class="item__actions">' +
          '<button class="btn btn--icon" data-act="up"' + (i === 0 ? " disabled" : "") + ">▲</button>" +
          '<button class="btn btn--icon" data-act="down"' + (i === data.CATEGORIES.length - 1 ? " disabled" : "") + ">▼</button>" +
          '<button class="btn btn--ghost btn--sm" data-act="edit">تعديل</button>' +
        "</div>" +
      "</div>";
    }).join("");
  }

  /* ---------- ترتيب ---------- */
  function moveProduct(id, dir) {
    const list = filteredProducts();
    const i = list.findIndex((p) => String(p.id) === String(id));
    const other = list[i + dir];
    if (!other) return;
    const a = data.PRODUCTS.indexOf(list[i]), b = data.PRODUCTS.indexOf(other);
    [data.PRODUCTS[a], data.PRODUCTS[b]] = [data.PRODUCTS[b], data.PRODUCTS[a]];
    markDirty();
    renderProducts();
  }

  function moveCategory(id, dir) {
    const i = data.CATEGORIES.findIndex((c) => c.id === id);
    const j = i + dir;
    if (j < 0 || j >= data.CATEGORIES.length) return;
    [data.CATEGORIES[i], data.CATEGORIES[j]] = [data.CATEGORIES[j], data.CATEGORIES[i]];
    markDirty();
    renderCategories();
    renderProductFilter();
  }

  /* ---------- نافذة المنتج ---------- */
  let editing = null;     // نسخة عمل من المنتج
  let editingIsNew = false;

  function openProduct(p) {
    editingIsNew = !p;
    const defaultCat = $("#productCatFilter").value || (data.CATEGORIES[0] || {}).id || "";
    editing = p ? JSON.parse(JSON.stringify(p))
                : { id: 0, cat: defaultCat, name: "", desc: "", price: ASK, img: "", imgs: [] };
    editing.media = [editing.img].concat(editing.imgs || []).filter(Boolean);

    const f = $("#productForm");
    $("#productDlgTitle").textContent = p ? "تعديل: " + p.name : "منتج جديد";
    f.elements.name.value = editing.name;
    f.elements.cat.innerHTML = data.CATEGORIES.map((c) => '<option value="' + esc(c.id) + '">' + esc(c.name) + "</option>").join("");
    f.elements.cat.value = editing.cat;
    f.elements.price.value = editing.price || "";
    f.elements.desc.value = editing.desc || "";
    f.elements.badge.value = editing.badgeType === "new" ? "new" : editing.badgeType === "hot" ? "hot" : "";
    $("#deleteProductBtn").hidden = !p;
    renderMedia();
    renderVideo();
    $("#productDlg").showModal();
  }

  function renderMedia() {
    const box = $("#productMedia");
    box.innerHTML = editing.media.map((path, i) =>
      '<div class="media' + (i === 0 ? " media--main" : "") + '" data-i="' + i + '">' +
        '<img src="' + esc(mediaUrl(path)) + '" alt="">' +
        (i === 0 ? '<span class="media__label">الرئيسية</span>' : "") +
        '<div class="media__tools">' +
          (i === 0 ? "<span></span>" : '<button type="button" data-media="main">★ رئيسية</button>') +
          '<button type="button" data-media="del">✕ حذف</button>' +
        "</div>" +
      "</div>"
    ).join("") + (editing.busy ? '<div class="media media--busy">جارٍ المعالجة…</div>' : "");
  }

  function renderVideo() {
    const box = $("#productVideo");
    box.innerHTML = editing.video
      ? '<div class="video-box"><video src="' + esc(mediaUrl(editing.video)) + '" muted loop autoplay playsinline></video>' +
        '<button type="button" class="btn btn--danger btn--sm" id="removeVideoBtn">حذف الفيديو</button></div>'
      : "";
  }

  async function onProductImages(files) {
    for (const file of files) {
      editing.busy = true;
      renderMedia();
      try {
        const path = await addImageFile(file, "p");
        editing.media.push(path);
      } catch (e) {
        toast("تعذّرت قراءة الصورة " + file.name + " — استخدم JPG أو PNG", "error");
      }
    }
    editing.busy = false;
    renderMedia();
  }

  async function onProductVideo(file) {
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      toast("حجم الفيديو أكبر من " + MAX_VIDEO_MB + " ميغابايت", "error");
      return;
    }
    const path = VID_DIR + "v-" + uid() + ".mp4";
    pending[path] = { b64: await blobToB64(file), url: URL.createObjectURL(file) };
    editing.video = path;
    renderVideo();
  }

  function saveProduct() {
    const f = $("#productForm");
    const name = f.elements.name.value.trim();
    if (!name) { f.elements.name.focus(); return false; }
    if (!f.elements.cat.value) { toast("أضف قسماً أولاً من تبويب «الأقسام»", "error"); return false; }
    if (!editing.media.length) { toast("أضف صورة واحدة على الأقل", "error"); return false; }

    const p = {
      id: editing.id || data.PRODUCTS.reduce((m, x) => Math.max(m, Number(x.id) || 0), 0) + 1,
      cat: f.elements.cat.value,
      name: name,
      desc: f.elements.desc.value.trim(),
      price: f.elements.price.value.trim() || ASK,
      img: editing.media[0]
    };
    if (editing.media.length > 1) p.imgs = editing.media.slice(1);
    if (editing.video) p.video = editing.video;
    if (f.elements.badge.value) {
      p.badge = f.elements.badge.value === "new" ? "جديد" : "الأكثر طلباً";
      p.badgeType = f.elements.badge.value;
    }

    if (editingIsNew) data.PRODUCTS.unshift(p);   // الجديد يظهر أولاً في قسمه
    else {
      const i = data.PRODUCTS.findIndex((x) => x.id === editing.id);
      data.PRODUCTS[i] = p;
    }
    markDirty();
    renderProducts();
    renderCategories();
    toast(editingIsNew ? "أُضيف المنتج — اضغط «نشر التغييرات» لحفظه على الموقع" : "حُفظ التعديل — اضغط «نشر التغييرات»");
    return true;
  }

  function deleteProduct() {
    if (!confirm("حذف «" + editing.name + "» نهائياً؟")) return;
    data.PRODUCTS = data.PRODUCTS.filter((x) => x.id !== editing.id);
    markDirty();
    $("#productDlg").close();
    renderProducts();
    renderCategories();
  }

  /* ---------- نافذة القسم ---------- */
  let editingCat = null;
  let editingCatIsNew = false;

  function openCategory(c) {
    editingCatIsNew = !c;
    editingCat = c ? JSON.parse(JSON.stringify(c)) : { id: "", name: "", desc: "", img: "" };
    const f = $("#categoryForm");
    $("#categoryDlgTitle").textContent = c ? "تعديل: " + c.name : "قسم جديد";
    f.elements.name.value = editingCat.name;
    f.elements.desc.value = editingCat.desc || "";
    f.elements.wide.checked = !!editingCat.wide;
    $("#deleteCategoryBtn").hidden = !c;

    renderIconGrid();
    $("#categoryDlg").showModal();
  }

  function renderIconGrid() {
    const current = editingCat.icon || "";
    const auto = guessCategoryIcon($("#categoryForm").elements.name.value);
    $("#categoryIconGrid").innerHTML =
      '<button type="button" class="icon-opt' + (current ? "" : " is-on") + '" data-icon="">' +
        categoryIconSvg({ icon: auto }) + "<span>تلقائي</span></button>" +
      Object.keys(CATEGORY_ICONS).filter((k) => k !== "generic").map((k) =>
        '<button type="button" class="icon-opt' + (current === k ? " is-on" : "") + '" data-icon="' + k + '">' +
          categoryIconSvg({ icon: k }) + "<span>" + esc(CATEGORY_ICONS[k].label) + "</span></button>").join("");
  }

  function saveCategory() {
    const f = $("#categoryForm");
    const name = f.elements.name.value.trim();
    if (!name) { f.elements.name.focus(); return false; }
    const c = { id: editingCat.id || "c-" + uid(), name: name, desc: f.elements.desc.value.trim(), img: editingCat.img || "" };
    if (editingCat.icon) c.icon = editingCat.icon;
    if (f.elements.wide.checked) c.wide = true;
    if (editingCatIsNew) data.CATEGORIES.push(c);
    else data.CATEGORIES[data.CATEGORIES.findIndex((x) => x.id === editingCat.id)] = c;
    markDirty();
    renderCategories();
    renderProductFilter();
    renderProducts();
    toast(editingCatIsNew ? "أُضيف القسم — اضغط «نشر التغييرات»" : "حُفظ التعديل — اضغط «نشر التغييرات»");
    return true;
  }

  function deleteCategory() {
    const n = data.PRODUCTS.filter((p) => p.cat === editingCat.id).length;
    if (n) { toast("في هذا القسم " + n + " منتج — انقلها لقسم آخر أو احذفها أولاً", "error"); return; }
    if (!confirm("حذف قسم «" + editingCat.name + "»؟")) return;
    data.CATEGORIES = data.CATEGORIES.filter((c) => c.id !== editingCat.id);
    markDirty();
    $("#categoryDlg").close();
    renderCategories();
    renderProductFilter();
  }

  /* ---------- معلومات المحل ---------- */
  const STORE_FIELDS = ["whatsapp", "phoneDisplay", "phoneDial", "email", "addressLine1", "addressLine2",
                        "mapsLink", "instagram", "snapchat", "tiktok"];

  function renderStore() {
    const f = $("#storeForm");
    STORE_FIELDS.forEach((k) => { f.elements[k].value = data.STORE[k] || ""; });
    renderHours();
  }

  function renderHours() {
    data.STORE.hours = data.STORE.hours || [];
    $("#hoursRows").innerHTML = data.STORE.hours.map((h, i) =>
      '<div class="hour-row" data-i="' + i + '">' +
        '<input data-h="day" value="' + esc(h.day) + '" placeholder="الأيام">' +
        '<input data-h="time" value="' + esc(h.time) + '" placeholder="الوقت">' +
        '<button type="button" class="btn btn--icon" data-h="del" aria-label="حذف">✕</button>' +
      "</div>").join("");
  }

  /* ---------- محتوى الصفحة ---------- */
  const SECTION_HEAD = (id, label) => [
    ["sections." + id + ".eyebrow", label + " — السطر الصغير"],
    ["sections." + id + ".title", label + " — العنوان"],
    ["sections." + id + ".sub", label + " — الوصف", "textarea"]
  ];
  const CONTENT_SCHEMA = [
    { title: "الواجهة الرئيسية", fields: [
      ["hero.eyebrow", "السطر الصغير فوق العنوان"],
      ["hero.titleStart", "العنوان — بداية السطر الأول"],
      ["hero.titleAccent", "العنوان — الكلمات المميّزة (بخط تحته)"],
      ["hero.titleEnd", "العنوان — السطر الثاني"],
      ["hero.lead", "الفقرة تحت العنوان", "textarea"],
      ["hero.images.0", "الصورة الكبيرة (المقوّسة)", "image"],
      ["hero.images.1", "الصورة الثانية", "image"],
      ["hero.images.2", "الصورة الثالثة", "image"],
      ["hero.badgeTitle", "الشارة العائمة — العنوان (اتركه فارغاً لإخفائها)"],
      ["hero.badgeText", "الشارة العائمة — النص"],
      ["hero.stats.0.value", "إحصائية ١ — الرقم"], ["hero.stats.0.label", "إحصائية ١ — الوصف"],
      ["hero.stats.1.value", "إحصائية ٢ — الرقم"], ["hero.stats.1.label", "إحصائية ٢ — الوصف"],
      ["hero.stats.2.value", "إحصائية ٣ — الرقم"], ["hero.stats.2.label", "إحصائية ٣ — الوصف"]
    ] },
    { title: "شريط المزايا (تحت الواجهة)", fields: [0, 1, 2, 3].flatMap((i) => [
      ["features." + i + ".title", "ميزة " + (i + 1) + " — العنوان"],
      ["features." + i + ".text", "ميزة " + (i + 1) + " — النص"]
    ]) },
    { title: "قسم «الأقسام»", fields: SECTION_HEAD("categories", "القسم") },
    { title: "قسم «المنتجات»", fields: SECTION_HEAD("products", "القسم") },
    { title: "من نحن", fields: [
      ["about.eyebrow", "السطر الصغير"],
      ["about.title", "العنوان"],
      ["about.text", "النص", "textarea"],
      ["about.image", "الصورة", "image"]
    ].concat([0, 1, 2, 3].flatMap((i) => [
      ["about.points." + i + ".title", "نقطة " + (i + 1) + " — العنوان"],
      ["about.points." + i + ".text", "نقطة " + (i + 1) + " — النص", "textarea"]
    ])) },
    { title: "قسم «المعرض»", fields: SECTION_HEAD("gallery", "القسم") },
    { title: "قسم «آراء العملاء»", fields: SECTION_HEAD("reviews", "القسم") },
    { title: "شريط الاستشارة", fields: [["cta.title", "العنوان"], ["cta.text", "النص", "textarea"]] },
    { title: "قسم «تواصل معنا»", fields: SECTION_HEAD("contact", "القسم") },
    { title: "التذييل", fields: [["footer.about", "النبذة تحت الشعار", "textarea"]] }
  ];

  const getAt = (obj, path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
  function setAt(obj, path, val) {
    const keys = path.split(".");
    let o = obj;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) { o[k] = val; return; }
      if (o[k] == null) o[k] = /^\d+$/.test(keys[i + 1]) ? [] : {};
      o = o[k];
    });
  }

  function renderContent() {
    data.CONTENT = data.CONTENT || {};
    $("#contentForm").innerHTML = CONTENT_SCHEMA.map((sec) =>
      "<fieldset><legend>" + esc(sec.title) + "</legend>" +
      sec.fields.map(([path, label, type]) => {
        const v = getAt(data.CONTENT, path) || "";
        if (type === "image") {
          return '<div class="field"><span>' + esc(label) + "</span>" +
            '<div class="img-field">' +
              (v ? '<img src="' + esc(mediaUrl(v)) + '" alt="">' : '<div class="item__thumb item__thumb--empty">▢</div>') +
              '<label class="upload"><input type="file" accept="image/*" hidden data-img-upload="' + path + '">' +
              '<span class="btn btn--ghost btn--sm">تغيير الصورة</span></label>' +
            "</div></div>";
        }
        const input = type === "textarea"
          ? '<textarea rows="3" data-path="' + path + '">' + esc(v) + "</textarea>"
          : '<input data-path="' + path + '" value="' + esc(v) + '">';
        return '<label class="field"><span>' + esc(label) + "</span>" + input + "</label>";
      }).join("") + "</fieldset>"
    ).join("");
  }

  /* ---------- المعرض ---------- */
  function renderGallery() {
    data.GALLERY = data.GALLERY || [];
    $("#countGallery").textContent = "(" + data.GALLERY.length + ")";
    const box = $("#galleryList");
    if (!data.GALLERY.length) { box.innerHTML = '<div class="empty">لا توجد صور — القسم مخفي في الموقع.</div>'; return; }
    box.innerHTML = data.GALLERY.map((g, i) =>
      '<div class="item gal-item" data-i="' + i + '">' +
        '<img class="item__thumb" loading="lazy" src="' + esc(mediaUrl(g.img)) + '" alt="">' +
        '<input data-gal-cap value="' + esc(g.cap || "") + '" placeholder="وصف الصورة (اختياري)">' +
        '<div class="item__actions">' +
          '<button class="btn btn--icon" data-gal="up"' + (i === 0 ? " disabled" : "") + ">▲</button>" +
          '<button class="btn btn--icon" data-gal="down"' + (i === data.GALLERY.length - 1 ? " disabled" : "") + ">▼</button>" +
          '<button class="btn btn--icon" data-gal="del" title="حذف">✕</button>' +
        "</div>" +
      "</div>").join("");
  }

  /* ---------- آراء العملاء ---------- */
  function renderReviews() {
    data.REVIEWS = data.REVIEWS || [];
    $("#countReviews").textContent = "(" + data.REVIEWS.length + ")";
    const box = $("#reviewList");
    if (!data.REVIEWS.length) { box.innerHTML = '<div class="empty">لا توجد آراء — القسم مخفي في الموقع.</div>'; return; }
    box.innerHTML = data.REVIEWS.map((r, i) =>
      '<div class="rev" data-i="' + i + '">' +
        '<div class="rev__head">' +
          '<input data-rev="name" value="' + esc(r.name || "") + '" placeholder="اسم العميل">' +
          '<input data-rev="from" value="' + esc(r.from || "") + '" placeholder="المنطقة (مثال: السالمية)">' +
          '<div class="rev__tools">' +
            '<button class="btn btn--icon" data-revact="up"' + (i === 0 ? " disabled" : "") + ">▲</button>" +
            '<button class="btn btn--icon" data-revact="down"' + (i === data.REVIEWS.length - 1 ? " disabled" : "") + ">▼</button>" +
            '<button class="btn btn--icon" data-revact="del" title="حذف">✕</button>' +
          "</div>" +
        "</div>" +
        '<textarea rows="2" data-rev="text" placeholder="نص الرأي">' + esc(r.text || "") + "</textarea>" +
      "</div>").join("");
  }

  function bindExtraTabs() {
    // محتوى الصفحة: نص
    $("#contentForm").addEventListener("input", (e) => {
      const p = e.target.dataset.path;
      if (!p) return;
      setAt(data.CONTENT, p, e.target.value.trim());
      markDirty("content." + p);
    });
    // محتوى الصفحة: صورة
    $("#contentForm").addEventListener("change", async (e) => {
      const p = e.target.dataset.imgUpload;
      if (!p || !e.target.files[0]) return;
      const box = e.target.closest(".img-field");
      box.classList.add("img-field--busy");
      try {
        setAt(data.CONTENT, p, await addImageFile(e.target.files[0], "site"));
        markDirty();
        renderContent();
      } catch (ex) {
        box.classList.remove("img-field--busy");
        toast("تعذّرت قراءة الصورة — استخدم JPG أو PNG", "error");
      }
    });

    // المعرض
    $("#galleryInput").addEventListener("change", async (e) => {
      const files = Array.from(e.target.files);
      e.target.value = "";
      for (const f of files) {
        try {
          data.GALLERY.push({ img: await addImageFile(f, "g"), cap: "" });
          markDirty();
          renderGallery();
        } catch (ex) { toast("تعذّرت قراءة الصورة " + f.name, "error"); }
      }
    });
    $("#galleryList").addEventListener("input", (e) => {
      if (!("galCap" in e.target.dataset)) return;
      const i = Number(e.target.closest(".item").dataset.i);
      data.GALLERY[i].cap = e.target.value.trim();
      markDirty("gal.cap." + i);
    });
    $("#galleryList").addEventListener("click", (e) => {
      const b = e.target.closest("[data-gal]");
      if (!b) return;
      const i = Number(b.closest(".item").dataset.i), G = data.GALLERY;
      if (b.dataset.gal === "del") { if (!confirm("حذف هذه الصورة من المعرض؟")) return; G.splice(i, 1); }
      if (b.dataset.gal === "up" && i > 0) [G[i - 1], G[i]] = [G[i], G[i - 1]];
      if (b.dataset.gal === "down" && i < G.length - 1) [G[i + 1], G[i]] = [G[i], G[i + 1]];
      markDirty();
      renderGallery();
    });

    // آراء العملاء
    $("#addReviewBtn").addEventListener("click", () => {
      data.REVIEWS.unshift({ text: "", name: "", from: "", initial: "" });
      markDirty();
      renderReviews();
      $("#reviewList [data-rev=name]").focus();
    });
    $("#reviewList").addEventListener("input", (e) => {
      const k = e.target.dataset.rev;
      if (!k) return;
      const i = Number(e.target.closest(".rev").dataset.i), r = data.REVIEWS[i];
      r[k] = e.target.value.trim();
      // الحرف الأول للصورة الرمزية (يتجاوز «أم» و«أبو»)
      if (k === "name") r.initial = (r.name.replace(/^(أم|ام|أبو|ابو)\s+/, "")[0] || "");
      markDirty("rev." + i + "." + k);
    });
    $("#reviewList").addEventListener("click", (e) => {
      const b = e.target.closest("[data-revact]");
      if (!b) return;
      const i = Number(b.closest(".rev").dataset.i), V = data.REVIEWS;
      if (b.dataset.revact === "del") { if (!confirm("حذف هذا الرأي؟")) return; V.splice(i, 1); }
      if (b.dataset.revact === "up" && i > 0) [V[i - 1], V[i]] = [V[i], V[i - 1]];
      if (b.dataset.revact === "down" && i < V.length - 1) [V[i + 1], V[i]] = [V[i], V[i + 1]];
      markDirty();
      renderReviews();
    });
  }

  /* ---------- الأحداث ---------- */
  function bind() {
    $("#repoName").textContent = CFG.owner + "/" + CFG.repo;

    $("#loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = $("#loginBtn"), err = $("#loginError");
      btn.disabled = true;
      btn.textContent = "جارٍ التحقق…";
      err.hidden = true;
      try {
        await tryLogin($("#tokenInput").value, $("#rememberInput").checked);
      } catch (ex) {
        err.textContent = friendlyError(ex);
        err.hidden = false;
      } finally {
        btn.disabled = false;
        btn.textContent = "دخول";
      }
    });

    $("#logoutBtn").addEventListener("click", logout);
    $("#publishBtn").addEventListener("click", publish);

    $$(".tab").forEach((t) => t.addEventListener("click", () => {
      $$(".tab").forEach((x) => x.classList.toggle("is-active", x === t));
      $$(".panel").forEach((p) => (p.hidden = p.id !== "tab-" + t.dataset.tab));
    }));

    // المنتجات
    $("#productSearch").addEventListener("input", renderProducts);
    $("#productCatFilter").addEventListener("change", renderProducts);
    $("#addProductBtn").addEventListener("click", () => {
      if (!data.CATEGORIES.length) { toast("أضف قسماً أولاً من تبويب «الأقسام»", "error"); return; }
      openProduct(null);
    });
    $("#productList").addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (!b) return;
      const id = b.closest(".item").dataset.id;
      if (b.dataset.act === "edit") openProduct(data.PRODUCTS.find((p) => String(p.id) === id));
      if (b.dataset.act === "up") moveProduct(id, -1);
      if (b.dataset.act === "down") moveProduct(id, 1);
    });
    $("#productImgInput").addEventListener("change", (e) => {
      onProductImages(Array.from(e.target.files));
      e.target.value = "";
    });
    $("#productVideoInput").addEventListener("change", (e) => {
      if (e.target.files[0]) onProductVideo(e.target.files[0]);
      e.target.value = "";
    });
    $("#productMedia").addEventListener("click", (e) => {
      const b = e.target.closest("[data-media]");
      if (!b) return;
      const i = Number(b.closest(".media").dataset.i);
      if (b.dataset.media === "del") editing.media.splice(i, 1);
      if (b.dataset.media === "main") editing.media.unshift(editing.media.splice(i, 1)[0]);
      renderMedia();
    });
    $("#productVideo").addEventListener("click", (e) => {
      if (e.target.id === "removeVideoBtn") { delete editing.video; renderVideo(); }
    });
    $("#priceAskBtn").addEventListener("click", () => { $("#productForm").elements.price.value = ASK; });
    $("#productForm").addEventListener("submit", (e) => {
      e.preventDefault();
      if (editing.busy) { toast("انتظر حتى تنتهي معالجة الصور"); return; }
      if (saveProduct()) $("#productDlg").close();
    });
    $("#deleteProductBtn").addEventListener("click", deleteProduct);

    // الأقسام
    $("#addCategoryBtn").addEventListener("click", () => openCategory(null));
    $("#categoryList").addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (!b) return;
      const id = b.closest(".item").dataset.id;
      if (b.dataset.act === "edit") openCategory(data.CATEGORIES.find((c) => c.id === id));
      if (b.dataset.act === "up") moveCategory(id, -1);
      if (b.dataset.act === "down") moveCategory(id, 1);
    });
    $("#categoryIconGrid").addEventListener("click", (e) => {
      const b = e.target.closest("[data-icon]");
      if (!b) return;
      editingCat.icon = b.dataset.icon;
      renderIconGrid();
    });
    // «تلقائي» يتبع اسم القسم أثناء الكتابة
    $("#categoryForm").elements.name.addEventListener("input", () => { if (!editingCat.icon) renderIconGrid(); });
    $("#categoryForm").addEventListener("submit", (e) => {
      e.preventDefault();
      if (saveCategory()) $("#categoryDlg").close();
    });
    $("#deleteCategoryBtn").addEventListener("click", deleteCategory);

    // إغلاق النوافذ
    $$("[data-close]").forEach((b) => b.addEventListener("click", () => b.closest("dialog").close()));

    // معلومات المحل — تُحفظ مباشرة عند الكتابة
    $("#storeForm").addEventListener("input", (e) => {
      const el = e.target;
      if (el.dataset.h) {
        const i = Number(el.closest(".hour-row").dataset.i);
        data.STORE.hours[i][el.dataset.h] = el.value;
        markDirty("hours." + i + "." + el.dataset.h);
      } else if (STORE_FIELDS.includes(el.name)) {
        data.STORE[el.name] = el.value.trim();
        markDirty("store." + el.name);
      }
    });
    $("#hoursRows").addEventListener("click", (e) => {
      if (e.target.dataset.h !== "del") return;
      data.STORE.hours.splice(Number(e.target.closest(".hour-row").dataset.i), 1);
      markDirty();
      renderHours();
    });
    $("#addHourBtn").addEventListener("click", () => {
      data.STORE.hours.push({ day: "", time: "" });
      markDirty();
      renderHours();
    });

    window.addEventListener("beforeunload", (e) => {
      if (changes) { e.preventDefault(); e.returnValue = ""; }
    });
  }

  /* ---------- التشغيل ---------- */
  bind();
  bindExtraTabs();
  const saved = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  if (saved) {
    $("#loginView").hidden = true;
    $("#appView").hidden = false;
    tryLogin(saved, !!localStorage.getItem(TOKEN_KEY)).catch((e) => {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      $("#appView").hidden = true;
      $("#loginView").hidden = false;
      $("#loginError").textContent = friendlyError(e);
      $("#loginError").hidden = false;
    });
  }
})();
