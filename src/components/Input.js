import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
const Input = ({ ValueInput }) => {
    const [valueInput, setValueInput] = useState("");
    const [find, setFind] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!valueInput) {
            ValueInput([]);
            setFind([]);
            return;
        }
        const search = async () => {
            try {
                const response = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
                    params: {
                        q: valueInput,
                        appid: import.meta.env.VITE_APP_ID,
                        limit: 3,
                        lang: "pt_br",
                    },
                });
                const locations = response.data.map((city) => ({
                    name: city.name,
                    country: city.country,
                    state: city.state,
                    lat: city.lat,
                    lon: city.lon,
                }));
                ValueInput(locations);
                setFind(locations);
            }
            catch (error) {
                console.error(error);
            }
        };
        search();
        setFind([]);
    }, [ValueInput, valueInput]);
    const handleValueInput = (e) => {
        e.preventDefault();
        setValueInput(e.target.value);
    };
    const handleSubmit = (city, e) => {
        e.preventDefault();
        if (!city)
            return;
        setLoading(true);
        setFind([]);
        setTimeout(() => {
            setLoading(false);
            navigate(`/weatherstatus?city=${encodeURIComponent(city)}`);
        }, 1500);
    };
    return (_jsx("div", { className: " flex items-center justify-center ml-2 ", children: _jsxs("div", { children: [loading && (_jsx("div", { className: "animate-spin text-blue_base absolute mt-12 ml-64", children: _jsx(FaSpinner, {}) })), _jsxs("form", { onSubmit: (e) => e.preventDefault(), children: [_jsx("input", { type: "text", placeholder: "Buscar Local", value: valueInput, onChange: handleValueInput, className: "mt-9 bg-bg_input border-gray w-72 h-12 placeholder:p-5 border-2 focus:border-blue_base outline-none rounded-lg" }), find.length > 0 ? (_jsx("div", { className: "mt-6 absolute", children: find.map((locale, index) => (_jsx("div", { className: "flex flex-col z-10 relative bottom-4 left-0", children: _jsx("button", { onClick: (e) => handleSubmit(locale.name, e), className: "p-3 bg-gray-800 w-72 h-12 hover:bg-gray-700 hover:scale-105 hover:transition ease-linear rounded-lg mb-2", children: _jsxs("p", { className: "flex items-center justify-center w-72 -mt-3 -ml-3", children: [locale.name, ", ", locale.state ? `${locale.state} ` : "", locale.country] }) }) }, index))) })) : null] })] }) }));
};
export default Input;
