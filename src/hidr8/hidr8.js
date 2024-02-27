import * as Three from "three";
import Engine from "../core/engine";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export default class Hidr8Scene extends Engine {
  setup() {
    this.rgbeLoader = new RGBELoader();
    this.rgbeLoader.load("/texture/Environment/img1.hdr", (env) => {
      env.mapping = Three.EquirectangularReflectionMapping;
      this.scene.background = env;
      this.scene.environment = env;
    });
    this.animations = null;
    this.clock = new Three.Clock();

    this.scene.add(this.ambientLight);

    // Load GLTF model
    this.gltfLoader = new GLTFLoader();
    this.dracoloader = new DRACOLoader();
    this.dracoloader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    );
    this.gltfLoader.setDRACOLoader(this.dracoloader);
    this.gltfLoader.load("Hidr8/myAssembly7.glb", (bottle) => {
      this.bottleModel = bottle.scene;
      this.bottleModel.scale.set(4,4,4)
      this.directionalLight.position.set(0, 7, 2);
      this.directionalLight.target = this.bottleModel;
      this.scene.add(this.directionalLight);
      this.directionalLight1.position.set(0, 1, 5);
      this.directionalLight1.target = this.bottleModel;
      this.scene.add(this.directionalLight1);

      this.bottleModel.traverse((child) => {
        if (child.isMesh) {
          const material = child.material;
          if (material) {
            // Check if the mesh belongs to the "infuser" part
            if (child.name === "Infuser_(1)" || child.name === "Hidr8") {
              const infuserMaterial = new Three.MeshStandardMaterial({
                color: material.color,
                metalness: material.metalness,
                roughness: material.roughness,
              });
              child.material = infuserMaterial;
            } else {
              material.metalness = 1;
              material.roughness = 0.4;
              material.flatShading = true;
            }
          }
        }
      });

      const textureLoader = new Three.TextureLoader();
      const texture = textureLoader.load("/texture/Other/8x8_checkered_board_.svg.png");
      let count = 0;
      this.bottleModel.traverse((child) => {
        if(count >= 5) return;
        if (child.isMesh) {
          const material = child.material;
          count++;
          if (material) {
            if (child.name === "Infuser_(1)" || child.name === "Hidr8" || child.name === "pcb") {
               
            }
            else{
              material.map = texture;
            texture.colorSpace = Three.SRGBColorSpace;
            texture.minFilter = Three.NearestFilter;
            texture.migFilter = Three.NearestFilter;
            texture.generateMipmaps = false
            }
          }
        }
      });

      // animations section
      this.animations = new Three.AnimationMixer(this.bottleModel);
      const clips = bottle.animations;
      const actions = [];
      const clipNames = [
        "bottom (1)Action",
        "topAnimation",
        "middleAnimation",
        "infuserAnimation",
        "hidr8Animation",
        "pcbAnimation",
      ];
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

      this.scene.add(this.bottleModel);
      this.camera.position.set(0,5,7)
      this.camera.lookAt(this.bottleModel)
    });
  }

  update() {
    const delta = this.clock.getDelta();
    if (this.animations) {
      this.animations.update(delta);
    }
  }
}
