"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Car } from "@/types";
import { formatBRL, cn } from "@/lib/utils";
import { typeBadgeClass } from "@/lib/carStyle";
import { FavoriteButton } from "./FavoriteButton";
import { CompareButton } from "./CompareButton";
import { useToast } from "@/context/ToastContext";
import { ArrowRightIcon, BoltIcon, BatteryIcon, GaugeIcon } from "./icons";

interface Props {
  car: Car;
}

export function CarDetailsHero({ car }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [active, setActive] = useState(0);
  const gallery = car.gallery.length ? car.gallery : [car.image];
  const fullName = `${car.brandName} ${car.model}`;

  const handleInterest = () => {
    toast("Interesse registrado! Complete seus dados para falarmos com você.");
    router.push(`/contato?modelo=${encodeURIComponent(fullName)}`);
  };

  const quickStats = [
    { label: "Potência", value: car.specs.potencia, icon: <BoltIcon /> },
    { label: "Autonomia", value: car.specs.autonomia, icon: <BatteryIcon /> },
    { label: "0–100 km/h", value: car.specs.aceleracao, icon: <GaugeIcon /> },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      {/* Galeria */}
      <div>
        <div className="surface relative aspect-[16/11] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={gallery[active]}
                alt={`${fullName} — imagem ${active + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
          <span
            className={cn(
              "absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md",
              typeBadgeClass(car.type),
            )}
          >
            {car.type}
          </span>
        </div>

        {gallery.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "relative aspect-[16/11] overflow-hidden rounded-xl border transition-all",
                  active === i
                    ? "border-neon/60 ring-2 ring-neon/30"
                    : "border-ink-500/70 opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt={`Miniatura ${i + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Informações */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium uppercase tracking-wider text-neon-soft">
            {car.brandName}
          </span>
          <span className="text-slate-500">•</span>
          <span>{car.category}</span>
          <span className="text-slate-500">•</span>
          <span>{car.year}</span>
        </div>

        <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          {car.model}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-800 ring-1 ring-white/10">
            {car.highlight}
          </span>
          {car.featured && (
            <span className="inline-flex items-center gap-1 rounded-md border border-neon/40 bg-neon/10 px-2.5 py-1 text-xs font-semibold text-neon-soft">
              <BoltIcon /> Destaque
            </span>
          )}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-700">
          {car.summary}
        </p>

        {/* stats rápidos */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {quickStats.map((s) => (
            <div key={s.label} className="surface p-3 text-center">
              <span className="mx-auto grid h-8 w-8 place-items-center rounded-lg bg-neon/10 text-base text-neon">
                {s.icon}
              </span>
              <p className="mt-2 text-sm font-bold text-slate-900">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* preço */}
        <div className="surface mt-6 flex items-end justify-between p-5">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500">
              Preço protótipo
            </p>
            <p className="text-3xl font-bold text-slate-900">
              {formatBRL(car.price)}
            </p>
            <p className="text-[10px] text-slate-500">
              valor demonstrativo — sujeito a alteração
            </p>
          </div>
          <span className="hidden text-right text-xs text-slate-600 sm:block">
            ou a partir de
            <br />
            <strong className="text-neon-soft">
              {formatBRL(Math.round((car.price * 0.85) / 48))}
            </strong>
            /mês
          </span>
        </div>

        {/* ações */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleInterest}
            className="btn-primary sm:col-span-2"
          >
            Tenho interesse <ArrowRightIcon />
          </button>
          <FavoriteButton carId={car.id} carName={fullName} variant="button" />
          <CompareButton carId={car.id} carName={fullName} variant="button" />
        </div>
      </div>
    </div>
  );
}
