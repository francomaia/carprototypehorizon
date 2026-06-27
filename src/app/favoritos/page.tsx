"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";
import { cars } from "@/data/cars";
import { CarGrid } from "@/components/CarGrid";
import { CardSkeletonGrid } from "@/components/CardSkeleton";
import { HeartIcon, ArrowRightIcon } from "@/components/icons";

export default function FavoritesPage() {
  const { favorites, ready } = useFavorites();
  const favCars = cars.filter((c) => favorites.includes(c.id));

  return (
    <div className="container-px py-12 lg:py-16">
      <div className="mb-8 flex flex-col gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neon-soft">
          <HeartIcon filled /> Sua seleção
        </span>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Meus favoritos
        </h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Os veículos que você salvou ficam guardados neste navegador. Compare,
          revise a ficha técnica e avance quando estiver pronto.
        </p>
      </div>

      {!ready ? (
        <CardSkeletonGrid count={4} />
      ) : favCars.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface flex flex-col items-center justify-center gap-5 px-6 py-20 text-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-neon/30 bg-neon/10 text-3xl text-neon">
            <HeartIcon />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Você ainda não favoritou nenhum veículo
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Toque no coração nos cards do catálogo para montar sua lista de
              desejos. Ela fica salva automaticamente.
            </p>
          </div>
          <Link href="/" className="btn-primary">
            Explorar catálogo <ArrowRightIcon />
          </Link>
        </motion.div>
      ) : (
        <>
          <p className="mb-5 text-sm text-slate-400">
            {favCars.length}{" "}
            {favCars.length === 1 ? "veículo salvo" : "veículos salvos"}
          </p>
          <CarGrid cars={favCars} />
        </>
      )}
    </div>
  );
}
