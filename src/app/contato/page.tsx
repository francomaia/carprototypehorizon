import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import { MailIcon, PhoneIcon, MapPinIcon, SparkIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a curadoria da Horizon Motors. Registre seu interesse em um modelo e receba atendimento consultivo.",
};

const channels = [
  { icon: <MailIcon />, label: "E-mail", value: site.contact.email },
  { icon: <PhoneIcon />, label: "Telefone", value: site.contact.phone },
  { icon: <MapPinIcon />, label: "Endereço", value: site.contact.address },
];

export default function ContatoPage() {
  return (
    <div className="container-px py-12 lg:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neon-soft">
          <SparkIcon /> Fale conosco
        </span>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Registre seu interesse
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Conte qual modelo chamou sua atenção e o que você procura. Nossa
          curadoria retorna com informações, disponibilidade e uma simulação
          comercial sob medida.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Suspense
          fallback={
            <div className="surface h-[520px] animate-pulse rounded-2xl" />
          }
        >
          <ContactForm />
        </Suspense>

        <aside className="space-y-4">
          <div className="surface p-6">
            <h2 className="text-lg font-semibold text-white">
              Canais de atendimento
            </h2>
            <ul className="mt-4 space-y-4">
              {channels.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-neon/10 text-lg text-neon">
                    {c.icon}
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-500">
                      {c.label}
                    </p>
                    <p className="text-sm font-medium text-white">{c.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface p-6">
            <h2 className="text-lg font-semibold text-white">Horários</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
              <li className="flex justify-between">
                <span>Segunda a sexta</span>
                <span className="text-slate-200">9h – 19h</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado</span>
                <span className="text-slate-200">9h – 14h</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span className="text-slate-200">Fechado</span>
              </li>
            </ul>
          </div>

          <div className="surface bg-gradient-to-br from-neon/10 to-electric/5 p-6">
            <p className="text-sm leading-relaxed text-slate-300">
              Atendimento consultivo e sem compromisso. Este é um protótipo — o
              envio é simulado e nenhum dado é realmente transmitido.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
