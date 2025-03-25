// assets/logo3d.js
// This script creates a 3D animated wormhole logo using Three.js.
// It simulates scattered logo pieces converging toward the center, akin to a gravitational pull.

let scene, camera, renderer, logoGroup;
let animationComplete = false;

function initLogoScene() {
  const canvas = document.getElementById('logo-canvas');
  // Initialize renderer with antialiasing
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Set up scene and perspective camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Create a group to hold logo pieces
  logoGroup = new THREE.Group();
  scene.add(logoGroup);
  
  // Create multiple scattered pieces using a TorusKnot geometry
  const geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
  
  for (let i = 0; i < 50; i++) {
    const piece = new THREE.Mesh(geometry, material);
    // Random starting positions for a scattered effect
    piece.position.x = (Math.random() - 0.5) * 10;
    piece.position.y = (Math.random() - 0.5) * 10;
    piece.position.z = (Math.random() - 0.5) * 10;
    logoGroup.add(piece);
  }
  
  // Add lighting to create dynamic shading effects
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xffffff, 2);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  
  // Begin the animation loop
  animateLogo();
}

// Animation loop: gradually pull pieces toward the center and add rotation.
function animateLogo() {
  requestAnimationFrame(animateLogo);
  
  logoGroup.children.forEach(piece => {
    // Lerp positions towards the center for a smooth gravitational effect
    piece.position.lerp(new THREE.Vector3(0, 0, 0), 0.02);
    piece.rotation.x += 0.02;
    piece.rotation.y += 0.02;
  });
  
  // Check if animation is complete (all pieces near center)
  if (!animationComplete && logoGroup.children.every(piece => piece.position.distanceTo(new THREE.Vector3(0, 0, 0)) < 0.1)) {
    animationComplete = true;
    // After a brief pause, transition to the main content
    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
      document.getElementById('main-content').style.opacity = '1';
    }, 1000);
  }
  
  renderer.render(scene, camera);
}

// Expose initialization function to the global scope
window.initLogoScene = initLogoScene;
