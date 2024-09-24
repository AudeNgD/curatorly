export default function formatResponse(response) {
  if (response != []) {
    const rijksData = response.rijksData ? response.rijksData : [];
    const clevelandData = response.clevelandData ? response.clevelandData : [];
    const rijksCount = response.rijksCount ? response.rijksCount : 0;
    const clevelandCount = response.clevelandCount
      ? response.clevelandCount
      : 0;

    let formattedrijksData = [];
    let formattedclevelandData = [];

    if (rijksData.length === 0 && clevelandData.length === 0) {
      return [];
    }

    if (rijksData.length > 0) {
      formattedrijksData = rijksData.map((artObject) => {
        return {
          id: artObject.objectNumber,
          title: artObject.title,
          imageUrl: artObject.webImage.url,
          imageWidth: artObject.webImage.width,
          imageHeight: artObject.webImage.height,
          links: artObject.links.web,
          artist: artObject.principalOrFirstMaker,
          museum: "Rijksmuseum",
        };
      });
    }

    if (clevelandData.length > 0) {
      formattedclevelandData = clevelandData.map((artwork, index) => {
        //Handling artist name
        let artistName = "";
        if (artwork.creators[0] === undefined) {
          artistName = "Unknown";
        } else {
          const nameIndex = artwork.creators[0].description.indexOf("(");
          if (nameIndex !== -1) {
            artistName = artwork.creators[0].description.slice(0, nameIndex);
          } else {
            artistName = artwork.creators[0].description;
          }
        }

        if (artwork.images.web !== undefined) {
          return {
            id: artwork.id,
            title: artwork.title,
            artist: artistName,
            imageUrl: artwork.images.web.url,
            imageWidth: artwork.images.web.width,
            imageHeight: artwork.images.web.height,
            links: artwork.url,
            medium: artwork.material,
            technique: artwork.technique,
            museum: "The Cleveland Museum of Art",
          };
        }
      });
    }

    const artworks = formattedrijksData.concat(formattedclevelandData);
    //returns an array of objects
    return { artworks, rijksCount, clevelandCount };
  } else {
    return [];
  }
}
