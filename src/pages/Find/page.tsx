import BackgroundLines from "../../components/BackgroundLines";

import Header from "../../components/Header";
import Input from "../../components/Input";
import { motion } from "framer-motion";

export interface Location {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

const PageFind = () => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>
      <div className="flex flex-col items-center justify-center">
        <div className="absolute top-20 lg:top-10 left-0 w-full h-auto pointer-events-none">
          <BackgroundLines />
        </div>
        <div className="absolute bottom-[13rem] lg:bottom-36 left-0 w-full h-auto pointer-events-none">
          <BackgroundLines />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-44 text-2xl font-bold text-white"
        >
          Bem Vindo ao <span className="text-blue_base">Weather</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-1xl opacity-45"
        >
          Escolha um local para ver a previsão do tempo
        </motion.p>
        <div className="mt-10">
          <Input />
        </div>
      </div>
    </div>
  );
};

export default PageFind;

