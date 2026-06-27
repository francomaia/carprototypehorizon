"use client";

import { motion } from "framer-motion";
import type { Brand } from "@/types";
import { BrandIconPlaceholder } from "./BrandIconPlaceholder";
import { cn } from "@/lib/utils";

interface Props {
  brands: Brand[];
  active: string; // "all" ou brand.id
  onChange: (id: string) => void;
  counts: Record<string, number>;
  totalCount: number;
}

export function BrandTabs({
  brands,
  active,
  onChange,
  counts,
  totalCount,
}: Props) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      <TabButton
        active={active === "all"}
        onClick={() => onChange("all")}
        label="Todas as marcas"
        count={totalCount}
      />
      {brands.map((brand) => (
        <TabButton
          key={brand.id}
          active={active === brand.id}
          onClick={() => onChange(brand.id)}
          label={brand.name}
          count={counts[brand.id] ?? 0}
          icon={<BrandIconPlaceholder brand={brand} size={24} />}
        />
      ))}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors",
        active
          ? "border-neon/40 text-white"
          : "border-ink-500/60 text-slate-400 hover:border-ink-400 hover:text-white",
      )}
    >
      {active && (
        <motion.span
          layoutId="brand-tab-active"
          className="absolute inset-0 -z-10 rounded-xl bg-neon/10 ring-1 ring-inset ring-neon/40"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      {icon}
      <span className="whitespace-nowrap">{label}</span>
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
          active ? "bg-neon/20 text-neon-soft" : "bg-ink-600/70 text-slate-400",
        )}
      >
        {count}
      </span>
    </button>
  );
}
