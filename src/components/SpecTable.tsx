import type { ReactNode } from "react";
import type { CarSpecs } from "@/types";
import {
  BoltIcon,
  GaugeIcon,
  BatteryIcon,
  ClockIcon,
  WeightIcon,
  TrunkIcon,
  ShieldIcon,
  CpuIcon,
  SparkIcon,
} from "./icons";

interface Props {
  specs: CarSpecs;
}

interface Row {
  label: string;
  value: string;
  icon: ReactNode;
}

export function SpecTable({ specs }: Props) {
  const rows: Row[] = [
    { label: "Potência", value: specs.potencia, icon: <BoltIcon /> },
    { label: "Torque", value: specs.torque, icon: <GaugeIcon /> },
    { label: "Autonomia", value: specs.autonomia, icon: <BatteryIcon /> },
    { label: "Tempo de recarga", value: specs.recarga, icon: <ClockIcon /> },
    { label: "0 a 100 km/h", value: specs.aceleracao, icon: <SparkIcon /> },
    { label: "Tipo de motor", value: specs.motor, icon: <CpuIcon /> },
    { label: "Bateria", value: specs.bateria, icon: <BatteryIcon /> },
    { label: "Tração", value: specs.tracao, icon: <GaugeIcon /> },
    { label: "Peso", value: specs.peso, icon: <WeightIcon /> },
    { label: "Porta-malas", value: specs.portaMalas, icon: <TrunkIcon /> },
    { label: "Garantia", value: specs.garantia, icon: <ShieldIcon /> },
    { label: "Ano/modelo", value: specs.anoModelo, icon: <ClockIcon /> },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) => (
        <div
          key={row.label}
          className="surface flex items-start gap-3 p-4 transition-colors hover:border-neon/30"
        >
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-neon/20 bg-neon/5 text-lg text-neon">
            {row.icon}
          </span>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-slate-500">
              {row.label}
            </p>
            <p className="text-sm font-semibold text-white">{row.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
