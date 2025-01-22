import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cloud from "../../assets/Vector.png";
import data from "../../assets/imagens";
import Input from "../../components/Input";

import WeatherCard from "../../components/WeatherCard";
import TableStatus from "../../components/TableStatus";
import WeekWeather from "@/components/WeekWeather";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { City, setCities } from "@/features/sliceCities";
import { AppDispatch, RootState } from "@/store";
import { useSelector } from "react-redux";

const WeatherStatus = () => {
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { cities } = useSelector((state: RootState) => state.cities);

  const cityName = new URLSearchParams(location.search).get("city");

  const { images, backgroundWeather } = data;

  useEffect(() => {
    window.scrollTo(0,0);
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
              appid: import.meta.env.VITE_APP_ID,
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

        dispatch(setCities(cities));
      } catch (error) {
        console.error(error);

        setError("Erro 404: Não foi possível encontrar a cidade!");
      }
    };
    FetchWeather();
  }, [cityName, dispatch]);

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
    if (period === "Manhã" && weather.includes("nublado"))
      return backgroundWeather.watherClearMomentDay;
    if (period === "Manhã" && weather.includes("algumas nuvens"))
      return backgroundWeather.weatherCloudMomentDay;
    if (period === "Tarde" && weather.includes("nublado"))
      return backgroundWeather.weatherCloudyMomentNight;
    if (period === "Tarde" && weather.includes("céu limpo"))
      return backgroundWeather.weatherCloudyMomentNight;
    if (period === "Tarde" && weather.includes("chuva moderada"))
      return backgroundWeather.weatherRainMomentDay;
    if (period === "Noite" && weather.includes("nublado"))
      return backgroundWeather.weatherCloudyMomentNight;
    if (period === "Noite" && weather.includes("nuvens dispersas"))
      return backgroundWeather.weatherCloudyMomentNight;
    if (period === "Noite" && weather.includes("chuva"))
      return backgroundWeather.weatherRainMomentNight;
    if (period === "Noite" && weather.includes("céu limpo"))
      return backgroundWeather.weatherFewCloudsMomentNight;
    if (period === "Noite" && weather.includes("algumas nuvens"))
      return backgroundWeather.weatherFewCloudsMomentNight;
    if (period === "Noite" && weather.includes("garoa de leve intensidade"))
      return backgroundWeather.weatherRainMomentNight;
    if (period === "Manhã") return backgroundWeather.weatherFewCloudsMomentDay;
    if (period === "Noite") return backgroundWeather.weatherCloudyMomentNight;
    if (period === "Tarde")
      return backgroundWeather.weatherFewCloudsMomentNight;

    return backgroundWeather.watherClearMomentDay;
  };

  const getWeatherIcons = (period: string, weather: string) => {
    if (period === "Manhã" && weather.includes("nublado"))
      return images.cloudyDay;
    if (period === "Tarde" && weather.includes("nublado"))
      return images.cloudyDay;
    if (period === "Tarde" && weather.includes("chuva moderada"))
      return images.cloudStorm;
    if (period === "Tarde" && weather.includes("céu limpo")) return images.sun;
    if (period === "Manhã" && weather.includes("algumas nuvens"))
      return images.cloudyDay;
    if (period === "Noite" && weather.includes("nublado"))
      return images.cloudyNight;
    if (period === "Noite" && weather.includes("nuvens dispersas"))
      return images.fewCloudNight;
    if (period === "Noite" && weather.includes("chuva "))
      return images.cloudStorm;
    if (period === "Noite" && weather.includes("céu limpo"))
      return images.moonNight;
    if (period === "Noite" && weather.includes("algumas nuvens"))
      return images.fewCloudNight;
    if (period === "Noite" && weather.includes("garoa de leve intensidade"))
      return images.cloudyRainNight;
    if (period === "Manhã") return images.sun;
    if (period === "Noite") return images.moonNight;
    if (period === "Tarde") return images.fewCloudNight;

    return images.sun;
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center ">
      <div className="flex flex-col items-center lg:w-1/2">
        <div className="flex gap-1">
          <button
            onClick={handleSubmitButton}
            className="flex items-center justify-center mt-8 bg-bg_input p-2 rounded-lg"
          >
            <img src={cloud} alt="" />
          </button>
          <Input />
        </div>

        {cities.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {cities.map((city) => {
              const { date, time, periods } = formatDate(
                city.dt,
                city.timezone
              );
              const backgroundImage = getBackgroundImage(periods, city.weather);
              const iconImage = getWeatherIcons(periods, city.weather);

              return (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <WeatherCard
                    backgroundImage={backgroundImage}
                    iconImage={iconImage}
                    date={date}
                    time={time}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="font-bold text-2xl flex items-center min-h-screen">
            {error}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center lg:w-1/2">
        {cities.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {cities.map((city) => (
              <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5  }}
              >
              <TableStatus />

                  <WeekWeather />
                </motion.div>
   
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default WeatherStatus;
