import React, { useState } from "react";

function MovieItem({ imageUrl, title, id }) {
  const [displayInfo, setDisplayInfo] = useState(false);

  const mouseEnter = (e) => {
    setDisplayInfo(true);
  };

  const mouseLeave = (e) => {
    setDisplayInfo(false);
  };

  return (
    <div className="movie-frame">
      <img
        src={imageUrl}
        alt={title}
        onMouseEnter={(e) => mouseEnter(e)}
        onMouseLeave={(e) => mouseLeave(e)}
      />
      {displayInfo && (
        <div className="movie-info">
          <h2>{title}</h2>
        </div>
      )}
    </div>
  );
}

export default MovieItem;
