import Image from "next/image";
import type { Brand } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  brand: Brand;
  size?: number;
  className?: string;
}

/**
 * Ícone circular de marca.
 *
 * Enquanto não houver a logo oficial, renderiza um monograma sobre um disco
 * com a cor de acento da marca. Assim que `brand.logo` for preenchido em
 * src/data/brands.ts, a imagem real é exibida automaticamente — nenhuma outra
 * mudança é necessária.
 */
export function BrandIconPlaceholder({ brand, size = 36, className }: Props) {
  if (brand.logo) {
    return (
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white",
          className,
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src={brand.logo}
          alt={`Logo ${brand.name}`}
          width={size}
          height={size}
          className="h-full w-full object-contain p-1"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center rounded-full font-display font-bold leading-none text-white ring-1 ring-white/10",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, size * (brand.monogram.length > 1 ? 0.32 : 0.42)),
        background: `radial-gradient(120% 120% at 30% 20%, ${brand.accent}, #0b0e13 130%)`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.06)`,
      }}
    >
      {brand.monogram}
    </span>
  );
}
