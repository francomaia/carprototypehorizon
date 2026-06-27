/** Skeleton com efeito shimmer exibido enquanto o catálogo "carrega". */
export function CardSkeleton() {
  return (
    <div className="surface shimmer overflow-hidden">
      <div className="aspect-[16/10] w-full bg-ink-700/60" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-24 rounded bg-ink-600/70" />
        <div className="h-5 w-3/4 rounded bg-ink-600/70" />
        <div className="h-3 w-1/2 rounded bg-ink-600/70" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-28 rounded bg-ink-600/70" />
          <div className="h-9 w-24 rounded-xl bg-ink-600/70" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
