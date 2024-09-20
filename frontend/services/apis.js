import axios from "axios";

const chicagoDataAPI = axios.create({
  baseURL: `https://api.artic.edu/api/v1/artworks`,
});

const chicagoImageAPI = axios.create({
  baseURL: `https://www.artic.edu/iiif/2/`,
});

const metSearchAPI = axios.create({
  baseURL: `https://collectionapi.metmuseum.org/public/collection/v1/search`,
});

const metObjectsAPI = axios.create({
  baseURL: `https://collectionapi.metmuseum.org/public/collection/v1/objects`,
});

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
    "Access-Control-Allow-Methods": "GET",
  },
});

export const fetchArtworks = (params) => {
  //artist parameter
  const artistName = params[0].get("aname");

  //museum picker
  const europeanaChecked = params[0].get("echeck");
  const rijksmuseumChecked = params[0].get("rcheck");
  const metChecked = params[0].get("mcheck");
  const chicagoChecked = params[0].get("ccheck");

  //color picker
  const color = params[0].get("color");

  //century picker
  const century = params[0].get("century");

  //medium picker
  const medium = params[0].get("medium");

  //technique picker
  const technique = params[0].get("technique");

  let europeanaPromise = null;
  let rijskPromise = null;
  let metPromise = null;
  let chicagoPromise = null;

  // //creating the query for the Rijksmuseum API for all parameters
  // const rijksQuery = `?key=${
  //   import.meta.env.VITE_APP_RIJKS_API_KEY
  // }&profile=rich&imgonly=true`;
  // artistName
  //   ? (rijksQuery += `&involvedMaker=${artistName.split(" ").join("+")}`)
  //   : null;
  // color ? (rijksQuery += `&f.normalized32Colors.hex=%20${color}`) : null;
  // century ? (rijksQuery += `&f.dating.period=${century}`) : null;
  // medium ? (rijksQuery += `&material=${medium}`) : null;
  // technique ? (rijksQuery += `&technique=${technique}`) : null;

  // //creating the query for the Chicago API for all parameters
  // const chicagoQuery = `?q=${artistName}&limit=100`;
  // if(color || century || medium) {
  //   chicagoQuery += `&fields=`
  // }

  // color ? (chicagoQuery += `&color=${color}`) : null;
  // century ? (chicagoQuery += `&century=${century}`) : null;
  // medium ? (chicagoQuery += `&medium=${medium}`) : null;

  //creating the query for the Europeana API for all parameters
  let europeanaQuery = "?media=true&reusability=true&rows=100&profile=rich";
  artistName != ""
    ? (europeanaQuery += `&query=proxy_dc_creator:(${artistName})`)
    : (europeanaQuery += `&query=who:*`);
  console.log("europeanaQuery", europeanaQuery);
  century ? (europeanaQuery += `&qf=when:${century}`) : null;
  medium ? (europeanaQuery += `&qf=what:${medium}`) : null;
  color ? (europeanaQuery += `&colourpalette=${color}`) : null;
  console.log("europeanaQuery", europeanaQuery);

  europeanaPromise = europeanaAPI.get(europeanaQuery);

  // //creating the query for the Met API for all parameters
  // const metQuery = `?q=${artistName}`;
  // color ? (metQuery += `&color=${color}`) : null;
  // century ? (metQuery += `&century=${century}`) : null;
  // medium ? (metQuery += `&medium=${medium}`) : null;

  // //if artist name is empty, return all top artworks from both museums
  // if (artistName === "") {
  //   const rijksQuery = `?key=${
  //     import.meta.env.VITE_APP_RIJKS_API_KEY
  //   }&toppieces=true`;

  //   const europeanaQuery = `?query=who:*`;
  //   rijskPromise = rijksAPI.get(rijksQuery);
  //   europeanaPromise = europeanaAPI.get(europeanaQuery);

  //   metPromise = metObjectsAPI.get();

  //   const chicagoQuery = `?limit=100`;
  //   chicagoPromise = chicagoDataAPI.get(chicagoQuery);
  // }

  //handling the case when artist name is provided
  if (artistName !== "") {
    const rijksFormatting = artistName.split(" ").join("+");
    const rijksQuery = `?key=${
      import.meta.env.VITE_APP_RIJKS_API_KEY
    }&involvedMaker=${rijksFormatting}&profile=rich`;
    const europeanaQuery = `?query=who:(${artistName})`;
    rijskPromise = rijksAPI.get(rijksQuery);
    europeanaPromise = europeanaAPI.get(europeanaQuery);
  }

  //handling the museums that have been checked
  //as a param it is a string
  let promises = [];

  europeanaChecked === "true" ? promises.push(europeanaPromise) : null;
  rijksmuseumChecked === "true" ? promises.push(rijskPromise) : null;
  metChecked === "true" ? promises.push(metPromise) : null;
  chicagoChecked === "true" ? promises.push(chicagoPromise) : null;

  if (promises.length === 0) {
    return Promise.resolve(null);
  }

  return Promise.all(promises).then((results) => {
    let data = {};
    if (results && results.length >= 1) {
      for (let i = 0; i < results.length; i++) {
        //check from which api data is coming
        if (results[i].data.artObjects) {
          // const rijksCollectionData = results[i].data.artObjects;

          // //get additional information for each object found  from the Rijksmuseum API
          // let promises = [];
          // for (let i = 0; i < rijksCollectionData.length; i++) {
          //   let query = `/${rijksCollectionData[i].objectNumber}?key=${
          //     import.meta.env.VITE_APP_RIJKS_API_KEY
          //   }`;
          //   promises.push(rijksAPI.get(query));
          // }
          // return Promise.all(promises).then((results) => {
          //   data.rijksData = results;
          // });
          data.rijksData = results[i].data.artObjects;
        } else if (results[i].data.items) {
          data.europeanaData = results[i].data.items;
        } else if (results[i].data.objectIDs) {
          data.metData = results[i].data.objectIDs;
        } else if (results[i].data.data) {
          data.chicagoData = results[i].data.data;
        }
      }
    }

    console.log("here in apis", data);
    return data;
  });
};
