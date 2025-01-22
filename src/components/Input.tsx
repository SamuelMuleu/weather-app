import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Location } from "../pages/Find/page";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const Input = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [find, setFind] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (valueInput === "") {
      setValueInput("");

      setFind([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/geo/1.0/direct",
          {
            params: {
              q: valueInput,
              appid: import.meta.env.VITE_APP_ID,
              limit: 3,
              lang: "pt_br",
            },
          }
        );

        const locations: Location[] = response.data.map((city: Location) => ({
          name: city.name,
          country: city.country,
          state: city.state,
          lat: city.lat,
          lon: city.lon,
        }));

        setFind(locations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    search();
    setFind([]);
  }, [valueInput]);

  const handleValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValueInput(e.target.value);
  };

  const handleSubmit = (
    city: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setFind([]);
      setValueInput("");
      navigate(`/weatherstatus?city=${encodeURIComponent(city)}`);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center ml-2">
      <div>
        {loading && (
          <div className="animate-spin text-blue_base absolute mt-12 ml-64 lg:ml-[33rem]">
            <FaSpinner />
          </div>
        )}
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <motion.input
            type="text"
            placeholder="Buscar Local"
            value={valueInput}
            onChange={handleValueInput}
            aria-label="Campo de busca de local"
            className="mt-9 bg-bg_input border-gray w-72 lg:w-[35rem] h-12 placeholder:p-5 border-2 focus:border-blue_base outline-none rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />

          {find.length > 0 ? (
            <motion.div
              className="mt-6 absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {find.map((locale, index) => (
                <div
                  key={index}
                  className="flex flex-col z-10 relative bottom-4 left-0"
                >
                  <motion.button
                    onClick={(e) => handleSubmit(locale.name, e)}
                    className="p-3 bg-gray-800 w-72 lg:w-[35rem] h-12 hover:bg-gray-700 hover:scale-105 hover:transition ease-linear rounded-lg mb-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p className="flex items-center justify-center w-72 lg:w-[35rem] -mt-3 -ml-3">
                      {locale.name}, {locale.state ? `${locale.state} ` : ""}
                      {locale.country}
                    </p>
                  </motion.button>
                </div>
              ))}
            </motion.div>
          ) : null}
        </form>
      </div>
    </div>
  );
};
export default Input;
