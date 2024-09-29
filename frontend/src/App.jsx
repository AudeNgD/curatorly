import { useState, useEffect } from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hamburger from "./components/Hamburger";
import Footer from "./components/Footer";
import Shortlist from "./page/Shortlist";
import SearchResults from "./page/SearchResults";
import Home from "./page/Home";
import Exhibition2Dv2 from "./page/Exhibition2Dv2";
import Exhibition3D from "./page/Exhibition3D";
import Credits from "./page/Credits";
import Object from "./page/Object";
import Movie from "./page/Movie";
import PageNotFound from "./page/PageNotFound";
import { useMediaQuery } from "react-responsive";

function App() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <>
      {isMobile ? (
        <p id="media-warning">
          To provide you with a great experience, curatorly is currently
          available only on tablets or laptops.
        </p>
      ) : (
        <Routes>
          <Route
            element={
              <>
                {isTabletOrMobile ? <Hamburger /> : <NavBar />}
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route path="/shortlist" element={<Shortlist />}></Route>
            <Route path="/results" element={<SearchResults />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/credits" element={<Credits />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
          <Route path="/:museum/object/:id" element={<Object />}></Route>
          <Route path="/3d-exhibition" element={<Exhibition3D />}></Route>
          <Route path="/2d-exhibition" element={<Exhibition2Dv2 />}></Route>
          <Route path="movie" element={<Movie />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
