import React, { useState } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

function FilterCategory({ categoryName, uniqueItems }) {
  const [expanded, setExpanded] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleFilter = (event) => {
    event.preventDefault();

    if (categoryName === "MUSEUMS") {
      const museum = event.target.value;
      if (museum === "met") {
        setCurrentSearchParams((params) => {
          params.set("echeck", !params.get("echeck"));
          return params;
        });
        setCurrentSearchParams((params) => {
          params.set("rcheck", !params.get("rcheck"));
          return params;
        });
        setCurrentSearchParams((params) => {
          params.set("ccheck", !params.get("ccheck"));
          return params;
        });
      }

      if (museum === "chicago") {
        setCurrentSearchParams((params) => {
          params.set("echeck", !params.get("echeck"));
          return params;
        });
        setCurrentSearchParams((params) => {
          params.set("rcheck", !params.get("rcheck"));
          return params;
        });
        setCurrentSearchParams((params) => {
          params.set("mcheck", !params.get("mcheck"));
          return params;
        });
      }

      if (museum === "rijksmuseum") {
        setCurrentSearchParams((params) => {
          params.set("echeck", !params.get("echeck"));
          return params;
        });
        setCurrentSearchParams((params) => {
          params.set("mcheck", !params.get("mcheck"));
          return params;
        });
        setCurrentSearchParams((params) => {
          params.set("ccheck", !params.get("ccheck"));
          return params;
        });
      }

      if (museum === "europeana") {
        setCurrentSearchParams((params) => {
          params.set("rcheck", !params.get("rcheck"));
          return params;
        });
        setCurrentSearchParams((params) => {
          params.set("mcheck", !params.get("mcheck"));
          return params;
        });
        setCurrentSearchParams((params) => {
          params.set("ccheck", !params.get("ccheck"));
          return params;
        });
      }

      const qString = createSearchParams(currentSearchParams).toString();
      navigate(`/results?${qString}`);
    }

    if (categoryName === "ARTISTS") {
      const artist = event.target.value;
      setCurrentSearchParams((params) => {
        params.set("aname", artist);
        return params;
      });
      const qString = createSearchParams(currentSearchParams).toString();
      navigate(`/results?${qString}`);
    }
  };

  return (
    <li className={`filter-list-title ${expanded ? "expanded" : "collapsed"}`}>
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
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default FilterCategory;
