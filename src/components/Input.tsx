import axios from "axios";
import  { ChangeEvent, useEffect, useState } from "react";
import { Location } from "../pages/Find/page";
interface ComponentProps {
  ValueInput: (results: Location[]) => void;
}
const Input = ({ ValueInput }: ComponentProps) => {
  const [valueInput, setValueInput] = useState<string>("");



  useEffect(() => {
    if (!valueInput) {
      ValueInput([]);
      setValueInput("");

      return;
    }

    const options = {
      method: "GET",
      url: "https://api.openweathermap.org/geo/1.0/direct",
      params: {
        q: valueInput,
        appid: import.meta.env.VITE_APP_ID,
        limit: 3,
        lang: "pt_br",
      },
    };

    const search = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        const locations: Location[] = response.data.map((city: Location) => ({
          name: city.name,
          country: city.country,
          state: city.state,
          lat: city.lat,
          lon: city.lon,
        }));
        ValueInput(locations);
        
      } catch (error) {
        console.error(error);
      }
    };

    search();
  }, [ValueInput, valueInput]);
  const handleValueInput = (e: ChangeEvent<HTMLInputElement>) => {
  
      setValueInput(e.target.value);
    
  };

  return (
    <input
      type="text"
      placeholder="Buscar Local"
      value={valueInput}
      onChange={handleValueInput}
      className="mt-9 bg-bg_input border-gray w-72 h-12 placeholder:p-5 border-2  focus:border-blue_base outline-none rounded-lg"
    />
  );
};

export default Input;
