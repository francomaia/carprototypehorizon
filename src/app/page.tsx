import { Suspense } from "react";
import { GameCatalog } from "@/components/GameCatalog";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="container-px py-6">
          <div className="h-[80vh] animate-pulse rounded-2xl border border-ink-500/70 bg-ink-800/40" />
        </div>
      }
    >
      <GameCatalog />
    </Suspense>
  );
}
