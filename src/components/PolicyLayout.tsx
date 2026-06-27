import type { ReactNode } from "react";
import { ShieldIcon } from "./icons";

interface Section {
  title: string;
  body: ReactNode;
}

interface Props {
  title: string;
  intro: string;
  updatedAt: string;
  sections: Section[];
}

/** Layout reutilizável para páginas legais (privacidade, termos, cookies). */
export function PolicyLayout({ title, intro, updatedAt, sections }: Props) {
  return (
    <div className="container-px py-12 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neon-soft">
          <ShieldIcon /> Documento legal
        </div>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          {intro}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Última atualização: {updatedAt}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* índice */}
          <nav className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Nesta página
              </p>
              {sections.map((s, i) => (
                <a
                  key={s.title}
                  href={`#sec-${i}`}
                  className="block rounded-lg px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-white/5 hover:text-slate-900"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </nav>

          {/* conteúdo */}
          <article className="space-y-8">
            {sections.map((s, i) => (
              <section key={s.title} id={`sec-${i}`} className="scroll-mt-24">
                <h2 className="flex items-baseline gap-2 text-lg font-semibold text-slate-900">
                  <span className="text-sm font-bold text-neon-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 [&_a]:text-neon-soft [&_a:hover]:underline [&_li]:ml-4 [&_li]:list-disc">
                  {s.body}
                </div>
              </section>
            ))}

            <div className="surface mt-4 p-5 text-xs leading-relaxed text-slate-500">
              Este documento é um modelo demonstrativo de protótipo. Antes de uso
              comercial, recomenda-se revisão por profissional jurídico para
              adequação à legislação aplicável (incluindo a LGPD — Lei nº
              13.709/2018).
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
