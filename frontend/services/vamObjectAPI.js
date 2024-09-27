import axios from "axios";

const vamAPI = axios.create({
  baseURL: `https://vam-api.onrender.com/object/`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  },
});

export const fetchVamObjectDetails = (id) => {
  const vamObjectPromise = vamAPI.get(`${id}`);

  return vamObjectPromise
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        message:
          "The Victoria and Albert Museum service is currently unavailable. We apologise for the inconvenience.",
      };
    });
};
