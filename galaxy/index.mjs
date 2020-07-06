import * as THREE from "../lib/three.module.js";
import { OrbitControls } from '../lib/controls/OrbitControls.js';

class App {

  constructor() {
    this.render = this.render.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  get viewportWidth() {
    return innerWidth;
  }

  get viewportHeight() {
    return innerHeight;
  }

  get aspect() {
    return this.viewportWidth / this.viewportHeight;
  }

  initScene() {    
    const { scene } = this;

    // Setup a geometry
    const geometry = new THREE.SphereGeometry(1, 32, 16);

    const loader = new THREE.TextureLoader();
    const texture = new THREE.TextureLoader().load("earth.jpg");
    const moonTexture = loader.load("moon.jpg");

    // Setup a material
    const material = new THREE.MeshStandardMaterial({
      roughness: 1,
      metalness: 0,
      map: texture,
    });

    const moonMaterial = new THREE.MeshStandardMaterial({
      roughness: 1,
      metalness: 0,
      map: moonTexture,
    });

    // Setup a mesh with geometry + material
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const moonMesh = new THREE.Mesh(geometry, moonMaterial);
    moonMesh.position.set(1.5, 1, 0);
    moonMesh.scale.setScalar(0.25);

    const moonGroup = new THREE.Group();

    moonGroup.add(moonMesh);
    scene.add(moonGroup);

    const light = new THREE.PointLight("white", 1);
    light.position.set(2, 2, 0);
    moonGroup.add(light);

    scene.add(new THREE.PointLightHelper(light, 0.1));
    scene.add(new THREE.GridHelper(5, 50));
    scene.add(new THREE.AxesHelper(5));
  }


  onResize() {
    const { renderer, camera, viewportWidth, viewportHeight } = this;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(viewportWidth, viewportHeight, false);
    camera.aspect = viewportWidth / viewportHeight;
    camera.updateProjectionMatrix();
  }

  render(time = 0) {
    const { controls, renderer, scene, camera } = this;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(this.render);
  }

  setup() {
    const canvas = document.querySelector("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas });
    const scene = new THREE.Scene();
        
    renderer.setClearColor("#000", 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', this.onResize, false);

    // Setup a camera
    const camera = new THREE.PerspectiveCamera(50, this.aspect, 0.01, 100);
    camera.position.set(0, 0, -4);
    camera.lookAt(new THREE.Vector3());

    // Setup camera controller
    const controls = new OrbitControls(camera, canvas);

    this.canvas = canvas;
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.controls = controls;
    this.initScene();
  }

  dispose() {
    const { controls, renderer } = this;
    controls.dispose();
    renderer.dispose();
  }
}


const app = new App();
app.setup();
app.render();