"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";
import { useToast } from "@/context/ToastContext";
import { HeartIcon } from "./icons";
import { cn } from "@/lib/utils";

interface Props {
  carId: string;
  carName?: string;
  variant?: "icon" | "button";
  className?: string;
}

export function FavoriteButton({
  carId,
  carName,
  variant = "icon",
  className,
}: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const active = isFavorite(carId);

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowFav = toggleFavorite(carId);
    toast(
      nowFav
        ? `${carName ?? "Veículo"} adicionado aos favoritos`
        : `${carName ?? "Veículo"} removido dos favoritos`,
      nowFav ? "success" : "info",
    );
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handle}
        aria-pressed={active}
        className={cn(
          "btn-outline group",
          active && "border-neon/60 text-neon-soft",
          className,
        )}
      >
        <motion.span
          key={String(active)}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
          className="text-base"
        >
          <HeartIcon filled={active} />
        </motion.span>
        {active ? "Favoritado" : "Favoritar"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-pressed={active}
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-full border backdrop-blur-md transition-colors",
        active
          ? "border-neon/50 bg-neon/15 text-neon"
          : "border-white/10 bg-black/40 text-white/80 hover:border-white/30 hover:text-white",
        className,
      )}
    >
      <AnimatePresence>
        {active && (
          <motion.span
            key="ring"
            initial={{ scale: 0.4, opacity: 0.7 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-full bg-neon/30"
          />
        )}
      </AnimatePresence>
      <motion.span
        key={String(active)}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 16 }}
        className="text-[17px] leading-none"
      >
        <HeartIcon filled={active} />
      </motion.span>
    </button>
  );
}
