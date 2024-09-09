import React, { useEffect, useState } from "react";

function Shortlist() {
  const [shortlist, setShortlist] = useState(getStoredData);

  function getStoredData() {
    const storedData = localStorage.getItem("favourites");
    return storedData ? JSON.parse(storedData) : [];
  }

  return (
    <>
      {shortlist && shortlist.length > 0 ? (
        <>
          {shortlist.map((item) => {
            return (
              <div key={item}>
                <h2>{item}</h2>
              </div>
            );
          })}
        </>
      ) : (
        <h2>No items in shortlist</h2>
      )}
    </>
  );
}

export default Shortlist;
