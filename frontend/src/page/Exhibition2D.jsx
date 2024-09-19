import React, { useEffect, useState } from "react";
import { IoMdReturnLeft } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";

function Exhibition2D() {
  const [shortlist, setShortlist] = useState([]);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem("artworks");
    setShortlist(JSON.parse(storedData));
  }, []);

  useEffect(() => {
    if (shortlist) {
      setCurrentArtwork(shortlist[currentArtworkIndex]);
    }
  });

  return (
    <div id="twod-exhibition-container">
      <section id="twod-exhibition-header">
        <Tooltip title="Back to shortlist" placement="top">
          <button id="two2d-back-button" onClick={() => window.history.back()}>
            <IoMdReturnLeft />
          </button>
        </Tooltip>
      </section>
      <section id="twod-current-artwork">
        <div id="twod-artwork-info">
          <h2>{currentArtwork?.title}</h2>
          <p>{currentArtwork?.description}</p>
          <p>{currentArtwork?.artist}</p>
          <p>{currentArtwork?.year}</p>
        </div>
        <img
          id="twod-artwork-image"
          src={currentArtwork?.imageUrl}
          alt={currentArtwork?.title}
        />
      </section>
      <section id="twod-artworks-banner">
        {shortlist &&
          shortlist.map((artwork, index) => {
            return (
              <img
                key={artwork.id + index}
                className={`twod-banner-image ${
                  index === currentArtworkIndex ? "active" : ""
                }`}
                onClick={() => setCurrentArtworkIndex(index)}
                src={artwork.imageUrl}
                alt={artwork.title}
              />
            );
          })}
      </section>
    </div>
  );
}

export default Exhibition2D;
