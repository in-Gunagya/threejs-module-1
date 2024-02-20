import * as Three from 'three';
import Engine from '../core/engine';

export default class UvunwrappingScene extends Engine{

  setup(){
    this.textureLoader = new Three.TextureLoader();
    this.reapeatTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_basecolor.jpg');
    this.reapeatTexture.colorSpace = Three.SRGBColorSpace;
    //repeat texture
    this.reapeatTexture.repeat.x = 2
    this.reapeatTexture.repeat.y = 3

    //RepeatingWrapping
    this.reapeatTexture.wrapS = Three.RepeatWrapping
    this.reapeatTexture.wrapT = Three.RepeatWrapping

    //MirrorRepeatingWrapping
    this.reapeatTexture.wrapS = Three.MirroredRepeatWrapping
    this.reapeatTexture.wrapT = Three.MirroredRepeatWrapping

    this.cube = new Three.Mesh(new Three.BoxGeometry(1,1,1),new Three.MeshBasicMaterial({map:this.reapeatTexture}));
    this.scene.add(this.cube);


    this.offsetTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_basecolor.jpg');
    this.offsetTexture.colorSpace = Three.SRGBColorSpace;
    this.offsetTexture.offset.x = 0.4
    this.offsetTexture.offset.y = 0.4

    this.cube2 = new Three.Mesh(new Three.BoxGeometry(1,1,1),new Three.MeshBasicMaterial({map:this.offsetTexture}));
    this.cube2.position.y = 1.5
    this.scene.add(this.cube2);

    this.rotateTexture = this.textureLoader.load('/texture/Door/Door_Wood_001_basecolor.jpg');
    this.rotateTexture.colorSpace = Three.SRGBColorSpace;
    this.rotateTexture.rotation = Math.PI * 0.25
    this.rotateTexture.center.x = 0.5;
    this.rotateTexture.center.y = 0.5;

    this.cube3 = new Three.Mesh(new Three.BoxGeometry(1,1,1),new Three.MeshBasicMaterial({map:this.rotateTexture}));
    this.cube3.position.x = -2
    this.scene.add(this.cube3);


    this.minificationTexture = this.textureLoader.load('/texture/Other/8x8_checkered_board_.svg.png');
    this.minificationTexture.colorSpace = Three.SRGBColorSpace;
    this.minificationTexture.minFilter = Three.NearestFilter

    this.cube4 = new Three.Mesh(new Three.BoxGeometry(1,1,1),new Three.MeshBasicMaterial({map:this.minificationTexture}));
    this.cube4.position.x = 2
    this.scene.add(this.cube4);


    this.camera.position.set(0,1.5,4)
  }

  update(){

    this.cube.rotation.y += 0.02
    this.cube2.rotation.z += 0.02
    this.cube4.rotation.x += 0.02
    this.cube3.rotation.x -= 0.02
  }
} 