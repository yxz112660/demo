import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { MillGltf } from './objects/MillGltf';

export interface IThreeExampleOption {
    canvas: HTMLCanvasElement
}

export class ThreeExample {
    constructor(option: IThreeExampleOption) {
        this.canvas = option.canvas;

        this.context = this.canvas.getContext('webgl') as WebGLRenderingContext;

        this.renderer = new THREE.WebGLRenderer({
            context: this.context,
            antialias: true,
            alpha: true
        });

        this.initCanvasSize();

        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xbfe3dd);
        this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(this.renderer), 0.04).texture;

        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        this.camera.position.set(0, 6, -5);

        this.orbitControls = new OrbitControls(this.camera, this.canvas);
        this.orbitControls.target.set(-2, 0.5, 0);
        this.orbitControls.update();
        this.orbitControls.enablePan = false;
        this.orbitControls.enableDamping = true;

        const millGltf = new MillGltf();
        millGltf.addEventListener("init", () => {
            this.model = millGltf.model;

            if (this.model) {
                this.scene.add(this.model);

                this.animate();
            }
        });

        window.onresize = () => {

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);

        };
    }

    canvas: HTMLCanvasElement;

    context: WebGLRenderingContext;

    renderer: THREE.WebGLRenderer;

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    orbitControls: OrbitControls;

    model?: THREE.Group<THREE.Object3DEventMap>;

    animate = () => {
        requestAnimationFrame(this.animate);

        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
    }

    private initCanvasSize = () => {
        const devicePixelRatio = window.devicePixelRatio || 1;
        // 设置高清画布
        this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
        this.canvas.height = this.canvas.clientHeight * devicePixelRatio;

        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}