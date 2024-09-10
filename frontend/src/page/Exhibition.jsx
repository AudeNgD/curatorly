import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomWall, ExhibitionWall } from "../experience/GalleryObjects";

function Exhibition() {
  useEffect(() => {
    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.1);
    camera.lookAt(5, 5, 5);

    const dir = new THREE.Vector3(0, 0, 1);
    dir.normalize();
    const origin = new THREE.Vector3(0, 0, 0);
    const length = 10;
    const hex = 0xffff00;
    const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredObject = null; // Track currently hovered object

    // Create scene elements
    const sceneElements = [];

    const wall1 = new RoomWall();
    wall1.position.set(0, 2, -10);

    const wall2 = new RoomWall();
    wall2.position.set(-10, 2, 0);
    wall2.rotation.y = Math.PI / 2;

    const wall3 = new RoomWall();
    wall3.position.set(0, 2, 10);

    const wall4 = new RoomWall();
    wall4.position.set(10, 2, 0);
    wall4.rotation.y = Math.PI / 2;

    const floor = new RoomWall();
    floor.position.set(0, -2, 0);
    floor.rotation.x = Math.PI / 2;
    floor.geometry = new THREE.BoxGeometry(20, 20, 1);
    floor.material.color.set("brown");

    const ceiling = new RoomWall();
    ceiling.position.set(0, 6, 0);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.geometry = new THREE.BoxGeometry(20, 20, 1);
    ceiling.material.color.set("grey");

    const exWall1 = new ExhibitionWall();
    exWall1.position.set(0, 0, -8);

    const exWall2 = new ExhibitionWall();
    exWall2.position.set(-8, 0, 0);
    exWall2.rotation.y = Math.PI / 2;

    sceneElements.push(
      arrowHelper,
      wall1,
      wall2,
      wall3,
      wall4,
      floor,
      ceiling,
      exWall1,
      exWall2
    );

    // Add objects to the scene
    sceneElements.forEach((element) => scene.add(element));

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableZoom = false;
    // controls.maxAzimuthAngle = Math.PI / 2;
    // controls.minAzimuthAngle = -Math.PI / 2;

    // Event listeners
    function onPointerMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        // Handle hover in
        if (hoveredObject !== intersectedObject) {
          if (hoveredObject && hoveredObject.onPointerOut) {
            hoveredObject.onPointerOut(); // Call the pointer out on the previously hovered object
          }
          if (intersectedObject.onPointerOver) {
            intersectedObject.onPointerOver(); // Call the pointer over on the new object
          }
          hoveredObject = intersectedObject;
        }
      } else if (hoveredObject) {
        // No intersection, reset the previous hovered object
        if (hoveredObject.onPointerOut) {
          hoveredObject.onPointerOut();
        }
        hoveredObject = null;
      }
    }

    function onClick(event) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.onClick) {
          intersectedObject.onClick(); // Handle object click
        }
      }
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      controls.update();
      //controls.autoRotate = true;
      renderer.render(scene, camera);
    }

    animate();

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", onClick);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div>Exhibition</div>;
}

export default Exhibition;
