import { useState, useEffect } from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Shortlist from "./page/Shortlist";
import SearchResults from "./page/SearchResults";
import Home from "./page/Home";
import Exhibition2D from "./page/Exhibition2D";
import Exhibition2Dv2 from "./page/Exhibition2Dv2";
import Exhibition3D from "./page/Exhibition3D";
import About from "./page/About";
import Footer from "./page/Footer";
import Credits from "./page/Credits";

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <>
              <NavBar />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="/shortlist" element={<Shortlist />}></Route>
          <Route path="/results" element={<SearchResults />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/credits" element={<Credits />}></Route>
        </Route>
        <Route path="/3d-exhibition" element={<Exhibition3D />}></Route>
        <Route path="/2d-exhibition" element={<Exhibition2Dv2 />}></Route>
      </Routes>
    </>
  );
}

export default App;
