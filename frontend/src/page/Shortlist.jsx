import React, { useEffect, useState } from "react";
import ResultsList from "../components/ResultsList";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";

function Shortlist() {
  const [shortlist, setShortlist] = useState([]);
  const [clevelandCount, setClevelandCount] = useState(0);
  const [rijksCount, setRijksCount] = useState(0);
  const [vamCount, setVamCount] = useState(0);
  const [message, setMessage] = useState("");
  const [paginationChange, setPaginationChange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("artworks");
    setShortlist(JSON.parse(storedData));
    //count how many artworks for each museum
    const clevelandCount = JSON.parse(storedData).filter(
      (artwork) => artwork.museum === "The Cleveland Museum of Art"
    ).length;
    const rijksCount = JSON.parse(storedData).filter(
      (artwork) => artwork.museum === "Rijksmuseum"
    ).length;
    const vamCount = JSON.parse(storedData).filter(
      (artwork) => artwork.museum === "Victoria and Albert Museum"
    ).length;
    setClevelandCount(clevelandCount);
    setRijksCount(rijksCount);
    setVamCount(vamCount);
  }, [clevelandCount, rijksCount, vamCount]);

  function twoDClick() {
    navigate("/2d-exhibition");
  }

  function threeDClick() {
    // navigate("/3d-exhibition");
    navigate("/movie");
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
            <Filter
              artworks={shortlist}
              rCount={rijksCount}
              cCount={clevelandCount}
              vCount={vamCount}
            />
            <ResultsList
              artworks={shortlist}
              rCount={rijksCount}
              cCount={clevelandCount}
              vCount={vamCount}
              message={message}
              setMessage={setMessage}
              detectPaginationChange={setPaginationChange}
            />
          </section>
        </div>
      ) : (
        <div id="shortlist-container" className="empty-shortlist">
          <h2>No items in shortlist</h2>
          <p>
            Go back to the <a href="/">home page</a> to add items to your
            shortlist.
          </p>
        </div>
      )}
    </>
  );
}

export default Shortlist;
