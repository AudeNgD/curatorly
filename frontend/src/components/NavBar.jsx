import React from "react";
import logo from "../assets/curatorly_v2.png";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">
            <img src={logo} alt="Curatorly logo" id="logo" />
          </a>
        </li>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/shortlist">Shortlist</a>
        </li>
        <li>
          <a href="/results">Search results</a>
        </li>
        <li>
          <a href="/exhibition">3D Exhibition</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
