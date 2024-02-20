import * as Three from "three";
import Engine from "../core/engine";

export default class ControlScene extends Engine {
  setup() {
    //object
    this.cube = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ color: "red" })
    );
    this.scene.add(this.cube);

    // this.cursor = {
    //   x: 0,
    //   y: 0,
    // };

    // //custom controls
    // window.addEventListener("mousemove", (e) => {
    //   this.cursor.x = e.clientX / window.innerWidth - 0.5;
    //   this.cursor.y = -(e.clientY / window.innerHeight - 0.5);

    //   console.log(`x --> ${this.cursor.x} || ${this.cursor.y} <-- y`);
    // });

    //orbitControls
    this.orbitControls.enableDamping = true
    this.camera.position.z = 5;
  }

  update() {
    //orbit controls
    //custom controls
    // this.camera.position.x = Math.sin(this.cursor.x * Math.PI * 2) * 2
    // this.camera.position.z = Math.cos(this.cursor.x * Math.PI * 2) * 2
    // this.camera.position.y = this.cursor.y * 3
    // this.camera.lookAt(this.cube.position)
  }
}
