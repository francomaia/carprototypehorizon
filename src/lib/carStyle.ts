import type { CarType } from "@/types";

/** Estilo (classes Tailwind) associado a cada tipo de veículo. */
export function typeBadgeClass(type: CarType): string {
  switch (type) {
    case "Elétrico":
      return "border-neon/40 bg-neon/10 text-neon-soft";
    case "Híbrido":
      return "border-electric/40 bg-electric/10 text-electric-soft";
    case "Performance":
      return "border-amber-400/40 bg-amber-400/10 text-amber-300";
    default:
      return "border-ink-400 bg-ink-700 text-slate-300";
  }
}
