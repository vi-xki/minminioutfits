export type Silhouette =
  | "slip"
  | "aline"
  | "mini"
  | "maxi"
  | "wrap"
  | "gown"
  | "anarkali"
  | "kurta"
  | "coord";

export type Pattern = "solid" | "floral" | "stripe" | "dots" | "check";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  silhouette: Silhouette;
  pattern: Pattern;
  colors: ColorOption[];
  sizes: string[];
  fabric: string;
  fit: string;
  length: string;
  care: string;
  description: string;
  details: string[];
  rating: number;
  reviews: number;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  /** Optional photo URL — when set it replaces the illustrated dress. */
  image?: string;
}

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  pattern: Pattern;
  silhouette: Silhouette;
}

export interface Link {
  label: string;
  href: string;
}

export interface SiteContent {
  brand: { name: string; fullName: string; tagline: string; season: string };
  announcement: string[];
  nav: Link[];
  hero: {
    eyebrow: string;
    title: { text: string; italic?: boolean }[];
    body: string;
    primaryCta: Link;
    secondaryCta: Link;
    stats: { value: string; label: string }[];
    featuredSlugs: string[];
    badge: string;
  };
  marquee: string[];
  edit: { eyebrow: string; title: string; body: string; cta: Link };
  lookbook: {
    eyebrow: string;
    title: string;
    quote: string;
    body: string;
    slugs: string[];
    cta: Link;
  };
  values: { title: string; body: string }[];
  testimonials: { name: string; city: string; quote: string; product: string }[];
  newsletter: { eyebrow: string; title: string; body: string; placeholder: string; cta: string };
  footer: { columns: { title: string; links: Link[] }[]; note: string };
}
