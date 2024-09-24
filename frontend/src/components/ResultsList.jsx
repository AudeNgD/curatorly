import React, { useState, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";
import LoadingMessage from "./LoadingMessage";

export default function ResultsList(props) {
  console.log(props);
  const allResults = props.artworks;
  const clevelandCount = props.cCount;
  const rijksCount = props.rCount;

  const [artworksPerPage, setArtworksPerPage] = useState(10);
  const [totalNbrofPages, setTotalNbrofPages] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, isLoading] = useState(true);

  //loading message until results are set
  useEffect(() => {
    if (results && results.length > 0) {
      isLoading(false);
    }
  });

  useEffect(() => {
    const totalNbrofPages = Math.ceil(
      clevelandCount + rijksCount / artworksPerPage
    );
    setTotalNbrofPages(totalNbrofPages);

    setResults(
      allResults.slice(
        currentPageIndex * artworksPerPage,
        currentPageIndex * artworksPerPage + artworksPerPage
      )
    );
  }, [props.artworks]);

  // useEffect(() => {
  //   setResults(
  //     allResults.slice(
  //       currentPageIndex * artworksPerPage,
  //       currentPageIndex * artworksPerPage + artworksPerPage
  //     )
  //   );
  // }, [artworks]);

  useEffect(() => {
    let allResults = props.artworks;
    const artworksToDisplay = allResults.slice(
      currentPageIndex * artworksPerPage,
      currentPageIndex * artworksPerPage + artworksPerPage
    );
    setResults(artworksToDisplay);
  }, [currentPageIndex]);

  function handleClickNext() {
    setCurrentPageIndex(currentPageIndex + 1);
  }

  function handleClickPrevious() {
    setCurrentPageIndex(currentPageIndex - 1);
  }

  return (
    <>
      {loading ? (
        <LoadingMessage />
      ) : (
        <div id="results-container">
          {results ? (
            <ArtworkCard
              artworks={results}
              count={rijksCount + clevelandCount}
            />
          ) : (
            <p>No results found</p>
          )}
          <div id="results-pagination">
            {currentPageIndex > 0 ? (
              <button
                className="pagination-button"
                onClick={handleClickPrevious}
              >
                Previous
              </button>
            ) : null}

            <p id="pagination-text">
              {currentPageIndex + 1}/{totalNbrofPages}
            </p>
            {currentPageIndex < totalNbrofPages - 1 ? (
              <button className="pagination-button" onClick={handleClickNext}>
                Next
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
