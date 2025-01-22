import data from "@/assets/imagens";

import { RootState } from "@/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface WeatherData {
  main: {
    temp_max: number;
    temp_min: number;
  };
  weather: { description: string }[];
}

const WeekWeather = () => {
  const [weekData, setWeekData] = useState<[]>([]);
  const { images } = data;

  const { cities } = useSelector((state: RootState) => state.cities);

  const getCustomWeatherIcon = (weather: string) => {
    if (weather.includes("nublado")) return images.cloudyDay;
    if (weather.includes("nuvens dispersas")) return images.dayCloudy;
    if (weather.includes("céu limpo")) return images.sun;
    if (weather.includes("chuva")) return images.cloudyRain;
    if (weather.includes("tempestade")) return images.cloudStorm;
    if (weather.includes("algumas nuvens")) return images.cloudyDay;
    return images.sun;
  };

  useEffect(() => {
    if (cities.length > 0) {
      const { lat, lon } = cities[0];
      const fetchCityWeek = async () => {
        try {
          const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/forecast",
            {
              params: {
                lat: lat,
                lon: lon,
                appid: import.meta.env.VITE_APP_ID,
                lang: "pt_br",
                cnt: 7,
                units: "metric",
              },
            }
          );

          const cities = response.data.list
            .slice(1, 6)
            .map((item: WeatherData) => ({
              temp_max: item.main.temp_max.toFixed(0),
              temp_min: item.main.temp_min.toFixed(0),
              weather: item.weather[0].description,
            }));

          setWeekData(cities);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCityWeek();
    }
  }, [cities]);

  return (
    <div className="bg-bg_table rounded-xl mb-4 w-[22rem] lg:p-8 lg:w-[39rem] mx-5 font-semibold p-2 px-2  flex  flex-col gap-3">
      <span className="hidden lg:inline lg:opacity-55 ">
        Previsão para 5 Dias
      </span>
      <div className="flex flex-row justify-between ">
        {weekData.map((day, index) => {
          const { temp_max, temp_min, weather } = day;

          const formattedDate = new Intl.DateTimeFormat("pt-BR", {
            weekday: "short",
          })
            .format(
              new Date(new Date().setDate(new Date().getDate() + index + 1))
            )
            .replace(".", "");
          const weatherIcon = getCustomWeatherIcon(weather);

          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <div className="text-center">{formattedDate}</div>
              <div>
                {weatherIcon && (
                  <img src={weatherIcon} alt={weather} className="w-8 h-8" />
                )}
              </div>
              <div className="hidden lg:flex lg:text-sm justify-center my-1 opacity-55">
                {weather}
              </div>
              <div className="lg:flex gap-2">
                {temp_max}ºC
                <span className="flex fle opacity-55">{temp_min}ºC</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekWeather;
