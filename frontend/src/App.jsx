import { useState, useEffect } from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Shortlist from "./components/Shortlist";
import SearchResults from "./page/SearchResults";
import Home from "./page/Home";
import Exhibition from "./page/Exhibition";

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
          <Route path="/exhibition" element={<Exhibition />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
