"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Car } from "@/types";
import { CarCard } from "./CarCard";
import { SparkIcon } from "./icons";

interface Props {
  cars: Car[];
  emptyTitle?: string;
  emptyHint?: string;
}

export function CarGrid({
  cars,
  emptyTitle = "Nenhum veículo encontrado",
  emptyHint = "Ajuste a busca ou os filtros para ver mais opções.",
}: Props) {
  if (cars.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface flex flex-col items-center justify-center gap-4 px-6 py-20 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full border border-neon/30 bg-neon/10 text-2xl text-neon">
          <SparkIcon />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{emptyTitle}</h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-slate-600">
            {emptyHint}
          </p>
        </div>
        <Link href="/" className="btn-outline mt-1">
          Ver catálogo completo
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {cars.map((car, i) => (
          <CarCard key={car.id} car={car} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
