// Renders tools/page.html -> ../entry.png (1024x1024, deterministic).
// Run: node --experimental-strip-types tools/build.ts
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// shortcut: playwright isn't installed for this repo; absolute require avoids a
// per-checkout npm install. Upgrade to a local devDependency if the env changes.
const require = createRequire(import.meta.url);
const { chromium } = require("/home/andre/.hermes/arc_swap/node_modules/playwright");

const here = dirname(fileURLToPath(import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1024, height: 1024 },
  deviceScaleFactor: 1,
});
await page.goto("file://" + join(here, "page.html"), { waitUntil: "networkidle" });
await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
await page.waitForTimeout(300);
await page.screenshot({ path: join(here, "..", "entry.png"), type: "png", omitBackground: false });
await browser.close();
console.log("wrote entry.png");
