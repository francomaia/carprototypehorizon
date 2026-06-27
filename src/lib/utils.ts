/** Formata um valor inteiro em reais como moeda BRL. */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Junta classes condicionalmente (substituto leve de clsx). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Simulação simples de financiamento (apenas demonstrativo).
 * Calcula a parcela com juros compostos básicos.
 */
export function simulateInstallment(
  price: number,
  downPaymentPct: number,
  months: number,
  monthlyRate = 0.0149,
): { financed: number; installment: number; total: number } {
  const down = price * downPaymentPct;
  const financed = price - down;
  const i = monthlyRate;
  const factor = (i * Math.pow(1 + i, months)) / (Math.pow(1 + i, months) - 1);
  const installment = financed * factor;
  return {
    financed,
    installment,
    total: installment * months + down,
  };
}
