import * as Three from "three";
import Engine from "../core/engine";

export default class TextureScene extends Engine {
  setup() {
    //that is actual approach of texture loader

    // this.image = new Image();
    // this.texture = new Three.Texture(this.image);
    // this.texture.colorSpace = Three.SRGBColorSpace;
    // this.image.addEventListener("load", () => {
    //   this.texture.needsUpdate = true;
    // });
    // this.image.src = "/texture/Door/Door_Wood_001_basecolor.jpg";

    this.loadingManager = new Three.LoadingManager
    this.loadingManager.onStart = () => {
      console.log("onStart");
    }
    this.loadingManager.onLoad = () => {
      console.log("onLoad");
    }
    this.loadingManager.onProgress = () => {
      console.log("onProgress");
    }
    this.loadingManager.onError = () => {
      console.log("onError");
    }

    this.textureLoader = new Three.TextureLoader(this.loadingManager);

    this.colorTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_basecolor.jpg');
    this.colorTexture.colorSpace = Three.SRGBColorSpace;
    this.opacityTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_opacity.jpg');
    this.opacityTexture.colorSpace = Three.SRGBColorSpace;
    this.heightTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_height.png');
    this.heightTexture.colorSpace = Three.SRGBColorSpace;
    this.normalTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_normal.jpg');
    this.normalTexture.colorSpace = Three.SRGBColorSpace;
    this.ambientTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_ambientOcclusion.jpg');
    this.ambientTexture.colorSpace = Three.SRGBColorSpace;
    this.metalTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_metallic.jpg');
    this.metalTexture.colorSpace = Three.SRGBColorSpace;
    this.roughTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_roughness.jpg');
    this.roughTexture.colorSpace = Three.SRGBColorSpace;


    this.cubeGroup = new Three.Group()
    this.scene.add(this.cubeGroup)
    this.scene.background = new Three.Color('red')

    this.cube = new Three.Mesh(
      new Three.SphereGeometry( 1, 32,32),
      new Three.MeshBasicMaterial({ map: this.colorTexture })
    );
    this.cubeGroup.add(this.cube);

    this.cube2 = new Three.Mesh(
      new Three.ConeGeometry(1, 1, 32),
      new Three.MeshBasicMaterial({ map: this.opacityTexture })
    );
    this.cube2.position.x = -2
    this.cubeGroup.add(this.cube2);

    this.cube3 = new Three.Mesh(
      new Three.TorusGeometry(0.1, 0.35, 32,100),
      new Three.MeshBasicMaterial({ map: this.heightTexture })
    );
    this.cube3.position.x = 2
    this.cubeGroup.add(this.cube3);
    
    this.cube4 = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ map: this.normalTexture })
    );
    this.cube4.position.y = 2
    this.cubeGroup.add(this.cube4);

    this.cube5 = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ map: this.ambientTexture })
    );
    this.cube5.position.y = -2
    this.cubeGroup.add(this.cube5);

    this.cube6 = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ map: this.metalTexture })
    );
    this.cube6.position.set(-2,-2,0)
    this.cubeGroup.add(this.cube6);

    this.cube7 = new Three.Mesh(
      new Three.BoxGeometry(1, 1, 1),
      new Three.MeshBasicMaterial({ map: this.roughTexture })
    );
    this.cube7.position.set(2,2,0)
    this.cubeGroup.add(this.cube7);

    this.orbitControls.enableDamping = true;
    this.camera.position.z = 6.6;
  }

  update() {
    this.cubeGroup.rotation.y += 0.01
    this.cubeGroup.rotation.x += 0.01
    this.cubeGroup.rotation.z += 0.000001
  }
}
