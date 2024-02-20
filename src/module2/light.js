import * as Three from 'three';
import Engine from '../core/engine';

export default class LightScene extends Engine{
  setup(){
    //Texture
    this.textureLoader = new Three.TextureLoader();
    this.commonTexture = this.textureLoader.load(
      "/texture/Other/8x8_checkered_board_.svg.png"
    );
    this.commonTexture.colorSpace = Three.SRGBColorSpace;
    this.commonTexture.minFilter = Three.NearestFilter;


    this.plane = new Three.Mesh(new Three.PlaneGeometry(10,10),new Three.MeshStandardMaterial({side:Three.DoubleSide}))
    this.plane.rotation.x = Math.PI * 0.5;
    this.scene.add(this.plane);

    this.sphere = new Three.Mesh(new Three.SphereGeometry(1, 32, 16),new Three.MeshStandardMaterial({map:this.commonTexture}))
    this.sphere.position.y = 3
    this.scene.add(this.sphere)
    this.camera.position.set(0,3,7)

    this.ambientLight = new Three.AmbientLight(0x404040,1);
    this.scene.add(this.ambientLight);

    this.directionalLight = new Three.DirectionalLight('white',5);
    this.scene.add(this.directionalLight);
    this.directionalLight.position.set(5,5,0)
    this.directionalLight.target = this.sphere

    //direction Heper
    this.directionalHelper = new Three.DirectionalLightHelper(this.directionalLight,1);
    this.scene.add(this.directionalHelper)
    
  }
  update(){
    this.sphere.rotation.y += 0.02
  }
}