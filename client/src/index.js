import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import NavBar from "./components/NavBar/NavBar";
// import ComboChartLW from "./components/ComboChart/ComboChartLW";
// import SunburstD3V4 from "./components/SunburstChart/SunburstD3V4";
function App() {
  return (
    <div>
      <div>
        <NavBar/>
        {/* <SunburstD3V4/> */}
        {/* <ComboChartLW/> */}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
