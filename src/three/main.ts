import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// import { MillGltf } from './objects/MillGltf';
// import { FactoryAssemblySmallStl } from './objects/FactoryAssemblySmallStl';
// import { FactoryAssemblySmallPly } from './objects/FactoryAssemblySmallPly';
// import { FbxViewer } from './objects/FbxViewer';
import { ThreeMFViewer } from './objects/3MFViewer';
// import { MillGltf } from './objects/MillGltf';
// import { GLBViewer } from './objects/GLBViewer';

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

        this.renderer.shadowMap.enabled = true;

        this.initCanvasSize();

        // const pmremGenerator = new THREE.PMREMGenerator(this.renderer);

        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color(0x00000000);
        // this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(this.renderer), 0.04).texture;
        this.scene.add(new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3));

        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        this.camera.position.set(0, 2.13, 1.28);
        // this.camera.position.set(-18, 8, -5);

        (window as any).thisScene = this.scene;
        (window as any).thisCamera = this.camera;

        this.orbitControls = new OrbitControls(this.camera, this.canvas);
        this.orbitControls.target.set(0, 0, 0);
        this.orbitControls.update();
        this.orbitControls.enablePan = false;
        this.orbitControls.enableDamping = true;

        (window as any).thisOrbitControls = this.orbitControls;

        const threeMFViewer = new ThreeMFViewer("jsm/数字孪生用总装图20250413(1).3MF");
        // const glbViewer = new GLBViewer("jsm/BiomassFactory.glb");
        threeMFViewer.addEventListener("init", () => {
            this.model = threeMFViewer.model;

            console.log(this.model);


            if (this.model) {
                (window as any).thisModel = this.model;
                this.scene.add(this.model);

                this.model.position.set(0, 0, 0);
                this.camera.lookAt(this.model.position);

                // document.getElementById('three-background')!.style.backgroundColor = "#000";

                this.animate();
            }
        });

        // this.animate();

        // glbViewer.addEventListener("init", () => {
        //     this.model = glbViewer.model;

        //     console.log(this.model);


        //     if (this.model) {
        //         this.model.scale.set(0.1, 0.1, 0.1);

        //         this.scene.add(this.model);

        //         (window as any).thisModel = this.model;
        //         this.model.position.set(-10, 0, -1.5);
        //         (async () => {
        //             for (const item of (this as any).model.children) {
        //                 item.material && item.name != "Mesh166" && (item.material.wireframe = true);
        //                 item.material && item.name != "Mesh166" && (item.material.color.set(0.06, 0.5, 0.8));
        //                 if (item.name === "Mesh") {
        //                     item.visible = false;
        //                 }
        //             }
        //         })();

        //         this.animate();
        //     }
        // });

        // const millGltf = new MillGltf();
        // millGltf.addEventListener('init', () => {
        //     this.model = millGltf.model;

        //     console.log(this.model);


        //     if (this.model) {
        //         this.scene.add(this.model);

        //         this.camera.lookAt(this.model.position);

        //         this.animate();
        //     }
        // });

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

    model?: THREE.Object3D;

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
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }
}