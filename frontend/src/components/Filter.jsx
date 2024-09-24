import React, { useState, useEffect } from "react";
import FilterCategory from "./FilterCategory";
import CenturyPicker from "./CenturyPicker";
import TechniqueSearch from "./TechniqueSearch";

export default function Filter(props) {
  const artworks = props.artworks;
  const rijksCount = props.rCount;
  const clevelandCount = props.cCount;
  const [results, setResults] = useState({ ...artworks });
  const [uniqueArtists, setUniqueArtists] = useState([]);
  const [uniqueMuseums, setUniqueMuseums] = useState([]);
  const [medium, setUniqueMedium] = useState([]);

  useEffect(() => {
    setResults(artworks);
    if (results && results.length > 0) {
      //artists
      let artistList = results.map((result, index) => {
        if (result != undefined) {
          return result.artist;
        }
      });
      const uniqueArtists = [...new Set(artistList)];
      setUniqueArtists(uniqueArtists);

      //museums
      const museumList = results.map((result) => {
        if (result != undefined) {
          return result.museum;
        }
      });
      const uniqueMuseums = [...new Set(museumList)];
      setUniqueMuseums(uniqueMuseums);
    }
  }, [artworks, results]);

  return (
    <div id="filter-container">
      <h2>Refine</h2>
      <ul className="filter-list">
        <FilterCategory categoryName="ARTISTS" uniqueItems={uniqueArtists} />
        <FilterCategory
          categoryName="MUSEUMS"
          uniqueItems={uniqueMuseums}
          rCount={rijksCount}
          cCount={clevelandCount}
        />
        <CenturyPicker />
        <TechniqueSearch />
      </ul>
    </div>
  );
}
