import * as Three from "three";
import Engine from "../core/engine";

export default class Buffergeometry extends Engine {
  constructor({ canvas }) {
    super({ canvas });
  }
  setup() {
    this.geometry = new Three.BufferGeometry();

    // this.positionArray = new Float32Array(9);

    // // First vertice
    // this.positionArray[0] = 0;
    // this.positionArray[1] = 0;
    // this.positionArray[2] = 0;

    // // Second vertice
    // this.positionArray[3] = 0;
    // this.positionArray[4] = 1;
    // this.positionArray[5] = 0;

    // // Third vertice
    // this.positionArray[6] = 1;
    // this.positionArray[7] = 0;
    // this.positionArray[8] = 0;

    this.positionArray = new Float32Array([
      0,0,0,  //first vertex
      0,1,0,  //second vertex
      1,0,0   //third vertex
    ]);

    // Create 50 triangles (450 values)
    // this.count = 50;
    // this.positionArray = new Float32Array(this.count * 3 * 3);
    // for (let i = 0; i < this.count * 3 * 3; i++) {
    //   this.positionArray[i] = (Math.random() - 0.5) * 4;
    // }

    this.positionAttribute = new Three.BufferAttribute(this.positionArray, 3);
    this.geometry.setAttribute("position", this.positionAttribute);

    this.material = new Three.MeshBasicMaterial({
      color: "red",
      //side: Three.DoubleSide,
      wireframe: true,
    });
    this.bufferCube = new Three.Mesh(this.geometry, this.material);
    this.scene.add(this.bufferCube);
    this.orbitControls.enabled = true;
    this.camera.position.z = 5;
  }

  update() {}
}
