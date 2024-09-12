import * as THREE from "three";

class Door extends THREE.Mesh {
  constructor() {
    super();
    this.isOpen = false;
    this.geometry = new THREE.BoxGeometry(1, 2, 0.1);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.isHovered = false;
  }

  onPointerOver(e) {
    if (!this.isHovered) {
      this.material.color.set("purple");
      this.material.color.convertSRGBToLinear();
      this.isHovered = true;
    }
  }

  onPointerOut(e) {
    this.material.color.set("red");
    this.material.color.convertSRGBToLinear();
    this.isHovered = false;
  }
  onClick(e) {
    this.isOpen = !this.isOpen;
  }
}

export default Door;
