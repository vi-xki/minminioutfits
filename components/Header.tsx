"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBag } from "./BagProvider";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Header() {
  const { count, open } = useBag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "bg-cream/85 shadow-[0_1px_0_rgba(31,26,36,0.08)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-4 md:px-8">
        <nav className="hidden items-center gap-6 lg:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="link-underline text-[13px] font-medium tracking-wide text-ink/80 hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="justify-self-start rounded-full p-2 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h10" />}
          </svg>
        </button>

        <Link href="/" className="group flex flex-col items-center leading-none">
          <span className="font-display text-3xl italic tracking-tight md:text-4xl">
            {site.brand.name}
            <span className="text-clay">.</span>
          </span>
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.45em] text-ink/50">Outfits</span>
        </Link>

        <div className="flex items-center justify-self-end gap-2">
          <Link href="/collection" className="hidden rounded-full p-2 hover:bg-ink/5 sm:block" aria-label="Search collection">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </Link>
          <button onClick={open} className="flex items-center gap-2 rounded-full border border-ink/15 py-2 pl-3 pr-2 text-[13px] font-medium hover:border-ink/40" aria-label="Open bag">
            Bag
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-ink px-1.5 text-[11px] text-paper">{count}</span>
          </button>
        </div>
      </div>

      <div className={cn("grid overflow-hidden transition-[grid-template-rows] duration-500 lg:hidden", menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <nav className="min-h-0">
          <ul className="space-y-1 border-t border-ink/10 bg-cream px-5 pb-6 pt-3">
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} className="flex items-baseline gap-4 py-2 font-display text-3xl">
                  <span className="font-sans text-xs text-ink/40">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
