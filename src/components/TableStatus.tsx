import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import termometer from "@/assets/svg/thermometerSimpleLight.svg";
import cloudRain from "@/assets/svg/cloudRainLight.svg";
import wind from "@/assets/svg/windLight.svg";
import airHumidity from "@/assets/svg/dropLight.svg";

import axios from "axios";
import { useEffect, useState } from "react";
export interface CityWeek {
  temp: number;

  feelsLike: number;
  humidity: number;
  wind: number;
  rain: number;

  id: number;
  weather: string;
}
interface TableStatusProps {
  lat: number;
  lon: number;
}

const TableStatus = ({ lat, lon }: TableStatusProps) => {
  const [city, setCity] = useState<CityWeek[]>([]);

  useEffect(() => {
    const fetchCityWeek = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              lat: lat,
              lon: lon,
              appid: "d078f896d3a85db50d3de2fb3705e6ad",
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
  }, [lat, lon]);
  return (
    <>
      {city.map((c) => (
        <Table
          key={c.id}
          className="bg-bg_table flex w-[22rem] lg:w-[39rem] lg:h-[20rem] lg:mt-6  mx-5 flex-col items-center justify-center rounded-xl mb-4 "
        >
          <span className="hidden lg:block lg:opacity-55 lg:mr-[22rem]">
            Detalhes do clima hoje
          </span>
          <TableHeader>
            <TableRow>
              <div className="lg:w-[30rem]">
                <TableCell>
                  <img
                    src={termometer}
                    alt="Termômetro"
                    className="opacity-55"
                  />
                </TableCell>
                <TableCell>Sensação Térmica</TableCell>
              </div>
              <TableCell className="font-black">{c.feelsLike}ºc</TableCell>
            </TableRow>
            <TableRow>
              <div className="lg:w-[30rem]">
                <TableCell>
                  <img src={cloudRain} alt="Chuva " className="opacity-55" />
                </TableCell>
                <TableCell>Probabilidade de Chuva</TableCell>
              </div>
              <TableCell className="font-black text-end">{c.rain}%</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <div className="lg:w-[28rem]">
                <TableCell>
                  <img src={wind} alt="Termômetro" className="opacity-55" />
                </TableCell>
                <TableCell>Velocidade do vento</TableCell>
              </div>
              <TableCell className="font-black">
                {c.wind.toFixed(1)} km/h
              </TableCell>
            </TableRow>
            <TableRow>
              <div className="lg:w-[29rem]">
                <TableCell>
                  <img
                    src={airHumidity}
                    alt="Termômetro"
                    className="opacity-55  "
                  />
                </TableCell>
                <TableCell>Humidade do ar </TableCell>
              </div>
              <TableCell className="font-black text-end">
                {c.humidity}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </>
  );
};

export default TableStatus;
