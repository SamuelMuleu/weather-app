
import BackgroundLines from "../../components/BackgroundLines";


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
  
 
          <Input ValueInput={(data) => console.log(data)}/>
   
     
  
   
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
