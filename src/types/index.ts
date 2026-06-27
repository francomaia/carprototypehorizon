// Tipos centrais do catálogo.
// Mantenha este arquivo como contrato de dados — ao plugar uma API real,
// basta mapear a resposta para estas interfaces.

export type CarType = "Elétrico" | "Híbrido" | "Performance";

export type CarCategory =
  | "SUV Elétrico"
  | "SUV Premium"
  | "Sedan Premium"
  | "Compacto Esportivo"
  | "Hatch Elétrico"
  | "Crossover Premium";

export interface CarSpecs {
  potencia: string;
  torque: string;
  autonomia: string;
  recarga: string;
  aceleracao: string; // 0 a 100 km/h
  motor: string;
  bateria: string;
  tracao: string;
  peso: string;
  portaMalas: string;
  garantia: string;
  anoModelo: string;
}

export interface Car {
  id: string;
  slug: string;
  brandId: string;
  brandName: string;
  model: string;
  year: number;
  type: CarType;
  category: CarCategory;
  /** Preço protótipo (BRL, inteiro em reais). Valor demonstrativo. */
  price: number;
  /** Tag de destaque exibida no card (Luxury, XPower, Max, Performance...). */
  highlight: string;
  featured?: boolean;
  image: string;
  gallery: string[];
  /** Resumo comercial curto. */
  summary: string;
  specs: CarSpecs;
  differentials: string[];
  safety: string[];
  technology: string[];
}

export interface Brand {
  id: string;
  name: string;
  /** Monograma exibido no ícone placeholder enquanto não há logo oficial. */
  monogram: string;
  /** Cor de acento do placeholder (tailwind-friendly hex). */
  accent: string;
  /**
   * Caminho opcional para a logo oficial. Quando definido,
   * BrandIconPlaceholder renderiza a imagem no lugar do monograma.
   */
  logo?: string;
}

export type FilterTag =
  | "Todos"
  | "Elétrico"
  | "Híbrido"
  | "Performance"
  | "SUV"
  | "Premium";

export type SortOption = "destaque" | "menor-preco" | "maior-preco" | "nome";
