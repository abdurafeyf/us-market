import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import ComboChartLW from "./components/ComboChart/ComboChartLW";
// import Sunburst from "./components/SunburstChart/Sunburst";
import SunburstAnyChart from "./components/SunburstChart/SunburstAnyChart";
import NavBar from "./components/NavBar/NavBar";
function App() {
  return (
    <div>
      <NavBar/>
      <SunburstAnyChart/>
      <ComboChartLW/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
rootElement);