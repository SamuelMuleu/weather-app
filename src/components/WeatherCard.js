import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const WeatherCard = ({ city, backgroundImage, iconImage, date, time, }) => {
    return (_jsxs("div", { className: "mt-8 ml-2 w-[21.8rem]", children: [_jsx("img", { src: backgroundImage, alt: "Clima", className: "rounded-lg" }), _jsxs("p", { className: "font-black text-xl relative bottom-80 left-5", children: [city.name, ", ", city.state] }), _jsxs("p", { className: "font-black text-5xl relative bottom-40 left-5", children: [city.temp, "\u00BAc"] }), _jsxs("div", { className: "flex gap-1", children: [_jsxs("p", { className: "font-black text-xl relative bottom-40 left-5", children: [city.temp_min, "\u00BAc"] }), _jsx("p", { className: "font-bold text-xl relative bottom-40 left-5", children: "/" }), _jsxs("p", { className: "font-bold text-xl relative bottom-40 left-5", children: [city.temp_max, "\u00BAc"] })] }), _jsx("p", { className: "font-semibold relative bottom-[10rem] left-5", children: city.weather }), _jsx("p", { className: "font-semibold relative bottom-[25rem] left-5", children: date }), _jsx("p", { className: "font-semibold relative bottom-[29.5rem] left-72", children: time }), _jsx("img", { className: "relative bottom-[21.5rem] left-52", src: iconImage, alt: "\u00CDcone do Clima" })] }));
};
export default WeatherCard;
