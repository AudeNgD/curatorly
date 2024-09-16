import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

export default function ArtworkCard(props) {
  const results = props.artworks;
  const [toggledFavourites, isToggledFavourites] = useState(getStoredData);

  function getStoredData() {
    const storedData = localStorage.getItem("favourites");
    return storedData ? JSON.parse(storedData) : [];
  }

  function handleFavouriteClick(id) {
    let currentFavourites = [...toggledFavourites];
    if (!currentFavourites.includes(id)) {
      currentFavourites = [...currentFavourites, id];
    } else {
      currentFavourites = currentFavourites.filter((item) => item !== id);
    }
    isToggledFavourites(currentFavourites);
    localStorage.setItem("favourites", JSON.stringify(currentFavourites));
  }
  return (
    <>
      <p id="card-count">Found {results.length} artworks</p>
      <div id="artwork-card">
        {results.map((artwork, index) => {
          return (
            <div key={artwork.id + index} className="card">
              <img src={artwork.imageUrl} alt={artwork.title} />
              <button
                className="fav-button"
                onClick={() => handleFavouriteClick(artwork.id)}
              >
                {toggledFavourites.includes(artwork.id) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )}
              </button>
              <p className="card-title">{artwork.title}</p>
              <p className="card-artist">{artwork.artist}</p>
              <p className="card-museum">From: {artwork.museum}</p>
              <a href={artwork.links}>More info</a>
            </div>
          );
        })}
      </div>
    </>
  );
}
