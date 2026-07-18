# Maa Vindhawasini Enterprises — Website Foundation & Layout Shells

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
    icons/          # Custom SVG icons: general interface icons, product-specific symbols
    documents/      # Storable PDFs/MSME certifications (to be uploaded)
  components/       # Reusable layout and UI elements
    ui/             # Reusable UI primitives (Container, Button, Card, Inputs, Badges, etc.)
    layout/         # SiteLayout, SiteHeader, Footer, SEO, PageHeroShell, PageCTA, PageLayoutElements
    navigation/     # DesktopNavigation and MobileNavigation drawer menu
  data/             # Strictly-typed static configuration datasets (products, contact, navigation, company)
  lib/              # Static helper functions, class mergers, and SEO schema builders (assets static map)
  pages/            # View pages (Home, About, Products, Product Detail, RFQ Quote, etc.)
  routes/           # Router configuration mapping paths to views
  styles/           # Design system CSS variables and Tailwind directives
  types/ # Shared TypeScript type definitions
```

---

## 2. Global Layout & Structural Shells

We use a modular layout shell system under `src/components/layout/` to structure pages uniformly:

- **`<SiteLayout>`**: The main global container wrapping every page. It renders the `<SiteHeader />` at the top, the page content inside `<PageMain>`, the `<MobileStickyActionBar />` at the bottom, and the `<Footer />`. It also includes the skip-to-content accessibility link targeting `#main-content`.
- **`<PageMain>`**: The semantic container with responsive bottom padding designed to offset the mobile sticky contact bar so buttons don't block standard footer links.
- **`<PageHeroShell>`**: Displays the top page title banner with a high-contrast dark overlay screen over background images, ensuring WCAG-compliant readability (> 4.5:1 ratio).
- **`<PageCTA>`**: Standard bottom-of-page block urging users to call, chat, or submit an RFQ quote.
- **`<ContentContainer>`**: Enforces a centered card container for legal subpages (like Privacy, Terms, and Disclaimer).

---

## 3. Navigation & Dropdown Configurations

Site menus are driven dynamically from static configurations:

### Updating Header/Drawer Links:
Edit [src/data/navigation.ts](file:///Users/mukeshkumar/Developer/ideas/mve/src/data/navigation.ts). The structure accepts links, CTAs, and children submenus:
```typescript
export const navigationData: NavigationItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Products',
    href: '/products',
    children: [
      { name: 'New Product', href: '/products/new-product' }
    ]
  },
  { name: 'Request a Quote', href: '/request-a-quote', isCta: true }
];
```

### Products Dropdown Behavior (Accessibility):
- Displays subproducts.
- **Mouse**: Opens on click. Closes on click outside or on selecting a link.
- **Keyboard**: Pressing `Space` or `Enter` toggles the menu. Pressing `Escape` closes the menu and returns focus to the trigger button. Focus flows sequentially between list items.

---

## 4. Mobile Sticky Action Bar Visibility Rules

The `<MobileStickyActionBar>` provides Call, WhatsApp, and Quote triggers at mobile breakpoints.

### Prefilled WhatsApp Text:
Opening WhatsApp starts a pre-filled query text:
*“Hello Maa Vindhawasini Enterprises, I would like to discuss an industrial fabrication requirement.”*

### Hiding the Bar on Specific Routes:
To prevent duplicate CTAs on pages that already provide primary contact forms, the bar is hidden dynamically. Configure routes to hide by adding them to the `HIDDEN_ROUTES` array in [src/components/layout/MobileStickyActionBar.tsx](file:///Users/mukeshkumar/Developer/ideas/mve/src/components/layout/MobileStickyActionBar.tsx):
```typescript
const HIDDEN_ROUTES = ['/request-a-quote', '/contact'];
```
Any route pathname matching this list returns `null` and clears the bar from display.

---

## 5. Updating Company Contact Information

To update office addresses, factory locations, phone numbers, or WhatsApp triggers:
1. Open [src/data/contact.ts](file:///Users/mukeshkumar/Developer/ideas/mve/src/data/contact.ts).
2. Edit the corresponding fields in the `contactData` export:
   ```typescript
   export const contactData: ContactInfo = {
     phones: ['+91-XXXX-XXXXXX'], // Add verified corporate phone lines
     emails: ['info@mve.com'], // Add verified sales inbox
     whatsapp: '91XXXXXXXXXX', // Add WhatsApp number in international format (no + or -)
     whatsappMessageUrl: 'https://wa.me/91XXXXXXXXXX',
     officeAddress: '123 Verified Street, Patna, Bihar, India',
     factoryAddress: 'Industrial Zone, Patna, Bihar, India',
     mapEmbedUrl: 'https://www.google.com/maps/embed?...',
     businessHours: 'Monday - Saturday: 9:00 AM - 6:00 PM',
     serviceArea: 'Pan-India',
   };
   ```
3. Any field carrying `'pending verification'` will be automatically and safely hidden from rendering in the public footer, sticky actions, or pages.

---

## 6. Route Configurations & Adding Inner Pages

Routes are declared in [src/routes/index.tsx](file:///Users/mukeshkumar/Developer/ideas/mve/src/routes/index.tsx).

### To add a new page (e.g. Services page):
1. Create a page component in `src/pages/Services.tsx`:
   ```typescript
   import React from 'react';
   import { SiteLayout, PageHeroShell, PageCTA } from '../components/layout';

   export const Services: React.FC = () => (
     <SiteLayout>
       <PageHeroShell title="Our Services" description="Custom steel fabrication..." />
       {/* Services page content */}
       <PageCTA />
     </SiteLayout>
   );
   export default Services;
   ```
2. Open `src/routes/index.tsx` and import the component:
   ```typescript
   import { Services } from '../pages/Services';
   ```
3. Add the route inside the `<Routes>` structure:
   ```typescript
   <Route path="/services" element={<Services />} />
   ```
4. Update `src/data/navigation.ts` to include it in menu listings.
