import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cloud from "../../assets/Vector.png";
import data from "../../assets/imagens";
import Input from "../../components/Input";

import WeatherCard from "../../components/WeatherCard";
import TableStatus from "../../components/TableStatus";
import WeekWeather from "@/components/WeekWeather";

export interface City {
  name: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  feelsLike: number;
  state: string;
  dt: number;
  id: number;
  weather: string;
  lat: number;
  lon: number;
  timezone: number;
  timestamp: number;
}

const WeatherStatus = () => {
  const [city, setCity] = useState<City[]>([]);

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const cityName = new URLSearchParams(location.search).get("city");

  const { images, backgroundWeather } = data;

  useEffect(() => {
    if (!cityName) return;

    const FetchWeather = async () => {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];

      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: cityName,
              appid: "d078f896d3a85db50d3de2fb3705e6ad",
              lang: "pt_br",
              date: formattedDate,
              units: "metric",
            },
          }
        );

        const cities: City[] = [
          {
            name: response.data.name,
            temp: response.data.main.temp.toFixed(0),
            temp_min: response.data.main.temp_min.toFixed(0),
            temp_max: response.data.main.temp_max.toFixed(0),
            feelsLike: response.data.main.feels_like,
            state: response.data.sys.country,
            id: response.data.id,
            lat: response.data.coord.lat,
            lon: response.data.coord.lon,
            weather: response.data.weather[0].description,
            timezone: response.data.timezone,
            timestamp: response.data.timestamp,
            dt: response.data.dt,
          },
        ];

        setCity(cities);
      } catch (error) {
        console.error(error);
        setError("Erro 404: Não foi possível encontrar a cidade!");
      }
    };
    FetchWeather();
  }, [cityName]);

  const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/");
  };

  const formatDate = (timestamp: number, timezone: number) => {
    const localTime = new Date((timestamp + timezone) * 1000);

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",

      timeZone: "UTC",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",

      timeZone: "UTC",
    };

    const date = localTime.toLocaleDateString("pt-BR", dateOptions);
    const time = localTime.toLocaleTimeString("pt-BR", timeOptions);

    const periodsOfTheDay = () => {
      const [hours] = time.split(":").map(Number);

      if (hours >= 6 && hours < 12) {
        return "Manhã";
      } else if (hours >= 12 && hours < 18) {
        return "Tarde";
      } else {
        return "Noite";
      }
    };

    console.log(periodsOfTheDay());
    return { date, time, periods: periodsOfTheDay() };
  };

  const getBackgroundImage = (period: string, weather: string) => {
    if (period === "Manhã" && weather.includes("nublado")) {
      return backgroundWeather.watherClearMomentDay;
    } else if (period === "Tarde" && weather.includes("nublado")) {
      return backgroundWeather.weatherCloudyMomentNight;
    } else if (period === "Tarde" && weather.includes("céu limpo")) {
      return backgroundWeather.watherClearMomentDay;
    } else if (period === "Tarde" && weather.includes("chuva moderada")) {
      return backgroundWeather.weatherRainMomentDay;
    } else if (period === "Manhã" && weather.includes("algumas nuvens")) {
      return backgroundWeather.weatherCloudMomentDay;
    } else if (period === "Noite" && weather.includes("nublado")) {
      return backgroundWeather.weatherCloudyMomentNight;
    } else if (period === "Noite" && weather.includes("nuvens dispersas")) {
      return backgroundWeather.weatherCloudyMomentNight;
    } else if (period === "Noite" && weather.includes("chuva forte")) {
      return backgroundWeather.weatherRainMomentNight;
    } else if (period === "Noite" && weather.includes("céu limpo")) {
      return backgroundWeather.weatherFewCloudsMomentNight;
    } else if (period === "Noite" && weather.includes("algumas nuvens")) {
      return backgroundWeather.weatherFewCloudsMomentNight;
    } else if (period === "Manhã") {
      return backgroundWeather.weatherFewCloudsMomentDay;
    } else if (period === "Tarde") {
      return backgroundWeather.weatherFewCloudsMomentNight;
    } else {
      return backgroundWeather.watherClearMomentDay;
    }
  };

  const getWeatherIcons = (period: string, weather: string) => {
    if (period === "Manhã" && weather.includes("nublado")) {
      return images.cloudyDay;
    } else if (period === "Tarde" && weather.includes("nublado")) {
      return images.cloudyDay;
    } else if (period === "Tarde" && weather.includes("chuva moderada")) {
      return images.cloudStorm;
    } else if (period === "Tarde" && weather.includes("céu limpo")) {
      return images.sun;
    } else if (period === "Manhã" && weather.includes("algumas nuvens")) {
      return images.cloudyDay;
    } else if (period === "Noite" && weather.includes("nublado")) {
      return images.cloudyNight;
    } else if (period === "Noite" && weather.includes("nuvens dispersas")) {
      return images.fewCloudNight;
    } else if (period === "Noite" && weather.includes("chuva forte")) {
      return images.cloudStorm;
    } else if (period === "Noite" && weather.includes("céu limpo")) {
      return images.moonNight;
    } else if (period === "Noite" && weather.includes("algumas nuvens")) {
      return images.fewCloudNight;
    } else if (period === "Manhã") {
      return images.sun;
    } else if (period === "Tarde") {
      return images.fewCloudNight;
    } else {
      return images.sun;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center ">
      <div className="flex flex-col items-center lg:w-1/2">
        <div className="flex gap-1">
          <button
            onClick={handleSubmitButton}
            className="flex items-center  justify-center mt-8 bg-bg_input p-2 rounded-lg"
          >
            <img src={cloud} alt="" />
          </button>
          <Input ValueInput={() => {}} />
        </div>

        {city.length > 0 ? (
          <div>
            {city.map((city) => {
              const { date, time, periods } = formatDate(
                city.dt,
                city.timezone
              );
              const backgroundImage = getBackgroundImage(periods, city.weather);
              const iconImage = getWeatherIcons(periods, city.weather);

              return (
                <div key={city.id}>
                  <WeatherCard
                    city={city}
                    backgroundImage={backgroundImage}
                    iconImage={iconImage}
                    date={date}
                    time={time}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="font-bold text-2xl flex items-center min-h-screen">
            {error}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center lg:w-1/2">
        {city.length > 0 && (
          <div>
            {city.map((city) => (
              <div key={city.id}>
                <TableStatus lat={city.lat} lon={city.lon} />
                <WeekWeather city={city} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherStatus;
