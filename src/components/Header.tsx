import cloud from "../assets/Vector.png";
const Header = () => {
  return (
    <div className=" flex items-center justify-center ">
    <div className="  flex items-center justify-center gap-2 mt-10">

      <img src={cloud} alt="" />
      <p className="text-2xl font-bold text-white">Weather</p>
    </div>
    </div>
  );
};

export default Header;
