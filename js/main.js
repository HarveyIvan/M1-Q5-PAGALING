import * as THREE from '../vendor/three/three.module.js';

// The three essentials: scene, camera, and renderer.
const scene = new THREE.Scene();
scene.background = new THREE.Color('#101726');

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.lookAt(0, 0, 0);

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('sceneCanvas'),
    antialias: true
  });
} catch (error) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.hidden = false;
  errorMessage.textContent = 'This scene needs WebGL 2. Try a browser with hardware acceleration enabled.';
  throw error;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Lights reveal the depth and curved surfaces of each geometry.
scene.add(new THREE.HemisphereLight(0xddeaff, 0x25304a, 2));
const keyLight = new THREE.DirectionalLight(0xffffff, 3);
keyLight.position.set(-3, 6, 8);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0xadbfff, 1.5);
rimLight.position.set(5, 2, -4);
scene.add(rimLight);

// Every object is generated with Three.js geometry. No models are imported.
const shapeDefinitions = [
  { name: 'Box', geometry: new THREE.BoxGeometry(1.35, 1.35, 1.35), color: '#ff756e', position: [-3.2, 1.5, 0], speed: [0.35, 0.5, 0.1] },
  { name: 'Cone', geometry: new THREE.ConeGeometry(0.85, 1.8, 48), color: '#ffc857', position: [0, 1.5, -0.4], speed: [0.15, 0.65, 0.12] },
  { name: 'Cylinder', geometry: new THREE.CylinderGeometry(0.7, 0.7, 1.5, 48), color: '#53d5bd', position: [3.2, 1.5, 0.3], speed: [0.3, 0.45, 0.12] },
  { name: 'Sphere', geometry: new THREE.SphereGeometry(0.85, 48, 32), color: '#69aaff', position: [-1.8, -1.5, 0.4], speed: [0.1, 0.5, 0] },
  { name: 'Torus', geometry: new THREE.TorusGeometry(0.75, 0.25, 24, 64), color: '#bc8bff', position: [1.8, -1.5, -0.2], speed: [0.4, 0.3, 0.15] }
];

const shapes = shapeDefinitions.map((definition, index) => {
  const material = new THREE.MeshStandardMaterial({
    color: definition.color, roughness: 0.35, metalness: 0.08
  });
  const mesh = new THREE.Mesh(definition.geometry, material);
  mesh.name = definition.name;
  mesh.position.set(...definition.position);
  mesh.userData = { basePosition: [...definition.position], speed: definition.speed, phase: index * 0.8 };
  scene.add(mesh);
  return mesh;
});

// Fit all five shapes, even on a narrow phone screen.
function resizeScene() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
  const verticalDistance = 4.5 / Math.tan(halfFov);
  const horizontalDistance = 5.2 / (Math.tan(halfFov) * camera.aspect);
  camera.position.set(0, 0, Math.max(verticalDistance, horizontalDistance) + 1);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
window.addEventListener('resize', resizeScene);
resizeScene();

let isPaused = false;
let elapsedSeconds = 0;
let previousTime;
const animationToggle = document.getElementById('animationToggle');
animationToggle.addEventListener('click', () => {
  isPaused = !isPaused;
  animationToggle.textContent = isPaused ? 'Resume animation' : 'Pause animation';
  animationToggle.setAttribute('aria-pressed', String(isPaused));
});

// Time-based rotation and gentle floating keep animation independent of frame rate.
function animate(time) {
  if (previousTime !== undefined && !isPaused) {
    elapsedSeconds += Math.min((time - previousTime) / 1000, 0.1);
  }
  previousTime = time;
  shapes.forEach((mesh) => {
    const { basePosition, speed, phase } = mesh.userData;
    mesh.rotation.set(
      0.2 + elapsedSeconds * speed[0],
      0.3 + elapsedSeconds * speed[1],
      elapsedSeconds * speed[2]
    );
    mesh.position.y = basePosition[1] + Math.sin(elapsedSeconds * 1.2 + phase) * 0.18;
  });
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

export { scene, camera, renderer, shapes };
