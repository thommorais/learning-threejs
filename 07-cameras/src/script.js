import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function main(){
    const stage = document.getElementById('stage')

    const sizes = {
        width: 800,
        height: 600
    }

    // scene
    const scene = new THREE.Scene()

    // red cube
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x121404f })
    const mesh     = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    // camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 3

    scene.add(camera)


    // Renderer
    const renderer = new THREE.WebGLRenderer({canvas: stage})
    renderer.setSize(sizes.width, sizes.height)

    // Controls
    const controls = new OrbitControls(camera, stage)
    controls.enableDamping = true

    // animation
    // const cursor = {
    //     x: 0,
    //     y: 0
    // }

    // stage.addEventListener('mousemove', (event) => {
    //     cursor.x = event.clientX / sizes.width - 0.5
    //     cursor.y = event.clientY / sizes.height - 0.5
    // })

    function animation(){

        // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
        // camera.position.y = Math.cos(cursor.y * Math.PI * 2) * 3 * -1

    // Update controls
        controls.update()

        renderer.render(scene, camera)
        requestAnimationFrame(animation)
    }

    animation()

}


requestAnimationFrame(main)