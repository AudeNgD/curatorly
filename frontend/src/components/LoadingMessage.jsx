import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function LoadingMessage() {
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/shortlist") {
      setMessage("Loading shortlisted artworks...");
    } else if (location.pathname === "/2d-exhibition") {
      setMessage("Preparing the exhibition...");
    } else if (location.pathname === "/results") {
      setMessage("Searching for artworks...");
    }
  }, [location]);

  return <p id="loading-message">{message}</p>;
}

export default LoadingMessage;
