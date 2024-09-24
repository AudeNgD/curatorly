import React, { useState } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

function FilterCategory(props) {
  const categoryName = props.categoryName;
  const uniqueItems = props.uniqueItems;
  let rikjsCount = 0;
  let clevelandCount = 0;
  props.rCount ? (rikjsCount = props.rCount) : (rikjsCount = 0);
  props.cCount ? (clevelandCount = props.cCount) : (clevelandCount = 0);
  const [expanded, setExpanded] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useSearchParams();
  const [artistPicked, setArtistPicked] = useState(false);
  const [artist, setArtist] = useState("");
  const [museumPicked, setMuseumPicked] = useState(false);
  const [museum, setMuseum] = useState("");

  const navigate = useNavigate();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleFilter = (event) => {
    event.preventDefault();

    if (categoryName === "MUSEUMS") {
      const museum = event.target.value;
      if (museum === "Rijksmuseum") {
        setCurrentSearchParams((params) => {
          params.set("ccheck", !params.get("ccheck"));
          return params;
        });
      }

      if (museum === "The Cleveland Museum of Art") {
        setCurrentSearchParams((params) => {
          params.set("rcheck", !params.get("rcheck"));
          return params;
        });
      }

      const qString = createSearchParams(currentSearchParams).toString();
      navigate(`/results?${qString}`);
      setMuseumPicked(true);
      setMuseum(museum);
    }

    if (categoryName === "ARTISTS") {
      const artist = event.target.value;
      setCurrentSearchParams((params) => {
        params.set("aname", artist);
        return params;
      });
      const qString = createSearchParams(currentSearchParams).toString();
      navigate(`/results?${qString}`);
      setArtistPicked(true);
      setArtist(artist);
    }
  };

  const handleCancelFilter = (event) => {
    event.preventDefault();
    if (categoryName === "MUSEUMS") {
      if (museum === "Rijksmuseum") {
        setCurrentSearchParams((params) => {
          params.set("ccheck", true);
          return params;
        });
        const qString = createSearchParams(currentSearchParams).toString();
        navigate(`/results?${qString}`);
        setMuseumPicked(false);
        setMuseum("");
      }

      if (museum === "The Cleveland Museum of Art") {
        setCurrentSearchParams((params) => {
          params.set("rcheck", true);
          return params;
        });
        const qString = createSearchParams(currentSearchParams).toString();
        navigate(`/results?${qString}`);
        setMuseumPicked(false);
        setMuseum("");
      }
    }

    if (categoryName === "ARTISTS") {
      setCurrentSearchParams((params) => {
        params.set("aname", "");
        return params;
      });
      const qString = createSearchParams(currentSearchParams).toString();
      navigate(`/results?${qString}`);
      setArtistPicked(false);
      setArtist("");
    }
  };

  return (
    <>
      {artistPicked || museumPicked ? (
        <li
          className={`filter-list-title ${expanded ? "expanded" : "collapsed"}`}
        >
          <button className="filter-title" onClick={handleToggle}>
            {categoryName.toUpperCase()}
          </button>
          <button id="current-technique-button" onClick={handleCancelFilter}>
            <IoMdCloseCircle />
            {categoryName === "ARTISTS" ? artist : museum}
          </button>
        </li>
      ) : (
        <li
          className={`filter-list-title ${expanded ? "expanded" : "collapsed"}`}
        >
          <button className="filter-title" onClick={handleToggle}>
            {categoryName}
          </button>
          {expanded && (
            <ul className="filter-option-list">
              {uniqueItems.map((item, index) => (
                <li key={item + index}>
                  <button
                    className="filter-option"
                    onClick={handleFilter}
                    value={item}
                  >
                    {"> "}
                    {item}
                    {categoryName === "MUSEUMS" && item === "Rijksmuseum" ? (
                      <span className="count"> ({rikjsCount})</span>
                    ) : null}
                    {categoryName === "MUSEUMS" &&
                    item === "The Cleveland Museum of Art" ? (
                      <span className="count"> ({clevelandCount})</span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      )}
    </>
  );
}
export default FilterCategory;
