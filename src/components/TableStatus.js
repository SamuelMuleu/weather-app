import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHeader, TableRow, } from "@/components/ui/table";
import termometer from "../assets/svg/thermometerSimpleLight.svg";
import cloudRain from "../assets/svg/cloudRainLight.svg";
const TableStatus = ({ city }) => {
    return (_jsx(_Fragment, { children: city.map((c) => (_jsxs(Table, { children: [_jsxs(TableHeader, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: _jsx("img", { src: termometer, alt: "Term\u00F4metro" }) }), _jsx(TableCell, { children: "Sensa\u00E7\u00E3o T\u00E9rmica" }), _jsxs(TableCell, { children: [c.temp, "\u00BAc"] })] }), _jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: _jsx("img", { src: cloudRain, alt: "Chuva" }) }), _jsx(TableCell, { children: "Probabilidade de Chuva" }), _jsxs(TableCell, { children: [c.temp, "\u00BAc"] })] })] }), _jsx(TableBody, { children: _jsx(TableRow, { children: _jsx(TableCell, { colSpan: 3, children: "Dados adicionais podem ir aqui" }) }) })] }, c.id))) }));
};
export default TableStatus;
