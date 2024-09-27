import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    console.log("museum", museum);
    console.log("id", id);
    if (museum === "rijksmuseum") {
      fetchRijksObjectDetails(id).then((res) => {
        console.log("res", res);
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
    navigate("/shortlist");
  }

  return (
    <div>
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
            </section>
            <section id="object-details">
              <h1>{object.title}</h1>
              <ul>
                <li>
                  <strong>Museum:</strong> {object.museum}
                </li>
                <li>
                  <strong>Object Number:</strong> {object.id}
                </li>
                <li>
                  <strong>Artist:</strong> {object.artist}
                </li>
                <li>
                  <strong>Dating:</strong> {object.dating}
                </li>
                <li>
                  <strong>Description:</strong> {object.description}
                </li>
                <li>
                  <strong>Materials:</strong> {object.materials}
                </li>
                <li>
                  <strong>Technique:</strong> {object.technique}
                </li>
                <li>
                  <strong>Location:</strong> {object.location}
                </li>
                <li>
                  <strong>Credit:</strong> {object.credit}
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Object;
