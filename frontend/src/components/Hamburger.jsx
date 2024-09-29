import React, { useState, useEffect } from "react";
import logo from "../assets/curatorly_v2.png";
import closeLogo from "../assets/curatorly_hamburger_closed.png";
import openLogo from "../assets/curatorly_hamburger_open.png";
import { useLocation } from "react-router-dom";

function Hamburger() {
  const [hamburgerExpanded, setHamburgerExpanded] = useState(false);
  const [shortlist, isShortlist] = useState(false);
  const location = useLocation();

  //check if there is a shortlist in local storage
  useEffect(() => {
    if (localStorage.getItem("artworks")) {
      isShortlist(true);
    }
  }, []);

  function hamburgerClick() {
    setHamburgerExpanded(!hamburgerExpanded);
  }

  return (
    <div className="hamburger-container">
      {hamburgerExpanded ? (
        <img
          src={openLogo}
          alt="Curatorly logo"
          id="hamburger-logo"
          onClick={hamburgerClick}
        />
      ) : (
        <img
          src={closeLogo}
          alt="Curatorly logo"
          id="hamburger-logo"
          onClick={hamburgerClick}
        />
      )}
      {hamburgerExpanded && (
        <ul className="hamburger-container-list">
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
          {location.pathname !== "/shortlist" ? (
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
      )}
    </div>
  );
}

export default Hamburger;
