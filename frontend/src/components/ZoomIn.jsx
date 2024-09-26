import React, { useState } from "react";

function ZoomIn({
  src,
  width,
  height,
  alt,
  id,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2,
  zoomState,
  setZoomActive,
  className,
}) {
  const [showMagnifier, setShowMagnifier] = useState(zoomState);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  const mouseEnter = (e) => {
    const el = e.currentTarget;
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const mouseLeave = (e) => {
    e.preventDefault();
    setShowMagnifier(false);
  };

  const mouseMove = (e) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();

    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    setXY([x, y]);
  };

  return (
    <section id="twod-zoom-container" className={className}>
      <div id="twod-zoom-img-container">
        <img
          src={src}
          id={id}
          width={width}
          height={height}
          alt={alt}
          onMouseEnter={(e) => mouseEnter(e)}
          onMouseLeave={(e) => mouseLeave(e)}
          onMouseMove={(e) => mouseMove(e)}
        />
      </div>
      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          opacity: "1",
          border: "1px solid lightgrey",
          backgroundColor: "white",
          borderRadius: "5px",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          top: `${y - imgHeight / 2 + magnifierHeight}px`,
          left: `${x + imgWidth / 2 + magnifierWidth - 5}px`,
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      />
    </section>
  );
}

export default ZoomIn;
