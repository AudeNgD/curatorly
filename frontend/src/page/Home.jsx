import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <button>
        <Link to={"/shortlist"}>Shortlist</Link>
      </button>
      <button>
        <Link to={"/results"}>Search results</Link>
      </button>
      <button>
        <Link to={"/exhibition"}>Exhibition</Link>
      </button>
    </>
  );
}

export default Home;
