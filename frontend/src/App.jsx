import { useState, useEffect } from "react";
import "./App.css";
//import { testEuropeanaAPI } from "../services/europeanaAPI";
//import { testRijksAPI } from "../services/rijksAPI";
import { testConcurrentAPIs } from "../services/apis";

function App() {
  const [results, setResults] = useState();
  const searchParams = "Leonardo da Vinci";

  useEffect(() => {
    testConcurrentAPIs(searchParams).then((res) => {
      console.log("here data");
      setResults(res);
    });
  }, []);

  return (
    <>
      {results && results.items && results.items.length > 0 ? (
        <>
          {" "}
          {results.items.map((result) => {
            return (
              <div key={result.id}>
                <h2>{result.title}</h2>
                <img src={result.edmPreview} alt={result.title} />
              </div>
            );
          })}
          {results.artObjects.map((result) => {
            return (
              <div key={result.id}>
                <h2>{result.title}</h2>
                <img src={result.webImage.url} alt={result.title} />
              </div>
            );
          })}
        </>
      ) : (
        <p>Nothing to display</p>
      )}
    </>
  );
}

export default App;
