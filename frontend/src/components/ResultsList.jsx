import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { fetchArtworks } from "../../services/apis";
import formatResponse from "../utils/responseFormatting";
import ArtworkCard from "./ArtworkCard";

export default function ResultsList(props) {
  //   const [searchParams, setSearchParams] = useState(useSearchParams());
  //   const [results, setResults] = useState({});

  //   useEffect(() => {
  //     fetchArtworks(searchParams).then((res) => {
  //       const formattedRes = formatResponse(res);
  //       setResults(formattedRes);
  //     });
  //   }, []);
  const results = props.artworks;

  return (
    <div id="results-container">
      {results && results.length > 0 ? (
        <ArtworkCard artworks={results} />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
