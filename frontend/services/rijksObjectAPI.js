import axios from "axios";
import centuryConverter from "../src/utils/centuryConverter";

const rijksAPI = axios.create({
  baseURL: `https://www.rijksmuseum.nl/api/en/collection`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  },
});

export const fetchRijksObjectDetails = (objectNumber) => {
  const rijksObjectPromise = rijksAPI.get(
    `/${objectNumber}?key=${import.meta.env.VITE_APP_RIJKS_API_KEY}&format=json`
  );

  return rijksObjectPromise
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
