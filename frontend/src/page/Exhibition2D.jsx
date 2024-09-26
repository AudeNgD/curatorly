import React, { useEffect, useState, useRef } from "react";
import { IoMdReturnLeft } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import { TbZoomCheckFilled } from "react-icons/tb";
import { TbZoomCancelFilled } from "react-icons/tb";
import { FaInfo } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import ZoomIn from "../components/ZoomIn";
import LoadingMessage from "../components/LoadingMessage";

function Exhibition2D() {
  const [shortlist, setShortlist] = useState([]);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [infoActive, setInfoActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clicked, isClicked] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("artworks");
    setShortlist(JSON.parse(storedData));
  }, []);

  useEffect(() => {
    if (shortlist) {
      setCurrentArtwork(shortlist[currentArtworkIndex]);
    }
  });

  useEffect(() => {
    if (currentArtwork) {
      setLoading(false);
    }
  });

  //detect keyboard events arrow left and right to move between artworks

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === "ArrowLeft" && currentArtworkIndex > 0) {
        setCurrentArtworkIndex((artworkIdx) => artworkIdx - 1);
      } else if (
        e.key === "ArrowRight" &&
        currentArtworkIndex < shortlist.length - 1
      ) {
        setCurrentArtworkIndex((artworkIdx) => artworkIdx + 1);
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentArtworkIndex]);

  //handle zoom in image

  function handleZoomClick() {
    setZoomActive(!zoomActive);
  }

  function handleInfoClick() {
    setInfoActive(!infoActive);
    isClicked(!clicked);
  }

  return (
    <>
      {loading ? (
        <LoadingMessage />
      ) : (
        <div id="twod-exhibition-container">
          <section id="twod-exhibition-header">
            <Tooltip title="Back to shortlist" placement="top">
              <button
                id="two2d-back-button"
                onClick={() => window.history.back()}
              >
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
                  <p>{currentArtwork?.medium}</p>
                  <p>{currentArtwork?.museum}</p>
                </div>
              ) : null}
            </div>
            <div id="twod-artwork-right">
              {zoomActive ? (
                <ZoomIn
                  src={currentArtwork?.imageUrl}
                  alt={currentArtwork?.title}
                  id="twod-zoom-image"
                />
              ) : (
                <img
                  id="twod-artwork-image"
                  src={currentArtwork?.imageUrl}
                  alt={currentArtwork?.title}
                />
              )}
            </div>
          </section>
          <section id="twod-artwork-buttons">
            {currentArtworkIndex > 0 ? (
              <button
                className="twod-nav-artwork"
                onClick={() => setCurrentArtworkIndex(currentArtworkIndex - 1)}
              >
                <IoMdArrowRoundBack />
              </button>
            ) : null}
            <button
              id="twod-artwork-zoom"
              onClick={handleZoomClick}
              className={zoomActive ? "clicked" : "not-clicked"}
            >
              {zoomActive ? <TbZoomCancelFilled /> : <TbZoomCheckFilled />}
            </button>
            <button
              id="two-artwork-info-button"
              onClick={handleInfoClick}
              className={clicked ? "clicked" : "not-clicked"}
            >
              <FaInfo />
            </button>
            {currentArtworkIndex < shortlist.length - 1 ? (
              <button
                className="twod-nav-artwork"
                onClick={() => setCurrentArtworkIndex(currentArtworkIndex + 1)}
              >
                <IoMdArrowRoundForward />
              </button>
            ) : null}
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
      )}
    </>
  );
}

export default Exhibition2D;
