export function formatCurrency(
  amount: number,
  currency: string = "BRL",
  locale = "pt-BR",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

