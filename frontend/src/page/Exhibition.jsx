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
    camera.position.z = 5;

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
    wall1.position.set(0, 0, 0);
    const wall2 = new RoomWall();
    wall2.position.set(-5, 0, 5);
    wall2.rotation.y = Math.PI / 2;

    const wall3 = new RoomWall();
    wall3.position.set(0, 0, 10);

    const wall4 = new RoomWall();
    wall4.position.set(5, 0, 5);
    wall4.rotation.y = Math.PI / 2;

    const floor = new RoomWall();
    floor.position.set(0, -5, 5);
    floor.rotation.x = Math.PI / 2;

    const ceiling = new RoomWall();
    ceiling.position.set(0, 5, 5);
    ceiling.rotation.x = Math.PI / 2;
    const exWall1 = new ExhibitionWall();
    exWall1.position.set(0, -3, 2);

    sceneElements.push(wall1, wall2, wall3, wall4, floor, ceiling, exWall1);

    // Add objects to the scene
    sceneElements.forEach((element) => scene.add(element));

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);

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

    // Attach event listeners
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("click", onClick);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
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
