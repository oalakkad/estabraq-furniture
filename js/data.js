/* ==========================================================
   بيانات الموقع — هذا هو الملف الوحيد الذي تحتاج لتعديله
   لإضافة منتج جديد أو تغيير أرقام التواصل
   ========================================================== */

/* ---------- معلومات المحل ---------- */
const STORE = {
  name: "إستبرق",
  brandLatin: "ESTBRAQ Interiors",   // كما في الشعار — يظهر في سطر الحقوق

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
/* id يجب أن يطابق حقل cat في المنتجات بالأسفل.
   wide: true تجعل بطاقة القسم بعرض مضاعف.
   القسم الذي لا يحتوي منتجات يظهر بشارة «قريباً» تلقائياً —
   أضف منتجات إليه وستختفي الشارة. */
const CATEGORIES = [
  {
    id: "diwaniya",
    name: "ديوانيات",
    desc: "جلسات طويلة للدواوين ومجالس الضيوف",
    img: "assets/images/products/diwan-rimal-2.jpg",
    wide: true
  },
  {
    id: "living",
    name: "صالات",
    desc: "كنب صالات بأقمشة فاخرة وهياكل خشبية",
    img: "assets/images/products/sofa-olive.jpg",
    wide: true
  },
  {
    id: "chairs",
    name: "كراسي",
    desc: "فوتيهات وكراسي مفردة تكمّل مجلسك",
    img: "assets/images/products/chair-walnut.jpg"
  },
  {
    id: "coffeecorner",
    name: "ركنات القهوة",
    desc: "وحدات قهوة متكاملة بتخزين ومساحة للأجهزة",
    img: "assets/images/products/coffee-corner-bun.jpg"
  },
  {
    id: "console",
    name: "كونسولات",
    desc: "كونسولات أنيقة للمداخل والممرات",
    img: "assets/images/products/console-naht.jpg"
  },
  {
    id: "coffee",
    name: "طاولات وسط",
    desc: "طاولات وسط تتصدر الصالة",
    img: "assets/images/products/coffee-tanathur.jpg"
  },
  {
    id: "serving",
    name: "طاولات تقديم",
    desc: "طاولات جانبية وتقديم للضيافة",
    img: "assets/images/products/side-qasr.jpg"
  },
  {
    id: "dining",
    name: "طاولات طعام",
    desc: "طاولات تجمع العائلة حول مائدة واحدة",
    img: "assets/images/products/dining-1.jpg"
  },
  {
    id: "diningchairs",
    name: "كراسي طعام",
    desc: "كراسي طعام مريحة بتصاميم متنوعة",
    img: "assets/images/products/dining-chair-1.jpg"
  },
  {
    id: "decor",
    name: "مرايا وديكور",
    desc: "مرايا ولوحات خشبية تكمّل الجدار",
    img: "assets/images/products/decor-mirror-abaad.jpg"
  }
];

/* ---------- المنتجات ----------
   لإضافة منتج: انسخ أي كتلة { ... } والصقها، ثم غيّر القيم.
   cat   : معرّف التصنيف من القائمة أعلاه
   img   : الصورة الرئيسية داخل مجلد assets/images/products/
   imgs  : (اختياري) صور إضافية من زوايا أخرى — تظهر عند الضغط على المنتج
   video : (اختياري) فيديو للقطعة داخل مجلد assets/videos/
   badge : "جديد" أو "الأكثر طلباً" — أو احذف السطر
   price : اكتب السعر مثل "٣٢٠ د.ك" أو اترك "السعر عند الطلب"
   pos   : (اختياري) موضع قص الصورة داخل البطاقة، مثل "center 80%"
-------------------------------------------------- */
const P = "assets/images/products/";
const ASK = "السعر عند الطلب";

const PRODUCTS = [
  /* ===== ديوانيات ===== */
  {
    id: 22, cat: "diwaniya", name: "ديوانية «رمال»",
    desc: "ديوانية طويلة بقماش شمواه بلون الرمال، مساند عريضة ومجموعة وسائد متدرجة.",
    price: ASK, img: P + "diwan-rimal.jpg", imgs: [P + "diwan-rimal-2.jpg"],
    badge: "جديد", badgeType: "new"
  },
  {
    id: 19, cat: "diwaniya", name: "ديوانية «أصالة»",
    desc: "إطار جوز رفيع يحيط بالظهر والأذرع، أرجل مخروطية ووسائد أسطوانية جانبية.",
    price: ASK, img: P + "diwan-asala.jpg", imgs: [P + "diwan-asala-2.jpg"]
  },
  {
    id: 5, cat: "diwaniya", name: "ديوانية «هلال»",
    desc: "خط منحني أنيق بإطار جوز يلتف حول الظهر والأذرع، بقماش كريمي ووسائد متباينة.",
    price: ASK, img: P + "sofa-curved.jpg"
  },
  {
    id: 4, cat: "diwaniya", name: "ديوانية «سلطان»",
    desc: "ديوانية طويلة بحواف جوز داكنة وظهر مستقيم، تتسع لصف كامل من الوسائد المنقوشة.",
    price: ASK, img: P + "sofa-cushions.jpg"
  },
  {
    id: 13, cat: "diwaniya", name: "ديوانية «مجلس»",
    desc: "ديوانية متكاملة من ثلاث قطع كريمية بحواف جوز، مصممة للدواوين والمجالس الواسعة.",
    price: ASK, img: P + "set-majlis.jpg"
  },

  /* ===== صالات ===== */
  {
    id: 14, cat: "living", name: "كنبة «زيتون»",
    desc: "مخمل زيتوني داكن بأذرع دائرية مكسّرة، على أرجل جوز مخروطية.",
    price: ASK, img: P + "sofa-olive.jpg", imgs: [P + "sofa-olive-2.jpg", P + "sofa-olive-3.jpg"],
    badge: "جديد", badgeType: "new"
  },
  {
    id: 15, cat: "living", name: "كنبة «ملكي»",
    desc: "طراز كلاسيكي بإطار جوز محفور ولمسات ذهبية، قماش فيروزي ووسائد أسطوانية.",
    price: ASK, img: P + "sofa-royal.jpg", imgs: [P + "sofa-royal-2.jpg"],
    video: "assets/videos/sofa-royal.mp4"
  },
  {
    id: 6, cat: "living", name: "كنبة «موجة»",
    desc: "تصميم نحتي عصري بظهر متموج من ثلاث قطع، بقماش بوكليه أبيض ناعم.",
    price: ASK, img: P + "sofa-wave.jpg", imgs: [P + "sofa-wave-2.jpg"],
    video: "assets/videos/sofa-wave.mp4"
  },
  {
    id: 16, cat: "living", name: "كنبة «ديباج»",
    desc: "أذرع منحنية بقماش جاكار مطرّز، مقعد ناعم وقاعدة خشبية غائرة توحي بالطفو.",
    price: ASK, img: P + "sofa-damask.jpg", imgs: [P + "sofa-damask-2.jpg"],
    video: "assets/videos/sofa-damask.mp4"
  },
  {
    id: 17, cat: "living", name: "كنبة «نسيم»",
    desc: "كنبة منحنية غير متماثلة بذراع مكسّر مبطّن، بقماش رمادي دافئ.",
    price: ASK, img: P + "sofa-chaise.jpg",
    video: "assets/videos/sofa-chaise.mp4"
  },
  {
    id: 3, cat: "living", name: "كنبة «حرير»",
    desc: "ظهر منحني بمخمل كريمي ناعم وتنورة شراشيب كلاسيكية، مع وسائد حريرية لامعة.",
    price: ASK, img: P + "sofa-fringe.jpg", imgs: [P + "sofa-fringe-2.jpg"]
  },
  {
    id: 18, cat: "living", name: "كنبة «لؤلؤ»",
    desc: "خطوط ناعمة مع لمسة جوز على الذراعين — متوفرة بالأبيض والرمادي.",
    price: ASK, img: P + "sofa-pearl.jpg", imgs: [P + "sofa-pearl-2.jpg"]
  },
  {
    id: 20, cat: "living", name: "كنبة «صندل»",
    desc: "جوانب خشبية مستديرة بخطوط محفورة أفقياً، مع مقاعد رمادية فاتحة.",
    price: ASK, img: P + "sofa-sandal.jpg", imgs: [P + "sofa-sandal-2.jpg"]
  },
  {
    id: 21, cat: "living", name: "كنبة «ساج»",
    desc: "أذرع عريضة من قشرة الخشب الطبيعي تحتضن مقاعد بيضاء مريحة.",
    price: ASK, img: P + "sofa-saj.jpg"
  },
  {
    id: 23, cat: "living", name: "كنبة «غيمة»",
    desc: "ثلاثة مقاعد بيضاء على قاعدة جوز، مع وسائد أسطوانية بأزرار.",
    price: ASK, img: P + "sofa-ghaima.jpg"
  },
  {
    id: 12, cat: "living", name: "طقم «فيروز»",
    desc: "طقم صالة كريمي بقاعدة جوز، مع تشكيلة وسائد فيروزية وبيج منقوشة.",
    price: ASK, img: P + "set-teal.jpg"
  },
  {
    id: 1, cat: "living", name: "كنبة «عنبر»",
    desc: "مخمل بلون العنبر الدافئ على إطار جوز طبيعي بخطوط مائلة، مع ثلاث وسائد ساتان كريمية.",
    price: ASK, img: P + "sofa-amber.jpg", pos: "center 80%"
  },
  {
    id: 2, cat: "living", name: "كنبة «مشربية»",
    desc: "قاعدة خشبية مصمتة بنقش هندسي محفور مستوحى من المشربيات، مع مقاعد مخمل رمادي عريضة.",
    price: ASK, img: P + "sofa-mashrabiya.jpg"
  },

  /* ===== كراسي ===== */
  {
    id: 8, cat: "chairs", name: "فوتيه «ديوان»",
    desc: "كرسي بظهر مقوّس وإطار خشب داكن لامع، قماش جاكار رمادي وقاعدة بلمسة ذهبية.",
    price: ASK, img: P + "chair-tub.jpg"
  },
  {
    id: 7, cat: "chairs", name: "فوتيه «نقش»",
    desc: "إطار جوز بزوايا حادة يحتضن جانباً منقوشاً بقماش جاكار، ومقعد كتان كريمي مريح.",
    price: ASK, img: P + "chair-walnut.jpg"
  },
  {
    id: 9, cat: "chairs", name: "فوتيه «حرير»",
    desc: "الفوتيه المرافق لكنبة «حرير» — ظهر منحني وتنورة شراشيب بنفس المخمل الكريمي.",
    price: ASK, img: P + "chair-fringe.jpg"
  },
  {
    id: 10, cat: "chairs", name: "فوتيه «حديقة»",
    desc: "قماش بنقشة أوراق استوائية بألوان زاهية على إطار بلون الشمبانيا.",
    price: ASK, img: P + "chair-floral.jpg"
  },

  /* ===== ركنات القهوة ===== */
  {
    id: 24, cat: "coffeecorner", name: "ركن قهوة «بُن»",
    desc: "محطة قهوة من خشب الجوز بمساحة لماكينة الإسبريسو، رفوف للفناجين وأدراج للتخزين.",
    price: ASK, img: P + "coffee-corner-bun.jpg",
    badge: "جديد", badgeType: "new"
  },
  {
    id: 25, cat: "coffeecorner", name: "ركن قهوة «صباح»",
    desc: "وحدة طولية بقوس علوي ورفوف مفتوحة، سطح عمل بمقبس كهربائي وخزائن سفلية.",
    price: ASK, img: P + "coffee-corner-sabah.jpg",
    badge: "جديد", badgeType: "new"
  },

  /* ===== كونسولات ===== */
  {
    id: 27, cat: "console", name: "كونسول «نحت»",
    desc: "أرجل منحوتة من الجوز بخط متموج، وسطح خشبي بإطار زجاجي داكن.",
    price: ASK, img: P + "console-naht.jpg"
  },
  {
    id: 26, cat: "console", name: "كونسول «مدار»",
    desc: "سطح زجاجي شفاف على عمودين أسودين تعلوهما كرتان لامعتان.",
    price: ASK, img: P + "console-madar.jpg"
  },
  {
    id: 28, cat: "console", name: "كونسول «توازن»",
    desc: "قاعدتان مشقوقتان ترتكزان على كرتين — يأتي مع مرآة بإطار معدني منحني.",
    price: ASK, img: P + "console-tawazun.jpg"
  },
  {
    id: 29, cat: "console", name: "كونسول «طبقتين»",
    desc: "رفّان من الجوز بجوانب سوداء منحنية وسطح زجاجي — للمداخل أو تحت التلفاز.",
    price: ASK, img: P + "console-tabaqatain.jpg"
  },

  /* ===== طاولات وسط ===== */
  {
    id: 32, cat: "coffee", name: "طاولة وسط «تناظر»",
    desc: "كتلة من خشب الجوز بقشرة متناظرة على شكل حرف V — قطعة تتصدر الصالة.",
    price: ASK, img: P + "coffee-tanathur.jpg"
  },
  {
    id: 35, cat: "coffee", name: "طاولة وسط «رحى»",
    desc: "طاولة جوز بحواف دائرية ناعمة وسطح زجاجي، ترتفع فوق قاعدة غائرة.",
    price: ASK, img: P + "coffee-raha.jpg"
  },
  {
    id: 34, cat: "coffee", name: "طاولة وسط «تموّج»",
    desc: "زجاج مدخّن على قاعدة جوز منحنية بشكل موجة.",
    price: ASK, img: P + "coffee-tamawuj.jpg"
  },
  {
    id: 31, cat: "coffee", name: "طاولة وسط «طفو»",
    desc: "لوح خشبي سميك يبدو طافياً فوق قاعدة غائرة.",
    price: ASK, img: P + "coffee-tafw.jpg"
  },
  {
    id: 30, cat: "coffee", name: "طاولة وسط «نافذة»",
    desc: "إطار جوز رفيع بسطح زجاجي ورف سفلي للكتب والديكور.",
    price: ASK, img: P + "coffee-nafitha.jpg"
  },
  {
    id: 33, cat: "coffee", name: "طاولة وسط «طبقات»",
    desc: "طبقات خشبية متراكبة بزوايا متعاكسة وسطح زجاجي علوي.",
    price: ASK, img: P + "coffee-tabaqat.jpg"
  },

  /* ===== طاولات تقديم ===== */
  {
    id: 11, cat: "serving", name: "طاولة تقديم «صخر»",
    desc: "عمود من حجر الأردواز الطبيعي بسطح زجاجي شفاف وقطعة حجرية علوية.",
    price: ASK, img: P + "table-slate.jpg"
  },
  {
    id: 44, cat: "serving", name: "طاولة تقديم «قصر»",
    desc: "طراز كلاسيكي بأرجل مخددة وزخارف محفورة يدوياً، وسطح زجاجي.",
    price: ASK, img: P + "side-qasr.jpg"
  },
  {
    id: 36, cat: "serving", name: "طاولة تقديم «تاج»",
    desc: "جوز داكن بتيجان ذهبية محفورة على الأرجل وسطح زجاجي.",
    price: ASK, img: P + "side-taj.jpg"
  },
  {
    id: 39, cat: "serving", name: "طاولة تقديم «جرّة»",
    desc: "قاعدة جوز على شكل جرّة وسطح داكن بحواف مستديرة.",
    price: ASK, img: P + "side-jarra.jpg"
  },
  {
    id: 48, cat: "serving", name: "طاولة تقديم «توأم»",
    desc: "سطح بيضاوي على عمودين مستديرين من الجوز الداكن.",
    price: ASK, img: P + "side-tawam.jpg"
  },
  {
    id: 43, cat: "serving", name: "طاولة تقديم «ضفيرة»",
    desc: "سطح دائري على عمود مخرّم بشكل ضفيرة وقاعدة دائرية.",
    price: ASK, img: P + "side-dafira.jpg"
  },
  {
    id: 37, cat: "serving", name: "طاولة تقديم «غزال»",
    desc: "أرجل منحنية رشيقة من الجوز وسطح زجاجي داكن.",
    price: ASK, img: P + "side-ghazal.jpg"
  },
  {
    id: 38, cat: "serving", name: "طاولة تقديم «أعمدة»",
    desc: "أرجل مخددة بلون داكن وسطح حجري بإطار مصقول.",
    price: ASK, img: P + "side-aamida.jpg"
  },
  {
    id: 40, cat: "serving", name: "طاولة تقديم «حلقة»",
    desc: "عمود منحوت بفتحة بيضاوية على قاعدة متدرجة.",
    price: ASK, img: P + "side-halqa.jpg"
  },
  {
    id: 41, cat: "serving", name: "طاولة تقديم «منصة»",
    desc: "عمود جوز على شكل حرف T بسطح غائر داكن.",
    price: ASK, img: P + "side-minassa.jpg"
  },
  {
    id: 42, cat: "serving", name: "طاولة تقديم «انحناء»",
    desc: "خشب جوز منحني مع لوح أسود وسطح زجاجي — تنزلق بجانب الكنبة.",
    price: ASK, img: P + "side-inhina.jpg"
  },
  {
    id: 45, cat: "serving", name: "طاولة تقديم «جسر»",
    desc: "لوحان جانبيان من الجوز يحملان سطحاً زجاجياً داكناً.",
    price: ASK, img: P + "side-jisr.jpg"
  },
  {
    id: 50, cat: "serving", name: "طاولة تقديم «شلال»",
    desc: "خشب جوز ينساب من السطح إلى الأرض، مع لوح زجاجي مدمج.",
    price: ASK, img: P + "side-shallal.jpg"
  },
  {
    id: 47, cat: "serving", name: "طاولة تقديم «كتلة»",
    desc: "مكعب جوز بحواف مستديرة وسطح داكن مدمج.",
    price: ASK, img: P + "side-kutla.jpg"
  },
  {
    id: 49, cat: "serving", name: "طاولة تقديم «مكعّب»",
    desc: "مكعب جوز بسطح محفور بمربعات منتظمة.",
    price: ASK, img: P + "side-mukaab.jpg"
  },
  {
    id: 46, cat: "serving", name: "طاولة تقديم «رقعة»",
    desc: "عمود خشبي فاتح بسطح محفور بمربعات كرقعة الشطرنج.",
    price: ASK, img: P + "side-roqaa.jpg"
  },

  /* ===== مرايا وديكور ===== */
  {
    id: 52, cat: "decor", name: "مرآة «أبعاد»",
    desc: "لوح مرايا بتقسيمات هندسية مع حشوات منسوجة بلون ذهبي دافئ.",
    price: ASK, img: P + "decor-mirror-abaad.jpg"
  },
  {
    id: 51, cat: "decor", name: "مرآة «إطار»",
    desc: "مرآة طولية بإطار جوز بحواف مستديرة.",
    price: ASK, img: P + "decor-mirror-frame.jpg"
  },
  {
    id: 53, cat: "decor", name: "لوحات جدارية «جوز»",
    desc: "طقم من ثلاث لوحات خشبية بخطوط محفورة وقشرة متناظرة.",
    price: ASK, img: P + "decor-wall-panels.jpg"
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
