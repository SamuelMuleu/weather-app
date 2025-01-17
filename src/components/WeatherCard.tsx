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
    <div className="mt-8 ml-2 max-h-[22rem] mb-5 max-w-[21.8rem] overflow-hidden ">
      <img src={backgroundImage} alt="Clima" className="rounded-lg" />
      <p className="font-black text-xl relative bottom-80 left-5 ">
        {city.name}, {city.state}
      </p>
      <p className="font-black text-5xl relative bottom-40 left-5">
        {city.temp}ºc
      </p>
      <div className="flex gap-1">
        <p className="font-black text-lg relative bottom-40 left-5">
          {city.temp_min}ºc
        </p>
        <p className="font-bold text-lg relative bottom-40 left-5">/</p>
        <p className="font-bold text-lg relative bottom-40 left-5">
          {city.temp_max}ºc
        </p>
      </div>
      <p className="font-semibold relative bottom-[9.5rem] left-9">
        {city.weather}
      </p>
      <p className="font-semibold relative bottom-[25rem] left-5">{date}</p>
      <p className="font-semibold relative bottom-[29.3rem] left-72 ml-2  " >{time}</p>
      <img
        className="relative bottom-[22.5rem] left-44"
        src={iconImage}
        alt="Ícone do Clima"
      />
    </div>
  );
};

export default WeatherCard; 