export default function formatResponse(response) {
  console.log(response);
  const artObjects = response.artObjects ? response.artObjects : [];
  const items = response.items ? response.items : [];
  let formattedArtObjects = {};
  let formattedItems = {};

  if (artObjects.length === 0 && items.length === 0) {
    return {};
  }

  if (artObjects.length > 0) {
    formattedArtObjects = artObjects.map((artObject) => {
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
  if (items.length > 0) {
    formattedItems = items
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

  const artwork = formattedArtObjects.concat(formattedItems);
  return artwork;
}
