# Breathe-Easy Scoreboard — Design Lock

**Phase 1 · Version 1.0 · 11 August 2026**

This document is the visual source of truth until revised by agreement.

---

## 1. Core statement

Full Team is a **poster**, not a dashboard row.

First glance must feel like a designed graphic object (championship / campaign energy), not a SaaS product screen.

---

## 2. Locked reference direction

**Primary reference (locked):**
Silver-chrome sculptural team points number over crashing water, Hong Kong skyline in deep blue atmosphere, light rays, English mission block, dark vertical leaderboard with letter badges (M / T / N / A / I), impact metrics strip at base.

**Secondary energy (allowed):**
Gold / championship variant of the same structure when we want peak-motivation moments.

**Not allowed as the hero:**
Flat white cards, soft product chrome, generic KPI grids, pure CSS geometric skylines, Chinese copy.

---

## 3. Colour system

| Role | Value | Use |
|------|--------|-----|
| Brand navy | `#1F3F88` | Wordmark, deep panels |
| Navy deep | `#0f1f4a` / `#06102a` | Poster stage, leaderboard |
| Primary blue | `#0082C8` | UI accent, links, active states |
| Cyan | `#5ec8f0` | Highlights, glow, secondary accent |
| Stage | Deep blue gradients + atmosphere | Full Team poster background |
| Ink | `#0c1a33` | Body text on light surfaces |
| Mute | `#5a6f8a` | Secondary labels |

**Technician series (vivid, fixed):**

| Tech | Letter | Colour |
|------|--------|--------|
| Matthew | M | `#2563eb` |
| Tiago | T | `#0ea5e9` |
| Nick | N | `#22c55e` |
| Alun | A | `#a855f7` |
| Iggi | I | `#f97316` |

Brand navy stays on the wordmark. Technician colour carries identity on badges and charts.

---

## 4. Typography

- **Display / hero:** Heavy weight, tight tracking, used only for the sculptural points number and major poster headlines.
- **UI / data:** Plus Jakarta Sans (or equivalent clean geometric sans), 500–800.
- **Mission / story:** Slightly more expressive, still English only, short lines.

No decorative script fonts. No Chinese on technician-facing surfaces.

---

## 5. Poster composition rules (Full Team)

Required structure:

1. **Stage** — atmospheric deep blue with illustrated skyline + light
2. **Hero number** — dominant sculptural / metallic points total (the visual climax)
3. **Water / air** — interacts with the number (splash, wrap, or crash)
4. **Mission block** — short English statement
5. **Impact strip** — 3–4 key team metrics
6. **Crew board** — dark panel, letter badges, ranked order, team total

Rules:
- The number must feel physical (metal, stone, or strong 3D), not plain text
- Charts and tables sit *below* the poster and stay quieter
- Scale control (Week / Month / Quarter) updates numbers without breaking the composition
- Zero-output weeks remain visible in data views

---

## 6. What is forbidden

- Revenue anywhere in the UI
- Chinese language on technician-facing pages
- Josh in rankings or crew lists
- Treating Full Team as a standard KPI card grid
- Competing visual noise (too many equal-weight charts in the hero zone)
- Patch-on-patch architecture from the legacy app

---

## 7. Page roles

| Page | Visual role |
|------|-------------|
| Full Team | Poster-first. Illustration + sculptural number lead. |
| Technician | Data-first, still on-brand. Quieter, personal, granular. |
| Competition | Competitive boards. Isolated in nav. Clear rankings only. |

---

## 8. Sign-off gate

Phase 1 is complete when the stakeholder agrees:

> “These references define what ‘stunning’ means for this project.”

After sign-off, Phase 2 (graphic assets) begins using this lock as the brief for illustration production.
