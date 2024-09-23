import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { Link, useNavigate } from "react-router-dom";

function SearchBox() {
  const [europeanaChecked, setEuropeanaChecked] = useState(true);
  const [rijksmuseumChecked, setRijksmuseumChecked] = useState(true);
  const [metChecked, setMetChecked] = useState(true);
  const [chicagoChecked, setChicagoChecked] = useState(true);
  const [artistName, setArtistName] = useState("");

  const navigate = useNavigate();

  function handleEuropeanaCheckbox(event) {
    setEuropeanaChecked(!europeanaChecked);
  }
  function handleRijksmuseumCheckbox(event) {
    setRijksmuseumChecked(!rijksmuseumChecked);
  }

  function handleMetCheckbox(event) {
    setMetChecked(!metChecked);
  }

  function handleChicagoCheckbox(event) {
    setChicagoChecked(!chicagoChecked);
  }

  function getArtistName(event) {
    if (event.target.value !== undefined) {
      const artistName = event.target.value;
      setArtistName(artistName);
    }
  }

  function submitSearch(event) {
    event.preventDefault();
    const aName = artistName.split(" ").join("+");
    const eChecked = europeanaChecked;
    const rChecked = rijksmuseumChecked;
    const mChecked = metChecked;
    const cChecked = chicagoChecked;
    const qString = `?aname=${aName}&echeck=${eChecked}&rcheck=${rChecked}&mcheck=${mChecked}&ccheck=${cChecked}`;

    navigate(`/results${qString}`);
  }

  return (
    <form id="search-form" onSubmit={submitSearch}>
      <div id="search-form-checkboxes">
        <Checkbox
          label="Europeana"
          value={europeanaChecked}
          onChange={handleEuropeanaCheckbox}
        />
        <Checkbox
          label="Rijksmuseum"
          value={rijksmuseumChecked}
          onChange={handleRijksmuseumCheckbox}
        />
        <Checkbox
          label="Metropolitan Museum of Art"
          value={metChecked}
          onChange={handleMetCheckbox}
        />
        <Checkbox
          label="Art Institute of Chicago"
          value={chicagoChecked}
          onChange={handleChicagoCheckbox}
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
