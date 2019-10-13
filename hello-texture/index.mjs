import * as THREE from '../lib/three.module.js';
import { trianglePattern, palettes } from './pattern.mjs';

class HelloTexture {

  constructor(canvas) {
    this.setSize = this.setSize.bind(this);
    this.animLoop = this.animLoop.bind(this);
    this.canvas = canvas || document.querySelector('canvas');
        
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });;
  }

  setSize() {
    const { renderer, canvas, camera } = this;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  animLoop(t = 0) {
    const { scene, renderer, camera } = this;
    this.mesh.rotation.x += .01;
    this.mesh.rotation.y += .01;    
    renderer.render(scene, camera);
    requestAnimationFrame(this.animLoop)
  }

  async setup() {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.setSize();
    window.addEventListener('resize', this.setSize);


    const ambientLight = new THREE.AmbientLight(0x101010);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 6, 20);

    this.scene.add(ambientLight);
    this.scene.add(dirLight);
    const loadingManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadingManager);
    const materials = [
      new THREE.MeshPhongMaterial({map: loader.load(trianglePattern(palettes.pink))}),
      new THREE.MeshPhongMaterial({map: loader.load(trianglePattern(palettes.autumn))}),
      new THREE.MeshPhongMaterial({map: loader.load(trianglePattern(palettes.sunrise))}),
      new THREE.MeshPhongMaterial({map: loader.load(trianglePattern(palettes.sea))}),
      new THREE.MeshPhongMaterial({map: loader.load(trianglePattern(palettes.warmcold))}),
      new THREE.MeshPhongMaterial({map: loader.load(trianglePattern(palettes.skyblue))})
    ];

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    this.mesh = new THREE.Mesh(geometry, materials);
    this.scene.add(this.mesh);
    this.animLoop();
  }
}


const app = new HelloTexture();
app.setup();
