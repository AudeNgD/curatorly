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

const clevelandAPI = axios.create({
  baseURL: `https://cleveland-api.onrender.com/search`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  },
});

const vamAPI = axios.create({
  baseURL: `https://vam-api.onrender.com/search`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  },
});

export const fetchArtworks = (params) => {
  // keyword parameter
  const keyword = params[0].get("keyword");

  //artist parameter
  const artistName = params[0].get("aname");

  //museum picker
  const rijksmuseumChecked = params[0].get("rcheck");
  const clevelandChecked = params[0].get("ccheck");
  const vamAPIChecked = params[0].get("vcheck");

  //century picker
  const century = params[0].get("century");

  //medium picker
  const medium = params[0].get("medium");

  //technique picker
  const technique = params[0].get("technique");

  //page number
  const page = params[0].get("page");

  let rijskPromise = null;
  let clevelandPromise = null;
  let vamPromise = null;

  //creating the query for the Rijksmuseum API for all parameters
  let rijksQuery = `?key=${
    import.meta.env.VITE_APP_RIJKS_API_KEY
  }&profile=rich&imgonly=true&ps=100`;
  keyword ? (rijksQuery += `&q=${keyword}`) : (rijksQuery += `&q=*`);
  artistName
    ? (rijksQuery += `&involvedMaker=${artistName.split(" ").join("+")}`)
    : null;
  century ? (rijksQuery += `&f.dating.period=${century}`) : null;
  medium ? (rijksQuery += `&material=${medium}`) : null;
  technique ? (rijksQuery += `&technique=${technique}`) : null;
  //the page number passed is the search results pagination number
  //only need to fetch artwork for next page if hit page number is multiple of 20
  page && page % 21 === 0 ? (rijksQuery += `&p=${page / 31 + 1}`) : null;

  rijskPromise = rijksAPI.get(rijksQuery);

  //creating the query for the Cleveland API for all parameters

  let clevelandQuery = "?has_image=1&limit=100";
  keyword ? (clevelandQuery += `&q=${keyword}`) : null;
  artistName ? (clevelandQuery += `&artists=${artistName}`) : null;
  let dates = {};
  century ? (dates = centuryConverter(century)) : null;
  century
    ? (clevelandQuery += `&created_after=${dates.startDate}&created_before=${dates.endDate}`)
    : null;
  medium ? (clevelandQuery += `&medium=${medium}`) : null;
  technique ? (clevelandQuery += `&technique=${technique}`) : null;
  page && page % 31 === 0
    ? (clevelandQuery += `&skip=${(page / 31) * 100}`)
    : null;

  clevelandPromise = clevelandAPI.get(clevelandQuery);

  //creating the query for the V&A API for all parameters
  let vamQuery = `?page_size=100&images_exist=1&data_restrict=descriptive_only`;
  keyword ? (vamQuery += `&q=${keyword}`) : (vamQuery += `&q=*`);
  artistName ? (vamQuery += `&q_actor=${artistName}`) : null;
  century
    ? (vamQuery += `&year_made_from=${dates.startDate}&year_made_to=${dates.endDate}`)
    : null;
  medium ? (vamQuery += `&q_material_technique=${medium}`) : null;
  technique ? (vamQuery += `&q_material_technique=${technique}`) : null;
  page && page % 31 === 0 ? (vamQuery += `&page=${page / 31 + 1}`) : null;

  vamPromise = vamAPI.get(vamQuery);

  //handling the museums that have been checked
  //as a param it is a string
  let promises = [];

  rijksmuseumChecked === "true" ? promises.push(rijskPromise) : null;
  clevelandChecked === "true" ? promises.push(clevelandPromise) : null;
  vamAPIChecked === "true" ? promises.push(vamAPI.get(vamQuery)) : null;

  if (promises.length === 0) {
    return Promise.resolve({
      message:
        "This service is currently unavailable. We apologise for the inconvenience.",
    });
  }

  return Promise.all(promises)
    .then((results) => {
      let data = {};
      if (results && results.length >= 1) {
        for (let i = 0; i < results.length; i++) {
          //check from which api data is coming
          if (results[i].data.artObjects && results[i].data.count > 0) {
            data.rijksData = results[i].data.artObjects;
            data.rijksCount = results[i].data.count;
          } else if (results[i].data.data && results[i].data.info.total > 0) {
            data.clevelandData = results[i].data.data;
            data.clevelandCount = results[i].data.info.total;
          } else if (
            results[i].data.records &&
            results[i].data.info.record_count > 0
          ) {
            data.vamData = results[i].data.records;
            data.vamCount = results[i].data.info.record_count;
          } else {
            data.message = "No results found";
          }
        }
      }
      // return data != {} ? data : { message: "No results found" };
      console.log(data);
      return data;
    })
    .catch((error) => {
      return {
        message:
          "This service is currently unavailable. We apologise for the inconvenience.",
      };
    });
};
