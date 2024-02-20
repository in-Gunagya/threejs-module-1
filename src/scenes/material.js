import * as Three from "three";
import Engine from "../core/engine";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export default class MaterailScene extends Engine {
  setup() {
    this.gui = new GUI();

    this.textureLoader = new Three.TextureLoader();
    this.colorTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_basecolor.jpg');
    this.colorTexture.colorSpace = Three.SRGBColorSpace;
    this.ambientTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_ambientOcclusion.jpg');
    this.ambientTexture.colorSpace = Three.SRGBColorSpace;
    this.heightTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_height.png');
    this.heightTexture.colorSpace = Three.SRGBColorSpace;
    this.metalTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_metallic.jpg');
    this.metalTexture.colorSpace = Three.SRGBColorSpace;
    this.roughTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_roughness.jpg');
    this.roughTexture.colorSpace = Three.SRGBColorSpace;
    this.normalTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_normal.jpg');
    this.normalTexture.colorSpace = Three.SRGBColorSpace;

    this.commonTexture = this.textureLoader.load(
      "/texture/Other/8x8_checkered_board_.svg.png"
    );
    this.commonTexture.minFilter = Three.NearestFilter;
    this.matcapTexture = this.textureLoader.load('/texture/Matcaps/metcaps1.jpg');

    this.rgebLoader = new RGBELoader();
    this.rgebLoader.load("/texture/Environment/img1.hdr", (rgebTexture) => {
      rgebTexture.mapping = Three.EquirectangularReflectionMapping;
      this.scene.background = rgebTexture;
      this.scene.environment = rgebTexture;
    });

    //Basic Material
    this.basicMaterial = new Three.MeshBasicMaterial({});
    // this.basicMaterial.map = this.commonTexture;
    // this.basicMaterial.wireframe = true;
    // this.basicMaterial.side = Three.DoubleSide;
    // this.basicMaterial.color = new Three.Color("red");
    // this.basicMaterial.transparent = true;
    // this.basicMaterial.opacity = 0.8

    //Normal Material
    this.normalMaterial = new Three.MeshNormalMaterial({});
    // this.normalMaterial.wireframe = true;
    // this.normalMaterial.side = Three.BackSide;
    // this.normalMaterial.transparent = true;
    // this.normalMaterial.opacity = 1
    // this.normalMaterial.flatShading = true;

    //Matcap Material
    this.matcapMaterial = new Three.MeshMatcapMaterial({});
    // this.matcapMaterial.matcap = this.matcapTexture;
    // this.matcapMaterial.wireframe = true;
    // this.matcapMaterial.side = Three.DoubleSide;
    // this.matcapMaterial.transparent = true;
    // this.matcapMaterial.opacity = 1
    // this.matcapMaterial.flatShading = true;

    //Standard Material
    this.standardMaterial = new Three.MeshStandardMaterial({});
    // this.standardMaterial.map = this.commonTexture;
    // this.standardMaterial.metalness = 1;
    // this.standardMaterial.roughness = 0.5

    // this.gui.add(this.standardMaterial, "metalness").min(0).max(1).step(0.0001)
    // this.gui.add(this.standardMaterial, "roughness").min(0).max(1).step(0.0001)

    //Mesh Physical Material
    this.meshPhysicsMaterial = new Three.MeshPhysicalMaterial({})
    this.meshPhysicsMaterial.map = this.colorTexture
    this.meshPhysicsMaterial.side = Three.DoubleSide
    this.meshPhysicsMaterial.metalness = 1;
    this.meshPhysicsMaterial.roughness = 1
    this.meshPhysicsMaterial.aoMap = this.ambientTexture;
    this.meshPhysicsMaterial.aoMapIntensity = 1;
    this.meshPhysicsMaterial.displacementMap = this.heightTexture;
    this.meshPhysicsMaterial.displacementScale = 0.1;
    this.meshPhysicsMaterial.metalnessMap = this.metalTexture;
    this.meshPhysicsMaterial.roughnessMap = this.roughTexture;
    this.meshPhysicsMaterial.normalMap = this.normalTexture;
    this.meshPhysicsMaterial.normalScale.set(0.5,0.5)
    this.meshPhysicsMaterial.clearcoat = 1;
    this.meshPhysicsMaterial.clearcoatRoughness = 0;
    this.meshPhysicsMaterial.sheen = 1;
    this.meshPhysicsMaterial.sheenRoughness = 0.25;
    this.meshPhysicsMaterial.sheenColor.set(1,1,1);
    this.meshPhysicsMaterial.iridescence = 1;
    this.meshPhysicsMaterial.iridescenceIOR = 1;
    this.meshPhysicsMaterial.iridescenceThicknessRange = [ 100, 800 ];
    this.meshPhysicsMaterial.transmission = 1;
    this.meshPhysicsMaterial.ior = 1.5;
    this.meshPhysicsMaterial.thickness = 0.5;
    
    this.gui.add(this.meshPhysicsMaterial, "metalness").min(0).max(1).step(0.0001);
    this.gui.add(this.meshPhysicsMaterial, "roughness").min(0).max(1).step(0.0001);
    this.gui.add(this.meshPhysicsMaterial, "clearcoat").min(0).max(1).step(0.0001);
    this.gui.add(this.meshPhysicsMaterial, "clearcoatRoughness").min(0).max(1).step(0.0001);
    this.gui.add(this.meshPhysicsMaterial, "sheen").min(0).max(1).step(0.0001);
    this.gui.add(this.meshPhysicsMaterial, "sheenRoughness").min(0).max(1).step(0.0001);
    this.gui.addColor(this.meshPhysicsMaterial, "sheenColor");
    this.gui.add(this.meshPhysicsMaterial, 'iridescence').min(0).max(1).step(0.0001);
    this.gui.add(this.meshPhysicsMaterial, 'iridescenceIOR').min(1).max(2.333).step(0.0001);
    this.gui.add(this.meshPhysicsMaterial.iridescenceThicknessRange, '0').min(1).max(1000).step(1);
    this.gui.add(this.meshPhysicsMaterial.iridescenceThicknessRange, '1').min(1).max(1000).step(1);
    this.gui.add(this.meshPhysicsMaterial, 'transmission').min(0).max(1).step(0.0001);
    this.gui.add(this.meshPhysicsMaterial, 'ior').min(1).max(10).step(0.0001);
    this.gui.add(this.meshPhysicsMaterial, 'thickness').min(0).max(1).step(0.0001);

    this.group = new Three.Group();
    this.scene.add(this.group);

    this.cube = new Three.Mesh(
      new Three.SphereGeometry(1, 32, 32),
      this.meshPhysicsMaterial
    );
    this.cube.position.x = -2;
    this.group.add(this.cube);

    this.cube2 = new Three.Mesh(new Three.PlaneGeometry(1, 1), this.meshPhysicsMaterial);
    this.group.add(this.cube2);

    this.cube3 = new Three.Mesh(
      new Three.TorusGeometry(0.6, 0.2, 32, 32),
      this.meshPhysicsMaterial
    );
    this.cube3.position.x = 2;
    this.group.add(this.cube3);

    this.camera.position.z = 5;
  }

  update() {
    this.group.rotation.y += 0.002;
    this.cube.rotation.x += 0.01
    this.cube2.rotation.x += 0.01
    this.cube3.rotation.x -= 0.01
  }
}
