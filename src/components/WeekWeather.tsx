import { City } from "@/pages/status/page";
import data from "@/assets/imagens";
import axios from "axios";
import { useEffect, useState } from "react";

interface WeekDays {
  city: City;
}

interface WeatherData {
  main: {
    temp_max: number;
    temp_min: number;
  };
  weather: { description: string }[];
}

const WeekWeather = ({ city }: WeekDays) => {
  const [weekData, setWeekData] = useState<[]>([]);
  const { images } = data;

  const getCustomWeatherIcon = (weather: string) => {
    if (weather.includes("nublado")) {
      return images.cloudyDay;
    } else if (weather.includes("céu limpo")) {
      return images.sun;
    } else if (weather.includes("chuva")) {
      return images.sun;
    } else if (weather.includes("tempestade")) {
      return images.sun;
    } else {
      return images.sun;
    }
  };

  useEffect(() => {
    const fetchCityWeek = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              lat: city.lat,
              lon: city.lon,
              appid: "d078f896d3a85db50d3de2fb3705e6ad",
              lang: "pt_br",
              cnt: 7,
              units: "metric",
            },
          }
        );

        const cities = response.data.list
          .slice(0, 5)
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
  }, [city.lat, city.lon]);

  return (
    <div className="bg-bg_table rounded-xl mb-4 w-[22rem] mx-5 font-semibold p-2 px-2">
      <div className="flex flex-row justify-between gap-x-4">
        {weekData.map((day, index) => {
          const { temp_max, temp_min, weather } = day;

          const formattedDate = new Date(
            new Date().setDate(new Date().getDate() + index)
          )
            .toLocaleDateString("pt-BR", {
              weekday: "short",
            })
            .replace(".", "");

          const weatherIcon = getCustomWeatherIcon(weather);

          return (
            <div key={index} className="flex flex-col items-center">
              <div className="text-center">{formattedDate}</div>
              <div>
                {weatherIcon && (
                  <img src={weatherIcon} alt={weather} className="w-8 h-8" />
                )}
              </div>
              <div className="text-center">
                {temp_max}ºC
                 <span className="flex opacity-55">
                 {temp_min}ºC
                  </span> 
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekWeather;
