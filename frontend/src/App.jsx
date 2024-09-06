import { useState, useEffect } from "react";
import "./App.css";
import { testEuropeanaAPI } from "../services/europeanaAPI";

function App() {
  useEffect(() => {
    testEuropeanaAPI()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;
