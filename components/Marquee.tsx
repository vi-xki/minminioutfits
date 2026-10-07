import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
  reverse?: boolean;
}

export default function Marquee({ items, className, itemClassName, separator = "✦", reverse }: MarqueeProps) {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((item) => (
        <span key={item} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
          {item}
          <span className="mx-6 text-[0.5em] opacity-60 md:mx-10">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className={cn("flex w-max animate-marquee", reverse && "[animation-direction:reverse]")}>
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
