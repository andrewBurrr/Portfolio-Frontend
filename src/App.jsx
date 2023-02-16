import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

function App() {
  return (

      <div className="App">
        <h1>Hello World</h1>
        <ApiRequest />
      </div>
  );
}

export default App;
