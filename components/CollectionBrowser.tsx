"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { Category, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const PRICE_BANDS = [
  { id: "all", label: "Any price", min: 0, max: Infinity },
  { id: "under-2500", label: "Under ₹2,500", min: 0, max: 2499 },
  { id: "2500-4000", label: "₹2,500 – ₹4,000", min: 2500, max: 4000 },
  { id: "over-4000", label: "₹4,000+", min: 4001, max: Infinity },
] as const;

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "New in" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
] as const;

type SortId = (typeof SORTS)[number]["id"];
type PriceId = (typeof PRICE_BANDS)[number]["id"];

interface Props {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}

export default function CollectionBrowser({ products, categories, initialCategory }: Props) {
  const [category, setCategory] = useState<string>(
    categories.some((c) => c.slug === initialCategory) ? initialCategory! : "all",
  );
  const [sizes, setSizes] = useState<string[]>([]);
  const [price, setPrice] = useState<PriceId>("all");
  const [sort, setSort] = useState<SortId>("featured");
  const [cols, setCols] = useState<2 | 3 | 4>(3);

  const activeCategory = categories.find((c) => c.slug === category);

  const selectCategory = (slug: string) => {
    setCategory(slug);
    const url = slug === "all" ? "/collection" : `/collection?category=${slug}`;
    window.history.replaceState(null, "", url);
  };

  const toggleSize = (s: string) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const results = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.id === price)!;
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (sizes.length === 0 || sizes.some((s) => p.sizes.includes(s))) &&
        p.price >= band.min &&
        p.price <= band.max,
    );
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        sorted.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
      default:
        sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return sorted;
  }, [products, category, sizes, price, sort]);

  const filtersActive = sizes.length > 0 || price !== "all";

  return (
    <>
      {/* Title block driven by the active category */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-10 md:px-8 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay">
          {activeCategory ? activeCategory.tagline : "The full collection"}
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-6xl font-light leading-none md:text-8xl">
            {activeCategory ? (
              <>
                <span className="italic">{activeCategory.name}</span> dresses
              </>
            ) : (
              <>
                Every <span className="italic text-plum">dress</span>
              </>
            )}
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            {activeCategory?.description ??
              "Sixteen silhouettes across six moods — from bias-cut satin to hand-block printed voile."}
          </p>
        </div>
      </section>

      {/* Category pills */}
      <div className="sticky top-[76px] z-30 border-y border-ink/10 bg-cream/90 backdrop-blur-md md:top-[84px]">
        <div className="scrollbar-none mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 md:px-8">
          {[{ slug: "all", name: "All" }, ...categories].map((c) => (
            <button
              key={c.slug}
              onClick={() => selectCategory(c.slug)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2 text-sm transition",
                category === c.slug
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 hover:border-ink/50",
              )}
            >
              {c.name}
              <span className="ml-1.5 text-[10px] opacity-60">
                {c.slug === "all" ? products.length : products.filter((p) => p.category === c.slug).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:px-8 lg:grid-cols-[220px_1fr]">
        {/* Filters */}
        <aside className="space-y-8 lg:sticky lg:top-44 lg:self-start">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Size</h3>
            <div className="mt-3 grid grid-cols-6 gap-2 lg:grid-cols-3">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={cn(
                    "rounded-lg border py-2 text-xs font-medium transition",
                    sizes.includes(s) ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink/50",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Price</h3>
            <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {PRICE_BANDS.map((b) => (
                <label key={b.id} className="flex cursor-pointer items-center gap-3 rounded-full py-1.5 text-sm">
                  <input
                    type="radio"
                    name="price"
                    checked={price === b.id}
                    onChange={() => setPrice(b.id)}
                    className="h-4 w-4 accent-clay"
                  />
                  {b.label}
                </label>
              ))}
            </div>
          </div>
          {filtersActive && (
            <button
              onClick={() => {
                setSizes([]);
                setPrice("all");
              }}
              className="text-xs underline underline-offset-4 hover:text-clay"
            >
              Clear filters
            </button>
          )}
        </aside>

        {/* Results */}
        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink/60">
              <span className="font-display text-2xl text-ink">{results.length}</span> styles
            </p>
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-1 rounded-full border border-ink/15 p-1 md:flex" role="group" aria-label="Grid density">
                {([2, 3, 4] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => setCols(n)}
                    aria-label={`${n} columns`}
                    className={cn("flex gap-0.5 rounded-full px-2.5 py-1.5", cols === n ? "bg-ink" : "hover:bg-ink/5")}
                  >
                    {Array.from({ length: n }).map((_, i) => (
                      <span key={i} className={cn("h-3 w-1 rounded-full", cols === n ? "bg-paper" : "bg-ink/40")} />
                    ))}
                  </button>
                ))}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="rounded-full border border-ink/15 bg-transparent px-4 py-2 text-sm outline-none focus:border-ink"
                aria-label="Sort by"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-ink/20 py-24 text-center">
              <p className="font-display text-3xl italic">Nothing quite fits — yet.</p>
              <p className="mt-2 text-sm text-ink/60">Try a different size or price range.</p>
            </div>
          ) : (
            <div
              className={cn(
                "grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-8",
                cols === 3 && "md:grid-cols-3",
                cols === 4 && "md:grid-cols-3 xl:grid-cols-4",
              )}
            >
              {results.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
