# Maa Vindhawasini Enterprises — Website Foundation

This repository contains the frontend technical foundation, design system implementation, and page layout architecture for the **Maa Vindhawasini Enterprises (MVE)** static website.

The site is configured as a fully static, fast, responsive, and search-optimized lead-generation and catalog application.

---

## 1. Project Architecture & Folders

The project codebase follows a clean, modular structure:

```text
src/
  app/              # Core application entry providers (SEO, Routing setup)
  assets/           # Raster images, SVGs, and compliance documents
    images/         # Organized subfolders: branding, hero, products, facilities, quality, projects
    icons/          # Custom SVG icons: general/ interface icons, product-specific symbols
    documents/      # Storable PDFs/MSME certifications (to be uploaded)
  components/       # Reusable layout and UI elements
    ui/             # Reusable UI primitives (Container, Button, Card, Inputs, Badges, etc.)
    layout/         # MainLayout, SiteHeader, Footer, SEO Meta, MobileStickyActionBar
    navigation/     # DesktopNavigation and MobileNavigation drawer menu
  data/             # Strictly-typed static configuration datasets (products, contact, navigation, company)
  lib/              # Static helper functions, class mergers, and SEO schema builders
  pages/            # View pages (Home, About, Products, Product Detail, RFQ Quote, etc.)
  routes/           # Router configuration mapping paths to views
  styles/           # Design system CSS variables and Tailwind directives
  types/            # Shared TypeScript type definitions
```

---

## 2. Design System & CSS Custom Properties

Visual tokens are configured first as CSS Custom Properties in `src/styles/index.css` and linked directly with Tailwind CSS v4's CSS-first theme configuration:

- **Primary Accent Orange**: `var(--color-primary)` (`#f26c21`) and hover `var(--color-primary-hover)` (`#d95513`).
- **Secondary Surfaces**: `var(--color-surface)` (`#ffffff`) and `var(--color-surface-muted)` (`#f8fafc`).
- **Brand Dark Navy**: `var(--brand-navy-950)` (`#0f172a`) and `var(--brand-navy-900)` (`#111827`) for structural sections, headers, and footers.
- **Typography Scale**: Headings use **Poppins**; Body text uses **Inter**. High-contrast, accessibility-vetted font scales are bound for desktop and mobile viewports.
- **Micro-Animations**: Cards scale up and raise shadow depth (`translateY(-3px)`) on hover over a `150-200ms` window. Buttons transition smoothly. Interactive links include sliding arrow animations.

To customize typography or colors, edit the variables under `:root` in `src/styles/index.css`. Tailwind automatically updates all utilities (`bg-primary`, `text-navy-950`, etc.).

---

## 3. Asset Management Workflow

All media files must be cataloged inside the central asset map in `src/lib/assets.ts` to avoid raw hardcoded strings scattered in components.

### How to Add a New Asset:
1. Place your new asset file (e.g. `reactor-tank.jpg`) in the corresponding folder under `src/assets/images/` or `src/assets/icons/`.
2. Import the file inside `src/lib/assets.ts`:
   ```typescript
   import reactorTank from '../assets/images/products/reactor-tank.jpg';
   ```
3. Expose the file in the exported `ASSETS` constant object:
   ```typescript
   export const ASSETS = {
     products: {
       reactorTank,
       // ...
     }
   } as const;
   ```
4. Reference it inside your components as `ASSETS.products.reactorTank`.

---

## 4. Static Data Architecture & Verified Claims

MVE business data is centralized in static TypeScript files inside `src/data/`:
- `company.ts`: Legal name, years of operation, and registry info.
- `contact.ts`: Official phones, support emails, addresses, and maps.
- `products.ts`: Spec sheets and descriptions for the 7 catalog items.

### client Verification Warnings:
> [!IMPORTANT]
> Unverified details (such as official registry numbers, specific mobile phone contacts, or credentials) are set to `'pending verification'`.
> The code is designed to check for this placeholder and **silently hide** these fields from the public UI. Do not modify this behavior until verified files/documents are approved.

---

## 5. Adding a New Product Page

The catalog products list is defined inside `src/data/products.ts`. Adding a new product is completely data-driven:

1. Open `src/data/products.ts`.
2. Add a new `Product` object structure to the `productsData` array:
   ```typescript
   {
     id: 'prod-8',
     name: 'New Product Name',
     slug: 'new-product-name',
     description: 'A detailed technical description...',
     image: ASSETS.products.newProductImage,
     categoryIcon: ASSETS.productIcons.newProductCategoryIcon,
     category: 'Custom Fabrications',
     specifications: {
       'Design Standard': 'ASME Sec VIII / IS 2825',
       'Material': 'SS316L',
     },
     features: [
       'Automatic temperature sensing checks',
       'Seismic vibration resistance columns',
     ],
     applications: [
       'High-temperature acid processing',
     ],
     gallery: [
       ASSETS.products.newProductImage,
     ],
     relatedProducts: ['storage-tank'],
   }
   ```
3. A detail route at `/products/new-product-name` will automatically be resolved.
4. Add the product links to the navigation dropdown in `src/data/navigation.ts` if it should appear in the primary header.

---

## 6. Development & Quality Verification

Run the following commands in the workspace root to check code health before commits:

- **Local Dev Server**: `npm run dev`
- **TypeScript Compilation**: `npm run typecheck`
- **Lint Check**: `npm run lint`
- **Production Build (HTML/CSS/JS)**: `npm run build`

> [!TIP]
> To preview the interactive design system, run `npm run dev` and navigate to `/design-system` in your browser. This route compiles only in local development builds and is excluded from the public footer.
