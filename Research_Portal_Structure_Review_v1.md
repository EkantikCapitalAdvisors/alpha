# Ekantik Research Portal — Structure Review (Pre-Subscriber-Launch Audit)

**Date:** 2026-07-06 · **Auditor:** Claude (source-code audit, not screenshot audit)
**Inputs:** Full portal source (`InvestmentResearch-main/src`), Methodology page as rendered, Lowe Compliance Spec v1.0 (implemented state), Alpha audit CR-A01–A07 (implemented state), this session's canonical changes (90/10 allocation, CR-04 alert schema, immutability).
**Note on inputs:** The prompt's own context says "70/30 two-engine allocation" — the portal canon changed to **90/10** on 2026-06-17. Any methodology deck still stating 70/30 is stale and must be re-exported before launch.

---

## Phase 0 — Inventory (condensed)

**Nav: 15 content items + account (target: ≤7).**
Dashboard · Intelligence Feed · Watchlist · AOMG Themes · Research Reports · Conviction Scorecard · Catalyst Calendar · Reference Portfolio Heat · Trade Journal · Position Calculator · Market Positioning · Bias & Exit Monitor · Observations · Avoid List · Methodology (+ My Subscription, Notifications).

**Dashboard: 24 stat tiles** (6 combined + 8 secondary + 4 stocks-sleeve + 6 options-sleeve), 1 equity-curve chart, 3 tables (options trades, open positions, closed positions).

**Cadence:** MANUAL-curated: Watchlist, AOMG Themes, Research Reports, Catalyst Calendar, Market Positioning, Bias & Exit, Observations, Avoid List, Feed (9 surfaces). AUTO: Scorecard, dashboard tables. MIXED: Dashboard, Trends.

**Disclosures:** CR-06 canonical footer on every page ✅. CR-02 3-layer disclosure on Dashboard ✅. **CR-08 above-the-fold disclosure blocks: MISSING on all 9 analytical sub-pages** (spec required, never implemented).

---

## Phase 1+2 — Verdict Table (scores: Decision / Proof / Differentiation / Maint-inverted)

| # | Element | D | P | Df | M | Verdict | Rationale |
|---|---|---|---|---|---|---|---|
| 1 | Dashboard (Track Record core) | 4 | 5 | 5 | 4 | **KEEP** | The proof surface. Immutable receipts + equity curve = the trust engine. |
| 2 | Intelligence Feed | 5 | 4 | 4 | 3 | **KEEP** | The product. Per-alert cadence, CR-04 schema enforced. |
| 3 | Research Reports | 4 | 4 | 5 | 3 | **KEEP** | Flagship paid content; conversion gate. |
| 4 | Methodology | 3 | 4 | 5 | 5 | **KEEP** | Static, zero ops, teaches the framework — the "lens" the landing page sells. |
| 5 | Market Positioning | 3 | 3 | 4 | 3 | **MERGE → Market Monitor** | One gauge, weekly cadence. Alone it's a thin page. |
| 6 | Bias & Exit Monitor | 4 | 3 | 4 | 2 | **MERGE → Market Monitor** | Step-5 spine, but same "how we're leaning" surface as #5. |
| 7 | Watchlist | 4 | 3 | 3 | 3 | **MERGE → Coverage** | Anchor of the coverage worldview. |
| 8 | AOMG Themes | 3 | 3 | 4 | 3 | **MERGE → Coverage** | Step-1 spine; themes are the parent of watchlist names. |
| 9 | Avoid List | 2 | 3 | 4 | 3 | **MERGE → Coverage** | Same worldview, negative pole. Differentiated but not a nav item. |
| 10 | Catalyst Calendar | 4 | 2 | 2 | 2 | **MERGE → Intelligence** | "What's coming" tab of the feed. Scope strictly to covered names; generic earnings dates are free elsewhere. |
| 11 | Observations | 2 | 2 | 3 | 2 | **MERGE → Intelligence** | Already feed-shaped ("happened → matters → watch next"). Publish as a feed category; kill the page. |
| 12 | Conviction Scorecard | 3 | 5 | 4 | 5 | **MERGE → Track Record** | Auto-computed call stats belong with the equity curve, not in separate nav. |
| 13 | Trade Journal | 2 | 4 | 4 | 5 | **CUT** | Dashboard already renders the same open/closed/options tables. Pure duplicate. |
| 14 | Reference Portfolio Heat | 3 | 3 | 4 | 4 | **MERGE → Track Record** | The 20%-heat model is methodology-critical, but it's one gauge row, not a page. |
| 15 | Position Calculator | 2 | 1 | 2 | 4 | **CUT (compliance)** | "Portfolio Equity" input + "your trade details" = personalized sizing tool addressed to the reader. Publisher's-exemption drift. Static sizing examples already live in Methodology. DEFER any interactive version pending counsel. |

**Dashboard tile cuts (24 → 11):**
KEEP: Reference Portfolio Value, Hypothetical Total Return, S&P 500 Return, Alpha, Hypothetical Max Drawdown, Research Call Win Rate, Exposure, Stocks Sleeve P/L, Stocks Win Rate, Options Sleeve P/L, Options Win Rate.
CUT: Profit Factor, Win:Loss Ratio (redundant with Win Rate — three expressions of one fact), Best/Worst Research Call (visible in the published trade log; vanity as tiles), Open P/L + Realized P/L (fold into Total Return subtitle, already there), Total Research Calls (move next to Win Rate as its denominator "10W/2L of 15"), Open Stock Positions + Stocks Exposure (visible in positions table), Avg Win / Avg Loss / Total Options Calls / Risk Deployed (visible in options table; keep in a collapsible "detail" row if wanted).

**Sidebar footer badges:** Market Mode (BULL/DEFENSE) — KEEP, relabel "Model Market Mode". Allocation badge AGGRESSIVE/CONSERVATIVE — relabel "Model Allocation Mode" (reader-addressed ambiguity).

---

## Phase 3 — Methodology Alignment Map

| Methodology element | Portal home (proposed) | Status |
|---|---|---|
| Step 1 AOMG identification | Coverage → Themes tab | ✅ traced |
| Step 2 Disruption/superlative | Coverage → Names + Research Reports | ✅ traced |
| Step 3 Episodic pivots | Intelligence (feed alerts, CR-04 schema) | ✅ traced |
| Step 4 Position sizing (90/10, heat) | Track Record (heat row) + Methodology | ✅ traced — **verify deck says 90/10, not 70/30** |
| Step 5 Bias factors / exits | Market Monitor | ✅ traced |
| 20% heat model | Track Record heat row + Methodology | ✅ traced |
| Bull/defense allocation modes | Sidebar badge + Market Monitor | ✅ traced |
| Profit-taking rules | Methodology (static) + visible in exits in trade log | ✅ traced |
| Daily checklist | Methodology only | ⚠️ operator-internal; fine as static text |
| Mag-7 monitoring (deck Step 3 of 5) | **ORPHANED** — "Mega-Cap Tech Scorecard" was renamed on Alpha but has no portal module | Either add as feed category or remove from deck |
| Observations page | **ORPHANED module** — traces to no methodology step | Merged into Intelligence as category |

**Nav order = teaching order:** Track Record (proof first) → Coverage (Steps 1–2) → Research Reports (Step 2 deep) → Intelligence (Step 3 + catalysts) → Market Monitor (Step 5 + regime) → Methodology (the spine, free) → Account.

---

## Phase 4 — Operational Load (recommended config)

| Surface | Cadence | Est. operator-min/wk |
|---|---|---|
| Track Record | Per-trade (auto-computed) | ~30 (trade entry) |
| Intelligence (feed+calendar) | Per-alert, 2–5/wk | ~90 (CR-04 schema per alert) |
| Coverage (themes/names/avoid) | Weekly refresh | ~60 |
| Research Reports | 1–2/month | ~45 avg |
| Market Monitor | Weekly + regime-change | ~30 |
| Methodology | Static | 0 |
| **Total** | | **≈ 4–4.5 hrs/wk** |

Cut/merged modules eliminate ~3 hrs/wk of daily-manual curation (observations, calendar breadth, bias narratives, three separate list pages). **Anti-fragility rule:** every manually-curated block must carry a visible "as of {date}" stamp so staleness is explicit, never silent. Daily-manual modules remaining: none. ✅

---

## Phase 5 — Subscriber Journey

**First 5 minutes (the aha screen):** Track Record. Equity curve vs S&P + the immutable published alert stream (MSFT Exit, SPY Exit, IBIT Entry visible with full thesis). Message received: *"real methodology, receipts on the record, nothing edited after the fact."* The CR-04 immutability is a differentiator — say so on the page ("published alerts cannot be edited; corrections are new alerts").

**Weekly habit loop (<10 min):** Market Monitor (2 min: gauge + bias) → Intelligence since last visit (4 min) → Coverage diffs (2 min) → Track Record glance (2 min).

**Conversion trigger:** live alerts. Trial sees: full Track Record + full Methodology (trust builders, free forever) + Intelligence Feed **delayed 48h** + 1 sample Research Report. Paid unlocks: real-time alerts (email/push), full report library, Coverage detail (entry frameworks / invalidation criteria collapsed on trial). Not-subscribing = watching alerts arrive two days late while the trade log fills in without you.

---

## Phase 6 — Compliance Gate

**Hypothetical vs actual: launch v1.0 with the hypothetical track ONLY.** The hypothetical record is disclosure-complete (CR-01/02/04/06 implemented, immutability live). Actual-trade publication has unresolved counsel questions (format, performance-advertising rules, Marketing Rule analogs). Adding it later as a **separate nav tab with its own disclosure block, own equity curve, zero blended stats** — never as columns in the same tables.

**Claim hygiene findings:**
1. ✅ Dashboard stats reproducible from published tables (positions + options trades are on the page).
2. ⚠️ Scorecard "Hit Rate 90d" / "Avg Alpha" — must be reproducible from published call log; verify before launch.
3. 🚩 **Methodology page still carries "Target Outperformance: 2x S&P 500" and "50% downside capture / 110% upside capture" with 2008/2018/2022 examples.** These are forward-looking performance targets of the kind CR-A02 removed from the public landing page. Gated ≠ exempt. → counsel escalation; recommended interim fix: reframe as historical *design objectives of the framework* with explicit "aspirational, not a projection" labeling, or remove numbers.
4. 🚩 **CR-08 above-the-fold disclosure blocks missing on all 9 analytical sub-pages.** The Lowe spec's own P2 requirement. One template, ~1 hr of work. Do before launch.

**Publisher's-exemption line:**
- 🚩 Position Calculator — cut (per verdict table).
- ⚠️ Sidebar "AGGRESSIVE/CONSERVATIVE" badge — relabel with "Model" prefix.
- ✅ Feed alerts — CR-04 schema + auto publisher note = clean.
- ✅ heat.tsx advisory strings — already reframed to model-portfolio observations (this session).

**Counsel escalation list (do not resolve internally):**
1. Actual-trade record publication format + performance-advertising implications.
2. Methodology-page performance targets (2x, 110/50 capture) — keep, soften, or remove.
3. Subscription terms + trial marketing claims.
4. Testimonial/endorsement rules for any future subscriber quotes.
5. The full implemented portal (per Lowe spec §7 — this was already the plan; still not done).

---

## Phase 7 — Deliverables

### Kill list
| Dies | Absorbed by |
|---|---|
| Trade Journal page | Track Record (tables already there) |
| Position Calculator | Methodology static examples (interactive version → DEFER + counsel) |
| Conviction Scorecard page | Track Record stats row |
| Reference Portfolio Heat page | Track Record heat row |
| Catalyst Calendar page | Intelligence → "Upcoming" tab |
| Observations page | Intelligence → "Observation" category |
| AOMG Themes page | Coverage → Themes tab |
| Avoid List page | Coverage → Avoid tab |
| Market Positioning page | Market Monitor (merged with Bias & Exit) |
| 13 of 24 dashboard tiles | Trade log tables / subtitle text |

### v1.0 Launch IA (7 items)
| Nav | Purpose | Cadence | Gating |
|---|---|---|---|
| **Track Record** | Proof: equity curve, 11 KPIs, heat row, full trade log | Auto/per-trade | Free |
| **Coverage** | Themes → Names → Avoid (one worldview, 3 tabs) | Weekly | Paid (trial: collapsed detail) |
| **Research Reports** | Flagship deep research | Per-report | Paid (trial: 1 sample) |
| **Intelligence** | Feed + Upcoming (catalysts) + Observations category | Per-alert | Paid (trial: 48h delay) |
| **Market Monitor** | Positioning gauge + bias/exit status | Weekly | Paid |
| **Methodology** | The framework (free teaching asset) | Static | Free |
| **Account** | Subscription mgmt | — | — |

### Before → After
```
BEFORE (15):  Dashboard | Feed | Watchlist | AOMG | Reports | Scorecard | Calendar |
              Heat | Journal | Calculator | Positioning | Bias&Exit | Observations |
              Avoid | Methodology
AFTER (7):    Track Record | Coverage | Reports | Intelligence | Market Monitor |
              Methodology | Account
```

### Phased roadmap
- **v1.0 (launch):** IA consolidation above + CR-08 disclosures + methodology-target reframe + counsel review. *Binding constraint: subscriber-facing clarity + compliance.*
- **v1.1 (90 days):** Weekly digest email; "as-of" staleness stamps; trial-delay infrastructure; Mag-7/Mega-Cap scorecard as feed category if deck keeps it. *Binding constraint: retention habit loop.*
- **v2.0 (deferred):** Actual-trade record (post-counsel); interactive tools (post-counsel); API/mobile push. *Binding constraint: counsel sign-off.*

### Launch-readiness checklist (falsifiable)
- [ ] Nav ≤ 7 top-level items: yes/no
- [ ] Every dashboard stat reproducible from published trade log: yes/no
- [ ] Zero blended hypothetical/actual stats (v1.0 = hypothetical only): yes/no
- [ ] CR-08 above-fold disclosure on every analytical page: yes/no
- [ ] Methodology performance targets reframed or counsel-approved: yes/no
- [ ] Position Calculator removed from subscriber nav: yes/no
- [ ] Methodology deck re-exported with 90/10 (not 70/30): yes/no
- [ ] Every manually-curated block shows "as of {date}": yes/no
- [ ] Counsel sign-off on implemented portal (Lowe spec §7 package): obtained/not
- [ ] Weekly ops load of retained config ≤ 5 hrs, measured over 2 trial weeks: yes/no
