"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Car, FilterTag, SortOption } from "@/types";
import { cars } from "@/data/cars";
import { brands } from "@/data/brands";
import { BrandTabs } from "./BrandTabs";
import { SearchBar } from "./SearchBar";
import { FilterBar } from "./FilterBar";
import { CarGrid } from "./CarGrid";
import { CardSkeletonGrid } from "./CardSkeleton";

function matchesTerm(car: Car, term: string): boolean {
  if (!term) return true;
  const q = term.toLowerCase();
  return [
    car.model,
    car.brandName,
    car.type,
    car.category,
    car.highlight,
  ].some((field) => field.toLowerCase().includes(q));
}

function matchesFilter(car: Car, filter: FilterTag): boolean {
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

export function CatalogClient() {
  const searchParams = useSearchParams();
  const [term, setTerm] = useState("");
  const [brand, setBrand] = useState("all");
  const [filter, setFilter] = useState<FilterTag>("Todos");
  const [sort, setSort] = useState<SortOption>("destaque");
  const [loading, setLoading] = useState(true);

  // Seed da busca via querystring (?q=) vindo do header.
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setTerm(q);
  }, [searchParams]);

  // Skeleton inicial (efeito shimmer).
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  // Base filtrada por busca + filtro (usada também para contagem das abas).
  const baseFiltered = useMemo(
    () => cars.filter((c) => matchesTerm(c, term) && matchesFilter(c, filter)),
    [term, filter],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const b of brands) {
      map[b.id] = baseFiltered.filter((c) => c.brandId === b.id).length;
    }
    return map;
  }, [baseFiltered]);

  const visible = useMemo(() => {
    let list = baseFiltered.filter(
      (c) => brand === "all" || c.brandId === brand,
    );
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "menor-preco":
          return a.price - b.price;
        case "maior-preco":
          return b.price - a.price;
        case "nome":
          return a.model.localeCompare(b.model);
        case "destaque":
        default:
          return (
            Number(b.featured ?? false) - Number(a.featured ?? false) ||
            b.price - a.price
          );
      }
    });
    return list;
  }, [baseFiltered, brand, sort]);

  const selectedBrand = brands.find((b) => b.id === brand);

  return (
    <section id="catalogo" className="container-px scroll-mt-20 py-12">
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-soft">
          Catálogo
        </span>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Escolha por marca
        </h2>
        <p className="max-w-2xl text-sm text-slate-400">
          Navegue pelas montadoras, filtre por tipo e encontre o veículo ideal.
          Todos os valores e imagens são demonstrativos de protótipo.
        </p>
      </div>

      {/* Busca */}
      <div className="mb-5">
        <SearchBar value={term} onChange={setTerm} className="max-w-xl" />
      </div>

      {/* Abas de marca */}
      <div className="mb-6">
        <BrandTabs
          brands={brands}
          active={brand}
          onChange={setBrand}
          counts={counts}
          totalCount={baseFiltered.length}
        />
      </div>

      {/* Filtros + ordenação */}
      <div className="mb-8">
        <FilterBar
          filter={filter}
          onFilter={setFilter}
          sort={sort}
          onSort={setSort}
        />
      </div>

      {/* Resultados */}
      {loading ? (
        <CardSkeletonGrid count={8} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={brand + filter + term}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <CarGrid
              cars={visible}
              emptyTitle={
                selectedBrand
                  ? `Nenhum ${selectedBrand.name} disponível agora`
                  : "Nenhum veículo encontrado"
              }
              emptyHint={
                selectedBrand
                  ? "Novos modelos desta marca chegam em breve. Explore outras marcas enquanto isso."
                  : "Ajuste a busca ou os filtros para ver mais opções."
              }
            />
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
