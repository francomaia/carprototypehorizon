import type { Brand } from "@/types";

/**
 * Marcas do catálogo.
 *
 * Os ícones são placeholders gerados a partir do monograma + cor de acento
 * (ver componente BrandIconPlaceholder). Para usar a logo oficial de uma marca,
 * adicione um arquivo em /public/brand e preencha o campo `logo` abaixo, por
 * exemplo: logo: "/brand/tesla.svg".
 */
export const brands: Brand[] = [
  { id: "mg", name: "MG", monogram: "MG", accent: "#e4002b" },
  { id: "geely", name: "Geely", monogram: "G", accent: "#0a5bd3" },
  { id: "byd", name: "BYD", monogram: "BYD", accent: "#1f8a4c" },
  { id: "tesla", name: "Tesla", monogram: "T", accent: "#cc0000" },
  { id: "volvo", name: "Volvo", monogram: "V", accent: "#2a4d69" },
  { id: "bmw", name: "BMW", monogram: "BM", accent: "#1c69d4" },
  { id: "audi", name: "Audi", monogram: "A", accent: "#bb0a30" },
  { id: "mercedes", name: "Mercedes-Benz", monogram: "MB", accent: "#00adef" },
  { id: "porsche", name: "Porsche", monogram: "P", accent: "#caa46a" },
  { id: "hyundai", name: "Hyundai", monogram: "H", accent: "#0064c8" },
];

export const brandById = (id: string): Brand | undefined =>
  brands.find((b) => b.id === id);
