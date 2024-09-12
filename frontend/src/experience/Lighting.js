import * as THREE from "three";
//import { GUI } from "lil-gui";

function setupLighting() {
  let lightGroup = new THREE.Group();

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

  function createSpotlight(x, y, z, intensity, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, intensity);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.angle = 1.57079;
    spotlight.penumbra = 0.2;
    spotlight.decay = 1;
    spotlight.distance = 40;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;

    // Add a helper for this spotlight
    // const spotlightHelper = new THREE.SpotLightHelper(spotlight);
    // scene.add(spotlightHelper);

    return spotlight;
  }

  const frontWallSpotlight = createSpotlight(
    0,
    6.7,
    -13,
    0.948,
    new THREE.Vector3(0, 0, -20)
  );

  const backWallSpotlight = createSpotlight(
    0,
    6.7,
    13,
    0.948,
    new THREE.Vector3(0, 0, 20)
  );

  const leftWallSpotlight = createSpotlight(
    -13,
    6.7,
    0,
    0.948,
    new THREE.Vector3(-20, 0, 0)
  );

  const rightWallSpotlight = createSpotlight(
    13,
    6.7,
    0,
    0.948,
    new THREE.Vector3(20, 0, 0)
  );

  const statueSpotlight = createSpotlight(
    0,
    10,
    0,
    0.948,
    new THREE.Vector3(0, -4.2, 0)
  ); // Spotlight for the statue
  statueSpotlight.angle = 0.75084;
  statueSpotlight.decay = 1;
  statueSpotlight.penumbra = 1;
  statueSpotlight.distance = 0;

  //const statueSpotlightFolder = gui.addFolder("Statue Light");
  //   statueSpotlightFolder.add(statueSpotlight, "intensity", 0, 4);
  //   statueSpotlightFolder
  //     .add(statueSpotlight, "angle", 0, Math.PI / 2)
  //     .name("Angle");
  //   statueSpotlightFolder.add(statueSpotlight, "penumbra", 0, 1).name("Penumbra");
  //   statueSpotlightFolder.add(statueSpotlight, "decay", 0, 2).name("Decay");

  lightGroup.add(
    ambientLight,
    frontWallSpotlight,
    backWallSpotlight,
    leftWallSpotlight,
    rightWallSpotlight,
    statueSpotlight
  );

  return lightGroup;
}

export default setupLighting;
