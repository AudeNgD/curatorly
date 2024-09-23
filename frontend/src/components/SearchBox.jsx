import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [rijksmuseumChecked, setRijksmuseumChecked] = useState(true);
  const [clevelandChecked, setClevelandChecked] = useState(true);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  function handleRijksmuseumCheckbox(event) {
    setRijksmuseumChecked(!rijksmuseumChecked);
  }

  function handleClevelandCheckbox(event) {
    setClevelandChecked(!clevelandChecked);
  }

  function getKeyword(event) {
    if (event.target.name !== undefined) {
      setKeyword(event.target.value);
    }
  }

  function submitSearch(event) {
    event.preventDefault();
    const searchWord = keyword;
    const rChecked = rijksmuseumChecked;
    const cChecked = clevelandChecked;
    const qString = `?keyword=${searchWord}&rcheck=${rChecked}&ccheck=${cChecked}`;
    navigate(`/results${qString}`);
  }

  return (
    <form id="search-form" onSubmit={submitSearch}>
      <div id="search-form-checkboxes">
        <Checkbox
          label="Rijksmuseum"
          value={rijksmuseumChecked}
          onChange={handleRijksmuseumCheckbox}
        />
        <Checkbox
          label="Cleveland Museum of Art"
          value={clevelandChecked}
          onChange={handleClevelandCheckbox}
        />
      </div>

      <label htmlFor="keyword">
        <input
          type="text"
          name="keyword"
          id="keyword"
          placeholder="Search for a keyword"
          value={keyword}
          onChange={getKeyword}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBox;
