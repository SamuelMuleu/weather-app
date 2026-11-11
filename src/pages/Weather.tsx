import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CloudOff, RotateCw } from "lucide-react";
import Logo from "@/components/Logo";
import SearchBox from "@/components/SearchBox";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import TodayDetails from "@/components/TodayDetails";
import Forecast from "@/components/Forecast";
import { fetchWeather } from "@/features/weatherSlice";
import { WeatherQuery } from "@/lib/weatherApi";
import { useAppDispatch, useAppSelector } from "@/store";

function useWeatherQuery(): WeatherQuery | null {
  const [params] = useSearchParams();
  const lat = Number(params.get("lat"));
  const lon = Number(params.get("lon"));
  if (params.get("lat") && params.get("lon") && Number.isFinite(lat) && Number.isFinite(lon)) return { lat, lon };
  // Legacy links: /weatherstatus?city=Rio de Janeiro
  const city = params.get("city");
  return city ? { q: city } : null;
}

function Skeleton() {
  return (
    <div className="grid animate-pulse gap-4 lg:grid-cols-2" aria-busy="true" aria-label="Carregando previsão">
      <div className="h-80 rounded-2xl bg-bg_table sm:h-[26rem]" />
      <div className="flex flex-col gap-4">
        <div className="h-64 rounded-2xl bg-bg_table" />
        <div className="h-40 rounded-2xl bg-bg_table" />
      </div>
    </div>
  );
}

export default function Weather() {
  const query = useWeatherQuery();
  const [params] = useSearchParams();
  const displayName = params.get("name") ?? undefined;
  const dispatch = useAppDispatch();
  const { status, current, forecast, error } = useAppSelector((s) => s.weather);
  const queryKey = JSON.stringify(query);

  useEffect(() => {
    if (!query) return;
    window.scrollTo(0, 0);
    const request = dispatch(fetchWeather(query));
    return () => request.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey, dispatch]);

  useEffect(() => {
    if (current) document.title = `${Math.round(current.temp)}°c em ${displayName || current.name} | Weather`;
  }, [current, displayName]);

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-12 sm:px-6">
      <header className="flex items-center gap-4 py-6">
        <Logo compact />
        <SearchBox className="max-w-xl" />
      </header>

      <main>
        {!query ? (
          <p className="py-24 text-center text-gray-400">
            Nenhum local informado.{" "}
            <Link to="/" className="text-blue_base underline underline-offset-4">
              Buscar uma cidade
            </Link>
          </p>
        ) : status === "failed" ? (
          <div role="alert" className="flex flex-col items-center gap-4 rounded-2xl bg-bg_table px-6 py-20 text-center">
            <CloudOff className="size-12 text-gray-500" aria-hidden />
            <p className="max-w-md text-lg text-gray-200">{error}</p>
            <button
              onClick={() => dispatch(fetchWeather(query))}
              className="flex items-center gap-2 rounded-xl bg-blue_base px-5 py-2.5 font-bold text-bg_principal transition-opacity hover:opacity-90"
            >
              <RotateCw className="size-4" aria-hidden /> Tentar novamente
            </button>
          </div>
        ) : status !== "succeeded" || !current || !forecast ? (
          <Skeleton />
        ) : (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 lg:grid-cols-2"
          >
            <CurrentWeatherCard weather={current} displayName={displayName} />
            <div className="flex flex-col gap-4">
              <TodayDetails weather={current} popNow={forecast.popNow} />
              <Forecast days={forecast.days} />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
