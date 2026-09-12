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
/* id يجب أن يطابق حقل cat في المنتجات بالأسفل */
const CATEGORIES = [
  {
    id: "coffee",
    name: "ركنات القهوة",
    desc: "ركن دافئ لقهوتك العربية وجلسات الضيوف",
    img: "assets/images/products/coffee-1.jpg",
    wide: true
  },
  {
    id: "sofas",
    name: "الكنب والجلسات",
    desc: "كنب مريح بأقمشة فاخرة وهيكل خشبي متين",
    img: "assets/images/products/sofa-1.jpg"
  },
  {
    id: "dining",
    name: "طاولات الطعام",
    desc: "طاولات عائلية تجمع الأحبة حول مائدة واحدة",
    img: "assets/images/products/dining-1.jpg"
  },
  {
    id: "tables",
    name: "الطاولات الجانبية",
    desc: "طاولات وسط وجانبية تكمّل تفاصيل مجلسك",
    img: "assets/images/products/table-1.jpg"
  },
  {
    id: "bedroom",
    name: "غرف النوم",
    desc: "سرير ودواليب بخشب طبيعي يبعث على الراحة",
    img: "assets/images/products/bed-1.jpg"
  }
];

/* ---------- المنتجات ----------
   لإضافة منتج: انسخ أي كتلة { ... } والصقها، ثم غيّر القيم.
   cat   : معرّف التصنيف من القائمة أعلاه
   img   : مسار الصورة داخل مجلد assets/images/products/
   badge : "جديد" أو "الأكثر طلباً" — أو احذف السطر
   price : اكتب السعر أو اترك "السعر عند الطلب"
-------------------------------------------------- */
const PRODUCTS = [
  {
    id: 1,
    name: "ركنة قهوة «دلة»",
    cat: "coffee",
    desc: "ركن قهوة بخشب البلوط الطبيعي مع رفوف مفتوحة لعرض الدلال والفناجيل، وإضاءة دافئة مدمجة.",
    price: "١٨٥ د.ك",
    img: "assets/images/products/coffee-1.jpg",
    badge: "الأكثر طلباً",
    badgeType: "hot"
  },
  {
    id: 2,
    name: "ركنة قهوة «سدرة»",
    cat: "coffee",
    desc: "تصميم مدمج يناسب المساحات الصغيرة، سطح رخامي مقاوم للحرارة ودرج سفلي للتخزين.",
    price: "١٤٠ د.ك",
    img: "assets/images/products/coffee-2.jpg"
  },
  {
    id: 3,
    name: "ركنة قهوة «ضيافة»",
    cat: "coffee",
    desc: "وحدة ضيافة كاملة بخزائن سفلية وواجهة خشبية محفورة يدوياً، مثالية للدواوين.",
    price: "٢٦٠ د.ك",
    img: "assets/images/products/coffee-3.jpg",
    badge: "جديد",
    badgeType: "new"
  },
  {
    id: 4,
    name: "كنبة «راحة» ٣ مقاعد",
    cat: "sofas",
    desc: "قماش مخملي بلون الرمل مع قاعدة خشب زان صلب، وسائد إسفنج عالي الكثافة لا يهبط.",
    price: "٣٢٠ د.ك",
    img: "assets/images/products/sofa-1.jpg",
    badge: "الأكثر طلباً",
    badgeType: "hot"
  },
  {
    id: 5,
    name: "جلسة أرضية «ديوانية»",
    cat: "sofas",
    desc: "جلسة عربية أصيلة بمساند ظهر ومخدات جانبية، تفصيل حسب أبعاد مجلسك.",
    price: "السعر حسب القياس",
    img: "assets/images/products/sofa-2.jpg"
  },
  {
    id: 6,
    name: "كنبة زاوية «واحة»",
    cat: "sofas",
    desc: "كنبة زاوية L بمساحة جلوس واسعة، قماش مقاوم للبقع وسهل التنظيف.",
    price: "٤٧٥ د.ك",
    img: "assets/images/products/sofa-3.jpg"
  },
  {
    id: 7,
    name: "طاولة طعام «مائدة» ٦ أشخاص",
    cat: "dining",
    desc: "خشب جوز طبيعي بسطح مصقول، أرجل مخروطية ثابتة، مع ٦ كراسي منجدة.",
    price: "٣٩٠ د.ك",
    img: "assets/images/products/dining-1.jpg"
  },
  {
    id: 8,
    name: "طاولة طعام «عائلة» ٨ أشخاص",
    cat: "dining",
    desc: "طاولة كبيرة للعزائم العائلية، إمكانية التمديد حتى ١٠ مقاعد، تشطيب مقاوم للخدش.",
    price: "٥٤٠ د.ك",
    img: "assets/images/products/dining-2.jpg",
    badge: "جديد",
    badgeType: "new"
  },
  {
    id: 9,
    name: "طقم فطور «صباح»",
    cat: "dining",
    desc: "طاولة صغيرة بأربعة كراسي، مناسبة لركن المطبخ أو الشقق الصغيرة.",
    price: "١٧٥ د.ك",
    img: "assets/images/products/dining-3.jpg"
  },
  {
    id: 10,
    name: "طاولة وسط «نخيل»",
    cat: "tables",
    desc: "طاولة وسط دائرية بخشب طبيعي وحواف ناعمة، سطح مزدوج للمجلات والضيافة.",
    price: "٨٥ د.ك",
    img: "assets/images/products/table-1.jpg"
  },
  {
    id: 11,
    name: "طاولة جانبية «ظل»",
    cat: "tables",
    desc: "طاولة جانبية نحيفة بجانب الكنبة، ارتفاع مثالي للكوب والكتاب.",
    price: "٤٥ د.ك",
    img: "assets/images/products/table-2.jpg"
  },
  {
    id: 12,
    name: "طاولة مكتب «هدوء»",
    cat: "tables",
    desc: "مكتب منزلي بسطح واسع ودرجين جانبيين، تشطيب خشبي دافئ يريح العين.",
    price: "١٢٠ د.ك",
    img: "assets/images/products/table-3.jpg"
  },
  {
    id: 13,
    name: "غرفة نوم «سكينة»",
    cat: "bedroom",
    desc: "سرير كينج بظهرية منجدة، كومودينو مزدوج، وتسريحة بمرآة — خشب طبيعي كامل.",
    price: "٦٨٠ د.ك",
    img: "assets/images/products/bed-1.jpg",
    badge: "الأكثر طلباً",
    badgeType: "hot"
  },
  {
    id: 14,
    name: "دولاب «مساحة»",
    cat: "bedroom",
    desc: "دولاب بأربعة أبواب ومرآة داخلية، تقسيمات داخلية قابلة للتعديل.",
    price: "٣١٠ د.ك",
    img: "assets/images/products/wardrobe-1.jpg"
  },
  {
    id: 15,
    name: "مكتبة «رفوف»",
    cat: "tables",
    desc: "مكتبة خشبية مفتوحة بخمسة رفوف، تصلح للكتب أو لعرض قطع الديكور.",
    price: "٩٥ د.ك",
    img: "assets/images/products/shelf-1.jpg"
  }
];

/* ---------- صور المعرض ---------- */
const GALLERY = [
  { img: "assets/images/gallery/g1.jpg", cap: "ركن قهوة بإضاءة دافئة" },
  { img: "assets/images/gallery/g2.jpg", cap: "مجلس عائلي بخشب الجوز" },
  { img: "assets/images/gallery/g3.jpg", cap: "طاولة طعام لثمانية أشخاص" },
  { img: "assets/images/gallery/g4.jpg", cap: "تفاصيل النقش اليدوي" },
  { img: "assets/images/gallery/g5.jpg", cap: "جلسة أرضية عربية" },
  { img: "assets/images/gallery/g6.jpg", cap: "معرضنا في الشويخ" },
  { img: "assets/images/gallery/g7.jpg", cap: "غرفة نوم بخشب طبيعي" },
  { img: "assets/images/gallery/g8.jpg", cap: "طاولات جانبية بتشطيب مصقول" }
];

/* ---------- آراء العملاء ---------- */
const REVIEWS = [
  {
    text: "طلبت ركنة قهوة بمقاس خاص لمجلسنا، وطلعت أحلى من الصورة. الخشب أصلي وثقيل، والتوصيل كان بالموعد بالضبط.",
    name: "أم عبدالله",
    from: "السالمية",
    initial: "ع"
  },
  {
    text: "اشتريت كنب الزاوية من سنة ونص، ولين اليوم ما هبط الإسفنج ولا تغير لون القماش. صراحة يستاهلون.",
    name: "فهد الرشيدي",
    from: "الجهراء",
    initial: "ف"
  },
  {
    text: "أفضل شي عندهم إنهم ينصحونك بالصدق. قالوا لي الطاولة الكبيرة ما تناسب مساحتي واقترحوا غيرها. تعامل محترم.",
    name: "نورة السالم",
    from: "الفنطاس",
    initial: "ن"
  }
];
