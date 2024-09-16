import React from "react";
import SearchBox from "../components/SearchBox";

function Home() {
  return (
    <>
      <div id="homepage">
        <section id="hero">
          <div id="hero-text">
            <h1>curatorly</h1>
            <p>Create and share your own virtual exhibitions.</p>
            <ul>
              <li>
                Search through the Europeana and the Rijskmuseum museums for
                artworks.
              </li>
              <li>Save your favourite artworks to your shortlist.</li>
              <li>View your exhibition either in 2D or in 3D.</li>
            </ul>
          </div>
          <div id="search-box">
            <SearchBox />
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
