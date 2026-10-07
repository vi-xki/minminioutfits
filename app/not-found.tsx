import Link from "next/link";
import DressArt from "@/components/DressArt";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center">
      <div className="h-64 w-44 overflow-hidden rounded-t-full bg-sand">
        <DressArt silhouette="slip" color="#ecc5c0" className="h-full w-full" />
      </div>
      <h1 className="mt-10 font-display text-6xl italic">Lost in the wardrobe</h1>
      <p className="mt-4 text-ink/60">This page has slipped off its hanger. Let&apos;s get you back to the rail.</p>
      <Link href="/collection" className="mt-8 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-paper hover:bg-plum">
        Shop the collection
      </Link>
    </section>
  );
}
