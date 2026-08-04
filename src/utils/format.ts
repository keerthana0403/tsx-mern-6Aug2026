export function safeParseNumber(value: string): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
