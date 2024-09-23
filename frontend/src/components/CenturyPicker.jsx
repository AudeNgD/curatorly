import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

function CenturyPicker() {
  const centuryList = Array.from({ length: 21 }, (_, i) => i + 1);
  const centuryNameList = centuryList.map((century) => {
    if (century === 1) {
      return `${century}st`;
    } else if (century === 2) {
      return `${century}nd`;
    } else if (century === 3) {
      return `${century}rd`;
    } else if (century === 21) {
      return `${century}st`;
    } else {
      return `${century}th`;
    }
  });

  const [expanded, setExpanded] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useSearchParams();
  const [currentCentury, setCurrentCentury] = useState(centuryNameList);

  const navigate = useNavigate();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    //if century in params
    if (currentSearchParams.has("century")) {
      const century = currentSearchParams.get("century");
      setCurrentCentury(centuryNameList[century - 1]);
    } else {
      setCurrentCentury(centuryNameList);
    }
  }, [currentSearchParams]);

  const handleFilter = (event) => {
    event.preventDefault();
    const century = event.target.value;
    setCurrentSearchParams((params) => {
      params.set("century", century);
      return params;
    });
    const qString = createSearchParams(currentSearchParams).toString();
    navigate(`/results?${qString}`);
    setCurrentCentury([centuryNameList[century - 1]]);
  };

  return (
    <>
      <li
        className={`filter-list-title ${expanded ? "expanded" : "collapsed"}`}
      >
        <button className="filter-title" onClick={handleToggle}>
          CENTURY
        </button>
        {expanded && (
          <ul className="filter-option-list">
            {currentCentury.map((century, index) => (
              <li key={century}>
                <button
                  className="filter-option"
                  onClick={handleFilter}
                  value={index + 1}
                >
                  {"> "}
                  {century}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    </>
  );
}

export default CenturyPicker;
