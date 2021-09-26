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

camera.position.set(-15, 8, 10);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2.2;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.2;
controls.enableDamping = true;

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 0.7;
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
renderer.shadowMap.enabled = true


const directLight = new THREE.DirectionalLight(0xffffff, 2);
directLight.position.set(2, 3, 3);
scene.add(directLight);
const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 2);
scene.add(hemiLight);

scene.background = new THREE.Color( 0xcaf0f8 );

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onLoad = function () {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.opacity = 0;
  loadingScreen.style.transition = 'opacity 1.5s'
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 2000);
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
  let isFirstRender = true;
  scene.add(gltf.scene);

  const mixer = new THREE.AnimationMixer(gltf.scene);
  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });

  const clock = new THREE.Clock();

  let intersected;

  function animate() {
    if (isFirstRender) {
      mouse.x = -1;
      mouse.y = 1;
      isFirstRender = false;
    }
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(gltf.scene.children, true);
    if (intersects.length > 0) {
      if (intersected !== intersects[0].object) {
        if (intersected) intersected.material.emissive.setHex(intersected.originalHex);
        intersected = intersects[0].object;
        intersected.originalHex = intersected.material.emissive.getHex();

        if (intersected.name.startsWith('Booth')) {
          intersected.material = intersected.material.clone();
          intersected.material.emissiveIntensity = 0.7;
          intersected.material.emissive.setHex(0xffffff);
        }
      }
    } else {
      if (intersected) intersected.material.emissive.setHex(intersected.originalHex);
      intersected = null;
    }

    const delta = clock.getDelta();
    mixer.update(delta);

    requestAnimationFrame( animate );
    controls.update();
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



const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove() {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', onMouseMove);

// ngurusi munculin/sembunyiin tenant-modal
let isModalShown = false
function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const gltfScene = scene.children.find(el => el.name === 'Scene');
  const intersects = raycaster.intersectObjects(gltfScene.children, true);
  if ((intersects.length > 0) && !isModalShown) {
    const objectName = intersects[0].object.name;
    const tenantModal = document.getElementById(objectName);
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
