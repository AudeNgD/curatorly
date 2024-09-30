import React from "react";
import SearchBox from "../components/SearchBox";
import rijkspicture from "../assets/rijksmuseum-lead-pic.jpg";
import clevelandpicture from "../assets/cleveland-museum-lead-pic.jpg";
import vampicture from "../assets/vam-lead-pic.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleMuseumSearch(event) {
    event.preventDefault();
    const museum = event.target.value;
    let rChecked = false;
    let cChecked = false;
    let vChecked = false;
    museum === "rijksmuseum"
      ? (rChecked = true)
      : museum === "cleveland"
      ? (cChecked = true)
      : (vChecked = true);
    const qString = `?keyword=&rcheck=${rChecked}&ccheck=${cChecked}&vcheck=${vChecked}`;
    navigate(`/results${qString}`);
  }
  return (
    <>
      <div id="homepage" className="sticky">
        <div id="homepage-top">
          <section id="hero">
            <div id="hero-text">
              <h1>curatorly</h1>
              <h3>Create your own virtual exhibition</h3>
              <ul>
                <li>
                  Search through <strong>750,000+ items</strong> from the
                  collections of the <strong> Rijskmuseum</strong>,{" "}
                  <strong>the Victoria & Albert Museum</strong>, and the{" "}
                  <strong>Cleveland Museum of Art</strong>. Like to shortlist
                  artworks that you want to display in your exhibition.
                </li>
              </ul>
            </div>
            <div id="search-box">
              <SearchBox />
            </div>
          </section>
        </div>
        <section id="about-museums">
          <h2>About the museums</h2>
          <div id="museum-info">
            <div className="museum-card">
              <img
                src={rijkspicture}
                alt="landscape picture of a group of people in front of a painting"
              />
              <h3>Rijksmuseum</h3>
              <p>
                The Rijksmuseum is a Dutch national museum dedicated to arts and
                history in Amsterdam. The museum is located at the Museum Square
                in the borough Amsterdam South, close to the Van Gogh Museum,
                the Stedelijk Museum Amsterdam, and the Concertgebouw.
              </p>
              <button onClick={handleMuseumSearch} value={"rijksmuseum"}>
                Search the Rijksmuseum collections
              </button>
            </div>
            <div className="museum-card">
              <img
                src={vampicture}
                alt="a seated  woman with a yellow jumper looking at a marble statue"
              />
              <h3>V&A Museum</h3>
              <p>
                The Victoria and Albert Museum in London is the world's largest
                museum of applied and decorative arts and design, as well as
                sculpture, housing a permanent collection of over 2.27 million
                objects.
              </p>
              <button onClick={handleMuseumSearch} value={"vam"}>
                Search the V&A Museum collections
              </button>
            </div>
            <div className="museum-card">
              <img
                src={clevelandpicture}
                alt="landscape picture of the outside of the Cleveland Museum of Art"
              />
              <h3>Cleveland Museum of Art</h3>
              <p>
                The Cleveland Museum of Art is an art museum in Cleveland, Ohio,
                located in the Wade Park District, in the University Circle
                neighborhood on the city's east side. Internationally renowned
                for its substantial holdings of Asian and Egyptian art.
              </p>
              <button onClick={handleMuseumSearch} value={"cleveland"}>
                Search the Cleveland Museum of Art collections
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
