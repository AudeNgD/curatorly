import axios from "axios";

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

  let europeanaPromise = null;
  let rijskPromise = null;

  //if artist name is empty, return all top artworks from both museums
  if (artistName === "") {
    const rijksQuery = `?key=${
      import.meta.env.VITE_APP_RIJKS_API_KEY
    }&toppieces=true`;
    const europeanaQuery = `?query=who:*`;
    rijskPromise = rijksAPI.get(rijksQuery);
    europeanaPromise = europeanaAPI.get(europeanaQuery);
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
  if (europeanaChecked === "true") {
    promises.push(europeanaPromise);
  }
  if (rijksmuseumChecked === "true") {
    promises.push(rijskPromise);
  }

  if (promises.length === 0) {
    return Promise.resolve(null);
  }

  return Promise.all(promises).then((results) => {
    let data = {};

    if (results.length === 1) {
      if (results[0].data.items) {
        return (data = { items: results[0].data.items, artObjects: [] });
      } else {
        return (data = { items: [], artObjects: results[0].data.artObjects });
      }
    } else if (results.length === 2) {
      return (data = {
        items: results[0].data.items,
        artObjects: results[1].data.artObjects,
      });
    }
    return data;
  });
};
