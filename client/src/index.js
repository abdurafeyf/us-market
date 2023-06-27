import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import NavBar from "./components/NavBar/NavBar";
function App() {
  return (
    <NavBar/>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
