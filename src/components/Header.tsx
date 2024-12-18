import { useNavigate } from "react-router-dom";
import cloud from "../assets/Vector.png";
const Header = () => {
const navigate = useNavigate()

  const handleSubmit = ()=>{
navigate('/')

}

  return (
    <div className=" flex items-center justify-center ">
    <button onClick={handleSubmit} className="  flex items-center justify-center gap-2 mt-8">

      <img src={cloud} alt="" />

      <p className="text-2xl font-bold text-white">Weather</p>

    </button>
    </div>
  );
};

export default Header;
