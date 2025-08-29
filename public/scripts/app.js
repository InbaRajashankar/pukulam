const container = document.getElementById('three-container');

// set up the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00000);

// set up the camera
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 10, 20);

// set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(16, 20, 10);
scene.add(directionalLight);

// load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/textures/texture.jpg', () => {
  console.log('Texture loaded');
}, undefined, (err) => {
  console.error('Texture loading error: ', err);
});

// add sphere
const geometry = new THREE.SphereGeometry( 10, 64, 64 ); 
const material = new THREE.MeshBasicMaterial( { map: texture } ); 
const sphere = new THREE.Mesh( geometry, material );
scene.add(sphere)

// add grid helper (optional)
const gridHelper = new THREE.GridHelper(100, 10);
scene.add(gridHelper);

// add orbit controls (for mouse interaction)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// handle window resize
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// animation loop
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.005;


  controls.update();
  renderer.render(scene, camera);
}
animate();
