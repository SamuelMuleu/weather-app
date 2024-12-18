import PageFind from "./pages/Find/page";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherStatus from "./pages/status/page";
function App() {
  return (
    <Router>
      <div className="  bg-bg_principal min-h-screen ">
      
        <Routes>
          <Route path="/" element={<PageFind />} />
          <Route path="/WeatherStatus" element={<WeatherStatus/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
