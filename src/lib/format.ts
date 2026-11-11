export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Formats a UTC timestamp in the city's local time (OpenWeather gives the offset in seconds). */
export function formatLocal(dt: number, timezone: number) {
  const local = new Date((dt + timezone) * 1000);
  const date = local.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const time = local.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
  return { date: capitalize(date), time };
}

/** "2026-11-12" -> "qui" */
export function weekdayShort(isoDate: string) {
  return new Date(`${isoDate}T12:00:00Z`)
    .toLocaleDateString("pt-BR", { weekday: "short", timeZone: "UTC" })
    .replace(".", "");
}
