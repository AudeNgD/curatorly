import React, { useState, useEffect } from "react";
import MovieItem from "../components/MovieItem";

function Movie() {
  const [shortlist, setShortlist] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("artworks");
    setShortlist(JSON.parse(storedData));
  }, []);

  return (
    <div className="movie-container">
      <div className="movie-reel">
        {shortlist.map((artwork, index) => {
          return (
            <MovieItem
              imageUrl={artwork.imageUrl}
              title={artwork.title}
              id={artwork.id}
            ></MovieItem>
          );
        })}
        {/* {shortlist.map((artwork, index) => {
          return (
            <MovieItem
              imageUrl={artwork.imageUrl}
              title={artwork.title}
              id={index + artwork.id + 2}
            ></MovieItem>
          );
        })} */}
      </div>
    </div>
  );
}

export default Movie;
