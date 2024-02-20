import * as Three from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Engine {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.init();
    this.render();
  }

  init() {  
    this.scene = new Three.Scene();
    this.camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new Three.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.resize();
    this.fullsize();
    this.controls();
    this.setup();
  }

  render() {
    this.update();
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }

  resize() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  fullsize() {
    window.addEventListener("dblclick", () => {
      const fullScreenElement =
        document.fullscreenElement || document.webkitFullScreenElement;
      if (!fullScreenElement) {
        if (this.canvas.requestFullscreen) {
          this.canvas.requestFullscreen();
        } else if (this.canvas.webkitRequestFullscreen) {
          this.canvas.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });
  }

  controls() {
    this.orbitControls = new OrbitControls(this.camera, this.canvas);
  }
}
