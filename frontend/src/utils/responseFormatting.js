export default function formatResponse(response) {
  const artObjects = response.artObjects;
  const items = response.items;

  const count = artObjects.length + items.length;

  const formattedArtObjects = artObjects.map((artObject) => {
    return {
      id: artObject.objectNumber,
      title: artObject.title,
      imageUrl: artObject.webImage.url,
      imageWidth: artObject.webImage.width,
      imageHeight: artObject.webImage.height,
      links: artObject.links.self,
      artist: artObject.principalOrFirstMaker,
      museum: "rijksmuseum",
    };
  });

  const formattedItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      imageUrl: item.edmPreview,
      imageWidth: item.edmPreviewLargest,
      imageHeight: item.edmPreviewLargest,
      links: item.links,
      artist: item.dcCreator,
      museum: "europeana",
    };
  });

  const artwork = formattedArtObjects.concat(formattedItems);

  return { count, artwork };
}
