"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductBySlug } from "@/lib/data";

export interface BagItem {
  slug: string;
  color: string;
  size: string;
  qty: number;
}

interface BagContextValue {
  items: BagItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<BagItem, "qty">) => void;
  updateQty: (index: number, qty: number) => void;
  remove: (index: number) => void;
}

const BagContext = createContext<BagContextValue | null>(null);
const STORAGE_KEY = "minmini-bag";

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add = useCallback((item: Omit<BagItem, "qty">) => {
    setItems((prev) => {
      const i = prev.findIndex(
        (p) => p.slug === item.slug && p.color === item.color && p.size === item.size,
      );
      if (i === -1) return [...prev, { ...item, qty: 1 }];
      return prev.map((p, idx) => (idx === i ? { ...p, qty: p.qty + 1 } : p));
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((index: number, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((_, i) => i !== index) : prev.map((p, i) => (i === index ? { ...p, qty } : p)),
    );
  }, []);

  const remove = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const value = useMemo<BagContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + (getProductBySlug(i.slug)?.price ?? 0) * i.qty, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      updateQty,
      remove,
    };
  }, [items, isOpen, add, updateQty, remove]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used inside <BagProvider>");
  return ctx;
}
