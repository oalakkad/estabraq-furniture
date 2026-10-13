/* ==========================================================
   بيانات الموقع — تُدار من لوحة التحكم: admin.html
   يمكن تعديل هذا الملف يدوياً أيضاً، لكن حافظ على صيغة JSON
   (علامات تنصيص مزدوجة، وفواصل بين العناصر).
   ========================================================== */

const STORE = {
  "name": "إستبرق",
  "brandLatin": "ESTBRAQ Interiors",
  "whatsapp": "96599617559",
  "phoneDisplay": "+965 99617559",
  "phoneDial": "+96599617559",
  "email": "",
  "addressLine1": "الكويت — الري",
  "addressLine2": "قطعة 1، شارع 3 , خلف الافنيوز",
  "mapsLink": "https://maps.app.goo.gl/1biUQmznJoBo2fyi9?g_st=ic",
  "instagram": "https://www.instagram.com/estbraq_interiors?cplk=MTIwNDFibWZ4Mnh3dA%3D%3D&utm_source=qr",
  "snapchat": "",
  "tiktok": "",
  "hours": [
    {
      "day": "السبت — الخميس",
      "time": "١٠.٠٠ ص - ١٠.٠٠ م"
    },
    {
      "day": "الجمعة",
      "time": "عطلة "
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
    "lead": "من اصغر طاولة إلى ديوانية الضيوف — نصنع ونوفّر أثاثاً يجمع بين المتانة والذوق الهادئ، بقياسات تناسب بيتك تماماً.",
    "stats": [
      {
        "value": "+١٠",
        "label": "سنة خبرة في السوق"
      },
      {
        "value": "+٤٠٠",
        "label": "بيت كويتي أثثناه"
      },
      {
        "value": "١٠٠٪",
        "label": "خشب طبيعي مضمون ."
      }
    ],
    "badgeTitle": "ضمان ١٠ سنوات",
    "badgeText": "على الهيكل الخشبي",
    "images": [
      "assets/images/products/site-mv6e0ytehygh.jpg",
      "assets/images/products/site-mv568n7613a2.jpg",
      "assets/images/products/site-mv568rs7dk4u.jpg"
    ]
  },
  "features": [
    {
      "title": "توصيل وتركيب مجاني .",
      "text": "داخل الكويت ."
    },
    {
      "title": "تفصيل حسب المقاس",
      "text": "نصنع القطعة بأبعاد بيتك"
    },
    {
      "title": "ضمان ١٠ سنوات",
      "text": "على الهيكل والصناعة"
    },
    {
      "title": "معرض في الري",
      "text": "شوف القطعة بالمصنع مباشرة"
    }
  ],
  "sections": {
    "categories": {
      "eyebrow": "تصفّح حسب النوع",
      "title": "أقسام المعرض",
      "sub": "كل ما يحتاجه بيتك — من الديوانية إلى غرفة الطعام، بصناعة متقنة وتفصيل حسب الطلب."
    },
    "gallery": {
      "eyebrow": "من أعمالنا",
      "title": "لقطات من المصنع",
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
    "text": "بدأنا قبل أكثر من عشرة سنين بورشة صغيرة وفكرة واحدة: أن الأثاث الجيد لا يُشترى مرتين. نختار الخشب بأنفسنا، ونشرف على كل مرحلة من القص إلى التلميع، ولا تخرج القطعة من الورشة إلا ونحن راضون عنها.",
    "points": [
      {
        "title": "خامات مختارة",
        "text": "خشب زان و قشرة جوز طبيعي — لا حشو ولا بدائل رخيصة تتفكك بعد سنة."
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
    "image": "assets/images/products/site-mv56ch3r8r9o.jpg"
  },
  "cta": {
    "title": "عندك مساحة محتارة فيها؟",
    "text": "أرسل لنا صورة المكان ومقاساته، ونقترح عليك القطعة المناسبة مجاناً وبدون أي التزام."
  },
  "footer": {
    "about": "إستبرق للأثاث  — ديوانيات وصالات وطاولات بصناعة متقنة وأسعار منصفة، نخدم البيت الكويتي منذ أكثر من عشرة سنين ."
  },
  "layout": [
    {
      "key": "categories",
      "show": true
    },
    {
      "key": "about",
      "show": true
    },
    {
      "key": "gallery",
      "show": true
    },
    {
      "key": "reviews",
      "show": true
    },
    {
      "key": "cta",
      "show": true
    },
    {
      "key": "contact",
      "show": true
    }
  ],
  "custom": {}
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
    "id": "console",
    "name": "كونسولات",
    "icon": "console",
    "desc": "كونسولات أنيقة للمداخل والممرات",
    "img": "assets/images/products/console-naht.jpg"
  },
  {
    "id": "coffeecorner",
    "name": "ركنات القهوة",
    "icon": "coffee",
    "desc": "وحدات قهوة متكاملة بتخزين ومساحة للأجهزة",
    "img": "assets/images/products/coffee-corner-bun.jpg"
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
    "id": 15,
    "cat": "sofas",
    "name": "كنبة «ملكي»",
    "desc": "طراز كلاسيكي بإطار خشب زان محفور ولمسات ذهبية،",
    "price": "160 دك / المتر",
    "img": "assets/images/products/sofa-royal-2.jpg",
    "imgs": [
      "assets/images/products/sofa-royal.jpg",
      "assets/images/products/p-mv4ekix6vwxv.jpg",
      "assets/images/products/p-mv4ekiy204uq.jpg"
    ],
    "video": "assets/videos/sofa-royal.mp4",
    "badge": "الأكثر طلباً",
    "badgeType": "hot"
  },
  {
    "id": 23,
    "cat": "sofas",
    "name": "كنبة «غيمة»",
    "desc": "تتميز بقاعدة سفلية بارزة مصنوعة من الخشب الزان الطبيعي  ،  والتي تمتد لتشكل إطاراً يلتف حول الجوانب الخارجية للمساند الذراعية، مما يمنحها ثباتاً بصرياً ولمسة كلاسيكية مودرن",
    "price": "140 دك / المتر",
    "img": "assets/images/products/sofa-ghaima.jpg",
    "imgs": [
      "assets/images/products/p-mv4exmew8iyg.jpg"
    ]
  },
  {
    "id": 17,
    "cat": "sofas",
    "name": "كنبة «نسيم»",
    "desc": "كنبة منحنية غير متماثلة بذراع مكسّر مبطّن، بقماش رمادي دافئ.",
    "price": "140 دك / المتر",
    "img": "assets/images/products/sofa-chaise.jpg",
    "video": "assets/videos/sofa-chaise.mp4"
  },
  {
    "id": 19,
    "cat": "sofas",
    "name": "كنبة «أصالة»",
    "desc": "إطار من خشب الزان  الطبيعي يحيط بالظهر والأذرع،",
    "price": "130 دك / المتر",
    "img": "assets/images/products/diwan-asala-2.jpg",
    "imgs": [
      "assets/images/products/diwan-asala.jpg"
    ]
  },
  {
    "id": 5,
    "cat": "sofas",
    "name": "كنبة «هلال»",
    "desc": "خط منحني أنيق بإطار خشبي من الخشب الزان طبيعي يلتف حول الظهر والأذرع،",
    "price": "130 دك / للمتر",
    "img": "assets/images/products/sofa-curved.jpg"
  },
  {
    "id": 12,
    "cat": "sofas",
    "name": "كنبة «فيروز»",
    "desc": "طقم صالة كريمي بقاعدة جوز، مع تشكيلة وسائد فيروزية وبيج منقوشة.",
    "price": "130 دك / المتر",
    "img": "assets/images/products/set-teal.jpg"
  },
  {
    "id": 20,
    "cat": "sofas",
    "name": "كنبة «صندل»",
    "desc": "كنبة عصرية تجمع بين الأناقة والراحة، تتميز بتصميمها الهيكلي الفريد الذي يدمج بين الأقمشة الفاتحة و خشب قشرة الجوز الطبيعي ليعطي لمسة مودرن ودافئة في آن واحد.",
    "price": "130 دك / المتر",
    "img": "assets/images/products/sofa-sandal.jpg"
  },
  {
    "id": 58,
    "cat": "sofas",
    "name": "كنبة (( أوريليا ))",
    "desc": "تتميز بالأناقة و النعومة واللمسة الهادئة للخشب الزان الطبيعي .",
    "price": "125 دك / المتر",
    "img": "assets/images/products/p-mv4d8svsl9wl.jpg",
    "imgs": [
      "assets/images/products/p-mv4d8sz4q7a7.jpg",
      "assets/images/products/p-mv4d8t16onhg.jpg"
    ]
  },
  {
    "id": 16,
    "cat": "sofas",
    "name": "كنبة «ديباج»",
    "desc": "أذرع منحنية بقماش جاكار مطرّز، مقعد ناعم وقاعدة خشبية من قشرة الجوز الطبعي  غائرة توحي بالطفو.",
    "price": "125 دك / للمتر",
    "img": "assets/images/products/sofa-damask-2.jpg",
    "imgs": [
      "assets/images/products/sofa-damask.jpg"
    ]
  },
  {
    "id": 18,
    "cat": "sofas",
    "name": "كنبة «لؤلؤ»",
    "desc": "خطوط ناعمة مع لمسة خشب على الذراعين — متوفرة بجميع الالوان .",
    "price": "125 دك / المتر",
    "img": "assets/images/products/sofa-pearl.jpg"
  },
  {
    "id": 21,
    "cat": "sofas",
    "name": "كنبة «ساج»",
    "desc": "أذرع عريضة من قشرة الخشب الشيبورد الألماني تحتضن مقاعد مريحة.",
    "price": "125 دك / المتر",
    "img": "assets/images/products/sofa-saj.jpg"
  },
  {
    "id": 3,
    "cat": "sofas",
    "name": "كنبة «حرير»",
    "desc": "تتميز بالشكل الكلاسيكي مع وجود هدب يزيد من فخامة و أناقة الكنبة .",
    "price": "120 دك / المتر",
    "img": "assets/images/products/sofa-fringe-2.jpg",
    "imgs": [
      "assets/images/products/sofa-fringe.jpg"
    ]
  },
  {
    "id": 14,
    "cat": "sofas",
    "name": "كنبة «زيتون»",
    "desc": "مخمل زيتوني داكن بأذرع دائرية مكسّرة، على أرجل زان مخروطية.",
    "price": "120 دك / المتر",
    "img": "assets/images/products/sofa-olive-2.jpg",
    "imgs": [
      "assets/images/products/sofa-olive.jpg",
      "assets/images/products/sofa-olive-3.jpg"
    ]
  },
  {
    "id": 6,
    "cat": "sofas",
    "name": "كنبة «موجة»",
    "desc": "تصميم نحتي عصري بظهر متموج من ثلاث قطع، بقماش بوكليه أبيض ناعم.",
    "price": "120 دك / المتر",
    "img": "assets/images/products/sofa-wave.jpg",
    "imgs": [
      "assets/images/products/sofa-wave-2.jpg"
    ],
    "video": "assets/videos/sofa-wave.mp4"
  },
  {
    "id": 22,
    "cat": "sofas",
    "name": "كنبة «رمال»",
    "desc": "ديوانية طويلة بقماش شمواه بلون الرمال، مساند عريضة ومجموعة وسائد متدرجة.",
    "price": "100 دك / المتر",
    "img": "assets/images/products/diwan-rimal-2.jpg",
    "imgs": [
      "assets/images/products/diwan-rimal.jpg"
    ]
  },
  {
    "id": 7,
    "cat": "chairs",
    "name": "كرسي «نقش»",
    "desc": "إطار من خشب الزان الطبيعي بزوايا حادة يحتضن جانباً منقوشاً بقماش جاكار، ومقعد كتان كريمي مريح.",
    "price": "150 دك",
    "img": "assets/images/products/chair-walnut.jpg",
    "imgs": [
      "assets/images/products/chair-walnut-2.jpg"
    ]
  },
  {
    "id": 8,
    "cat": "chairs",
    "name": "كرسي«ديوان»",
    "desc": "كرسي بظهر مقوّس وإطار خشب داكن لامع، مقعد مخمل كريمي وقاعدة بلمسة ذهبية.",
    "price": "130 دك",
    "img": "assets/images/products/chair-tub.jpg",
    "imgs": [
      "assets/images/products/chair-tub-2.jpg"
    ]
  },
  {
    "id": 54,
    "cat": "chairs",
    "name": "كرسي «أوريليا»",
    "desc": "فوتيه أبيض ناعم بإطار رفيع بلون الشمبانيا ووسادة ظهر منفصلة.",
    "price": "125 دك",
    "img": "assets/images/products/chair-duha.jpg",
    "imgs": [
      "assets/images/products/chair-duha-2.jpg"
    ]
  },
  {
    "id": 55,
    "cat": "chairs",
    "name": "كرسي «قمر»",
    "desc": "كرسي دائري بقاعدة مخددة من الخشب الطبيعي .",
    "price": "125 دك",
    "img": "assets/images/products/chair-qamar.jpg",
    "imgs": [
      "assets/images/products/chair-qamar-2.jpg"
    ]
  },
  {
    "id": 24,
    "cat": "coffeecorner",
    "name": "ركن قهوة «بُن»",
    "desc": "محطة قهوة من خشب الشيبورد الالماني  بمساحة لماكينة الإسبريسو و برادة الماء ،  وأدراج للتخزين.\nقياس :\n180x170x90 cm",
    "price": "500 دك",
    "img": "assets/images/products/coffee-corner-bun.jpg"
  },
  {
    "id": 25,
    "cat": "coffeecorner",
    "name": "ركن قهوة «صباح»",
    "desc": "وحدة طولية بقوس علوي ورفوف مفتوحة، سطح عمل بمقبس كهربائي وخزائن سفلية.\nقياس :\n120x50x220 cm",
    "price": "450 دك",
    "img": "assets/images/products/coffee-corner-sabah.jpg"
  },
  {
    "id": 28,
    "cat": "console",
    "name": "كونسول «توازن»",
    "desc": "قاعدتان مشقوقتان ترتكزان على كرتين — يأتي مع مرآة بإطار معدني منحني.\nالقياس :\n200x45x90 cm",
    "price": "450 دك",
    "img": "assets/images/products/console-tawazun.jpg"
  },
  {
    "id": 56,
    "cat": "console",
    "name": "كونسول «زاوية»",
    "desc": "لوحان جانبيان من قشرة الجوز بزوايا حادة ورف مائل يخترق التصميم.\nالقياس :\n200x45x90 cm",
    "price": "350 دك",
    "img": "assets/images/products/console-zawiya.jpg"
  },
  {
    "id": 29,
    "cat": "console",
    "name": "كونسول «صندل»",
    "desc": "رفّان من خشب قشرة الجوز  بجوانب سوداء منحنية وسطح زجاجي — للمداخل أو تحت التلفاز.\nالقياس :\n200x45x90 cm",
    "price": "350 دك",
    "img": "assets/images/products/console-tabaqatain.jpg"
  },
  {
    "id": 27,
    "cat": "console",
    "name": "كونسول «نحت»",
    "desc": "أرجل منحوتة من قشرة الجوز الطبيعي بخط متموج، وسطح خشبي .\nالقياس :\n200x45x90 cm",
    "price": "300 دك",
    "img": "assets/images/products/p-mv4dcufzjx0a.jpg",
    "imgs": [
      "assets/images/products/console-naht.jpg"
    ],
    "badge": "جديد",
    "badgeType": "new"
  },
  {
    "id": 26,
    "cat": "console",
    "name": "كونسول «مدار»",
    "desc": "سطح زجاجي شفاف على عمودين أسودين تعلوهما كرتان لامعتان.\nالقياس :\n200x45x90 cm",
    "price": "280 دك",
    "img": "assets/images/products/console-madar.jpg"
  },
  {
    "id": 50,
    "cat": "console",
    "name": "كونسول «شلال»",
    "desc": "خشب قشرة الجوز ينساب من السطح إلى الأرض، مع لوح زجاجي مدمج.\nالقياس :\n200x45x90 cm",
    "price": "250 دك",
    "img": "assets/images/products/side-shallal.jpg"
  },
  {
    "id": 59,
    "cat": "coffee",
    "name": "طاولة (( استبرق ))",
    "desc": "طاولة استبرق ، تتميز بوجود قاعدة من الخشب الزان الطبيعي ، مع خشب قشرة الجوز الطبيعي مع تداخل اللون الصدفي في وسط الطاولة .\nالقياس : \n160x85x50 cm",
    "price": "350 دك",
    "img": "assets/images/products/p-mv4ehlf2vmqk.jpg",
    "badge": "الأكثر طلباً",
    "badgeType": "hot"
  },
  {
    "id": 30,
    "cat": "coffee",
    "name": "طاولة وسط «نافذة»",
    "desc": "إطار جوز رفيع بسطح زجاجي ورف سفلي للكتب والديكور.",
    "price": "320 دك",
    "img": "assets/images/products/coffee-nafitha.jpg"
  },
  {
    "id": 34,
    "cat": "coffee",
    "name": "طاولة وسط «تموّج»",
    "desc": "زجاج مدخّن على قاعدة من خشب الزان منحنية بشكل موجة.\nالقياس : \n160x85x45 cm",
    "price": "300 دك",
    "img": "assets/images/products/coffee-tamawuj.jpg"
  },
  {
    "id": 33,
    "cat": "coffee",
    "name": "طاولة وسط «طبقات»",
    "desc": "طبقات خشبية متراكبة بزوايا متعاكسة وسطح زجاجي علوي.",
    "price": "280 دك",
    "img": "assets/images/products/coffee-tabaqat.jpg"
  },
  {
    "id": 31,
    "cat": "coffee",
    "name": "طاولة وسط «طفو»",
    "desc": "لوح خشبي سميك يبدو طافياً فوق قاعدة غائرة.\nالقياس : \n160x85x50 cm",
    "price": "280 دك",
    "img": "assets/images/products/coffee-tafw.jpg"
  },
  {
    "id": 35,
    "cat": "coffee",
    "name": "طاولة وسط «رحى»",
    "desc": "طاولة من خشب قشرة الجوز بحواف دائرية ناعمة وسطح زجاجي، ترتفع فوق قاعدة غائرة.\nالقياس : \n160x85x50 cm",
    "price": "250 دك",
    "img": "assets/images/products/coffee-raha.jpg"
  },
  {
    "id": 32,
    "cat": "coffee",
    "name": "طاولة وسط «تناظر»",
    "desc": "كتلة من خشب الجوز بقشرة متناظرة على شكل حرف V — قطعة تتصدر الصالة.\nالقياس : \n160x85x50 cm",
    "price": "220 دك",
    "img": "assets/images/products/coffee-tanathur.jpg"
  },
  {
    "id": 48,
    "cat": "serving",
    "name": "طاولة تقديم «توأم»",
    "desc": "سطح بيضاوي على عمودين مستديرين من الخشب الداكن.\nالقياس :\n50x50x65 cm",
    "price": "85 دك",
    "img": "assets/images/products/side-tawam.jpg"
  },
  {
    "id": 42,
    "cat": "serving",
    "name": "طاولة تقديم «صندل»",
    "desc": "خشب من قشرة الجوز منحني مع لوح أسود وسطح زجاجي — تنزلق بجانب الكنبة.\nالقياس :\n60x40x50",
    "price": "85 دك",
    "img": "assets/images/products/side-inhina.jpg"
  },
  {
    "id": 44,
    "cat": "serving",
    "name": "طاولة تقديم «قصر»",
    "desc": "طراز كلاسيكي بأرجل مخددة وزخارف محفورة يدوياً، وسطح زجاجي.\nالقياس : \n60x35x50 cm",
    "price": "75 دك",
    "img": "assets/images/products/side-qasr.jpg"
  },
  {
    "id": 49,
    "cat": "serving",
    "name": "طاولة تقديم «مكعّب»",
    "desc": "مكعب من خشب قشرة الجوز بسطح محفور بمربعات منتظمة.\nالقياس :\n65x65x65 دك",
    "price": "75 دك",
    "img": "assets/images/products/side-mukaab.jpg"
  },
  {
    "id": 36,
    "cat": "serving",
    "name": "طاولة تقديم «ملكي»",
    "desc": "زان داكن بتيجان ذهبية محفورة على الأرجل وسطح زجاجي.\nالقياس :\n60x35x50 cm",
    "price": "65 دك",
    "img": "assets/images/products/side-taj.jpg"
  },
  {
    "id": 38,
    "cat": "serving",
    "name": "طاولة تقديم «أصالة»",
    "desc": "أرجل مخددة بلون داكن وسطح حجري بإطار مصقول.\nالقياس :\n60x35x50 cm",
    "price": "65 دك",
    "img": "assets/images/products/side-aamida.jpg"
  },
  {
    "id": 57,
    "cat": "serving",
    "name": "طاولة تقديم «سدو»",
    "desc": "صندوق من خشب قشر الجوز بحزام محفور بنقش السدو الكويتي التقليدي.\nالقياس : \n40x40x50 cm",
    "price": "65 دك",
    "img": "assets/images/products/side-sadu.jpg",
    "badge": "جديد",
    "badgeType": "new"
  },
  {
    "id": 37,
    "cat": "serving",
    "name": "طاولة تقديم «أوريليا»",
    "desc": "أرجل منحنية رشيقة من الخشب الزان وسطح زجاجي داكن.\nالقياس : \n60x35x50 cm",
    "price": "60 دك",
    "img": "assets/images/products/side-ghazal.jpg"
  },
  {
    "id": 39,
    "cat": "serving",
    "name": "طاولة تقديم «جرّة»",
    "desc": "قاعدة خشب على شكل جرّة وسطح داكن بحواف مستديرة.\nالقياس :\n35x35x50 cm",
    "price": "55 دك",
    "img": "assets/images/products/side-jarra.jpg"
  },
  {
    "id": 43,
    "cat": "serving",
    "name": "طاولة تقديم «ضفيرة»",
    "desc": "سطح دائري على عمود مخرّم بشكل ضفيرة وقاعدة دائرية.\nالقياس :\nقطر 35 cm \nالارتفاع 50 cm",
    "price": "50 دك",
    "img": "assets/images/products/side-dafira.jpg"
  },
  {
    "id": 40,
    "cat": "serving",
    "name": "طاولة تقديم «حلقة»",
    "desc": "عمود منحوت بفتحة بيضاوية على قاعدة متدرجة.\nالقياس :\n35x35x50 cm",
    "price": "50 دك",
    "img": "assets/images/products/side-halqa.jpg"
  },
  {
    "id": 41,
    "cat": "serving",
    "name": "طاولة تقديم «منصة»",
    "desc": "عمود من قشرة الجوز على شكل حرف T بسطح غائر داكن.\nالقياس :\n35x35x50cm",
    "price": "50 دك",
    "img": "assets/images/products/side-minassa.jpg"
  },
  {
    "id": 45,
    "cat": "serving",
    "name": "طاولة تقديم «جسر»",
    "desc": "لوحان جانبيان من قشرة الجوز يحملان سطحاً زجاجياً داكناً.\nالقياس :\n60x35x50 cm",
    "price": "50 دك",
    "img": "assets/images/products/side-jisr.jpg"
  },
  {
    "id": 47,
    "cat": "serving",
    "name": "طاولة تقديم «كتلة»",
    "desc": "مكعب من خشب قشرة الجوز بحواف مستديرة وسطح داكن مدمج.\nالقياس :\n40x40x50 cm",
    "price": "50 دك",
    "img": "assets/images/products/side-kutla.jpg"
  },
  {
    "id": 46,
    "cat": "serving",
    "name": "طاولة تقديم «رقعة»",
    "desc": "عمود خشبي فاتح بسطح محفور بمربعات كرقعة الشطرنج.\nالقياس :\n40x40x50 cm",
    "price": "50 دك",
    "img": "assets/images/products/side-roqaa.jpg"
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
    "id": 52,
    "cat": "decor",
    "name": "مرآة «أبعاد»",
    "desc": "لوح مرايا بتقسيمات هندسية مع حشوات منسوجة بلون ذهبي دافئ.",
    "price": "850 دك",
    "img": "assets/images/products/decor-mirror-abaad.jpg"
  },
  {
    "id": 53,
    "cat": "decor",
    "name": "لوحات جدارية «جوز»",
    "desc": "طقم من ثلاث لوحات خشبية بخطوط محفورة وقشرة متناظرة.",
    "price": "600 دك",
    "img": "assets/images/products/decor-wall-panels.jpg"
  },
  {
    "id": 51,
    "cat": "decor",
    "name": "مرآة «إطار»",
    "desc": "مرآة طولية بإطار جوز بحواف مستديرة.",
    "price": "280 دك",
    "img": "assets/images/products/decor-mirror-frame.jpg"
  }
];

const GALLERY = [
  {
    "img": "assets/images/products/g-mv6elfp7h0f8.jpg",
    "cap": ""
  },
  {
    "img": "assets/images/products/g-mv6elfqvxn1f.jpg",
    "cap": ""
  },
  {
    "img": "assets/images/products/g-mv6elfs4ng2d.jpg",
    "cap": ""
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
