import React, { useState, useEffect } from "react";
import FilterCategory from "./FilterCategory";
import CenturyPicker from "./CenturyPicker";
import TechniqueSearch from "./TechniqueSearch";

export default function Filter({ artworks }) {
  console.log("artworks in filter", artworks);
  const centuryList = Array.from({ length: 21 }, (_, i) => i + 1);
  const [results, setResults] = useState({ ...artworks });
  const [uniqueArtists, setUniqueArtists] = useState([]);
  const [uniqueMuseums, setUniqueMuseums] = useState([]);
  const [century, setUniqueCentury] = useState(centuryList);
  const [medium, setUniqueMedium] = useState([]);
  const [technique, setUniqueTechnique] = useState([]);

  useEffect(() => {
    setResults(artworks);
    if (results && results.length > 0) {
      console.log("results in filter", results);
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

    // //technique
    // const techniqueList = results.map((result) => {
    //   if (result != undefined) {
    //     return result.technique;
    //   }
    // });
    // const uniqueTechnique = [...new Set(techniqueList)];
    // setUniqueTechnique(uniqueTechnique);
  }, [artworks, results]);

  return (
    <div id="filter-container">
      <h2>Refine</h2>
      <ul className="filter-list">
        <FilterCategory categoryName="ARTISTS" uniqueItems={uniqueArtists} />
        <FilterCategory categoryName="MUSEUMS" uniqueItems={uniqueMuseums} />
        <CenturyPicker />
        <TechniqueSearch />
      </ul>
    </div>
  );
}
