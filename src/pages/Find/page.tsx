import { ChangeEvent, useEffect, useState } from "react";
import BackgroundLines from "../../components/BackgroundLines";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Location {
  name: string;
}

const PageFind = () => {
  const [find, setFind] = useState<Location[]>([]);
  const [valueInput, setValueInput] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!valueInput) {
      setFind([]);
      return;
    }

    const options = {
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather",
      params: {
        q: valueInput,
        appid: import.meta.env.VITE_APP_ID,
        
        lang: "pt_br",
      },
      
    };


    const search = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        const locations: Location[] = [
          {
            name: response.data.name,
          },
        ];
        setFind(locations);
      } catch (error) {
        console.error(error);
        setFind([]);
      }
    };

    search();
  }, [valueInput]);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (valueInput && find.length > 0) {
        navigate(`/weatherstatus?city=${encodeURIComponent(valueInput)}`);
      }
    }, 2000);
  };

  const handleValueInput = (input: string) => {
    setValueInput(input);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1 mt-20">
        <div className="top-10 left-0 w-full h-auto pointer-events-none">
          <BackgroundLines />
        </div>
        <div className="bottom-72 left-0 w-full h-auto pointer-events-none">
          <BackgroundLines />
        </div>

        <div className="text-2xl font-bold text-white">
          Bem Vindo ao <span className="text-blue_base">Weather</span>
        </div>
        <p className="text-1xl opacity-45">
          Escolha um local para ver a previsão do tempo
        </p>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          {loading && (
           <div className=" animate-spin text-blue_base absolute mt-12 ml-64">

             <FaSpinner/>
           </div>
          )}

          <input
            type="text"
            placeholder="Buscar Local"
            value={valueInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleValueInput(e.target.value)
            }
            className="mt-9 bg-bg_input border-gray w-72 h-12 placeholder:p-5 border-2  focus:border-blue_base outline-none rounded-lg"
          />
        </form>
        {find.length > 0 ? (
          <div className="mt-4">
            {find.map((locale, index) => (
              <button
                onClick={handleSubmit}
                key={index}
                className="p-3 bg-gray-800  w-72 h-12  hover:bg-gray-700 hover:scale-105 hover:transition ease-linear rounded-lg mb-2"
              >
                <div className="text-white ">{locale.name}</div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-white opacity-60 mt-10">Nenhum local encontrado</p>
        )}
        <div className="mt-6 top-10 left-0 w-full h-auto pointer-events-none">
          <BackgroundLines />
        </div>
        <div className="bottom-72 left-0 w-full h-auto pointer-events-none">
          <BackgroundLines />
        </div>
      </div>
    </div>
  );
};

export default PageFind;
