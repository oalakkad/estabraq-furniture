/* ==========================================================
   أيقونات الأقسام — خطوط رفيعة بنفس روح الشعار
   تُستخدم في الموقع وفي لوحة التحكم.
   لكل قسم حقل icon يحمل أحد المفاتيح أدناه؛
   وإن لم يوجد يُختار تلقائياً من اسم القسم.
   ========================================================== */
const CATEGORY_ICONS = {
  sofa: {
    label: "كنب",
    svg: '<path d="M11 30v-6a6 6 0 0 1 6-6h30a6 6 0 0 1 6 6v6"/>' +
         '<path d="M6 34a4 4 0 0 1 8 0v6h36v-6a4 4 0 0 1 8 0v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/>' +
         '<path d="M14 36h36"/><path d="M32 18v18"/><path d="M12 46v4M52 46v4"/>'
  },
  armchair: {
    label: "كرسي / فوتيه",
    svg: '<path d="M18 30v-8a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v8"/>' +
         '<path d="M12 34a4 4 0 0 1 8 0v6h24v-6a4 4 0 0 1 8 0v10a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z"/>' +
         '<path d="M20 36h24"/><path d="M17 46v6M47 46v6"/>'
  },
  coffee: {
    label: "ركن قهوة",
    svg: '<path d="M13 28h30v7a13 13 0 0 1-13 13h-4a13 13 0 0 1-13-13z"/>' +
         '<path d="M43 31h3a5 5 0 0 1 0 10h-4"/><path d="M9 54h38"/>' +
         '<path d="M21 13c-2 3 2 5 0 8M29 11c-2 3 2 5 0 8M37 13c-2 3 2 5 0 8"/>'
  },
  console: {
    label: "كونسول",
    svg: '<path d="M6 26h52"/><rect x="10" y="26" width="44" height="8" rx="1"/><path d="M29 30h6"/>' +
         '<path d="M13 34v20M51 34v20"/><path d="M13 47h38"/>' +
         '<path d="M28 26c-3-3-2-8 4-11 6 3 7 8 4 11"/>'
  },
  coffeetable: {
    label: "طاولة وسط",
    svg: '<rect x="6" y="30" width="52" height="6" rx="2"/><path d="M11 36v14M53 36v14"/><path d="M11 45h42"/>' +
         '<path d="M17 30v-5h12v5"/><path d="M37 30v-3a3 3 0 0 1 6 0v3"/>'
  },
  sidetable: {
    label: "طاولة تقديم",
    svg: '<ellipse cx="32" cy="22" rx="17" ry="4"/><path d="M32 26v20"/>' +
         '<path d="M21 52c2-4 6-6 11-6s9 2 11 6"/><path d="M17 52h30"/>' +
         '<path d="M26 18v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/>'
  },
  dining: {
    label: "طاولة طعام",
    svg: '<rect x="14" y="26" width="36" height="5" rx="1"/><path d="M19 31v21M45 31v21"/>' +
         '<path d="M5 16v36M5 38h7v14"/><path d="M59 16v36M59 38h-7v14"/>' +
         '<path d="M26 26v-5M38 26v-5M24 21h4M36 21h4"/>'
  },
  diningchair: {
    label: "كرسي طعام",
    svg: '<rect x="20" y="9" width="24" height="21" rx="4"/><path d="M26 15h12M26 21h12"/>' +
         '<path d="M22 30v3M42 30v3"/><rect x="16" y="33" width="32" height="6" rx="2"/>' +
         '<path d="M20 39v16M44 39v16"/>'
  },
  mirror: {
    label: "مرآة / ديكور",
    svg: '<path d="M20 54V24a12 12 0 0 1 24 0v30z"/><path d="M24 50V25a8 8 0 0 1 16 0v25z"/>' +
         '<path d="M29 31l6-6M29 39l9-9"/><path d="M14 54h36"/>'
  },
  bed: {
    label: "سرير",
    svg: '<path d="M8 50V18"/><path d="M8 30h14a4 4 0 0 1 4 4v4"/>' +
         '<path d="M8 38h46a4 4 0 0 1 4 4v8"/><path d="M8 44h50"/><path d="M8 50h0M58 50h0"/>'
  },
  wardrobe: {
    label: "دولاب / خزانة",
    svg: '<rect x="14" y="8" width="36" height="44" rx="2"/><path d="M32 8v44"/>' +
         '<path d="M28 28v6M36 28v6"/><path d="M18 52v4M46 52v4"/>'
  },
  lamp: {
    label: "إضاءة",
    svg: '<path d="M21 28l5-16h12l5 16z"/><path d="M32 28v22"/><path d="M23 54h18"/><path d="M28 50h8"/>'
  },
  rug: {
    label: "سجاد",
    svg: '<rect x="12" y="10" width="40" height="44" rx="2"/><rect x="18" y="16" width="28" height="32"/>' +
         '<path d="M32 22l8 10-8 10-8-10z"/><path d="M15 54v4M21 54v4M27 54v4M33 54v4M39 54v4M45 54v4M49 54v4"/>'
  },
  generic: {
    label: "عام",
    svg: '<rect x="10" y="10" width="19" height="19" rx="3"/><rect x="35" y="10" width="19" height="19" rx="3"/>' +
         '<rect x="10" y="35" width="19" height="19" rx="3"/><rect x="35" y="35" width="19" height="19" rx="3"/>'
  }
};

// اختيار أيقونة تلقائياً من اسم القسم
function guessCategoryIcon(name) {
  const n = String(name || "");
  const rules = [
    [/كراسي طعام|كرسي طعام/, "diningchair"],
    [/طاولات? طعام|سفر/, "dining"],
    [/قهوة|كوفي|ضيافة/, "coffee"],
    [/كونسول/, "console"],
    [/وسط/, "coffeetable"],
    [/تقديم|جانبي/, "sidetable"],
    [/كنب|ديوان|صال|جلس/, "sofa"],
    [/كرس|فوتي/, "armchair"],
    [/مرا|ديكور|لوح/, "mirror"],
    [/سرير|نوم/, "bed"],
    [/دولاب|خزان|خزائن/, "wardrobe"],
    [/إضاءة|اضاءة|ابجور|أباجور|لمب/, "lamp"],
    [/سجاد|زولي/, "rug"]
  ];
  for (const [re, key] of rules) if (re.test(n)) return key;
  return "generic";
}

function categoryIconSvg(cat) {
  const key = (cat && cat.icon && CATEGORY_ICONS[cat.icon]) ? cat.icon : guessCategoryIcon(cat && cat.name);
  return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round" ' +
         'stroke-linejoin="round" aria-hidden="true">' + CATEGORY_ICONS[key].svg + "</svg>";
}
