import React, { useState, useEffect } from "react";
import MovieItem from "../components/MovieItem";
import { ImCross } from "react-icons/all-files/im";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Movie() {
  const [shortlist, setShortlist] = useState([]);
  const [navigation, isShowNavigation] = useState(true);
  const [paused, setPaused] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("artworks");
    setShortlist(JSON.parse(storedData));
    console.log("shortlist", shortlist);
  }, []);

  useEffect(() => {
    //after three seconds, hide the navigation
    const timeout = setTimeout(() => {
      isShowNavigation(false);
    }, 3000);
  });

  function closeMovie() {
    event.preventDefault();
    navigate("/shortlist");
  }

  function showNavigation(event) {
    console.log(event);
    isShowNavigation(true);
  }

  function hideNavigation() {
    isShowNavigation(false);
  }

  return (
    <>
      <div
        id="movie-navigation"
        onMouseEnter={showNavigation}
        onMouseLeave={hideNavigation}
        onTouchStart={showNavigation}
        onTouchEnd={hideNavigation}
      >
        <button
          id="movie-back"
          onClick={closeMovie}
          style={{ visibility: navigation ? "visible" : "hidden" }}
        >
          <ImCross />
        </button>
      </div>

      <div className="movie-container">
        <div
          className={`${
            isTabletOrMobile ? "movie-reel-vertical" : "movie-reel-horizontal"
          } ${paused ? "paused" : ""}`}
        >
          {shortlist.map((artwork, index) => {
            return (
              <MovieItem
                artworkForFrame={artwork}
                id={artwork.id + index}
                paused={paused}
                setPaused={setPaused}
              ></MovieItem>
            );
          })}
          {shortlist.map((artwork, index) => {
            return (
              <MovieItem
                artworkForFrame={artwork}
                id={artwork.id + index}
                paused={paused}
                setPaused={setPaused}
              ></MovieItem>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Movie;
