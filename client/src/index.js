import React from "react";
import ReactDOM from "react-dom";
import SunburstAnyChart from "./components/SunburstChart/SunburstAnyChart";
//import SunburstD3V4 from "./SunburstD3V4"

function App() {
  return (
    <div className="App">
      <h1>This is a new chart</h1>
      <SunburstAnyChart />
      {/* <div id="chart" /> */}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
