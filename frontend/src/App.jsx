import { useState, useEffect } from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Shortlist from "./page/Shortlist";
import SearchResults from "./page/SearchResults";
import Home from "./page/Home";
import Exhibition2D from "./page/Exhibition2D";
import Exhibition3D from "./page/Exhibition3D";

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <>
              <NavBar />
              <Outlet />
            </>
          }
        >
          <Route path="/shortlist" element={<Shortlist />}></Route>
          <Route path="/results" element={<SearchResults />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/3d-exhibition" element={<Exhibition3D />}></Route>
          <Route path="/2d-exhibition" element={<Exhibition2D />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
