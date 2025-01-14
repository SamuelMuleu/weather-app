import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import termometer from "../assets/svg/thermometerSimpleLight.svg";
import cloudRain from "../assets/svg/cloudRainLight.svg";
import { City } from "../pages/status/page";

interface SelectedCity {
  city: City[];
}

const TableStatus = ({ city }: SelectedCity) => {
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
              <TableCell>{c.temp}ºc</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <img src={cloudRain} alt="Chuva" />
              </TableCell>
              <TableCell>Probabilidade de Chuva</TableCell>
              <TableCell>{c.temp}ºc</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>Dados adicionais podem ir aqui</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </>
  );
};

export default TableStatus;
