import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import BackgroundLines from "../../components/BackgroundLines";
import Header from "../../components/Header";
import Input from "../../components/Input";
const PageFind = () => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center", children: [_jsx(Header, {}), _jsxs("div", { className: "flex flex-col items-center justify-center gap-1 ", children: [_jsx("div", { className: "top-10 left-0 w-full h-auto pointer-events-none", children: _jsx(BackgroundLines, {}) }), _jsx("div", { className: "bottom-72 left-0 w-full h-auto pointer-events-none", children: _jsx(BackgroundLines, {}) }), _jsxs("div", { className: "text-2xl font-bold text-white", children: ["Bem Vindo ao ", _jsx("span", { className: "text-blue_base", children: "Weather" })] }), _jsx("p", { className: "text-1xl opacity-45", children: "Escolha um local para ver a previs\u00E3o do tempo" }), _jsx(Input, { ValueInput: (data) => console.log(data) }), _jsx("div", { className: "mt-6 top-10 left-0 w-full h-auto pointer-events-none", children: _jsx(BackgroundLines, {}) }), _jsx("div", { className: "bottom-72 left-0 w-full h-auto pointer-events-none", children: _jsx(BackgroundLines, {}) })] })] }));
};
export default PageFind;
