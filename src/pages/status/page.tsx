import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cloud from "../../assets/Vector.png";
import data from "../../assets/imagens";
import Input from "../../components/Input";

import cloudsImg from "../../assets/DayCloudyWeatherFewcloudsMomentDay.png";
import { Location } from "../Find/page";

interface City {
  name: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  feelsLike: number;
  state: string;
  weather: string;
  timezone: number;
  timestamp: number;
  dt: number;
}

const WeatherStatus = () => {
  const [city, setCity] = useState<City[]>([]);

  const [error, setError] = useState<string>("");
  const [find, setFind] = useState<Location[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const cityName = new URLSearchParams(location.search).get("city");

  const { images, backgroundWeather } = data;

  console.log(find);
  useEffect(() => {
    if (!cityName) return;

    const FetchWeather = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: cityName,
              appid: "d078f896d3a85db50d3de2fb3705e6ad",
              lang: "pt_br",
            },
          }
        );
        console.log(response.data.main);

        const cities: City[] = [
          {
            name: response.data.name,
            temp: Math.round(response.data.main.temp - 273.15),
            temp_min: Math.round(response.data.main.temp_min - 273.15),
            temp_max: Math.round(response.data.main.temp_max - 273.15),
            feelsLike: Math.round(response.data.main.feels_like - 273.15),
            state: response.data.sys.country,
            weather: response.data.weather[0].description,
            timezone: response.data.timezone,
            timestamp: response.data.timestamp,
            dt: response.data.dt,
          },
        ];

        setCity(cities);

        console.log(cities);
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
      if (time >= "6:00" && time < "12:") {
        return "Manhã";
      } else if (time >= "12:00" && time < "18:00") {
        return "Tarde";
      } else {
        return "Noite";
      }
    };
    console.log(periodsOfTheDay());
    return { date, time };
  };

  const weatherImages: Record<string, string> = {
    sun: images.sun,
    moonNight: images.moonNight,
    cloudyDay: images.cloudyDay,
    cloudyNigth: images.cloudyNight,
    fewCloudNigth: images.fewCloudNight,
    dayCloudy: images.dayCloudy,
    cloudyRain: images.cloudyRain,
    cloudyRainNight: images.cloudyRainNight,
    cloudSnow: images.cloudSnow,
    cloudSnowNight: images.cloudSnowNight,
    cloudStorm: images.cloudStorm,
    cloudStormNight: images.cloudStormNight,
  };

  return (
    <div className="flex items-center flex-col   justify-center ">
      <div className="flex gap-1  max-w-[21.8rem]">
        <button
          onClick={handleSubmitButton}
          className="  flex items-center justify-center  mt-8 bg-bg_input p-2 rounded-lg"
        >
          <img src={cloud} alt="" />
        </button>

        <Input ValueInput={setFind} />
      </div>

      {city.length > 0 ? (
        <div>
          {city.map((city, index) => {
            const { date, time } = formatDate(city.dt, city.timezone);
            const weatherImage = weatherImages[city.weather] || cloudsImg;
            return (
              <div key={index} className="mt-4 w-[21.8rem] ">
                <img
                  src={backgroundWeather.weatherFewCloudsMomentNight}
                  alt=""
                />
                <p className=" font-black text-xl relative bottom-80 left-5">
                  {city.name},{city.state}
                </p>
                <p className=" font-black text-5xl relative bottom-40 left-5">
                  {city.temp}ºc
                </p>
                <div className="flex gap-1">
                  <p className=" font-black text-xl relative bottom-40 left-5">
                    {city.temp_min}ºc
                  </p>
                  <p className="font-bold text-xl relative bottom-40 left-5">
                    /
                  </p>
                  <p className=" font-bold text-xl relative bottom-40 left-5">
                    {city.temp_max}ºc
                  </p>
                </div>
                <p className=" font-semibold relative bottom-[10rem] left-5 ">
                  {city.weather}
                </p>
                <p className=" font-semibold text relative bottom-[25rem] left-5">
                  {date}
                </p>
                <p className=" font-semibold text relative bottom-[29.5rem] left-72">
                  {time}
                </p>
                <img
                  className="relative bottom-[24.5rem] left-40"
                  src={weatherImage}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="font-bold text-2xl flex items-center  min-h-screen ">
          {error}
        </div>
      )}
    </div>
  );
};

export default WeatherStatus;
