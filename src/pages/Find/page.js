import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import BackgroundLines from "../../components/BackgroundLines";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { motion } from "framer-motion";
const PageFind = () => {
    return (_jsxs("div", { className: "relative flex flex-col items-center justify-center", children: [_jsx(motion.div, { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: _jsx(Header, {}) }), _jsxs("div", { className: "flex flex-col items-center justify-center", children: [_jsx("div", { className: "absolute top-20 lg:top-10 left-0 w-full h-auto pointer-events-none", children: _jsx(BackgroundLines, {}) }), _jsx("div", { className: "absolute bottom-[13rem] lg:bottom-36 left-0 w-full h-auto pointer-events-none", children: _jsx(BackgroundLines, {}) }), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1 }, className: "mt-44 text-2xl font-bold text-white", children: ["Bem Vindo ao ", _jsx("span", { className: "text-blue_base", children: "Weather" })] }), _jsx(motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1, delay: 0.5 }, className: "text-1xl opacity-45", children: "Escolha um local para ver a previs\u00E3o do tempo" }), _jsx("div", { className: "mt-10", children: _jsx(Input, {}) })] })] }));
};
export default PageFind;
