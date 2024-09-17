import React, { useState, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";

export default function ResultsList({ artworks }) {
  const results = artworks;
  return (
    <div id="results-container">
      {artworks ? <ArtworkCard artworks={results} /> : <p>No results found</p>}
    </div>
  );
}
