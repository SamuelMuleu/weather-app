import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cloud from "../../assets/Vector.png";
import data from "../../assets/imagens";
import Input from "../../components/Input";
import { Location } from "../Find/page";

interface City {
  name: string;
  temp: number;
  state: string;
  weather: string;
  timezone: number;
  timestamp: number;
  dt: number;
}

const WeatherStatus = () => {
  const [city, setCity] = useState<City[]>([]);
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const [find, setFind] = useState<Location[]>([]);
  const navigate = useNavigate();

  const cityName = new URLSearchParams(location.search).get("city");

  const { images, backgroundWeather } = data;

  useEffect(() => {
    if (!cityName) return;

    const FetchWeather = async () => {
      const options = {
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        params: {
          q: cityName,
          appid: "d078f896d3a85db50d3de2fb3705e6ad",
          lang: "pt_br",
        },
      };
      try {
        const response = await axios.request(options);

        const cities: City[] = [
          {
            name: response.data.name,
            temp: Math.round(response.data.main.temp - 273.15),
            state: response.data.sys.country,
            weather: response.data.weather[0].main,
            timezone: response.data.timezone,
            timestamp: response.data.timestamp,
            dt: response.data.dt,
          },
        ];

        setCity(cities);
        setError("");
        setFind([]);
      } catch (error) {
        console.error(error);
        setError("Erro 404: Não foi possível encontrar a cidade!");
      }
    };
    FetchWeather();
  }, [cityName]);

  const calcularPeriodo = (timezone: number, timestamp: number) => {
    // Ajuste para o horário local, considerando o fuso horário
    const localTime = timestamp + timezone; // timestamp já está em UTC
    const horas = new Date(localTime * 1000).getHours(); // Hora local

    if (horas >= 6 && horas < 12) {
      return "Manhã";
    } else if (horas >= 12 && horas < 18) {
      return "Tarde";
    } else {
      return "Noite";
    }
  };

  console.log(calcularPeriodo);
  const handleSubmit = (city: string) => {
    setTimeout(() => {
      if (city) {
        navigate(`/weatherstatus?city=${encodeURIComponent(city)}`);
      }
    }, 500);
  };
  const handleSubmitButton = () => {
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
    return { date, time };
  };

  return (
    <div className="flex items-center flex-col   justify-center ">
      <div className="fle gap-1  max-w-[21.8rem]">
        <form
          className="flex  flex-row gap-1"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <button
            onClick={handleSubmitButton}
            className="  flex items-center justify-center  mt-8 bg-bg_input p-2 rounded-lg"
          >
            <img src={cloud} alt="" />
          </button>

          <Input ValueInput={setFind} />

          {find.length > 0 ? (
            <div className="mt-6 absolute">
              {find.map((locale, index) => (
                <div className="flex flex-col z-10 relative top-16 left-14">
                  <button
                    onClick={() => handleSubmit(locale.name)}
                    key={index}
                    className="p-3 bg-gray-800  w-72 h-12  hover:bg-gray-700 hover:scale-105 hover:transition ease-linear rounded-lg mb-2"
                  >
                    <p className="flex items-center justify-center w-72 -mt-3 -ml-3 ">
                      {locale.name}, {locale.state ? `${locale.state}  ` : ""}
                      {locale.country}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white opacity-60 mt-10"></p>
          )}
        </form>
      </div>

      {city.length > 0 ? (
        <div>
          {city.map((city, index) => {
            const { date, time } = formatDate(city.dt, city.timezone);
            return (
              <div key={index} className="mt-4 w-[21.8rem] ">
                <img
                  src={backgroundWeather.weatherFewCloudsMomentNight}
                  alt=""
                />
                <p className=" font-black text-xl relative bottom-80 left-5">
                  {city.name},{city.state}
                </p>
                <p>{city.temp}</p>
                <p>{city.weather}</p>
                <p className=" font-semibold text relative bottom-[22.5rem] left-5">
                  {date}
                </p>
                <p className=" font-semibold text relative bottom-[27rem] left-72">
                  {time}
                </p>
                <img src={images.fewCloudNigth} alt="" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="font-bold text-2xl flex items-center  min-h-screen mb-10">
          {error}
        </div>
      )}
    </div>
  );
};

export default WeatherStatus;
