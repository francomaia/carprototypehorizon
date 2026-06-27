import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { cars, getCarBySlug, allCarSlugs } from "@/data/cars";
import { CarDetailsHero } from "@/components/CarDetailsHero";
import { SpecTable } from "@/components/SpecTable";
import { FinanceSimulator } from "@/components/FinanceSimulator";
import { CarGrid } from "@/components/CarGrid";
import { site } from "@/lib/site";
import {
  SparkIcon,
  ShieldIcon,
  CpuIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/icons";

export function generateStaticParams() {
  return allCarSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const car = getCarBySlug(params.slug);
  if (!car) return { title: "Veículo não encontrado" };
  const fullName = `${car.brandName} ${car.model}`;
  return {
    title: `${fullName} ${car.year}`,
    description: car.summary,
    openGraph: {
      title: `${fullName} · ${site.name}`,
      description: car.summary,
      images: [{ url: car.image }],
    },
  };
}

export default function CarDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const car = getCarBySlug(params.slug);
  if (!car) notFound();

  const related = cars
    .filter((c) => c.id !== car.id)
    .sort((a, b) => {
      const sameBrandA = a.brandId === car.brandId ? -1 : 0;
      const sameBrandB = b.brandId === car.brandId ? -1 : 0;
      return sameBrandA - sameBrandB;
    })
    .slice(0, 4);

  return (
    <div className="container-px py-8 lg:py-12">
      {/* breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-white">
          Catálogo
        </Link>
        <span>/</span>
        <Link href={`/?q=${car.brandName}#catalogo`} className="hover:text-white">
          {car.brandName}
        </Link>
        <span>/</span>
        <span className="text-slate-300">{car.model}</span>
      </nav>

      <CarDetailsHero car={car} />

      {/* Especificações */}
      <Section
        id="especificacoes"
        eyebrow="Ficha técnica"
        title="Especificações"
        icon={<SparkIcon />}
      >
        <SpecTable specs={car.specs} />
      </Section>

      {/* Diferenciais / Tecnologia / Segurança */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <FeatureCard
          title="Diferenciais"
          icon={<SparkIcon />}
          items={car.differentials}
          accent="neon"
        />
        <FeatureCard
          title="Tecnologia"
          icon={<CpuIcon />}
          items={car.technology}
          accent="electric"
        />
        <FeatureCard
          title="Segurança"
          icon={<ShieldIcon />}
          items={car.safety}
          accent="neon"
        />
      </div>

      {/* Financiamento */}
      <Section
        id="financiamento"
        eyebrow="Simulação comercial"
        title="Simule seu financiamento"
        icon={<ShieldIcon />}
        description="Ajuste a entrada e o prazo para estimar sua parcela. Valores demonstrativos de protótipo."
      >
        <FinanceSimulator price={car.price} />
      </Section>

      {/* CTA */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-neon/20 bg-gradient-to-r from-ink-800 via-ink-800 to-ink-700 p-8 text-center sm:p-10">
        <h3 className="text-2xl font-bold text-white">
          Pronto para conhecer de perto o {car.model}?
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          Registre seu interesse e nossa curadoria entra em contato com condições
          personalizadas e disponibilidade.
        </p>
        <Link
          href={`/contato?modelo=${encodeURIComponent(
            `${car.brandName} ${car.model}`,
          )}`}
          className="btn-primary mx-auto mt-6"
        >
          Tenho interesse <ArrowRightIcon />
        </Link>
      </div>

      {/* Relacionados */}
      <Section
        id="relacionados"
        eyebrow="Você também pode gostar"
        title="Veículos relacionados"
        icon={<SparkIcon />}
      >
        <CarGrid cars={related} />
      </Section>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  icon,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neon-soft">
          {icon} {eyebrow}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function FeatureCard({
  title,
  icon,
  items,
  accent,
}: {
  title: string;
  icon: ReactNode;
  items: string[];
  accent: "neon" | "electric";
}) {
  return (
    <div className="surface p-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
        <span
          className={`grid h-9 w-9 place-items-center rounded-lg text-lg ${
            accent === "neon"
              ? "bg-neon/10 text-neon"
              : "bg-electric/10 text-electric"
          }`}
        >
          {icon}
        </span>
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
            <CheckIcon
              className={`mt-0.5 shrink-0 text-base ${
                accent === "neon" ? "text-neon" : "text-electric"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
