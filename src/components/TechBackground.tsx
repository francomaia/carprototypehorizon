/**
 * Fundo tecnológico discreto: grade sutil + glow + linha de varredura.
 * Puramente decorativo (aria-hidden) e leve — apenas CSS, sem JS.
 */
export function TechBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-tech-grid bg-[size:64px_64px] opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[520px] translate-x-1/4 translate-y-1/4 rounded-full bg-neon/10 blur-[140px]" />
    </div>
  );
}
