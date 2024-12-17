import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface City {
  name: string;
  temp: number;
}

const WeatherStatus = () => {
  const [city, setCity] = useState<City[]>([]);
  const location = useLocation();
  const cityName = new URLSearchParams(location.search).get("city");

  useEffect(() => {
    if (cityName) {
      const options = {
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        params: {
          q: cityName,
          appid: "d078f896d3a85db50d3de2fb3705e6ad",
          lang: "pt_br",
        },
      };

      const search = async () => {
        try {
          const response = await axios.request(options);
          console.log(response.data);
          const cities: City[] = [
            {
              name: response.data.name,
              temp: response.data.main.temp,
            },
          ];
          setCity(cities);
        } catch (error) {
          console.error(error);
        }
      };
      search();
    }
  }, [cityName]);
  return (
    <div>
      {city.length > 0 ? (
        <div>
          {city.map((city, index) => (
            <div>
              <p key={index}>{city.name}</p>
              <p>{city.temp}</p>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WeatherStatus;
