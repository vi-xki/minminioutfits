"use client";

import { useState } from "react";
import Link from "next/link";
import ProductVisual from "./ProductVisual";
import { useBag } from "./BagProvider";
import type { Category, Product } from "@/lib/types";
import { cn, formatPrice, tint } from "@/lib/utils";

interface Props {
  product: Product;
  category?: Category;
}

export default function ProductView({ product, category }: Props) {
  const { add } = useBag();
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>("details");

  const color = product.colors[colorIndex];

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    add({ slug: product.slug, color: color.name, size });
  };

  const panels = [
    { id: "details", title: "The details", body: <ul className="list-disc space-y-1 pl-5">{product.details.map((d) => <li key={d}>{d}</li>)}</ul> },
    { id: "fabric", title: "Fabric & fit", body: <p>{product.fabric}. {product.fit}. {product.length}.</p> },
    { id: "care", title: "Care", body: <p>{product.care}.</p> },
    { id: "shipping", title: "Shipping & exchanges", body: <p>Dispatched within 48 hours. Free shipping over ₹2,999. Easy exchanges within 15 days of delivery.</p> },
  ];

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-6 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      {/* Gallery */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-t-full transition-colors duration-700"
          style={{ background: `radial-gradient(120% 80% at 50% 20%, ${tint(color.hex, 0.88)}, ${tint(color.hex, 0.55)})` }}
        >
          <div key={color.hex} className="animate-rise absolute inset-x-[12%] bottom-0 top-[8%]">
            <ProductVisual product={product} color={color} className="h-full w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.12)]" priority sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <p className="absolute bottom-6 left-6 font-display text-sm italic text-ink/50">{color.name}</p>
          <p className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.3em] text-ink/40">{product.id}</p>
        </div>
        <div className="mt-4 flex gap-3">
          {product.colors.map((c, i) => (
            <button
              key={c.hex}
              onClick={() => setColorIndex(i)}
              aria-label={`View ${c.name}`}
              className={cn(
                "relative aspect-[3/4] w-20 overflow-hidden rounded-t-full border-2 transition",
                i === colorIndex ? "border-ink" : "border-transparent opacity-70 hover:opacity-100",
              )}
              style={{ background: tint(c.hex, 0.75) }}
            >
              <div className="absolute inset-x-1 bottom-0 top-2">
                <ProductVisual product={product} color={c} className="h-full w-full" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <nav className="text-xs text-ink/50" aria-label="Breadcrumb">
          <Link href="/collection" className="hover:text-ink">Collection</Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/collection?category=${category.slug}`} className="hover:text-ink">{category.name}</Link>
            </>
          )}
        </nav>

        <div className="mt-4 flex items-center gap-2">
          {product.isNew && <span className="rounded-full bg-sage/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">New in</span>}
          {product.bestseller && <span className="rounded-full bg-blush/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">Bestseller</span>}
        </div>

        <h1 className="mt-4 font-display text-5xl font-light leading-[0.95] md:text-6xl">{product.name}</h1>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className="tracking-widest text-clay" aria-hidden>
            {"★★★★★".slice(0, Math.round(product.rating))}
            <span className="text-ink/20">{"★★★★★".slice(Math.round(product.rating))}</span>
          </span>
          <span className="text-ink/60">
            {product.rating} · {product.reviews} reviews
          </span>
        </div>

        <div className="mt-6 flex items-baseline gap-3">
          <span className="font-display text-4xl">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <>
              <span className="text-lg text-ink/40 line-through">{formatPrice(product.compareAtPrice)}</span>
              <span className="rounded-full bg-clay px-2.5 py-0.5 text-xs font-semibold text-paper">
                −{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            </>
          )}
        </div>
        <p className="mt-1 text-xs text-ink/50">Inclusive of all taxes</p>

        <p className="mt-8 max-w-lg text-base leading-relaxed text-ink/75">{product.description}</p>

        {/* Colour */}
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
            Colour — <span className="normal-case tracking-normal text-ink">{color.name}</span>
          </p>
          <div className="mt-3 flex gap-3">
            {product.colors.map((c, i) => (
              <button
                key={c.hex}
                onClick={() => setColorIndex(i)}
                aria-label={c.name}
                aria-pressed={i === colorIndex}
                className={cn("h-10 w-10 rounded-full ring-offset-2 ring-offset-cream transition", i === colorIndex ? "ring-2 ring-ink" : "ring-1 ring-ink/15 hover:ring-ink/40")}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className={cn("text-xs font-semibold uppercase tracking-[0.3em]", sizeError ? "text-clay" : "text-ink/50")}>
              {sizeError ? "Please pick a size" : "Size"}
            </p>
            <span className="text-xs text-ink/50 underline underline-offset-4">Size guide</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  setSizeError(false);
                }}
                className={cn(
                  "h-12 min-w-14 rounded-full border px-4 text-sm font-medium transition",
                  size === s ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink",
                  sizeError && "border-clay/60",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="group mt-8 flex w-full items-center justify-between rounded-full bg-ink py-2 pl-8 pr-2 text-paper transition hover:bg-plum"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">Add to bag</span>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-ink transition-transform group-hover:rotate-90">+</span>
        </button>
        <p className="mt-3 text-center text-xs text-ink/50">Free shipping over ₹2,999 · 15-day exchanges</p>

        {/* Accordion */}
        <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {panels.map((panel) => {
            const open = openPanel === panel.id;
            return (
              <div key={panel.id}>
                <button
                  onClick={() => setOpenPanel(open ? null : panel.id)}
                  className="flex w-full items-center justify-between py-5 text-left font-display text-xl"
                  aria-expanded={open}
                >
                  {panel.title}
                  <span className={cn("text-2xl font-light transition-transform", open && "rotate-45")}>+</span>
                </button>
                <div className={cn("grid transition-[grid-template-rows] duration-500", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="pb-6 text-sm leading-relaxed text-ink/70">{panel.body}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
