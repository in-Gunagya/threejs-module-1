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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = Three.PCFSoftShadowMap;
    this.resize();
    this.fullsize();
    this.controls();
    this.lights()
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

  lights(){
    this.ambientLight = new Three.AmbientLight('white',0);
    this.directionalLight = new Three.DirectionalLight('yellow',0.03);
    this.hemisphereLight = new Three.HemisphereLight('blue',"red",0.5);
    this.pointLight = new Three.PointLight('green',0,50);
    this.spotLight = new Three.SpotLight('blue',0,30,Math.PI*0.1,0.25,1);
  }
}
