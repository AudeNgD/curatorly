import React, { useState } from "react";

function MovieItem({ artworkForFrame, paused, setPaused }) {
  const [displayInfo, setDisplayInfo] = useState(false);

  console.log("artworkForFrame", artworkForFrame);

  const mouseEnter = (e) => {
    setDisplayInfo(true);
    setPaused(true);
  };

  const mouseLeave = (e) => {
    setDisplayInfo(false);
    setPaused(false);
  };

  return (
    <div className="movie-frame">
      <img
        src={artworkForFrame.imageUrl}
        alt={artworkForFrame.title}
        className=""
        onMouseEnter={(e) => mouseEnter(e)}
        onMouseLeave={(e) => mouseLeave(e)}
      />
      {displayInfo && (
        <div className="movie-info">
          <h2>{artworkForFrame.title}</h2>
          <ul>
            <li>{artworkForFrame.artist}</li>
            <li>{artworkForFrame.museum}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MovieItem;
