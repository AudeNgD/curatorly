import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomWall, ExhibitionWall } from "../experience/GalleryObjects";
import { gsap } from "gsap";
import Door from "../experience/Door";
import loadRoomLabel from "../experience/RoomLabel";
import loadDoorLabel from "../experience/DoorLabel";

function Exhibition() {
  const [currentSceneIndex, setCurrentSceneIndex] = React.useState(0);
  const objectInScene = ["Room 1", "Room 2"];

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

    const door = new Door();
    door.position.set(9, -0.5, -8);
    door.rotation.y = Math.PI / 2;

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

    // loadDoorLabel(`${objectInScene[currentSceneIndex]}`, function (textMesh) {
    //   console.log(textMesh);
    //   sceneElements.push(textMesh);
    // });

    loadDoorLabel(`${objectInScene[currentSceneIndex]}`, function (textMesh) {
      scene.add(textMesh);
    });

    sceneElements.push(
      wall1,
      wall2,
      wall3,
      wall4,
      door,
      floor,
      ceiling,
      exWall1,
      exWall2
    );

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1000, 5);
    pointLight.position.set(4, 2, -5);
    scene.add(pointLight);

    // Add objects to the scene
    sceneElements.forEach((element) => scene.add(element));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // Event listeners

    // Attach event listeners to window
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("click", onClick);

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
          console.log(intersectedObject);
          intersectedObject.onClick(); // Handle object click

          const aabb = new THREE.Box3().setFromObject(intersectedObject);
          const center = aabb.getCenter(new THREE.Vector3());

          gsap.to(camera.position, {
            x: -center.x / 10,
            y: -center.y / 10,
            z: -center.z / 10,
            duration: 2,
            onUpdate: () => {
              camera.lookAt(center);
            },
          });
          gsap.to(camera, {
            fov: 35,
            duration: 2,
            onUpdate: () => {
              camera.updateProjectionMatrix();
            },
          });

          if (intersectedObject.isOpen) {
            setCurrentSceneIndex(2);
          }
        }
      }
    }

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
