import {  useState } from "react";
import BackgroundLines from "../../components/BackgroundLines";

import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Input from "../../components/Input";

export interface Location {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

const PageFind = () => {
  const [find, setFind] = useState<Location[]>([]);


  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleSubmit = (city:string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (city) {
        navigate(`/weatherstatus?city=${encodeURIComponent(city)}`);
      }
    }, 2000);
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <div className="flex flex-col items-center justify-center gap-1 ">
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
              <FaSpinner />
            </div>
          )}

          <Input ValueInput={setFind} />
        </form>
        {find.length > 0 ? (
          <div className="mt-4">
            {find.map((locale, index) => (
              <div className="flex flex-col ">
                <button
                  onClick={()=>handleSubmit(locale.name)}
                  key={index}
                  className="p-3 bg-gray-800  w-72 h-12  hover:bg-gray-700 hover:scale-105 hover:transition ease-linear rounded-lg mb-2"
                >
                  <p className="flex items-center justify-center w-72 -mt-3 -ml-3 ">
                    {locale.name}, {locale.state ? `${locale.state} ` : ""}
                    {locale.country}
                  </p>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white opacity-60 mt-10"></p>
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
