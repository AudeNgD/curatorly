import React, { useState, useEffect } from "react";
import MovieItem from "../components/MovieItem";

function Movie() {
  const [shortlist, setShortlist] = useState([]);

  const animationWidth = {
    "--w": `${shortlist.length * 100}%`,
  };

  useEffect(() => {
    const storedData = localStorage.getItem("artworks");
    setShortlist(JSON.parse(storedData));
    console.log("shortlist", shortlist);
  }, []);

  return (
    <div className="movie-container">
      {/* <div className="movie-reel"> */}
      <div className="movie-reel" style={animationWidth}>
        {shortlist.map((artwork, index) => {
          return (
            <MovieItem
              imageUrl={artwork.imageUrl}
              title={artwork.title}
              id={artwork.id}
            ></MovieItem>
          );
        })}
        {shortlist.map((artwork, index) => {
          return (
            <MovieItem
              imageUrl={artwork.imageUrl}
              title={artwork.title}
              id={artwork.id}
            ></MovieItem>
          );
        })}
      </div>
    </div>
  );
}

export default Movie;
