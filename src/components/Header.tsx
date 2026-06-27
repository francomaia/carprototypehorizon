"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useUI } from "@/context/UIContext";
import {
  HeartIcon,
  SearchIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
} from "./icons";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Catálogo" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { count } = useFavorites();
  const { openLogin } = useUI();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fecha menus ao trocar de rota
  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = term.trim();
    router.push(q ? `/?q=${encodeURIComponent(q)}#catalogo` : "/#catalogo");
    setSearchOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-ink-500/60 bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-px flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src={site.logo}
            alt={site.name}
            width={40}
            height={40}
            className="h-9 w-9 rounded-lg object-contain"
            priority
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-base font-bold tracking-tight text-white">
              {site.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-neon-soft/80">
              {site.tagline}
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Busca */}
          <div className="relative hidden md:block">
            <AnimatePresence initial={false}>
              {searchOpen ? (
                <motion.form
                  key="search"
                  initial={{ width: 40, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 40, opacity: 0 }}
                  onSubmit={submitSearch}
                  className="relative"
                >
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-slate-500" />
                  <input
                    autoFocus
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onBlur={() => !term && setSearchOpen(false)}
                    placeholder="Buscar veículos…"
                    className="w-full rounded-xl border border-ink-500/80 bg-ink-900/80 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-neon/60 focus:outline-none"
                  />
                </motion.form>
              ) : (
                <button
                  key="search-btn"
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Abrir busca"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-ink-500/60 text-slate-300 transition-colors hover:border-neon/40 hover:text-white"
                >
                  <SearchIcon className="text-lg" />
                </button>
              )}
            </AnimatePresence>
          </div>

          {/* Favoritos */}
          <Link
            href="/favoritos"
            aria-label="Favoritos"
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-ink-500/60 text-slate-300 transition-colors hover:border-neon/40 hover:text-white"
          >
            <HeartIcon className="text-lg" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-neon px-1 text-[10px] font-bold text-ink-950">
                {count}
              </span>
            )}
          </Link>

          {/* Login / usuário */}
          {user ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl border border-ink-500/60 py-1.5 pl-1.5 pr-2.5 text-sm font-medium text-white transition-colors hover:border-neon/40"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-neon to-electric text-xs font-bold text-ink-950">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[90px] truncate">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDownIcon className="text-sm text-slate-400" />
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-ink-500/70 bg-ink-800/95 p-1.5 shadow-card backdrop-blur-xl"
                  >
                    <div className="px-3 py-2">
                      <p className="truncate text-sm font-semibold text-white">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {user.email}
                      </p>
                    </div>
                    <div className="my-1 h-px bg-ink-500/60" />
                    <Link
                      href="/favoritos"
                      className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
                    >
                      Meus favoritos
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
                    >
                      Sair da conta
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              type="button"
              onClick={openLogin}
              className="btn-primary hidden h-10 px-4 py-0 text-sm sm:inline-flex"
            >
              <UserIcon className="text-base" /> Entrar
            </button>
          )}

          {/* Menu mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink-500/60 text-slate-200 lg:hidden"
          >
            {mobileOpen ? (
              <CloseIcon className="text-lg" />
            ) : (
              <MenuIcon className="text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-ink-500/60 bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-px space-y-1 py-4">
              <form onSubmit={submitSearch} className="relative mb-3">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-slate-500" />
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Buscar veículos…"
                  className="input pl-9"
                />
              </form>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="btn-outline w-full"
                  >
                    Sair ({user.name.split(" ")[0]})
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      openLogin();
                      setMobileOpen(false);
                    }}
                    className="btn-primary w-full"
                  >
                    <UserIcon className="text-base" /> Entrar
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
