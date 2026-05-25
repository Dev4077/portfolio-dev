/** Coerce list API data to an array (guards against bad/missing responses). */
export function asArray<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}
