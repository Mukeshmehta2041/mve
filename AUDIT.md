# UI Audit — Maa Vindhawasini Enterprises

> **Status:** the P0 and P1 findings below have been fixed. See
> [Remediation log](#remediation-log) at the end for what changed and what was
> deliberately left. Scores in the table are the **pre-fix** baseline; re-run the
> audit to score the current state.

**Date:** 2026-07-19
**Scope:** all 13 routes, 30 components, `src/styles/index.css`, `index.html`
**Stack:** React 19 · Vite 6 · Tailwind v4 · react-router 6
**Register:** brand (marketing / lead-gen — design IS the product)

---

## Audit Health Score

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 2/4 | Primary CTA text fails contrast (3.02:1); form errors never announced |
| 2 | Performance | 1/4 | 440KB unsplit bundle · 20 images >300KB · no srcset · 0/78 imgs sized |
| 3 | Theming | 2/4 | Full token system exists; ~300 raw palette classes bypass it |
| 4 | Responsive | 2/4 | Phantom `safe-bottom` class = zero iOS safe-area handling |
| 5 | Anti-Patterns | 2/4 | Ghost-card is the default surface · icon-tile ×22 · nested cards |
| **Total** | | **9/20** | **Poor — major work needed on performance and token discipline** |

---

## Anti-Patterns Verdict

**Would someone look at this and say "AI made that"?**

On a single scroll — **no**, and that's worth stating plainly. The copy is genuinely specific and un-generic for the category ("A workshop, not a middleman", "Nothing standard about it"). There is no gradient text, no decorative glassmorphism, no scroll-gated fade-up on every section, and radius discipline is clean (nothing over 16px anywhere). Zero hits for "trusted by industry leaders", "state-of-the-art", "excellence", "seamless". Those are real wins.

Across three pages with DevTools open — **yes**. But the tell isn't the visual language, it's the **duplication**:

- `PageCTA.tsx` is fully built and **imported nowhere**. Six pages hand-roll their own near-identical final-CTA block (`About.tsx:338`, `Contact.tsx:537`, `Projects.tsx:360`, `CustomFabrication.tsx:367`, `QualityCertifications.tsx:244`, `ProductDetail.tsx:639`).
- `PageHeroShell.tsx` is used on exactly two surfaces (`Products.tsx:22`, `LegalComponents.tsx:23`). Six other pages duplicate ~45 lines each of the same navy hero markup.
- `Badge`, `TrustBadge`, `TextLink` are **never imported outside their own files**. `TrustIndicators.tsx:12` and `ProductDetail.tsx:260` reimplement them inline.
- `SectionHeader`'s `eyebrow` prop is passed at **0 of 11** call sites — yet the same tiny-uppercase-tracked eyebrow is hand-rolled 4× elsewhere (`ProductDetail.tsx:488,521,577`, `HomeHero.tsx:16`).
- Three separately hand-copied numbered-circle timelines (`CustomFabrication.tsx:189`, `ProductDetail.tsx:499`, `QualityCertifications.tsx:139`), plus a fourth variant at `RequestAQuote.tsx:822`.

That is the fingerprint of many generation passes that never diffed against prior output. It is also, fortunately, the most fixable class of problem here.

**Specific visual tells, ranked:**

1. **Five identical decorative glow orbs.** `<div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0">` copy-pasted verbatim into every page hero (`About.tsx:43`, `Projects.tsx:69`, `Contact.tsx:139`, `RequestAQuote.tsx:374`, `QualityCertifications.tsx:40`, `CustomFabrication.tsx:53`). The single most recognizable generic-template signature on the site.
2. **Rounded icon-tile above a heading, ×22.** Near-verbatim class strings across `Badge.tsx:57`, `TrustIndicators.tsx:17`, `HomeAbout.tsx:57`, `CustomFabrication.tsx:126,249,260,271,282`, `Contact.tsx:196,225,253,281,519`, `QualityCertifications.tsx:113,175`, `ProductDetail.tsx:276,284,292,447`, `About.tsx:171,237,272`. Every content section reduces to icon-square + bold-heading + gray-caption.
3. **Ghost-card as the default surface.** `Card.tsx:19-22` pairs `border border-border` with `shadow-card` (28px blur), escalating to `shadow-floating` (50px) on hover. The border/shadow combination is hand-rolled 49 more times outside the component.
4. **Inter + Poppins.** Two same-genre sans faces with similar x-heights — headings barely read as distinct from body. Inter is also the single most saturated AI-UI default.
5. **Dot-grid decorative background.** Identical inline `radial-gradient` style in `HomeHero.tsx:11` and `HomeFinalCTA.tsx:19`.

> **Note:** items 1, 4 and 5 are identity-level decisions and are documented here only. They were explicitly ruled out of the remediation pass — identity-preservation wins over a checklist.

---

## Executive Summary

- **Audit Health Score: 9/20** (Poor)
- **Issues: 2 P0 · 10 P1 · 12 P2 · 6 P3**

**Top 5:**

1. `safe-bottom` is a phantom class — iOS safe-area handling is silently dead on the mobile CTA bar (P0)
2. White-on-orange primary buttons measure 3.02:1; WhatsApp green measures 2.28:1 (P0)
3. Form errors are never exposed to assistive tech — no `aria-invalid`, no `aria-describedby`, no live region (P1)
4. 440KB single bundle, zero code-splitting, 492KB eager unpreloaded hero image (P1/P2)
5. A complete component kit exists as dead code while six pages duplicate its output (P1)

---

## Findings by Severity

### P0 — Blocking

#### [P0] `safe-bottom` utility is never defined
**Location:** `src/components/layout/MobileStickyActionBar.tsx:25`, `src/components/navigation/MobileNavigation.tsx:121`
**Category:** Responsive

```
className="fixed bottom-0 left-0 right-0 z-30 ... lg:hidden px-4 py-2.5 ... safe-bottom"
```

The class is used at both call sites but defined nowhere — not in `src/styles/index.css`, no `tailwind.config` file exists in the project, and it is absent from the compiled `dist/assets/index-*.css`. Tailwind v4 silently drops unknown utilities.

**Impact:** On notched / Dynamic-Island / home-indicator iPhones, the fixed bottom Call · WhatsApp · Quote bar — the site's primary mobile conversion control — renders flush against the gesture strip with no reserved padding. The bottom ~10–20px of those tap targets is obscured or swallowed by the system gesture area. Same for the drawer's bottom CTA block.
**Recommendation:** Define a real `@utility safe-bottom { padding-bottom: env(safe-area-inset-bottom); }` so both existing call sites work as authored.

#### [P0] Contrast failures on conversion-critical controls
**Location:** `src/styles/index.css:6,16` (token definitions); surfaces via `Button.tsx:32,37` and every `slate-400` text usage
**Category:** Accessibility · **WCAG 1.4.3 (AA)**

Measured against the exact committed token values:

| Foreground | Background | Ratio | Required | Result |
|---|---|---:|---:|---|
| `#ffffff` | `--color-primary` `#f26c21` | **3.02:1** | 4.5:1 | ❌ every primary button |
| `#ffffff` | `--color-success` `#22c55e` | **2.28:1** | 4.5:1 | ❌ every WhatsApp button |
| `--color-primary` `#f26c21` | white | **3.02:1** | 4.5:1 | ❌ orange as body text |
| `#f26c21` | `--color-primary-soft` `#fff2ea` | **2.76:1** | 3:1 | ❌ icon badges |
| `--color-slate-400` `#94a3b8` | white | **2.56:1** | 4.5:1 | ❌ labels, captions |
| `#94a3b8` | `--color-surface` `#f8fafc` | **2.45:1** | 4.5:1 | ❌ labels on alt sections |
| `#ffffff` | `--color-primary-hover` `#d95513` | 3.99:1 | 4.5:1 | ❌ hover state |

Passing for reference: `slate-600` on white **7.58:1** ✅ · `slate-400` on navy-950 **6.96:1** ✅ (dark sections are fine).

Button labels are 14–16px semibold — they do not qualify for the 3:1 large-text exemption.

**Impact:** Every call-to-action on a lead-generation site is below the legibility floor for users with low vision, and unreadable in bright outdoor light — which matters for a construction/fabrication audience often viewing on-site.
**Recommendation:** Add an ink-tier to the ramp rather than restyling. `--color-primary-ink` `#c2410c` measures **5.18:1** on white and **4.72:1** on `primary-soft`; `--color-success-ink` `#15803d` measures **5.02:1**. Use the ink tier wherever the color carries white text or acts as text itself; keep `#f26c21` for large display type, borders, and fills that carry no text. Retire `slate-400` as a text color on light surfaces (it stays valid on navy).

---

### P1 — Major

#### [P1] Form errors are invisible to assistive tech
**Location:** `src/components/ui/FormControls.tsx` · `src/pages/Contact.tsx` · `src/pages/RequestAQuote.tsx`
**Category:** Accessibility · **WCAG 3.3.1, 4.1.3**

Labels *are* correctly associated via `htmlFor`/`id`, and required asterisks render — that part is done well. But no input ever receives `aria-invalid`, no error message is linked via `aria-describedby`, and neither form announces submit success or failure through a live region or moves focus.

**Impact:** A screen-reader user submits the quote form, hears nothing, and has no way to discover which field failed. On a lead-gen site this is a silently lost conversion.
**Recommendation:** `aria-invalid` + `aria-describedby` on errored controls; `role="status"` live region for submit outcome.

#### [P1] Lightbox has no focus management
**Location:** `src/pages/ProductDetail.tsx:702`
**Category:** Accessibility · **WCAG 2.1.2, 2.4.3**

No focus trap, no body scroll lock, no focus restoration on close. Keyboard focus escapes behind the overlay into the page underneath. The zoom-to-open affordance is also mouse-only.

Notably, `src/components/navigation/MobileNavigation.tsx` already implements focus trap, Escape handling, scroll lock, and focus restore correctly — the pattern exists in-repo and simply wasn't reused.

#### [P1] Desktop dropdown Escape only works from inside the panel
**Location:** `src/components/navigation/DesktopNavigation.tsx`
**Category:** Accessibility · **WCAG 2.1.2**

#### [P1] No scroll or focus reset on route change
**Location:** `src/App.tsx`, `src/routes/index.tsx`
**Category:** Accessibility · **WCAG 2.4.3**

Verified by grep: nothing outside `MobileStickyActionBar` calls `useLocation`, nothing calls `scrollTo`, no `<ScrollRestoration>`. Navigating from a long page lands the user mid-scroll on the new one, and screen-reader focus stays on the old, now-unmounted link.

#### [P1] Touch targets below 44×44px on primary controls
**Category:** Accessibility · **WCAG 2.5.5**

| Location | Actual | Note |
|---|---|---|
| `Button.tsx:42` `sm: 'h-10 px-4'` | 40px | used for the CTA pair on **every** product/project card |
| `ProjectCard.tsx:80,92` `h-[38px] px-1 truncate` | 38px | "Discuss Project" clips to "Discuss Proj…" at 375px |
| `Projects.tsx:224` filter chips `py-1.5 text-xs` | ~28px | primary mobile filtering control |
| `Breadcrumb.tsx:33-59` | ~16–20px | on every page, 8px apart |
| `ProductDetail.tsx:206,213` gallery arrows `w-10 h-10` | 40px | the lightbox's own arrows are 48px — inconsistent |
| `FormControls.tsx:255` file-remove `×` | 16px | see below |

The file-remove `×` is the worst of these: it sits inside a dropzone whose `<input type="file">` is absolutely positioned `inset-0 opacity-0`. A near-miss on the 16px `×` doesn't just fail — it **reopens the file picker**.

The codebase already states its own standard: `IconButton` (`Button.tsx:104`) enforces `min-w-[44px] min-h-[44px]`.

#### [P1] Ghost-card is the site's default surface
**Location:** `src/components/ui/Card.tsx:19-22`, plus 49 hand-rolled repeats
**Category:** Anti-Pattern

```
'bg-white border border-border rounded-card p-5 md:p-6 text-left',
hoverable && 'hover:-translate-y-[3px] hover:shadow-floating transition-all duration-200 shadow-card',
```

A 1px border plus a 28px-blur shadow on the same element — the soft shadow already communicates elevation, so the crisp border on top reads as a stray outline. Hover escalates to a 50px blur while keeping the border. This is the shared primitive behind every card on the site, so it propagates everywhere.

#### [P1] Nested cards, three deep
**Location:** `src/pages/RequestAQuote.tsx:421` → `:636` → `src/components/ui/FormControls.tsx:214`
**Category:** Anti-Pattern

Carded form panel → `rounded-card` highlight wrapper → dashed `rounded-card` dropzone. Nested cards are always wrong; three levels is a fair distance past that.

#### [P1] Heading hierarchy skip
**Location:** `src/pages/Products.tsx`
**Category:** Accessibility · **WCAG 1.3.1**

h1 → h3 with no h2. The only such break site-wide — every other listing page routes through `SectionHeader` (which renders h2) before its card grid.

#### [P1] Form primitives bypass the token system entirely
**Location:** `src/components/ui/FormControls.tsx`
**Category:** Theming

33 raw Tailwind palette classes — `border-slate-300`, `placeholder-slate-400`, `bg-slate-50`, `text-red-500`, `border-red-500`, `ring-red-500`, `bg-red-50`, `bg-green-50`, `border-green-200`, `text-green-800` — while `--color-error`, `--color-success`, `--color-border` and `--color-text-muted` all exist and go unused. This is the one component every lead-gen form on the site depends on.

#### [P1] Dead component kit, ~300 duplicated lines
**Category:** Anti-Pattern · Maintainability
See the Anti-Patterns Verdict above for the full inventory. Beyond the AI-authorship signal, this is a live visual-drift risk: six copies of a hero mean six places to miss when the design changes.

#### [P1] Render-blocking font load, 9 weights, no preconnect
**Location:** `src/styles/index.css:1`, `index.html`

```
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
```

A CSS `@import` is render-blocking and serially discovered — the browser must fetch and parse the stylesheet before it even learns the font URLs. No `<link rel="preconnect">` to `fonts.googleapis.com` / `fonts.gstatic.com` exists. Nine font files are requested; the design only ever uses semibold / bold / extrabold for headings.

#### [P1] Zero code-splitting
**Location:** `src/routes/index.tsx:3-15`

All 13 page components are statically imported; no `React.lazy` or `Suspense` anywhere (verified by grep). Build output: `dist/assets/index-*.js` = **440KB** unsplit. A visitor landing on the home page downloads the quote form, the legal pages, and the full product-detail gallery.

---

### P2 — Minor

- **Site-wide token bypass, ~300 occurrences.** Worst offenders: `ProductDetail.tsx` (41), `RequestAQuote.tsx` (36), `CustomFabrication.tsx` (34), `Contact.tsx` (31), `Projects.tsx` (20), `About.tsx` (20). Raw `slate-50/100/200/300/500/700/800/900`, `bg-white`, `text-white`, and off-brand `red-`/`green-`/`yellow-` classes. (`slate-400`/`slate-600` are legitimate tokens and are excluded from these counts.)
- **20 of 33 content images exceed 300KB.** `hero/home-industrial-hero.jpg` 492KB (eager, above the fold, no `<link rel=preload>`, no `fetchpriority="high"`); `facilities/company-building.jpg` 580KB; `products/shuttering-plate.jpg` 548KB. No AVIF/WebP anywhere.
- **`ResponsiveImage.tsx` emits no `srcset`/`sizes`** despite its name — every device downloads the same full-resolution JPEG. No `srcset` exists anywhere in the codebase.
- **0 of 78 `<img>` tags set `width`/`height`;** 1 of 78 sets `loading="lazy"`; none set `decoding`. Aspect-ratio wrappers mitigate CLS for card images but not for plain hero `<img>`s.
- **34 un-tokenized `shadow-sm` usages** — a third shadow value floating outside the two real tokens.
- **`md:` breakpoint gap on 20+ layouts.** `grid-cols-1 lg:grid-cols-12` with no intermediate step means every hero and content split stacks to a single column across the entire 768–1024px tablet range.
- **Dead motion artifacts.** `--animate-accordion-down`/`-up` (`index.css:67-68`) reference `@keyframes` that don't exist and are applied nowhere — vestigial shadcn boilerplate. `ProductDetail.tsx:702` applies `animate-fade-in`, which is not a Tailwind default and is not defined in `index.css` — the class is a no-op and the lightbox has no open animation despite implying one. `CustomFabrication.tsx:394` has a stray `animate-none`.
- **Inconsistent h2 sizing.** `SectionHeader.tsx:46` uses `text-2xl md:text-3xl lg:text-4xl`, but `Contact.tsx:313` and `ProductDetail.tsx:361` use `text-xl md:text-2xl`, and `About.tsx:291` caps at `md:text-3xl`. One semantic level rendering at three different scales.
- **`Badge.tsx:19-20`** uses raw `green-50/200` and `yellow-50/800/200`; no `--color-warning` token exists at all.
- **Filter chips, breadcrumbs, gallery arrows** — see the P1 touch-target table; the non-primary ones sit here.

### P3 — Polish

- `text-wrap: balance` / `pretty` used nowhere, despite several two-line hero headings (`HomeHero.tsx:20`, `About.tsx:54`) that would benefit.
- `transition-all` in 24 places where only `transform` / `box-shadow` / `background-color` change.
- Index-as-`key` in 17 places across 8 files. Lists are static so risk is low, but it's a smell.
- `NotFound.tsx:20` `text-6xl md:text-8xl` sits exactly at the 6rem display ceiling — fine if deliberate.
- `ResponsiveImage.tsx` accepts no `width`/`height` props to forward, and `ratio='auto'` produces no aspect lock — safe at all 3 current call sites only because each is externally wrapped.
- No dark mode. Stated as fact, not as a defect — nothing in the code or brief asks for it.

---

## Patterns & Systemic Issues

1. **The token system is real but optional.** `index.css` defines a complete, well-structured ramp promoted properly into Tailwind v4's `@theme`. Roughly 300 class usages ignore it. The tokens aren't wrong — nothing enforces them.
2. **Components exist but aren't reached for.** `PageCTA`, `Badge`, `TrustBadge`, `TextLink` are dead; `PageHeroShell` is 2/8 adopted; `SectionHeader.eyebrow` is 0/11. Pages were built in isolation from the kit that was built for them.
3. **44px is the codebase's stated standard and is missed everywhere it matters.** `IconButton` enforces it explicitly; the actual conversion buttons land at 38–40px.
4. **Nothing in the image pipeline is optimized.** No srcset, no modern formats, no dimensions, no preload, no lazy hints, 20 files over 300KB. This single area is why Performance scores 1/4.
5. **A11y effort is real but stops at the happy path.** Skip link ✅, landmarks ✅, one h1 per route ✅, labels associated ✅, mobile nav focus trap ✅ — then error states, modals, and route transitions are all unhandled.

## Positive Findings — preserve these

- **Copy is genuinely specific.** Zero marketing filler across all of `src/data/**` and `src/pages/**`. This is rarer than it sounds and is the strongest thing the site has.
- **Motion is not the uniform reflex.** No `IntersectionObserver`, no `opacity-0` defaults gating content visibility, no fade-up on every section. Nothing ships blank in a headless renderer.
- **`prefers-reduced-motion` is handled globally** (`index.css:110-117`) and is sufficient, since there's no JS-driven animation to miss.
- **Radius discipline is clean.** Zero `rounded-2xl`/`3xl`/oversized arbitrary values site-wide; the 8/12/16px tokens are respected everywhere.
- **Skip link, landmarks, single h1 per route, associated form labels, mobile nav focus trap** — all correct.
- **`MobileNavigation.tsx` is a genuinely well-built component** — focus trap, Escape, scroll lock, focus restore. It should be the template for the lightbox.
- **`ProductDetail`'s spec table** swaps `hidden md:table` for a stacked mobile layout — good, deliberate responsive work.
- **Decorative blur circles are contained** inside `overflow-hidden` wrappers, so they cause no horizontal scroll despite exceeding viewport width.
- **`index.html` viewport meta is correct** — no `user-scalable=no`.

---

## Recommended Actions

1. **[P0] `$impeccable harden`** — define `safe-bottom`; the mobile CTA bar is the site's main conversion control and is currently clipped on modern iPhones.
2. **[P0] `$impeccable colorize`** — add the `primary-ink` / `success-ink` tier so CTAs clear 4.5:1; retire `slate-400` as light-surface text.
3. **[P1] `$impeccable harden`** — `aria-invalid` / `aria-describedby` / live regions on both forms; focus trap + scroll lock + restore on the lightbox; scroll-and-focus reset on route change.
4. **[P1] `$impeccable adapt`** — raise every conversion control to 44px.
5. **[P1] `$impeccable distill`** — resolve ghost-card into one elevation language; flatten the triple-nested card; consolidate six heroes and six CTAs onto `PageHeroShell` / `PageCTA`; extract one `ProcessTimeline`.
6. **[P1] `$impeccable optimize`** — preconnect and trim font weights; `React.lazy` the heavy routes.
7. **[P2] `$impeccable extract`** — migrate the ~300 remaining raw palette classes onto tokens; add a `warning` token.
8. **[P2] `$impeccable optimize`** — srcset + AVIF/WebP + intrinsic dimensions + hero preload.
9. **[P2] `$impeccable adapt`** — add the missing `md:` step to the 20+ two-column splits.
10. **[P3] `$impeccable polish`** — final pass.

You can ask me to run these one at a time, all at once, or in any order you prefer.

Re-run `$impeccable audit` after fixes to see the score improve.

---

## Remediation log

All P0 and P1 items above are fixed. `tsc --noEmit`, `eslint .`, and `npm run build` are clean; every page was re-checked in a real 390px viewport.

**P0**
- `safe-bottom` replaced with explicit `pb-[calc(<base>+env(safe-area-inset-bottom))]` at both call sites. The utility was *not* simply defined: as a utility it would have overridden the elements' existing `py-2.5` / `p-4` bottom padding and set it to `0` on non-notched devices, trading one bug for another.
- Added a `-ink` tier: `--color-primary-ink` `#c2410c` (5.18:1 on white, 4.72:1 on `primary-soft`), `--color-success-ink` `#15803d` (5.02:1), plus hover steps. Applied to every button, badge, and link that carries text on a light surface. Base `#f26c21` is retained on navy, where it measures 5.90:1.
- Light-surface `slate-400` text (2.45–2.56:1) moved to a new `slate-500` tier (4.55–4.76:1) across 20 call sites. Found the **inverse** bug in the footer bottom bar, which used `slate-500` on navy at 3.75:1 — that one went the other way, to `slate-400`.

**P1**
- Forms: `aria-invalid` + `aria-describedby` wired on every control; `role="alert"` for submit failures, `role="status"` + focus move for success. `Checkbox` id switched from `Math.random()` (which changed on every render, breaking label association) to `useId`.
- Extracted `src/lib/useFocusTrap.ts` and pointed both the nav drawer and the product lightbox at it. The lightbox previously had no trap, no scroll lock, and no focus restore. The hook also fixes a latent bug in the original drawer effect that stole focus to the hamburger on first mount.
- The lightbox zoom trigger was an `<img onClick>` — unreachable by keyboard. It's now a real `<button>`.
- Desktop dropdown Escape moved from the panel to the document, so it works when focus is still on the trigger.
- Added `ScrollToTop`: scroll reset + focus to `#main-content` on navigation, respecting `prefers-reduced-motion` and leaving hash links alone.
- Touch targets: `Button` `sm` 40→44px; filter chips 28→44px; drawer nav links 28/40→44px; gallery arrows 40→44px; file-remove 16→44px; breadcrumb and footer links given real hit areas via `min-h-11` with negative margins so spacing is unchanged. Found and fixed a **`flex-1` inside `flex-col`** bug in `ProductCard` and `Projects` where flex-basis overrode `h-11` and collapsed CTAs to 16–20px.
- Ghost-card resolved: `Card` is now border-only at rest, firming border + lift on hover. `--shadow-card` retuned from a 28px blur to a tight 2-layer shadow so the ~49 hand-rolled `border + shadow-card` pairs stop reading as two competing elevation cues. `--shadow-floating` reduced 50px→24px and reserved for true overlays.
- Triple-nested card in the quote form flattened via a `highlighted` prop on `FileUpload` (the previous attempt would have put the ring on the invisible file input).
- `Products.tsx` h1→h3 skip closed with an `sr-only` h2.
- `FormControls` migrated off 33 raw palette classes onto tokens.
- `PageCTA` rewritten to take copy, quote href, analytics, and optional call/WhatsApp/secondary actions; all six hand-rolled CTA blocks now use it (~200 lines removed). Per-page WhatsApp prefill messages were preserved via a `whatsappUrl` prop rather than being flattened to the generic one.
- Fonts moved out of the render-blocking CSS `@import` into `<link>` with `preconnect`; 9 weights trimmed to 7 (Poppins 400/500 were never used). `font-black` on the 404 changed to `font-extrabold` since Poppins 900 isn't loaded and was rendering as a synthesized faux-weight.
- Route code-splitting: main bundle **447.8 KB → 315.7 KB** (gzip 122.7 → 96.7). Home and Products stay eager as the common entry points.

**Deliberately not changed**
- **Hero decoration and font pairing** — ruled out of scope as identity decisions. The 5 glow orbs, dot-grid backgrounds, and Inter+Poppins all remain; they are still the site's most recognizable AI tells and are still worth revisiting.
- **The six hand-rolled page heroes.** These were *not* migrated to `PageHeroShell`. That component is a compact single-column header, while the hand-rolled heroes are two-column with imagery and CTA buttons — forcing them together would have deleted content. Consolidating them needs a second `PageHeroSplit` component, which is a real refactor rather than a cleanup.
- **Desktop nav links at 36px.** WCAG 2.5.8 (AA) requires 24px; 44px is the AAA touch figure and these are mouse targets. Inflating them would distort the header.
- **The logo wordmark at 3.02:1.** WCAG 1.4.3 exempts logotypes.
- All P2/P3 items, which remain as listed above.
