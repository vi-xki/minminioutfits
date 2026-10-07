import Link from "next/link";
import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-10 pt-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-8">
        <div>
          <p className="font-display text-4xl italic">
            {site.brand.name}
            <span className="text-clay">.</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">{site.brand.tagline}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-paper/40">{site.brand.season}</p>
        </div>
        {site.footer.columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-paper/40">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-paper/80 hover:text-blush">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[22vw] italic leading-[0.8] text-paper/[0.06]"
      >
        {site.brand.name}
      </p>

      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t border-paper/10 px-5 py-6 text-xs text-paper/50 md:flex-row md:px-8">
        <p>
          © {new Date().getFullYear()} {site.brand.fullName}. All rights reserved.
        </p>
        <p>{site.footer.note}</p>
      </div>
    </footer>
  );
}
