import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import ComboChartLW from "./components/ComboChart/ComboChartLW";
import SunburstD3V4 from "./components/SunburstChart/SunburstD3V4";
// import NavBar from "./components/NavBar/NavBar";
function App() {
  return (
    <div>
      <SunburstD3V4/>
      <ComboChartLW/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
