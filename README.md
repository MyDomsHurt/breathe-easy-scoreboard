# Breathe-Easy Scoreboard

Technician performance dashboard for Breathe-Easy (Hong Kong AC cleaning crew).

**Artistic dashboard.** Functionally a metrics scoreboard. High visual craft on the Full Team hero.

**Live:** https://mydomshurt.github.io/breathe-easy-scoreboard/

## Status

| Phase | Focus | Status |
|-------|--------|--------|
| 0 | Repo + shell | Done |
| 1 | Design lock | Done |
| 2 | Graphic assets | Done |
| 3 | Full Team view | Done |
| 4 | Data layer polish | Done |
| 5 | Technician pages | Done |
| 6 | Competition | Pending |
| 7 | Auth, mobile, polish | Pending |

## Pages

| Route | Purpose |
|-------|--------|
| `#/team` | Full Team — poster hero, crew leaderboard, collective charts |
| `#/tech/{Name}` | Personal profile — KPIs, unit mix, week table, charts |
| `#/compete` | Competition — Phase 6 (placeholder) |

**Nav order:** Full Team · Matthew · Tiago · Nick · Alun · Iggi | Competition

## Scope

- Technicians: Matthew · Tiago · Nick · Alun · Iggi (Josh excluded)
- Metrics: Points, Pts/Day, Pts/Week (zeros included), month, quarter
- Unit types on week rows: S W B C UC TV OU SwG EF PAU
- No revenue · English only

## Data

Single file: `data/data.json` (enriched week rows + `unitTotals` + trends).

Pts/Week = total points in scope ÷ number of weeks counted (zero weeks included).

## Design

See DESIGN.md and ASSETS.md.
