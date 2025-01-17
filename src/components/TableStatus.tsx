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
interface CityWeek {
  temp: number;

  feelsLike: number;
  humidity: number;
  wind: number;
  rain:number

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
            },
          }
        );
        console.log(response.data)
        const cities: CityWeek[] = [
          {
            temp: Math.round(response.data.list[0].main.temp - 273.15),

            feelsLike: Math.round(
              response.data.list[0].main.feels_like - 273.15
            ),
            humidity: response.data.list[0].main.humidity,
          rain:response.data.list[0].pop,

            id: response.data.city.id,
            weather: response.data.list[0].weather[0].description,
            wind: response.data.list[0].wind.speed
          },
        ];
        setCity(cities);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCityWeek();
  }, []);
  return (
    <>
      {city.map((c) => (
        <Table key={c.id}>
          <TableHeader>
            <TableRow>
              <TableCell className="font-medium">
                <img src={termometer} alt="Termômetro" />
              </TableCell>
              <TableCell>Sensação Térmica</TableCell>
              <TableCell>{c.feelsLike}ºc</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <img src={cloudRain} alt="Chuva" />
              </TableCell>
              <TableCell>Probabilidade de Chuva</TableCell>
              <TableCell>{c.rain}%</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <img src={wind} alt="Termômetro" />
              </TableCell>
              <TableCell>Velocidade do vento</TableCell>
              <TableCell>{c.wind.toFixed(1)} km/h</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <img src={airHumidity} alt="Termômetro" />
              </TableCell>
              <TableCell>Humidade do ar </TableCell>
              <TableCell>{c.humidity}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </>
  );
};

export default TableStatus;
