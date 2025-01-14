import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageFind from "./pages/Find/page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherStatus from "./pages/status/page";
function App() {
    return (_jsx(Router, { children: _jsx("div", { className: "  bg-bg_principal min-h-screen ", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(PageFind, {}) }), _jsx(Route, { path: "/WeatherStatus", element: _jsx(WeatherStatus, {}) })] }) }) }));
}
export default App;
