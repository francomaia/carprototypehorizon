import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { CatalogClient } from "@/components/CatalogClient";
import { CardSkeletonGrid } from "@/components/CardSkeleton";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <div className="container-px py-12">
            <CardSkeletonGrid count={8} />
          </div>
        }
      >
        <CatalogClient />
      </Suspense>
    </>
  );
}
