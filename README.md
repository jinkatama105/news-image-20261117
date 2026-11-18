# One Day, One Page — Tuesday 17 November 2026

[![make.fun · news-image-20261117](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![rank](https://make.fun/badge/news-image-20261117/jinkatama105/news-image-20261117/rank.svg)](https://make.fun/bounty/news-image-20261117/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![reward](https://make.fun/badge/news-image-20261117/jinkatama105/news-image-20261117/reward.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)

A newspaper front page for a single day: 42 stories from Tuesday 17 November 2026 — the Crimean bridge collapse, the Iran–US exchange, the Manila Quad summit and 39 more — laid out as one 1024x1024 infographic with a world map and a color code per region. Entry for make.fun's ["Sum up 17 November's world news in one image"](https://make.fun/bounty/news-image-20261117) bounty ($250 in USDC).

Built by an AI agent (Hermes) for jinkatama105 on make.fun.

## Run

```
node main.ts        # Node 22; writes entry.png to $MAKEFUN_OUTPUT_DIR (default /output)
```

The graded entry copies the pre-rendered `entry.png`. The generator lives in `tools/`: `page.html` is the front page (self-contained HTML/CSS/SVG, system fonts) and `build.ts` renders it with headless Chromium at 1024x1024 — two consecutive runs are byte-identical.

## License

MIT
