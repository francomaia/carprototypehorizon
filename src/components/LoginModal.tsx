"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { useToast } from "@/context/ToastContext";
import { site } from "@/lib/site";
import { CloseIcon, MailIcon, BoltIcon } from "./icons";

export function LoginModal() {
  const { loginOpen, closeLogin } = useUI();
  const { login } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loginOpen) {
      setError(null);
    }
  }, [loginOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLogin();
    };
    if (loginOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [loginOpen, closeLogin]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(email, password);
      toast(`Bem-vindo(a), ${user.name.split(" ")[0]}!`, "success");
      closeLogin();
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail("cliente@horizon.com");
    setPassword("horizon");
  };

  return (
    <AnimatePresence>
      {loginOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={closeLogin}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Entrar na conta"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-ink-500/70 bg-ink-800/90 shadow-card backdrop-blur-xl"
          >
            {/* brilho topo */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-electric/20 blur-3xl" />

            <button
              type="button"
              onClick={closeLogin}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <CloseIcon className="text-lg" />
            </button>

            <div className="relative p-7 sm:p-8">
              <div className="flex items-center gap-2.5">
                <Image
                  src={site.logo}
                  alt={site.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-lg object-contain"
                />
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Entrar na {site.name}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Salve favoritos e acompanhe seus interesses
                  </p>
                </div>
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-1.5 block text-xs font-medium text-slate-300"
                  >
                    E-mail
                  </label>
                  <input
                    id="login-email"
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
                    htmlFor="login-password"
                    className="mb-1.5 block text-xs font-medium text-slate-300"
                  >
                    Senha
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

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
                onClick={fillDemo}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-ink-400/60 bg-ink-700/30 py-2.5 text-xs text-slate-400 transition-colors hover:border-neon/40 hover:text-neon-soft"
              >
                <BoltIcon /> Preencher credenciais de demonstração
              </button>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500">
                Login simulado para fins de protótipo. Os dados ficam apenas no
                seu navegador (localStorage). Não use credenciais reais.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
