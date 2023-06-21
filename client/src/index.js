import React from "react";
import ReactDOM from "react-dom";
// import SunburstAnyChart from "./components/SunburstChart/SunburstAnyChart";
import SunburstD3V4 from "./components/SunburstChart/SunburstD3V4"

function App() {
  return (
    <div className="App">
      <h1>Sunburst Chart</h1>
      {/* <SunburstAnyChart /> */}
      {/* <div id="chart" /> */}
      <SunburstD3V4/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
