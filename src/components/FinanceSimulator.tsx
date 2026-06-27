"use client";

import { useMemo, useState } from "react";
import { formatBRL, simulateInstallment } from "@/lib/utils";

interface Props {
  price: number;
}

const TERMS = [24, 36, 48, 60];

export function FinanceSimulator({ price }: Props) {
  const [downPct, setDownPct] = useState(0.2);
  const [months, setMonths] = useState(48);

  const result = useMemo(
    () => simulateInstallment(price, downPct, months),
    [price, downPct, months],
  );

  return (
    <div className="surface p-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="entrada" className="text-sm text-slate-300">
                Entrada
              </label>
              <span className="text-sm font-semibold text-neon-soft">
                {Math.round(downPct * 100)}% · {formatBRL(price * downPct)}
              </span>
            </div>
            <input
              id="entrada"
              type="range"
              min={10}
              max={60}
              step={5}
              value={Math.round(downPct * 100)}
              onChange={(e) => setDownPct(Number(e.target.value) / 100)}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-600 accent-neon"
            />
          </div>

          <div>
            <p className="mb-2 text-sm text-slate-300">Prazo</p>
            <div className="flex flex-wrap gap-2">
              {TERMS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMonths(t)}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                    months === t
                      ? "border-neon/50 bg-neon/10 text-neon-soft"
                      : "border-ink-500/70 text-slate-300 hover:border-ink-400"
                  }`}
                >
                  {t}x
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-neon/20 bg-gradient-to-br from-neon/10 to-electric/5 p-6">
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Parcela estimada
          </p>
          <p className="mt-1 text-4xl font-bold text-white">
            {formatBRL(Math.round(result.installment))}
            <span className="text-base font-medium text-slate-400">/mês</span>
          </p>
          <div className="mt-4 space-y-1.5 text-sm text-slate-400">
            <div className="flex justify-between">
              <span>Valor financiado</span>
              <span className="font-medium text-slate-200">
                {formatBRL(Math.round(result.financed))}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total estimado</span>
              <span className="font-medium text-slate-200">
                {formatBRL(Math.round(result.total))}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-slate-500">
        Simulação meramente ilustrativa (taxa de 1,49% a.m. fixa para protótipo).
        Não constitui oferta de crédito. Condições reais dependem de análise e da
        instituição financeira.
      </p>
    </div>
  );
}
