import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export default function ArtworkCard(props) {
  const artworks = props.artworks;
  const count = props.count;

  console.log("in artwork card", artworks);
  console.log("in artwork card", count);
  const [toggledFavourites, isToggledFavourites] = useState(getStoredData);
  const location = useLocation();

  function getStoredData() {
    const storedData = localStorage.getItem("artworks");
    return storedData ? JSON.parse(storedData) : [];
  }

  function handleFavouriteClick(artwork) {
    let currentFavourites = [...toggledFavourites];
    const found = currentFavourites.some((item) => item.id === artwork.id);
    if (!found) {
      currentFavourites = [...currentFavourites, artwork];
    } else {
      currentFavourites = currentFavourites.filter(
        (item) => item.id !== artwork.id
      );
    }
    isToggledFavourites(currentFavourites);
    localStorage.setItem("artworks", JSON.stringify(currentFavourites));
  }

  return (
    <>
      {location.pathname === "/shortlist" ? (
        <p id="card-count">There are currently {count} artworks shortlisted</p>
      ) : (
        <p id="card-count">Found {count} artworks</p>
      )}

      <div id="artwork-card">
        {artworks ? (
          artworks.map((artwork, index) => {
            return (
              <div key={artwork.id + index} className="card">
                <img src={artwork.imageUrl} alt={artwork.title} />
                <button
                  className="fav-button"
                  onClick={() => handleFavouriteClick(artwork)}
                >
                  {toggledFavourites.some((item) => item.id === artwork.id) ? (
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
          })
        ) : (
          <p>No results found</p>
        )}
      </div>
    </>
  );
}
