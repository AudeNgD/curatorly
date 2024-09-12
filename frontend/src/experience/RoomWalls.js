import * as THREE from "three";

class RoomWall extends THREE.Mesh {
  constructor(material) {
    super();
    this.geometry = new THREE.BoxGeometry(80, 20, 1);
    this.material = material;
  }
}

function createRoomWalls() {
  const textureLoader = new THREE.TextureLoader();
  let roomWallsGroup = new THREE.Group();

  //manage wall texture

  const rwTextureNormal = textureLoader.load(
    "/texture/lumpy-wet-concrete-bl/lumpy-wet-concrete_normal-ogl"
  );

  const rwTextureAO = textureLoader.load(
    "/texture/lumpy-wet-concrete-bl/lumpy-wet-concrete_ao.png"
  );
  const rwTextureAlbedo = textureLoader.load(
    "/texture/lumpy-wet-concrete-bl/lumpy-wet-concrete_albedo.png"
  );

  const rwTextureRoughness = textureLoader.load(
    "/texture/lumpy-wet-concrete-bl/lumpy-wet-concrete_roughness.png"
  );

  const rwTextureHeight = textureLoader.load(
    "/texture/lumpy-wet-concrete-bl/lumpy-wet-concrete_height.png"
  );
  const rwTextureMetallic = textureLoader.load(
    "/texture/lumpy-wet-concrete-bl/lumpy-wet-concrete_metallic.png"
  );

  rwTextureNormal.wrapS = THREE.RepeatWrapping;
  rwTextureNormal.wrapT = THREE.RepeatWrapping;

  rwTextureAlbedo.wrapS = THREE.RepeatWrapping;
  rwTextureAlbedo.wrapT = THREE.RepeatWrapping;

  rwTextureRoughness.wrapS = THREE.RepeatWrapping;
  rwTextureRoughness.wrapT = THREE.RepeatWrapping;

  rwTextureAO.wrapS = THREE.RepeatWrapping;
  rwTextureAO.wrapT = THREE.RepeatWrapping;

  rwTextureMetallic.wrapS = THREE.RepeatWrapping;
  rwTextureMetallic.wrapT = THREE.RepeatWrapping;

  rwTextureHeight.wrapS = THREE.RepeatWrapping;
  rwTextureHeight.wrapT = THREE.RepeatWrapping;

  const rwMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: rwTextureAlbedo,
    normalMap: rwTextureNormal,
    roughnessMap: rwTextureRoughness,
    aoMap: rwTextureAO,
    metalnessMap: rwTextureMetallic,
    alphaMap: rwTextureHeight,
    side: THREE.DoubleSide,
  });

  //front wall
  const fWall = new RoomWall(rwMaterial);
  fWall.position.z = -20;

  //back wall
  const bWall = new RoomWall(rwMaterial);
  bWall.position.z = 20;

  //left wall
  const lWall = new RoomWall(rwMaterial);
  lWall.position.x = -20;
  lWall.rotation.y = Math.PI / 2;

  //right wall
  const rWall = new RoomWall(rwMaterial);
  rWall.position.x = 20;
  rWall.rotation.y = Math.PI / 2;

  roomWallsGroup.add(fWall, bWall, lWall, rWall);

  return roomWallsGroup;
}

export default createRoomWalls;
