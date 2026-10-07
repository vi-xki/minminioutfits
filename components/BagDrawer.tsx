"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useBag } from "./BagProvider";
import DressArt from "./DressArt";
import { getProductBySlug } from "@/lib/data";
import { cn, formatPrice, tint } from "@/lib/utils";

const FREE_SHIPPING_AT = 2999;

export default function BagDrawer() {
  const { items, isOpen, close, subtotal, updateQty, remove, count } = useBag();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  return (
    <div className={cn("fixed inset-0 z-50", !isOpen && "pointer-events-none")} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={cn("absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-2xl">
            Your bag <span className="italic text-ink/40">({count})</span>
          </h2>
          <button onClick={close} className="rounded-full p-2 hover:bg-ink/5" aria-label="Close bag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="px-6 py-4">
          <p className="text-xs text-ink/70">
            {remaining > 0 ? (
              <>
                You&apos;re <strong>{formatPrice(remaining)}</strong> away from free shipping
              </>
            ) : (
              <>You&apos;ve unlocked <strong>free shipping</strong> ✦</>
            )}
          </p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full rounded-full bg-clay transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <ul className="flex-1 space-y-5 overflow-y-auto px-6 py-2">
          {items.length === 0 && (
            <li className="flex flex-col items-center py-16 text-center">
              <DressArt silhouette="slip" color="#e7d9c4" className="h-40 w-28 opacity-70" />
              <p className="mt-4 font-display text-xl italic">Your bag is feeling light.</p>
              <Link href="/collection" onClick={close} className="mt-4 text-sm underline underline-offset-4">
                Browse the collection
              </Link>
            </li>
          )}
          {items.map((item, i) => {
            const product = getProductBySlug(item.slug);
            if (!product) return null;
            const color = product.colors.find((c) => c.name === item.color) ?? product.colors[0];
            return (
              <li key={`${item.slug}-${item.color}-${item.size}`} className="flex gap-4">
                <div className="h-28 w-20 shrink-0 overflow-hidden rounded-t-full" style={{ background: tint(color.hex, 0.75) }}>
                  <DressArt silhouette={product.silhouette} pattern={product.pattern} color={color.hex} hanger={false} className="h-full w-full" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link href={`/collection/${product.slug}`} onClick={close} className="font-display text-lg leading-tight hover:italic">
                      {product.name}
                    </Link>
                    <p className="text-sm font-semibold">{formatPrice(product.price * item.qty)}</p>
                  </div>
                  <p className="mt-1 text-xs text-ink/60">
                    {item.color} · Size {item.size}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-ink/15">
                      <button className="px-3 py-1" onClick={() => updateQty(i, item.qty - 1)} aria-label="Decrease quantity">−</button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button className="px-3 py-1" onClick={() => updateQty(i, item.qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                    <button onClick={() => remove(i)} className="text-xs text-ink/50 underline underline-offset-4 hover:text-clay">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {items.length > 0 && (
          <footer className="border-t border-ink/10 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm uppercase tracking-[0.2em] text-ink/60">Subtotal</span>
              <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-ink/50">Taxes included. Shipping calculated at checkout.</p>
            <button className="mt-4 w-full rounded-full bg-ink py-4 text-sm font-semibold uppercase tracking-[0.2em] text-paper transition hover:bg-plum">
              Checkout
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
