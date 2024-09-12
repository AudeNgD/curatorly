import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
//import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
//import { FontLoader } from "three/addons/loaders/FontLoader.js";

function loadRoomLabel(text, callback) {
  const loader = new FontLoader();

  loader.load("/fonts/helvetiker_regular.typeface.json", function (font) {
    let geometry = new TextGeometry(text, {
      font: font,
      size: 0.5,
      depth: 0.1,
      curveSegments: 12,
      bevelEnabled: false,
    });
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.set(0, 3, -6);
    callback(textMesh);
  });
}

export default loadRoomLabel;
