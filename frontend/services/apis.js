import axios from "axios";

const europeanaAPI = axios.create({
  baseURL: `https://api.europeana.eu/record/v2/search.json`,
  headers: {
    "Content-type": "application/json",
    "X-Api-Key": import.meta.env.VITE_APP_EUROPEANA_API_KEY,
  },
});

const rijksAPI = axios.create({
  baseURL: `https://www.rijksmuseum.nl/api/en/collection?key=${
    import.meta.env.VITE_APP_RIJKS_API_KEY
  }&`,
});

export const fetchArtworks = (params) => {
  const artistName = params[0].get("aname");
  const europeanaChecked = params[0].get("echeck");
  const rijksmuseumChecked = params[0].get("rcheck");
  console.log("here params", params[0].get("aname"));

  let europeanaPromise = null;
  let rijskPromise = null;

  if (artistName !== "") {
    const rijksFormatting = artistName.split(" ").join("+");
    const rijksQuery = `involvedMaker=${rijksFormatting}`;
    const europeanaQuery = `?query=who:(${artistName})`;

    rijskPromise = rijksAPI.get(rijksQuery);
    europeanaPromise = europeanaAPI.get(europeanaQuery);
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
    return data;
  });
};
