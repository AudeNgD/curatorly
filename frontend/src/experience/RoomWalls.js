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

  const textures = [
    rwTextureNormal,
    rwTextureAlbedo,
    rwTextureRoughness,
    rwTextureAO,
    rwTextureMetallic,
    rwTextureHeight,
  ];

  textures.forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
  });

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

  // wall lines
  const wallEdgesFWall = new THREE.EdgesGeometry(fWall.geometry);
  const wallEdgesBWall = new THREE.EdgesGeometry(bWall.geometry);
  const wallEdgesLWall = new THREE.EdgesGeometry(lWall.geometry);
  const wallEdgesRWall = new THREE.EdgesGeometry(rWall.geometry);

  const wallLineFWall = new THREE.LineSegments(
    wallEdgesFWall,
    new THREE.LineBasicMaterial({ color: 0x660000 })
  );
  const wallLineBWall = new THREE.LineSegments(
    wallEdgesBWall,
    new THREE.LineBasicMaterial({ color: 0x660000 })
  );
  const wallLineLWall = new THREE.LineSegments(
    wallEdgesLWall,
    new THREE.LineBasicMaterial({ color: 0x660000 })
  );
  const wallLineRWall = new THREE.LineSegments(
    wallEdgesRWall,
    new THREE.LineBasicMaterial({ color: 0x660000 })
  );

  roomWallsGroup.add(
    fWall,
    bWall,
    lWall,
    rWall,
    wallLineFWall,
    wallLineBWall,
    wallLineLWall,
    wallLineRWall
  );

  return roomWallsGroup;
}

export default createRoomWalls;
