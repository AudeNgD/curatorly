import React, { useState } from "react";
import xElevenColours from "../assets/xElevenColours";

function ColourPalette() {
  return (
    <div id="colour-palette">
      {xElevenColours.map((colour, index) => (
        <button
          key={colour + index}
          className="colour-option"
          style={{ backgroundColor: colour }}
          value={colour}
        ></button>
      ))}
    </div>
  );
}

export default ColourPalette;
