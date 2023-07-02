import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import ComboChartLW from "./components/ComboChart/ComboChartLW";
import SunburstAnyChart from "./components/SunburstChart/SunburstAnyChart";
import NavBar from "./components/NavBar/NavBar";
import SunburstD3V4 from "./components/SunburstChart/SunburstD3V4";
import Sunburst from "./components/SunburstChart/Sunburst";

function App() {
  return (
    <div>
      <NavBar/>
      <Sunburst/>
      <ComboChartLW/>
      <SunburstAnyChart/>
      <SunburstD3V4/>
    </div>
  )
}
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
rootElement);