# minmini-collection

**MinMini Outfits** — a women's dress collection storefront built with Next.js (App Router), Tailwind CSS v4 and TypeScript. All content is driven by JSON files.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Editorial home page: hero arches, mood categories, the edit, lookbook, bestsellers, testimonials, newsletter |
| `/collection` | All dresses with category pills, size and price filters, sorting and grid density (`?category=evening` deep-links) |
| `/collection/[slug]` | Product page with colour switcher, size picker, add to bag and "complete the look" (statically generated) |

The shopping bag is a slide-out drawer, saved to `localStorage`.

## Editing content (JSON)

All content lives in [`data/`](data):

- **`products.json`**: every dress (name, price, `compareAtPrice`, colours, sizes, fabric, details, badges). Add an object here and it appears everywhere automatically, including its own page.
- **`categories.json`**: the six "moods" (maxi, midi, mini, evening, ethnic, co-ords).
- **`site.json`**: brand name, announcement bar, nav, hero copy, lookbook, testimonials, newsletter and footer.

Types for all three are in [`lib/types.ts`](lib/types.ts).

### Product visuals

Products render as illustrated dresses ([`components/DressArt.tsx`](components/DressArt.tsx)), drawn from:

- `silhouette`: `slip | aline | mini | maxi | wrap | gown | anarkali | kurta | coord`
- `pattern`: `solid | floral | stripe | dots | check`
- each colour's `hex`

To use real photos, add `"image": "https://images.unsplash.com/..."` to a product. It then replaces the illustration. Allow other image hosts in `next.config.ts`.

## Design system

Tokens are defined in [`app/globals.css`](app/globals.css) (`@theme`): cream, paper, ink, plum, blush, clay, sage and sand. Fonts are Fraunces (display) and Manrope (body).
