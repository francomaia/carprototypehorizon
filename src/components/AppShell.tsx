"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * A home ("/") é uma "tela de catálogo" estilo game e tem seu próprio HUD e
 * barra de ações — portanto não exibe o Header/Footer institucionais. As demais
 * páginas mantêm a navegação padrão do site.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isGameScreen = pathname === "/";

  return (
    <>
      {!isGameScreen && <Header />}
      <main className="relative">{children}</main>
      {!isGameScreen && <Footer />}
    </>
  );
}
