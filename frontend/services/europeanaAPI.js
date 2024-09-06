// import axios from "axios";

// const europeanaAPI = axios.create({
//   baseURL: `https://api.europeana.eu/record/v2/search.json`,
//   headers: {
//     "Content-type": "application/json",
//     "X-Api-Key": import.meta.env.VITE_APP_EUROPEANA_API_KEY,
//   },
// });

// export const testEuropeanaAPI = () => {
//   const query = "?query=who:(Leonardo da Vinci)";
//   return europeanaAPI
//     .get(query)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => {
//       console.error("here", error);
//     });
// };
