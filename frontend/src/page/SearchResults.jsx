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
  const [vamCount, setVamCount] = useState(0);
  const [paginationChange, setPaginationChange] = useState(false);
  const [sortby, setSortby] = useState("relevance");

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

          //if sortby is not relevance, sort the results
          if (sortby !== "relevance") {
            formattedRes.artworks.sort((a, b) => {
              if (sortby === "artistAZ") {
                return a.artist.localeCompare(b.artist);
              } else if (sortby === "artistZA") {
                return b.artist.localeCompare(a.artist);
              } else if (sortby === "titleAZ") {
                return a.title.localeCompare(b.title);
              } else if (sortby === "titleZA") {
                return b.title.localeCompare(a.title);
              }
            });
          }
          console.log(formattedRes.artworks);
          setRijksCount(formattedRes.rijksCount);
          setClevelandCount(formattedRes.clevelandCount);
          setVamCount(formattedRes.vamCount);
          setResults((...currentResults) => formattedRes.artworks);
        });
      }
    }
  }, [queryParamsString]);

  return (
    <div id="searchresults-container">
      <h1>Search Results</h1>
      <SortBy detectSortBy={setSortby} />
      <section id="filter-results">
        <Filter
          artworks={results}
          rCount={rijksCount}
          cCount={clevelandCount}
          vCount={vamCount}
        />
        <ResultsList
          artworks={results}
          rCount={rijksCount}
          cCount={clevelandCount}
          vCount={vamCount}
          detectPaginationChange={setPaginationChange}
        />
      </section>
    </div>
  );
}

export default SearchResults;
