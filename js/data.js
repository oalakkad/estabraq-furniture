/* ==========================================================
   بيانات الموقع — هذا هو الملف الوحيد الذي تحتاج لتعديله
   لإضافة منتج جديد أو تغيير أرقام التواصل
   ========================================================== */

/* ---------- معلومات المحل ---------- */
const STORE = {
  name: "إستبرق",
  tagline: "للأثاث المنزلي",

  // ⚠️ ضع رقم الواتساب هنا بالصيغة الدولية بدون + وبدون مسافات
  // مثال للكويت: 96512345678
  whatsapp: "96500000000",

  // رقم الهاتف كما يظهر للزائر
  phoneDisplay: "+965 0000 0000",
  phoneDial: "+96500000000",

  email: "info@estabraq-kw.com",

  addressLine1: "الكويت — الشويخ الصناعية",
  addressLine2: "قطعة 1، شارع المعارض، مقابل مجمع الأثاث",

  // رابط الموقع على خرائط جوجل (اختياري)
  mapsLink: "https://maps.google.com/?q=Shuwaikh+Industrial+Kuwait",

  instagram: "https://instagram.com/",
  snapchat: "https://snapchat.com/",
  tiktok: "https://tiktok.com/",

  hours: [
    { day: "السبت — الخميس", time: "٩:٠٠ ص — ١:٠٠ م" },
    { day: "مساءً", time: "٤:٣٠ م — ١٠:٠٠ م" },
    { day: "الجمعة", time: "٤:٣٠ م — ١٠:٠٠ م" }
  ]
};

/* ---------- التصنيفات ---------- */
/* id يجب أن يطابق حقل cat في المنتجات بالأسفل
   wide: true تجعل بطاقة القسم تأخذ عرض مضاعف */
const CATEGORIES = [
  {
    id: "sofas",
    name: "الكنب",
    desc: "كنب بهياكل خشبية متينة وأقمشة مخملية فاخرة",
    img: "assets/images/products/sofa-curved.jpg",
    wide: true
  },
  {
    id: "chairs",
    name: "الفوتيهات والكراسي",
    desc: "قطع مفردة بإطارات جوز طبيعي تكمّل مجلسك",
    img: "assets/images/products/chair-tub.jpg"
  },
  {
    id: "tables",
    name: "الطاولات الجانبية",
    desc: "طاولات بالحجر الطبيعي والزجاج المصقول",
    img: "assets/images/products/table-slate.jpg"
  },
  {
    id: "sets",
    name: "الأطقم والجلسات",
    desc: "أطقم متكاملة للمجالس والدواوين بتنسيق واحد",
    img: "assets/images/products/set-majlis.jpg",
    wide: true
  }
];

/* ---------- المنتجات ----------
   لإضافة منتج: انسخ أي كتلة { ... } والصقها، ثم غيّر القيم.
   cat   : معرّف التصنيف من القائمة أعلاه
   img   : مسار الصورة داخل مجلد assets/images/products/
   badge : "جديد" أو "الأكثر طلباً" — أو احذف السطر
   price : اكتب السعر مثل "٣٢٠ د.ك" أو اترك "السعر عند الطلب"
   pos   : (اختياري) موضع قص الصورة داخل البطاقة، مثل "center 80%"
           مفيد إذا كانت القطعة في أسفل الصورة أو أعلاها
-------------------------------------------------- */
const PRODUCTS = [
  /* ===== الكنب ===== */
  {
    id: 1,
    name: "كنبة «عنبر»",
    cat: "sofas",
    desc: "مخمل بلون العنبر الدافئ على إطار جوز طبيعي بخطوط مائلة، مع ثلاث وسائد ساتان كريمية.",
    price: "السعر عند الطلب",
    img: "assets/images/products/sofa-amber.jpg",
    pos: "center 80%",
    badge: "الأكثر طلباً",
    badgeType: "hot"
  },
  {
    id: 2,
    name: "كنبة «مشربية»",
    cat: "sofas",
    desc: "قاعدة خشبية مصمتة بنقش هندسي محفور مستوحى من المشربيات، مع مقاعد مخمل رمادي عريضة.",
    price: "السعر عند الطلب",
    img: "assets/images/products/sofa-mashrabiya.jpg",
    badge: "جديد",
    badgeType: "new"
  },
  {
    id: 3,
    name: "كنبة «حرير»",
    cat: "sofas",
    desc: "ظهر منحني بمخمل كريمي ناعم وتنورة شراشيب كلاسيكية، مع وسائد حريرية لامعة.",
    price: "السعر عند الطلب",
    img: "assets/images/products/sofa-fringe.jpg",
    pos: "center 70%"
  },
  {
    id: 4,
    name: "كنبة «سلطان»",
    cat: "sofas",
    desc: "كنبة واسعة بحواف جوز داكنة وظهر مستقيم، تتسع لصف كامل من الوسائد المنقوشة.",
    price: "السعر عند الطلب",
    img: "assets/images/products/sofa-cushions.jpg"
  },
  {
    id: 5,
    name: "كنبة «هلال»",
    cat: "sofas",
    desc: "خط منحني أنيق بإطار جوز يلتف حول الظهر والأذرع، بقماش كريمي ووسائد متباينة.",
    price: "السعر عند الطلب",
    img: "assets/images/products/sofa-curved.jpg"
  },
  {
    id: 6,
    name: "كنبة «موجة»",
    cat: "sofas",
    desc: "تصميم نحتي عصري بظهر متموج من ثلاث قطع، بقماش بوكليه أبيض ناعم.",
    price: "السعر عند الطلب",
    img: "assets/images/products/sofa-wave.jpg"
  },

  /* ===== الفوتيهات والكراسي ===== */
  {
    id: 7,
    name: "فوتيه «نقش»",
    cat: "chairs",
    desc: "إطار جوز بزوايا حادة يحتضن جانباً منقوشاً بقماش جاكار، ومقعد كتان كريمي مريح.",
    price: "السعر عند الطلب",
    img: "assets/images/products/chair-walnut.jpg",
    badge: "جديد",
    badgeType: "new"
  },
  {
    id: 8,
    name: "فوتيه «ديوان»",
    cat: "chairs",
    desc: "كرسي بظهر مقوّس وإطار خشب داكن لامع، قماش جاكار رمادي وقاعدة بلمسة ذهبية.",
    price: "السعر عند الطلب",
    img: "assets/images/products/chair-tub.jpg"
  },
  {
    id: 9,
    name: "فوتيه «حرير»",
    cat: "chairs",
    desc: "الفوتيه المرافق لكنبة «حرير» — ظهر منحني وتنورة شراشيب بنفس المخمل الكريمي.",
    price: "السعر عند الطلب",
    img: "assets/images/products/chair-fringe.jpg"
  },
  {
    id: 10,
    name: "فوتيه «حديقة»",
    cat: "chairs",
    desc: "قماش بنقشة أوراق استوائية بألوان زاهية على إطار بلون الشمبانيا — قطعة تلفت النظر.",
    price: "السعر عند الطلب",
    img: "assets/images/products/chair-floral.jpg"
  },

  /* ===== الطاولات الجانبية ===== */
  {
    id: 11,
    name: "طاولة جانبية «صخر»",
    cat: "tables",
    desc: "عمود من حجر الأردواز الطبيعي بسطح زجاجي شفاف وقطعة حجرية علوية — تصميم نحتي بسيط.",
    price: "السعر عند الطلب",
    img: "assets/images/products/table-slate.jpg",
    badge: "الأكثر طلباً",
    badgeType: "hot"
  },

  /* ===== الأطقم والجلسات ===== */
  {
    id: 12,
    name: "طقم «فيروز»",
    cat: "sets",
    desc: "طقم كنب كريمي بقاعدة جوز، مع تشكيلة وسائد فيروزية وبيج منقوشة تجمع بين الهدوء والحيوية.",
    price: "السعر عند الطلب",
    img: "assets/images/products/set-teal.jpg"
  },
  {
    id: 13,
    name: "جلسة «مجلس»",
    cat: "sets",
    desc: "جلسة متكاملة من ثلاث كنبات كريمية بحواف جوز، مصممة للدواوين والمجالس الواسعة.",
    price: "السعر عند الطلب",
    img: "assets/images/products/set-majlis.jpg"
  }
];

/* ---------- صور المعرض ---------- */
/* الصورة الأولى تظهر بحجم كبير، والسادسة بعرض مضاعف */
const GALLERY = [
  { img: "assets/images/gallery/g1.jpg", cap: "كنبة «مشربية» بقاعدة خشبية محفورة" },
  { img: "assets/images/gallery/g2.jpg", cap: "تفاصيل قماش الجاكار على فوتيه «نقش»" },
  { img: "assets/images/gallery/g3.jpg", cap: "كنبة «حرير» بالشراشيب الكلاسيكية" },
  { img: "assets/images/gallery/g4.jpg", cap: "فوتيه «حرير» — القطعة المرافقة" },
  { img: "assets/images/gallery/g5.jpg", cap: "ملمس حجر الأردواز الطبيعي" },
  { img: "assets/images/gallery/g6.jpg", cap: "كنبة منحنية بقاعدة جوز" },
  { img: "assets/images/gallery/g7.jpg", cap: "فوتيه «حديقة» بنقشة الأوراق" },
  { img: "assets/images/gallery/g8.jpg", cap: "طاولة «صخر» من الأعلى" }
];

/* ---------- آراء العملاء ---------- */
/* ⚠️ هذه أمثلة توضيحية — استبدلها بآراء حقيقية أو احذفها */
const REVIEWS = [
  {
    text: "طلبت الكنبة بمقاس خاص لمجلسنا، وطلعت أحلى من الصورة. الخشب أصلي وثقيل، والتوصيل كان بالموعد بالضبط.",
    name: "أم عبدالله",
    from: "السالمية",
    initial: "ع"
  },
  {
    text: "اشتريت الفوتيهات من سنة ونص، ولين اليوم ما هبط الإسفنج ولا تغير لون القماش. صراحة يستاهلون.",
    name: "فهد الرشيدي",
    from: "الجهراء",
    initial: "ف"
  },
  {
    text: "أفضل شي عندهم إنهم ينصحونك بالصدق. قالوا لي الطقم الكبير ما يناسب مساحتي واقترحوا غيره. تعامل محترم.",
    name: "نورة السالم",
    from: "الفنطاس",
    initial: "ن"
  }
];
