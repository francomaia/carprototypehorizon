"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Car, FilterTag, SortOption } from "@/types";
import { cars } from "@/data/cars";
import { brands } from "@/data/brands";
import { site } from "@/lib/site";
import { formatBRL, cn } from "@/lib/utils";
import {
  typeBarColor,
  perfClassColor,
  drivetrainShort,
} from "@/lib/carStyle";
import { useFavorites } from "@/context/FavoritesContext";
import { useCompare } from "@/context/CompareContext";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { useToast } from "@/context/ToastContext";
import {
  HeartIcon,
  SearchIcon,
  ScaleIcon,
  SlidersIcon,
  SortIcon,
  MenuIcon,
  CloseIcon,
  CoinIcon,
  CrownIcon,
  BoltIcon,
  GaugeIcon,
  BatteryIcon,
  WeightIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./icons";

const FILTERS: FilterTag[] = [
  "Todos",
  "Elétrico",
  "Híbrido",
  "Performance",
  "SUV",
  "Premium",
];

const SORTS: { value: SortOption; label: string }[] = [
  { value: "destaque", label: "Destaques" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "nome", label: "Nome (A–Z)" },
];

function matchesTerm(car: Car, term: string) {
  if (!term) return true;
  const q = term.toLowerCase();
  return [car.model, car.brandName, car.type, car.category, car.highlight].some(
    (f) => f.toLowerCase().includes(q),
  );
}

function matchesFilter(car: Car, filter: FilterTag) {
  switch (filter) {
    case "Todos":
      return true;
    case "Elétrico":
    case "Híbrido":
    case "Performance":
      return car.type === filter;
    case "SUV":
      return car.category.toLowerCase().includes("suv");
    case "Premium":
      return (
        car.category.toLowerCase().includes("premium") ||
        car.highlight.toLowerCase() === "premium"
      );
    default:
      return true;
  }
}

type Popover = null | "filter" | "sort" | "menu";

export function GameCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { openLogin } = useUI();
  const { count: favCount, isFavorite, toggleFavorite } = useFavorites();
  const { isComparing, toggleCompare, max: maxCompare } = useCompare();
  const { toast } = useToast();

  const [term, setTerm] = useState("");
  const [brand, setBrand] = useState("all");
  const [filter, setFilter] = useState<FilterTag>("Todos");
  const [sort, setSort] = useState<SortOption>("destaque");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [popover, setPopover] = useState<Popover>(null);

  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setTerm(q);
      setSearchOpen(true);
    }
  }, [searchParams]);

  const visible = useMemo(() => {
    const list = cars.filter(
      (c) =>
        matchesTerm(c, term) &&
        matchesFilter(c, filter) &&
        (brand === "all" || c.brandId === brand),
    );
    return [...list].sort((a, b) => {
      switch (sort) {
        case "menor-preco":
          return a.price - b.price;
        case "maior-preco":
          return b.price - a.price;
        case "nome":
          return a.model.localeCompare(b.model);
        default:
          return (
            Number(b.featured ?? false) - Number(a.featured ?? false) ||
            b.perfIndex - a.perfIndex
          );
      }
    });
  }, [term, filter, brand, sort]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    const base = cars.filter(
      (c) => matchesTerm(c, term) && matchesFilter(c, filter),
    );
    for (const b of brands) map[b.id] = base.filter((c) => c.brandId === b.id).length;
    return map;
  }, [term, filter]);

  // Mantém uma seleção válida sempre que a lista muda.
  useEffect(() => {
    if (visible.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !visible.some((c) => c.id === selectedId)) {
      setSelectedId(visible[0].id);
    }
  }, [visible, selectedId]);

  const selected = visible.find((c) => c.id === selectedId) ?? visible[0] ?? null;

  const handleCardActivate = (car: Car) => {
    if (selectedId === car.id) {
      router.push(`/carros/${car.slug}`);
    } else {
      setSelectedId(car.id);
    }
  };

  const scrollTabs = (dir: number) => {
    tabsRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  const activeBrandName =
    brand === "all" ? "Todas as marcas" : brands.find((b) => b.id === brand)?.name;

  return (
    <section id="catalogo" className="container-px py-4 sm:py-6">
      <div className="relative flex min-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-2xl border border-ink-500/70 bg-ink-900/80 shadow-card backdrop-blur-sm">
        {/* trilho/varredura tecnológica de fundo */}
        <div className="pointer-events-none absolute inset-0 bg-tech-grid bg-[size:48px_48px] opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_80%)]" />

        {/* ===== HUD topo ===== */}
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-ink-500/60 bg-ink-950/80 px-3 py-2.5 backdrop-blur-xl sm:px-4">
          {/* esquerda: veículo selecionado */}
          <div className="flex min-w-0 items-center gap-2.5">
            <Image
              src={site.logo}
              alt={site.name}
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-md object-contain"
              priority
            />
            {selected ? (
              <div className="flex min-w-0 items-center gap-2">
                <ClassBadge cls={selected.perfClass} index={selected.perfIndex} />
                <span className="truncate text-sm font-semibold text-white">
                  {selected.brandName} {selected.model}
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold text-white">
                {site.name}
              </span>
            )}
          </div>

          {/* direita: status do "jogador" */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-1.5 rounded-md border border-ink-500/70 bg-ink-800/70 px-2 py-1 text-xs font-semibold text-slate-300 sm:inline-flex">
              <HeartIcon className="text-sm text-neon" filled={favCount > 0} />
              {favCount}
            </span>
            {user ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                <CrownIcon className="text-base text-amber-300" />
                <span className="max-w-[110px] truncate">
                  {user.name.split(" ")[0]}
                </span>
              </span>
            ) : (
              <button
                type="button"
                onClick={openLogin}
                className="inline-flex items-center gap-1.5 rounded-md border border-ink-500/70 bg-ink-800/70 px-2.5 py-1 text-sm font-semibold text-slate-200 transition-colors hover:border-neon/40 hover:text-white"
              >
                <CrownIcon className="text-base text-amber-300" /> Entrar
              </button>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-xs font-bold text-amber-300">
              <CoinIcon className="text-sm" /> CR 250.000
            </span>
          </div>
        </div>

        {/* ===== Título + abas ===== */}
        <div className="relative z-20 border-b border-ink-500/60 px-3 pb-3 pt-3 sm:px-4">
          <div className="mb-3 flex items-end justify-between gap-2">
            <div>
              <h1 className="text-base font-bold uppercase tracking-wide text-white sm:text-lg">
                Catálogo de Veículos
              </h1>
              <p className="text-[11px] uppercase tracking-[0.2em] text-neon-soft/80">
                Modo vitrine · {activeBrandName} · {visible.length}{" "}
                {visible.length === 1 ? "modelo" : "modelos"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors",
                searchOpen
                  ? "border-neon/50 bg-neon/10 text-neon-soft"
                  : "border-ink-500/70 text-slate-300 hover:border-neon/40 hover:text-white",
              )}
            >
              <SearchIcon className="text-sm" /> Buscar
            </button>
          </div>

          {/* busca */}
          <AnimatePresence initial={false}>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="relative mb-3">
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-slate-500" />
                  <input
                    autoFocus
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Buscar por modelo, marca ou tipo…"
                    className="input pl-10"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* abas de marca com bumpers LB/RB */}
          <div className="flex items-center gap-2">
            <Bumper label="LB" onClick={() => scrollTabs(-1)} />
            <div
              ref={tabsRef}
              className="no-scrollbar flex flex-1 items-stretch gap-1.5 overflow-x-auto scroll-smooth"
            >
              <BrandTab
                active={brand === "all"}
                onClick={() => setBrand("all")}
                label="TODAS"
                count={cars.filter((c) => matchesTerm(c, term) && matchesFilter(c, filter)).length}
              />
              {brands.map((b) => (
                <BrandTab
                  key={b.id}
                  active={brand === b.id}
                  onClick={() => setBrand(b.id)}
                  label={b.name.toUpperCase()}
                  count={counts[b.id] ?? 0}
                  accent={b.accent}
                  monogram={b.monogram}
                />
              ))}
            </div>
            <Bumper label="RB" onClick={() => scrollTabs(1)} />
          </div>
        </div>

        {/* ===== Corpo: painel + grade ===== */}
        <div className="relative z-10 grid flex-1 gap-3 p-3 sm:p-4 lg:grid-cols-[clamp(240px,22vw,300px)_1fr]">
          {/* painel de detalhe (desktop) */}
          {selected && (
            <DetailPanel key={selected.id} car={selected} className="hidden lg:flex" />
          )}

          <div className="min-w-0">
            {/* barra de selecionado (mobile) */}
            {selected && (
              <MobileSelectedBar car={selected} className="mb-3 lg:hidden" />
            )}

            {/* grade */}
            {visible.length === 0 ? (
              <EmptyState
                brandName={brand === "all" ? undefined : activeBrandName}
                onReset={() => {
                  setBrand("all");
                  setFilter("Todos");
                  setTerm("");
                }}
              />
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4"
              >
                <AnimatePresence mode="popLayout">
                  {visible.map((car, i) => (
                    <GameCard
                      key={car.id}
                      car={car}
                      index={i}
                      selected={selected?.id === car.id}
                      onHover={() => setSelectedId(car.id)}
                      onActivate={() => handleCardActivate(car)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>

        {/* ===== Barra de ações (rodapé do "game") ===== */}
        <div className="sticky bottom-0 z-30 border-t border-ink-500/60 bg-ink-950/85 backdrop-blur-xl">
          {/* popovers */}
          <AnimatePresence>
            {popover && (
              <>
                <button
                  type="button"
                  aria-label="Fechar"
                  onClick={() => setPopover(null)}
                  className="fixed inset-0 z-0 cursor-default"
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-3 z-10 mb-2 w-60 rounded-xl border border-ink-500/70 bg-ink-800/95 p-2 shadow-card backdrop-blur-xl sm:left-4"
                >
                  {popover === "filter" && (
                    <PopList
                      title="Filtrar por"
                      items={FILTERS.map((f) => ({
                        key: f,
                        label: f,
                        active: filter === f,
                        onClick: () => {
                          setFilter(f);
                          setPopover(null);
                        },
                      }))}
                    />
                  )}
                  {popover === "sort" && (
                    <PopList
                      title="Ordenar por"
                      items={SORTS.map((s) => ({
                        key: s.value,
                        label: s.label,
                        active: sort === s.value,
                        onClick: () => {
                          setSort(s.value);
                          setPopover(null);
                        },
                      }))}
                    />
                  )}
                  {popover === "menu" && (
                    <div className="space-y-0.5">
                      <p className="px-2 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Navegação
                      </p>
                      {[
                        { href: "/favoritos", label: "Favoritos" },
                        { href: "/sobre", label: "Sobre" },
                        { href: "/contato", label: "Contato" },
                        { href: "/login", label: "Conta / Login" },
                        { href: "/privacidade", label: "Privacidade" },
                        { href: "/termos", label: "Termos de Uso" },
                        { href: "/cookies", label: "Cookies" },
                      ].map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="block rounded-lg px-2.5 py-2 text-sm text-slate-200 hover:bg-white/5 hover:text-white"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="no-scrollbar flex items-center gap-1 overflow-x-auto px-2 py-2 sm:gap-2 sm:px-4">
            <ActionKey
              k="A"
              label="Detalhes"
              disabled={!selected}
              onClick={() =>
                selected && router.push(`/carros/${selected.slug}`)
              }
            />
            <ActionKey
              icon={<HeartIcon filled={!!selected && isFavorite(selected.id)} />}
              label="Favoritar"
              active={!!selected && isFavorite(selected.id)}
              disabled={!selected}
              onClick={() => {
                if (!selected) return;
                const now = toggleFavorite(selected.id);
                const name = `${selected.brandName} ${selected.model}`;
                toast(
                  now
                    ? `${name} adicionado aos favoritos`
                    : `${name} removido dos favoritos`,
                  now ? "success" : "info",
                );
              }}
            />
            <ActionKey
              icon={<ScaleIcon />}
              label="Comparar"
              active={!!selected && isComparing(selected.id)}
              disabled={!selected}
              onClick={() => {
                if (!selected) return;
                const res = toggleCompare(selected.id);
                const name = `${selected.brandName} ${selected.model}`;
                if (res.full) {
                  toast(`Você pode comparar até ${maxCompare} veículos`, "info");
                  return;
                }
                toast(
                  res.added
                    ? `${name} adicionado à comparação`
                    : `${name} removido da comparação`,
                  res.added ? "success" : "info",
                );
              }}
            />
            <ActionKey
              k="X"
              icon={<SortIcon />}
              label="Ordenar"
              active={popover === "sort"}
              onClick={() => setPopover(popover === "sort" ? null : "sort")}
            />
            <ActionKey
              k="Y"
              icon={<SlidersIcon />}
              label="Filtrar"
              active={popover === "filter"}
              badge={filter !== "Todos" ? filter : undefined}
              onClick={() => setPopover(popover === "filter" ? null : "filter")}
            />
            <ActionKey
              icon={<MenuIcon />}
              label="Menu"
              active={popover === "menu"}
              onClick={() => setPopover(popover === "menu" ? null : "menu")}
            />

            <span className="ml-auto select-none whitespace-nowrap pr-1 font-display text-xs font-bold uppercase tracking-[0.25em] text-slate-600 sm:text-sm">
              Protótipo · Demo Build
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Subcomponentes ─────────────────────────── */

function ClassBadge({ cls, index }: { cls: Car["perfClass"]; index: number }) {
  return (
    <span className="inline-flex shrink-0 overflow-hidden rounded text-[11px] font-bold leading-none ring-1 ring-black/30">
      <span
        className="px-1.5 py-1 text-ink-950"
        style={{ background: perfClassColor(cls) }}
      >
        {cls}
      </span>
      <span className="bg-ink-800 px-1.5 py-1 text-white">{index}</span>
    </span>
  );
}

function Bumper({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Rolar abas (${label})`}
      className="hidden shrink-0 items-center gap-1 rounded-md border border-ink-500/70 bg-ink-800/70 px-2 py-2 text-[10px] font-bold text-slate-400 transition-colors hover:border-neon/40 hover:text-white sm:inline-flex"
    >
      {label === "LB" ? (
        <ChevronLeftIcon className="text-sm" />
      ) : (
        <ChevronRightIcon className="text-sm" />
      )}
      {label}
    </button>
  );
}

function BrandTab({
  active,
  onClick,
  label,
  count,
  accent,
  monogram,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  accent?: string;
  monogram?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors",
        active
          ? "bg-white text-ink-950"
          : "bg-ink-800/60 text-slate-400 hover:bg-ink-700/70 hover:text-white",
      )}
    >
      {active && (
        <motion.span
          layoutId="game-tab"
          className="absolute inset-x-2 -top-px h-0.5 rounded-full bg-neon"
        />
      )}
      {monogram && (
        <span
          className="grid h-4 w-4 shrink-0 place-items-center rounded-full text-[8px] font-bold text-white"
          style={{ background: accent }}
        >
          {monogram.charAt(0)}
        </span>
      )}
      {label}
      <span
        className={cn(
          "rounded px-1 text-[9px]",
          active ? "bg-ink-900/10 text-ink-700" : "bg-black/30 text-slate-500",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function DetailPanel({ car, className }: { car: Car; className?: string }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-ink-500/70 bg-ink-800/70",
        className,
      )}
    >
      {/* imagem + categoria */}
      <div className="relative aspect-[16/11] w-full bg-gradient-to-b from-ink-700 to-ink-900">
        <Image
          src={car.image}
          alt={`${car.brandName} ${car.model}`}
          fill
          sizes="300px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
        <div className="absolute left-2 top-2">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neon-soft">
            Coleção
          </p>
          <p className="font-display text-sm font-extrabold uppercase leading-none text-white">
            {car.category}
          </p>
        </div>
        {/* dots da galeria */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {car.gallery.slice(0, 3).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                i === 0 ? "bg-neon" : "bg-white/30",
              )}
            />
          ))}
        </div>
      </div>

      {/* faixa de tipo */}
      <div
        className="px-3 py-1.5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-ink-950"
        style={{ background: typeBarColor(car.type) }}
      >
        {car.type}
      </div>

      {/* stats */}
      <div className="divide-y divide-ink-500/50">
        <StatRow icon={<BoltIcon />} label="Potência" value={car.specs.potencia} />
        <StatRow icon={<GaugeIcon />} label="Torque" value={car.specs.torque} />
        <StatRow
          icon={<BatteryIcon />}
          label="Autonomia"
          value={car.specs.autonomia}
        />
        <StatRow icon={<WeightIcon />} label="Peso" value={car.specs.peso} />
      </div>

      {/* marca / logo */}
      <div className="flex items-center justify-center border-y border-ink-500/50 bg-ink-900/60 py-3">
        <Image
          src={site.logo}
          alt={site.name}
          width={120}
          height={28}
          className="h-7 w-auto object-contain opacity-90"
        />
      </div>

      {/* classe + tração */}
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <ClassBadge cls={car.perfClass} index={car.perfIndex} />
        <span className="inline-flex items-center gap-1.5 rounded-md border border-ink-500/70 bg-ink-700/60 px-2.5 py-1 text-xs font-bold text-slate-200">
          <GaugeIcon className="text-sm text-slate-400" />
          {drivetrainShort(car.specs.tracao)}
        </span>
      </div>

      {/* preço */}
      <div className="flex items-center justify-between gap-2 bg-amber-400/90 px-3 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-base font-extrabold text-ink-950">
          <CoinIcon className="text-base" />
          {formatBRL(car.price)}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-ink-950/70">
          protótipo
        </span>
      </div>

      {/* ações */}
      <div className="mt-auto flex flex-col gap-2 p-3">
        <Link href={`/carros/${car.slug}`} className="btn-primary w-full py-2.5 text-sm">
          Ver detalhes <ArrowRightIcon />
        </Link>
      </div>
    </motion.aside>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2">
      <span className="inline-flex items-center gap-2 text-xs text-slate-400">
        <span className="text-sm text-neon/80">{icon}</span>
        {label}
      </span>
      <span className="text-right text-xs font-bold text-white">{value}</span>
    </div>
  );
}

function MobileSelectedBar({ car, className }: { car: Car; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-ink-500/70 bg-ink-800/70 p-2",
        className,
      )}
    >
      <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md border border-ink-500 bg-ink-700">
        <Image src={car.image} alt={car.model} fill sizes="64px" className="object-cover" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white">
          {car.brandName} {car.model}
        </p>
        <div className="mt-0.5 flex items-center gap-2">
          <ClassBadge cls={car.perfClass} index={car.perfIndex} />
          <span className="text-xs font-bold text-amber-300">
            {formatBRL(car.price)}
          </span>
        </div>
      </div>
      <Link
        href={`/carros/${car.slug}`}
        className="btn-primary shrink-0 px-3 py-2 text-xs"
      >
        Ver
      </Link>
    </div>
  );
}

function GameCard({
  car,
  index,
  selected,
  onHover,
  onActivate,
}: {
  car: Car;
  index: number;
  selected: boolean;
  onHover: () => void;
  onActivate: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.25) }}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onActivate}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-ink-800/70 text-left transition-all duration-200",
        selected
          ? "border-neon ring-2 ring-neon/40"
          : "border-ink-500/60 hover:border-ink-400",
      )}
    >
      {/* cabeçalho */}
      <div className="px-2.5 pb-1 pt-2">
        <p className="truncate font-display text-[13px] font-extrabold uppercase leading-tight text-white">
          {car.model}
        </p>
        <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          {car.year} {car.brandName}
        </p>
      </div>

      {/* imagem */}
      <div className="relative aspect-[16/10] w-full bg-gradient-to-b from-ink-700/60 to-ink-900">
        <Image
          src={car.image}
          alt={`${car.brandName} ${car.model}`}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* destaque/ver */}
        <span
          className={cn(
            "absolute right-1.5 top-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white opacity-0 backdrop-blur-sm transition-opacity",
            selected ? "opacity-100" : "group-hover:opacity-100",
          )}
        >
          {selected ? "Abrir ›" : "Ver"}
        </span>
      </div>

      {/* barra de tipo + índice */}
      <div className="relative flex items-center">
        <div
          className="flex-1 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-950"
          style={{ background: typeBarColor(car.type) }}
        >
          {car.type}
        </div>
        <span className="flex shrink-0 overflow-hidden text-[10px] font-bold leading-none">
          <span
            className="px-1.5 py-1.5 text-ink-950"
            style={{ background: perfClassColor(car.perfClass) }}
          >
            {car.perfClass}
          </span>
          <span className="bg-ink-900 px-1.5 py-1.5 text-white">
            {car.perfIndex}
          </span>
        </span>
      </div>
    </motion.button>
  );
}

function ActionKey({
  k,
  icon,
  label,
  onClick,
  active,
  disabled,
  badge,
}: {
  k?: string;
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors disabled:opacity-40",
        active ? "bg-neon/10 text-neon-soft" : "text-slate-300 hover:bg-white/5 hover:text-white",
      )}
    >
      {k && (
        <span className="grid h-5 w-5 place-items-center rounded-full border border-ink-400/80 bg-ink-700/80 text-[10px] font-bold text-white">
          {k}
        </span>
      )}
      {icon && <span className="text-sm">{icon}</span>}
      <span className="whitespace-nowrap">{label}</span>
      {badge && (
        <span className="ml-0.5 rounded bg-neon/20 px-1 text-[9px] font-bold text-neon-soft">
          {badge}
        </span>
      )}
    </button>
  );
}

function PopList({
  title,
  items,
}: {
  title: string;
  items: { key: string; label: string; active: boolean; onClick: () => void }[];
}) {
  return (
    <div className="space-y-0.5">
      <p className="px-2 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          onClick={it.onClick}
          className={cn(
            "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors",
            it.active
              ? "bg-neon/10 text-neon-soft"
              : "text-slate-200 hover:bg-white/5 hover:text-white",
          )}
        >
          {it.label}
          {it.active && <span className="text-neon">●</span>}
        </button>
      ))}
    </div>
  );
}

function EmptyState({
  brandName,
  onReset,
}: {
  brandName?: string;
  onReset: () => void;
}) {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-ink-500/70 bg-ink-800/40 px-6 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-neon/30 bg-neon/10 text-2xl text-neon">
        <BoltIcon />
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          {brandName ? `Nenhum ${brandName} disponível` : "Nenhum veículo encontrado"}
        </h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-400">
          {brandName
            ? "Novos modelos desta marca chegam em breve."
            : "Ajuste a busca ou os filtros para ver mais opções."}
        </p>
      </div>
      <button type="button" onClick={onReset} className="btn-outline">
        Limpar filtros
      </button>
    </div>
  );
}
