import { format, isValid, parseISO } from "date-fns";

/** Format API or form dates; pass-through for values like "Jan 2023". */
export function formatDisplayDate(
  value: string | null | undefined,
  pattern = "MMM yyyy",
): string {
  if (!value?.trim()) return "";

  const iso = parseISO(value);
  if (isValid(iso)) {
    return format(iso, pattern);
  }

  return value;
}

export function formatDateRange(
  startDate: string,
  endDate: string | null | undefined,
  current: boolean,
): string {
  const start = formatDisplayDate(startDate);
  if (current) return `${start} - Present`;
  if (!endDate) return start;
  return `${start} - ${formatDisplayDate(endDate)}`;
}
