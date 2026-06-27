"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const MAX_COMPARE = 3;

interface CompareContextValue {
  items: string[];
  isComparing: (id: string) => boolean;
  toggleCompare: (id: string) => { added: boolean; full: boolean };
  remove: (id: string) => void;
  clear: () => void;
  max: number;
  count: number;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  const isComparing = useCallback(
    (id: string) => items.includes(id),
    [items],
  );

  const toggleCompare = useCallback(
    (id: string) => {
      if (items.includes(id)) {
        setItems((prev) => prev.filter((i) => i !== id));
        return { added: false, full: false };
      }
      if (items.length >= MAX_COMPARE) {
        return { added: false, full: true };
      }
      setItems((prev) => [...prev, id]);
      return { added: true, full: false };
    },
    [items],
  );

  const remove = useCallback(
    (id: string) => setItems((prev) => prev.filter((i) => i !== id)),
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CompareContextValue>(
    () => ({
      items,
      isComparing,
      toggleCompare,
      remove,
      clear,
      max: MAX_COMPARE,
      count: items.length,
    }),
    [items, isComparing, toggleCompare, remove, clear],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx)
    throw new Error("useCompare deve ser usado dentro de CompareProvider");
  return ctx;
}
