import React, { useEffect, useState, useRef } from "react";
import { IoMdReturnLeft } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import { TbZoomCheckFilled } from "react-icons/tb";
import { TbZoomCancelFilled } from "react-icons/tb";
import { FaInfo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import ZoomIn from "../components/ZoomIn";
import LoadingMessage from "../components/LoadingMessage";

function Exhibition2Dv2() {
  const [shortlist, setShortlist] = useState([]);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [infoActive, setInfoActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clicked, isClicked] = useState(false);
  const [autoplaying, isAutoPlaying] = useState(false);

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

  //detect autoplay and hide the header and bring it back on mouse move
  // useEffect(() => {
  //   if (autoplaying) {
  //     document.getElementById("twod-exhibition-header")
  //       ? (document.getElementById("twod-exhibition-header").style.display =
  //           "none")
  //       : null;
  //   } else {
  //     document.getElementById("twod-exhibition-header")
  //       ? (document.getElementById("twod-exhibition-header").style.display =
  //           "block")
  //       : null;
  //   }
  // });

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
    console.log("clicked");
    setInfoActive(!infoActive);
    isClicked(!clicked);
  }

  //circle through all artworks until press pause
  function autoPlay() {
    const interval = setInterval(() => {
      if (currentArtworkIndex < shortlist.length - 1) {
        setCurrentArtworkIndex((artworkIdx) => artworkIdx + 1);
      } else {
        setCurrentArtworkIndex(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }

  function pauseAutoplay() {
    clearInterval(autoPlay());
  }

  return (
    <>
      {loading ? (
        <LoadingMessage />
      ) : (
        <div id="twod-exhibition-container">
          <section id="twod-exhibition-header">
            <Tooltip title="Back to shortlist" placement="left">
              <button
                id="two2d-back-button"
                onClick={() => window.history.back()}
              >
                <IoMdReturnLeft />
              </button>
            </Tooltip>
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
            <button
              id="twod-autoplay-button"
              className="not-clicked"
              onClick={autoPlay}
            >
              <FaPlay />
            </button>
            <button
              id="twod-pause-button"
              className="not-clicked"
              onClick={pauseAutoplay}
            >
              <FaPause />
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
          <section
            id="twod-current-artwork"
            className={infoActive ? "info-displayed" : "info-not-displayed"}
          >
            <ZoomIn
              src={currentArtwork?.imageUrl}
              alt={currentArtwork?.title}
              id="twod-zoom-image"
              className={
                infoActive ? "zoom-info-displayed" : "zoom-info-not-displayed"
              }
              zoomState={zoomActive}
              detectZoom={setZoomActive}
            />

            {infoActive ? (
              <div
                id="twod-artwork-info"
                className={infoActive ? "info-box-displayed" : ""}
              >
                <h2>{currentArtwork?.title}</h2>
                <p>{currentArtwork?.description}</p>
                <p>Artist: {currentArtwork?.artist}</p>
                <p>{currentArtwork?.year}</p>
                <p>{currentArtwork?.medium}</p>
                <p>{currentArtwork?.technique}</p>
                <p>Location: {currentArtwork?.museum}</p>
              </div>
            ) : null}
          </section>
        </div>
      )}
    </>
  );
}

export default Exhibition2Dv2;
