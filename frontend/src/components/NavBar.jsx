import React, { useState, useEffect } from "react";
import logo from "../assets/curatorly_v2.png";
import { useLocation } from "react-router-dom";

function NavBar() {
  const [shortlist, isShortlist] = useState(false);
  const location = useLocation();

  //check if there is a shortlist in local storage
  useEffect(() => {
    if (localStorage.getItem("artworks")) {
      isShortlist(true);
    }
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <a href="/">
            <img src={logo} alt="Curatorly logo" id="logo" />
          </a>
        </li>
        {location.pathname === "/" ? null : (
          <li>
            <a href="/">HOME</a>
          </li>
        )}
        {location.pathname === "/results" ? null : (
          <li>
            <a href="/results?keyword=&rcheck=true&ccheck=true&vcheck=true">
              SEARCH
            </a>
          </li>
        )}
        {location.pathname !== "/shorlist" ? (
          <li>
            <a href="/shortlist">SHORLIST</a>
          </li>
        ) : null}

        {shortlist ? (
          <li>
            <a href="/2D-exhibition">EXHIBITION</a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavBar;
