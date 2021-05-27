import './style.css'
import * as THREE from 'three'
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import knotVertex from './shaders/knotVertex.glsl'
import knotFragment from './shaders/knotFragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/8.png')

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

const material = new THREE.ShaderMaterial({
  depthWrite: true,
  depthWrite: true,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
  vertexShader: knotVertex,
  fragmentShader: knotFragment,
  uniforms: {
    uTime: {
      value: 0.0
    },

    // map: {
    //   value: texture
    // },
    // radius: {
    //   value: 1.0
    // }
  }

})


const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight / 2
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight / 2

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 30
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  material.uniforms.uTime.value = elapsedTime;


  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()