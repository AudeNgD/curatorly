import React, { useState } from "react";
import Checkbox from "./Checkbox";

function SearchBox() {
  const [europeanaChecked, setEuropeanaChecked] = useState(true);
  const [rijksmuseumChecked, setRijksmuseumChecked] = useState(true);
  const [artistName, setArtistName] = useState("");

  function handleEuropeanaCheckbox(event) {
    setEuropeanaChecked(!europeanaChecked);
  }
  function handleRijksmuseumCheckbox(event) {
    setRijksmuseumChecked(!rijksmuseumChecked);
  }

  function getArtistName(event) {
    const artistName = event.target.value;
    console.log(artistName);
    setArtistName(artistName);
  }

  function submitSearch(event) {
    event.preventDefault();
    console.log(event.target.value);
  }

  return (
    <form id="search-form" onSubmit={submitSearch}>
      <div id="search-form-checkboxes">
        <Checkbox
          label="Europeana"
          value="europeana"
          onChange={handleEuropeanaCheckbox}
        />
        <Checkbox
          label="Rijksmuseum"
          value="rijksmuseum"
          onChange={handleRijksmuseumCheckbox}
        />
      </div>

      <label htmlFor="artistName">
        <input
          type="text"
          name="artistName"
          id="artistName"
          placeholder="Search for an artist"
          value={artistName}
          onChange={getArtistName}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBox;
