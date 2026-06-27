import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import {
  SparkIcon,
  ShieldIcon,
  CpuIcon,
  BoltIcon,
  ArrowRightIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a plataforma de curadoria automotiva premium, especializada em veículos elétricos, híbridos e modelos de alto desempenho.",
};

const values = [
  {
    icon: <SparkIcon />,
    title: "Curadoria de verdade",
    text: "Cada modelo do catálogo passa por uma seleção criteriosa de desempenho, eficiência, segurança e custo-benefício.",
  },
  {
    icon: <CpuIcon />,
    title: "Tecnologia em primeiro lugar",
    text: "Priorizamos veículos com plataformas elétricas modernas, conectividade, atualizações remotas e assistências de condução.",
  },
  {
    icon: <ShieldIcon />,
    title: "Transparência total",
    text: "Ficha técnica completa, valores claros e comparativos honestos — para você decidir com confiança.",
  },
  {
    icon: <BoltIcon />,
    title: "Mobilidade sustentável",
    text: "Acreditamos em um futuro eletrificado. Nosso foco são carros que reduzem emissões sem abrir mão da experiência.",
  },
];

const steps = [
  {
    n: "01",
    title: "Selecionamos",
    text: "Nossa equipe avalia lançamentos e modelos consagrados das principais montadoras.",
  },
  {
    n: "02",
    title: "Detalhamos",
    text: "Cada veículo recebe ficha técnica, diferenciais e contexto comercial completos.",
  },
  {
    n: "03",
    title: "Conectamos",
    text: "Você favorita, compara e registra interesse — a curadoria cuida do resto.",
  },
];

export default function SobrePage() {
  return (
    <div className="container-px py-12 lg:py-16">
      {/* hero */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="chip mx-auto border-neon/30 bg-neon/10 text-neon-soft">
          <SparkIcon /> Sobre a {site.name}
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Curadoria automotiva para a{" "}
          <span className="neon-text">era elétrica.</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-600">
          A {site.name} é uma plataforma de curadoria automotiva premium,
          especializada em veículos elétricos, híbridos e modelos de alto
          desempenho. Reunimos em um só lugar o que há de mais relevante no
          mercado, com uma experiência de navegação rápida, elegante e
          transparente.
        </p>
      </div>

      {/* missão */}
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        <div className="surface p-8">
          <h2 className="text-xl font-bold text-slate-900">Nossa missão</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Tornar a escolha do próximo carro uma experiência inteligente e
            agradável. Acreditamos que comparar veículos, entender ficha técnica e
            avaliar custo-benefício não precisa ser confuso — precisa ser claro,
            visual e confiável.
          </p>
        </div>
        <div className="surface p-8">
          <h2 className="text-xl font-bold text-slate-900">Nossa visão</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Ser a referência em descoberta de veículos eletrificados, acelerando a
            transição para uma mobilidade mais limpa, conectada e acessível, sem
            abrir mão de sofisticação e desempenho.
          </p>
        </div>
      </div>

      {/* valores */}
      <div className="mx-auto mt-16 max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          O que nos move
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="surface p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-neon/10 text-xl text-neon">
                {v.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* como funciona */}
      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Como funciona
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="surface relative p-6">
              <span className="font-display text-4xl font-bold text-ink-400">
                {s.n}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* cta */}
      <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-neon/20 bg-gradient-to-r from-ink-800 to-ink-700 p-8 text-center sm:p-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Explore o catálogo e encontre seu próximo carro
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
          Plataforma demonstrativa — valores, imagens e textos são protótipos
          prontos para serem substituídos por dados reais.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Ver catálogo <ArrowRightIcon />
          </Link>
          <Link href="/contato" className="btn-outline">
            Falar com a curadoria
          </Link>
        </div>
      </div>
    </div>
  );
}
