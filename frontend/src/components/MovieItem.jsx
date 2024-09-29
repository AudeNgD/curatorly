import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

function MovieItem({ artworkForFrame, paused, setPaused }) {
  const [displayInfo, setDisplayInfo] = useState(false);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

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
        onMouseEnter={(e) => mouseEnter(e)}
        onMouseLeave={(e) => mouseLeave(e)}
        onTouchStart={(e) => mouseEnter(e)}
        onTouchEnd={(e) => mouseLeave(e)}
        className={`${
          isTabletOrMobile ? "movie-image-vertical" : "movie-image-horizontal"
        }`}
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
