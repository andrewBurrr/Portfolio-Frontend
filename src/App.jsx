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
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/projects" element={<Projects/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/contact" element={<Contact/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route path="*" element={<NoPage/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
