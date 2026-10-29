// Source of truth for the section schemas in twilight-bundle.json and the templates/*.json files.
// Run from the repo root: node scripts/build-manifest.mjs
import fs from "node:fs";
import { templates } from "./lib/templates.mjs";
import { L, area, collection, color, colorFields, drop, icon, image, line, num, products, sectionBase, sw, text, url } from "./lib/fields.mjs";

const ROOT = process.cwd();

const components = [
  {
    title: "رأس الصفحة",
    icon: "sicon-store",
    name: "page-header",
    key: "35af0663-bba4-4a3d-96ad-5ae264c44778",
    image: "",
    props: { "min-height": "76px" },
    fields: [
      image("logo", "الشعار", "", "اتركه فارغاً لاستخدام شعار متجرك"),
      image("logo_dark", "شعار الوضع الداكن", "", "يظهر في الوضع الداكن وفوق الصور في الرأس الشفاف، وبدونه يظهر شعارك باللون الأبيض"),
      num("logo_height", "ارتفاع الشعار (px)", 56, 24, 140),
      drop("align", "مكان الشعار", [["center", "الوسط"], ["start", "البداية"]], "center"),
      line("hd-line-1"),
      sw("sticky", "تثبيت الرأس أعلى الصفحة عند التمرير", true),
      sw("transparent", "رأس شفاف فوق القسم الأول", false, "يظهر فوق صورة القسم الأول، وتظهر خلفيته عند التمرير"),
      sw("show_shadow", "خط سفلي للرأس", true),
      line("hd-line-2", "روابط أقسام الصفحة"),
      collection("nav", "رابط", [
        text("label", "النص", L("", "")),
        text("target", "معرّف القسم", "", { multilang: false, desc: "نفس المعرّف المكتوب في إعدادات القسم" }),
      ], [], 0, 6),
      line("hd-line-3", "زر الشراء"),
      sw("show_buy", "إظهار زر الشراء", true),
      text("buy_text", "نص الزر", L("تسوّق الآن", "Shop now")),
      line("hd-line-4", "ألوان الصفحة"),
      color("brand_color", "لون البراند", "", "لون واحد تُبنى منه ألوان الصفحة كلها في الوضع الفاتح والداكن. اتركه فارغاً لاستخدام ألوان متجرك"),
      sw("show_mode_toggle", "زر التبديل بين الوضع الفاتح والداكن", true, "يتذكر اختيار العميل"),
      drop("default_mode", "الوضع الافتراضي للصفحة", [["light", "فاتح"], ["dark", "داكن"], ["system", "حسب جهاز الزائر"]], "light"),
      // Here the colors adjust the whole page palette, so the header has no scheme of its own
      ...colorFields({ scheme: false }),
    ],
  },
  {
    title: "واجهة رمضان",
    icon: "sicon-moon",
    name: "ramadan-hero",
    key: "3eb7f40d-5a7c-42d7-a17f-128d7fd17648",
    image: "",
    props: { "min-height": "520px" },
    fields: [
      line("rh-line-0", "الصفحة بتتغير لوحدها مع التاريخ الهجري (تقويم أم القرى)"),
      num("day_shift", "تقديم أو تأخير يوم (لو الرؤية اختلفت)", 0, -2, 2, "مثلاً 1 لو رمضان بدأ بعد التقويم بيوم"),
      drop("preview_phase", "الحالة اللي تشوفها في المحرر", [["", "حسب التاريخ"], ["before", "قبل رمضان"], ["ramadan", "في رمضان"], ["last-ten", "العشر الأواخر"], ["eid", "العيد"]], "", "العملاء دايماً بيشوفوا الحالة الحقيقية"),
      image("image_1", "صورة القوس الأول", ""),
      image("image_2", "صورة القوس الثاني", ""),
      sw("show_lanterns", "فوانيس متعلقة", true),
      text("button_text", "نص الزر", L("تسوّق عروض رمضان", "Shop the Ramadan offers")),
      text("button_target", "معرّف القسم اللي الزر ينزل له", "moments", { multilang: false }),
      line("rh-line-before", "قبل رمضان"),
      text("before_badge", "شارة", L("رمضان على الأبواب", "Ramadan is near")),
      text("before_title", "العنوان", L("جهّز بيتك وسفرتك لرمضان", "Get your home ready for Ramadan"), { max: 100 }),
      area("before_subtitle", "الوصف", L("كل اللي تحتاجه لرمضان في مكان واحد، وهدية مع أول طلب", "Everything you need for Ramadan in one place, with a gift on your first order")),
      line("rh-line-ramadan", "في رمضان"),
      text("ramadan_badge", "شارة", L("رمضان كريم", "Ramadan Kareem")),
      text("ramadan_title", "العنوان", L("كل ليلة في رمضان أحلى", "Every Ramadan night, sweeter"), { max: 100 }),
      area("ramadan_subtitle", "الوصف", L("هدايا وسفرة وضيافة لأيام الشهر الكريم، وتوصيل لكل المدن", "Gifts, iftar tables and hospitality for the holy month, delivered to every city")),
      line("rh-line-last", "العشر الأواخر"),
      text("last_badge", "شارة", L("العشر الأواخر", "The last ten nights")),
      text("last_title", "العنوان", L("جهّز للعيد من الآن", "Get ready for Eid now"), { max: 100 }),
      area("last_subtitle", "الوصف", L("اطلب قبل آخر موعد عشان يوصلك قبل العيد", "Order before the cut-off to receive it before Eid")),
      line("rh-line-eid", "العيد"),
      text("eid_badge", "شارة", L("عيدكم مبارك", "Eid Mubarak")),
      text("eid_title", "العنوان", L("عيدكم مبارك، وكل عام وأنتم بخير", "Eid Mubarak to you and yours"), { max: 100 }),
      area("eid_subtitle", "الوصف", L("هدايا العيد والعيديات جاهزة", "Eid gifts are ready")),
      line("rh-line-after", "بعد العيد"),
      text("after_badge", "شارة", L("", "")),
      text("after_title", "العنوان", L("", ""), { max: 100 }),
      area("after_subtitle", "الوصف", L("", "")),
      ...colorFields(),
    ],
  },
  {
    title: "مواقيت الإمساك والإفطار",
    icon: "sicon-time",
    name: "prayer-bar",
    key: "e5867e76-f588-4d0c-8747-de9f4b23d2c8",
    image: "",
    props: { "min-height": "160px" },
    fields: [
      ...sectionBase(L("", ""), L("", ""), "times"),
      line("pb-line-1", "العميل يختار مدينته مرة، والمواعيد بتتحسب بتقويم أم القرى"),
      sw("show_countdown", "عداد لحد الإفطار أو الإمساك", true),
      text("after_iftar_text", "سطر يظهر بعد المغرب", L("عروض ما بعد الإفطار شغالة لحد السحور", "After-iftar offers are on until suhoor")),
      ...colorFields(),
    ],
  },
  {
    title: "عداد رمضان بهدية",
    icon: "sicon-gift",
    name: "countdown-gift",
    key: "e5acdedb-f94e-40ed-8dc4-11c46d123dfd",
    image: "",
    props: { "min-height": "120px" },
    fields: [
      drop("mode", "الشكل", [["bar", "شريط في الصفحة"], ["floating", "زرار عائم في الطرف"], ["popup", "نافذة تظهر مرة في الزيارة"]], "bar"),
      line("cg-line-1", "قبل رمضان: عداد لحد أول رمضان"),
      text("before_text", "النص", L("هدية لك قبل رمضان: خصم 10% على أول طلب", "A gift before Ramadan: 10% off your first order")),
      text("before_code", "الكود", "", { multilang: false }),
      line("cg-line-2", "في رمضان: عرض اليوم وعداد لنهاية اليوم"),
      text("ramadan_text", "النص الافتراضي", L("عرض اليوم: خصم 15% على كل الطلب", "Today's offer: 15% off your order")),
      text("ramadan_code", "الكود الافتراضي", "", { multilang: false }),
      collection("days", "عرض يوم", [num("day", "اليوم من رمضان", 1, 1, 30), text("text", "العرض", L("", "")), text("code", "الكود", "", { multilang: false })], [], 0, 30),
      sw("after_iftar_only", "الكود يظهر بعد أذان المغرب بس (حسب مدينة العميل)", false),
      line("cg-line-3", "العيد"),
      text("eid_text", "النص", L("عيدية منّا: خصم 20%", "An Eidiya from us: 20% off")),
      text("eid_code", "الكود", "", { multilang: false }),
      sw("codes_ready", "عملت الأكواد دي في سلة (التسويق ← كوبونات التخفيض)", false, "الأكواد بتظهر للعملاء بس بعد ما تفعّل ده"),
      ...colorFields(),
    ],
  },
  {
    title: "تسوّق حسب لحظة رمضان",
    icon: "sicon-star2",
    name: "moments-shop",
    key: "18706147-4cf1-4e9b-a9bd-a13a92698aa8",
    image: "",
    props: { "min-height": "480px" },
    fields: [
      ...sectionBase(L("لكل لحظة في رمضان", "For every Ramadan moment"), L("السحور والإفطار والتراويح والعيد", "Suhoor, iftar, Taraweeh and Eid"), "moments"),
      collection("tabs", "تبويب", [
        text("label", "الاسم", L("", "")),
        image("image", "صورة الدائرة", ""),
        products("products", "المنتجات (حتى 12)", "", true),
        drop("moment", "يفتح لوحده في وقت", [["", "لا"], ["suhoor", "السحور"], ["iftar", "الإفطار"], ["taraweeh", "التراويح"], ["eid", "العيد"]], ""),
      ], [], 0, 6),
      sw("ask_gift", "زر \"اطلبها هدية\" تحت كل منتج (واتساب)", true),
      ...colorFields(),
    ],
  },
  {
    title: "باقات رمضان والعيد",
    icon: "sicon-packed-box",
    name: "ramadan-bundle",
    key: "c8a007cd-9536-46e6-bc1a-75ea775700ce",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("باقات رمضان", "Ramadan bundles"), L("كل اللي تحتاجه في باقة واحدة", "Everything you need in one bundle"), "bundles"),
      collection("bundles", "باقة", [
        products("product", "منتج الباقة", "الباقة منتج عادي في سلة بسعرها"),
        text("title", "العنوان (فارغ = اسم المنتج)", L("", "")),
        image("image", "صورة (فارغة = صورة المنتج)", ""),
        area("items", "اللي في الباقة (سطر لكل قطعة)", L("", "")),
        text("badge", "شارة", L("", "")),
      ], [], 0, 3),
      text("buy_text", "نص الزر", L("أضف الباقة للسلة", "Add the bundle")),
      sw("ask_gift", "زر \"اطلبها هدية\" (واتساب)", true),
      ...colorFields(),
    ],
  },
  {
    title: "للعيلة كلها",
    icon: "sicon-users",
    name: "family-shop",
    key: "8813e917-1c53-4272-97d6-808c0d7614fd",
    image: "",
    props: { "min-height": "480px" },
    fields: [
      ...sectionBase(L("لكل أفراد العيلة", "For the whole family"), L("", ""), "family"),
      collection("tabs", "تبويب", [
        text("label", "الاسم", L("", "")),
        image("image", "صورة (اختياري)", ""),
        products("products", "المنتجات (حتى 12)", "", true),
        drop("moment", "يفتح لوحده في وقت", [["", "لا"]], ""),
      ], [], 0, 6),
      sw("ask_gift", "زر \"اطلبها هدية\" تحت كل منتج (واتساب)", true),
      ...colorFields(),
    ],
  },
  {
    title: "أثر الصدقة",
    icon: "sicon-heart",
    name: "sadaqah",
    key: "58bb2dc4-665d-45d8-ae66-5be08ba9ad29",
    image: "",
    props: { "min-height": "220px" },
    fields: [
      ...sectionBase(L("في رمضان، طلبك فيه خير", "This Ramadan, your order does good"), L("", ""), "sadaqah"),
      num("percent", "النسبة من كل طلب (%)", 5, 0, 100),
      text("line", "السطر", L("من كل طلب صدقة لأسر محتاجة", "of every order goes to families in need")),
      text("charity", "اسم الجهة", L("", "")),
      image("charity_logo", "شعار الجهة", ""),
      line("sq-line-1", "اكتب الأرقام بنفسك وحدّثها. الصفحة مش بتحسب ولا بتقدّر أي مبلغ"),
      num("total", "المبلغ اللي وصل للجهة لحد الآن (ريال)", 0, 0, 100000000),
      num("goal", "الهدف (ريال، اختياري)", 0, 0, 100000000),
      text("updated", "آخر تحديث", L("", ""), { desc: "مثل 14 رمضان" }),
      url("receipts_url", "رابط الإيصالات (اختياري)", ""),
      ...colorFields(),
    ],
  },
  {
    title: "بطاقة اليوم",
    icon: "sicon-calendar",
    name: "daily-card",
    key: "2372d199-1948-4829-a91f-850b55814c8a",
    image: "",
    props: { "min-height": "280px" },
    fields: [
      ...sectionBase(L("", ""), L("", ""), "today"),
      line("dc-line-1", "تظهر للعملاء في رمضان بس، وكل يوم باللي كتبته له"),
      text("question", "السؤال", L("صيامك اليوم؟", "How is your fast today?")),
      text("yes_text", "زر نعم", L("الحمد لله، صايم", "Fasting, alhamdulillah")),
      text("no_text", "زر الثاني", L("معذور اليوم", "Excused today")),
      area("default_dua", "الدعاء الافتراضي", L("اللهم بلّغنا رمضان، وأعنّا على صيامه وقيامه", "O Allah, help us fast and pray this Ramadan")),
      text("default_gift", "الهدية الافتراضية", L("هدية اليوم: شحن مجاني", "Today's gift: free shipping")),
      text("default_code", "الكود الافتراضي", "", { multilang: false }),
      collection("days", "يوم", [num("day", "اليوم من رمضان", 1, 1, 30), area("dua", "الدعاء", L("", "")), text("gift", "الهدية", L("", "")), text("code", "الكود", "", { multilang: false })], [], 0, 30),
      sw("codes_ready", "عملت الأكواد دي في سلة (التسويق ← كوبونات التخفيض)", false),
      ...colorFields(),
    ],
  },
  {
    title: "آخر القطع قبل العيد",
    icon: "sicon-shipping-fast",
    name: "last-pieces",
    key: "38db8614-cdb2-4a24-bc2c-ea354a385aa4",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("آخر القطع قبل العيد", "Last pieces before Eid"), L("لما تخلص، خلاص", "Once they're gone, they're gone"), "last"),
      products("products", "المنتجات (حتى 12)", "", true),
      text("badge", "الشارة", L("آخر القطع", "Last pieces")),
      num("low_stock", "اكتب \"باقي X فقط\" لما الكمية تكون أقل من", 5, 1, 50, "بيظهر بس لو المنتج في سلة بيعرض الكمية"),
      line("lp-line-1", "آخر موعد لطلبات العيد"),
      sw("show_cutoff", "شريط آخر موعد", true),
      num("cutoff_day", "آخر يوم في رمضان للطلبات اللي توصل قبل العيد", 24, 10, 29),
      text("late_text", "النص بعد الموعد", L("الطلبات الجديدة توصل بعد العيد إن شاء الله", "New orders arrive after Eid")),
      sw("ask_gift", "زر \"اطلبها هدية\" (واتساب)", true),
      ...colorFields(),
    ],
  },
  {
    title: "شريط الثقة",
    icon: "sicon-shield-check",
    name: "trust-strip",
    key: "c3bfdc2e-0ab3-4d50-8155-dbc7198f5e51",
    image: "",
    props: { "min-height": "120px" },
    fields: [
      ...sectionBase(L("", ""), L("", ""), "trust"),
      drop("layout", "الشكل", [["compact", "شريط صغير"], ["full", "قسم كامل"]], "compact", "الشريط الصغير يخفي العنوان، ويظهر لو مفيش خطوات"),
      sw("pattern", "خلفية بنقش خفيف خلف المميزات", true),
      collection("badges", "ميزة", [icon("icon", "الأيقونة", "sicon-check"), text("text", "النص", L("", ""))], [], 0, 6),
      line("ts-line-1", "إزاي بنعملها (اختياري)"),
      collection("steps", "خطوة", [text("title", "العنوان", L("", "")), area("text", "الوصف", L("", "")), image("image", "صورة", "")], [], 0, 4),
      ...colorFields(),
    ],
  },
  {
    title: "آراء العملاء",
    icon: "sicon-chat-bubbles",
    name: "reviews",
    key: "e9842f6a-9446-4599-b455-43fad672eb2c",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("آراء عملائنا في رمضان", "What our customers say"), L("", ""), "reviews"),
      sw("show_summary", "إظهار ملخص التقييمات", true),
      area("summary_text", "ملخص آراء العملاء", L("", "")),
      collection("questions", "سؤال", [text("q", "السؤال", L("", "")), area("a", "الإجابة", L("", ""))], [], 0, 6),
      line("rv-line-1", "الآراء: نص، أو تسجيل صوتي، أو صور، أو كلها معاً"),
      collection("items", "رأي", [
        text("name", "اسم العميل", L("", "")),
        text("city", "المدينة", L("", "")),
        text("place", "أين قيل الرأي", L("", ""), { desc: "مثل في العرس أو في الدوام" }),
        num("rate", "التقييم من 5", 5, 1, 5),
        area("text", "الرأي", L("", "")),
        url("audio_url", "رابط التسجيل الصوتي (MP3)", "", "ارفع الملف في أي مكان وضع رابطه هنا. يفضّل أقل من 30 ثانية"),
        image("image_1", "صورة 1", ""),
        image("image_2", "صورة 2", ""),
        image("image_3", "صورة 3", ""),
        image("avatar", "صورة العميل", "", "اختياري، تظهر الأحرف الأولى عند عدم رفع صورة"),
        sw("verified", "عميل مؤكد", false, "فعّله فقط لعميل اشترى المنتج فعلاً"),
        line("rv-item-line", "تفاصيل الشراء"),
        text("bought", "اشترى", L("", ""), { desc: "مثل باقة السحور" }),
        text("topics", "مواضيع الرأي", L("", ""), { desc: "مفصولة بفاصلة، مثل: التغليف، الجودة، التوصيل. تظهر أزرار فلترة بها" }),
      ], [
        // Filled per template
      ], 0, 12),
      ...colorFields(),
    ],
  },
  {
    title: "الأسئلة الشائعة",
    icon: "sicon-help",
    name: "faq",
    key: "de8ab346-85d5-4c77-8274-453b950804ac",
    image: "",
    props: { "min-height": "240px" },
    fields: [
      ...sectionBase(L("أسئلة متكررة", "Questions"), L("", ""), "faq"),
      collection("faqs", "سؤال", [text("q", "السؤال", L("", "")), area("a", "الإجابة", L("", ""))], [], 0, 10),
      ...colorFields(),
    ],
  },
  {
    title: "تذييل الصفحة",
    icon: "sicon-window-layout",
    name: "page-footer",
    key: "571ba519-654b-4d47-a1ae-1da49fd2db74",
    image: "",
    props: { "min-height": "160px" },
    fields: [
      image("logo", "الشعار", "", "اتركه فارغاً لاستخدام شعار متجرك"),
      image("logo_dark", "شعار الوضع الداكن", ""),
      area("about", "نبذة قصيرة", L("", "")),
      line("ft-line-1", "التواصل"),
      text("phone", "رقم الجوال", "", { multilang: false, placeholder: "+966500000000" }),
      text("whatsapp", "رقم واتساب", "", { multilang: false, placeholder: "966500000000" }),
      text("email", "البريد الإلكتروني", "", { multilang: false }),
      collection("social", "حساب", [icon("icon", "الأيقونة", "sicon-instagram"), url("url", "الرابط", "")], [], 0, 6),
      line("ft-line-2"),
      sw("show_payments", "إظهار وسائل الدفع المفعلة في المتجر", true),
      text("copyright", "نص الحقوق", L("© {year} {store}", "© {year} {store}"), { desc: "{year} تصبح السنة الحالية و{store} اسم متجرك" }),
      ...colorFields(),
    ],
  },
  {
    title: "شريط الشراء الثابت",
    icon: "sicon-shopping-bag",
    name: "sticky-buy",
    key: "c060f77c-abcc-4c7c-b887-09b389741f95",
    image: "",
    props: { "min-height": "64px" },
    fields: [
      line("sb-line-1", "يظهر أسفل الشاشة بعد تجاوز القسم الأول، ويختفي عند ظهور الشراء السريع"),
      drop("show_on", "يظهر على", [["both", "الجوال والكمبيوتر"], ["mobile", "الجوال فقط"], ["desktop", "الكمبيوتر فقط"]], "both"),
      sw("show_price", "إظهار اسم المنتج والسعر", true),
      sw("show_quantity", "إظهار الكمية", true, "الكمية المختارة تنتقل للشراء السريع"),
      text("buy_text", "نص الزر", L("اشتري الآن", "Buy now"), { desc: "في صفحة العروض يظهر نص الزر الرئيسي للصفحة إذا تركته فارغاً" }),
      ...colorFields(),
    ],
  },
];

const applyValues = (component, values = {}) => {
  const copy = structuredClone(component);
  for (const field of copy.fields || []) {
    if (!(field.id in values)) continue;
    field.value = values[field.id];
    if (field.format === "dropdown-list" || field.format === "switch") field.selected = values[field.id];
  }
  return copy;
};

const file = `${ROOT}/twilight-bundle.json`;
const bundle = JSON.parse(fs.readFileSync(file, "utf8"));
bundle.components = components;
const previous = new Map((bundle.templates || []).map((t) => [t.path, t]));
bundle.templates = templates.map((t) => ({
  id: t.id,
  path: `templates.${t.name}`,
  category_id: t.category_id,
  primary_color: "",
  // RESET_THUMBS=1 points back at the local thumbnails so tw-preview uploads the new ones
  thumbnail: (!process.env.RESET_THUMBS && previous.get(`templates.${t.name}`)?.thumbnail) || `templates-thumbs/${t.name}.jpg`,
  is_default: t.is_default,
  ...(previous.get(`templates.${t.name}`)?.public_preview_url ? { public_preview_url: previous.get(`templates.${t.name}`).public_preview_url } : {}),
}));
fs.writeFileSync(file, JSON.stringify(bundle, null, 4) + "\n");

if (templates.length) fs.mkdirSync(`${ROOT}/templates`, { recursive: true });
for (const t of templates) {
  const unknown = t.order.filter((name) => !components.some((c) => c.name === name));
  if (unknown.length) throw new Error(`unknown component in ${t.name}: ${unknown.join(", ")}`);
  const list = t.order.map((name) => applyValues(components.find((c) => c.name === name), t.values[name]));
  fs.writeFileSync(`${ROOT}/templates/${t.name}.json`, JSON.stringify({ id: t.id, components: list }, null, 2) + "\n");
}
console.log("components:", components.map((c) => c.name).join(", ") || "(none)");
console.log("templates:", templates.map((t) => `${t.name}(${t.order.length})`).join(", ") || "(none)");
