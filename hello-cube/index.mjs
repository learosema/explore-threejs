import * as THREE from '../lib/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
});

function createMesh(geometry, color, position) {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = position.x;
  cube.position.y = position.y;
  cube.position.z = position.z;
  return cube;
}


const geometry = new THREE.BoxGeometry(.2, .2, .2);
const ambientLight = new THREE.AmbientLight(0x101010);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-1, 2, 4);

const fRand = (min, max) => min + (max - min) * Math.random();
const rand = (min, max) => min + (((max - min + 1) * Math.random())|0);


const meshes = Array(150).fill(0).map(particle => {
  return {
    mesh: createMesh(geometry, rand(0, 0xffffff), {x: fRand(-2, 2), y: fRand(-2, 2), z: fRand(-2, 2)}),
    motion: { x: fRand(-.01, .01), y: fRand(-.01, .01), z: fRand(-.01, .01)},
    rotation: { x: fRand(-.01, .01), y: fRand(-.01, .01), z: fRand(-.01, .01)}
  }
});

meshes.map(cube => scene.add(cube.mesh));

scene.add(ambientLight);
scene.add(dirLight);

camera.position.z = 5;



function render(t) {

  meshes.forEach((cube, i) => {
    cube.mesh.rotation.x += cube.rotation.x;
    cube.mesh.rotation.y += cube.rotation.y;
    cube.mesh.rotation.z += cube.rotation.z;
    cube.mesh.position.x += Math.sin(t * 1e-3) * cube.motion.x;
    cube.mesh.position.y += Math.sin(t * 1e-3) * cube.motion.y;
    cube.mesh.position.z += Math.sin(t * 1e-3) * cube.motion.z;
  });
	renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render(0);