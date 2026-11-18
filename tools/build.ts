// Renders tools/page.html -> ../entry.png (1024x1024, deterministic, DPR2 supersampled).
// Run: node --experimental-strip-types tools/build.ts
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";

// shortcut: playwright isn't installed for this repo; absolute require avoids a
// per-checkout npm install. Upgrade to a local devDependency if the env changes.
const require = createRequire(import.meta.url);
const { chromium } = require("/home/andre/.hermes/arc_swap/node_modules/playwright");

const here = dirname(fileURLToPath(import.meta.url));
const big = join(here, "..", "entry@2x.png");
const out = join(here, "..", "entry.png");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1024, height: 1024 },
  deviceScaleFactor: 2,
});
await page.goto("file://" + join(here, "page.html"), { waitUntil: "networkidle" });
await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
await page.waitForTimeout(300);
await page.screenshot({ path: big, type: "png", omitBackground: false });
await browser.close();

execFileSync("python3", ["-c",
  "from PIL import Image; Image.open('" + big + "').resize((1024,1024), Image.LANCZOS).save('" + out + "', optimize=True)"
]);
rmSync(big);
console.log("wrote entry.png");
