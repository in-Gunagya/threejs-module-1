import * as Three from 'three';
import Engine from '../core/engine';


export default class ParticleScene extends Engine{
  setup(){
    this.textureLoader = new Three.TextureLoader();
    this.starTexture = this.textureLoader.load('/texture/particles/11.png');
    this.roundTexture = this.textureLoader.load('/texture/particles/2.png');

    this.sphereParticleGeometry = new Three.SphereGeometry(1,32,32);
    this.sphereParticleMaterial = new Three.PointsMaterial();

    this.sphereParticleMaterial.size = 0.02;
    this.sphereParticleMaterial.sizeAttenuation = true;
    this.sphereParticleMaterial.color = new Three.Color('red')

    this.sphereParticle = new Three.Points(this.sphereParticleGeometry,this.sphereParticleMaterial);
    this.scene.add(this.sphereParticle);

    this.customParticleGeometry = new Three.BufferGeometry();
    this.count = 25000;
    this.positions = new Float32Array(this.count * 3);
    this.colors = new Float32Array(this.count * 3);
    for(let i=0; i<this.count*3; i++){
      this.positions[i] = (Math.random() - 0.5) * 10;
      this.colors[i] = Math.random();
    }
    this.customParticleGeometry.setAttribute('position', new Three.BufferAttribute(this.positions,3));
    this.customParticleGeometry.setAttribute('color', new Three.BufferAttribute(this.colors,3));
    this.customParticleMaterial = new Three.PointsMaterial();
    this.customParticleMaterial.size = 0.1;
    this.customParticleMaterial.sizeAttenuation = true;
    this.customParticleMaterial.transparent = true
    this.customParticleMaterial.alphaMap = this.starTexture
    // this.customParticleMaterial.alphaTest = 0.01
    // this.customParticleMaterial.depthTest = false
    this.customParticleMaterial.depthWrite = false
    this.customParticleMaterial.vertexColors = true

    this.customParticle = new Three.Points(this.customParticleGeometry,this.customParticleMaterial);
    this.scene.add(this.customParticle)

    this.camera.position.z = 3
    this.clock = new Three.Clock();
  }
  update(){
    this.elapsedTime = this.clock.getElapsedTime();
    // this.customParticle.rotation.y = this.elapsedTime * 0.2;
    for(let i = 0; i < this.count; i++)
    {
      this.i3 = i * 3
      this.x = this.customParticleGeometry.attributes.position.array[this.i3]
      this.customParticleGeometry.attributes.position.array[this.i3 + 1] = Math.sin(this.elapsedTime + this.x)
    }
    this.customParticleGeometry.attributes.position.needsUpdate = true 
  }
}