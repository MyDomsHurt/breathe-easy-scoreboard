# Breathe-Easy Scoreboard

Technician performance dashboard for Breathe-Easy (Hong Kong AC cleaning crew).

**Poster-first rebuild.** Full Team is designed as a visual statement; data and rankings support it.

## Status

| Phase | Focus | Status |
|-------|--------|--------|
| 0 | Repo + shell | Done |
| 1 | Design lock + references | Done — awaiting sign-off |
| 2 | Graphic assets | Next |
| 3 | Full Team poster | Pending |
| 4 | Data layer | Pending |
| 5 | Technician pages | Pending |
| 6 | Competition | Pending |
| 7 | Auth, mobile, polish | Pending |

## Design

See **[DESIGN.md](DESIGN.md)** — locked colour system, poster rules, technician series, and forbidden patterns.

Primary reference direction: sculptural metallic team points number, water, Hong Kong skyline atmosphere, dark letter-badge leaderboard, English mission, impact strip.

## Scope

- **Technicians:** Matthew · Tiago · Nick · Alun · Iggi  
- **Metrics:** Points, Pts/Day, Pts/Week, month, quarter  
- **No revenue** anywhere in the UI  
- **English only**

## Structure

```
/
  index.html
  DESIGN.md
  css/
  js/
  data/
  assets/          # illustrations land here in Phase 2
  README.md
```

## Legacy

`breathe-easy-dashboard` is reference only. Do not continue patching it.

## Live

Enable GitHub Pages: Settings → Pages → Deploy from branch `main` / root.  
URL: https://mydomshurt.github.io/breathe-easy-scoreboard/
