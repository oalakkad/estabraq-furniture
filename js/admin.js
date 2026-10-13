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
      const files = Object.keys(pending).filter((p) => used.has(p) || p === LOCK_PATH);

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
     نوعان:
     • "product" — صورة قطعة أثاث: الخلفية تصبح بيضاء (سوداء أو رمادية أو متدرجة)،
       وتُوسَّط القطعة نفسها (بدون الظلال الخفيفة) في مربع ١٠٠٠×١٠٠٠.
     • "photo"   — صورة حقيقية (غرفة، مصنع، معرض): تُصغَّر فقط وتبقى كما هي،
       وتملأ إطارها في الموقع (اسم الملف يبدأ بـ ph-). */
  async function loadToCanvas(file, maxSide) {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bmp, 0, 0, w, h);
    return { c, ctx, w, h };
  }

  async function canvasToResult(canvas, quality) {
    const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", quality));
    return { blob: blob, b64: await blobToB64(blob), url: URL.createObjectURL(blob) };
  }

  async function processPhoto(file) {
    const { c } = await loadToCanvas(file, 1600);
    return canvasToResult(c, 0.84);
  }

  async function processProduct(file) {
    const { c: src, ctx, w, h } = await loadToCanvas(file, 1600);
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;

    // لون الخلفية من الزوايا الأربع
    const p = Math.max(6, Math.round(Math.min(w, h) / 50));
    let cr = 0, cg = 0, cb = 0, n = 0;
    [[0, 0], [w - p, 0], [0, h - p], [w - p, h - p]].forEach(([x0, y0]) => {
      for (let y = y0; y < y0 + p; y++) for (let x = x0; x < x0 + p; x++) {
        const i = (y * w + x) * 4; cr += d[i]; cg += d[i + 1]; cb += d[i + 2]; n++;
      }
    });
    cr /= n; cg /= n; cb /= n;
    const cornerLum = (cr + cg + cb) / 3;
    const distBg = (i) => Math.max(Math.abs(d[i] - cr), Math.abs(d[i + 1] - cg), Math.abs(d[i + 2] - cb));
    const spread = (i) => Math.max(d[i], d[i + 1], d[i + 2]) - Math.min(d[i], d[i + 1], d[i + 2]);

    if (cornerLum >= 200 && cornerLum < 248) {
      // خلفية رمادية فاتحة: تفتيح بسيط يجعلها بيضاء ويحافظ على الأقمشة البيضاء
      for (let i = 0; i < d.length; i += 4) {
        d[i] = Math.min(255, d[i] * 255 / Math.max(1, cr));
        d[i + 1] = Math.min(255, d[i + 1] * 255 / Math.max(1, cg));
        d[i + 2] = Math.min(255, d[i + 2] * 255 / Math.max(1, cb));
      }
    } else if (cornerLum < 200) {
      // خلفية سوداء أو رمادية متدرجة: تعبئة من الأطراف عبر البكسلات المتقاربة
      const capDist = cornerLum < 40 ? 26 : 72;
      const bg = new Uint8Array(w * h);
      const stack = new Int32Array(w * h + 4 * (w + h));
      let sp = 0;
      const seed = (x, y) => { const k = y * w + x; if (distBg(k * 4) < 30) stack[sp++] = k; };
      for (let x = 0; x < w; x++) { seed(x, 0); seed(x, h - 1); }
      for (let y = 0; y < h; y++) { seed(0, y); seed(w - 1, y); }
      while (sp > 0) {
        const k = stack[--sp];
        if (bg[k]) continue;
        bg[k] = 1;
        const x = k % w, y = (k / w) | 0, ci = k * 4;
        const tryN = (nk) => {
          if (bg[nk]) return;
          const ni = nk * 4;
          const step = Math.max(Math.abs(d[ni] - d[ci]), Math.abs(d[ni + 1] - d[ci + 1]), Math.abs(d[ni + 2] - d[ci + 2]));
          if (step <= 6 && distBg(ni) <= capDist && spread(ni) < 30 && sp < stack.length) stack[sp++] = nk;
        };
        if (x > 0) tryN(k - 1);
        if (x < w - 1) tryN(k + 1);
        if (y > 0) tryN(k - w);
        if (y < h - 1) tryN(k + w);
      }
      const orig = new Uint8ClampedArray(d);
      for (let k = 0; k < w * h; k++) {
        const i = k * 4;
        if (bg[k]) { d[i] = d[i + 1] = d[i + 2] = 255; continue; }
        const x = k % w, y = (k / w) | 0;
        const edge = (x > 0 && bg[k - 1]) || (x < w - 1 && bg[k + 1]) || (y > 0 && bg[k - w]) || (y < h - 1 && bg[k + w]);
        if (edge) for (let c = 0; c < 3; c++) d[i + c] = (orig[i + c] + 255) / 2;
      }
    }
    ctx.putImageData(img, 0, 0);

    // حدود القطعة: نتجاهل البكسلات شبه البيضاء (ظلال خفيفة وانعكاسات)
    let minX = w, minY = h, maxX = -1, maxY = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (255 - Math.min(d[i], d[i + 1], d[i + 2]) > 60) {
        if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
    if (maxX < 0) { minX = 0; minY = 0; maxX = w - 1; maxY = h - 1; }

    // مربع ١٠٠٠ بكسل والقطعة في المنتصف على خلفية بيضاء
    const SIZE = 1000, PAD = 0.08;
    const side = Math.max(maxX - minX + 1, maxY - minY + 1) * (1 + 2 * PAD);
    const sc = SIZE / side;
    const out = document.createElement("canvas");
    out.width = out.height = SIZE;
    const octx = out.getContext("2d");
    octx.fillStyle = "#fff";
    octx.fillRect(0, 0, SIZE, SIZE);
    octx.imageSmoothingQuality = "high";
    octx.drawImage(src, SIZE / 2 - ((minX + maxX) / 2) * sc, SIZE / 2 - ((minY + maxY) / 2) * sc, w * sc, h * sc);
    return canvasToResult(out, 0.86);
  }

  // kind: "product" (افتراضي) أو "photo"
  async function addImageFile(file, prefix, kind) {
    const isPhoto = kind === "photo";
    const res = isPhoto ? await processPhoto(file) : await processProduct(file);
    const path = IMG_DIR + (isPhoto ? "ph-" : prefix + "-") + uid() + ".jpg";
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
    renderLayout();
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
          '<button class="btn btn--icon" data-act="link" title="نسخ رابط القسم"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg></button>' +
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
        const path = await addImageFile(file, "p", $("#cleanBgInput").checked ? "product" : "photo");
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
        setAt(data.CONTENT, p, await addImageFile(e.target.files[0], "site", "photo"));
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
          data.GALLERY.push({ img: await addImageFile(f, "g", "photo"), cap: "" });
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

  /* ==========================================================
     كلمة المرور — مفتاح GitHub محفوظ مشفّراً في js/admin-config.js
     (PBKDF2-SHA256 لاشتقاق المفتاح من كلمة المرور + AES-GCM للتشفير)
     ========================================================== */
  const LOCK_PATH = "js/admin-config.js";
  const LOCK_ITER = 600000;
  const b64e = (buf) => btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
  const b64d = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

  async function lockKey(password, salt, iter) {
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt: salt, iterations: iter, hash: "SHA-256" },
      base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }

  async function unlockToken(password) {
    if (typeof ADMIN_LOCK === "undefined" || !ADMIN_LOCK) throw Object.assign(new Error("nolock"), { code: "nolock" });
    try {
      const key = await lockKey(password, b64d(ADMIN_LOCK.salt), ADMIN_LOCK.iter);
      const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64d(ADMIN_LOCK.iv) }, key, b64d(ADMIN_LOCK.data));
      return new TextDecoder().decode(pt);
    } catch (e) {
      throw Object.assign(new Error("badpw"), { code: "badpw" });
    }
  }

  async function makeLockFile(secret, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await lockKey(password, salt, LOCK_ITER);
    const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, new TextEncoder().encode(secret));
    const lock = { v: 1, iter: LOCK_ITER, salt: b64e(salt), iv: b64e(iv), data: b64e(ct) };
    return "/* قفل لوحة التحكم — مفتاح GitHub مشفّر بكلمة المرور (PBKDF2 + AES-GCM).\n" +
           "   لا يمكن استخدامه بدون كلمة المرور. يُحدَّث من تبويب «الإعدادات» في لوحة التحكم. */\n" +
           "const ADMIN_LOCK = " + JSON.stringify(lock) + ";\n";
  }

  function stageLockFile(text) {
    pending[LOCK_PATH] = { b64: utf8ToB64(text), url: "" };
    markDirty("lockfile");
  }

  /* ==========================================================
     ترتيب الصفحة والأقسام المخصّصة
     ========================================================== */
  const BUILTIN_LABELS = {
    categories: "أقسام المنتجات",
    about: "من نحن",
    gallery: "المعرض / المصنع",
    reviews: "آراء العملاء",
    cta: "شريط الاستشارة",
    contact: "تواصل معنا"
  };
  const SECTION_TYPES = { text: "نص", split: "نص وصورة", images: "مجموعة صور", banner: "شريط دعوة" };

  function ensureLayout() {
    data.CONTENT = data.CONTENT || {};
    data.CONTENT.custom = data.CONTENT.custom || {};
    if (!Array.isArray(data.CONTENT.layout) || !data.CONTENT.layout.length) {
      data.CONTENT.layout = Object.keys(BUILTIN_LABELS).map((key) => ({ key: key, show: true }));
    }
    return data.CONTENT.layout;
  }

  function sectionLabel(key) {
    if (BUILTIN_LABELS[key]) {
      const t = getAt(data.CONTENT, "sections." + key + ".title");
      return BUILTIN_LABELS[key] + (t && key !== "categories" ? " — «" + t + "»" : "");
    }
    const s = data.CONTENT.custom[key] || {};
    return s.title || s.menu || "(قسم بدون عنوان)";
  }

  function renderLayout() {
    const layout = ensureLayout();
    $("#layoutList").innerHTML = layout.map((item, i) => {
      const custom = !BUILTIN_LABELS[item.key];
      const s = data.CONTENT.custom[item.key] || {};
      return '<div class="item layout-item' + (item.show === false ? " is-off" : "") + '" data-i="' + i + '">' +
        '<label class="switch" title="إظهار / إخفاء"><input type="checkbox" data-lay="toggle"' + (item.show === false ? "" : " checked") + "><span></span></label>" +
        '<div class="item__main">' +
          '<div class="item__name">' + esc(sectionLabel(item.key)) + "</div>" +
          '<div class="item__meta">' +
            (custom ? '<span class="tag tag--new">قسم مخصّص · ' + esc(SECTION_TYPES[s.type] || "نص") + "</span>" : '<span class="tag">قسم أساسي</span>') +
            (custom && s.menu ? "<span>في القائمة: " + esc(s.menu) + "</span>" : "") +
            (item.show === false ? '<span class="tag tag--warn">مخفي</span>' : "") +
          "</div>" +
        "</div>" +
        '<div class="item__actions">' +
          '<button class="btn btn--icon" data-lay="up"' + (i === 0 ? " disabled" : "") + ">▲</button>" +
          '<button class="btn btn--icon" data-lay="down"' + (i === layout.length - 1 ? " disabled" : "") + ">▼</button>" +
          '<button class="btn btn--ghost btn--sm" data-lay="edit">' + (custom ? "تعديل" : "تعديل النصوص") + "</button>" +
        "</div>" +
      "</div>";
    }).join("");
  }

  /* ----- نافذة القسم المخصّص ----- */
  let secEditing = null;     // { key, isNew, s }

  function openSection(key) {
    const isNew = !key;
    key = key || "x-" + uid();
    const s = isNew
      ? { type: "text", menu: "", eyebrow: "", title: "", text: "", image: "", side: "start", images: [], button: { label: "", type: "whatsapp", value: "" } }
      : JSON.parse(JSON.stringify(data.CONTENT.custom[key] || {}));
    s.images = s.images || [];
    s.button = s.button || { label: "", type: "whatsapp", value: "" };
    secEditing = { key: key, isNew: isNew, s: s };

    const f = $("#sectionForm").elements;
    $("#sectionDlgTitle").textContent = isNew ? "قسم جديد" : "تعديل القسم";
    f.eyebrow.value = s.eyebrow || "";
    f.title.value = s.title || "";
    f.text.value = s.text || "";
    f.side.value = s.side || "start";
    f.menu.value = s.menu || "";
    f.btnLabel.value = s.button.label || "";
    f.btnType.value = s.button.type || "whatsapp";
    f.btnValue.value = s.button.value || "";
    $("#deleteSectionBtn").hidden = isNew;
    setSectionType(s.type || "text");
    renderSecImage();
    renderSecImages();
    updateBtnHint();
    $("#sectionDlg").showModal();
  }

  function setSectionType(t) {
    secEditing.s.type = t;
    $$("#sectionTypes .type-opt").forEach((b) => b.classList.toggle("is-on", b.dataset.type === t));
    $$("#sectionForm [data-for]").forEach((el) => { el.hidden = !el.dataset.for.split(" ").includes(t); });
  }

  function updateBtnHint() {
    const link = $("#sectionForm").elements.btnType.value === "link";
    $("#btnValueLabel").textContent = link ? "الرابط (مثال: https://instagram.com/… أو #contact)" : "رسالة الواتساب الجاهزة";
    $("#sectionForm").elements.btnValue.dir = link ? "ltr" : "rtl";
  }

  function renderSecImage() {
    const v = secEditing.s.image;
    $("#secImage").innerHTML =
      (v ? '<img src="' + esc(mediaUrl(v)) + '" alt="">' : '<div class="item__thumb item__thumb--empty">▢</div>') +
      '<label class="upload"><input type="file" accept="image/*" hidden id="secImageInput">' +
      '<span class="btn btn--ghost btn--sm">' + (v ? "تغيير الصورة" : "رفع صورة") + "</span></label>";
  }

  function renderSecImages() {
    const list = secEditing.s.images;
    $("#secImages").innerHTML = list.length ? list.map((g, i) =>
      '<div class="item gal-item" data-i="' + i + '">' +
        '<img class="item__thumb" src="' + esc(mediaUrl(g.img)) + '" alt="">' +
        '<input data-secimg-cap value="' + esc(g.cap || "") + '" placeholder="تعليق (اختياري)">' +
        '<div class="item__actions"><button type="button" class="btn btn--icon" data-secimg-del title="حذف">✕</button></div>' +
      "</div>").join("") : '<div class="empty">لم تُضف صور بعد.</div>';
  }

  function saveSection() {
    const f = $("#sectionForm").elements, s = secEditing.s;
    s.eyebrow = f.eyebrow.value.trim();
    s.title = f.title.value.trim();
    s.text = f.text.value.trim();
    s.side = f.side.value;
    s.menu = f.menu.value.trim();
    s.button = { label: f.btnLabel.value.trim(), type: f.btnType.value, value: f.btnValue.value.trim() };
    if (!s.title && !s.text && !(s.type === "images" && s.images.length) && !(s.type === "split" && s.image)) {
      toast("أضف عنواناً أو نصاً أو صورة للقسم", "error");
      return false;
    }
    if (s.type === "split" && !s.image) { toast("أضف صورة لقسم «نص وصورة»", "error"); return false; }
    if (s.type === "images" && !s.images.length) { toast("أضف صورة واحدة على الأقل", "error"); return false; }
    // لا نحفظ الحقول غير المستخدمة لهذا النوع
    if (s.type !== "split") { delete s.image; delete s.side; }
    if (s.type !== "images") delete s.images;
    if (s.type === "banner") delete s.eyebrow;
    if (!s.button.label) delete s.button;

    data.CONTENT.custom[secEditing.key] = s;
    const layout = ensureLayout();
    if (secEditing.isNew) {
      // الجديد يوضع قبل «تواصل معنا» إن وُجد
      const ci = layout.findIndex((x) => x.key === "contact");
      layout.splice(ci < 0 ? layout.length : ci, 0, { key: secEditing.key, show: true });
    }
    markDirty();
    renderLayout();
    toast(secEditing.isNew ? "أُضيف القسم — اضغط «نشر التغييرات»" : "حُفظ القسم — اضغط «نشر التغييرات»");
    return true;
  }

  function deleteSection() {
    if (!confirm("حذف هذا القسم من الصفحة؟")) return;
    delete data.CONTENT.custom[secEditing.key];
    data.CONTENT.layout = ensureLayout().filter((x) => x.key !== secEditing.key);
    markDirty();
    $("#sectionDlg").close();
    renderLayout();
  }

  /* ----- رابط القسم (أقسام المنتجات) ----- */
  function siteUrl() {
    if (/\.github\.io$/i.test(location.hostname)) return "https://" + CFG.owner + ".github.io/" + CFG.repo + "/";
    return location.href.replace(/admin\.html.*$/, "index.html");
  }

  async function copyText(t) {
    try { await navigator.clipboard.writeText(t); }
    catch (e) {
      const ta = document.createElement("textarea");
      ta.value = t; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); ta.remove();
    }
  }

  function bindExtraTabs2() {
    // ترتيب الصفحة
    $("#addSectionBtn").addEventListener("click", () => openSection(null));
    $("#layoutList").addEventListener("click", (e) => {
      const b = e.target.closest("[data-lay]");
      if (!b || b.dataset.lay === "toggle") return;
      const i = Number(b.closest(".item").dataset.i), L = ensureLayout(), item = L[i];
      if (b.dataset.lay === "up" && i > 0) { [L[i - 1], L[i]] = [L[i], L[i - 1]]; markDirty(); renderLayout(); }
      if (b.dataset.lay === "down" && i < L.length - 1) { [L[i + 1], L[i]] = [L[i], L[i + 1]]; markDirty(); renderLayout(); }
      if (b.dataset.lay === "edit") {
        if (BUILTIN_LABELS[item.key]) {
          const tab = item.key === "gallery" || item.key === "reviews" ? item.key : item.key === "categories" ? "categories" : "content";
          $('.tab[data-tab="' + tab + '"]').click();
        } else openSection(item.key);
      }
    });
    $("#layoutList").addEventListener("change", (e) => {
      if (e.target.dataset.lay !== "toggle") return;
      const i = Number(e.target.closest(".item").dataset.i);
      ensureLayout()[i].show = e.target.checked;
      markDirty();
      renderLayout();
    });

    // نافذة القسم
    $("#sectionTypes").addEventListener("click", (e) => {
      const b = e.target.closest("[data-type]");
      if (b) setSectionType(b.dataset.type);
    });
    $("#sectionForm").elements.btnType.addEventListener("change", updateBtnHint);
    $("#secImage").addEventListener("change", async (e) => {
      if (e.target.id !== "secImageInput" || !e.target.files[0]) return;
      try { secEditing.s.image = await addImageFile(e.target.files[0], "sec", "photo"); renderSecImage(); }
      catch (ex) { toast("تعذّرت قراءة الصورة — استخدم JPG أو PNG", "error"); }
    });
    $("#secImagesInput").addEventListener("change", async (e) => {
      const files = Array.from(e.target.files);
      e.target.value = "";
      for (const f of files) {
        try { secEditing.s.images.push({ img: await addImageFile(f, "sec", "photo"), cap: "" }); renderSecImages(); }
        catch (ex) { toast("تعذّرت قراءة الصورة " + f.name, "error"); }
      }
    });
    $("#secImages").addEventListener("input", (e) => {
      if (!("secimgCap" in e.target.dataset)) return;
      secEditing.s.images[Number(e.target.closest(".item").dataset.i)].cap = e.target.value.trim();
    });
    $("#secImages").addEventListener("click", (e) => {
      if (!e.target.closest("[data-secimg-del]")) return;
      secEditing.s.images.splice(Number(e.target.closest(".item").dataset.i), 1);
      renderSecImages();
    });
    $("#sectionForm").addEventListener("submit", (e) => {
      e.preventDefault();
      if (saveSection()) $("#sectionDlg").close();
    });
    $("#deleteSectionBtn").addEventListener("click", deleteSection);

    // نسخ رابط قسم منتجات
    $("#categoryList").addEventListener("click", async (e) => {
      const b = e.target.closest("[data-act=link]");
      if (!b) return;
      await copyText(siteUrl() + "#c-" + encodeURIComponent(b.closest(".item").dataset.id));
      toast("نُسخ رابط القسم — أرسله للعميل مباشرة");
    });

    // الإعدادات: كلمة المرور
    $("#passwordForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const p1 = $("#newPassword").value, p2 = $("#newPassword2").value;
      if (p1.length < 6) { toast("كلمة المرور قصيرة — ٦ أحرف على الأقل", "error"); return; }
      if (p1 !== p2) { toast("كلمتا المرور غير متطابقتين", "error"); return; }
      stageLockFile(await makeLockFile(token, p1));
      $("#passwordForm").reset();
      toast("جاهزة — اضغط «نشر التغييرات» لتفعيل كلمة المرور الجديدة", "ok");
    });
    // الإعدادات: مفتاح جديد
    $("#tokenForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const t = $("#newToken").value.trim(), pw = $("#tokenPassword").value;
      if (!t) { toast("أدخل المفتاح الجديد", "error"); return; }
      if (pw.length < 6) { toast("أدخل كلمة مرور (٦ أحرف على الأقل)", "error"); return; }
      const old = token;
      token = t;
      try {
        await gh(repoPath("/contents/" + DATA_PATH + "?ref=" + encodeURIComponent(CFG.branch)));
      } catch (ex) {
        token = old;
        toast("المفتاح الجديد لا يعمل: " + friendlyError(ex), "error");
        return;
      }
      stageLockFile(await makeLockFile(t, pw));
      if (localStorage.getItem(TOKEN_KEY)) localStorage.setItem(TOKEN_KEY, t);
      else sessionStorage.setItem(TOKEN_KEY, t);
      $("#tokenForm").reset();
      toast("جاهز — اضغط «نشر التغييرات» لحفظ المفتاح الجديد", "ok");
    });
  }


  /* ---------- الأحداث ---------- */
  function bind() {
    $("#repoName").textContent = CFG.owner + "/" + CFG.repo;
    if (typeof ADMIN_LOCK === "undefined" || !ADMIN_LOCK) $("#tokenDetails").open = true;

    $("#loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = $("#loginBtn"), err = $("#loginError");
      btn.disabled = true;
      btn.textContent = "جارٍ التحقق…";
      err.hidden = true;
      try {
        const t = $("#tokenInput").value.trim();
        const pw = $("#passwordInput").value;
        if (t) await tryLogin(t, $("#rememberInput").checked);
        else if (pw) {
          btn.textContent = "جارٍ فتح القفل…";
          await tryLogin(await unlockToken(pw), $("#rememberInput").checked);
        } else throw Object.assign(new Error("empty"), { code: "empty" });
      } catch (ex) {
        err.textContent =
          ex.code === "badpw" ? "كلمة المرور غير صحيحة" :
          ex.code === "nolock" ? "لم تُضبط كلمة مرور بعد — استخدم «الدخول بمفتاح GitHub»" :
          ex.code === "empty" ? "أدخل كلمة المرور" :
          friendlyError(ex);
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
  bindExtraTabs2();
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
