export default function formatObjectResponse(museum, response) {
  if (museum === "rijksmuseum") {
    return {
      id: response.objectNumber,
      title: response.title,
      imageUrl: response.webImage.url,
      description: response.label.description
        ? response.label.description
        : plaqueDescriptionEnglish,
      artist: response.principalMaker,
      dating: response.dating.presentingDate,
      materials: response.materials[0],
      technique: response.techniques[0]
        ? response.techniques[0].text
        : "Unknown",
      location: response.location,
      credit: response.acquisition.creditLine,
      museum: "Rijksmuseum",
    };
  }
  if (museum === "cleveland") {
    return {
      id: response.id,
      title: response.title,
      imageUrl: response.images.web.url,
      description: response.description,
      artist: response.creators[0].description.slice(
        0,
        response.creators[0].description.indexOf("(")
      ),
      dating: response.creation_date,
      materials:
        response.support_materials != []
          ? response.support_materials
          : "Unknown",
      technique: response.technique,
      location: response.current_location,
      credit: response.creditline,
      museum: "Cleveland Museum of Art",
    };
  }

  if (museum === "vam") {
    console.log(response);
    let materials = response.record.materials.map((material) => {
      return material.text;
    });
    materials = materials.join(" and ");

    let artistName = "";

    if (response.record.artistMakerPerson == []) artistName = "Unknown";

    if (response.record.artistMakerPerson.length == 1)
      artistName = response.record.artistMakerPerson[0].name;

    if (response.record.artistMakerPerson.length > 1)
      artistName = response.record.artistMakerPerson.join(" and ");

    return {
      id: response.record.systemNumber,
      title: response.record.titles[0].title,
      imageUrl: response.meta.images._iiif_image + "full/full/0/default.jpg",
      description: response.record.summaryDescription,
      artist: artistName,
      dating: response.record.productionDates[0].date,
      materials: materials,
      technique: response.record.techniques[0]
        ? response.record.techniques[0].text
        : "Unknown",
      location: response.record.galleryLocation
        ? response.record.galleryLocation[0].current.text +
          "case" +
          response.record.galleryLocation[0].case +
          "shelf" +
          response.record.galleryLocation[0].shelf
        : "Unknown",
      credit: response.record.creditLine,
      museum: "Victoria and Albert Museum",
    };
  }
}
