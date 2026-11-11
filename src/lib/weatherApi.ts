import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: { appid: import.meta.env.VITE_APP_ID, lang: "pt_br" },
  timeout: 10000,
});

export interface Location {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number;
  /** km/h */
  wind: number;
  description: string;
  icon: string;
  /** Unix seconds (UTC) */
  dt: number;
  /** Offset from UTC in seconds */
  timezone: number;
}

export interface ForecastDay {
  /** YYYY-MM-DD in the city's local time */
  date: string;
  min: number;
  max: number;
  /** 0–100 */
  pop: number;
  description: string;
  icon: string;
}

export interface Forecast {
  /** Rain probability for the next 3 hours, 0–100 */
  popNow: number;
  days: ForecastDay[];
}

interface ApiWeatherEntry {
  dt: number;
  main: { temp: number; temp_min: number; temp_max: number; feels_like: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  pop?: number;
}

/** App route for a location's forecast */
export function weatherPath(l: Pick<Location, "lat" | "lon" | "name">) {
  const params = new URLSearchParams({ lat: l.lat.toFixed(4), lon: l.lon.toFixed(4), name: l.name });
  return `/weather?${params}`;
}

export async function searchLocations(query: string, signal?: AbortSignal): Promise<Location[]> {
  const { data } = await api.get<Location[]>("/geo/1.0/direct", {
    params: { q: query, limit: 5 },
    signal,
  });
  // The geocoding API can return the same city twice (e.g. different admin levels)
  const seen = new Set<string>();
  return data
    .map(({ name, country, state, lat, lon }) => ({ name, country, state, lat, lon }))
    .filter((l) => {
      const key = `${l.name}|${l.state}|${l.country}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export async function reverseGeocode(lat: number, lon: number): Promise<Location | null> {
  const { data } = await api.get<Location[]>("/geo/1.0/reverse", { params: { lat, lon, limit: 1 } });
  return data[0] ?? null;
}

export type WeatherQuery = { lat: number; lon: number } | { q: string };

export async function getCurrentWeather(query: WeatherQuery): Promise<CurrentWeather> {
  const { data } = await api.get("/data/2.5/weather", { params: { ...query, units: "metric" } });
  return {
    id: data.id,
    name: data.name,
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon,
    temp: data.main.temp,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    wind: data.wind.speed * 3.6, // API returns m/s with metric units
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    dt: data.dt,
    timezone: data.timezone,
  };
}

/** Local calendar date (YYYY-MM-DD) of a UTC timestamp in a city with the given offset. */
export function localDate(dt: number, timezone: number) {
  return new Date((dt + timezone) * 1000).toISOString().slice(0, 10);
}

export async function getForecast(lat: number, lon: number): Promise<Forecast> {
  const { data } = await api.get("/data/2.5/forecast", { params: { lat, lon, units: "metric" } });
  const timezone: number = data.city.timezone;
  const list: ApiWeatherEntry[] = data.list;
  const today = localDate(Date.now() / 1000, timezone);

  // The free API returns 3-hour steps for 5 days; group them by local day
  const byDay = new Map<string, ApiWeatherEntry[]>();
  for (const entry of list) {
    const day = localDate(entry.dt, timezone);
    if (day === today) continue;
    byDay.set(day, [...(byDay.get(day) ?? []), entry]);
  }

  const days: ForecastDay[] = [...byDay.entries()].slice(0, 5).map(([date, entries]) => {
    // Represent the day by the entry closest to noon, using its daytime icon
    const noon = entries.reduce((best, e) => {
      const h = new Date((e.dt + timezone) * 1000).getUTCHours();
      const bh = new Date((best.dt + timezone) * 1000).getUTCHours();
      return Math.abs(h - 12) < Math.abs(bh - 12) ? e : best;
    });
    return {
      date,
      min: Math.min(...entries.map((e) => e.main.temp_min)),
      max: Math.max(...entries.map((e) => e.main.temp_max)),
      pop: Math.round(Math.max(...entries.map((e) => e.pop ?? 0)) * 100),
      description: noon.weather[0].description,
      icon: noon.weather[0].icon.replace("n", "d"),
    };
  });

  return { popNow: Math.round((list[0]?.pop ?? 0) * 100), days };
}

export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 404) return "Não encontramos esse local. Confira o nome e tente novamente.";
    if (status === 401) return "Chave da API inválida. Verifique a variável VITE_APP_ID.";
    if (status === 429) return "Muitas consultas em pouco tempo. Aguarde um instante e tente de novo.";
    if (!error.response) return "Sem conexão com o serviço de clima. Verifique sua internet.";
  }
  return "Algo deu errado ao buscar o clima. Tente novamente.";
}
