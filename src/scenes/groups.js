import * as Three from "three";
import gsap from "gsap";
import Engine from "../core/engine";

export default class GroupScene extends Engine {
  constructor({ canvas }) {
    super({ canvas });
  }
  setup() {
    this.group = new Three.Group();
    this.scene.add(this.group);
    this.group.rotation.reorder("YXZ");
    this.cube = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ color: "red", wireframe: true })
    );
    this.group.add(this.cube);

    this.cube1 = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ color: "green", wireframe: true })
    );
    this.cube1.position.x = -2;
    this.group.add(this.cube1);

    this.cube2 = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ color: "green", wireframe: true })
    );
    this.cube2.position.x = 2;
    this.group.add(this.cube2);

    this.cube3 = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ color: "yellow", wireframe: true })
    );
    this.cube3.position.y = 2;
    this.group.add(this.cube3);

    this.cube4 = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ color: "yellow", wireframe: true })
    );
    this.cube4.position.y = -2;
    this.group.add(this.cube4);

    this.camera.position.z = 10;

    gsap.to(this.cube.position, { duration: 2, delay: 1, z: +4 });
    gsap.to(this.cube1.position, { duration: 2, delay: 1, z: +3 });
    gsap.to(this.cube2.position, { duration: 2, delay: 1, z: +3 });
    gsap.to(this.cube3.position, { duration: 2, delay: 2, z: -3 });
    gsap.to(this.cube4.position, { duration: 2, delay: 2, z: -3 });

    this.clock = new Three.Clock();
  }

  update() {
    const elappesedTime = this.clock.elapsedTime;
    this.group.position.y = Math.sin(elappesedTime);
    this.group.position.x = Math.cos(elappesedTime);
    this.group.rotation.y += 0.1;
    this.cube.rotation.y += 0.1;
    this.cube.rotation.x += 0.1;
    this.cube.rotation.z += 0.1;
    this.cube1.rotation.y += 0.01;
    this.cube1.rotation.x += 0.1;
    this.cube2.rotation.y += 0.01;
    this.cube2.rotation.x += 0.1;
    this.cube3.rotation.y += 0.1;
    this.cube3.rotation.z += 0.1;
    this.cube4.rotation.y += 0.1;
    this.cube4.rotation.z += 0.1;
  }
}
