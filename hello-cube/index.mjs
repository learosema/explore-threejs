import * as THREE from '../lib/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function createMesh(geometry, color, position) {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = position.x;
  cube.position.y = position.y;
  cube.position.z = position.z;
  return cube;
}


const geometry = new THREE.BoxGeometry(1, 1, 1);
const ambientLight = new THREE.AmbientLight(0x101010);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-1, 2, 4);

const meshes = [
  createMesh(geometry, 0x663399, {x: 0, y: 0, z: 0}),
  createMesh(geometry, 0x336699, {x: 1, y: 1, z: 1}),
  createMesh(geometry, 0x669933, {x: -1, y: 0, z: 2})
];

meshes.map(cube => scene.add(cube));

scene.add(ambientLight);
scene.add(dirLight);

camera.position.z = 5;





function animate(t) {
  requestAnimationFrame(animate);
  meshes.forEach((cube, i) => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01 * i;
    cube.position.z = Math.sin(t * 1e-3) + i;
  });
	renderer.render(scene, camera);
}
animate(0);