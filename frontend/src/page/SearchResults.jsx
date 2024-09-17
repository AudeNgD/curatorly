import React from "react";
import Filter from "../components/Filter";
import ResultsList from "../components/ResultsList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArtworks } from "../../services/apis";
import formatResponse from "../utils/responseFormatting";

function SearchResults() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState({});
  const [queryParamsString, setQueryParamsString] = useState("");

  useEffect(() => {
    const paramsString = searchParams.toString();
    if (paramsString !== queryParamsString) {
      setQueryParamsString(paramsString); // Only update if it has changed
    }
  }, [searchParams, queryParamsString]);

  useEffect(() => {
    if (queryParamsString) {
      fetchArtworks(searchParams).then((res) => {
        const formattedRes = formatResponse(res);
        console.log(formattedRes);
        setResults((...currentResults) => formattedRes);
      });
    }
  }, [queryParamsString]);

  return (
    <div id="searchresults-container">
      <h1>Search Results</h1>
      <section id="filter-results">
        <Filter artworks={results} />
        <ResultsList artworks={results} />
      </section>
    </div>
  );
}

export default SearchResults;
