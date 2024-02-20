import * as Three from 'three';
import Engine from '../core/engine';
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper'

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

    //ambient light
    this.ambientLight = new Three.AmbientLight(0x404040,1);
    // this.scene.add(this.ambientLight);

    //directional light
    this.directionalLight = new Three.DirectionalLight('white',5);
    this.scene.add(this.directionalLight);
    this.directionalLight.position.set(5,5,0)
    this.directionalLight.target = this.sphere

    //direction helper
    this.directionalHelper = new Three.DirectionalLightHelper(this.directionalLight,1);
    this.scene.add(this.directionalHelper)

    //hemisphere light
    this.hemisphereLight = new Three.HemisphereLight('skyblue',5);
    this.scene.add(this.hemisphereLight)
    this.hemisphereLight.position.set(0,6,0)

    //hemisphere helper
    this.hemisphereHelper = new Three.HemisphereLightHelper(this.hemisphereLight,1,'red');
    this.scene.add(this.hemisphereHelper)

    //point light
    this.pointLight = new Three.PointLight('yellow',25)
    this.scene.add(this.pointLight);
    this.pointLight.position.set(-5,5,0);

    //pointlight helper
    this.pointHelper = new Three.PointLightHelper(this.pointLight,1);
    this.scene.add(this.pointHelper);

    //rectArea light
    this.rectAreaLight = new Three.RectAreaLight('blue',20,5,5);
    this.scene.add(this.rectAreaLight)
    this.rectAreaLight.position.set(0,3,5)

    //rectArea Helper
    this.rectAreaHelper = new RectAreaLightHelper(this.rectAreaLight,'white')
    this.scene.add(this.rectAreaHelper);

    //spot light
    this.spotLight = new Three.SpotLight('green',20);
    this.scene.add(this.spotLight);
    this.spotLight.position.set(0,4,-15)

    //spotlight helper
    this.spotHelper = new Three.SpotLightHelper(this.spotLight,'white')
    this.scene.add(this.spotHelper)

    this.camera.position.set(0,7,12)
  }
  update(){
    this.sphere.rotation.y += 0.02
  }
}