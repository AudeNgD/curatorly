import axios from "axios";
import centuryConverter from "../src/utils/centuryConverter";

const rijksAPI = axios.create({
  baseURL: `https://www.rijksmuseum.nl/api/en/collection/
`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  },
});

export const fetchRijksObjectDetails = (id) => {
  const rijksObjectPromise = rijksAPI.get(
    `${id}?key=${import.meta.env.VITE_APP_RIJKS_API_KEY}&format=json`
  );

  return rijksObjectPromise
    .then((response) => {
      return response.data.artObject;
    })
    .catch((error) => {
      return {
        message:
          "The Rijksmuseum service is currently unavailable. We apologise for the inconvenience.",
      };
    });
};
