import Link from "next/link";
import { ArrowRightIcon, BoltIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-px flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl border border-neon/30 bg-neon/10 text-3xl text-neon">
        <BoltIcon />
      </span>
      <p className="mt-6 font-display text-6xl font-bold text-white">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-white">
        Página não encontrada
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
        O endereço que você procura não existe ou foi movido. Que tal voltar ao
        catálogo e descobrir seu próximo veículo?
      </p>
      <Link href="/" className="btn-primary mt-6">
        Voltar ao catálogo <ArrowRightIcon />
      </Link>
    </div>
  );
}
