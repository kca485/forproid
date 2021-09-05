import * as THREE from './lib/three.js';
import { GLTFLoader } from './lib/GLTFLoader.js';
import { InteractionManager } from './lib/three.interactive.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const container3d = document.getElementById('3d-container');
container3d.appendChild(renderer.domElement);

camera.position.z = 3000;

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

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

const loader = new GLTFLoader(manager);
loader.load('../assets/model/scene.glb', function(gltf) {
  interactionManager.add(gltf.scene);
  console.log(gltf);
  gltf.scene.addEventListener('click', () => {
    console.log('Yey! Iso diklik!')
  });

  scene.add(gltf.scene);
  function animate() {
    requestAnimationFrame( animate );
    gltf.scene.rotation.y += 0.01;
    renderer.render(scene, camera);
    interactionManager.update();
  }
  animate();
}, undefined, function(error) {
  console.error(error);
});