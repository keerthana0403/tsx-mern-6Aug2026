export function safeParseNumber(value: string): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function formatHeightInMeters(heightCm: string): string {
  const cm = safeParseNumber(heightCm);
  if (cm === null) return "Unknown";
  return `${(cm / 100).toFixed(2)} m`;
}

export function formatMassInKg(massKg: string): string {
  const kg = safeParseNumber(massKg);
  if (kg === null) return "Unknown";
  return `${kg} kg`;
}

export function formatCreatedDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "Unknown";

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
