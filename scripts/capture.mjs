// Store screenshots (1600×1200 JPEG, under 200 KB): each one shows a feature on a laptop and a phone, with no
// added text or logos, as Salla's listing rules ask. Also renders the template thumbnails (768×1195).
// Run `pnpm build`, serve the repo (node scripts/serve.mjs 5197), then:
//   OUT=<folder> node scripts/capture.mjs [market|thumbs|help]
// "help" writes one phone-width shot per section for the help page into <OUT>/help.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const BASE = process.env.HARNESS || "http://127.0.0.1:5197/harness/landing.html";
const OUT = process.env.OUT || ".";
const SHOWCASE = "../harness/showcase.json";

/** Opens the harness, optionally scrolls a section to the top and acts on the page, and returns a PNG. */
async function shoot(browser, { query, focus, act, mobile, viewport, landing = false, wait = 7000 }) {
  const page = await browser.newPage(viewport ? { viewport } : mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}?clean=1&filler=0&layout=none${landing ? "" : "&landing=0"}&${query}`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(wait);
  // Room under the last section so it can scroll to the top, painted in the page's own background
  await page.evaluate(() => {
    let el = document.querySelector(".rm-block"), bg = "";
    while (el && (!bg || bg === "rgba(0, 0, 0, 0)")) { bg = getComputedStyle(el).backgroundColor; el = el.parentElement; }
    if (bg) document.documentElement.style.background = document.body.style.background = bg;
    document.body.style.paddingBottom = "100vh";
  });
  if (focus) {
    await page.evaluate((id) => {
      const el = document.querySelector(`[data-rm-section="${id}"]`);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
    }, focus);
    await page.waitForTimeout(1500);
  }
  if (act) await act(page);
  const png = await page.screenshot();
  await page.close();
  return png;
}

// Pick every option on the first card in a section and add it: the side cart opens with the line in it
const addFrom = (id) => async (page) => {
  const card = page.locator(`[data-rm-section="${id}"] .rm-card`).first();
  for (const select of await card.locator("select").all()) {
    const values = await select.locator("option").evaluateAll((opts) => opts.map((o) => o.value).filter(Boolean));
    if (values.length) await select.selectOption(values[0]);
  }
  await card.locator("button.rm-btn").last().click();
  await page.waitForTimeout(2500);
};
// Answer the daily card's question, to show the day's gift and code
const answer = async (page) => {
  await page.locator(".rm-dc__answers button").first().click().catch(() => {});
  await page.waitForTimeout(600);
};

const show = (only) => `template=${SHOWCASE}&only=ramadan-hero,${only}`;
const MARKET = [
  { file: "01-ramadan-nights", tone: "#c9973f", dark: true, desk: { query: "template=ramadan-nights" }, phone: { query: "template=ramadan-nights" } },
  { file: "02-iftar-times", tone: "#a8662f", desk: { query: "template=iftar-table&only=ramadan-hero,prayer-bar" }, phone: { query: "template=iftar-table&only=ramadan-hero,prayer-bar", focus: "times" } },
  { file: "03-eid-joy", tone: "#1f7a5a", desk: { query: "template=eid-joy&only=ramadan-hero,last-pieces" }, phone: { query: "template=eid-joy&only=ramadan-hero,last-pieces", focus: "last" } },
  { file: "04-moments-shop", tone: "#c9973f", dark: true, desk: { query: show("moments-shop"), focus: "moments" }, phone: { query: show("moments-shop"), focus: "moments" } },
  { file: "05-bundles", tone: "#a8662f", desk: { query: "template=iftar-table&only=ramadan-hero,ramadan-bundle", focus: "bundles" }, phone: { query: "template=iftar-table&only=ramadan-hero,ramadan-bundle", focus: "bundles" } },
  { file: "06-gift-countdown", tone: "#c9973f", dark: true, desk: { query: show("countdown-gift,moments-shop") }, phone: { query: show("countdown-gift,moments-shop") } },
  { file: "07-family-shop", tone: "#1f7a5a", desk: { query: "template=eid-joy&only=ramadan-hero,family-shop", focus: "family" }, phone: { query: "template=eid-joy&only=ramadan-hero,family-shop", focus: "family" } },
  { file: "08-daily-card", tone: "#c9973f", dark: true, desk: { query: show("daily-card,last-pieces"), focus: "today", act: answer }, phone: { query: show("daily-card"), focus: "today", act: answer } },
  { file: "09-sadaqah", tone: "#c9973f", dark: true, desk: { query: show("sadaqah,trust-strip"), focus: "sadaqah" }, phone: { query: show("sadaqah"), focus: "sadaqah" } },
  { file: "10-side-cart", tone: "#c9973f", dark: true, desk: { query: show("moments-shop"), focus: "moments", landing: true, act: addFrom("moments") }, phone: { query: show("moments-shop"), focus: "moments", landing: true, act: addFrom("moments") } },
  { file: "11-trust-and-reviews", tone: "#c9973f", dark: true, desk: { query: show("trust-strip,reviews"), focus: "trust" }, phone: { query: show("reviews"), focus: "reviews" } },
];

/** A laptop and a phone on a soft background in the template's color; no words, no logos. */
function mockup(desk, phone, tone, dark) {
  const bg = dark
    ? `radial-gradient(70% 80% at 85% 10%, color-mix(in srgb, ${tone} 35%, #14110d), transparent 70%), radial-gradient(60% 70% at 10% 95%, color-mix(in srgb, ${tone} 22%, #14110d), transparent 70%), #14110d`
    : `radial-gradient(70% 80% at 85% 10%, color-mix(in srgb, ${tone} 22%, #fff), transparent 70%), radial-gradient(60% 70% at 10% 95%, color-mix(in srgb, ${tone} 14%, #fff), transparent 70%), #f7f4f2`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1600px;height:1200px;overflow:hidden;background:${bg}}
.laptop{position:absolute;left:70px;top:150px;width:1130px}
.lid{background:#1b1b1d;border-radius:28px 28px 10px 10px;padding:22px 22px 26px;box-shadow:0 40px 80px -30px rgb(0 0 0/.45)}
.lid img{display:block;width:100%;border-radius:6px}
.deck{height:26px;margin:0 -60px;background:linear-gradient(#d9d9dd,#a9a9ae);border-radius:0 0 26px 26px;position:relative}
.deck::before{content:"";position:absolute;left:50%;top:0;width:180px;height:10px;margin-left:-90px;background:#8e8e93;border-radius:0 0 10px 10px}
.phone{position:absolute;right:90px;top:250px;width:330px;padding:14px;background:#111;border-radius:56px;box-shadow:0 40px 80px -24px rgb(0 0 0/.55),inset 0 0 0 2px #333}
.phone img{display:block;width:100%;border-radius:44px}
.phone::before{content:"";position:absolute;left:50%;top:26px;width:96px;height:28px;margin-left:-48px;background:#111;border-radius:20px;z-index:2}
</style></head><body>
<div class="laptop"><div class="lid"><img src="data:image/png;base64,${desk.toString("base64")}"></div><div class="deck"></div></div>
<div class="phone"><img src="data:image/png;base64,${phone.toString("base64")}"></div>
</body></html>`;
}

/** JPEG at the highest quality that stays under the byte limit. */
async function toJpeg(png, out, width, height, limit) {
  for (let quality = 88; quality >= 40; quality -= 4) {
    const buffer = await sharp(png).resize(width, height, { fit: "cover", position: "top" }).jpeg({ quality, mozjpeg: true }).toBuffer();
    if (!limit || buffer.length <= limit || quality <= 40) {
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, buffer);
      console.log(`${out}  ${Math.round(buffer.length / 1024)} KB  q${quality}`);
      return;
    }
  }
}

const only = process.argv[2];
const pick = process.argv[3]?.split(",");
const browser = await chromium.launch();
if (!only || only === "market") {
  for (const spec of MARKET.filter((s) => !pick || pick.some((p) => s.file.startsWith(p)))) {
    const [desk, phone] = await Promise.all([shoot(browser, spec.desk), shoot(browser, { ...spec.phone, mobile: true })]);
    const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
    await page.setContent(mockup(desk, phone, spec.tone, spec.dark), { waitUntil: "load" });
    const png = await page.screenshot();
    await page.close();
    await toJpeg(png, path.join(OUT, "marketplace", `${spec.file}.jpg`), 1600, 1200, 200 * 1024);
  }
}
if (!only || only === "thumbs") {
  for (const name of ["ramadan-nights", "iftar-table", "eid-joy"]) {
    const png = await shoot(browser, { query: `template=${name}`, viewport: { width: 768, height: 1195 }, wait: 8000 });
    await toJpeg(png, path.join(OUT, "templates-thumbs", `${name}.jpg`), 768, 1195, 0);
  }
}
if (only === "help") {
  const sections = [["ramadan-hero", ""], ["prayer-bar", "times"], ["countdown-gift", ""], ["moments-shop", "moments"], ["ramadan-bundle", "bundles"], ["family-shop", "family"],
    ["sadaqah", "sadaqah"], ["daily-card", "today"], ["last-pieces", "last"], ["trust-strip", "trust"], ["reviews", "reviews"], ["faq", "faq"], ["sticky-buy", ""]];
  const showBar = async (page) => {
    await page.evaluate(() => document.querySelector(".rm-sb")?.scrollIntoView({ block: "end" }));
    await page.waitForTimeout(800);
  };
  // The gift bar sits under the hero, so it scrolls to the middle of the screen
  const showGift = async (page) => {
    await page.evaluate(() => document.querySelector("[class*='rm-cg']")?.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(800);
  };
  for (const [name, focus] of sections) {
    const query = name === "sticky-buy" ? `${show("faq,sticky-buy")}&cards=1` : name === "ramadan-hero" ? `template=${SHOWCASE}&only=ramadan-hero,prayer-bar`
      : name === "countdown-gift" ? show("countdown-gift,moments-shop") : show(name);
    const png = await shoot(browser, { query, focus: focus || undefined, mobile: true, act: name === "sticky-buy" ? showBar : name === "daily-card" ? answer : name === "countdown-gift" ? showGift : undefined });
    const out = path.join(OUT, "help", `${name}.jpg`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(png).resize(390).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
    console.log(out);
  }
}
await browser.close();
