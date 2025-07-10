export function formatCurrency(symbol: string, amount: number): string {
  const parts = Number(amount)
    .toFixed(2)
    .split('.');

  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = parts[1];

  const formatted = `${integerPart},${decimalPart}`;

  return symbol === '%'
    ? `${formatted} ${symbol}`
    : `${symbol} ${formatted}`;
}
