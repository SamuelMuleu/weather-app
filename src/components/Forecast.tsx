import { ForecastDay } from "@/lib/weatherApi";
import { weatherVisuals } from "@/lib/visuals";
import { capitalize, weekdayShort } from "@/lib/format";

export default function Forecast({ days }: { days: ForecastDay[] }) {
  return (
    <section aria-labelledby="forecast-title" className="rounded-2xl bg-bg_table p-5 sm:p-6">
      <h2 id="forecast-title" className="mb-4 text-sm font-semibold text-gray-400">
        Previsão para {days.length} dias
      </h2>
      <ul className="grid grid-cols-5 gap-1">
        {days.map((day) => (
          <li key={day.date} className="flex flex-col items-center text-center" title={day.description}>
            <span className="text-sm font-bold text-gray-200">{capitalize(weekdayShort(day.date))}</span>
            <img src={weatherVisuals(day.icon).image} alt={day.description} className="my-2 size-10 object-contain sm:size-14" />
            <span className="hidden min-h-8 text-xs leading-tight text-gray-400 sm:block">{capitalize(day.description)}</span>
            <span className="mt-1 text-sm font-bold text-white">{Math.round(day.max)}°c</span>
            <span className="text-sm text-gray-400">{Math.round(day.min)}°c</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
