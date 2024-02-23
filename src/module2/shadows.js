import * as Three from 'three'
import Engine from '../core/engine';
import GUI from 'lil-gui';


export default class ShadowScene extends Engine{
  setup(){
    this.gui = new GUI();

    this.textureLoader = new Three.TextureLoader();
    this.commonTexture = this.textureLoader.load(
      "/texture/Other/8x8_checkered_board_.svg.png"
    );

    this.plane = new Three.Mesh(new Three.PlaneGeometry(10,10),new Three.MeshStandardMaterial({color:new Three.Color('white'),side:Three.DoubleSide}));
    this.plane.rotation.x = Math.PI * 0.5;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);

    this.sphere = new Three.Mesh(new Three.SphereGeometry(1,32,16),new Three.MeshStandardMaterial({color:new Three.Color('white')}));
    this.sphere.position.set(-2,3,3);
    this.sphere.receiveShadow = true;
    this.sphere.castShadow = true;
    this.scene.add(this.sphere);

    this.sphere2 = new Three.Mesh(new Three.SphereGeometry(1,32,16),new Three.MeshStandardMaterial({map:this.commonTexture}));
    this.sphere2.position.set(2,3,-3);
    this.sphere2.receiveShadow = true;
    this.sphere2.castShadow = true;
    this.scene.add(this.sphere2);
    
    //ambientLight
    this.scene.add(this.ambientLight);
    this.gui.add(this.ambientLight,'intensity').min(0).max(3).step(0.01).name("ambientLight");

    //directionalLight
    this.directionalLight.position.set(-1.5,5,5)
    this.directionalLight.target = this.sphere;
    
    //implemet shadow with directionali light
    this.directionalLight.castShadow = true
    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;
    this.directionalLight.shadow.camera.top = 2;
    this.directionalLight.shadow.camera.right = 2;
    this.directionalLight.shadow.camera.bottom = -2;
    this.directionalLight.shadow.camera.left = -2;
    this.directionalLight.shadow.camera.near = 1;
    this.directionalLight.shadow.camera.far = 12;

    //add blur   
    //it doesn't work with PCFSoftShadowMap
    this.directionalLight.shadow.radius = 20;

    this.directionalLightCameraHelper = new Three.CameraHelper(this.directionalLight.shadow.camera);
    // this.directionalLightCameraHelper.visible = false;
    this.scene.add(this.directionalLightCameraHelper);

    this.scene.add(this.directionalLight);
    this.gui.add(this.directionalLight,'intensity').min(0).max(15).step(0.01).name("directionalLight");

    this.spotLight.position.set(4,9,-4);
    this.spotLight.target = this.sphere2;
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.spotLight.shadow.camera.near = 1;
    this.spotLight.shadow.camera.far = 10;

    this.spotLight.shadow.radius =10;

    this.spotLightCameraHelper = new Three.CameraHelper(this.spotLight.shadow.camera);
    this.scene.add(this.spotLightCameraHelper);

    this.scene.add(this.spotLight)
    this.gui.add(this.spotLight,'intensity').min(0).max(15).step(0.01).name("spotLight");
    this.camera.position.set(0,5,10)
  }
  update(){
    this.sphere2.rotation.x += 0.01
  }
}