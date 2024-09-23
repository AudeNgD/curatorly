export default function formatResponse(response) {
  if (response != []) {
    const rijksData = response.rijksData ? response.rijksData : [];
    const clevelandData = response.clevelandData ? response.clevelandData : [];
    console.log("cleveData in rf", clevelandData);

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
          museum: "rijksmuseum",
        };
      });
    }

    if (clevelandData.length > 0) {
      formattedclevelandData = clevelandData.map((artwork) => {
        console.log("artwork in rf", artwork);
        return {
          id: artwork.id,
          title: artwork.title,
          artist: artwork.creators[0].description,
          imageUrl: artwork.images.web.url,
          imageWidth: artwork.images.web.width,
          imageHeight: artwork.images.web.height,
          links: artwork.url,
          medium: artwork.material,
          technique: artwork.technique,
          museum: "cleveland",
        };
      });
    }

    const artwork = formattedrijksData.concat(formattedclevelandData);
    //returns an array of objects
    console.log("artwork in rf", artwork);
    return artwork;
  } else {
    return [];
  }
}
