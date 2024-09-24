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
  baseURL: `https://exhibition-curator-5t1t.onrender.com/cleveland-api`,
});

export const fetchArtworks = (params) => {
  // keyword parameter
  const keyword = params[0].get("keyword");

  //artist parameter
  const artistName = params[0].get("aname");

  //museum picker
  const rijksmuseumChecked = params[0].get("rcheck");
  const clevelandChecked = params[0].get("ccheck");

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
  page ? (rijksQuery += `&p=${page / 21 + 1}`) : null;

  rijskPromise = rijksAPI.get(rijksQuery);

  //creating the query for the Cleveland API for all parameters

  let clevelandQuery = "search?has_image=1&limit=100";
  keyword ? (clevelandQuery += `&q=${keyword}`) : null;
  artistName ? (clevelandQuery += `&artists=${artistName}`) : null;
  let dates = {};
  century ? (dates = centuryConverter(century)) : null;
  century
    ? (clevelandQuery += `&created_after=${dates.startDate}&created_before=${dates.endDate}`)
    : null;
  medium ? (clevelandQuery += `&medium=${medium}`) : null;
  technique ? (clevelandQuery += `&technique=${technique}`) : null;
  page ? (clevelandQuery += `&skip=${(page / 21) * 100}`) : null;

  clevelandPromise = clevelandAPI.get(clevelandQuery);

  //handling the museums that have been checked
  //as a param it is a string
  let promises = [];

  rijksmuseumChecked === "true" ? promises.push(rijskPromise) : null;
  clevelandChecked === "true" ? promises.push(clevelandPromise) : null;

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
          data.rijksCount = results[i].data.count;
        } else if (results[i].data.data) {
          data.clevelandData = results[i].data.data;
          data.clevelandCount = results[i].data.info.total;
        }
      }
    }
    return data != {} ? data : [];
  });
};
