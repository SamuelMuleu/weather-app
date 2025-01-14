import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cloud from "../../assets/Vector.png";
import data from "../../assets/imagens";
import Input from "../../components/Input";
import WeatherCard from "../../components/WeatherCard";
import TableStatus from "../../components/TableStatus";
const WeatherStatus = () => {
    const [city, setCity] = useState([]);
    const [error, setError] = useState("");
    const [find, setFind] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const cityName = new URLSearchParams(location.search).get("city");
    const { images, backgroundWeather } = data;
    console.log(find);
    useEffect(() => {
        if (!cityName)
            return;
        const FetchWeather = async () => {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            console.log(formattedDate);
            try {
                const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
                    params: {
                        q: cityName,
                        appid: "d078f896d3a85db50d3de2fb3705e6ad",
                        lang: "pt_br",
                        date: formattedDate
                    },
                });
                console.log(response.data);
                const cities = [
                    {
                        name: response.data.name,
                        temp: Math.round(response.data.main.temp - 273.15),
                        temp_min: Math.round(response.data.main.temp_min - 273.15),
                        temp_max: Math.round(response.data.main.temp_max - 273.15),
                        feelsLike: Math.round(response.data.main.feels_like - 273.15),
                        state: response.data.sys.country,
                        id: response.data.id,
                        weather: response.data.weather[0].description,
                        timezone: response.data.timezone,
                        timestamp: response.data.timestamp,
                        dt: response.data.dt,
                    },
                ];
                setCity(cities);
            }
            catch (error) {
                console.error(error);
                setError("Erro 404: Não foi possível encontrar a cidade!");
            }
        };
        FetchWeather();
    }, [cityName]);
    const handleSubmitButton = (e) => {
        e.preventDefault();
        navigate("/");
    };
    const formatDate = (timestamp, timezone) => {
        const localTime = new Date((timestamp + timezone) * 1000);
        const dateOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        };
        const timeOptions = {
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC",
        };
        const date = localTime.toLocaleDateString("pt-BR", dateOptions);
        const time = localTime.toLocaleTimeString("pt-BR", timeOptions);
        const periodsOfTheDay = () => {
            const [hours] = time.split(":").map(Number);
            if (hours >= 6 && hours < 12) {
                return "Manhã";
            }
            else if (hours >= 12 && hours < 18) {
                return "Tarde";
            }
            else {
                return "Noite";
            }
        };
        const periods = periodsOfTheDay();
        return { date, time, periods };
    };
    const getBackgroundImage = (period, weather) => {
        console.log(period, weather);
        if (period === "Manhã" && weather.includes("nublado")) {
            return backgroundWeather.watherClearMomentDay;
        }
        else if (period === "Tarde" && weather.includes("nublado")) {
            return backgroundWeather.weatherCloudyMomentNight;
        }
        else if (period === "Tarde" && weather.includes("céu limpo")) {
            return backgroundWeather.watherClearMomentDay;
        }
        else if (period === "Tarde" && weather.includes("chuva moderada")) {
            return backgroundWeather.weatherRainMomentDay;
        }
        else if (period === "Manhã" && weather.includes("algumas nuvens")) {
            return backgroundWeather.weatherCloudMomentDay;
        }
        else if (period === "Noite" && weather.includes("nublado")) {
            return backgroundWeather.weatherCloudyMomentNight;
        }
        else if (period === "Noite" && weather.includes("nuvens dispersas")) {
            return backgroundWeather.weatherCloudyMomentNight;
        }
        else if (period === "Noite" && weather.includes("chuva forte")) {
            return backgroundWeather.weatherRainMomentNight;
        }
        else if (period === "Noite" && weather.includes("céu limpo")) {
            return backgroundWeather.weatherFewCloudsMomentNight;
        }
        else if (period === "Manhã") {
            return backgroundWeather.weatherFewCloudsMomentDay;
        }
        else if (period === "Tarde") {
            return backgroundWeather.weatherFewCloudsMomentNight;
        }
        else {
            return backgroundWeather.watherClearMomentDay;
        }
    };
    const getWeatherIcons = (period, weather) => {
        console.log(period, weather);
        if (period === "Manhã" && weather.includes("nublado")) {
            return images.cloudyDay;
        }
        else if (period === "Tarde" && weather.includes("nublado")) {
            return images.cloudyDay;
        }
        else if (period === "Tarde" && weather.includes("chuva moderada")) {
            return images.cloudStorm;
        }
        else if (period === "Tarde" && weather.includes("céu limpo")) {
            return images.sun;
        }
        else if (period === "Manhã" && weather.includes("algumas nuvens")) {
            return images.cloudyDay;
        }
        else if (period === "Noite" && weather.includes("nublado")) {
            return images.cloudyNight;
        }
        else if (period === "Noite" && weather.includes("nuvens dispersas")) {
            return images.fewCloudNight;
        }
        else if (period === "Noite" && weather.includes("chuva forte")) {
            return images.cloudStorm;
        }
        else if (period === "Noite" && weather.includes("céu limpo")) {
            return images.moonNight;
        }
        else if (period === "Manhã") {
            return images.sun;
        }
        else if (period === "Tarde") {
            return images.fewCloudNight;
        }
        else {
            return images.sun;
        }
    };
    return (_jsxs("div", { className: "flex items-center flex-col   justify-center", children: [_jsxs("div", { className: "flex gap-1  max-w-[21.8rem] ", children: [_jsx("button", { onClick: handleSubmitButton, className: "  flex items-center justify-center  mt-8 bg-bg_input p-2 rounded-lg", children: _jsx("img", { src: cloud, alt: "" }) }), _jsx(Input, { ValueInput: setFind })] }), city.length > 0 ? (_jsxs("div", { children: [city.map((city) => {
                        const { date, time, periods } = formatDate(city.dt, city.timezone);
                        const backgroundImage = getBackgroundImage(periods, city.weather);
                        const iconImage = getWeatherIcons(periods, city.weather);
                        return (_jsx(WeatherCard, { city: city, backgroundImage: backgroundImage, iconImage: iconImage, date: date, time: time }, city.id));
                    }), _jsx(TableStatus, { city: city })] })) : (_jsx("div", { className: "font-bold text-2xl flex items-center  min-h-screen ", children: error }))] }));
};
export default WeatherStatus;
