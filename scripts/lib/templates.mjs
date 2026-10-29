// Template content for the three Ramadanak templates. Products come from the preview store (1616473), which
// holds sample fashion products; the photos are free Burst photos kept on the store-assets branch, and the
// texts are written for Ramadan. Sample codes never reach shoppers until the merchant turns on "codes_ready".
import { L, opt } from "./fields.mjs";

const ASSETS = "https://raw.githubusercontent.com/ahmedhelm-y/tw-ramadan-related-content/store-assets/";
const img = (name) => `${ASSETS}img/${name}.jpg`;
// Sample logo for the template previews; the merchant swaps it for their own, or clears it to use the store logo
const logo = { logo: `${ASSETS}logo/logo.png`, logo_dark: `${ASSETS}logo/logo-dark.png` };
const sel = (value, label) => [opt(value, label)];
const product = (id, name) => [{ label: name, value: id, key: String(id) }];
const many = (...list) => list.flatMap(([id, name]) => product(id, name));
const rows = (prefix, list) => list.map((row) => Object.fromEntries(Object.entries(row).map(([k, v]) => [`${prefix}.${k}`, v])));

export const ORDER = ["page-header", "ramadan-hero", "prayer-bar", "countdown-gift", "moments-shop", "ramadan-bundle", "family-shop", "daily-card",
  "sadaqah", "last-pieces", "trust-strip", "reviews", "faq", "page-footer", "sticky-buy"];

const MOMENTS = rows("tabs", [
  { label: L("السحور", "Suhoor"), image: img("lantern"), products: many([45289979, "فستان"], [530339837, "فستان"], [819393274, "فستان"], [1728697337, "فستان"]), moment: sel("suhoor", "السحور") },
  { label: L("الإفطار", "Iftar"), image: img("iftar"), products: many([1769567998, "بلوزة"], [2052836592, "بلوزة"], [1303857404, "جاكيت"], [1411443697, "تنورة"]), moment: sel("iftar", "الإفطار") },
  { label: L("التراويح", "Taraweeh"), image: img("candle"), products: many([994547199, "فستان"], [1163912169, "فستان"], [388236010, "فستان"], [1627464171, "فستان"]), moment: sel("taraweeh", "التراويح") },
  { label: L("العيد", "Eid"), image: img("eid-gift"), products: many([1802683624, "فستان"], [679390711, "تنورة"], [1586597622, "تنورة"], [355251448, "بنطلون"]), moment: sel("eid", "العيد") },
  { label: L("الهدايا", "Gifts"), image: img("gift-flowers"), products: many([214659061, "تنورة"], [638388978, "بنطلون"], [1944726003, "بنطلون"], [854474996, "تنورة"]), moment: sel("", "لا") },
]);
const FAMILY = rows("tabs", [
  { label: L("نسائي", "Women"), image: "", products: many([45289979, "فستان"], [530339837, "فستان"], [819393274, "فستان"], [1728697337, "فستان"]), moment: sel("", "لا") },
  { label: L("رجالي", "Men"), image: "", products: many([355251448, "بنطلون"], [1944726003, "بنطلون"], [638388978, "بنطلون"], [1303857404, "جاكيت"]), moment: sel("", "لا") },
  { label: L("أطفال", "Kids"), image: "", products: many([1769567998, "بلوزة"], [2052836592, "بلوزة"], [1411443697, "تنورة"], [679390711, "تنورة"]), moment: sel("", "لا") },
]);
const BUNDLES = rows("bundles", [
  { product: product(45289979, "فستان"), title: L("باقة السحور", "The suhoor bundle"), image: img("lantern"),
    items: L("فانوس رمضاني\nمصحف بغلاف فاخر\nسجادة صلاة\nبطاقة إهداء باسمك", "A Ramadan lantern\nA Quran with a fine cover\nA prayer mat\nA gift card with your name"), badge: L("الأكثر طلباً", "Bestseller") },
  { product: product(530339837, "فستان"), title: L("باقة الضيافة", "The hospitality bundle"), image: img("iftar"),
    items: L("تمر فاخر 1 كجم\nقهوة عربية\nدلة وفناجين\nصحن تقديم", "Premium dates 1 kg\nArabic coffee\nA dallah and cups\nA serving plate"), badge: L("", "") },
]);
const DAYS = rows("days", [
  { day: 1, dua: L("اللهم بلّغنا رمضان، وأعنّا على صيامه وقيامه", "O Allah, help us fast and pray this Ramadan"), gift: L("هدية اليوم الأول: شحن مجاني", "Day one gift: free shipping"), code: "RM1" },
  { day: 14, dua: L("اللهم اجعلنا من عتقائك من النار", "O Allah, free us from the fire"), gift: L("هدية منتصف الشهر: خصم 15%", "Mid-month gift: 15% off"), code: "RM14" },
  { day: 27, dua: L("اللهم إنك عفوٌّ تحب العفو فاعفُ عنا", "O Allah, You pardon and love to pardon, so pardon us"), gift: L("هدية ليلة 27: خصم 20%", "Night 27 gift: 20% off"), code: "RM27" },
]);
const BADGES = rows("badges", [
  { icon: "sicon-shipping-fast", text: L("توصيل قبل العيد لكل المدن", "Delivery before Eid, every city") },
  { icon: "sicon-gift", text: L("تغليف هدية وبطاقة باسمك", "Gift wrap and a card with your name") },
  { icon: "sicon-wallet", text: L("قسّطها على 4 دفعات", "Split it into 4 payments") },
  { icon: "sicon-rotate", text: L("استبدال خلال 7 أيام", "7-day exchange") },
]);
const REVIEWS = rows("items", [
  { name: L("أم عبدالله", "Umm Abdullah"), city: L("الرياض", "Riyadh"), place: L("", ""), rate: 5, text: L("وصلت الباقة قبل رمضان بيومين ومغلفة بشكل يفرّح، أهديتها لأمي وعجبتها مرة.", "The bundle came two days before Ramadan, beautifully wrapped."),
    audio_url: "", image_1: img("gift-flowers"), image_2: "", image_3: "", avatar: "", verified: true, bought: L("باقة السحور", "The suhoor bundle"), topics: L("التغليف، التوصيل", "Packaging, Delivery") },
  { name: L("فهد", "Fahad"), city: L("جدة", "Jeddah"), place: L("", ""), rate: 5, text: L("طلبت توزيعات للموظفين 40 قطعة، وطبعوا شعار الشركة والتسليم كان في وقته.", "I ordered 40 gifts for the team with our logo, delivered on time."),
    audio_url: "", image_1: "", image_2: "", image_3: "", avatar: "", verified: true, bought: L("توزيعات الشركات", "Corporate gifts"), topics: L("الجودة، التوصيل", "Quality, Delivery") },
  { name: L("نوف", "Nouf"), city: L("الدمام", "Dammam"), place: L("", ""), rate: 4, text: L("الجودة ممتازة، وكود بطاقة اليوم اشتغل معي.", "Great quality, and the daily card code worked."),
    audio_url: "", image_1: img("iftar"), image_2: "", image_3: "", avatar: "", verified: true, bought: L("باقة الضيافة", "The hospitality bundle"), topics: L("الجودة", "Quality") },
]);
const FAQS = rows("faqs", [
  { q: L("متى آخر موعد عشان الطلب يوصل قبل العيد؟", "When is the last day to order for Eid?"), a: L("الطلبات لحد 24 رمضان توصل قبل العيد إن شاء الله. بعدها توصل بعد العيد.", "Orders by 24 Ramadan arrive before Eid.") },
  { q: L("أقدر أرسلها هدية باسم شخص؟", "Can I send it as a gift?"), a: L("أيوه، اكتب اسم المُهدى إليه والرسالة في ملاحظات الطلب، ونغلفها هدية.", "Yes, write the name and message in the order notes and we gift wrap it.") },
  { q: L("عندكم توزيعات للشركات بالجملة؟", "Do you do corporate orders?"), a: L("أيوه، تواصل معنا على واتساب بالعدد والميزانية وتاريخ التسليم.", "Yes, message us on WhatsApp with the quantity, budget and date.") },
  { q: L("كيف أستخدم كود الهدية؟", "How do I use the gift code?"), a: L("انسخ الكود واكتبه في صفحة السلة قبل الدفع.", "Copy it and enter it in the cart before paying.") },
]);
const LAST = many([1802683624, "فستان"], [994547199, "فستان"], [1627464171, "فستان"], [388236010, "فستان"]);

const common = (hero) => ({
  "ramadan-hero": { preview_phase: sel("ramadan", "في رمضان"), image_1: img("lantern"), image_2: img("ornaments"), button_target: "moments", ...hero },
  "countdown-gift": { mode: sel("bar", "شريط في الصفحة"), before_code: "RAMADAN10", ramadan_code: "RM15", eid_code: "EID20",
    days: rows("days", [{ day: 1, text: L("عرض أول يوم: شحن مجاني على كل الطلبات", "Day one: free shipping on every order"), code: "FREESHIP" }]) },
  "moments-shop": { tabs: MOMENTS },
  "ramadan-bundle": { bundles: BUNDLES },
  "family-shop": { tabs: FAMILY },
  "daily-card": { days: DAYS, default_code: "RAMADAN" },
  sadaqah: { percent: 5, charity: L("جمعية خيرية تختارها", "A charity of your choice"), total: 12500, goal: 20000, updated: L("14 رمضان", "14 Ramadan") },
  "last-pieces": { products: LAST },
  "trust-strip": { badges: BADGES },
  reviews: { items: REVIEWS, summary_text: L("أكثر شيء مدحوه: التغليف، والتوصيل قبل العيد.", "What they praise most: the wrapping and delivery before Eid.") },
  faq: { faqs: FAQS },
});
const footer = (about) => ({ ...logo, about, show_payments: true });

export const templates = [
  {
    name: "ramadan-nights",
    id: "1d7b0f3e-5a2c-4b8e-9f61-7c3e2a9d4b10",
    // الاكسسوارات والهدايا
    category_id: "915304371",
    is_default: true,
    order: ORDER,
    values: {
      ...common({}),
      "page-header": { ...logo, brand_color: "#c9973f", default_mode: sel("dark", "داكن"), sticky: true,
        nav: rows("nav", [{ label: L("لحظات رمضان", "Moments"), target: "moments" }, { label: L("الباقات", "Bundles"), target: "bundles" }, { label: L("الأسئلة", "FAQ"), target: "faq" }]) },
      "page-footer": footer(L("هدايا رمضان والعيد، بتغليف يفرّح", "Ramadan and Eid gifts, wrapped to delight")),
    },
  },
  {
    name: "iftar-table",
    id: "6a2e9c41-0b7d-4f3a-8e25-b1d4c7f90a62",
    // أغذية وتموينات
    category_id: "1337421468",
    is_default: false,
    order: ["page-header", "ramadan-hero", "prayer-bar", "ramadan-bundle", "moments-shop", "countdown-gift", "daily-card", "family-shop",
      "last-pieces", "sadaqah", "trust-strip", "reviews", "faq", "page-footer", "sticky-buy"],
    values: {
      ...common({ image_1: img("iftar"), image_2: img("candle"), ramadan_title: L("سفرتك في رمضان أحلى", "Your iftar table, sweeter"),
        ramadan_subtitle: L("تمور وقهوة وضيافة، توصلك قبل الإفطار", "Dates, coffee and hospitality, delivered before iftar") }),
      "page-header": { ...logo, brand_color: "#a8662f", default_mode: sel("light", "فاتح"), sticky: true,
        nav: rows("nav", [{ label: L("المواقيت", "Times"), target: "times" }, { label: L("الباقات", "Bundles"), target: "bundles" }, { label: L("الأسئلة", "FAQ"), target: "faq" }]) },
      "page-footer": footer(L("سفرة رمضان والضيافة", "Ramadan tables and hospitality")),
    },
  },
  {
    name: "eid-joy",
    id: "c3f58a07-2d61-4e9b-a7c4-5e0b8d1f6293",
    // ازياء
    category_id: "814202285",
    is_default: false,
    order: ["page-header", "ramadan-hero", "countdown-gift", "family-shop", "last-pieces", "ramadan-bundle", "moments-shop", "prayer-bar",
      "daily-card", "sadaqah", "trust-strip", "reviews", "faq", "page-footer", "sticky-buy"],
    values: {
      ...common({ preview_phase: sel("last-ten", "العشر الأواخر"), image_1: img("eid-gift"), image_2: img("unboxing"), button_target: "family", button_text: L("تسوّق كسوة العيد", "Shop Eid outfits"),
        last_title: L("كسوة العيد للعيلة كلها", "Eid outfits for the whole family"), last_subtitle: L("اطلب قبل 24 رمضان لتصلك قبل العيد", "Order by 24 Ramadan to receive it before Eid") }),
      "countdown-gift": { mode: sel("bar", "شريط في الصفحة"), ramadan_code: "EID15", eid_code: "EID20",
        ramadan_text: L("عيدية مبكرة: خصم 15% على كسوة العيد", "An early Eidiya: 15% off Eid outfits") },
      "page-header": { ...logo, brand_color: "#1f7a5a", default_mode: sel("light", "فاتح"), sticky: true,
        nav: rows("nav", [{ label: L("للعيلة", "Family"), target: "family" }, { label: L("آخر القطع", "Last pieces"), target: "last" }, { label: L("الأسئلة", "FAQ"), target: "faq" }]) },
      "page-footer": footer(L("كسوة العيد وهداياه", "Eid outfits and gifts")),
    },
  },
];
