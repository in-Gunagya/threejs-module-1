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
    // this.orbitControls.enableDamping = true;
    this.orbitControls.maxPolarAngle = Math.PI * 0.49;
    this.orbitControls.maxDistance = 9;
    this.orbitControls.minDistance = 3;

  }

  lights(){
    this.ambientLight = new Three.AmbientLight('white',2);
    this.directionalLight = new Three.DirectionalLight('white', 10);
    this.directionalLight1 = new Three.DirectionalLight(0xffffff, 10);
    this.hemisphereLight = new Three.HemisphereLight('blue',"red",0.5);
    this.pointLight = new Three.PointLight('green',0,50);
    this.spotLight = new Three.SpotLight('blue',0,30,Math.PI*0.1,0.25,1);
  }
}
