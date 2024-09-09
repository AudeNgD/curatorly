import { useState, useEffect } from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Shortlist from "./components/Shortlist";
import SearchResults from "./components/SearchResults";

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
          <Route path="/" element={<Navigate to="/results" />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
