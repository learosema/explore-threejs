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

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0x101010);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-1, 2, 4);

scene.add(ambientLight);
scene.add(dirLight);

const fieldSize = .4;
const fieldGeometry = new THREE.BoxGeometry(fieldSize, .1, fieldSize); 

const rows = 8;
const cols = 8;
const blackFieldColor = 0x222222;
const whiteFieldColor = 0xaaaaaa;

const board = Array(rows * cols).fill(0).map((_, i) => {
  const x = (i % cols);
  const y = Math.floor(i / cols);
  const color = Boolean((y + x) % 2) ? blackFieldColor : whiteFieldColor;
  const material = new THREE.MeshPhongMaterial({ color });
  const mesh = new THREE.Mesh(fieldGeometry, material);
  mesh.position.set((-(cols/2) + x) * fieldSize, -2, ((-rows/2) + y) * fieldSize);
  return mesh;
});

board.forEach(mesh => scene.add(mesh));

function animLoop(t = 0) {
  renderer.render(scene, camera);
  requestAnimationFrame(animLoop)
}

animLoop(0);