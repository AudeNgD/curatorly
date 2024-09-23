import React, { useState, useEffect } from "react";
import logo from "../assets/curatorly_v2.png";

function NavBar() {
  const [shortlist, isShortlist] = useState(false);
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
        <li>
          <a href="/">HOME</a>
        </li>

        {shortlist ? (
          <li>
            <a href="/shortlist">SHORLIST</a>
          </li>
        ) : null}
        <li>
          <a href="/about">ABOUT</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
