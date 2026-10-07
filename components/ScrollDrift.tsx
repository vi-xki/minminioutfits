"use client";

import { useEffect, useRef } from "react";

interface ScrollDriftProps {
  children: React.ReactNode;
  /** Max horizontal shift in px. Negative values drift the other way. */
  amount?: number;
  className?: string;
}

/**
 * Slides its content gently left/right as the element moves through the viewport.
 * Scrolling down drifts one way, scrolling back up returns it.
 */
export default function ScrollDrift({ children, amount = 40, className }: ScrollDriftProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the element is entering from below, +1 when leaving at the top.
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      el.style.transform = `translate3d(${(clamped * amount).toFixed(1)}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Only listen while the element is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
      } else {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [amount]);

  return (
    <span ref={ref} className={`block will-change-transform ${className ?? ""}`}>
      {children}
    </span>
  );
}
