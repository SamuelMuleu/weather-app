import thermometer from "@/assets/svg/thermometerSimpleLight.svg";
import cloudRain from "@/assets/svg/cloudRainLight.svg";
import wind from "@/assets/svg/windLight.svg";
import drop from "@/assets/svg/dropLight.svg";
import { CurrentWeather } from "@/lib/weatherApi";

export default function TodayDetails({ weather, popNow }: { weather: CurrentWeather; popNow: number }) {
  const rows = [
    { icon: thermometer, label: "Sensação térmica", value: `${Math.round(weather.feelsLike)}°c` },
    { icon: cloudRain, label: "Probabilidade de chuva", value: `${popNow}%` },
    { icon: wind, label: "Velocidade do vento", value: `${Math.round(weather.wind)} km/h` },
    { icon: drop, label: "Umidade do ar", value: `${weather.humidity}%` },
  ];

  return (
    <section aria-labelledby="today-title" className="rounded-2xl bg-bg_table p-5 sm:p-6">
      <h2 id="today-title" className="mb-2 text-sm font-semibold text-gray-400">
        Detalhes do clima hoje
      </h2>
      <dl className="divide-y divide-white/5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-3.5">
            <dt className="flex items-center gap-3 text-gray-200">
              <img src={row.icon} alt="" className="size-6 opacity-60" />
              {row.label}
            </dt>
            <dd className="text-lg font-bold text-white">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
