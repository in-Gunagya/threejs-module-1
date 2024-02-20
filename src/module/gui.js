import * as Three from "three";
import GUI from "lil-gui";
import gsap from "gsap";
import Engine from "../core/engine";

export default class GuiScene extends Engine {
  setup() {
    this.newColor = "#ff0000";
    this.cube = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ color: this.newColor })
    );
    this.scene.add(this.cube);
    this.gui = new GUI({title:'controls'});
    this.gui.close()
    this.cubeControls = this.gui.addFolder('Cube-Controls');
    this.cubeControls.close()

    this.cubeControls.add(this.cube.position, "x").min(-2).max(2).step(0.01);
    this.cubeControls.add(this.cube.position, "y").min(-2).max(2).step(0.01);
    this.cubeControls.add(this.cube.position, "z").min(-2).max(2).step(0.01);
    this.cubeControls.add(this.cube, "visible");
    this.cubeControls.add(this.cube.material, "wireframe");
    this.cubeControls.addColor(this.cube.material, "color").onChange((value) => {
      this.newColor = "#" + value.getHexString();
    });
    this.animations = {
      spin: () => {
        gsap.to(this.cube.rotation, {
          duration: 1,
          y: this.cube.rotation.y + Math.PI * 3,
        });
      },
    };
    this.cubeControls.add(this.animations, "spin");

    this.segments = {
      subdivision: 2,
    };
    this.cubeControls
      .add(this.segments, "subdivision")
      .min(1)
      .max(20)
      .step(1)
      .onFinishChange(() => {
        this.cube.geometry.dispose();
        this.cube.geometry = new Three.BoxGeometry(
          1,
          1,
          1,
          this.segments.subdivision,
          this.segments.subdivision,
          this.segments.subdivision
        );
      });

    this.camera.position.z = 10;
  }
  update() {}
}
