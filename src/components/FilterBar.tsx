"use client";

import type { FilterTag, SortOption } from "@/types";
import { SlidersIcon, ChevronDownIcon } from "./icons";
import { cn } from "@/lib/utils";

const FILTERS: FilterTag[] = [
  "Todos",
  "Elétrico",
  "Híbrido",
  "Performance",
  "SUV",
  "Premium",
];

const SORT_LABELS: Record<SortOption, string> = {
  destaque: "Destaques",
  "menor-preco": "Menor preço",
  "maior-preco": "Maior preço",
  nome: "Nome (A–Z)",
};

interface Props {
  filter: FilterTag;
  onFilter: (f: FilterTag) => void;
  sort: SortOption;
  onSort: (s: SortOption) => void;
}

export function FilterBar({ filter, onFilter, sort, onSort }: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1">
        <span className="mr-1 hidden shrink-0 items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500 sm:inline-flex">
          <SlidersIcon /> Filtrar
        </span>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilter(f)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
              filter === f
                ? "border-neon/50 bg-neon/10 text-neon-soft"
                : "border-ink-500/70 bg-ink-700/40 text-slate-300 hover:border-ink-400 hover:text-white",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="relative shrink-0">
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortOption)}
          aria-label="Ordenar veículos"
          className="appearance-none rounded-xl border border-ink-500/80 bg-ink-900/70 py-2.5 pl-4 pr-10 text-sm font-medium text-white transition-colors hover:border-ink-400 focus:border-neon/60 focus:outline-none"
        >
          {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
            <option key={opt} value={opt} className="bg-ink-900">
              Ordenar: {SORT_LABELS[opt]}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-slate-400" />
      </div>
    </div>
  );
}
