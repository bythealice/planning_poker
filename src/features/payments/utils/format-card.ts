export function formatCard(cardNumber: string) {
  const cleaned = cardNumber.replace(/\D/g, "").slice(-4);
  return `**** **** **** ${cleaned.padStart(4, "0")}`;
}

