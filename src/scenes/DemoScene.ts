import * as THREE from 'three';
import { DRACOLoader, GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

export class DemoScene {
    constructor () {
        this.initCamera();
        this.initScene();
        this.initRenderer();
        this.initControls();

        window.addEventListener( 'resize', this.onWindowResize );
    }

    camera!: THREE.PerspectiveCamera;
    scene!: THREE.Scene;
    renderer!: THREE.WebGLRenderer;
    controls!: OrbitControls;

    initCamera = () => {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(1.5, 4, 9);
    }

    initScene = () => {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf6eedc);
    }

    initRenderer = () => {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initControls = () => {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.addEventListener('change', this.render);
        this.controls.target.set(0, 2, 0);
        this.controls.update();
    }

    onWindowResize = () => {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.render();

    }

    render = () => {

        this.renderer.render( this.scene, this.camera );

    }
}