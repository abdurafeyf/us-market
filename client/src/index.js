import React from "react";
import ReactDOM from "react-dom";
// import SunburstAnyChart from "./components/SunburstChart/SunburstAnyChart";
// import SunburstD3V4 from "./components/SunburstChart/SunburstD3V4";
// import { SunburstChartTS } from "./components/SunburstChart/SunburstChartTS";
import ComboChartLW from "./components/ComboChart/ComboChartLW";
function App() {
  return (
    <div className="App">
      <h1>Combo Chart</h1>
      {/* <SunburstAnyChart /> */}
      {/* <div id="chart" /> */}
      {/* <SunburstD3V4/> */}
      {/* <SunburstChartTS/> */}
      <ComboChartLW/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
