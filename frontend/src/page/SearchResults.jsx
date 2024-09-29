import React from "react";
import Filter from "../components/Filter";
import ResultsList from "../components/ResultsList";
import { useState, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { fetchArtworks } from "../../services/apis";
import formatResponse from "../utils/responseFormatting";
import SortBy from "../components/SortBy";
import { useMediaQuery } from "react-responsive";

function SearchResults() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const [queryParamsString, setQueryParamsString] = useState("");
  const [rijksCount, setRijksCount] = useState(0);
  const [clevelandCount, setClevelandCount] = useState(0);
  const [vamCount, setVamCount] = useState(0);
  const [paginationChange, setPaginationChange] = useState(false);
  const [sortby, setSortby] = useState("relevance");
  const [newSearch, setNewSearch] = useState("");
  const [currentSearchParams, setCurrentSearchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

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

          if (formattedRes.message) {
            setMessage(formattedRes.message);
          } else {
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
            if (formattedRes.artworks) {
              setRijksCount(formattedRes.rijksCount);
              setClevelandCount(formattedRes.clevelandCount);
              setVamCount(formattedRes.vamCount);
              setResults((...currentResults) => formattedRes.artworks);
            }
          }
        });
      }
    }
  }, [queryParamsString]);

  function getNewSearchWord(event) {
    if (event.target.name !== undefined) {
      setNewSearch(event.target.value);
    }
  }

  function submitSearch(event) {
    event.preventDefault();
    const searchWord = newSearch;
    setCurrentSearchParams((params) => {
      params.set("keyword", searchWord);
      params.set("vcheck", true);
      params.set("rcheck", true);
      params.set("ccheck", true);
      params?.delete("page");
      params?.delete("sortby");
      params?.delete("aname");
      params?.delete("century");
      params?.delete("technique");
      return params;
    });
    const qString = createSearchParams(currentSearchParams).toString();
    navigate(`/results?${qString}`);
    setNewSearch("");
  }

  return (
    <div id="searchresults-container">
      <div id="searchresults-new-search">
        <form id="search-form" onSubmit={submitSearch}>
          <label htmlFor="newSearch">
            <input
              type="text"
              name="newSearch"
              placeholder="Search for a keyword"
              id="newSearch"
              value={newSearch}
              onChange={getNewSearchWord}
            />
            <span style={{ display: "none" }}>Search for a keyword</span>
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
      <h1>Search Results</h1>
      <SortBy detectSortBy={setSortby} />
      <section id="filter-results">
        {isMobile ? null : (
          <Filter
            artworks={results}
            rCount={rijksCount}
            cCount={clevelandCount}
            vCount={vamCount}
          />
        )}
        <ResultsList
          artworks={results}
          rCount={rijksCount}
          cCount={clevelandCount}
          vCount={vamCount}
          detectPaginationChange={setPaginationChange}
          message={message}
          setMessage={setMessage}
        />
      </section>
    </div>
  );
}

export default SearchResults;
