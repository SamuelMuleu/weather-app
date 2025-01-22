import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import termometer from "@/assets/svg/thermometerSimpleLight.svg";
import cloudRain from "@/assets/svg/cloudRainLight.svg";
import wind from "@/assets/svg/windLight.svg";
import airHumidity from "@/assets/svg/dropLight.svg";

import axios from "axios";
import { useEffect, useState } from "react";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
export interface CityWeek {
  temp: number;

  feelsLike: number;
  humidity: number;
  wind: number;
  rain: number;

  id: number;
  weather: string;
}

const TableStatus = () => {
  const [city, setCity] = useState<CityWeek[]>([]);

  const { cities } = useSelector((state: RootState) => state.cities);

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
          console.log(response.data);
          const cities: CityWeek[] = [
            {
              temp: response.data.list[0].main.temp.toFixed(0),

              feelsLike: response.data.list[0].main.feels_like.toFixed(0),

              humidity: response.data.list[0].main.humidity,
              rain: response.data.list[0].pop * 100,

              id: response.data.city.id,
              weather: response.data.list[0].weather[0].description,

              wind: response.data.list[0].wind.speed,
            },
          ];
          setCity(cities);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCityWeek();
    }
  }, [cities]);
  return (
    <>
      {city.map((c) => (
        <Table
          key={c.id}
          className="bg-bg_table  w-[22rem] lg:w-[39rem] lg:h-[20rem] lg:mt-6 mx-5 rounded-xl mb-4"
        >
          <TableHeader></TableHeader>
          <TableBody>
            <tr className="">
              <TableCell className="hidden lg:block lg:opacity-55 lg:mr-[22rem]  lg:p-2 lg:ml-4 ">
                Detalhes do clima hoje
              </TableCell>
            </tr>
            <tr className="flex items-center  p-1 justify-between border-b-2 border-gray-700 border-opacity-55">
              <TableCell className="flex items-center space-x-2">
                <img src={termometer} alt="Termômetro" className="opacity-55" />
                <span>Sensação Térmica</span>
              </TableCell>
              <TableCell className="font-bold">{c.feelsLike}ºC</TableCell>
            </tr>
            <tr className="flex items-center  p-1 justify-between border-b-2 border-gray-700 border-opacity-55">
              <TableCell className="flex items-center space-x-2">
                <img src={cloudRain} alt="Chuva" className="opacity-55" />
                <span>Probabilidade de Chuva</span>
              </TableCell>
              <TableCell className="font-bold">{c.rain}%</TableCell>
            </tr>
            <tr className="flex items-center p-1 justify-between border-b-2 border-gray-700 border-opacity-55">
              <TableCell className="flex items-center space-x-2">
                <img src={wind} alt="Vento" className="opacity-55" />
                <span>Velocidade do Vento</span>
              </TableCell>
              <TableCell className="font-bold">
                {c.wind.toFixed(1)} km/h
              </TableCell>
            </tr>
            <tr className="flex items-center p-1 justify-between">
              <TableCell className="flex items-center space-x-2">
                <img src={airHumidity} alt="Umidade" className="opacity-55" />
                <span>Umidade do Ar</span>
              </TableCell>
              <TableCell className="font-bold">{c.humidity}%</TableCell>
            </tr>
          </TableBody>
        </Table>
      ))}
    </>
  );
};

export default TableStatus;
