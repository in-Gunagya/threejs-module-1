import * as Three from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Engine from "../core/engine";

export default class ThreeDTextScene extends Engine {
  setup() {
    this.torusArray = [];
    //Background
    this.rgbeLoader = new RGBELoader();
    this.rgbeLoader.load("/texture/Environment/img1.hdr", (env) => {
      env.mapping = Three.EquirectangularReflectionMapping;
      this.scene.background = env;
      this.scene.environment = env;
    });

    //Texture
    this.textureLoader = new Three.TextureLoader();
    this.commonTexture = this.textureLoader.load(
      "/texture/Other/8x8_checkered_board_.svg.png"
    );
    this.commonTexture.colorSpace = Three.SRGBColorSpace;
    this.commonTexture.minFilter = Three.NearestFilter;

    //torusGeometry
    this.torus = new Three.Mesh(
      new Three.TorusGeometry(0.8, 0.2, 16, 32),
      new Three.MeshBasicMaterial({})
    );
    this.torus.material.map = this.commonTexture;
    this.torus.position.z = -2;
    this.torus.position.y = 1.4;
    this.scene.add(this.torus);


    const randomPosition = () => {
      var x = Math.random() * 200 - 100;
      return x;
    };
    this.tempGeometry = new Three.TorusGeometry(0.8, 0.2, 16, 32)
    this.tempMaterial = new Three.MeshBasicMaterial({map:this.commonTexture})
    for (let i = 0; i < 100; i++) {
      let randomScale = Math.random() * 20;
      this.newTorus = new Three.Mesh(this.tempGeometry,this.tempMaterial)
      this.newTorus.position.set(
        randomPosition(),
        randomPosition(),
        randomPosition()
      );
      this.newTorus.scale.set(randomScale, randomScale, randomScale);
      this.torusArray.push(this.newTorus);
      this.scene.add(this.newTorus);
    }

    //boxGeometry
    this.box = new Three.Mesh(
      new Three.BoxGeometry(0.5, 0.5, 0.5),
      new Three.MeshBasicMaterial({ map: this.commonTexture })
    );
    this.box.position.y = 1.5;
    this.box.position.z = -2;
    this.scene.add(this.box);

    //Fonts
    this.fontLoader = new FontLoader();
    this.fontLoader.load("/fonts/sobear.json", (sobear) => {
      this.textGeometry = new TextGeometry("Jai Shree Ram", {
        font: sobear,
        height: 0.2,
        size: 0.5,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSegments: 5,
        bevelSize: 0.02,
        bevelOffset: 0,
      });
      // this.textGeometry.computeBoundingBox()
      // this.textGeometry.translate(
      //   -this.textGeometry.boundingBox.max.x * 0.5,
      //   -this.textGeometry.boundingBox.max.y * 0.5,
      //   -this.textGeometry.boundingBox.max.z * 0.5,
      // )
      // this.textGeometry.computeBoundingBox()

      this.textGeometry.center();

      this.textMaterial = new Three.MeshNormalMaterial({ wireframe: false });
      this.text = new Three.Mesh(this.textGeometry, this.textMaterial);
      this.scene.add(this.text);
    });

    this.camera.position.set(0, 1.5, 5);
  }
  update() {
    this.box.rotation.y += 0.02;
    this.torus.rotation.z += 0.02;
    this.torusArray.forEach((torus) => {
      torus.rotation.z += Math.random() * 0.25;
    });
  }
}
