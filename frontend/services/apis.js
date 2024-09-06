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

export const testConcurrentAPIs = (params) => {
  const rijksFormatting = params.split(" ").join("+");
  const rijksQuery = `involvedMaker=${rijksFormatting}`;
  const rijskPromise = rijksAPI.get(rijksQuery);

  const europeanaQuery = `?query=who:(${params})`;
  const europeanaPromise = europeanaAPI.get(europeanaQuery);

  return Promise.all([europeanaPromise, rijskPromise]).then((results) => {
    const data = {
      items: results[0].data.items,
      artObjects: results[1].data.artObjects,
    };
    return data;
  });
};
