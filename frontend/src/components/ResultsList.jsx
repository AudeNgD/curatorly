import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { fetchArtworks } from "../../services/apis";
import formatResponse from "../utils/responseFormatting";
import ArtworkCard from "./ArtworkCard";

export default function ResultsList() {
  const [searchParams, setSearchParams] = useState(useSearchParams());
  const [results, setResults] = useState({});

  useEffect(() => {
    fetchArtworks(searchParams).then((res) => {
      const formattedRes = formatResponse(res);
      console.log(formattedRes);
      setResults(formattedRes);
    });
  }, []);

  return (
    <div id="results-container">
      {results && results.count && results.count !== 0 ? (
        <ArtworkCard artworks={results.artwork} />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
