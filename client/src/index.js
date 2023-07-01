import React from "react";
import ReactDOM from "react-dom";
import './index.css';
// import ComboChartLW from "./components/ComboChart/ComboChartLW";
import Sunburst from "./components/SunburstChart/Sunburst";
// import SunburstAnyChart from "./components/SunburstChart/SunburstAnyChart";
// import NavBar from "./components/NavBar/NavBar";
function App() {
  const data = {
    name: 'root',
    children: [
      {
        name: 'A',
        children: [
          { name: 'A1', value: 100 },
          { name: 'A2', value: 200 },
          { name: 'A3', value: 300 },
        ],
      },
      {
        name: 'B',
        children: [
          { name: 'B1', value: 150 },
          { name: 'B2', value: 250 },
        ],
      },
      { name: 'C', value: 400 },
    ],
  };  
  return (
    <div>
      <h1>Sunburst Chart</h1>
      <Sunburst data={data} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
rootElement);