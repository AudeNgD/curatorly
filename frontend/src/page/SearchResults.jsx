import React from "react";
import Filter from "../components/Filter";
import ResultsList from "../components/ResultsList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArtworks } from "../../services/apis";
import formatResponse from "../utils/responseFormatting";
import SortBy from "../components/SortBy";

function SearchResults() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const [queryParamsString, setQueryParamsString] = useState("");
  const [rijksCount, setRijksCount] = useState(0);
  const [clevelandCount, setClevelandCount] = useState(0);
  const [paginationChange, setPaginationChange] = useState(false);

  useEffect(() => {
    const paramsString = searchParams.toString();
    if (paramsString !== queryParamsString) {
      setQueryParamsString(paramsString); // Only update if it has changed
    }
  }, [searchParams, queryParamsString]);

  useEffect(() => {
    if (queryParamsString) {
      if (!paginationChange) {
        fetchArtworks(searchParams).then((res) => {
          const formattedRes = formatResponse(res);
          console.log(formattedRes.artworks);
          setRijksCount(formattedRes.rijksCount);
          setClevelandCount(formattedRes.clevelandCount);
          setResults((...currentResults) => formattedRes.artworks);
        });
      }
    }
  }, [queryParamsString]);

  return (
    <div id="searchresults-container">
      <h1>Search Results</h1>
      <SortBy />
      <section id="filter-results">
        <Filter
          artworks={results}
          rCount={rijksCount}
          cCount={clevelandCount}
        />
        <ResultsList
          artworks={results}
          rCount={rijksCount}
          cCount={clevelandCount}
          detectPaginationChange={setPaginationChange}
        />
      </section>
    </div>
  );
}

export default SearchResults;
