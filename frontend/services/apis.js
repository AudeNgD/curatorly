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
});

export const fetchArtworks = (params) => {
  const artistName = params[0].get("aname");
  const europeanaChecked = params[0].get("echeck");
  const rijksmuseumChecked = params[0].get("rcheck");

  let europeanaPromise = null;
  let rijskPromise = null;

  if (artistName !== "") {
    const rijksFormatting = artistName.split(" ").join("+");
    const rijksQuery = `?key=${
      import.meta.env.VITE_APP_RIJKS_API_KEY
    }&q=${rijksFormatting}`;
    console.log("rijksQuery", rijksQuery);
    const europeanaQuery = `?query=who:(${artistName})`;
    console.log("europeanaQuery", europeanaQuery);

    rijskPromise = rijksAPI.get(rijksQuery);
    console.log("rijskPromise", rijskPromise);

    europeanaPromise = europeanaAPI.get(europeanaQuery);
    console.log("europeanaPromise", europeanaPromise);
  }
  //send only the promises for the museums that have been checked
  let promises = [];
  if (europeanaChecked) {
    promises.push(europeanaPromise);
  }
  if (rijksmuseumChecked) {
    promises.push(rijskPromise);
  }

  return Promise.all(promises).then((results) => {
    const data = {
      items: results[0].data.items,
      artObjects: results[1].data.artObjects,
    };
    console.log("data", data);
    return data;
  });
};
