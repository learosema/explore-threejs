import * as THREE from '../lib/three.module.js';

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
});

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0x101010);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-1, 4, -2);

scene.add(ambientLight);
scene.add(dirLight);

const fieldSize = .5;
const fieldGeometry = new THREE.BoxGeometry(fieldSize, .2, fieldSize); 

const rows = 8;
const cols = 8;
const blackFieldColor = 0x222222;
const whiteFieldColor = 0xaaaaaa;



const board = Array(rows * cols).fill(0).map((_, i) => {
  const { sin, cos, floor } = Math;
  const x = (i % cols);
  const y = floor(i / cols);
  const color = Boolean((y + x) % 2) ? blackFieldColor : whiteFieldColor;
  const material = new THREE.MeshPhongMaterial({ color });
  const mesh = new THREE.Mesh(fieldGeometry, material);
  mesh.position.set((-(cols/2) + x) * fieldSize, sin(x)*cos(y) * .2  , ((-rows/2) + y) * fieldSize);
  return mesh;
});

const sphereGeometry = new THREE.SphereGeometry(fieldSize / 2, 16, 16);

const spheres = Array(rows).fill(0).map((_, i) => {
  const { sin, cos } = Math;
  const x = (i * 2) % cols;
  const y = i;
  const material = new THREE.MeshPhongMaterial({color: 0xaa00ff });
  const mesh = new THREE.Mesh(sphereGeometry, material);
  mesh.position.set((-(cols/2) + x) * fieldSize, sin(x)*cos(y) * .2 + .02 + fieldSize / 2, ((-rows/2) + y) * fieldSize);
  return mesh;
});


const meshes = [...board, ...spheres];
meshes.forEach(mesh => scene.add(mesh));

function animLoop(t = 0) {
  camera.position.y = 2;
  camera.position.x = Math.cos(t * 3e-4) * 4;
  camera.position.z = Math.sin(t * 3e-4) * 4;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(animLoop)
}

animLoop(0);