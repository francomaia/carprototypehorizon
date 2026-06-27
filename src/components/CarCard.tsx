"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Car } from "@/types";
import { formatBRL, cn } from "@/lib/utils";
import { typeBadgeClass } from "@/lib/carStyle";
import { FavoriteButton } from "./FavoriteButton";
import { ArrowRightIcon, BoltIcon } from "./icons";

interface Props {
  car: Car;
  index?: number;
}

export function CarCard({ car, index = 0 }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-500/70 bg-ink-800/70 shadow-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-neon/40 hover:shadow-card-hover"
    >
      {/* brilho no hover */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-radial-fade opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* imagem */}
      <Link
        href={`/carros/${car.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-b from-ink-700 to-ink-900"
      >
        <Image
          src={car.image}
          alt={`${car.brandName} ${car.model}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent" />

        {/* selo de categoria */}
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
          {car.category}
        </span>

        {/* destaque */}
        {car.featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-neon/40 bg-neon/15 px-2.5 py-1 text-[11px] font-semibold text-neon-soft backdrop-blur-md">
            <BoltIcon /> Destaque
          </span>
        )}
      </Link>

      {/* botão favoritar sobreposto */}
      <div className="absolute right-3 top-12 z-10">
        <FavoriteButton carId={car.id} carName={`${car.brandName} ${car.model}`} />
      </div>

      {/* conteúdo */}
      <div className="relative flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-600">
            {car.brandName} · {car.year}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
              typeBadgeClass(car.type),
            )}
          >
            {car.type}
          </span>
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight text-slate-900">
            <Link
              href={`/carros/${car.slug}`}
              className="after:absolute after:inset-0 after:content-[''] hover:text-neon"
            >
              {car.model}
            </Link>
          </h3>
          <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
            {car.highlight}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-slate-600">{car.summary}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500">
              A partir de
            </p>
            <p className="text-xl font-bold text-slate-900">
              {formatBRL(car.price)}
            </p>
            <p className="text-[10px] text-slate-500">valor protótipo</p>
          </div>
          <span className="relative z-10 inline-flex items-center gap-1.5 rounded-xl border border-ink-400/70 bg-ink-700/50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 transition-colors group-hover:border-neon/50 group-hover:text-neon-soft">
            Ver detalhes
            <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
