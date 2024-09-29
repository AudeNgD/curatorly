import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/all-files/io";

function TechniqueSearch() {
  const [technique, setTechnique] = useState("");
  const [techniquePicked, setTechniquePicked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  function getTechnique(event) {
    if (event.target.name !== undefined) {
      setTechnique(event.target.value);
    }
  }

  function submitTechniqueSearch(event) {
    event.preventDefault();
    const searchWord = technique;
    setCurrentSearchParams((params) => {
      params.set("technique", searchWord);
      return params;
    });
    const qString = createSearchParams(currentSearchParams).toString();
    navigate(`/results?${qString}`);
    setTechniquePicked(true);
  }

  function handleCancelFilter(event) {
    event.preventDefault();
    setCurrentSearchParams((params) => {
      params.delete("technique");
      return params;
    });
    const qString = createSearchParams(currentSearchParams).toString();
    navigate(`/results?${qString}`);
    setTechniquePicked(false);
    setTechnique("");
  }

  return (
    <>
      {techniquePicked ? (
        <li
          className={`filter-list-title ${expanded ? "expanded" : "collapsed"}`}
        >
          <button className="filter-title" onClick={handleToggle}>
            TECHNIQUE
          </button>
          <button id="current-technique-button" onClick={handleCancelFilter}>
            <IoMdCloseCircle />
            {technique}
          </button>
        </li>
      ) : (
        <li
          className={`filter-list-title ${expanded ? "expanded" : "collapsed"}`}
        >
          <button className="filter-title" onClick={handleToggle}>
            TECHNIQUE
          </button>
          {expanded && (
            <form id="technique-search-form" onSubmit={submitTechniqueSearch}>
              <label htmlFor="technique">
                <input
                  type="text"
                  name="technique"
                  id="technique"
                  placeholder="Search for a technique"
                  value={technique}
                  onChange={getTechnique}
                />
              </label>
              <button id="submit-technique-button" type="submit">
                Search
              </button>
            </form>
          )}
        </li>
      )}
    </>
  );
}

export default TechniqueSearch;
