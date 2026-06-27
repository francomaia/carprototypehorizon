import Link from "next/link";
import Image from "next/image";
import { cars } from "@/data/cars";
import { formatBRL } from "@/lib/utils";
import { ArrowRightIcon, BoltIcon, ShieldIcon, SparkIcon } from "./icons";

const stats = [
  { value: "10", label: "Modelos curados" },
  { value: "10", label: "Marcas premium" },
  { value: "100%", label: "Eletrificados" },
];

export function Hero() {
  const showcase = cars.find((c) => c.featured) ?? cars[0];

  return (
    <section className="relative overflow-hidden">
      <div className="container-px grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        {/* Texto */}
        <div className="animate-fade-up">
          <span className="chip border-neon/30 bg-neon/10 text-neon-soft">
            <SparkIcon /> Curadoria automotiva premium
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            O futuro da mobilidade,
            <span className="block neon-text">selecionado para você.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            Uma vitrine de veículos elétricos, híbridos e de performance das
            principais montadoras. Compare, favorite e descubra ficha técnica
            completa — tudo em uma experiência rápida e elegante.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="#catalogo" className="btn-primary">
              Explorar catálogo <ArrowRightIcon />
            </Link>
            <Link href="/sobre" className="btn-outline">
              Sobre a plataforma
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="surface px-4 py-3">
                <dt className="text-2xl font-bold text-slate-900">{s.value}</dt>
                <dd className="text-xs text-slate-600">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Card showcase */}
        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-electric/20 via-transparent to-neon/20 blur-2xl" />
          <div className="surface overflow-hidden">
            <div className="relative aspect-[16/11]">
              <Image
                src={showcase.image}
                alt={`${showcase.brandName} ${showcase.model}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-neon/40 bg-neon/15 px-3 py-1 text-xs font-semibold text-neon-soft backdrop-blur-md">
                <BoltIcon /> Em destaque
              </span>
            </div>
            <div className="flex items-end justify-between gap-4 p-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-600">
                  {showcase.brandName} · {showcase.category}
                </p>
                <h3 className="text-xl font-bold text-slate-900">
                  {showcase.model}
                </h3>
                <p className="mt-1 text-sm text-neon-soft">
                  {formatBRL(showcase.price)}{" "}
                  <span className="text-slate-500">· protótipo</span>
                </p>
              </div>
              <Link
                href={`/carros/${showcase.slug}`}
                className="btn-outline shrink-0 px-4 py-2.5 text-sm"
              >
                Ver detalhes
              </Link>
            </div>
          </div>

          {/* badge flutuante */}
          <div className="surface absolute -bottom-5 -left-3 hidden items-center gap-2.5 px-4 py-3 shadow-card sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-electric/15 text-electric">
              <ShieldIcon />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-900">Garantia premium</p>
              <p className="text-[11px] text-slate-600">8 anos na bateria</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
