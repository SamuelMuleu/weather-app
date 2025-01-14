import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import cloud from "../assets/Vector.png";
const Header = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/');
    };
    return (_jsx("div", { className: " flex items-center justify-center ", children: _jsxs("button", { onClick: handleSubmit, className: "  flex items-center justify-center gap-2 mt-8", children: [_jsx("img", { src: cloud, alt: "" }), _jsx("p", { className: "text-2xl font-bold text-white", children: "Weather" })] }) }));
};
export default Header;
