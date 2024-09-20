import React, { useState, useEffect, useMemo } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

import FilterCategory from "./FilterCategory";

export default function Filter({ artworks }) {
  const [results, setResults] = useState({ ...artworks });
  const [uniqueArtists, setUniqueArtists] = useState([]);
  const [uniqueMuseums, setUniqueMuseums] = useState([]);

  useEffect(() => {
    setResults(artworks);
    if (results && results.length > 0) {
      //artists
      const artistList = results.map((result) => result.artist);
      const uniqueArtists = [...new Set(artistList)];
      setUniqueArtists(uniqueArtists);
      //museums
      const museumList = results.map((result) => result.museum);
      const uniqueMuseums = [...new Set(museumList)];
      setUniqueMuseums(uniqueMuseums);
    }
  }, [artworks, results]);

  return (
    <div id="filter-container">
      <h2>Refine</h2>
      <ul className="filter-list">
        <FilterCategory categoryName="ARTISTS" uniqueItems={uniqueArtists} />
        <FilterCategory categoryName="MUSEUMS" uniqueItems={uniqueMuseums} />
      </ul>
    </div>
  );
}
