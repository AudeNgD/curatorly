# curatorly

## This project

curatorly allows a user to browse through the collections of the Rijksmuseum, the Cleveland Art Institute and the Victoria & Albert Museum and select the artworks that they would like to display in a virtual exhibition.

To facilitate browsing through the collections several filters are available.

It was built using React, JavaScript, HTML, CSS, Vite and Axios.

## API keys required

To access the Rijksmuseum API an API key is required.

The key can be obtained by registering for a [Rijksstudio account](https://www.rijksmuseum.nl/en/rijksstudio). You will be given a key instantly upon request, which you can find at the advanced settings of your Rijksstudio account.

## Instructions

1. Fork and clone this repo `https://github.com/AudeNgD/curatorly.git`
2. Change to the frontend repo `cd frontend`
3. If Vite is not already installed on your machine run `npm install --save-dev`
4. Install the dependencies by running `npm i`
5. Create a .env file in the root folder of the frontend repo.
   In the .env file, add `VITE_APP_RIJKS_API_KEY=your Riskjsmuseum API key`
6. Check that the .env file is .gitignored
7. Still in the frontend repo, run `npm run dev` in your terminal to run the app on your local server.

NB - During the first search, the app may show a 'service unavailable' message, especially if it has been some time since the app has last been accessed.
This is due to render where the proxy servers are hosted. It powers down the proxy servers on account of inactivity. Wait a little bit before refreshing the page.

## Minimum version requirements

- Node.js > 21.3.0

## Link to the hosted version

https://curatorly.onrender.com/

## Proxy servers (optional)

Due to CORS not being set up for the Cleveland API and the V&A museum APIs, I have set up two proxy servers to access the data. They are hosted on render.

The version of curatorly uses these servers out of the box.

If you would like to host your own version of the proxy servers, you can clone the repo for the servers here:

- Cleveland server: `https://github.com/AudeNgD/cleveland-api`
- V&A server: `https://github.com/AudeNgD/vam-api`
- 
  Explanations on how to set up the proxy servers are in the README of these repos.
