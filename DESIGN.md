# Breathe-Easy Scoreboard — Design Lock

**Phase 1 · Version 1.1 · 11 August 2026**

This document is the visual and product source of truth until revised by agreement.

---

## 1. Core statement

This is a **dashboard**.

It shows metrics. It is interactive. Technicians use it to understand output, efficiency, and standing.

The standard for how it *looks* is the same bar as a high-end poster or championship graphic — sculptural numbers, atmosphere, illustration quality, intentional hierarchy.  
The standard for how it *works* is a clear performance dashboard: readable metrics, rankings, trends, personal stats.

**Artistic execution. Dashboard function.**

---

## 2. What this is not

- Not a static poster or campaign image
- Not a SaaS template with soft cards and hairline borders only
- Not a marketing page

It is an internal performance tool that refuses to look generic.

---

## 3. Visual direction (locked quality bar)

Reference energy (not literal layout to copy pixel-for-pixel):

- Dominant, physical-feeling points number (metallic / sculptural treatment)
- Atmosphere: deep navy–blue stage, light, depth
- Hong Kong context without turning the page into a postcard
- Water / air motif used with restraint as visual support, not decoration for its own sake
- Dark crew / ranking panel with letter badges (M · T · N · A · I)
- Impact metrics that are scannable in seconds

The page must still feel like a **working scoreboard**: change the scale (week / month / quarter), read rankings, drill into a technician, see week-by-week truth including zero weeks.

---

## 4. Colour system

| Role | Value | Use |
|------|--------|-----|
| Brand navy | `#1F3F88` | Wordmark, deep panels |
| Navy deep | `#0f1f4a` / `#06102a` | Hero stage, ranking panels |
| Primary blue | `#0082C8` | UI accent, active states |
| Cyan | `#5ec8f0` | Highlights, glow |
| Ink | `#0c1a33` | Body text on light surfaces |
| Mute | `#5a6f8a` | Secondary labels |

**Technician series (fixed):**

| Tech | Letter | Colour |
|------|--------|--------|
| Matthew | M | `#2563eb` |
| Tiago | T | `#0ea5e9` |
| Nick | N | `#22c55e` |
| Alun | A | `#a855f7` |
| Iggi | I | `#f97316` |

Brand navy on the wordmark. Technician colour carries identity on badges and charts.

---

## 5. Typography

- **Hero metrics:** Heavy weight, tight tracking — the numbers must feel important
- **UI / data:** Plus Jakarta Sans (or equivalent), 500–800
- **Labels / mission:** Short, English only, high clarity

No decorative script. No Chinese on technician-facing surfaces.

---

## 6. Information architecture

| View | Job |
|------|-----|
| **Full Team** | Collective output + team ranking. Hero metrics + crew standings + supporting charts/tables |
| **Technician (×5)** | Personal granular history: points, units by type, workdays, returns, trends including zero weeks |
| **Competition** | Multi-metric rankings (Pts/Day, Pts/Week, month, quarter). Isolated in nav |

Primary metrics everywhere: **Points**, **Pts/Day**, **Pts/Week**.  
No revenue anywhere.

---

## 7. Full Team layout principles

1. **Hero zone** — one dominant team points figure (sculptural treatment), period label, short status chips
2. **Crew board** — ranked technicians with letter badges and the active metric
3. **Impact row** — Pts/Day, workdays, units, returns (or equivalent) scannable at a glance
4. **Supporting data** — weekly charts and tables *below*, quieter, fully functional
5. **Scale control** — Week / Month / Quarter updates hero + rankings without a full page redesign

Illustration and atmosphere support hierarchy. They do not replace metrics.

---

## 8. Forbidden

- Revenue in the UI
- Chinese on technician-facing pages
- Josh in rankings or crew lists
- Treating the hero as pure decoration with weak numbers
- Equal-weight chart noise competing with the main metrics
- Patch-on-patch architecture from the legacy app

---

## 9. Success test

A technician opens Full Team and within a few seconds can answer:

- How is the team doing this period?
- Who is ahead?
- How am I doing relative to the crew?

And the page still looks intentional and high-quality — not like a default admin template.

---

## 10. Sign-off

Phase 1 is complete when the stakeholder agrees this framing:

> Dashboard function. Poster-level craft. Metrics first.

Then Phase 2 (graphic assets) produces materials that serve a live, data-driven scoreboard — not a static artwork.
