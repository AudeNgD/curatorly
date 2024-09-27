import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRijksObjectDetails } from "../../services/rijksObjectAPI";
import LoadingMessage from "../components/LoadingMessage";

function Object() {
  const { id } = useParams();
  const { museum } = useParams();
  const [object, setObject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("museum", museum);
    console.log("id", id);
    if (museum === "rijksmuseum") {
      fetchRijksObjectDetails(id).then((res) => {
        console.log("res", res);
        setObject(res);
        setLoading(false);
      });
    }
    if (museum === "cleveland") {
      fetchClevelandObjectDetails(id);
    }
    if (museum === "vam") {
      fetchVamObjectDetails(id);
    }
  }, [id, museum]);

  return (
    <div>
      {loading ? (
        <LoadingMessage />
      ) : (
        <div id="object-container">
          <h2>{object.title}</h2>
          <div id="object-details-container">
            <section id="object-image">
              <img src={object.webImage.url} alt={object.title} />
            </section>
            <section id="object-details">
              <p>{object.label.description}</p>
              <p>{object.makers[0].name}</p>
              <p>{object.dating.presentingDate}</p>
              <p>{object.materials}</p>
              {/* <p>{object.dimensions}</p> */}
              <p>{object.location}</p>
              <p>{object.credit}</p>
              <p>{object.id}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Object;
