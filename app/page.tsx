import Link from "next/link";
import DressArt from "@/components/DressArt";
import Marquee from "@/components/Marquee";
import ScrollDrift from "@/components/ScrollDrift";
import ProductCard from "@/components/ProductCard";
import ProductVisual from "@/components/ProductVisual";
import {
  countByCategory,
  getBestsellers,
  getCategories,
  getFeatured,
  getProductsBySlugs,
  site,
} from "@/lib/data";
import { formatPrice, tint } from "@/lib/utils";

export default function HomePage() {
  const { hero, edit, lookbook } = site;
  const heroProducts = getProductsBySlugs(hero.featuredSlugs);
  const lookbookProducts = getProductsBySlugs(lookbook.slugs);
  const featured = getFeatured().slice(0, 4);
  const bestsellers = getBestsellers();
  const categories = getCategories();

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-8 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-14">
        <div className="relative z-10 flex flex-col justify-center">
          <p className="animate-rise flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-clay">
            <span className="h-px w-10 bg-clay" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[clamp(3.4rem,9vw,7.5rem)] font-light leading-[0.9] tracking-tight">
            {hero.title.map((line, i) => (
              <ScrollDrift key={line.text} amount={i % 2 ? -36 : 28}>
                <span
                  className={`animate-rise block ${line.italic ? "pl-[12%] italic text-plum" : ""}`}
                  style={{ animationDelay: `${120 + i * 120}ms` }}
                >
                  {line.text}
                </span>
              </ScrollDrift>
            ))}
          </h1>
          <p className="animate-rise mt-8 max-w-md text-base leading-relaxed text-ink/70 [animation-delay:500ms]">
            {hero.body}
          </p>
          <div className="animate-rise mt-10 flex flex-wrap items-center gap-4 [animation-delay:620ms]">
            <Link
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-4 pl-7 pr-4 text-sm font-semibold text-paper transition hover:bg-plum"
            >
              {hero.primaryCta.label}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-paper text-ink transition-transform group-hover:rotate-[-45deg]">
                →
              </span>
            </Link>
            <Link href={hero.secondaryCta.href} className="link-underline text-sm font-semibold">
              {hero.secondaryCta.label}
            </Link>
          </div>
          <dl className="animate-rise mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6 [animation-delay:740ms]">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-ink/55">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Arch trio */}
        <div className="relative h-[520px] sm:h-[600px] lg:h-[660px]">
          {heroProducts.map((p, i) => {
            const layout = [
              "left-0 top-16 h-[62%] w-[42%] -rotate-3",
              "left-[29%] top-0 z-10 h-[86%] w-[46%]",
              "right-0 top-28 h-[60%] w-[38%] rotate-3",
            ][i];
            return (
              <Link
                key={p.slug}
                href={`/collection/${p.slug}`}
                className={`animate-rise group absolute ${layout} overflow-hidden rounded-t-full border-[6px] border-paper shadow-[0_30px_60px_-20px_rgba(31,26,36,0.35)] transition-transform duration-700 hover:-translate-y-3`}
                style={{
                  background: `linear-gradient(180deg, ${tint(p.colors[0].hex, 0.8)}, ${tint(p.colors[0].hex, 0.55)})`,
                  animationDelay: `${300 + i * 150}ms`,
                }}
              >
                <div className="absolute inset-x-[6%] bottom-0 top-[12%]">
                  <ProductVisual product={p} className="h-full w-full" priority />
                </div>
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 px-4 py-3 text-center text-xs text-paper transition-transform duration-500 group-hover:translate-y-0">
                  {p.name} — {formatPrice(p.price)}
                </span>
              </Link>
            );
          })}

          {/* rotating badge */}
          <div className="absolute bottom-6 left-[18%] z-20 grid h-32 w-32 place-items-center rounded-full bg-clay text-paper shadow-xl sm:h-36 sm:w-36">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
              <defs>
                <path id="badge-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
              </defs>
              <text fill="currentColor" fontSize="8.4" letterSpacing="2.2" className="uppercase">
                <textPath href="#badge-circle">{hero.badge} {hero.badge}</textPath>
              </text>
            </svg>
            <span className="font-display text-3xl italic">mm</span>
          </div>

          <p className="absolute -right-2 top-1/2 hidden origin-center -translate-y-1/2 rotate-90 text-[10px] font-semibold uppercase tracking-[0.5em] text-ink/40 xl:block">
            {site.brand.season}
          </p>
        </div>
      </section>

      {/* ───────────── Marquee ───────────── */}
      <div className="overflow-hidden border-y border-ink/10 py-6">
        <ScrollDrift amount={-120} className="-mx-40">
          <Marquee items={site.marquee} itemClassName="font-display text-4xl italic md:text-6xl" />
        </ScrollDrift>
      </div>

      {/* ───────────── Shop by mood ───────────── */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl leading-none md:text-6xl">
            <ScrollDrift amount={40}>Shop by <span className="italic text-clay">mood</span></ScrollDrift>
          </h2>
          <p className="max-w-sm text-sm text-ink/60">
            Six moods, one wardrobe. Pick the feeling first — the dress follows.
          </p>
        </div>

        <div className="scrollbar-none -mx-5 mt-12 flex snap-x scroll-px-5 gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-6">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              href={`/collection?category=${c.slug}`}
              className={`group w-44 shrink-0 snap-start md:w-auto ${i % 2 === 1 ? "lg:mt-12" : ""}`}
            >
              <div
                className="relative aspect-[3/4.4] overflow-hidden rounded-t-full transition-all duration-500 group-hover:rounded-t-[30%]"
                style={{ background: tint(c.color, 0.78) }}
              >
                <span className="absolute left-1/2 top-[9%] -translate-x-1/2 font-display text-sm italic text-ink/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-x-[8%] bottom-0 top-[18%] transition-transform duration-500 group-hover:scale-105">
                  <DressArt silhouette={c.silhouette} pattern={c.pattern} color={c.color} className="h-full w-full" />
                </div>
              </div>
              <h3 className="mt-4 font-display text-2xl group-hover:italic">{c.name}</h3>
              <p className="text-xs text-ink/55">
                {c.tagline} · {countByCategory(c.slug)} styles
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── The Edit ───────────── */}
      <section className="bg-sand/60 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2.4fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay">{edit.eyebrow}</p>
              <h2 className="mt-4 font-display text-5xl leading-[0.95]"><ScrollDrift amount={-24}>{edit.title}</ScrollDrift></h2>
              <p className="mt-6 text-sm leading-relaxed text-ink/65">{edit.body}</p>
              <Link href={edit.cta.href} className="link-underline mt-8 inline-block text-sm font-semibold">
                {edit.cta.label} →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-14 md:gap-x-8">
              {featured.map((p, i) => (
                <div key={p.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Lookbook ───────────── */}
      <section id="lookbook" className="relative overflow-hidden bg-plum text-paper">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blush">{lookbook.eyebrow}</p>
            <h2 className="mt-4 font-display text-6xl font-light italic md:text-8xl"><ScrollDrift amount={60}>{lookbook.title}</ScrollDrift></h2>
            <blockquote className="mt-10 border-l-2 border-blush/60 pl-6 font-display text-2xl leading-snug text-paper/90">
              “{lookbook.quote}”
            </blockquote>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-paper/65">{lookbook.body}</p>
            <Link
              href={lookbook.cta.href}
              className="mt-10 inline-flex rounded-full border border-paper/40 px-7 py-4 text-sm font-semibold transition hover:bg-paper hover:text-plum"
            >
              {lookbook.cta.label}
            </Link>
          </div>

          <div className="relative grid grid-cols-3 items-end gap-3 md:gap-5">
            {lookbookProducts.map((p, i) => (
              <Link
                key={p.slug}
                href={`/collection/${p.slug}`}
                className={`group relative block overflow-hidden rounded-full ${["aspect-[1/2.4]", "aspect-[1/3]", "aspect-[1/2.2]"][i]}`}
                style={{ background: `linear-gradient(180deg, ${tint(p.colors[0].hex, 0.35)}, ${p.colors[0].hex})` }}
              >
                <div className="absolute inset-x-0 bottom-[6%] top-[10%] transition-transform duration-700 group-hover:scale-110">
                  <ProductVisual product={p} color={p.colors[p.colors.length > 1 ? 1 : 0]} className="h-full w-full" />
                </div>
                <span className="absolute inset-x-0 bottom-4 text-center text-[10px] uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100">
                  {p.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <p
          aria-hidden
          className="pointer-events-none absolute -bottom-8 right-0 select-none font-display text-[18vw] italic leading-none text-paper/[0.05]"
        >
          ch.07
        </p>
      </section>

      {/* ───────────── Bestsellers ───────────── */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-5xl leading-none md:text-6xl">
            <ScrollDrift amount={-40}>Most <span className="italic text-plum">loved</span></ScrollDrift>
          </h2>
          <Link href="/collection" className="link-underline shrink-0 text-sm font-semibold">
            View all →
          </Link>
        </div>
        <div className="scrollbar-none -mx-5 mt-12 flex snap-x scroll-px-5 gap-6 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0">
          {bestsellers.map((p) => (
            <div key={p.slug} className="w-64 shrink-0 snap-start md:w-72">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Values ───────────── */}
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid divide-y divide-ink/10 border-y border-ink/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {site.values.map((v, i) => (
            <div key={v.title} className="px-2 py-10 md:px-8">
              <p className="font-display text-sm italic text-clay">({String(i + 1).padStart(2, "0")})</p>
              <h3 className="mt-3 font-display text-3xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Testimonials ───────────── */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <h2 className="text-center font-display text-5xl md:text-6xl">
          <ScrollDrift amount={36}>Notes from the <span className="italic text-clay">fitting room</span></ScrollDrift>
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {site.testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`flex flex-col rounded-[2rem] p-8 ${["bg-blush/50", "bg-sage/40", "bg-sand"][i % 3]} ${i === 1 ? "md:-translate-y-6" : ""}`}
            >
              <span className="font-display text-6xl leading-none text-ink/20">“</span>
              <blockquote className="mt-2 flex-1 font-display text-xl leading-snug">{t.quote}</blockquote>
              <figcaption className="mt-8 flex items-center justify-between border-t border-ink/10 pt-4 text-xs">
                <span>
                  <strong className="font-semibold">{t.name}</strong>
                  <span className="text-ink/55"> · {t.city}</span>
                </span>
                <span className="italic text-ink/55">{t.product}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ───────────── Newsletter ───────────── */}
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-t-[200px] bg-clay px-6 py-20 text-center text-paper md:rounded-t-[400px]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-paper/70">{site.newsletter.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-5xl italic md:text-6xl"><ScrollDrift amount={-30}>{site.newsletter.title}</ScrollDrift></h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-paper/80">{site.newsletter.body}</p>
          <form className="mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full bg-paper p-1.5">
            <input
              type="email"
              required
              placeholder={site.newsletter.placeholder}
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent px-5 text-sm text-ink outline-none placeholder:text-ink/40"
            />
            <button className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-plum">
              {site.newsletter.cta}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
