import type { CarType, PerfClass } from "@/types";

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

/** Cor sólida (hex) da barra de tipo usada nos cards estilo game. */
export function typeBarColor(type: CarType): string {
  switch (type) {
    case "Elétrico":
      return "#16c073";
    case "Híbrido":
      return "#2f7ed8";
    case "Performance":
      return "#d9962b";
    default:
      return "#3a4453";
  }
}

/** Cor (hex) do selo de classe de performance (S/A/B/C/D), estilo game. */
export function perfClassColor(cls: PerfClass): string {
  switch (cls) {
    case "S":
      return "#a855f7"; // roxo (topo)
    case "A":
      return "#ef4444"; // vermelho
    case "B":
      return "#f59e0b"; // laranja
    case "C":
      return "#22c55e"; // verde
    case "D":
      return "#64748b"; // cinza
    default:
      return "#64748b";
  }
}

/** Extrai a sigla de tração (AWD/RWD/FWD) a partir do texto da ficha. */
export function drivetrainShort(tracao: string): string {
  const t = tracao.toUpperCase();
  if (t.includes("AWD") || t.includes("INTEGRAL") || t.includes("XDRIVE"))
    return "AWD";
  if (t.includes("RWD") || t.includes("TRASEIRA")) return "RWD";
  if (t.includes("FWD") || t.includes("DIANTEIRA")) return "FWD";
  return "—";
}
