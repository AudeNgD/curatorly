import * as THREE from "three";

function createFloor() {
  const textureLoader = new THREE.TextureLoader();

  //load all textures
  const floorTextureAlbedo = textureLoader.load(
    "/texture/hungarian-point-flooring-bl/hungarian-point-flooring_albedo.png"
  );
  const floorTextureNormal = textureLoader.load(
    "/texture/hungarian-point-flooring-bl/hungarian-point-flooring_normal-ogl.png"
  );
  const floorTextureAO = textureLoader.load(
    "/texture/hungarian-point-flooring-bl/hungarian-point-flooring_ao.png"
  );
  const floorTextureRoughness = textureLoader.load(
    "/texture/hungarian-point-flooring-bl/hungarian-point-flooring_roughness.png"
  );
  const floorTextureHeight = textureLoader.load(
    "/texture/hungarian-point-flooring-bl/hungarian-point-flooring_height.png"
  );
  const floorTextureMetallic = textureLoader.load(
    "/texture/hungarian-point-flooring-bl/hungarian-point-flooring_metallic.png"
  );

  const textures = [
    floorTextureNormal,
    floorTextureAlbedo,
    floorTextureRoughness,
    floorTextureAO,
    floorTextureMetallic,
    floorTextureHeight,
  ];

  textures.forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    texture.rotation = Math.PI / 4;
  });

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: floorTextureAlbedo,
    normalMap: floorTextureNormal,
    roughnessMap: floorTextureRoughness,
    aoMap: floorTextureAO,
    metalnessMap: floorTextureMetallic,
    alphaMap: floorTextureHeight,
    side: THREE.DoubleSide,
  });

  const floorGeometry = new THREE.PlaneGeometry(80, 80);

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);

  floor.rotation.x = Math.PI / 2;
  floor.position.y = -Math.PI;

  return floor;
}

export default createFloor;
