import React, { useEffect, useState } from "react";
import { IoMdReturnLeft } from "react-icons/io";

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
        <button id="two2d-back-button" onClick={() => window.history.back()}>
          <IoMdReturnLeft />
        </button>
      </section>
      <section id="twod-current-artwork">
        <div id="twod-artwork-info"></div>
        <div id="twod-artwork-frame">
          <img
            id="twod-artwork-image"
            src={currentArtwork?.imageUrl}
            alt={currentArtwork?.title}
          />
        </div>
      </section>
      <section id="twod-artworks-banner">
        {shortlist &&
          shortlist.map((artwork, index) => {
            return (
              <div
                key={artwork.id + index}
                className="twod-banner-card"
                onClick={() => setCurrentArtworkIndex(index)}
              >
                <img
                  className="twod-banner-image"
                  src={artwork.imageUrl}
                  alt={artwork.title}
                />
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default Exhibition2D;
