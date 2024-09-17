import React, { useEffect, useState } from "react";
import ResultsList from "../components/ResultsList";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";

function Shortlist() {
  const [shortlist, setShortlist] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("artworks");
    setShortlist(JSON.parse(storedData));
  }, []);

  function twoDClick() {
    navigate("/2d-exhibition");
  }

  function threeDClick() {
    navigate("/3d-exhibition");
  }

  return (
    <>
      {shortlist && shortlist.length > 0 ? (
        <div id="shortlist-container">
          <h1>Your shortlisted artworks</h1>
          <section id="exhibition-buttons">
            <button className="exhibition-button" onClick={twoDClick}>
              View as 2D exhibition
            </button>
            <button className="exhibition-button" onClick={threeDClick}>
              View as 3D exhibition
            </button>
          </section>
          <section id="filter-results">
            <Filter artworks={shortlist} />
            <ResultsList artworks={shortlist} />
          </section>
        </div>
      ) : (
        <h2>No items in shortlist</h2>
      )}
    </>
  );
}

export default Shortlist;
