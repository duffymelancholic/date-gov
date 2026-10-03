export const CASE_NUMBER = "IVY-2026-0001";
export const MAKER = "duffymelancholic";

export const DEFAULT_ME = "me";
export const DEFAULT_YOU = "Ivy";

export function readName(value: string | null, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}
