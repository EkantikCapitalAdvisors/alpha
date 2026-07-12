# Alpha Engine — Landing Page Enhancement Spec

**Target:** `alpha.ekantikcapital.com`
**Version:** 1.0 · Final Developer Handoff
**Date:** 2026-05-24
**Owner:** Hiren Desai · Ekantik Capital Advisors LLC

---

## Scope

Three surgical changes to the existing landing page:

1. **Hero subhead** — in-place text replacement (no structural change)
2. **NEW section: The Asymmetric Capture Thesis** — insert between `#engine` and `#stack`
3. **NEW section: Six Lenses the Engine Applies** — insert between new `#thesis` and existing `#stack`

No other sections modified. No new pages. No removed content.

---

## Compliance Constraints — DO NOT MODIFY

Ekantik Capital Advisors LLC is a **financial publisher, not a registered investment adviser**. Every line of copy below has been written against this regulatory frame.

The developer must preserve, without exception:

- All existing disclaimer language (publication notice, hypothetical performance disclosure, editorial independence, forward-looking statements, no advisory relationship)
- The phrase **"hypothetical $100,000 model portfolio"** wherever it appears — never shortened to "model portfolio" or "$100K portfolio" in isolation
- The educational framing of all research language
- Zero references to managed accounts, advisory services, EPIG product family, EPIG500, return guarantees, capture-ratio commitments, or any language implying a fiduciary relationship between ECA and visitors

If any of the copy below appears to drift from this frame during implementation, **stop and flag** before publishing.

---

## Page Section Order

```
Current                          →     Updated
─────────────────────────────────       ─────────────────────────────────
1. Hero                                 1. Hero (subhead updated)
2. #engine                              2. #engine
3. #stack                               3. #thesis     ← NEW
4. #pipeline                            4. #lenses     ← NEW
5. Educational Framework                5. #stack
6. Transparency                         6. #pipeline
7. Editorial Principles                 7. Educational Framework
8. #access                              8. Transparency
                                        9. Editorial Principles
                                       10. #access
```

---

## 1. Hero — Subhead Replacement

**Keep:** existing eyebrow (`◆ Powered by the Ekantik Alpha Engine`), H1 (`Institutional-Grade Research. Individual Access.`), CTA buttons, chip row.

**Replace the existing subhead paragraph with the following:**

> Most portfolios capture the full weight of every drawdown and a fraction of every recovery. Our research is conducted through the opposite lens — the study of where capital compounds at a different ceiling. Twelve proprietary frameworks. Analyst-reviewed. Every research observation recorded in a $100,000 hypothetical model portfolio.

No code skeleton required — this is an in-place text edit in the existing hero markup.

---

## 2. NEW Section — The Asymmetric Capture Thesis

**Section ID:** `#thesis`
**Placement:** Immediately after the existing `#engine` section ("One engine. Every angle."), before `#lenses`.
**Background:** `--navy` (dark)

### Copy (final, ship-ready)

**Eyebrow:** ◆ The Research Doctrine
**H2:** The Asymmetric Capture Thesis
**Subhead (italic):** One lens. Every framework downstream serves it.

**Block 1 — H3:** The math that quietly governs every long compounding outcome
**Block 1 body:**
> A portfolio that falls 50% requires a 100% recovery to break even. A portfolio that falls 20% requires a 25% recovery. This is not opinion. It is arithmetic — and it is the silent governor of nearly every multi-decade investing outcome. Most strategies, retail and institutional alike, accept the full weight of this asymmetry as the unavoidable cost of being invested. We do not.

**Block 2 — H3:** What our research is built to find
**Block 2 body:**
> The Alpha Engine is not a hunt for the next name. It is a hunt for *asymmetry* — exposures where the structural upside available through a market cycle is materially larger than the structural downside that must be absorbed to reach it. Every module in our research stack — AOMG mapping, disruption tracking, episodic pivot detection, bias formation, exit observation — exists to interrogate one question: *where is the compounding math tilted in favor of the holder, and where is it tilted against?* Names are the output. The question is the product.

**Block 3 — H3:** Why we publish the lens, not just the names
**Block 3 body:**
> Most research publications sell names and price targets. Names expire. Targets get hit, missed, or quietly forgotten. We publish the *lens* — because a subscriber who internalizes how we evaluate asymmetry can apply that framework long after any single research observation has run its course. The methodology is the asset. The names are how the methodology proves itself, on the record, in a hypothetical model portfolio anyone can audit.

**Pull-quote (closing, italic, centered, bordered top + bottom):**
> The right question is not what the market will do. The right question is which exposures survive what it does — and which compound through it.

---

## 3. NEW Section — Six Lenses the Engine Applies

**Section ID:** `#lenses`
**Placement:** Immediately after `#thesis`, before existing `#stack` ("The Intelligence Stack").
**Background:** `--navy-deep` (slightly deeper than thesis section for visual differentiation)
**Layout:** 2-column grid on desktop, single-column on mobile

### Copy (final, ship-ready)

**Eyebrow:** ◆ Methodology
**H2:** Six Lenses the Engine Applies
**Subhead:** The Thesis names what we look for. These are the six questions every name in our research coverage is interrogated against.

| # | Title | Question (italic) | Body |
|---|---|---|---|
| Lens 1 | Compounding Rate | *Does this exposure compound at a rate that survives full market cycles intact?* | A research filter for long-horizon arithmetic — separating compounding that depends on a single market regime from compounding that persists across them. |
| Lens 2 | Downside Exposure | *How much of the next drawdown does this exposure structurally absorb?* | A research filter for the architecture of loss — what causes catastrophic decline, what filters it, and where the asymmetry quietly inverts against the holder. |
| Lens 3 | Liquidity Profile | *Can the position be exited without permanent damage at the inflection points that matter?* | A research filter for optionality — examining whether the holder retains control of timing, or surrenders it to market conditions. |
| Lens 4 | Yield Without Sacrifice | *Where does ongoing cash flow exist without compromising upside participation?* | A research filter for income-generating exposures whose yield does not come at the cost of capture. |
| Lens 5 | Thesis Portability | *Does the case hold when transplanted into different portfolio contexts?* | A research filter for generality — testing whether an idea works only inside its native allocation, or survives across allocator types and capital scales. |
| Lens 6 | Valuation Dependence | *How much of the forward return is already locked in — or locked out — by the entry multiple?* | A research filter for the most underestimated variable in long-run outcomes: what you pay at entry. |

**Closing line (italic, centered, separated by thin gold rule):**
> Every research observation published through the Alpha Engine has been read against all six.

---

## 4. Design Tokens

Add to the global stylesheet if not already present. Variable names align with existing Ekantik brand conventions.

```css
:root {
  /* Color */
  --navy:        #1B2A4A;
  --navy-deep:   #0A1628;
  --gold:        #C8A951;
  --gold-light:  #E8C977;
  --ivory:       #FAF8F5;
  --ivory-soft:  rgba(250, 248, 245, 0.85);
  --ivory-muted: rgba(250, 248, 245, 0.65);
  --slate:       #64748B;

  /* Type stacks */
  --font-serif:  'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --font-sans:   'DM Sans', 'Source Sans Pro', system-ui, -apple-system, sans-serif;
}
```

**Font loading.** Ensure both Cormorant Garamond and DM Sans are loaded with weights: Cormorant Garamond 400/500 (regular + italic), DM Sans 400/600. Google Fonts URL if not already loaded:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet">
```

---

## 5. HTML — Both Sections

```html
<!-- ========================================
     SECTION: Asymmetric Capture Thesis
     PLACEMENT: After #engine, before #lenses
     ======================================== -->

<section id="thesis" class="thesis" aria-labelledby="thesis-heading">
  <div class="thesis-container">
    <p class="thesis-eyebrow">◆ The Research Doctrine</p>
    <h2 id="thesis-heading" class="thesis-h2">The Asymmetric Capture Thesis</h2>
    <p class="thesis-subhead">One lens. Every framework downstream serves it.</p>

    <article class="thesis-block">
      <h3>The math that quietly governs every long compounding outcome</h3>
      <p>A portfolio that falls 50% requires a 100% recovery to break even. A portfolio that falls 20% requires a 25% recovery. This is not opinion. It is arithmetic — and it is the silent governor of nearly every multi-decade investing outcome. Most strategies, retail and institutional alike, accept the full weight of this asymmetry as the unavoidable cost of being invested. We do not.</p>
    </article>

    <hr class="thesis-rule" aria-hidden="true" />

    <article class="thesis-block">
      <h3>What our research is built to find</h3>
      <p>The Alpha Engine is not a hunt for the next name. It is a hunt for <em>asymmetry</em> — exposures where the structural upside available through a market cycle is materially larger than the structural downside that must be absorbed to reach it. Every module in our research stack — AOMG mapping, disruption tracking, episodic pivot detection, bias formation, exit observation — exists to interrogate one question: <em>where is the compounding math tilted in favor of the holder, and where is it tilted against?</em> Names are the output. The question is the product.</p>
    </article>

    <hr class="thesis-rule" aria-hidden="true" />

    <article class="thesis-block">
      <h3>Why we publish the lens, not just the names</h3>
      <p>Most research publications sell names and price targets. Names expire. Targets get hit, missed, or quietly forgotten. We publish the <em>lens</em> — because a subscriber who internalizes how we evaluate asymmetry can apply that framework long after any single research observation has run its course. The methodology is the asset. The names are how the methodology proves itself, on the record, in a hypothetical model portfolio anyone can audit.</p>
    </article>

    <blockquote class="thesis-pullquote" role="doc-pullquote">
      The right question is not what the market will do. The right question is which exposures survive what it does — and which compound through it.
    </blockquote>
  </div>
</section>


<!-- ========================================
     SECTION: Six Lenses the Engine Applies
     PLACEMENT: After #thesis, before #stack
     ======================================== -->

<section id="lenses" class="lenses" aria-labelledby="lenses-heading">
  <div class="lenses-container">
    <header class="lenses-header">
      <p class="lenses-eyebrow">◆ Methodology</p>
      <h2 id="lenses-heading" class="lenses-h2">Six Lenses the Engine Applies</h2>
      <p class="lenses-subhead">The Thesis names what we look for. These are the six questions every name in our research coverage is interrogated against.</p>
    </header>

    <div class="lenses-grid">
      <article class="lens">
        <p class="lens-label">Lens 1</p>
        <h3 class="lens-title">Compounding Rate</h3>
        <p class="lens-question">Does this exposure compound at a rate that survives full market cycles intact?</p>
        <p class="lens-body">A research filter for long-horizon arithmetic — separating compounding that depends on a single market regime from compounding that persists across them.</p>
      </article>

      <article class="lens">
        <p class="lens-label">Lens 2</p>
        <h3 class="lens-title">Downside Exposure</h3>
        <p class="lens-question">How much of the next drawdown does this exposure structurally absorb?</p>
        <p class="lens-body">A research filter for the architecture of loss — what causes catastrophic decline, what filters it, and where the asymmetry quietly inverts against the holder.</p>
      </article>

      <article class="lens">
        <p class="lens-label">Lens 3</p>
        <h3 class="lens-title">Liquidity Profile</h3>
        <p class="lens-question">Can the position be exited without permanent damage at the inflection points that matter?</p>
        <p class="lens-body">A research filter for optionality — examining whether the holder retains control of timing, or surrenders it to market conditions.</p>
      </article>

      <article class="lens">
        <p class="lens-label">Lens 4</p>
        <h3 class="lens-title">Yield Without Sacrifice</h3>
        <p class="lens-question">Where does ongoing cash flow exist without compromising upside participation?</p>
        <p class="lens-body">A research filter for income-generating exposures whose yield does not come at the cost of capture.</p>
      </article>

      <article class="lens">
        <p class="lens-label">Lens 5</p>
        <h3 class="lens-title">Thesis Portability</h3>
        <p class="lens-question">Does the case hold when transplanted into different portfolio contexts?</p>
        <p class="lens-body">A research filter for generality — testing whether an idea works only inside its native allocation, or survives across allocator types and capital scales.</p>
      </article>

      <article class="lens">
        <p class="lens-label">Lens 6</p>
        <h3 class="lens-title">Valuation Dependence</h3>
        <p class="lens-question">How much of the forward return is already locked in — or locked out — by the entry multiple?</p>
        <p class="lens-body">A research filter for the most underestimated variable in long-run outcomes: what you pay at entry.</p>
      </article>
    </div>

    <p class="lenses-closer">Every research observation published through the Alpha Engine has been read against all six.</p>
  </div>
</section>
```

---

## 6. CSS — Both Sections

```css
/* ============================================================
   ALPHA ENGINE — Thesis + Six Lenses
   Append to existing stylesheet. Self-contained, no resets.
   ============================================================ */

/* ---------- Thesis Section ---------- */

.thesis {
  background: var(--navy);
  padding: 96px 24px;
}

.thesis-container {
  max-width: 880px;
  margin: 0 auto;
}

.thesis-eyebrow {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 24px;
}

.thesis-h2 {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 400;
  color: var(--ivory);
  line-height: 1.1;
  margin: 0 0 12px;
  letter-spacing: -0.005em;
}

.thesis-subhead {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(18px, 2.2vw, 22px);
  color: var(--gold-light);
  margin: 0 0 56px;
  line-height: 1.4;
}

.thesis-block {
  margin-bottom: 56px;
}

.thesis-block:last-of-type {
  margin-bottom: 0;
}

.thesis-block h3 {
  font-family: var(--font-serif);
  font-size: clamp(22px, 2.8vw, 28px);
  font-weight: 500;
  color: var(--ivory);
  line-height: 1.25;
  margin: 0 0 16px;
}

.thesis-block p {
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 1.65;
  color: var(--ivory-soft);
  margin: 0;
}

.thesis-block em {
  font-style: italic;
  color: var(--gold-light);
}

.thesis-rule {
  width: 60px;
  height: 1px;
  border: 0;
  background: var(--gold);
  opacity: 0.4;
  margin: 0 auto 56px;
}

.thesis-pullquote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(20px, 3vw, 28px);
  color: var(--gold-light);
  text-align: center;
  max-width: 720px;
  margin: 64px auto 0;
  padding: 32px 0;
  border-top: 2px solid var(--gold);
  border-bottom: 2px solid var(--gold);
  line-height: 1.4;
}

/* ---------- Six Lenses Section ---------- */

.lenses {
  background: var(--navy-deep);
  padding: 96px 24px;
}

.lenses-container {
  max-width: 1080px;
  margin: 0 auto;
}

.lenses-header {
  max-width: 880px;
  margin: 0 auto 64px;
}

.lenses-eyebrow {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 24px;
}

.lenses-h2 {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 400;
  color: var(--ivory);
  line-height: 1.1;
  margin: 0 0 16px;
  letter-spacing: -0.005em;
}

.lenses-subhead {
  font-family: var(--font-sans);
  font-size: clamp(16px, 2vw, 18px);
  color: var(--ivory-soft);
  line-height: 1.55;
  margin: 0;
  max-width: 720px;
}

.lenses-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.lens {
  padding: 32px;
  background: rgba(250, 248, 245, 0.03);
  border: 1px solid rgba(200, 169, 81, 0.18);
  border-radius: 4px;
  transition: border-color 200ms ease, background 200ms ease;
}

.lens:hover {
  border-color: rgba(200, 169, 81, 0.45);
  background: rgba(250, 248, 245, 0.05);
}

.lens-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 12px;
}

.lens-title {
  font-family: var(--font-serif);
  font-size: clamp(22px, 2.4vw, 26px);
  font-weight: 500;
  color: var(--ivory);
  line-height: 1.2;
  margin: 0 0 12px;
}

.lens-question {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 17px;
  color: var(--gold-light);
  line-height: 1.45;
  margin: 0 0 16px;
}

.lens-body {
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 1.6;
  color: var(--ivory-soft);
  margin: 0;
}

.lenses-closer {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(18px, 2.2vw, 22px);
  color: var(--gold-light);
  text-align: center;
  max-width: 720px;
  margin: 48px auto 0;
  padding-top: 32px;
  border-top: 1px solid rgba(200, 169, 81, 0.3);
  line-height: 1.5;
}

/* ---------- Responsive ---------- */

@media (max-width: 768px) {
  .lenses-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .thesis,
  .lenses {
    padding: 64px 20px;
  }

  .thesis-block,
  .lenses-header {
    margin-bottom: 40px;
  }

  .thesis-block {
    margin-bottom: 40px;
  }

  .thesis-rule {
    width: 40px;
    margin-bottom: 40px;
  }

  .thesis-pullquote {
    padding: 24px 0;
    margin-top: 40px;
  }

  .lens {
    padding: 24px;
  }

  .lenses-closer {
    margin-top: 32px;
    padding-top: 24px;
  }
}

/* ---------- Reduced Motion ---------- */

@media (prefers-reduced-motion: reduce) {
  .lens {
    transition: none;
  }
}
```

---

## 7. Responsive Behavior — Summary

| Breakpoint | Thesis | Lenses |
|---|---|---|
| ≥ 769px (desktop) | 96px vertical padding · max-width 880px · 60px block dividers | 96px vertical padding · max-width 1080px · 2-column grid · 32px gap |
| 641–768px (tablet) | 96px padding · stacked blocks | 96px padding · **single column** · 20px gap |
| ≤ 640px (mobile) | 64px padding · 40px rules · pull-quote 24px padding | 64px padding · single column · 24px card padding |

Type scales fluidly via `clamp()` — no manual font-size overrides needed at breakpoints.

---

## 8. Accessibility

- `<section>` elements use `aria-labelledby` pointing to their H2.
- Decorative `<hr class="thesis-rule">` carries `aria-hidden="true"`.
- Pull-quote uses `role="doc-pullquote"` for AT semantics.
- Lens cards are `<article>` elements with semantic H3 titles.
- Contrast ratios (verified against WCAG 2.1):
  - `--ivory` on `--navy`: ~14:1 — passes **AAA**
  - `--ivory` on `--navy-deep`: ~16:1 — passes **AAA**
  - `--gold` on `--navy`: ~5:1 — passes **AA** for large text and UI components
  - `--gold-light` on `--navy`: ~7:1 — passes **AAA** large, **AA** body
- `prefers-reduced-motion` honored on hover transitions.
- No interactive elements rely on color alone.
- Tab order follows source order — no `tabindex` overrides needed.

---

## 9. QA Checklist (Pre-Publish)

- [ ] Hero subhead replaced; H1, eyebrow, CTAs, chips unchanged
- [ ] `#thesis` section renders between `#engine` and `#lenses` in source and visual order
- [ ] `#lenses` section renders between `#thesis` and `#stack`
- [ ] All six lenses display in a 2-col grid at desktop ≥ 769px
- [ ] Single-column stack at ≤ 768px
- [ ] Cormorant Garamond loads correctly on all H2/H3, pull-quote, lens question
- [ ] DM Sans loads correctly on body, eyebrow, label, lens body
- [ ] Pull-quote bordered top + bottom, gold
- [ ] Hover state on lens cards (border lightens, background subtle lift)
- [ ] Mobile padding reductions take effect ≤ 640px
- [ ] No advisory language, no return targets, no EPIG mentions, no managed-account references introduced anywhere
- [ ] All existing disclaimers (publication notice, hypothetical performance, editorial independence, forward-looking statements, no advisory relationship) still present and unmodified
- [ ] Page passes Lighthouse Accessibility ≥ 95
- [ ] No new console errors or warnings
- [ ] Skip links / focus outlines preserved

---

## 10. Out of Scope (Explicitly Excluded)

- No changes to `#engine`, `#stack`, `#pipeline`, Educational Framework, Transparency, Editorial Principles, `#access`, or footer
- No new pages, no new routes
- No funnel bridge to any other Ekantik product or domain
- No EPIG, EPIG500, ECFS, or managed-account branding introduced
- No third-party scripts, analytics changes, or tracking pixels
- No copy in the page footer or disclaimer blocks modified

---

## End of Spec

Questions, ambiguities, or implementation-time judgment calls → flag back to owner before merging to production.

© 2026 Ekantik Capital Advisors LLC. Internal handoff document.
