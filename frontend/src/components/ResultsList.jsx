import React, { useState, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";

export default function ResultsList({ artworks }) {
  const allResults = artworks;
  const [artworksPerPage, setArtworksPerPage] = useState(10);
  const totalNbrofPages = Math.ceil(allResults.length / artworksPerPage);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(
      allResults.slice(
        currentPageIndex * artworksPerPage,
        currentPageIndex * artworksPerPage + artworksPerPage
      )
    );
  }, [artworks]);

  useEffect(() => {
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
    <div id="results-container">
      {results ? (
        <ArtworkCard artworks={results} count={allResults.length} />
      ) : (
        <p>No results found</p>
      )}
      <div id="results-pagination">
        {currentPageIndex > 0 ? (
          <button onClick={handleClickPrevious}>Previous</button>
        ) : null}
        <p>
          {currentPageIndex + 1}/{totalNbrofPages}
        </p>
        {currentPageIndex < totalNbrofPages - 1 ? (
          <button onClick={handleClickNext}>Next</button>
        ) : null}
      </div>
    </div>
  );
}
