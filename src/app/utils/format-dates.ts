import { Language } from "@/context/LanguageContext";

/**
 * Returns a human-readable string representing the time difference between
 * the given timestamp and the current time, formatted based on the user's language.
 *
 * - If the difference is less than 7 days, it returns a relative time string (e.g., "3 hours ago").
 * - If the date is within the current year, it returns a short date and time (e.g., "Apr 21, 14:35").
 * - Otherwise, it returns a full date with year (e.g., "Apr 21, 2023").
 *
 * @param timestamp - The original timestamp in milliseconds.
 * @param lang - The locale/language code to use for formatting (e.g., "en", "tr").
 * @returns A localized, human-friendly date string.
 */
export function getSmartDate(timestamp: number, lang: Language): string {
  const now = Date.now();
  const date = new Date(timestamp);
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days < 7) {
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });

    if (seconds < 60) return rtf.format(-seconds, "second");
    if (minutes < 60) return rtf.format(-minutes, "minute");
    if (hours < 24) return rtf.format(-hours, "hour");

    return rtf.format(-days, "day");
  }

  const nowYear = new Date().getFullYear();
  const dateYear = date.getFullYear();

  if (nowYear === dateYear) {
    return new Intl.DateTimeFormat(lang, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  return new Intl.DateTimeFormat(lang, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
