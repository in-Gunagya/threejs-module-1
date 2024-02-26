import * as Three from "three";
import Engine from "../core/engine";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'


export default class Hidr8Scene extends Engine {
  setup() {
    // this.scene.background = new Three.Color("grey");
    this.rgbeLoader = new RGBELoader();
    this.rgbeLoader.load("/texture/Environment/img1.hdr", (env) => {
      env.mapping = Three.EquirectangularRefractionMapping;
      this.scene.background = env;
      this.scene.environment = env;
    });
    this.animations = null;
    this.clock = new Three.Clock();

    this.floor = new Three.Mesh(new Three.PlaneGeometry(10,10),new Three.MeshStandardMaterial({color:'red'}));
    this.floor.rotation.x = - Math.PI * 0.5
    this.scene.add(this.floor);

    this.scene.add(this.ambientLight);

    // Load GLTF model
    this.gltfLoader = new GLTFLoader();
    this.dracoloader = new DRACOLoader();
    this.dracoloader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    this.gltfLoader.setDRACOLoader(this.dracoloader);
    this.gltfLoader.load("Hidr8/myAssembly7.glb", (bottle) => {
      this.bottleModel = bottle.scene;
      this.bottleModel.position.set(0, -0.1, 0);
      this.bottleModel.scale.set(10, 10, 10);
      this.scene.add(this.bottleModel);

      // Set up lights
      this.directionalLight.position.set(0, 5, 0);
      this.directionalLight1.position.set(0, 0, 5);
      this.directionalLight.target = this.bottleModel;
      this.directionalLight1.target = this.bottleModel;
      // this.scene.add(this.directionalLight);
      // this.scene.add(this.directionalLight1);

      // Initialize animation mixer
      this.animations = new Three.AnimationMixer(this.bottleModel);
      const clips = bottle.animations;
      
      // Array to hold all animation actions
      const actions = [];

      // Get animation clips
      const clipNames = [
        "bottom (1)Action",
        "topAnimation",
        "middleAnimation",
        "infuserAnimation",
        "hidr8Animation",
        "pcbAnimation"
      ];

      // Create and play animation actions for each clip
      clipNames.forEach((clipName) => {
        const clip = Three.AnimationClip.findByName(clips, clipName);
        if (clip) {
          const action = this.animations.clipAction(clip);
          actions.push(action);
          action.play();
        } else {
          console.error("Animation clip not found:", clipName);
        }
      });

      this.camera.position.set(0,5,15)
      this.camera.lookAt(this.bottleModel.position)
    });
  }

  update() {
    const delta = this.clock.getDelta();
    if (this.animations) {
      this.animations.update(delta);
    }
    console.log(this.camera.position);
  }
}

