"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useFavorites } from "@/context/FavoritesContext";
import { site } from "@/lib/site";
import {
  MailIcon,
  BoltIcon,
  CheckIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@/components/icons";

const perks = [
  "Favoritos salvos no seu perfil",
  "Acompanhamento de interesses",
  "Comparativos rápidos entre modelos",
  "Atendimento consultivo da curadoria",
];

export default function LoginPage() {
  const { user, login, logout } = useAuth();
  const { count } = useFavorites();
  const { toast } = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const u = await login(email, password);
      toast(`Bem-vindo(a), ${u.name.split(" ")[0]}!`);
      router.push("/favoritos");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-px py-12 lg:py-20">
      <div className="mx-auto grid max-w-5xl items-stretch gap-8 overflow-hidden rounded-3xl border border-ink-500/70 bg-ink-800/50 lg:grid-cols-2">
        {/* lado visual */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 p-10 lg:flex">
          <div className="pointer-events-none absolute inset-0 bg-tech-grid bg-[size:40px_40px] opacity-30" />
          <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-electric/20 blur-3xl" />
          <div className="relative">
            <Image
              src={site.logo}
              alt={site.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-xl object-contain"
            />
            <h2 className="mt-6 text-3xl font-bold leading-tight text-slate-900">
              Sua garagem
              <span className="block neon-text">premium digital.</span>
            </h2>
            <p className="mt-3 max-w-xs text-sm text-slate-600">
              Acesse sua conta para salvar favoritos e acompanhar seus veículos de
              interesse.
            </p>
          </div>
          <ul className="relative mt-8 space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-slate-700">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-neon/15 text-neon">
                  <CheckIcon className="text-sm" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* lado do formulário / conta */}
        <div className="p-8 sm:p-10">
          {user ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full flex-col justify-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-neon to-electric text-xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <h1 className="mt-5 text-2xl font-bold text-slate-900">
                Olá, {user.name.split(" ")[0]} 👋
              </h1>
              <p className="mt-1 text-sm text-slate-600">{user.email}</p>

              <div className="surface mt-6 flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-neon/10 text-neon">
                  <HeartIcon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {count} {count === 1 ? "favorito" : "favoritos"}
                  </p>
                  <p className="text-xs text-slate-600">
                    salvos na sua seleção
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/favoritos" className="btn-primary flex-1">
                  Ver favoritos <ArrowRightIcon />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    toast("Você saiu da conta.", "info");
                  }}
                  className="btn-outline flex-1"
                >
                  Sair da conta
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-slate-900">Entrar</h1>
              <p className="mt-1 text-sm text-slate-600">
                Use qualquer e-mail válido e uma senha (mín. 4 caracteres).
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium text-slate-700"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@email.com"
                    className="input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-xs font-medium text-slate-700"
                  >
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input"
                  />
                </div>

                {error && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/40 border-t-ink-950" />
                      Entrando…
                    </span>
                  ) : (
                    <>
                      <MailIcon className="text-base" /> Entrar
                    </>
                  )}
                </button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setEmail("cliente@horizon.com");
                  setPassword("horizon");
                }}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-ink-400/60 bg-ink-700/30 py-2.5 text-xs text-slate-600 transition-colors hover:border-neon/40 hover:text-neon-soft"
              >
                <BoltIcon /> Preencher credenciais de demonstração
              </button>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500">
                Login simulado (protótipo). Dados salvos apenas no seu navegador.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
