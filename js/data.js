/* ==========================================================
   بيانات الموقع — تُدار من لوحة التحكم: admin.html
   يمكن تعديل هذا الملف يدوياً أيضاً، لكن حافظ على صيغة JSON
   (علامات تنصيص مزدوجة، وفواصل بين العناصر).
   ========================================================== */

const STORE = {
  "name": "إستبرق",
  "brandLatin": "ESTBRAQ Interiors",
  "whatsapp": "96500000000",
  "phoneDisplay": "+965 0000 0000",
  "phoneDial": "+96500000000",
  "email": "info@estabraq-kw.com",
  "addressLine1": "الكويت — الشويخ الصناعية",
  "addressLine2": "قطعة 1، شارع المعارض، مقابل مجمع الأثاث",
  "mapsLink": "https://maps.google.com/?q=Shuwaikh+Industrial+Kuwait",
  "instagram": "https://instagram.com/",
  "snapchat": "https://snapchat.com/",
  "tiktok": "https://tiktok.com/",
  "hours": [
    {
      "day": "السبت — الخميس",
      "time": "٩:٠٠ ص — ١:٠٠ م"
    },
    {
      "day": "مساءً",
      "time": "٤:٣٠ م — ١٠:٠٠ م"
    },
    {
      "day": "الجمعة",
      "time": "٤:٣٠ م — ١٠:٠٠ م"
    }
  ]
};

/* نصوص وصور أقسام الصفحة */
const CONTENT = {
  "hero": {
    "eyebrow": "صناعة كويتية · خشب طبيعي",
    "titleStart": "بيتك يستاهل",
    "titleAccent": "دفء الخشب",
    "titleEnd": "وراحة التفصيل",
    "lead": "من ركن القهوة إلى ديوانية الضيوف — نصنع ونوفّر أثاثاً يجمع بين المتانة والذوق الهادئ، بقياسات تناسب بيتك تماماً.",
    "stats": [
      {
        "value": "+١٢",
        "label": "سنة خبرة في السوق"
      },
      {
        "value": "+٤٠٠",
        "label": "بيت كويتي أثثناه"
      },
      {
        "value": "١٠٠٪",
        "label": "خشب طبيعي مضمون"
      }
    ],
    "badgeTitle": "ضمان سنتين",
    "badgeText": "على الهيكل الخشبي",
    "images": [
      "assets/images/hero-1.jpg",
      "assets/images/hero-2.jpg",
      "assets/images/hero-3.jpg"
    ]
  },
  "features": [
    {
      "title": "توصيل وتركيب مجاني",
      "text": "داخل الكويت للطلبات فوق ١٠٠ د.ك"
    },
    {
      "title": "تفصيل حسب المقاس",
      "text": "نصنع القطعة بأبعاد بيتك"
    },
    {
      "title": "ضمان سنتين",
      "text": "على الهيكل والصناعة"
    },
    {
      "title": "معرض في الشويخ",
      "text": "شوف القطعة قبل ما تشتري"
    }
  ],
  "sections": {
    "categories": {
      "eyebrow": "تصفّح حسب النوع",
      "title": "أقسام المعرض",
      "sub": "كل ما يحتاجه بيتك — من الديوانية إلى غرفة الطعام، بصناعة متقنة وتفصيل حسب الطلب."
    },
    "products": {
      "eyebrow": "معروضاتنا",
      "title": "قطع مختارة من المعرض",
      "sub": "اضغط على «اسأل عن السعر» لترسل لنا استفسارك مباشرة على واتساب مع اسم القطعة."
    },
    "gallery": {
      "eyebrow": "من أعمالنا",
      "title": "لقطات من المعرض",
      "sub": "اضغط على أي صورة لعرضها بالحجم الكامل."
    },
    "reviews": {
      "eyebrow": "ثقة عملائنا",
      "title": "شنو قالوا عنّا",
      "sub": "آراء وصلتنا من عملاء أثّثنا بيوتهم."
    },
    "contact": {
      "eyebrow": "تواصل معنا",
      "title": "نحن بانتظارك",
      "sub": "اتصل، راسلنا على واتساب، أو مُر علينا في المعرض — كلها تصل."
    }
  },
  "about": {
    "eyebrow": "من نحن",
    "title": "خشب صادق وأيادٍ تعرف شغلها",
    "text": "بدأنا قبل أكثر من اثنتي عشرة سنة بورشة صغيرة وفكرة واحدة: أن الأثاث الجيد لا يُشترى مرتين. نختار الخشب بأنفسنا، ونشرف على كل مرحلة من القص إلى التلميع، ولا تخرج القطعة من الورشة إلا ونحن راضون عنها.",
    "points": [
      {
        "title": "خامات مختارة",
        "text": "خشب زان وبلوط وجوز طبيعي — لا حشو ولا بدائل رخيصة تتفكك بعد سنة."
      },
      {
        "title": "تفصيل حسب طلبك",
        "text": "أرسل لنا مقاس المساحة واللون المفضل، ونرسم لك القطعة قبل التصنيع."
      },
      {
        "title": "التزام بالموعد",
        "text": "نحدد لك تاريخ تسليم واقعياً ونلتزم به — ونخبرك فوراً إن طرأ أي تأخير."
      },
      {
        "title": "خدمة بعد البيع",
        "text": "أي شدّة برغي أو تعديل بسيط خلال فترة الضمان — نجي لك بدون رسوم."
      }
    ],
    "image": "assets/images/about.jpg"
  },
  "cta": {
    "title": "عندك مساحة محتارة فيها؟",
    "text": "أرسل لنا صورة المكان ومقاساته، ونقترح عليك القطعة المناسبة مجاناً وبدون أي التزام."
  },
  "footer": {
    "about": "إستبرق للأثاث والتصميم الداخلي — ديوانيات وصالات وطاولات بصناعة متقنة وأسعار منصفة، نخدم البيت الكويتي منذ أكثر من اثنتي عشرة سنة."
  }
};

const CATEGORIES = [
  {
    "id": "sofas",
    "name": "كنب",
    "icon": "sofa",
    "desc": "كنب وديوانيات وأطقم صالات بأقمشة فاخرة",
    "img": "assets/images/products/sofa-olive-2.jpg",
    "wide": true
  },
  {
    "id": "chairs",
    "name": "كراسي",
    "icon": "armchair",
    "desc": "فوتيهات وكراسي مفردة تكمّل مجلسك",
    "img": "assets/images/products/chair-walnut.jpg"
  },
  {
    "id": "coffeecorner",
    "name": "ركنات القهوة",
    "icon": "coffee",
    "desc": "وحدات قهوة متكاملة بتخزين ومساحة للأجهزة",
    "img": "assets/images/products/coffee-corner-bun.jpg"
  },
  {
    "id": "console",
    "name": "كونسولات",
    "icon": "console",
    "desc": "كونسولات أنيقة للمداخل والممرات",
    "img": "assets/images/products/console-naht.jpg"
  },
  {
    "id": "coffee",
    "name": "طاولات وسط",
    "icon": "coffeetable",
    "desc": "طاولات وسط تتصدر الصالة",
    "img": "assets/images/products/coffee-tanathur.jpg"
  },
  {
    "id": "serving",
    "name": "طاولات تقديم",
    "icon": "sidetable",
    "desc": "طاولات جانبية وتقديم للضيافة",
    "img": "assets/images/products/side-qasr.jpg"
  },
  {
    "id": "dining",
    "name": "طاولات طعام",
    "icon": "dining",
    "desc": "طاولات تجمع العائلة حول مائدة واحدة",
    "img": "assets/images/products/dining-1.jpg"
  },
  {
    "id": "diningchairs",
    "name": "كراسي طعام",
    "icon": "diningchair",
    "desc": "كراسي طعام مريحة بتصاميم متنوعة",
    "img": "assets/images/products/dining-chair-1.jpg"
  },
  {
    "id": "decor",
    "name": "مرايا وديكور",
    "icon": "mirror",
    "desc": "مرايا ولوحات خشبية تكمّل الجدار",
    "img": "assets/images/products/decor-mirror-abaad.jpg"
  }
];

const PRODUCTS = [
  {
    "id": 14,
    "cat": "sofas",
    "name": "كنبة «زيتون»",
    "desc": "مخمل زيتوني داكن بأذرع دائرية مكسّرة، على أرجل جوز مخروطية.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-olive-2.jpg",
    "imgs": [
      "assets/images/products/sofa-olive.jpg",
      "assets/images/products/sofa-olive-3.jpg"
    ],
    "badge": "جديد",
    "badgeType": "new"
  },
  {
    "id": 15,
    "cat": "sofas",
    "name": "كنبة «ملكي»",
    "desc": "طراز كلاسيكي بإطار جوز محفور ولمسات ذهبية، قماش فيروزي ووسائد أسطوانية.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-royal-2.jpg",
    "imgs": [
      "assets/images/products/sofa-royal.jpg"
    ],
    "video": "assets/videos/sofa-royal.mp4"
  },
  {
    "id": 6,
    "cat": "sofas",
    "name": "كنبة «موجة»",
    "desc": "تصميم نحتي عصري بظهر متموج من ثلاث قطع، بقماش بوكليه أبيض ناعم.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-wave.jpg",
    "imgs": [
      "assets/images/products/sofa-wave-2.jpg"
    ],
    "video": "assets/videos/sofa-wave.mp4"
  },
  {
    "id": 16,
    "cat": "sofas",
    "name": "كنبة «ديباج»",
    "desc": "أذرع منحنية بقماش جاكار مطرّز، مقعد ناعم وقاعدة خشبية غائرة توحي بالطفو.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-damask-2.jpg",
    "imgs": [
      "assets/images/products/sofa-damask.jpg"
    ],
    "video": "assets/videos/sofa-damask.mp4"
  },
  {
    "id": 17,
    "cat": "sofas",
    "name": "كنبة «نسيم»",
    "desc": "كنبة منحنية غير متماثلة بذراع مكسّر مبطّن، بقماش رمادي دافئ.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-chaise.jpg",
    "video": "assets/videos/sofa-chaise.mp4"
  },
  {
    "id": 3,
    "cat": "sofas",
    "name": "كنبة «حرير»",
    "desc": "ظهر منحني بمخمل كريمي ناعم وتنورة شراشيب كلاسيكية، مع وسائد حريرية لامعة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-fringe-2.jpg",
    "imgs": [
      "assets/images/products/sofa-fringe.jpg"
    ]
  },
  {
    "id": 18,
    "cat": "sofas",
    "name": "كنبة «لؤلؤ»",
    "desc": "خطوط ناعمة مع لمسة جوز على الذراعين — متوفرة بالأبيض والرمادي.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-pearl.jpg",
    "imgs": [
      "assets/images/products/sofa-pearl-2.jpg"
    ]
  },
  {
    "id": 22,
    "cat": "sofas",
    "name": "ديوانية «رمال»",
    "desc": "ديوانية طويلة بقماش شمواه بلون الرمال، مساند عريضة ومجموعة وسائد متدرجة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/diwan-rimal-2.jpg",
    "imgs": [
      "assets/images/products/diwan-rimal.jpg"
    ],
    "badge": "جديد",
    "badgeType": "new"
  },
  {
    "id": 19,
    "cat": "sofas",
    "name": "ديوانية «أصالة»",
    "desc": "إطار جوز رفيع يحيط بالظهر والأذرع، أرجل مخروطية ووسائد أسطوانية جانبية.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/diwan-asala-2.jpg",
    "imgs": [
      "assets/images/products/diwan-asala.jpg"
    ]
  },
  {
    "id": 5,
    "cat": "sofas",
    "name": "ديوانية «هلال»",
    "desc": "خط منحني أنيق بإطار جوز يلتف حول الظهر والأذرع، بقماش كريمي ووسائد متباينة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-curved.jpg"
  },
  {
    "id": 20,
    "cat": "sofas",
    "name": "كنبة «صندل»",
    "desc": "جوانب خشبية مستديرة بخطوط محفورة أفقياً، مع مقاعد رمادية فاتحة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-sandal.jpg",
    "imgs": [
      "assets/images/products/sofa-sandal-2.jpg"
    ]
  },
  {
    "id": 21,
    "cat": "sofas",
    "name": "كنبة «ساج»",
    "desc": "أذرع عريضة من قشرة الخشب الطبيعي تحتضن مقاعد بيضاء مريحة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-saj.jpg"
  },
  {
    "id": 23,
    "cat": "sofas",
    "name": "كنبة «غيمة»",
    "desc": "ثلاثة مقاعد بيضاء على قاعدة جوز، مع وسائد أسطوانية بأزرار.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-ghaima.jpg"
  },
  {
    "id": 12,
    "cat": "sofas",
    "name": "طقم «فيروز»",
    "desc": "طقم صالة كريمي بقاعدة جوز، مع تشكيلة وسائد فيروزية وبيج منقوشة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/set-teal.jpg"
  },
  {
    "id": 1,
    "cat": "sofas",
    "name": "كنبة «عنبر»",
    "desc": "مخمل بلون العنبر الدافئ على إطار جوز طبيعي بخطوط مائلة، مع ثلاث وسائد ساتان كريمية.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-amber.jpg",
  },
  {
    "id": 2,
    "cat": "sofas",
    "name": "كنبة «مشربية»",
    "desc": "قاعدة خشبية مصمتة بنقش هندسي محفور مستوحى من المشربيات، مع مقاعد مخمل رمادي عريضة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-mashrabiya.jpg"
  },
  {
    "id": 4,
    "cat": "sofas",
    "name": "ديوانية «سلطان»",
    "desc": "ديوانية طويلة بحواف جوز داكنة وظهر مستقيم، تتسع لصف كامل من الوسائد المنقوشة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/sofa-cushions.jpg"
  },
  {
    "id": 13,
    "cat": "sofas",
    "name": "ديوانية «مجلس»",
    "desc": "ديوانية متكاملة من ثلاث قطع كريمية بحواف جوز، مصممة للدواوين والمجالس الواسعة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/set-majlis.jpg"
  },
  {
    "id": 7,
    "cat": "chairs",
    "name": "فوتيه «نقش»",
    "desc": "إطار جوز بزوايا حادة يحتضن جانباً منقوشاً بقماش جاكار، ومقعد كتان كريمي مريح.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/chair-walnut.jpg",
    "imgs": [
      "assets/images/products/chair-walnut-2.jpg"
    ]
  },
  {
    "id": 8,
    "cat": "chairs",
    "name": "فوتيه «ديوان»",
    "desc": "كرسي بظهر مقوّس وإطار خشب داكن لامع، مقعد مخمل كريمي وقاعدة بلمسة ذهبية.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/chair-tub.jpg",
    "imgs": [
      "assets/images/products/chair-tub-2.jpg"
    ]
  },
  {
    "id": 54,
    "cat": "chairs",
    "name": "فوتيه «ضحى»",
    "desc": "فوتيه أبيض ناعم بإطار رفيع بلون الشمبانيا ووسادة ظهر منفصلة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/chair-duha.jpg",
    "imgs": [
      "assets/images/products/chair-duha-2.jpg"
    ],
    "badge": "جديد",
    "badgeType": "new"
  },
  {
    "id": 55,
    "cat": "chairs",
    "name": "فوتيه «قمر»",
    "desc": "كرسي دائري بقاعدة مخددة وحلقة معدنية، بلون رملي هادئ.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/chair-qamar.jpg",
    "imgs": [
      "assets/images/products/chair-qamar-2.jpg"
    ],
    "badge": "جديد",
    "badgeType": "new"
  },
  {
    "id": 9,
    "cat": "chairs",
    "name": "فوتيه «حرير»",
    "desc": "الفوتيه المرافق لكنبة «حرير» — ظهر منحني وتنورة شراشيب بنفس المخمل الكريمي.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/chair-fringe.jpg"
  },
  {
    "id": 10,
    "cat": "chairs",
    "name": "فوتيه «حديقة»",
    "desc": "قماش بنقشة أوراق استوائية بألوان زاهية على إطار بلون الشمبانيا.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/chair-floral.jpg"
  },
  {
    "id": 24,
    "cat": "coffeecorner",
    "name": "ركن قهوة «بُن»",
    "desc": "محطة قهوة من خشب الجوز بمساحة لماكينة الإسبريسو، رفوف للفناجين وأدراج للتخزين.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/coffee-corner-bun.jpg",
    "badge": "جديد",
    "badgeType": "new"
  },
  {
    "id": 25,
    "cat": "coffeecorner",
    "name": "ركن قهوة «صباح»",
    "desc": "وحدة طولية بقوس علوي ورفوف مفتوحة، سطح عمل بمقبس كهربائي وخزائن سفلية.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/coffee-corner-sabah.jpg",
    "badge": "جديد",
    "badgeType": "new"
  },
  {
    "id": 27,
    "cat": "console",
    "name": "كونسول «نحت»",
    "desc": "أرجل منحوتة من الجوز بخط متموج، وسطح خشبي بإطار زجاجي داكن.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/console-naht.jpg"
  },
  {
    "id": 26,
    "cat": "console",
    "name": "كونسول «مدار»",
    "desc": "سطح زجاجي شفاف على عمودين أسودين تعلوهما كرتان لامعتان.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/console-madar.jpg"
  },
  {
    "id": 28,
    "cat": "console",
    "name": "كونسول «توازن»",
    "desc": "قاعدتان مشقوقتان ترتكزان على كرتين — يأتي مع مرآة بإطار معدني منحني.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/console-tawazun.jpg"
  },
  {
    "id": 29,
    "cat": "console",
    "name": "كونسول «طبقتين»",
    "desc": "رفّان من الجوز بجوانب سوداء منحنية وسطح زجاجي — للمداخل أو تحت التلفاز.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/console-tabaqatain.jpg"
  },
  {
    "id": 56,
    "cat": "console",
    "name": "كونسول «زاوية»",
    "desc": "لوحان جانبيان من الجوز بزوايا حادة ورف مائل يخترق التصميم.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/console-zawiya.jpg",
    "badge": "جديد",
    "badgeType": "new"
  },
  {
    "id": 32,
    "cat": "coffee",
    "name": "طاولة وسط «تناظر»",
    "desc": "كتلة من خشب الجوز بقشرة متناظرة على شكل حرف V — قطعة تتصدر الصالة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/coffee-tanathur.jpg"
  },
  {
    "id": 35,
    "cat": "coffee",
    "name": "طاولة وسط «رحى»",
    "desc": "طاولة جوز بحواف دائرية ناعمة وسطح زجاجي، ترتفع فوق قاعدة غائرة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/coffee-raha.jpg"
  },
  {
    "id": 34,
    "cat": "coffee",
    "name": "طاولة وسط «تموّج»",
    "desc": "زجاج مدخّن على قاعدة جوز منحنية بشكل موجة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/coffee-tamawuj.jpg"
  },
  {
    "id": 31,
    "cat": "coffee",
    "name": "طاولة وسط «طفو»",
    "desc": "لوح خشبي سميك يبدو طافياً فوق قاعدة غائرة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/coffee-tafw.jpg"
  },
  {
    "id": 30,
    "cat": "coffee",
    "name": "طاولة وسط «نافذة»",
    "desc": "إطار جوز رفيع بسطح زجاجي ورف سفلي للكتب والديكور.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/coffee-nafitha.jpg"
  },
  {
    "id": 33,
    "cat": "coffee",
    "name": "طاولة وسط «طبقات»",
    "desc": "طبقات خشبية متراكبة بزوايا متعاكسة وسطح زجاجي علوي.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/coffee-tabaqat.jpg"
  },
  {
    "id": 11,
    "cat": "serving",
    "name": "طاولة تقديم «صخر»",
    "desc": "عمود من حجر الأردواز الطبيعي بسطح زجاجي شفاف وقطعة حجرية علوية.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/table-slate.jpg"
  },
  {
    "id": 44,
    "cat": "serving",
    "name": "طاولة تقديم «قصر»",
    "desc": "طراز كلاسيكي بأرجل مخددة وزخارف محفورة يدوياً، وسطح زجاجي.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-qasr.jpg"
  },
  {
    "id": 36,
    "cat": "serving",
    "name": "طاولة تقديم «تاج»",
    "desc": "جوز داكن بتيجان ذهبية محفورة على الأرجل وسطح زجاجي.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-taj.jpg"
  },
  {
    "id": 39,
    "cat": "serving",
    "name": "طاولة تقديم «جرّة»",
    "desc": "قاعدة جوز على شكل جرّة وسطح داكن بحواف مستديرة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-jarra.jpg"
  },
  {
    "id": 48,
    "cat": "serving",
    "name": "طاولة تقديم «توأم»",
    "desc": "سطح بيضاوي على عمودين مستديرين من الجوز الداكن.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-tawam.jpg"
  },
  {
    "id": 43,
    "cat": "serving",
    "name": "طاولة تقديم «ضفيرة»",
    "desc": "سطح دائري على عمود مخرّم بشكل ضفيرة وقاعدة دائرية.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-dafira.jpg"
  },
  {
    "id": 37,
    "cat": "serving",
    "name": "طاولة تقديم «غزال»",
    "desc": "أرجل منحنية رشيقة من الجوز وسطح زجاجي داكن.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-ghazal.jpg"
  },
  {
    "id": 38,
    "cat": "serving",
    "name": "طاولة تقديم «أعمدة»",
    "desc": "أرجل مخددة بلون داكن وسطح حجري بإطار مصقول.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-aamida.jpg"
  },
  {
    "id": 40,
    "cat": "serving",
    "name": "طاولة تقديم «حلقة»",
    "desc": "عمود منحوت بفتحة بيضاوية على قاعدة متدرجة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-halqa.jpg"
  },
  {
    "id": 41,
    "cat": "serving",
    "name": "طاولة تقديم «منصة»",
    "desc": "عمود جوز على شكل حرف T بسطح غائر داكن.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-minassa.jpg"
  },
  {
    "id": 42,
    "cat": "serving",
    "name": "طاولة تقديم «انحناء»",
    "desc": "خشب جوز منحني مع لوح أسود وسطح زجاجي — تنزلق بجانب الكنبة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-inhina.jpg"
  },
  {
    "id": 45,
    "cat": "serving",
    "name": "طاولة تقديم «جسر»",
    "desc": "لوحان جانبيان من الجوز يحملان سطحاً زجاجياً داكناً.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-jisr.jpg"
  },
  {
    "id": 50,
    "cat": "serving",
    "name": "طاولة تقديم «شلال»",
    "desc": "خشب جوز ينساب من السطح إلى الأرض، مع لوح زجاجي مدمج.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-shallal.jpg"
  },
  {
    "id": 47,
    "cat": "serving",
    "name": "طاولة تقديم «كتلة»",
    "desc": "مكعب جوز بحواف مستديرة وسطح داكن مدمج.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-kutla.jpg"
  },
  {
    "id": 49,
    "cat": "serving",
    "name": "طاولة تقديم «مكعّب»",
    "desc": "مكعب جوز بسطح محفور بمربعات منتظمة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-mukaab.jpg"
  },
  {
    "id": 46,
    "cat": "serving",
    "name": "طاولة تقديم «رقعة»",
    "desc": "عمود خشبي فاتح بسطح محفور بمربعات كرقعة الشطرنج.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-roqaa.jpg"
  },
  {
    "id": 57,
    "cat": "serving",
    "name": "طاولة تقديم «سدو»",
    "desc": "صندوق من خشب الجوز بحزام محفور بنقش السدو الكويتي التقليدي.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/side-sadu.jpg",
    "badge": "جديد",
    "badgeType": "new"
  },
  {
    "id": 52,
    "cat": "decor",
    "name": "مرآة «أبعاد»",
    "desc": "لوح مرايا بتقسيمات هندسية مع حشوات منسوجة بلون ذهبي دافئ.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/decor-mirror-abaad.jpg"
  },
  {
    "id": 51,
    "cat": "decor",
    "name": "مرآة «إطار»",
    "desc": "مرآة طولية بإطار جوز بحواف مستديرة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/decor-mirror-frame.jpg"
  },
  {
    "id": 53,
    "cat": "decor",
    "name": "لوحات جدارية «جوز»",
    "desc": "طقم من ثلاث لوحات خشبية بخطوط محفورة وقشرة متناظرة.",
    "price": "السعر عند الطلب",
    "img": "assets/images/products/decor-wall-panels.jpg"
  }
];

const GALLERY = [
  {
    "img": "assets/images/gallery/g1.jpg",
    "cap": "كنبة «مشربية» بقاعدة خشبية محفورة"
  },
  {
    "img": "assets/images/gallery/g2.jpg",
    "cap": "تفاصيل قماش الجاكار على فوتيه «نقش»"
  },
  {
    "img": "assets/images/gallery/g3.jpg",
    "cap": "كنبة «حرير» بالشراشيب الكلاسيكية"
  },
  {
    "img": "assets/images/gallery/g4.jpg",
    "cap": "فوتيه «حرير» — القطعة المرافقة"
  },
  {
    "img": "assets/images/gallery/g5.jpg",
    "cap": "ملمس حجر الأردواز الطبيعي"
  },
  {
    "img": "assets/images/gallery/g6.jpg",
    "cap": "كنبة منحنية بقاعدة جوز"
  },
  {
    "img": "assets/images/gallery/g7.jpg",
    "cap": "فوتيه «حديقة» بنقشة الأوراق"
  },
  {
    "img": "assets/images/gallery/g8.jpg",
    "cap": "طاولة «صخر» من الأعلى"
  }
];

const REVIEWS = [
  {
    "text": "طلبت الكنبة بمقاس خاص لمجلسنا، وطلعت أحلى من الصورة. الخشب أصلي وثقيل، والتوصيل كان بالموعد بالضبط.",
    "name": "أم عبدالله",
    "from": "السالمية",
    "initial": "ع"
  },
  {
    "text": "اشتريت الفوتيهات من سنة ونص، ولين اليوم ما هبط الإسفنج ولا تغير لون القماش. صراحة يستاهلون.",
    "name": "فهد الرشيدي",
    "from": "الجهراء",
    "initial": "ف"
  },
  {
    "text": "أفضل شي عندهم إنهم ينصحونك بالصدق. قالوا لي الطقم الكبير ما يناسب مساحتي واقترحوا غيره. تعامل محترم.",
    "name": "نورة السالم",
    "from": "الفنطاس",
    "initial": "ن"
  }
];
