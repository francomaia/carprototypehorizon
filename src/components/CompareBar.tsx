"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCompare } from "@/context/CompareContext";
import { cars as allCars } from "@/data/cars";
import { formatBRL } from "@/lib/utils";
import { CloseIcon, ScaleIcon } from "./icons";
import type { Car } from "@/types";

const SPEC_ROWS: { label: string; key: keyof Car["specs"] }[] = [
  { label: "Potência", key: "potencia" },
  { label: "Torque", key: "torque" },
  { label: "Autonomia", key: "autonomia" },
  { label: "0–100 km/h", key: "aceleracao" },
  { label: "Recarga", key: "recarga" },
  { label: "Bateria", key: "bateria" },
  { label: "Tração", key: "tracao" },
  { label: "Porta-malas", key: "portaMalas" },
];

export function CompareBar() {
  const { items, remove, clear, count } = useCompare();
  const [open, setOpen] = useState(false);

  const selected = items
    .map((id) => allCars.find((c) => c.id === id))
    .filter((c): c is Car => Boolean(c));

  return (
    <>
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-ink-500/70 bg-ink-800/90 p-2 pl-4 shadow-card backdrop-blur-xl">
              <div className="hidden items-center -space-x-3 sm:flex">
                {selected.map((c) => (
                  <span
                    key={c.id}
                    className="relative h-9 w-12 overflow-hidden rounded-md border border-ink-400 bg-ink-700"
                  >
                    <Image
                      src={c.image}
                      alt={c.model}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
              <span className="text-sm text-slate-300">
                <strong className="text-white">{count}</strong> para comparar
              </span>
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={count < 2}
                className="btn-primary h-9 px-4 py-0 text-sm disabled:opacity-50"
              >
                <ScaleIcon className="text-base" /> Comparar
              </button>
              <button
                type="button"
                onClick={clear}
                aria-label="Limpar comparação"
                className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <CloseIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-h-[88vh] w-full max-w-4xl overflow-auto rounded-t-2xl border border-ink-500/70 bg-ink-800/95 shadow-card backdrop-blur-xl sm:rounded-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-500/60 bg-ink-800/95 px-5 py-4 backdrop-blur-xl">
                <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                  <ScaleIcon className="text-electric" /> Comparativo de veículos
                </h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <CloseIcon className="text-lg" />
                </button>
              </div>

              <div className="overflow-x-auto p-5">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="w-32 text-left align-bottom text-xs font-medium uppercase tracking-wider text-slate-500" />
                      {selected.map((c) => (
                        <th key={c.id} className="p-2 align-top">
                          <div className="relative mb-2 aspect-[16/10] overflow-hidden rounded-lg border border-ink-500 bg-ink-700">
                            <Image
                              src={c.image}
                              alt={c.model}
                              fill
                              sizes="200px"
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => remove(c.id)}
                              aria-label={`Remover ${c.model}`}
                              className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
                            >
                              <CloseIcon className="text-sm" />
                            </button>
                          </div>
                          <Link
                            href={`/carros/${c.slug}`}
                            className="block text-left text-sm font-semibold leading-tight text-white hover:text-neon-soft"
                          >
                            {c.brandName} {c.model}
                          </Link>
                          <p className="text-left text-xs font-semibold text-neon-soft">
                            {formatBRL(c.price)}
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SPEC_ROWS.map((row, i) => (
                      <tr
                        key={row.key}
                        className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
                      >
                        <td className="p-2 text-xs font-medium text-slate-400">
                          {row.label}
                        </td>
                        {selected.map((c) => (
                          <td
                            key={c.id}
                            className="p-2 text-sm font-medium text-slate-100"
                          >
                            {c.specs[row.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
