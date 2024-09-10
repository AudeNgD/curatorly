import * as THREE from "three";

// Room walls
class RoomWall extends THREE.Mesh {
  constructor() {
    super();
    this.geometry = new THREE.BoxGeometry(10, 10, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  }
}

// Exhibition walls
class ExhibitionWall extends THREE.Mesh {
  constructor() {
    super();
    this.geometry = new THREE.BoxGeometry(5, 3, 0.5);
    this.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("orange").convertSRGBToLinear(),
    });
    this.exhibitionWallActive = false;
    this.isHovered = false;
  }

  onPointerOver(e) {
    if (!this.isHovered) {
      this.material.color.set("hotpink");
      this.material.color.convertSRGBToLinear();
      this.isHovered = true;
    }
  }

  onPointerOut(e) {
    this.material.color.set("orange");
    this.material.color.convertSRGBToLinear();
    this.isHovered = false;
  }

  onClick(e) {
    this.exhibitionWallActive = !this.exhibitionWallActive;
    this.material.color.set(this.exhibitionWallActive ? "red" : "green");
  }
}

export { RoomWall, ExhibitionWall };
