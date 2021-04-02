import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GUI} from 'dat.gui'
import Stats from 'stats-js'

const stats = new Stats()

stats.showPanel(0)
document.body.appendChild( stats.dom )

/**
 * Debug
 */

const gui = new GUI()


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
pointLight.position.x = 1
pointLight.position.y = 3
pointLight.position.z = 4
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
// const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

const cubeTextureLoader = new THREE.CubeTextureLoader()


const ambient = 0

const enviromentMapTexture = cubeTextureLoader.load([
    `/textures/environmentMaps/${ambient}/px.jpg`,
    `/textures/environmentMaps/${ambient}/nx.jpg`,
    `/textures/environmentMaps/${ambient}/py.jpg`,
    `/textures/environmentMaps/${ambient}/ny.jpg`,
    `/textures/environmentMaps/${ambient}/pz.jpg`,
    `/textures/environmentMaps/${ambient}/nz.jpg`,
])

/**
 * Objects
 */

const material = new THREE.MeshStandardMaterial()

// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.displacementMap = doorHeightTexture
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// material.displacementScale = 0.1
// material.aoMapIntensity = 2
material.metalness = 1
material.roughness = 0
material.envMap = enviromentMapTexture
// material.normalScale.set(0.2, 0.2)


gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.1)
// gui.add(material, 'displacementScale').min(0).max(10).step(0.1)
// gui.set(material, 'normalScale').min(0).max(10).step(0.1)


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 64, 64),
    material
)

plane.material.side = THREE.DoubleSide


plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 120, 120),
    material
)
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
sphere.position.x = - 1.5


scene.add(plane, sphere)

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
camera.position.y = 2
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
    stats.begin()

    const elapsedTime = clock.getElapsedTime()


    // sphere.rotation.y = elapsedTime * 0.1
    // sphere.rotation.x = elapsedTime * 0.5

    // plane.rotation.y = elapsedTime * 0.1
    // plane.rotation.x = elapsedTime * -0.3

    // torus.rotation.y = elapsedTime * 0.1
    // torus.rotation.x = elapsedTime * 0.5

    // camera.position.x = Math.cos(elapsedTime * 0.5)
    // camera.position.y = Math.sin(elapsedTime * 0.5)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    stats.end()
    window.requestAnimationFrame(tick)
}

tick()