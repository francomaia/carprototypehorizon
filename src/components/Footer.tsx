import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { MailIcon, PhoneIcon, MapPinIcon, BoltIcon } from "./icons";

const COLS = [
  {
    title: "Catálogo",
    links: [
      { href: "/", label: "Todos os veículos" },
      { href: "/favoritos", label: "Favoritos" },
      { href: "/#catalogo", label: "Por marca" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { href: "/sobre", label: "Sobre" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacidade", label: "Política de Privacidade" },
      { href: "/termos", label: "Termos de Uso" },
      { href: "/cookies", label: "Política de Cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-ink-500/60 bg-ink-950/60">
      <div className="container-px grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={site.logo}
              alt={site.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="font-display text-lg font-bold text-white">
              {site.name}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Curadoria automotiva premium em veículos elétricos, híbridos e de
            performance. Plataforma demonstrativa — valores, imagens e textos são
            protótipos.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <MailIcon className="text-base text-neon" /> {site.contact.email}
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="text-base text-neon" /> {site.contact.phone}
            </li>
            <li className="flex items-center gap-2">
              <MapPinIcon className="text-base text-neon" />{" "}
              {site.contact.address}
            </li>
          </ul>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-neon-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-500/60">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Protótipo demonstrativo —
            sem fins comerciais.
          </p>
          <p className="inline-flex items-center gap-1.5">
            <BoltIcon className="text-neon" /> Feito com Next.js, Tailwind &
            Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
