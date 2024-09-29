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
import { useMediaQuery } from "react-responsive";
import { useSwipeable } from "react-swipeable";

function Exhibition2Dv2() {
  const [shortlist, setShortlist] = useState([]);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [infoActive, setInfoActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clicked, isClicked] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      currentArtworkIndex < shortlist.length - 1 &&
      setCurrentArtworkIndex(currentArtworkIndex + 1),
    onSwipedRight: () =>
      currentArtworkIndex > 0 &&
      setCurrentArtworkIndex(currentArtworkIndex - 1),
    onSwipeStart: () => setStopScroll(true),
    onSwipedEnd: () => setStopScroll(false),
  });

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

  function handleKeyPress(e) {
    if (e.key === "ArrowLeft" && currentArtworkIndex > 0) {
      setCurrentArtworkIndex((artworkIdx) => artworkIdx - 1);
    } else if (
      e.key === "ArrowRight" &&
      currentArtworkIndex < shortlist.length - 1
    ) {
      console.log("right");
      setCurrentArtworkIndex((artworkIdx) => artworkIdx + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentArtworkIndex, shortlist]);

  //handle zoom in image

  function handleZoomClick() {
    setZoomActive(!zoomActive);
  }

  function handleInfoClick() {
    console.log("clicked");
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
            <Tooltip title="Back to shortlist" placement="left">
              <button
                className="twod-button back"
                onClick={() => window.history.back()}
              >
                <IoMdReturnLeft />
              </button>
            </Tooltip>
            {currentArtworkIndex > 0 ? (
              <button
                className="twod-button nav"
                onClick={() => setCurrentArtworkIndex(currentArtworkIndex - 1)}
                // onKeyDown={handleKeyPress}
              >
                <IoMdArrowRoundBack />
              </button>
            ) : null}
            {isTabletOrMobile || infoActive ? null : (
              <button
                onClick={handleZoomClick}
                className={`twod-button zoom ${
                  zoomActive ? "clicked" : "not-clicked"
                }}`}
              >
                {zoomActive ? <TbZoomCancelFilled /> : <TbZoomCheckFilled />}
              </button>
            )}
            <button
              onClick={handleInfoClick}
              className={`twod-button info ${
                clicked ? "clicked" : "not-clicked"
              }`}
            >
              <FaInfo />
            </button>

            {currentArtworkIndex < shortlist.length - 1 ? (
              <button
                className="twod-button nav"
                onClick={() => setCurrentArtworkIndex(currentArtworkIndex + 1)}
                // onKeyDown={handleKeyPress}
              >
                <IoMdArrowRoundForward />
              </button>
            ) : null}
          </section>
          <section
            id="twod-current-artwork"
            className={infoActive ? "info-displayed" : "info-not-displayed"}
            {...handlers}
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
