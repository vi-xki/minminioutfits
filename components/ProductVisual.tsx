import Image from "next/image";
import DressArt from "./DressArt";
import type { ColorOption, Product } from "@/lib/types";

interface ProductVisualProps {
  product: Product;
  color?: ColorOption;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Renders the product photo when one is set in JSON, otherwise the illustrated dress. */
export default function ProductVisual({
  product,
  color = product.colors[0],
  className,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority,
}: ProductVisualProps) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={`${product.name} in ${color.name}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }

  return (
    <DressArt
      silhouette={product.silhouette}
      pattern={product.pattern}
      color={color.hex}
      title={`${product.name} in ${color.name}`}
      className={className}
    />
  );
}
