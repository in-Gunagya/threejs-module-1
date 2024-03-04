import * as Three from "three";
import Engine from "../core/engine";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export default class Hidr8Scene2 extends Engine {
  setup() {
    this.clock = new Three.Clock();

    this.rgbeLoader = new RGBELoader();
    this.rgbeLoader.load("/Hidr8/sky.hdr", (env) => {
      env.mapping = Three.EquirectangularReflectionMapping;
      this.scene.background = env;
      this.scene.environment = env;
    });

    this.gltfLoader = new GLTFLoader();
    this.dracoloader = new DRACOLoader();
    this.dracoloader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    );
    this.gltfLoader.setDRACOLoader(this.dracoloader);
    this.gltfLoader.load("Hidr8/myAssembly7.glb", (bottle) => {
      this.bottleModel = bottle.scene;
      this.bottleModel.scale.set(4, 4, 4);

      const bbox = new Three.Box3().setFromObject(this.bottleModel);
      const center = bbox.getCenter(new Three.Vector3());
      this.bottleModel.position.sub(center);

      this.camera.position.set(0, 1.4, 5);

      this.scene.add(this.bottleModel);

      this.setupLights();

      this.applyMaterials();

      this.applyTextures();

      this.setupAnimations(bottle.animations);
    });
  }

  setupLights() {
    this.scene.add(this.ambientLight);

    // Add directional lights
    this.directionalLight.position.set(0, 7, 2);
    this.directionalLight.target = this.bottleModel;
    this.scene.add(this.directionalLight);

    this.directionalLight1.position.set(0, 1, 5);
    this.directionalLight1.target = this.bottleModel;
    this.scene.add(this.directionalLight1);
  }

  applyMaterials() {
    this.bottleModel.traverse((child) => {
      if (child.isMesh) {
        const material = child.material;
        if (material) {
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
  }

  applyTextures() {
    const textureLoader = new Three.TextureLoader();
    const texture = textureLoader.load(
      "/texture/Other/8x8_checkered_board_.svg.png"
    );
    let count = 0;
    this.bottleModel.traverse((child) => {
      if (count >= 5) return;
      if (child.isMesh) {
        const material = child.material;
        count++;
        if (material) {
          if (
            child.name === "Infuser_(1)" ||
            child.name === "Hidr8" ||
            child.name === "pcb"
          ) {
          } else {
            material.map = texture;
            texture.colorSpace = Three.SRGBColorSpace;
            texture.minFilter = Three.NearestFilter;
            texture.magFilter = Three.NearestFilter;
            texture.generateMipmaps = false;
          }
        }
      }
    });
  }

  setupAnimations(animations) {
    if (!animations || animations.length === 0) {
      console.error("No animations found in GLTF file.");
      return;
    }

    this.animations = new Three.AnimationMixer(this.bottleModel);
    const clipNames = [
      "bottom (1)Action",
      "topAnimation",
      "middleAnimation",
      "infuserAnimation",
      "hidr8Animation",
      "pcbAnimation",
    ];
    clipNames.forEach((clipName) => {
      const clip = Three.AnimationClip.findByName(animations, clipName);
      if (clip) {
        const action = this.animations.clipAction(clip);
        action.play();
      } else {
        console.error("Animation clip not found:", clipName);
      }
    });
  }

  update() {
    const delta = this.clock.getDelta();
    if (this.animations) {
      this.animations.update(delta);
    }
  }
}
