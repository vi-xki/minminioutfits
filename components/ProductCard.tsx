import Link from "next/link";
import ProductVisual from "./ProductVisual";
import type { Product } from "@/lib/types";
import { formatPrice, tint } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [first, second] = product.colors;
  const alt = second ?? first;

  return (
    <Link href={`/collection/${product.slug}`} className="group block">
      <div className="relative">
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-t-full transition-[border-radius] duration-700 ease-out group-hover:rounded-t-[40%]"
          style={{ background: `linear-gradient(180deg, ${tint(first.hex, 0.82)} 0%, ${tint(first.hex, 0.6)} 100%)` }}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `linear-gradient(180deg, ${tint(alt.hex, 0.82)} 0%, ${tint(alt.hex, 0.6)} 100%)` }}
          />
          <div className="absolute inset-x-0 bottom-0 top-[10%] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03]">
            <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
              <ProductVisual product={product} color={first} className="h-full w-full" />
            </div>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <ProductVisual product={product} color={alt} className="h-full w-full" />
            </div>
          </div>

          {(product.isNew || product.compareAtPrice) && (
            <span className="absolute bottom-4 right-4 rounded-full bg-paper/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
              {product.compareAtPrice ? "Sale" : "New"}
            </span>
          )}
        </div>

        {typeof index === "number" && (
          <span className="pointer-events-none absolute -left-2 bottom-3 font-display text-5xl italic leading-none text-ink/15 md:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg leading-tight text-ink group-hover:italic">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.hex}
                title={c.name}
                className="h-3 w-3 rounded-full ring-1 ring-ink/15"
                style={{ background: c.hex }}
              />
            ))}
            <span className="ml-1 hidden text-xs text-ink/50 sm:inline">{product.colors.length} colours</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-ink">{formatPrice(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-xs text-ink/40 line-through">{formatPrice(product.compareAtPrice)}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
