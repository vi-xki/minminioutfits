import type { Metadata } from "next";
import CollectionBrowser from "@/components/CollectionBrowser";
import { getCategories, getCategory, getProducts } from "@/lib/data";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category } = await searchParams;
  const c = category ? getCategory(category) : undefined;
  return {
    title: c ? `${c.name} Dresses` : "Shop all dresses",
    description: c?.description,
  };
}

export default async function CollectionPage({ searchParams }: Props) {
  const { category } = await searchParams;
  return (
    <CollectionBrowser
      key={category ?? "all"}
      products={getProducts()}
      categories={getCategories()}
      initialCategory={category}
    />
  );
}
