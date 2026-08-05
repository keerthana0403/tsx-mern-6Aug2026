const PALETTE = [
  { bg: "bg-amber-100", border: "border-amber-400", text: "text-amber-900" },
  {
    bg: "bg-emerald-100",
    border: "border-emerald-400",
    text: "text-emerald-900",
  },
  { bg: "bg-sky-100", border: "border-sky-400", text: "text-sky-900" },
  { bg: "bg-rose-100", border: "border-rose-400", text: "text-rose-900" },
  { bg: "bg-violet-100", border: "border-violet-400", text: "text-violet-900" },
  { bg: "bg-teal-100", border: "border-teal-400", text: "text-teal-900" },
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getSpeciesColorClasses(speciesName: string) {
  const index = hashString(speciesName) % PALETTE.length;
  return PALETTE[index];
}
