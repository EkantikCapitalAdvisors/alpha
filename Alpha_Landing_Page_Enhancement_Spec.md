# Alpha Landing Page — Enhancement Spec for AI Developer
**Property:** https://alpha.ekantikcapital.com/
**Prepared:** July 2026 · For implementation against the Ekantik design system (three-tier navy backgrounds; gold rationed to H1/H2 and earned data; teal for charts; red reserved for urgency/kill conditions; Playfair Display headlines / DM Sans body / DM Mono data)

**Scope note:** This review is based on the page's full content, structure, and copy. Visual/rendering issues should be verified against the live page. Nothing in this spec may weaken existing compliance disclosures without securities-counsel sign-off.

---

## What's working — do not touch

- **Compliance architecture.** Publication notice above the fold, hypothetical-performance disclosure repeated at every performance-adjacent moment, "No Advisory Relationship" footer block. This is the strongest compliance posture across the Ekantik properties. Preserve prominence and placement.
- **The drawdown-arithmetic table** (−10%→+11% … −60%→+150%). Concrete, factual, teaches the reader something in five seconds, and is claim-proof ("arithmetic identities, not return claims"). This is the single best conversion asset on the page.
- **"We publish the lens, not just the names."** Genuinely differentiated positioning. Elevate it (see P1-3).
- **"Names are the output. The question is the product."** Keep verbatim.

---

## P0 — Strategic (fix before any cosmetic work)

### P0-1: Resolve the offer contradiction
**Current state:** The access section says *"Everything. Free. No credit card. No time limit. No catch."* But (a) the business objective is paid subscribers, (b) the portal itself displays *"Free Trial — 0 days remaining,"* and (c) the Downside-Capture Framework section says *"Login required — subscriber-only content."* Three incompatible offer models on one funnel.

**Change:** Pick ONE offer architecture and make every element of the page serve it. Recommended for the launch objective:
- **Founding Access model** — a defined free tier (research feed, methodology, sample reports) and a paid tier (full model portfolio, real-time alerts, deep research), with a founding-subscriber cohort at a locked rate.
- This is where exclusivity and urgency legitimately live: **scarcity of cohort and access, never scarcity of returns.** Compliant framing: *"Founding access is limited to the first [N] subscribers. The rate locks for life. The research does not wait."* No performance implication — the urgency is the closing window, not the outcome.
- Update: hero trust badges, the OPEN ACCESS card, both CTA bands, and the meta descriptions (which currently promise "Free access") to match the chosen model.

**Why:** A page that promises everything free forever cannot convert to paid without breaking trust — and Radical Transparency is a stated editorial principle. The contradiction is visible to any careful reader today.

### P0-2: Collapse the taxonomy sprawl to one spine
**Current state:** The reader encounters six competing numbering systems: 1 Asymmetric Capture Framework → 1 Alpha Engine with 2 Modes → "12 proprietary frameworks" → "Six Lenses" → "13 integrated modules, four categories" → "5-Step Research Pipeline" → 5 editorial principles. The Six Lenses do not appear in the methodology deck; "Framework Score 12/12" appears without explanation of what the 12 are.

**Change:** One hierarchy, stated once, repeated everywhere:
> **The Asymmetric Capture Framework** (the lens) → **the 5-Step Research Pipeline** (the process) → **the recorded $100K hypothetical model portfolio** (the proof).
- Subordinate "12 proprietary frameworks" to a single supporting line inside the pipeline section ("each step is powered by proprietary screening frameworks — fully documented in the Methodology module"), or name them behind login. Never headline a number the page doesn't explain.
- **Six Lenses:** either fold them into Step-level descriptions or cut the section. If retained, retitle so it reads as the interrogation checklist *within* the pipeline, not a parallel methodology. (If kept, also reconcile it into the methodology deck so the two artifacts tell one story.)
- **13 modules:** reduce this section to the module set that survives the portal structure audit (target ≤ 7). The landing page must sell the spine, not the sprawl — today it advertises the exact redundancy the portal review exists to eliminate.

**Why:** Sophistication is signaled by compression, not enumeration. A HNW reader who loses the thread doesn't ask for clarification; they leave.

### P0-3: Reconcile every number on the page against the portal and deck
Run a consistency pass: frameworks count, module count, pipeline steps, allocation figures (70/30/0 vs 25/15/60), heat/drawdown language, and Step-4/Step-5 naming must match the methodology deck and the live portal exactly. Any figure that appears in two places must be identical in both. Ship this as a checklist the developer signs.

### P0-4: Brand & color-system consistency audit (run before any other build work)

**Why this is P0, not polish:** alpha.ekantikcapital.com (marketing) and researchportal.ekantikcapital.com (the product) are two separate deployments. Nothing today guarantees they draw from the same palette or type system. If the developer starts on P1/P2 before this is resolved, every visual change gets built against a moving target.

**A confirmed drift, from the documents already in hand — not a guess:** two typography systems currently exist on paper for Ekantik properties, and they disagree:
- The landing-page/portal design system on file: **Playfair Display / DM Sans / DM Mono**, three-tier navy backgrounds, gold rationed to H1/H2 and earned data, teal for charts, red for kill conditions.
- The master brand-identity guide: headline serif chosen from **Playfair Display / Cormorant Garamond / Libre Baskerville**, body from **Source Sans Pro / Lato / DM Sans**, with a documented palette of Deep Navy `#1B2A4A`, Warm Gold `#C8A951`, Clean White `#FFFFFF`, Slate Gray `#64748B`, Soft Ivory `#FAF8F5`, Forest Green `#2D5016`, Signal Red `#DC2626`, Bright Teal `#0D9488`.

These overlap (Playfair Display, DM Sans, navy/gold/teal/red are common to both) but are not identical documents, and neither one declares itself canonical over the other. That ambiguity is itself the defect: two style references means two developers — or one developer six months apart — can each build a "correct" but different result.

**Required actions:**
1. **Declare one canonical token set.** Recommend: headline = Playfair Display, body = DM Sans, data/numerals = DM Mono; palette = the eight hex values above, with teal and gold usage rules exactly as documented (gold never in body text; teal/green/red reserved for data semantics, never decorative). Update whichever of the two source documents is *not* chosen so only one canonical reference exists going forward.
2. **Ship it as code, not prose.** Consolidate into a single `design-tokens.css` (CSS custom properties) or shared Tailwind config, imported by *both* alpha.ekantikcapital.com and researchportal.ekantikcapital.com. Prose brand guides drift; a shared token file imported by both codebases cannot.
3. **Extract and diff the live page.** Developer pulls every literal color value compiled into the alpha.ekantikcapital.com bundle (hex / rgb / CSS variables) and diffs it against the approved eight. Anything off-list is either replaced or added to the token file with a stated semantic reason (e.g., a gain/loss green or red distinct from Forest Green/Signal Red, if the dashboard genuinely needs a separate data-state color from the brand's decorative green).
4. **Emoji icons are the single highest-confidence color-consistency defect on the page today.** 📊 ⚡ 🎯 🚀 🔥 💎 🔬 🌍 🤝 📐 🔓 🧭 ⚠️ 🔭 🚫 📖 🧮 render in the visitor's OS emoji font and native emoji colors — outside brand control entirely, and guaranteed to clash with the navy/gold system on some devices (Windows emoji rendering in particular reads very differently from macOS). This was flagged as polish in P2-1; it is reclassified here as P0 because it is a *certain* inconsistency, not a suspected one. Replace with the SVG icon set in brand tokens before anything else ships.
5. **Side-by-side visual QA.** Render alpha.ekantikcapital.com and researchportal.ekantikcapital.com at identical viewport widths, screenshot both, and place them side by side. Confirm: identical navy tier values, identical gold-usage discipline (H1/H2 + earned data only — verify the landing page isn't using gold to highlight marketing copy, which the brand guide reserves for data/headlines), identical teal/green/red data semantics, identical CTA button styling (fill color, radius, shadow, hover state).
6. **Deliverable:** the shared `design-tokens.css`/config file, plus a before/after screenshot log attached to the PR showing both properties side by side.

**Note on verification method:** the above is written as a protocol for the developer to run against the actual compiled site, because a live pixel-level color audit from this side requires either a working browser-automation session (attempted, timed out) or a screenshot of the rendered landing page. If you'd like a direct visual diff rather than the protocol above, share a screenshot of alpha.ekantikcapital.com the way you did the portal dashboard, and it can be checked pixel-for-pixel against the portal and the token list.

---

## P1 — Conversion architecture

### P1-1: Add an email-capture lead magnet (the missing middle of the funnel)
**Current state:** The only paths are "Explore the Research" (full commitment) or leave. No capture for the 95% not ready to register.

**Change:** Add one mid-page and one exit-intent capture offering a compliant lead magnet — e.g., *"The Asymmetric Capture Framework — the complete methodology brief"* (PDF of the drawdown math + 5-step pipeline + one sample research report, all hypothetical-disclosed). Single field, one line of copy:
> *"The methodology, in full. One document. Judge it before you subscribe."*
Feed into a short welcome sequence (methodology → sample research → founding-access invitation).

### P1-2: Introduce the founder
**Current state:** No human being appears anywhere on the page. A research publication with no named analyst has a hard trust ceiling — readers subscribe to judgment, and judgment has a face.

**Change:** Add a compact "The Analyst" section: name, photo (clean, high-contrast, composed — per brand imagery rules), three lines on the research philosophy, one line on why the work is published on the record. Voice: Sophisticated Fiduciary — conviction without biography-padding. No credentials inflation; no advisory implication (title: *Founder & Chief Research Analyst, Ekantik Capital Advisors LLC — a financial publisher*).

### P1-3: Restructure the hero for the strongest asset
**Current state:** Hero headline "Institutional-Grade Research. Individual Access." is on-brand but abstract; the page's most arresting material (drawdown arithmetic) sits two scrolls down.

**Change (test candidate):** Lead with the arithmetic as the hook, keep the tagline as the kicker:
> **A portfolio that falls 50% must double just to break even.**
> **Ours is a research publication built around that single piece of arithmetic.**
> The Asymmetric Capture Framework — every observation recorded, on the record, in a $100,000 hypothetical model portfolio. Institutional-grade research. Individual access.
Retain the existing hero as the B variant and A/B test. Primary CTA per P0-1's chosen offer.

### P1-4: One CTA verb, everywhere
**Current state:** "Get Access," "GET ACCESS," "Explore the Research," "See It Inside the Portal," "See the Methodology" compete; nav shows Get Access twice.

**Change:** One primary CTA verb sitewide (recommend **"Claim Founding Access"** under the P0-1 model, or "Explore the Research" if free-tier-led), one secondary ("See the Methodology"). Nav carries the primary once, as a gold button. All CTAs resolve to the same destination; fix the alpha.ekantikcapital.com vs researchportal.ekantikcapital.com split so the journey never visibly changes domains without explanation.

### P1-5: Replace the 12-bullet feature list with three pillars
**Current state:** The OPEN ACCESS card lists 12 features — a feature dump that flattens value.

**Change:** Three pillars, each with one line of benefit copy:
1. **The Research** — real-time alerts and long-horizon reports, every thesis documented.
2. **The Record** — the hypothetical $100K model portfolio: every entry, every exit, every rationale, auditable.
3. **The Method** — the complete framework, published. Nothing opaque.
Full feature list moves behind a "See everything included" expander.

### P1-6: Proof section needs real numbers — gated correctly
**Current state:** "Research Ideas Recorded: Live" and "Framework Score 12/12" are placeholders wearing stat clothing.

**Change:** Show only **process proof** publicly: *number of research observations published, publication start date, percentage with documented exit rationale* — counts, not returns. These are verifiable and claim-safe. Whether any hypothetical performance figures (win rate, return, drawdown) may appear on the public page versus behind login is a **securities-counsel decision — flag it, do not ship it unilaterally.** Whatever ships must be reproducible from the published research journal.

---

## P2 — Brand, copy, and polish

- **P2-1: Iconography.** Replace emoji (📊 ⚡ 🎯 🚀 🔥 💎) with a custom SVG line-icon set in brand tokens (gold on navy, 1.5px stroke). Emoji undercut institutional gravitas everywhere they appear.
- **P2-2: Header wordmark.** Fix the "EKANTIK CAPITALRESEARCH PUBLICATION" spacing/stacking in the masthead; verify Playfair/DM Sans pairing and letter-spacing on the uppercase descriptor.
- **P2-3: Naming unification.** "Ekantik Alpha Engine," "Research Portal," "Ekantik Research Portal," and the researchportal subdomain are four names for one product. Pick the public product name (recommend **Ekantik Alpha Engine** as the engine, **the Research Portal** as the place) and apply the pattern consistently across page, portal masthead, and URLs.
- **P2-4: Source the market-state statistic.** "Roughly seventy percent … sideways" cites "academic analysis" generically. Ogilvy rule: name the study and window, or cut the precision and keep the qualitative point. Unverifiable-looking precision costs more trust than it buys.
- **P2-5: Editorial principles section.** "Transparent Process" and "Radical Transparency" currently appear as two of the five principles — near-duplicates. Align the five on-page principles 1:1 with the Ekantik Standard (Impact · Accountability · Fiduciary-grade integrity [phrase carefully — see note] · 10x Value · Radical Transparency). **Note:** do not use the word "fiduciary" on this publisher property unless counsel confirms it is accurate in a publishing context; the brand principle can be expressed as "reader-first, no conflicts, no compensation from covered companies," which the footer already substantiates.
- **P2-6: Mission line (aspiration, compliantly).** The page has arithmetic but no horizon. Add one line of long-arc framing in the methodology section — e.g., *"Compounding is a decade-scale game. The framework exists so a reader's next ten years are governed by arithmetic, not by drawdowns."* Goal-framework language only; no timeline-to-outcome promises.
- **P2-7: Disclosure design.** Keep the top publication notice and all disclosure content exactly as prominent as counsel requires — but have the developer improve typographic integration (navy-tier background, DM Sans, comfortable line-height) so compliance reads as brand confidence rather than boilerplate. Any change to placement or prominence goes to counsel first.
- **P2-8: Meta/OG pass.** Update meta descriptions to the chosen offer model (they currently promise "Free access"); add an OG image using the drawdown-arithmetic visual; add FAQ schema for "Is this investment advice?" / "What is the hypothetical model portfolio?" — questions the page already answers.

---

## Roadmap dependency — the actual-trade record
The page is currently 100% hypothetical-model framed (correctly). When the actual-trade record launches, the landing page needs a **structurally separate** section: distinct labeling, its own disclosure block, zero blended statistics with the hypothetical model. Format and disclosures for published actual trades are a **pre-launch securities-counsel item** — design the section skeleton now, populate only after sign-off.

---

## Acceptance checklist for the developer
- [ ] One offer model, consistent across hero, access card, CTAs, portal trial banner, and meta tags
- [ ] One taxonomy spine (Framework → 5-Step Pipeline → Recorded Model); no unexplained numbers anywhere
- [ ] Module list on page matches post-audit portal IA exactly
- [ ] All figures reconciled against methodology deck and portal (signed checklist)
- [ ] Single canonical design-token file (`design-tokens.css` or shared Tailwind config) imported by BOTH alpha.ekantikcapital.com and researchportal.ekantikcapital.com
- [ ] Every color in the compiled CSS bundle diffed against the approved 8-color palette; no off-list hex values ship unexplained
- [ ] One declared font pairing (Playfair Display / DM Sans / DM Mono) applied identically on both properties; master brand guide updated to match
- [ ] Emoji icons replaced with brand-token SVG icon set (P0-4 / P2-1)
- [ ] Side-by-side screenshot QA of landing page vs. portal at matching viewport widths, attached to the PR
- [ ] Email capture live with compliant lead magnet + welcome sequence
- [ ] Founder section live
- [ ] Single primary CTA verb; domain journey unified
- [ ] Public stats are process-proof only; performance-stat visibility decision logged as counsel item
- [ ] No disclosure reduced in prominence without counsel sign-off
