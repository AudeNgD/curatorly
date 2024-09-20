import React, { useState, useEffect, useMemo } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

import FilterCategory from "./FilterCategory";
import ColourPalette from "./ColourPalette";
import xElevenColours from "../assets/xElevenColours";

export default function Filter({ artworks }) {
  const [results, setResults] = useState({ ...artworks });
  const [uniqueArtists, setUniqueArtists] = useState([]);
  const [uniqueMuseums, setUniqueMuseums] = useState([]);
  const [colors, setUniqueColors] = useState([]);
  const [century, setUniqueCentury] = useState([]);
  const [medium, setUniqueMedium] = useState([]);
  const [technique, setUniqueTechnique] = useState([]);
  const [colourPalette, setColourPalette] = useState([]);

  useEffect(() => {
    setResults(artworks);
    setColourPalette(xElevenColours);

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
        <FilterCategory categoryName="COLOUR PALETTE" uniqueItems={""} />
      </ul>
    </div>
  );
}
