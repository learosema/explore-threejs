import * as THREE from "../lib/three.module.js";

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
});

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0x101010);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-1, 4, -2);

scene.add(ambientLight);
scene.add(dirLight);

const fieldSize = 0.5;
const fieldGeometry = new THREE.BoxGeometry(fieldSize, 0.2, fieldSize);

const rows = 8;
const cols = 8;
const blackFieldColor = 0x222222;
const whiteFieldColor = 0xaaaaaa;

const boardMeshes = Array(rows * cols)
  .fill(0)
  .map((_, i) => {
    const { sin, cos, floor } = Math;
    const x = i % cols;
    const y = floor(i / cols);
    const color = Boolean((y + x) % 2) ? blackFieldColor : whiteFieldColor;
    const material = new THREE.MeshPhongMaterial({ color });
    const mesh = new THREE.Mesh(fieldGeometry, material);
    mesh.position.set(
      (-(cols / 2) + x) * fieldSize,
      0,
      (-rows / 2 + y) * fieldSize
    );
    return mesh;
  });

const sphereGeometry = new THREE.SphereGeometry(fieldSize / 2, 16, 16);

const sphereMeshes = Array(rows)
  .fill(0)
  .map((_, i) => {
    const { sin, cos } = Math;
    const x = (i * 2) % cols;
    const y = i;
    const material = new THREE.MeshPhongMaterial({ color: 0xaa00ff });
    const mesh = new THREE.Mesh(sphereGeometry, material);
    mesh.position.set(
      (-(cols / 2) + x) * fieldSize,
      0.02 + fieldSize / 2,
      (-rows / 2 + y) * fieldSize
    );
    return mesh;
  });

const boardWithFigs = new THREE.Group();
const board = new THREE.Group();
const figures = new THREE.Group();
boardMeshes.forEach((mesh) => board.add(mesh));
sphereMeshes.forEach((mesh) => figures.add(mesh));
boardWithFigs.add(board);
boardWithFigs.add(figures);

scene.add(boardWithFigs);
boardWithFigs.position.y = -0.5;
camera.position.y = 2;
camera.lookAt(0, 0, 0);

function animLoop(t = 0) {
  boardWithFigs.rotation.y = t * 3e-4;
  renderer.render(scene, camera);
  requestAnimationFrame(animLoop);
}

animLoop(0);
