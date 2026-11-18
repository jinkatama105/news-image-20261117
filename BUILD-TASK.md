# Task: build a make.fun "news-image-20261117" entry in THIS repository (cwd)

You are building competition entry "One Day, One Page — world news of Tuesday 17 November 2026" for make.fun bounty news-image-20261117. Work only in this directory. No questions; follow exactly.

## Deliverable (final repo contents)
- `entry.png` — a 1024x1024 PNG, at most 1 MiB, a newspaper-front-page infographic summing up the world's news of Tuesday 17 November 2026 (facts below are verified; use them verbatim).
- `tools/page.html` — the single HTML file that lays out the page (self-contained CSS, no external fonts/scripts/CDN, system font families only: Georgia serif stack for headlines "Georgia, 'Liberation Serif', serif", Helvetica/Arial stack for labels).
- `tools/build.ts` — Node script (run with `npx tsx tools/build.ts` or node --experimental-strip-types) that uses Playwright (installed globally: `import { chromium } from 'playwright'` — check `node -e "require('playwright')"` works from /home/andre; if not, use `npx playwright` with NODE_PATH=/home/andre/node_modules; Playwright chromium is installed in ~/.cache/ms-playwright) to open tools/page.html at 1024x1024 device scale 1, screenshot to ../entry.png with PNG (no transparency), deterministic: fixed viewport, disable animations, wait for networkidle, wait 300ms.
- `main.ts` — the graded entrypoint: Node 22 stdlib only, no network, writes the repo-held image to /output/entry.png:
  ```
  // One Day, One Page entry (make.fun news-image-20261117): copies the pre-rendered front page.
  import { copyFileSync } from "node:fs";
  import { join } from "node:path";
  copyFileSync(new URL("./entry.png", import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? "/output", "entry.png"));
  ```
- Verify: `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts && cmp out/entry.png entry.png` passes; run twice, identical bytes. `file entry.png` = PNG 1024x1024, size < 1048576 bytes (if bigger: re-encode with pngquant `pngquant --speed 1 --quality 70-90 --output entry.png -- entry.png` or quantize colors in CSS; keep whole).

## Design spec — match this style (rival's #1 formula, do not copy their content)
Cream newsprint background (#f4efe3), charcoal ink (#1a1a1a). Layout bands:
1. Masthead: tiny red caps kicker left "THE WORLD'S NEWS IN ONE PICTURE", grey caps right "42 STORIES · 6 CONTINENTS · ALL FROM TUESDAY"; giant old-style serif date "Tuesday 17 November 2026".
2. Lead band: 3 equal panels, each = small flat vector illustration (pure CSS/SVG inline, simple shapes), a thin colored caption strip, a numbered disc, small caps region label, bold serif headline, 2-line serif standfirst with the statistics.
3. Two rows of 5 compact cards (10 stories): small graphic + colored strip above, disc + label + headline + one-line fact below.
4. Bottom band split ~42/58: left = inline SVG world map titled "WHERE IT HAPPENED" (pale tan continents on pale blue, colored numbered pins 1–13, legend dots); right = "ALSO ON TUESDAY 17 NOVEMBER" two-column numbered list of the small items (14–42), colored discs.
5. Footer rule: italic left "Every story here happened or was first reported on Tuesday 17 November 2026."; right small caps "Sources: Reuters, AP, AFP, BBC, Al Jazeera, CNN, WHO, UN".
Color-code regions: Europe blue (#2563a8), Middle East orange (#d97b29), Asia purple (#7050a0), Africa green (#3a8a4d), Americas red (#b8433c), Global/climate teal (#2f8f8a), US business charcoal (#444), Russia grey (#777). Everything legible at 300px across (min ~9px for the small list, real text not images of text). No emoji, no fake photos.

## VERIFIED FACTS for 17 Nov 2026 (use these exact stories/numbers)
Lead 1 EUROPE · UKRAINE WAR — "Ukraine strike collapses a span of Putin's prized Crimean bridge" (CNN/BBC; Kerch Strait; Zelensky hails "unprecedented operation"; second day of strikes; Russia claims record 1,441 drones intercepted overnight — its claim).
Lead 2 MIDDLE EAST · IRAN–US — "Iran hits a US radar in Bahrain with drones; US strikes Qeshm Island" (Kuwait also reports drone attacks; Strait of Hormuz mines threaten tankers; talks continue via mediators).
Lead 3 ASIA · DIPLOMACY — "Trump convenes the first Quad leaders' summit in two years, in Manila" (critical-minerals agreements announced; he heads to China for talks with Xi; Putin due in Shenzhen).
Card 4 AFRICA · HEALTH — Ebola in DR Congo: cases doubling fast, WHO warns; deaths in the thousands (write: "cases double in three months, WHO warns" — avoid exact totals you can't see; do not invent numbers).
Card 5 GLOBAL · CLIMATE — COP31 in Antalya: first draft text divides nations over a fossil-fuel phase-out; 31 Catholic orgs pledge divestment; talks end Friday.
Card 6 AMERICAS · HEALTH — US, Mexico and Bolivia lose measles elimination status (PAHO; US: first loss in ~three decades; RFK Jr. says he'll work to regain it).
Card 7 US · MARKETS — Dow closes down about 850 points amid tech selloff ahead of Nvidia's report after the close (Nvidia Q3 results release Nov 18: revenue $115.8bn, up 103% year on year — phrase carefully: "Nvidia's quarterly report lands after the close; revenue up 103% to $115.8bn").
Card 8 MIDDLE EAST · GAZA — Board of Peace delivers bleak report: ceasefire at risk of imminent collapse; UN agencies: 1.4 million face acute hunger as winter threatens aid.
Card 9 ASIA · POLITICS — Mongolia's president Khürelsükh announces he will resign over a $25m bribery allegation he denies ("I have never stolen").
Card 10 EUROPE · POLITICS — Serbia's new parliament opens: the election-winning Students List takes its seats as a student-led majority; Vučić's SNS goes to opposition.
Card 11 ASIA · LABOUR — Bangladesh: police fire tear gas and stun grenades on garment workers protesting for a higher minimum wage; factories shut.
Card 12 RUSSIA · AIR CRASH — Russian military An-12 crashes near Kemerovo in Siberia; all 19 aboard killed (Defense Ministry).
Card 13 AFRICA · JUSTICE — Mozambique: opposition leader Venâncio Mondlane stands trial over the deadly 2024 post-election protests.
Small list 14–42 (one line each): Russia downed 1,441 drones over weekend claims; Kyiv bridges hit; UN says Ukraine civilian deaths this year exceed all of 2025; Prague head-on train collision injures 46 (15 Ukrainians); France public-sector marches, turnout falls (Reuters); Poland: Tusk government survives no-confidence vote; Moldova: Russian drone over Chișinău, six border crossings shut; Turkey: raid puts opposition Sözcü TV off air, trustee appointed; Deutsche Bank leak exposes 15 million files; Israel elects new Knesset speaker, weakening Netanyahu; Norway beat Denmark with Haaland's last-minute penalty (Nations League quarters); India beat Pakistan 2–1 to win their 10th SAFF title; Pope Leo XIV wraps South America tour; Cyclone Akvan: Odisha deploys 74 rescue teams; China–Canada: Carney and Xi slash tariffs; Macron visits Malaysia; Thailand pledges to scrap tariffs on US goods; Australia rewrites backpacker visa rules; M6.6 quake off Indonesia felt in Darwin, no tsunami; Apple Pay, iCloud and App Store outage — not a hack; Kenya quarantines returnees from DR Congo; WFP aids those fleeing Ethiopia clashes; US Senate: Schumer fights Van Hollen challenge; Gaza winter aid held up; Nvidia board 'does not intend to reinstate' Jensen Huang as CEO (NBC); Kuwait reports drone strikes; Iran–US talks via mediators continue.
Judge cares: names the day (big!), breadth across regions, readable, faithful (no invented numbers), clean craft.

## Git
Commit everything on branch `main`: first commit "add front page build" (tools/, entry.png, LICENSE exists), then a SECOND commit that edits page.html (tweak any headline wording) so history shows a revision. Do not push; parent handles GitHub + submission. Report at the end: entry.png bytes, dimensions, cmp result, and both commit shas.
