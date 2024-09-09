import React from "react";
import * as THREE from "three";
import CameraControl from "../experience/Camera";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function Exhibition() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a room
  const sceneElements = [];
  const axesHelper = new THREE.AxesHelper(3);
  sceneElements.push(axesHelper);

  const roomWallGeo = new THREE.BoxGeometry(10, 10, 1);
  const roomWallMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const roomWall = new THREE.Mesh(roomWallGeo, roomWallMaterial);

  const wall1 = roomWall.clone();
  wall1.position.x = 0;
  wall1.position.y = 0;

  const wall2 = roomWall.clone();
  wall2.position.x = -5;
  wall2.position.y = 0;
  wall2.position.z = 5;
  wall2.rotation.y = Math.PI / 2;

  const wall3 = roomWall.clone();
  wall3.position.x = 0;
  wall3.position.y = 0;
  wall3.position.z = 10;
  //wall3.rotation.y = Math.PI;

  const wall4 = roomWall.clone();
  wall4.position.x = 5;
  wall4.position.y = 0;
  wall4.position.z = 5;
  wall4.rotation.y = Math.PI / 2;

  sceneElements.push(wall1, wall2, wall3, wall4);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  const exWallGeo = new THREE.BoxGeometry(5, 3, 1);
  const exWallMaterial = new THREE.MeshBasicMaterial({ color: 0xff0034 });
  const exWall = new THREE.Mesh(exWallGeo, exWallMaterial);
  exWall.position.x = -5;
  exWall.position.y = 0;
  exWall.position.z = 0;

  sceneElements.push(exWall);
  sceneElements.push(cube);

  for (const element of sceneElements) {
    scene.add(element);
  }
  //scene.add(exWall, cube);

  camera.position.z = 5;

  //   function animate() {
  //     cube.rotation.x += 0.01;
  //     cube.rotation.y += 0.01;
  //     this.cameraControl = new CameraControl(renderer, camera, () => {
  //       window.requestAnimationFrame(() => renderer.render(scene, camera));
  //     });
  //   }

  const controls = new OrbitControls(camera, renderer.domElement);

  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);
  return <div>Exhibition</div>;
}

export default Exhibition;
