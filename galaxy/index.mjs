import * as THREE from '../lib/three.module.js';

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

function createSphere(radius, materialProps, position) {
  const { x, y, z } = position; 
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshLambertMaterial(materialProps);
  const mesh = new THREE.Mesh(geometry, material); 
  mesh.position.set(x, y, z);
  return mesh;
}

function setSize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

setSize();
window.addEventListener('resize', setSize);

const ambientLight = new THREE.AmbientLight(0x202020);
scene.add(ambientLight);



const sun = createSphere(10, {emissive: 0xffff00}, {x: 0, y: 0, z:0});
scene.add(sun);

const earth = createSphere(2, { color: 0x1122cc }, {x: 20, y:0, z: 0 })
scene.add(earth);

function animLoop(t = 0) {
  renderer.render(scene, camera);
  requestAnimationFrame(animLoop)
}

animLoop();