"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CompareProvider } from "@/context/CompareContext";
import { UIProvider } from "@/context/UIContext";

/** Agrega todos os provedores de estado client-side da aplicação. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <FavoritesProvider>
          <CompareProvider>
            <UIProvider>{children}</UIProvider>
          </CompareProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
