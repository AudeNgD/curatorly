import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

export default function ArtworkCard(props) {
  const artworks = props.artworks;
  const count = props.count;
  const [toggledFavourites, isToggledFavourites] = useState(getStoredData);
  const location = useLocation();
  const navigate = useNavigate();

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

  function requestObjectInfo(event) {
    event.preventDefault();
    const artworkId = event.target.id;
    const museum = event.target.getAttribute("museum");
    let formattedMuseum = "";
    if (museum === "Rijksmuseum") {
      formattedMuseum = "rijksmuseum";
    }
    if (museum === "The Cleveland Museum of Art") {
      formattedMuseum = "cleveland";
    }
    if (museum === "Victoria and Albert Museum") {
      formattedMuseum = "vam";
    }
    navigate(`/${formattedMuseum}/object/${artworkId}`);
  }

  return (
    <>
      {location.pathname === "/shortlist" ? (
        <p id="card-count">There are currently {count} artworks shortlisted</p>
      ) : (
        <p id="card-count">Found {count} artwork(s) matching the criteria</p>
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
                <button
                  className="card-info-button"
                  onClick={requestObjectInfo}
                  id={artwork.id}
                  museum={artwork.museum}
                >
                  More info
                </button>
                {/* <a href={artwork.links}>More info</a> */}
              </div>
            );
          })
        ) : (
          <p>No results found</p>
        )}
      </div>{" "}
    </>
  );
}
