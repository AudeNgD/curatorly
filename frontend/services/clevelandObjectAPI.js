import axios from "axios";

const clevelandAPI = axios.create({
  baseURL: `https://cleveland-api.onrender.com/artworks/`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  },
});

export const fetchClevelandObjectDetails = (id) => {
  const clevelandObjectPromise = clevelandAPI.get(`${id}`);

  return clevelandObjectPromise
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return {
        message:
          "The Cleveland Museum of Art service is currently unavailable. We apologise for the inconvenience.",
      };
    });
};
