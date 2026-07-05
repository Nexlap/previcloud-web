/** Formato italiano deterministico (SSR-safe, senza ICU/toLocaleString). Es. 2340 → "2.340,00" */
export function formatNumeroIT(value: number): string {
  const negative = value < 0;
  const fixed = Math.abs(value).toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const formatted = `${intFormatted},${decPart}`;
  return negative ? `-${formatted}` : formatted;
}
