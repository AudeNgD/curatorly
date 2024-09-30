import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchRijksObjectDetails } from "../../services/rijksObjectAPI";
import { fetchClevelandObjectDetails } from "../../services/clevelandObjectAPI";
import { fetchVamObjectDetails } from "../../services/vamObjectAPI";
import LoadingMessage from "../components/LoadingMessage";
import formatObjectResponse from "../utils/objectResponseFormatting";
import { ImCross } from "react-icons/im";

function Object() {
  const { id } = useParams();
  const { museum } = useParams();
  const [object, setObject] = useState({});
  const [loading, setLoading] = useState(true);
  const [toggledFavourites, isToggledFavourites] = useState(getStoredData);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (museum === "rijksmuseum") {
      fetchRijksObjectDetails(id).then((res) => {
        const formattedRes = formatObjectResponse(museum, res);
        setObject(formattedRes);
        setLoading(false);
      });
    }
    if (museum === "cleveland") {
      fetchClevelandObjectDetails(id).then((res) => {
        const formattedRes = formatObjectResponse(museum, res);
        setObject(formattedRes);
        setLoading(false);
      });
    }
    if (museum === "vam") {
      fetchVamObjectDetails(id).then((res) => {
        const formattedRes = formatObjectResponse(museum, res);
        setObject(formattedRes);
        setLoading(false);
      });
    }
  }, [id, museum]);

  function closeInfo() {
    window.history.back();
  }

  function getStoredData() {
    const storedData = localStorage.getItem("artworks");
    return storedData ? JSON.parse(storedData) : [];
  }

  function handleShortlistClick() {
    let currentFavourites = [...toggledFavourites];
    const found = currentFavourites.some((item) => item.id === object.id);
    if (!found) {
      currentFavourites = [...currentFavourites, object];
    } else {
      currentFavourites = currentFavourites.filter(
        (item) => item.id !== object.id
      );
    }
    isToggledFavourites(currentFavourites);
    localStorage.setItem("artworks", JSON.stringify(currentFavourites));
    window.history.back();
  }

  return (
    <>
      {loading ? (
        <LoadingMessage />
      ) : (
        <div id="object-container">
          <section id="object-navigation">
            <button onClick={closeInfo}>
              <ImCross />
            </button>
          </section>
          <div id="object-info-container">
            <section id="object-image">
              <img src={object.imageUrl} alt={object.title} />
              <button
                className="object-fav-button"
                onClick={handleShortlistClick}
              >
                {toggledFavourites.some((item) => item.id === object.id)
                  ? "Remove from shortlist"
                  : "Add to shortlist"}
              </button>
            </section>
            <section id="object-details">
              <h1>{object.title}</h1>
              <ul>
                <li className="object-small-listitem">
                  <strong>Museum:</strong> {object.museum}
                </li>
                <li className="object-small-listitem">
                  <strong>Artist:</strong> {object.artist}
                </li>
                <li className="object-small-listitem">
                  <strong>Dating:</strong> {object.dating}
                </li>
                <li className="object-small-listitem">
                  <strong>Description:</strong> {object.description}
                </li>
                <li className="object-small-listitem">
                  <strong>Materials:</strong> {object.materials}
                </li>
                <li className="object-small-listitem">
                  <strong>Technique:</strong> {object.technique}
                </li>
                <li className="object-small-listitem">
                  <strong>Object Number:</strong> {object.id}
                </li>
                <li className="object-small-listitem">
                  <strong>Location:</strong> {object.location}
                </li>
                <li className="object-small-listitem">
                  <strong>Credit:</strong> {object.credit}
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Object;
