import React from "react";

function SortBy() {
  return (
    <div id="sortby-container">
      <label htmlFor="sortby">Sort By:</label>
      <select name="sortby" id="sortby">
        <option value="relevance">Relevance</option>
        <option value="Artist">Artist</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
}

export default SortBy;
