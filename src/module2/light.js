import * as Three from 'three';
import Engine from '../core/engine';
import GUI from 'lil-gui'
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper'

export default class LightScene extends Engine{
  setup(){

    this.gui = new GUI();
    //Texture
    this.textureLoader = new Three.TextureLoader();
    this.commonTexture = this.textureLoader.load(
      "/texture/Other/8x8_checkered_board_.svg.png"
    );
    this.commonTexture.colorSpace = Three.SRGBColorSpace;
    this.commonTexture.minFilter = Three.NearestFilter;
    
    this.plane = new Three.Mesh(new Three.PlaneGeometry(10,10),new Three.MeshStandardMaterial({map:this.commonTexture,side:Three.DoubleSide}));
    this.plane.rotation.x = Math.PI * 0.5;
    this.scene.add(this.plane);

    this.sphere = new Three.Mesh(new Three.SphereGeometry(1, 32, 16),new Three.MeshStandardMaterial({map:this.commonTexture}));
    this.sphere.material.roughness = 0
    this.sphere.position.y = 3;
    this.scene.add(this.sphere);

    //ambient light
    this.ambientLight = new Three.AmbientLight(0xffffff,1);
    this.scene.add(this.ambientLight);
    this.gui.add(this.ambientLight,'intensity').min(0).max(3).step(0.01).name("ambientLight");

    //directional light
    this.directionalLight = new Three.DirectionalLight('white',0);
    this.scene.add(this.directionalLight);
    this.directionalLight.position.set(5,5,0);
    this.directionalLight.target = this.sphere;
    this.gui.add(this.directionalLight,'intensity').min(0).max(15).step(0.01).name("directionalLight");

    //direction helper
    this.directionalHelper = new Three.DirectionalLightHelper(this.directionalLight,1);
    this.scene.add(this.directionalHelper);

    //hemisphere light
    this.hemisphereLight = new Three.HemisphereLight('blue',"red",0);
    this.scene.add(this.hemisphereLight);
    this.hemisphereLight.position.set(0,6,0);
    this.gui.add(this.hemisphereLight, 'intensity').min(0).max(15).step(0.01).name("hemisphereLight");

    //hemisphere helper
    this.hemisphereHelper = new Three.HemisphereLightHelper(this.hemisphereLight,1,'red');
    this.scene.add(this.hemisphereHelper);

    //point light
    this.pointLight = new Three.PointLight('yellow',0);
    this.scene.add(this.pointLight);
    this.pointLight.position.set(-5,5,0);
    this.gui.add(this.pointLight, 'intensity').min(0).max(20).step(1).name("pointLight");

    //pointlight helper
    this.pointHelper = new Three.PointLightHelper(this.pointLight,1);
    this.scene.add(this.pointHelper);

    //rectArea light
    this.rectAreaLight = new Three.RectAreaLight('blue',0,5,5);
    this.scene.add(this.rectAreaLight);
    this.rectAreaLight.position.set(0,3,5);
    this.gui.add(this.rectAreaLight, 'intensity').min(0).max(20).step(1).name("rectAreaLight");


    //rectArea Helper
    this.rectAreaHelper = new RectAreaLightHelper(this.rectAreaLight,'white');
    this.scene.add(this.rectAreaHelper);

    //spot light
    this.spotLight = new Three.SpotLight('green',0);
    this.scene.add(this.spotLight);
    this.spotLight.position.set(0,4,-15);
    this.spotLight.target = this.sphere
    this.gui.add(this.spotLight, 'intensity').min(0).max(200).step(1).name("spotLight");


    //spotlight helper
    this.spotHelper = new Three.SpotLightHelper(this.spotLight,'white');
    this.scene.add(this.spotHelper);

    this.camera.position.set(0,7,12);
  }
  update(){
    this.sphere.rotation.y += 0.02;
  }
}