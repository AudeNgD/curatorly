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

  const [artworksPerPage, setArtworksPerPage] = useState(10);
  const [totalNbrofPages, setTotalNbrofPages] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, isLoading] = useState(true);
  const [currentSearchParams, setCurrentSearchParams] = useSearchParams();
  const [fetchMore, setFetchMore] = useState(false);

  const cachedResults = useRef({});
  const navigate = useNavigate();

  //loading message until results are set
  useEffect(() => {
    if (results && results.length > 0) {
      isLoading(false);
    }
  }, [results]);

  //cache the initial results when allResults is set
  useEffect(() => {
    if (allResults && allResults.length > 0) {
      const totalPages = Math.ceil(
        (clevelandCount + rijksCount) / artworksPerPage
      );
      setTotalNbrofPages(totalPages);
    }

    //cache results for each page within 200
    for (let page = 1; page <= totalNbrofPages; page++) {
      const startIndex = (page - 1) * artworksPerPage;
      const endIndex = startIndex + artworksPerPage;
      const perPageResults = allResults.slice(startIndex, endIndex);
      cachedResults.current[page] = perPageResults;
    }

    //set the first page
    setResults(cachedResults.current[1] || []);
    isLoading(false);
  }, [allResults, clevelandCount, rijksCount, artworksPerPage]);

  function handleClickNext() {
    if (currentPageNumber < totalNbrofPages) {
      const nextPage = currentPageNumber + 1;

      //check if next page data is already cached
      if (!cachedResults.current[currentPageNumber + 1]) {
        //if not, set fetchMore to true to disable the user from clicking next again
        setFetchMore(true);
        //navigate to the next page to force the fetch
        setCurrentSearchParams((params) => {
          params.set("page", pageNumber);
          return params;
        });
        const qString = createSearchParams(currentSearchParams).toString();
        navigate(`/results?${qString}`);
      } else {
        //if yes, set results to the next page
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
            {currentPageNumber > 1 ? (
              <button
                className="pagination-button"
                disabled={fetchMore}
                onClick={handleClickPrevious}
              >
                Previous
              </button>
            ) : null}

            <p id="pagination-text">
              {currentPageNumber}/{totalNbrofPages}
            </p>
            {currentPageNumber < totalNbrofPages ? (
              <button
                className="pagination-button"
                disabled={fetchMore}
                onClick={handleClickNext}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
