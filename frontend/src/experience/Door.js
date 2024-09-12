import * as THREE from "three";

class Door extends THREE.Mesh {
  constructor() {
    super();
    this.isOpen = false;
    this.geometry = new THREE.BoxGeometry(1, 2, 0.1);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  }
  onClick(e) {
    this.isOpen = !this.isOpen;
  }
}

export default Door;
