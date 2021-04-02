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

    // axes helpers
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    // groups
    const group = new THREE.Group()

    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    )

    cube1.position.x = -2

    const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0x00ff00})
    )

    cube2.position.x = 0

    const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0x0000ff})
    )

    cube2.position.x = 2


    group.add(cube1)
    group.add(cube2)
    group.add(cube3)

    group.position.y = 0.1
    group.scale.y = 2
    group.rotation.y = 1

    scene.add(group)

    // camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
    camera.position.z = 3

    scene.add(camera)

    // Renderer
    const renderer = new THREE.WebGLRenderer({canvas: stage})
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)

}


main()