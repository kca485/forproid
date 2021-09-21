import * as THREE from './lib/three.js';
import { GLTFLoader } from './lib/GLTFLoader.js';
import { DRACOLoader } from './lib/DRACOLoader.js';
import { OrbitControls } from './lib/OrbitControls.js';

// bagian 3d
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const container3d = document.getElementById('3d-container');
container3d.appendChild(renderer.domElement);

camera.position.set(0, 10, 40);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2;

const ambiLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambiLight );

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onLoad = function ( ) {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.remove('loading');
  console.log( 'Loading complete!');
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onError = function ( url ) {
  console.log( 'There was an error loading ' + url );
};

const loader = new GLTFLoader(manager);
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./scripts/lib/draco/');
loader.setDRACOLoader(dracoLoader);
loader.load('../assets/model/packed.glb', function(gltf) {
  scene.add(gltf.scene);
  function animate() {
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
  }
  animate();
}, undefined, function(error) {
  console.error(error);
});

// biar area 3dnya responsif
window.onresize = function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// bagian ngurusi munculin/sembunyiin tenant-modal
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isModalShown = false

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const gltfScene = scene.children[1];
  const intersects = raycaster.intersectObjects(gltfScene.children);
  
  if ((intersects.length > 0) && !isModalShown) {
    const objectName = intersects[0].object.name;
    const tenantModal = document.getElementById(objectName); // hardcode 'OSG_Scene'' sementara aja, sekedar percobaan sambil nunggu model benerannya
    if (tenantModal) {
      tenantModal.style.display = 'block';
      isModalShown = true;
    }
  }
}
window.addEventListener('click', onMouseClick);

const tenantInfo = document.querySelector('.tenant-info');
tenantInfo.addEventListener('click', (event) => {
  event.stopPropagation();
  if (event.target.className.includes('close-button')) {
    event.target.parentElement.style.display = 'none';
    isModalShown = false;
  }
});