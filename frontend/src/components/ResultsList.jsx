import React, { useState, useEffect, useRef } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
  replace,
} from "react-router-dom";
import ArtworkCard from "./ArtworkCard";
import LoadingMessage from "./LoadingMessage";

export default function ResultsList(props) {
  const allResults = props.artworks;
  const clevelandCount = props.cCount;
  const rijksCount = props.rCount;
  const vamCount = props.vCount;
  const message = props.message;

  const [artworksPerPage, setArtworksPerPage] = useState(10);
  const [totalNbrofPages, setTotalNbrofPages] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, isLoading] = useState(true);
  const [currentSearchParams, setCurrentSearchParams] = useSearchParams();
  const [fetchMore, setFetchMore] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");

  const detectPaginationChange = props.detectPaginationChange;

  const cachedResults = useRef({});
  const navigate = useNavigate();

  // loading message until results are set
  useEffect(() => {
    if (results && results.length > 0) {
      isLoading(false);
    }
  }, [results]);

  //display message if there is one
  useEffect(() => {
    if (message !== undefined) {
      isLoading(false);
      setDisplayMessage(message);
    }
  });

  //cache the initial results when allResults is set
  useEffect(() => {
    if (allResults && allResults.length > 0) {
      const totalPages = Math.ceil(
        (clevelandCount + rijksCount + vamCount) / artworksPerPage
      );
      setTotalNbrofPages(totalPages);
    }

    //cache results for each page within available results
    for (let i = 0; i < allResults.length / artworksPerPage; i++) {
      const startIndex = i * artworksPerPage;
      const endIndex = startIndex + artworksPerPage;
      const perPageResults = allResults.slice(startIndex, endIndex);
      cachedResults.current[currentPageNumber + i] = perPageResults;
    }

    setResults(cachedResults.current[currentPageNumber] || []);
  }, [allResults, clevelandCount, rijksCount, vamCount, artworksPerPage]);

  function handleClickNext() {
    if (currentPageNumber < totalNbrofPages) {
      const nextPage = currentPageNumber + 1;

      //check if next page data is already cached
      if (!cachedResults.current[currentPageNumber + 1]) {
        //tell the parent component it isn't pagination change - cache data has run out
        detectPaginationChange(false);
      } else {
        //if yes, set results to the next page
        detectPaginationChange(true);
        setResults(cachedResults.current[currentPageNumber + 1]);
      }

      setCurrentPageNumber(nextPage);
      updateUrlParams(nextPage);
    }
  }

  function handleClickPrevious() {
    if (currentPageNumber > 1) {
      const previousPage = currentPageNumber - 1;
      setResults(cachedResults.current[previousPage]);
      setCurrentPageNumber(previousPage);
      updateUrlParams(previousPage);
    }
  }

  //Update the URL params without reloading the page
  function updateUrlParams(pageNumber) {
    setCurrentSearchParams((params) => {
      params.set("page", pageNumber);
      return params;
    });
    const qString = createSearchParams(currentSearchParams).toString();
    navigate(`/results?${qString}`, { replace: true });
  }

  return (
    <>
      {loading ? (
        <LoadingMessage />
      ) : displayMessage == "" ? (
        <div id="results-container">
          {results ? (
            <ArtworkCard
              artworks={results}
              count={rijksCount + clevelandCount + vamCount}
            />
          ) : (
            <p>No results found</p>
          )}
          <div id="results-pagination">
            {currentPageNumber > 1 ? (
              <button
                className="pagination-button"
                onClick={handleClickPrevious}
              >
                Previous
              </button>
            ) : null}

            <p id="pagination-text">
              {currentPageNumber}/{totalNbrofPages}
            </p>
            {currentPageNumber < totalNbrofPages ? (
              <button className="pagination-button" onClick={handleClickNext}>
                Next
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <p id="no-result-message">{displayMessage}</p>
      )}
    </>
  );
}
