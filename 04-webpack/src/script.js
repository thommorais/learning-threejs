import './style.css'
import * as THREE from 'three'

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
    const material = new THREE.MeshBasicMaterial({color: 0x121416 })
    const mesh     = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    // camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
    camera.position.z = 3
    camera.position.x = 1

    scene.add(camera)


    // Renderer
    const renderer = new THREE.WebGLRenderer({canvas: stage})
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)

}


requestAnimationFrame(main)