export default function formatResponse(response) {
  const rijksData = response.rijksData ? response.rijksData : [];
  const europeanaData = response.europeanaData ? response.europeanaData : [];
  const metData = response.metData ? response.metData : [];
  const chicagoData = response.chicagoData ? response.chicagoData : [];

  let formattedrijksData = [];
  let formattedeuropeanaData = [];
  let formattedmetData = [];
  let formattedchicagoData = [];

  if (
    rijksData.length === 0 &&
    europeanaData.length === 0 &&
    metData.length === 0 &&
    chicagoData.length === 0
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
        museum: "rijksmuseum",
      };
    });
  }

  //in case the artist name is not available in the response
  if (europeanaData.length > 0) {
    formattedeuropeanaData = europeanaData
      .filter((item) => item.dcCreator !== undefined)
      .map((item) => {
        let artist = "";
        if (item.dcCreator[0].startsWith("http")) {
          artist = item.dcCreator[1];
        } else {
          artist = item.dcCreator[0];
        }

        return {
          id: item.id,
          title: item.title,
          imageUrl: item.edmPreview[0],
          imageWidth: item.edmPreviewLargest,
          imageHeight: item.edmPreviewLargest,
          links: item.links,
          artist: artist,
          museum: "europeana",
        };
      });
  }

  if (metData.length > 0) {
    formattedmetData = metData.map((id) => {
      return {
        id: id,
        museum: "met",
      };
    });
  }

  if (chicagoData.length > 0) {
    const imagebaseURL = "https://www.artic.edu/iiif/2/";

    formattedchicagoData = chicagoData.map((item) => {
      return {
        id: item.id,
        title: item.title,
        imageUrl: `${imagebaseURL}${item.image_id}/full/843,/0/default.jpg`,
        imageWidth: item.image_width,
        imageHeight: item.image_height,
        links: item.url,
        artist: item.artist_title,
        museum: "chicago",
      };
    });
  }

  const artwork = formattedrijksData
    .concat(formattedeuropeanaData)
    .concat(formattedmetData)
    .concat(formattedchicagoData);
  //returns an array of objects
  return artwork;
}
