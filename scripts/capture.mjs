// Renders template thumbnails (768×1195) and marketplace screenshots (1600×1200, under 200 KB) from the harness
// with Playwright's Chromium. Run `pnpm build` and serve the repo (e.g. `npx vite --port 5193`) first, then:
// HARNESS=http://127.0.0.1:5193/harness/landing.html node scripts/capture.mjs [thumbs|market]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const BASE = process.env.HARNESS || "http://127.0.0.1:5193/harness/landing.html";

async function shoot(browser, query, width, height, act) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`${BASE}?clean=1&filler=0&layout=none&landing=0&${query}`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(9000);
  if (act) await act(page);
  const png = await page.screenshot();
  await page.close();
  return png;
}

/** JPEG at the highest quality that stays under the byte limit. */
async function toJpeg(png, out, width, height, limit) {
  for (let quality = 86; quality >= 40; quality -= 6) {
    const buffer = await sharp(png).resize(width, height, { fit: "cover", position: "top" }).jpeg({ quality, mozjpeg: true }).toBuffer();
    if (!limit || buffer.length <= limit || quality <= 40) {
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, buffer);
      console.log(`${out}  ${Math.round(buffer.length / 1024)} KB  q${quality}`);
      return;
    }
  }
}

const answer = async (page) => {
  await page.locator(".rm-dc__answers button").first().click();
  await page.waitForTimeout(400);
};

const THUMBS = ["ramadan-nights", "iftar-table", "eid-joy"];
const MARKET = [
  ["01-ramadan-nights", "template=ramadan-nights&only=page-header,ramadan-hero,prayer-bar"],
  ["02-iftar-table", "template=iftar-table&only=page-header,ramadan-hero,ramadan-bundle"],
  ["03-eid-joy", "template=eid-joy&only=page-header,ramadan-hero,countdown-gift"],
  ["04-times-and-gift", "template=iftar-table&only=page-header,prayer-bar,countdown-gift,daily-card", answer],
  ["05-bundles", "template=ramadan-nights&only=page-header,ramadan-bundle"],
  ["06-sadaqah-and-trust", "template=ramadan-nights&only=page-header,sadaqah,trust-strip,faq"],
];

const only = process.argv[2];
const browser = await chromium.launch();
if (!only || only === "thumbs") {
  for (const name of THUMBS) await toJpeg(await shoot(browser, `template=${name}`, 768, 1195), `templates-thumbs/${name}.jpg`, 768, 1195, 0);
}
if (!only || only === "market") {
  for (const [file, query, act] of MARKET) await toJpeg(await shoot(browser, query, 1600, 1200, act), `marketplace/${file}.jpg`, 1600, 1200, 200 * 1024);
}
await browser.close();
