# Maa Vindhawasini Enterprises — Design System

## 1. Purpose

This file documents the approved **modern industrial** website direction for Maa Vindhawasini Enterprises. The site is a static lead-generation and product-catalogue website for MS fabrication and industrial equipment manufacturing.

The asset pack contains:

- Source UI concept boards for all designed pages.
- Raster crops extracted from those boards.
- A reusable SVG line-icon set.
- Product, facility, fabrication, project, quality, and contact concept images.

> **Important:** the generated UI boards are visual concepts, not layered design source files. Extracted images are raster crops and may contain generative artifacts. They are suitable for prototyping and implementation references, but real factory/product photography and a properly vectorized logo are recommended for production.

## 2. Brand direction

### Personality

- Modern
- Industrial
- Reliable
- Precise
- Trustworthy
- Conversion-focused
- Clean rather than visually heavy

### Visual principles

1. Use generous whitespace and a controlled information density.
2. Pair clean white surfaces with dark navy/slate sections.
3. Use orange only for priority actions, active states, highlights, and small visual accents.
4. Use real industrial photography wherever possible.
5. Keep product and technical information easy to scan.
6. Avoid excessive gradients, decorative motion, fake claims, and unrelated stock imagery.

## 3. Design tokens

### Core colors

| Token | Value | Usage |
|---|---:|---|
| `--color-primary` | `#F26C21` | Main CTA, links, active navigation, highlights |
| `--color-primary-hover` | `#D95513` | Hover/pressed primary state |
| `--color-primary-soft` | `#FFF2EA` | Soft orange backgrounds and tags |
| `--color-navy-950` | `#0F172A` | Header, footer, dark sections |
| `--color-navy-900` | `#111827` | Secondary dark surface |
| `--color-slate-600` | `#475569` | Body text and secondary labels |
| `--color-slate-400` | `#94A3B8` | Muted text and inactive controls |
| `--color-border` | `#E2E8F0` | Borders and dividers |
| `--color-surface` | `#F8FAFC` | Page background and alternate sections |
| `--color-white` | `#FFFFFF` | Cards and primary content surface |
| `--color-success` | `#22C55E` | WhatsApp and confirmed/success states |
| `--color-error` | `#DC2626` | Form errors |

### CSS variables

```css
:root {
  --color-primary: #f26c21;
  --color-primary-hover: #d95513;
  --color-primary-soft: #fff2ea;
  --color-navy-950: #0f172a;
  --color-navy-900: #111827;
  --color-slate-600: #475569;
  --color-slate-400: #94a3b8;
  --color-border: #e2e8f0;
  --color-surface: #f8fafc;
  --color-white: #ffffff;
  --color-success: #22c55e;
  --color-error: #dc2626;
}
```

## 4. Typography

### Font families

- **Headings:** Poppins, fallback `Arial, sans-serif`
- **Body/UI:** Inter, fallback `Arial, sans-serif`

### Type scale

| Style | Desktop | Mobile | Weight |
|---|---:|---:|---:|
| Display / Hero | 56/64 | 38/46 | 700 |
| H1 | 48/58 | 34/42 | 700 |
| H2 | 36/44 | 28/36 | 600–700 |
| H3 | 24/32 | 21/29 | 600 |
| H4 | 18/26 | 17/24 | 600 |
| Body Large | 18/30 | 17/28 | 400 |
| Body | 16/26 | 16/25 | 400 |
| Small | 14/22 | 14/21 | 400–500 |
| Eyebrow | 12/18 | 12/18 | 600, uppercase |

Use short headings and avoid full-uppercase paragraphs. Orange can highlight one key phrase inside a headline, but it should not be used for the complete heading.

## 5. Layout and grid

### Breakpoints

```text
Mobile:   0–639px
Tablet:   640–1023px
Desktop:  1024–1439px
Wide:     1440px+
```

### Containers

- Maximum desktop content width: **1200px**
- Wide hero/media width: up to **1360px**
- Desktop horizontal padding: **32px**
- Tablet horizontal padding: **24px**
- Mobile horizontal padding: **16px**
- Desktop grid: **12 columns**, 24px gutter
- Mobile grid: **4 columns**, 16px gutter

### Spacing scale

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px
```

Typical section padding:

- Desktop: 72–96px vertical
- Tablet: 56–72px vertical
- Mobile: 40–56px vertical

## 6. Surfaces, radius, and shadows

| Token | Value |
|---|---|
| Small radius | 8px |
| Card radius | 12px |
| Large panel radius | 16px |
| Pill radius | 999px |
| Card border | 1px solid `#E2E8F0` |
| Card shadow | `0 8px 28px rgba(15, 23, 42, .08)` |
| Floating shadow | `0 16px 50px rgba(15, 23, 42, .14)` |

Avoid shadows on every element. Use them mainly for elevated cards, mobile menus, sticky headers, and modal/lightbox surfaces.

## 7. Core components

### Header

- White sticky header on the light modern theme.
- 72–80px desktop height; 64px mobile height.
- Active navigation item receives an orange underline.
- “Request a Quote” is the only solid orange navigation button.
- Mobile menu should open as a full-height drawer or sheet.

### Buttons

#### Primary

- Orange fill, white text.
- Minimum height: 48px desktop, 46px mobile.
- Horizontal padding: 22–26px.
- Icon appears after label where useful.

#### Secondary

- White or transparent background.
- Dark text and border.
- Orange border on hover.

#### WhatsApp

- Use success green only for WhatsApp-specific actions.
- Do not use green elsewhere in the brand system.

#### Text link

- Orange label with arrow-right icon.
- Underline or arrow movement on hover.

### Cards

Product and project cards should contain:

1. A consistent-ratio image.
2. Clear title.
3. One concise description or metadata group.
4. One primary action and, where needed, one secondary action.

Recommended image ratios:

- Product card: 4:3
- Project card: 16:9
- Hero: 16:7 or 16:8
- Gallery: 3:2

### Trust badges

Show only verified business facts. Suitable badges include:

- GST Registered
- Udyam/MSME Registered
- Factory Licensed
- Verified years of experience

Do not publish registration numbers or certificate claims until the client has approved them.

### Forms

- Labels remain visible above inputs.
- Input height: 48px.
- Textarea minimum height: 140px.
- Border: `#CBD5E1`; focused border: primary orange.
- Required fields use a small orange/red asterisk.
- Preserve entered data after submission errors.
- File upload should state allowed formats and maximum size.
- Quote form may use a two-column desktop layout but must become one column on mobile.

### Mobile sticky action bar

Recommended actions:

1. Call
2. WhatsApp
3. Request Quote

The quote action is orange and receives the largest visual weight. Ensure it does not overlap content or consent controls.

## 8. Icons

The included SVG icons use:

- 24×24 viewBox
- 1.8px stroke
- Rounded caps and joins
- `currentColor`, so color is controlled with CSS

Recommended sizes:

- Inline: 18–20px
- Buttons: 18–20px
- Feature cards: 24–28px
- Large trust or process icons: 32–40px

Do not mix filled and outline icon styles within the same section.

## 9. Photography and image direction

Preferred photography:

- Real factory exterior and workshop
- Real products from several angles
- Fabrication, welding, inspection, and finishing processes
- Completed projects on site
- Engineers and technicians using proper PPE

Image treatment:

- Natural steel and industrial colors
- Clean composition and realistic lighting
- Dark overlay on hero images when white text is placed on top
- Avoid heavily saturated stock photography
- Avoid generated company signage in production images

The images in this ZIP are extracted from concept boards. Replace them with original, licensed, or client-supplied high-resolution files for launch.

## 10. Page-level UI direction

### Home

- Modern split hero with headline and industrial visual.
- Trust strip immediately below hero.
- Short company introduction.
- Seven-product showcase.
- Custom fabrication highlight.
- Industries, process, selected projects, and final CTA.

### About

- Industrial hero.
- Company overview with real facility image.
- Timeline with verified milestones.
- Mission and values.
- Facility/capabilities gallery.
- Registration preview and quote CTA.

### Products

- Short hero and simple category chips.
- Seven product cards.
- Each card provides “View Details” and “Request Quote”.
- Do not add complex filtering until the catalogue grows.

### Product detail

- Product gallery and CTA area above the fold.
- Overview, features, applications, specifications, customization, quality process, gallery, and related products.
- Hide specification rows where data is unavailable.
- Product selection should be passed into the quote form via URL query or state.

### Custom Fabrication

- Welding/fabrication hero.
- Categories and customization capabilities.
- Six-step requirement-to-delivery process.
- Materials, fabrication processes, and quality checks.
- Project gallery and drawing-upload CTA.

### Projects

- Featured project first.
- Project cards with product, industry, location, and scope.
- Use real client/project names only with written approval.

### Quality & Certifications

- Explain the quality process rather than relying only on badges.
- Use material inspection, welding, dimensional checks, testing, and final inspection.
- Only verified registration/certificate files should be downloadable.

### Contact

- Phone, WhatsApp, email, and address cards.
- General enquiry form.
- Business hours and service area.
- Verified map location.

### Request a Quote

- Keep required fields minimal: name, phone, product/service, requirement.
- Additional technical fields remain optional.
- Provide file upload and alternative WhatsApp/call actions.
- Clearly explain what happens after submission.

## 11. Interaction and motion

- Card hover: translateY(-3px) and slightly increase shadow.
- Buttons: 150–200ms color and transform transition.
- Navigation dropdowns: 150ms fade/slide.
- Timeline/process: subtle reveal on scroll; avoid long sequential animations.
- Image gallery: lightbox with keyboard navigation and accessible close button.
- Respect `prefers-reduced-motion`.

## 12. Accessibility

- Target WCAG 2.2 AA.
- Minimum body text contrast: 4.5:1.
- All interactive controls must have visible keyboard focus.
- Minimum touch target: 44×44px.
- Provide meaningful alt text for products and projects.
- Forms require programmatic labels and descriptive error messages.
- Do not communicate status using color alone.
- Sticky mobile actions must not cover focused inputs.

## 13. Static-site implementation notes

- No CMS or admin panel is required.
- Store product/project content in local typed data files such as JSON or TypeScript objects.
- Forms can use a serverless function or a secure third-party form service.
- Keep secrets and mail API keys out of frontend code.
- Generate sitemap, robots.txt, metadata, and structured data during build.
- Use responsive image output such as WebP/AVIF and `srcset`.

## 14. Content and verification warning

Generated boards contain inconsistent placeholder information across pages, including phone numbers, addresses, dates, project counts, certificates, and business claims. Before implementation, use one verified content source and confirm:

- Exact legal and public brand spelling
- Final domain
- Official phone and email
- Factory and office addresses
- GST/Udyam/factory-license details
- Establishment year and experience claim
- Product specifications and project claims

Do not copy placeholder values directly from screenshots.