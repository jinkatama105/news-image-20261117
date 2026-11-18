# Task v2: upgrade tools/page.html in THIS repo (cwd ~/makefun/news17repo)

Goal: the v1 entry.png reads "crude" to the judge. Rewrite tools/page.html (keep the same file layout: self-contained HTML+CSS+inline SVG, system fonts only, no CDN) so the front page looks premium NYT/Economist-grade. Then rebuild entry.png.

## Required fixes (from design audit of v1)
1. SHARPNESS: change tools/build.ts to viewport 1024x1024 with deviceScaleFactor: 2, screenshot, then downscale to exactly 1024x1024 with PIL LANCZOS (add a python step via child_process OR use playwright's own scale and a node zlib-free approach — simplest: keep screenshot at DPR2 into entry@2x.png, then run `python3 -c "from PIL import Image; Image.open('entry@2x.png').resize((1024,1024), Image.LANCZOS).save('entry.png', optimize=True)"` with subprocess). Delete entry@2x.png after. Final entry.png must be 1024x1024, < 1 MiB.
2. Readability floor: body text >= 10px effective at 1024 (was ~7-8px), near-black #1c1c1c on cream, not grey. Trim the tail list so everything stays legible.
3. MICRO-ATTRIBUTION: every story card and every tail item carries its outlet in tiny caps (e.g. "CNN", "REUTERS", "AL JAZEERA", "NYT", "JAPAN TIMES", "GUARDIAN", "FRANCE 24", "KOREA HERALD", "AP", "AFP", "BBC", "WHO", "PAHO", "UN OCHA"). Footer keeps the aggregate sources line.
4. Lead band: add explicit "TOP STORY" kicker label. Equalize the three panels' internal rhythm (headline lines fixed-height area, standfirst clamped).
5. ILLUSTRATIONS: make the three lead vignettes visibly more detailed (multi-element inline SVG scenes: bridge with truss segments + cracks + smoke plumes; radar dome + drone silhouettes + missiles arcs + palm skyline; four flag-pole pins + handshake arc + Manila sun + summit table). Keep flat vector, no gradients slop, consistent 2px stroke language.
6. MAP: replace the beige-blob continents with a recognizable simplified world map path (inline SVG polygon coastlines — coarse but identifiable continents), spread pins so numbers never overlap (use small leader offsets for the crowded Europe/W-Africa cluster), add faint graticule.
7. TAIL LIST (14–42): two columns balanced to equal item count, generous line-height 1.35, alternating hairline row separators. Reduce to 14–38 if needed for legibility (update the masthead count "42 STORIES" to match the real number).
8. COLOR SEMANTICS: stop using red for both Americas-category and alarm-signals. Alarm accents become dark crimson #8b1e1e ONLY inside illustrations; category chips keep region palette.
9. Add a tiny publisher mark top-left of masthead: "ONE DAY, ONE PAGE — edited by anzu for make.fun" in small caps (fixes 'no publisher identity' critique).

## FACTS — replace/extend the v1 fact set. Keep v1 stories 1-13 (verified), ADD these new verified stories for 17 Nov 2026 (from newscura's hour-by-hour global timeline of outlets):
- Deutsche Bank shares drop after reports of a mass data leak detailing misconduct (France 24).
- Canada and China announce a trade pact; Carney and Xi (NYT).
- US, China and EU fail to endorse a pledge to curb AI climate harms at COP31 (Japan Times).
- Hundreds arrested in anti-Trump protests in the Philippines amid his visit (The Guardian).
- Japan's most powerful supercomputer hit by unauthorized access (Japan Times).
- Hyundai Motor takes full ownership of Boston Dynamics (Korea Herald).
- France: unions call nationwide public-sector strike, protests expected (France 24).
- Saudi Arabia replaces its military commander after Yemen setbacks (France 24).
- Tiger Woods to return at the Hero World Challenge Dec 3-6 (AP, sports — fits tail).
Fold these into the tail list (and promote Deutsche Bank + Canada-China into the 4-13 card grid if it improves balance, dropping two weaker v1 cards — your editorial call, all 13 cards stay attributed).
Do not invent numbers not present in v1 BUILD-TASK.md facts or the list above.

## Verify before finishing
- `node --experimental-strip-types tools/build.ts` twice -> byte-identical entry.png (deterministic), 1024x1024, <1048576 bytes.
- `MAKEFUN_OUTPUT_DIR=out node main.ts && cmp out/entry.png entry.png` passes.
- Commit everything in ONE git commit "v2: premium redesign + new verified stories".
Report what you changed in the last message.
