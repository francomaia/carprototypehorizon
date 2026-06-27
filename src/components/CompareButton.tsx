"use client";

import { useCompare } from "@/context/CompareContext";
import { useToast } from "@/context/ToastContext";
import { ScaleIcon } from "./icons";
import { cn } from "@/lib/utils";

interface Props {
  carId: string;
  carName?: string;
  variant?: "icon" | "button";
  className?: string;
}

export function CompareButton({
  carId,
  carName,
  variant = "icon",
  className,
}: Props) {
  const { isComparing, toggleCompare, max } = useCompare();
  const { toast } = useToast();
  const active = isComparing(carId);

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = toggleCompare(carId);
    if (res.full) {
      toast(`Você pode comparar até ${max} veículos por vez`, "info");
      return;
    }
    toast(
      res.added
        ? `${carName ?? "Veículo"} adicionado à comparação`
        : `${carName ?? "Veículo"} removido da comparação`,
      res.added ? "success" : "info",
    );
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handle}
        aria-pressed={active}
        className={cn(
          "btn-outline",
          active && "border-electric/60 text-electric-soft",
          className,
        )}
      >
        <ScaleIcon className="text-base" />
        {active ? "Comparando" : "Comparar"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-pressed={active}
      aria-label={active ? "Remover da comparação" : "Adicionar à comparação"}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border backdrop-blur-md transition-colors",
        active
          ? "border-electric/50 bg-electric/15 text-electric"
          : "border-white/10 bg-black/40 text-white/80 hover:border-white/30 hover:text-white",
        className,
      )}
    >
      <ScaleIcon className="text-[17px]" />
    </button>
  );
}
