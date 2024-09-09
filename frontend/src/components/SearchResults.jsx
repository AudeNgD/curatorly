import React, { useState, useEffect } from "react";
import { testConcurrentAPIs } from "../../services/apis";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

function SearchResults() {
  const [results, setResults] = useState();
  const searchParams = "Leonardo da Vinci";
  const [favourites, setFavourites] = useState([]);
  const [toggledFavourites, isToggledFavourites] = useState([]);

  useEffect(() => {
    testConcurrentAPIs(searchParams).then((res) => {
      setResults(res);
    });
  }, []);

  function handleFavouriteClick(id) {
    let currentFavourites = [...toggledFavourites];
    if (!currentFavourites.includes(id)) {
      currentFavourites = [...currentFavourites, id];
    } else {
      currentFavourites = currentFavourites.filter((item) => item !== id);
    }
    isToggledFavourites(currentFavourites);
  }

  return (
    <>
      {results && results.items && results.items.length > 0 ? (
        <>
          {results.items.map((result) => {
            return (
              <div key={result.id}>
                <h2>{result.title}</h2>
                <img src={result.edmPreview} alt={result.title} />
                <button
                  onClick={() => handleFavouriteClick(result.id)}
                  value={result}
                >
                  {toggledFavourites.includes(result.id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
            );
          })}
          {results.artObjects.map((result) => {
            return (
              <div key={result.id}>
                <h2>{result.title}</h2>
                <img src={result.webImage.url} alt={result.title} />
              </div>
            );
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default SearchResults;
