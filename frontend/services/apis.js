import axios from "axios";

const chicagoDataAPI = axios.create({
  baseURL: `https://api.artic.edu/api/v1/artworks`,
});

const chicagoImageAPI = axios.create({
  baseURL: `https://www.artic.edu/iiif/2/`,
});

const metSearchAPI = axios.create({
  baseURL: `https://collectionapi.metmuseum.org/public/collection/v1/search`,
});

const metObjectsAPI = axios.create({
  baseURL: `https://collectionapi.metmuseum.org/public/collection/v1/objects`,
});

const europeanaAPI = axios.create({
  baseURL: `https://api.europeana.eu/record/v2/search.json`,
  headers: {
    "Content-type": "application/json",
    "X-Api-Key": import.meta.env.VITE_APP_EUROPEANA_API_KEY,
  },
});

const rijksAPI = axios.create({
  baseURL: `https://www.rijksmuseum.nl/api/en/collection`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const fetchArtworks = (params) => {
  const artistName = params[0].get("aname");
  const europeanaChecked = params[0].get("echeck");
  const rijksmuseumChecked = params[0].get("rcheck");
  const metChecked = params[0].get("mcheck");
  const chicagoChecked = params[0].get("ccheck");

  let europeanaPromise = null;
  let rijskPromise = null;
  let metPromise = null;
  let chicagoPromise = null;

  //if artist name is empty, return all top artworks from both museums
  if (artistName === "") {
    const rijksQuery = `?key=${
      import.meta.env.VITE_APP_RIJKS_API_KEY
    }&toppieces=true`;

    const europeanaQuery = `?query=who:*`;
    rijskPromise = rijksAPI.get(rijksQuery);
    europeanaPromise = europeanaAPI.get(europeanaQuery);

    // const metQuery = ``;
    // metPromise = metSearchAPI.get(metQuery);
    metPromise = metObjectsAPI.get();

    const chicagoQuery = `?limit=100`;
    chicagoPromise = chicagoDataAPI.get(chicagoQuery);
  }

  if (artistName !== "") {
    const rijksFormatting = artistName.split(" ").join("+");
    const rijksQuery = `?key=${
      import.meta.env.VITE_APP_RIJKS_API_KEY
    }&involvedMaker=${rijksFormatting}&profile=rich`;
    const europeanaQuery = `?query=who:(${artistName})`;
    rijskPromise = rijksAPI.get(rijksQuery);
    europeanaPromise = europeanaAPI.get(europeanaQuery);
  }
  //send only the promises for the museums that have been checked
  //as a param it is a string
  let promises = [];

  europeanaChecked === "true" ? promises.push(europeanaPromise) : null;
  rijksmuseumChecked === "true" ? promises.push(rijskPromise) : null;
  metChecked === "true" ? promises.push(metPromise) : null;
  chicagoChecked === "true" ? promises.push(chicagoPromise) : null;

  if (promises.length === 0) {
    return Promise.resolve(null);
  }

  return Promise.all(promises).then((results) => {
    let data = {};

    if (results && results.length >= 1) {
      for (let i = 0; i < results.length; i++) {
        //check from which api data is coming
        if (results[i].data.artObjects) {
          data.rijksData = results[i].data.artObjects;
        } else if (results[i].data.items) {
          data.europeanaData = results[i].data.items;
        } else if (results[i].data.objectIDs) {
          data.metData = results[i].data.objectIDs;
        } else if (results[i].data.data) {
          data.chicagoData = results[i].data.data;
        }
      }
    }

    console.log("here in apis", data);
    return data;
  });
};
