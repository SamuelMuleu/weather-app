import { City } from "../pages/status/page";

interface WeatherCardProps {
  city: City;
  backgroundImage: string;
  iconImage: string;
  date: string;
  time: string;
}
const WeatherCard = ({
  city,
  backgroundImage,
  iconImage,
  date,
  time,
}: WeatherCardProps) => {
  return (
    <div className="mt-8 max-h-[22rem] mb-5 w-[22rem] lg:w-[39.5rem] lg:min-h-[29rem] overflow-hidden relative rounded-lg" >
      <img src={backgroundImage} alt="Clima" className="rounded-lg w-full h-full object-cover" />
      <div className="absolute top-5 left-5">
        <p className="font-black text-xl">
          {city.name}, {city.state}
        </p>
      </div>
      <div className="absolute top-56 lg:top-80 left-5">
        <p className="font-black text-5xl lg:text-7xl">
          {city.temp}ºc
        </p>
      </div>
      <div className="absolute top-[16.7rem] lg:top-[25rem] left-6 flex gap-1">
        <p className="font-black text-lg">
          {city.temp_min}ºc
        </p>
        <p className="font-bold text-lg">/</p>
        <p className="font-bold text-lg">
          {city.temp_max}ºc
        </p>
      </div>
      <div className="absolute bottom-8 left-7 lg:bottom-[2.4rem] lg:left-32">
        <p className="font-semibold opacity-65">
          {city.weather}
        </p>
      </div>
      <div className="absolute top-12 left-5">
        <p className="font-semibold">
          {date}
        </p>
      </div>
      <div className="absolute top-7 right-3">
        <p className="font-semibold">
          {time}
        </p>
      </div>
      <div className="absolute top-44   left-40  lg:left-96 lg:top-72">
        <img src={iconImage} alt="Ícone do Clima" className="size-52" />
      </div>
    </div>
  );
};

export default WeatherCard;
