import React, { useEffect, useState, useRef } from "react";
import { IoMdReturnLeft } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import { TbZoomCheckFilled } from "react-icons/tb";
import { TbZoomCancelFilled } from "react-icons/tb";
import { FaInfo } from "react-icons/fa";

import Tooltip from "@mui/material/Tooltip";

function Exhibition2D() {
  const [shortlist, setShortlist] = useState([]);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [infoActive, setInfoActive] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("artworks");
    setShortlist(JSON.parse(storedData));
  }, []);

  useEffect(() => {
    if (shortlist) {
      setCurrentArtwork(shortlist[currentArtworkIndex]);
    }
  });

  function handleZoomClick() {
    setZoomActive(!zoomActive);
  }

  function handleMouseZoom(e) {
    if (zoomActive) {
      const image = e.target;
      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;
      const { width, height } = image.getBoundingClientRect();
      const x = (offsetX / width) * 100;
      const y = (offsetY / height) * 100;
      image.style.offsetX = `${x}%`;
      image.style.offsetY = `${y}%`;
      image.style.transformOrigin = `${x}% ${y}%`;
      image.style.transform = "scale(1.1)";
    }
  }

  function handleInfoClick() {
    setInfoActive(!infoActive);
  }

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
        <div id="twod-artwork-left">
          {infoActive ? (
            <div id="twod-artwork-info">
              <h2>{currentArtwork?.title}</h2>
              <p>{currentArtwork?.description}</p>
              <p>{currentArtwork?.artist}</p>
              <p>{currentArtwork?.year}</p>
            </div>
          ) : null}
          {currentArtworkIndex > 0 ? (
            <button
              className="twod-nav-artwork"
              onClick={() => setCurrentArtworkIndex(currentArtworkIndex - 1)}
            >
              <IoMdArrowRoundBack />
            </button>
          ) : null}
        </div>
        <div id="twod-artwork-middle">
          <img
            id="twod-artwork-image"
            src={currentArtwork?.imageUrl}
            alt={currentArtwork?.title}
            onMouseMove={handleMouseZoom}
          />

          <div id="twod-artwork-buttons">
            <button id="twod-artwork-zoom" onClick={handleZoomClick}>
              {zoomActive ? <TbZoomCancelFilled /> : <TbZoomCheckFilled />}
            </button>
            <button id="two-artwork-info" onClick={handleInfoClick}>
              <FaInfo />
            </button>
          </div>
        </div>
        <div id="twod-artwork-right">
          {currentArtworkIndex < shortlist.length - 1 ? (
            <button
              className="twod-nav-artwork"
              onClick={() => setCurrentArtworkIndex(currentArtworkIndex + 1)}
            >
              <IoMdArrowRoundForward />
            </button>
          ) : null}
        </div>
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
