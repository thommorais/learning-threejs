import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
scene.add(pointLight)



/**
 * textures
 */

// const textureLoader = new THREE.TextureLoader()
// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
// const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
// const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
// const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
// const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')


/**
 * Objects
 */

const material = new THREE.MeshLambertMaterial()

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = -1.5


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

plane.material.side = THREE.DoubleSide

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)

torus.position.x = 1.5

scene.add(sphere, plane, torus)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 3
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()


    sphere.rotation.y = elapsedTime * 0.1
    sphere.rotation.x = elapsedTime * 0.5

    plane.rotation.y = elapsedTime * 0.1
    plane.rotation.x = elapsedTime * -0.3

    torus.rotation.y = elapsedTime * 0.1
    torus.rotation.x = elapsedTime * 0.5


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()