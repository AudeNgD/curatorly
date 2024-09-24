export default function formatResponse(response) {
  console.log(response);
  if (response != []) {
    const rijksData = response.rijksData ? response.rijksData : [];
    const clevelandData = response.clevelandData ? response.clevelandData : [];
    const rijksCount = response.rijksCount ? response.rijksCount : 0;
    const clevelandCount = response.clevelandCount
      ? response.clevelandCount
      : 0;
    const vamData = response.vamData ? response.vamData : [];
    const vamCount = response.vamCount ? response.vamCount : 0;

    let formattedrijksData = [];
    let formattedclevelandData = [];
    let formattedvamData = [];

    if (
      rijksData.length === 0 &&
      clevelandData.length === 0 &&
      vamData.length === 0
    ) {
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

    if (vamData.length > 0) {
      formattedvamData = vamData.map((artwork) => {
        let artistName = "";
        if (artwork._primaryMaker.name !== undefined) {
          artistName = artwork._primaryMaker.name;
        } else {
          artistName = "Unknown";
        }

        return {
          id: artwork.systemNumber,
          title: artwork._primaryTitle,
          artist: artistName,
          imageUrl: `${artwork._images._iiif_image_base_url}full/full/0/default.jpg`,
          imageWidth: 250,
          imageHeight: 250,
          links: "artwork.fields.object_url",
          museum: "Victoria and Albert Museum",
        };
      });
    }

    const artworks = formattedrijksData
      .concat(formattedclevelandData)
      .concat(formattedvamData);
    //returns an array of objects
    return { artworks, rijksCount, clevelandCount, vamCount };
  } else {
    return [];
  }
}
