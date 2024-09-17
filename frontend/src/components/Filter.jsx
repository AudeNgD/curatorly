import React, { useState, useEffect, useMemo } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

export default function Filter({ artworks }) {
  const [results, setResults] = useState({ ...artworks });
  const [expanded, setExpanded] = useState(false);
  const [uniqueArtists, setUniqueArtists] = useState([]);
  const [currentSearchParams, setCurrentSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    setResults(artworks);
    if (results && results.length > 0) {
      const artistList = results.map((result) => result.artist);
      const uniqueArtists = [...new Set(artistList)];
      setUniqueArtists(uniqueArtists);
    }
  }, [results, artworks]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const artist = event.target.value;

    setCurrentSearchParams((params) => {
      params.set("aname", artist);
      console.log(params);
      return params;
    });

    const qString = createSearchParams(currentSearchParams).toString();

    console.log(qString);
    navigate(`/results?${qString}`);
  };

  return (
    <div id="filter-container">
      <h2>Refine</h2>
      <ul className="filter-list">
        <li
          className={`filter-list-title ${expanded ? "expanded" : "collapsed"}`}
        >
          <button className="filter-title" onClick={handleToggle}>
            ARTISTS
          </button>
          {expanded && (
            <ul className="filter-option-list">
              {uniqueArtists.map((artist) => (
                <li key={artist}>
                  <button
                    className="filter-option"
                    onClick={handleFilter}
                    value={artist}
                  >
                    {"> "}
                    {artist}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
