import React, { useState } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
  replace,
} from "react-router-dom";

function SortBy(props) {
  const detectSortBy = props.detectSortBy;
  const [selectedSortby, setSelectedSortby] = useState("relevance");
  const [currentSearchParams, setCurrentSearchParams] = useSearchParams();

  const navigate = useNavigate();

  function handleSelect(event) {
    detectSortBy(event.target.value);
    setSelectedSortby(event.target.value);

    //update the url with the new sortby value and remove pagination
    setCurrentSearchParams((params) => {
      params.set("sortby", event.target.value);
      params.delete("page");
      return params;
    });
    const qString = createSearchParams(currentSearchParams).toString();
    navigate(`/results?${qString}`, { replace: true });
  }

  return (
    <div id="sortby-container">
      <label htmlFor="sortby">Sort By:</label>
      <select
        name="sortby"
        id="sortby"
        value={selectedSortby}
        onChange={handleSelect}
      >
        <option value="relevance">Relevance</option>
        <option value="artistAZ">
          Artist {"("}a-z{")"}
        </option>
        <option value="artistZA">
          Artist {"("}z-a{")"}
        </option>
        <option value="titleAZ">
          Title {"("}a-z{")"}
        </option>
        <option value="titleZA">
          Title {"("}z-a{")"}
        </option>
      </select>
    </div>
  );
}

export default SortBy;
