import React from "react";
import Filter from "../components/Filter";
import ResultsList from "../components/ResultsList";

function SearchResults() {
  return (
    <div id="searchresults-container">
      <h1>Search Results</h1>
      <section id="filter-results">
        <Filter />
        <ResultsList />
      </section>
    </div>
  );
}

export default SearchResults;
