import React from "react";

function PageNotFound() {
  return (
    <div id="page-not-found-container">
      <div id="page-not-found-image">
        <img
          src="https://framemark.vam.ac.uk/collections/2023NH6733/full/full/0/default.jpg"
          alt="Funny Fran sculpture"
        />
        <p>
          Image credits: Funny Fran from the Victoria & Albert Museum
          collections
        </p>
      </div>
      <div id="page-not-found-text">
        <h1>Nothing much to see here...</h1>
        <p>
          The page you're trying to access doesn't appear to exist. Try using{" "}
          <a href="/results?keyword=&rcheck=true&ccheck=true&vcheck=true">
            search
          </a>
          , or browse one of the following links:
        </p>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/credits">Credits</a>
          </li>
        </ul>
        <p>
          You can also email{" "}
          <a href="mailto: aude.nguyenduc@gmail.com">the web designer</a> to
          report any errors or concerns.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
