import { CurrentWeather } from "@/lib/weatherApi";
import { weatherVisuals } from "@/lib/visuals";
import { capitalize, formatLocal } from "@/lib/format";

export default function CurrentWeatherCard({ weather, displayName }: { weather: CurrentWeather; displayName?: string }) {
  const { image, background } = weatherVisuals(weather.icon);
  const { date, time } = formatLocal(weather.dt, weather.timezone);

  return (
    <section
      aria-label={`Clima atual em ${weather.name}`}
      className="relative flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-2xl bg-cover bg-center p-5 sm:min-h-[26rem] sm:p-7"
      style={{ backgroundImage: `url("${background}")` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white sm:text-2xl">
            {displayName || weather.name}, {weather.country}
          </h1>
          <p className="mt-1 text-sm text-gray-200 sm:text-base">{date}</p>
        </div>
        <p className="text-sm font-semibold text-gray-100 sm:text-base" title="Horário local">
          {time}
        </p>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-6xl font-extrabold leading-none text-white sm:text-8xl">{Math.round(weather.temp)}°c</p>
          <p className="mt-3 font-bold text-white sm:text-lg">
            {Math.round(weather.tempMin)}°c / {Math.round(weather.tempMax)}°c
            <span className="mx-2 text-gray-300">•</span>
            <span className="font-semibold text-gray-100">{capitalize(weather.description)}</span>
          </p>
        </div>
        <img src={image} alt="" className="-mb-4 -mr-2 w-28 shrink-0 drop-shadow-2xl sm:w-48" />
      </div>
    </section>
  );
}
