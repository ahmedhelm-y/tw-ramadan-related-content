import { DEFAULTS, storeAccentVars } from "./colors";
import { revealCss } from "./reveal";

/** Light DOM components share one <style> per component type in the document head. */
export function injectStyles(id: string, css: string): void {
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

const TOKENS = ["bg", "card", "title", "text", "accent", "accent-text", "accent-ink"] as const;
const defaultFor = (mode: "light" | "dark", token: (typeof TOKENS)[number]) =>
  DEFAULTS[mode][token === "accent-text" ? "accentText" : token === "accent-ink" ? "accentInk" : token];

// Each token resolves: the section's own color, then the page palette from the header, then the default.
// The accent default goes through the store's primary color first, and its text through the store's
// matching reverse color, so a very light store color still gets readable button text.
const STORE_VARS: Partial<Record<(typeof TOKENS)[number], string>> = {
  accent: "--color-primary",
  "accent-text": "--color-primary-reverse",
};
const chain = (prefix: "l" | "d") =>
  TOKENS.map((token) => {
    const mode = prefix === "l" ? "light" : "dark";
    const store = STORE_VARS[token];
    const fallback = store ? `var(${store}, ${defaultFor(mode, token)})` : defaultFor(mode, token);
    return `--rm-${token}: var(--rm-s-${prefix}-${token}, var(--rm-${prefix}-${token}, ${fallback}));`;
  }).join(" ");

/** Shared section frame: the host is the size container, and blocks never rely on the page's CSS reset. */
export const baseCss = `
.rm-host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
[data-rm-section] { scroll-margin-top: var(--rm-hd-h, 0px); }
/* The last block keeps clear of the sticky buy bar while it shows */
.rm-ft { padding-bottom: calc(1.25rem + var(--rm-sb-h, 0px)) !important; }
.component-card:has(> .rm-host:not(:empty)) { min-height: 0; }
.rm-block { ${chain("l")}
  display: block; width: 100%; box-sizing: border-box; font-family: var(--font-main, inherit);
  color: var(--rm-text); background: var(--rm-bg); }
.rm-block.rm-dark, html.rm-mode-dark .rm-block.rm-auto { ${chain("d")} }
@media (prefers-color-scheme: dark) { html:not(.rm-mode-light) .rm-block.rm-auto { ${chain("d")} } }
html.rm-mode-ready .rm-block { transition: background-color .3s ease, color .3s ease; }
.rm-block *, .rm-block *::before, .rm-block *::after { box-sizing: border-box; }
.rm-block img, .rm-block video { display: block; max-width: 100%; }
.rm-block h2, .rm-block h3, .rm-block p, .rm-block ul { margin: 0; padding: 0; }
.rm-block ul { list-style: none; }
.rm-container { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: 1rem; }
.rm-section { padding-block: 2.5rem; }
@container (min-width: 768px) { .rm-section { padding-block: 4rem; } }
.rm-title { text-align: center; margin-bottom: 1.75rem; }
.rm-title h2 { font-size: 1.75rem; line-height: 1.3; font-weight: 700; color: var(--rm-title); }
.rm-title p { margin-top: .5rem; font-size: 1rem; line-height: 1.7; color: var(--rm-text); }
@container (min-width: 768px) { .rm-title h2 { font-size: 2.25rem; } }
.rm-btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; min-height: 2.75rem;
  padding: .75rem 1.75rem; border: 1px solid transparent; border-radius: var(--rm-radius, .625rem);
  background: var(--rm-accent); color: var(--rm-accent-text); font: inherit; font-weight: 700; font-size: 1rem;
  line-height: 1.2; text-decoration: none; cursor: pointer; transition: transform .2s ease, opacity .2s ease; }
.rm-btn:hover { transform: translateY(-1px); opacity: .92; }
.rm-btn:focus-visible { outline: 2px solid var(--rm-accent-ink); outline-offset: 3px; }
.rm-btn[disabled], .rm-btn[aria-busy="true"] { opacity: .6; cursor: progress; transform: none; }
.rm-empty { padding: 2rem; border: 1px dashed color-mix(in srgb, var(--rm-text) 35%, transparent); border-radius: 1rem; text-align: center; }
.rm-visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.rm-error { margin-top: .5rem; color: #b42318; font-size: .875rem; }
.rm-block.rm-dark .rm-error, html.rm-mode-dark .rm-auto .rm-error { color: #fda29b; }
@media (prefers-color-scheme: dark) { html:not(.rm-mode-light) .rm-auto .rm-error { color: #fda29b; } }
@media (prefers-reduced-motion: reduce) { .rm-btn, html.rm-mode-ready .rm-block { transition: none; } .rm-btn:hover { transform: none; } }
${revealCss}
`;

let storeAccentChecked = false;

/** Injects the shared styles once and, without a brand color, keeps a dark store color visible on dark pages. */
export function ensureBase(): void {
  injectStyles("rm-base", baseCss);
  if (storeAccentChecked) return;
  storeAccentChecked = true;
  const root = document.documentElement;
  if (root.style.getPropertyValue("--rm-d-accent")) return;
  const primary = getComputedStyle(root).getPropertyValue("--color-primary").trim();
  for (const [name, value] of Object.entries(storeAccentVars(primary))) root.style.setProperty(name, value);
}
