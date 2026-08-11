# Phase 2 — Graphic Asset Pack

**Status:** Generated and ready for Full Team hero assembly (Phase 3).

## Inventory

| File | Role | Notes |
|------|------|--------|
| `assets/skyline.jpg` | HK skyline stage | Deep navy atmospheric skyline for hero background |
| `assets/water-splash.jpg` | Water under hero number | Black-key splash; composite with `mix-blend` or mask |
| `assets/light-rays.jpg` | Atmospheric light | Soft god-rays; also embedded in CSS as data-URI fallback |
| `assets/metal-digit-ref.jpg` | Style reference | Chrome digit look for CSS metallic treatment |

Binary files live in the project workspace (`scoreboard-assets/`) and will be committed into `assets/` when wired in Phase 3 (or uploaded directly to the repo).

## Live techniques (no static number images required)

Hero **points totals stay live data**. We do not bake “24,780” into a PNG.

Metallic treatment is CSS-driven (see `css/hero.css`):

- Gradient fill (silver → cool blue specular)
- Multi-layer `drop-shadow` / text-shadow for depth
- Optional subtle filter for glow

Water and skyline are photographic/illustrative layers behind or under the live number.

## Usage in Phase 3

```
.hero-stage
  ├── skyline (background-image, bottom-aligned)
  ├── light-rays (overlay, pointer-events: none)
  ├── hero-number (live text + .metric-metal)
  ├── water-splash (under number, blend/mask)
  ├── mission / chips
  └── impact metrics row
```

Crew board remains a dark UI panel (letter badges + live ranks) — not part of the illustration pack.

## Quality bar

Assets exist so the hero is not pure CSS geometry. The page remains a **dashboard**: numbers update with week/month/quarter; illustration supports hierarchy.
