import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { modelData, modelNameData } from "../mock";
import { ThreeMFViewer } from './objects/3MFViewer';

export interface IThreeExampleOption {
    canvas: HTMLCanvasElement
}

export class ThreeExample {
    // 动画相关属性
    private animationId: number | null = null;
    private isAnimating = false;

    // 动画完成回调函数
    private animationCompleteCallback: (() => void) | null = null;

    // 设置动画完成回调
    public setAnimationCompleteCallback(callback: () => void) {
        this.animationCompleteCallback = callback;
    }

    // 射线拾取相关属性
    private raycaster = new THREE.Raycaster();
    private mouse = new THREE.Vector2();
    private selectedObject: THREE.Object3D | null = null;
    private robotAnimationTargets = {
        rotation: { x: -1.5707963267948963, y: -0.2503, z: 2.6 },
        position: { x: -5250.00293, y: -496.903748, z: -392.238648 }
    };
    private objectsAnimationTargets = {
        rotation: { x: -1.5935661742816212, y: -0.13815675123798693, z: -2.6 },
        position: { x: -7200, y: 1400, z: -1600 }
    };

    /**
     * 更新机器人动画目标位置和旋转
     * @param rotation 旋转目标 {x, y, z}
     * @param position 位置目标 {x, y, z}
     */
    public updateRobotAnimationTargets(rotation: { x: number, y: number, z: number }, position: { x: number, y: number, z: number }) {
        if (rotation) {
            this.robotAnimationTargets.rotation = { ...rotation };
        }
        if (position) {
            this.robotAnimationTargets.position = { ...position };
        }
    }

    /**
     * 更新夹具动画目标位置和旋转
     * @param rotation 旋转目标 {x, y, z}
     * @param position 位置目标 {x, y, z}
     */
    public updateObjectsAnimationTargets(rotation: { x: number, y: number, z: number }, position: { x: number, y: number, z: number }) {
        if (rotation) {
            this.objectsAnimationTargets.rotation = { ...rotation };
        }
        if (position) {
            this.objectsAnimationTargets.position = { ...position };
        }
    }
    private lerpFactor = 0.05; // 动画速度系数（0-1之间，值越大动画越快）
    private positionThreshold = 0.1; // 位置阈值
    private rotationThreshold = 0.01; // 旋转阈值

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

        this.scene = new THREE.Scene();
        this.scene.add(new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3));

        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        this.camera.position.set(0, 2.13, 1.28);

        (window as any).thisScene = this.scene;
        (window as any).thisCamera = this.camera;

        this.orbitControls = new OrbitControls(this.camera, this.canvas);
        this.orbitControls.target.set(0, 0, 0);
        this.orbitControls.update();
        this.orbitControls.enablePan = false;
        this.orbitControls.enableDamping = true;


        (window as any).thisOrbitControls = this.orbitControls;

        const threeMFViewer = new ThreeMFViewer("jsm/数字孪生用总装图-1210.3MF");
        threeMFViewer.addEventListener("init", () => {
            this.model = threeMFViewer.model;

            if (this.model) {
                (window as any).thisModel = this.model;
                this.scene.add(this.model);
                this.model.position.set(0, 0, 0);
                this.camera.lookAt(this.model.position);

                // 遍历 modelData 数组中的每一项，针对每个 robotshensuo 的 names 进行匹配
                const updatedModelData = modelData.map(item => {
                    const key = Object.keys(item)[0];
                    const names = item[key].names;

                    const updatedNames = names.map(name => {
                        const match = modelNameData.find(modelName => modelName.includes(name));
                        return match ? match : name;
                    });

                    return {
                        [key]: {
                            value: item[key].value,
                            names: updatedNames
                        }
                    };
                });

                console.log(updatedModelData, "updatedModelData");

                // 启动动画
                this.animate();

                // 优化后的动画流程控制，减少嵌套，提升可维护性

                // 动画步骤定义
                type AnimationStep = {
                    delay: number;
                    actions: () => void;
                };

                // 通用动画函数
                const animateModels = (steps: AnimationStep[], onComplete?: () => void) => {
                    let index = 0;
                    const next = () => {
                        if (index >= steps.length) {
                            onComplete && onComplete();
                            return;
                        }
                        const step = steps[index++];
                        step.actions();
                        if (step.delay > 0) {
                            setTimeout(next, step.delay);
                        } else {
                            next();
                        }
                    };
                    next();
                };

                // 设置动画完成后的回调函数
                this.setAnimationCompleteCallback(() => {
                    const storageObject = this.model?.getObjectByName("上壳限位-v02_STEP");
                    const robotObject = this.model?.getObjectByName("6700-300-2_70-单机器人装配图（含约束）_STEP");
                    const robotObjects = this.model?.getObjectByName("等轴叶片自动化夹具装配图-250103_STEP");
                    const xin = this.model?.getObjectByName("xin门.STEP.STEP(默认)显示状态 1");
                    const doorObjects = this.model?.getObjectByName("_______Default________.STEP.STEP(默认)显示状态 1") as THREE.Object3D;
                    const threedoorObject = this.model?.getObjectByName("2409-01-02 陶瓷纤维板-门2-1.STEP(默认)显示状态 1") as THREE.Object3D;
                    const threedoorObjects = this.model?.getObjectByName("2409-01-06 门板-1.STEP(默认)显示状态 1") as THREE.Object3D;

                    if (!storageObject || !robotObject || !robotObjects) {
                        console.warn("Some main objects not found, animation aborted.");
                        return;
                    }

                    // 动画步骤列表
                    const steps: AnimationStep[] = [
                        {
                            delay: 0,
                            actions: () => {
                                // 初始位置
                                this.animateObjectToPosition(storageObject, new THREE.Vector3(1800, 428, 4000), new THREE.Euler(-1.5, 0, -0.94));
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(-1000, -603, 603), new THREE.Euler(-1.9, -0.250291665001756, 2.5));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(-3000, 1100, -1300), new THREE.Euler(-1.5935661742816212, -0.13815675123798693, -2.599862376965988));
                                console.log("Robot and gripper models animation started");
                            }
                        },
                        {
                            delay: 3000,
                            actions: () => {
                                // xin门动画
                                if (xin) {
                                    this.animateObjectToPosition(xin, new THREE.Vector3(-545, 900, 225), new THREE.Euler(0, 0, 0));
                                }
                                this.animateObjectToPosition(storageObject, new THREE.Vector3(2500, 428, 3500), new THREE.Euler(-1.5, 0, -0.94));
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(-1200, -603, 303), new THREE.Euler(-1.9, -0.250291665001756, 2.5));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(-3000, 1100, -1900), new THREE.Euler(-1.5935661742816212, -0.13815675123798693, -2.599862376965988));
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 关闭炉门，机器人移出
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(-1000, -603, 603), new THREE.Euler(-1.9, -0.250291665001756, 2.5));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(-3000, 1100, -1300), new THREE.Euler(-1.5935661742816212, -0.13815675123798693, -2.599862376965988));
                                if (xin) {
                                    this.animateObjectToPosition(xin, new THREE.Vector3(-545, 200, 225), new THREE.Euler(0, 0, 0));
                                }
                                this.animateObjectToPosition(storageObject, new THREE.Vector3(2500, 428, 3500), new THREE.Euler(-1.5, 0, -0.94));
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 打开炉门，机器人移入
                                if (xin) {
                                    this.animateObjectToPosition(xin, new THREE.Vector3(-545, 900, 225), new THREE.Euler(0, 0, 0));
                                }
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(-1200, -603, 303), new THREE.Euler(-1.9, -0.250291665001756, 2.5));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(-3000, 1100, -1900), new THREE.Euler(-1.5935661742816212, -0.13815675123798693, -2.599862376965988));
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 再次开门门，机器人移入
                                if (xin) {
                                    this.animateObjectToPosition(xin, new THREE.Vector3(-545, 900, 225), new THREE.Euler(0, 0, 0));
                                }
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(-1200, -603, 303), new THREE.Euler(-1.9, -0.250291665001756, 2.5));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(-3000, 1100, -1900), new THREE.Euler(-1.5935661742816212, -0.13815675123798693, -2.599862376965988));
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 立体库、关门、机器人夹具新位置
                                this.animateObjectToPosition(storageObject, new THREE.Vector3(-200, 900, 4000), new THREE.Euler(-1.5, 0, -0.94));
                                if (xin) {
                                    this.animateObjectToPosition(xin, new THREE.Vector3(-545, 200, 225), new THREE.Euler(0, 0, 0));
                                }
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(-1200, -600, 303), new THREE.Euler(-1.9, -0.25, 3.5));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(-3600, 1200, -100), new THREE.Euler(-1.59, -0.13, -1.5));
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 立体库、机器人夹具、柜门
                                this.animateObjectToPosition(storageObject, new THREE.Vector3(3509, 1300, 9720), new THREE.Euler(-1.5, 0, -0.94));
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(800, -900, -160), new THREE.Euler(-1.59, -0.13, 0));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(2200, 1800, -180), new THREE.Euler(-1.7, -0.13815675123798693, 1.5));
                                if (doorObjects) {
                                    this.animateObjectToPosition(doorObjects, new THREE.Vector3(500, -1900, -643), new THREE.Euler(-3.14, 1.5, -3.1));
                                }
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 立体库、机器人夹具、柜门
                                this.animateObjectToPosition(storageObject, new THREE.Vector3(4400, 800, 11000), new THREE.Euler(-1.5, 0, -0.94));
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(1500, -600, -160), new THREE.Euler(-1.59, 0.2, 0));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(3800, 1500, -180), new THREE.Euler(-1.7, -0.13815675123798693, 1.5));
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 机器人夹具、柜门
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(500, -600, -160), new THREE.Euler(-1.59, 0.2, 0));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(2500, 1500, -180), new THREE.Euler(-1.7, -0.13815675123798693, 1.5));
                                if (doorObjects) {
                                    this.animateObjectToPosition(doorObjects, new THREE.Vector3(100, -1900, -643), new THREE.Euler(-3.14, 0, -3.1));
                                }
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 柜门、机器人夹具
                                if (doorObjects) {
                                    this.animateObjectToPosition(doorObjects, new THREE.Vector3(500, -1900, -643), new THREE.Euler(-3.14, 1.5, -3.1));
                                }
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(900, -600, -160), new THREE.Euler(-1.59, 0.5, 0));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(3500, 1500, -180), new THREE.Euler(-1.7, -0.13815675123798693, 1.5));
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 立体库、机器人夹具
                                this.animateObjectToPosition(storageObject, new THREE.Vector3(3509, 1300, 9720), new THREE.Euler(-1.5, 0, -0.94));
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(-800, -600, -160), new THREE.Euler(-1.59, 0.4, 0));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(2200, 1500, -180), new THREE.Euler(-1.7, -0.13815675123798693, 1.5));
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 柜门、立体库、机器人夹具
                                if (doorObjects) {
                                    this.animateObjectToPosition(doorObjects, new THREE.Vector3(100, -1900, -643), new THREE.Euler(-3.14, 0, -3.1));
                                }
                                this.animateObjectToPosition(storageObject, new THREE.Vector3(-600, 800, 4100), new THREE.Euler(-1.5, 0, -0.94));
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(-7800, -600, 20), new THREE.Euler(-1.59, 0.4, 0));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(-4800, 1200, -30), new THREE.Euler(-1.7, -0.13815675123798693, 1.5));
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 立体库、机器人夹具
                                this.animateObjectToPosition(storageObject, new THREE.Vector3(-4500, 800, 2700), new THREE.Euler(-1.5, 0, -0.94));
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(-7000, -700, -630), new THREE.Euler(-1.2, -0.13815675123798693, -1.6));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(-7500, 1200, 2200), new THREE.Euler(-1.7, -0.13, -0.1));
                                // 三号门动画
                                if (threedoorObject && threedoorObjects) {
                                    threedoorObject.visible = false;
                                    this.animateObjectToPosition(threedoorObjects, new THREE.Vector3(600, -337, -2200), new THREE.Euler(-1.5707963267948963, 1.5, -3.141592653589793));
                                }
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 立体库、三号门
                                this.animateObjectToPosition(storageObject, new THREE.Vector3(-5200, 200, 3200), new THREE.Euler(-1.5, 0, -0.94));
                                if (threedoorObjects) {
                                    this.animateObjectToPosition(threedoorObjects, new THREE.Vector3(600, -337, -2200), new THREE.Euler(-1.5707963267948963, 0, -3.141592653589793));
                                }
                                if (threedoorObject) threedoorObject.visible = true;
                            }
                        },
                        {
                            delay: 2000,
                            actions: () => {
                                // 机器人夹具
                                this.animateObjectToPosition(robotObject, new THREE.Vector3(-7800, -600, 20), new THREE.Euler(-1.59, 0.4, 0));
                                this.animateObjectToPosition(robotObjects, new THREE.Vector3(-4800, 1200, -30), new THREE.Euler(-1.7, -0.13815675123798693, 1.5));
                            }
                        }
                    ];

                    animateModels(steps, () => {
                        console.log("Robot targets and storage model positions updated after animation completion");
                    });
                });

                // 启动机器人动画
                this.startRobotAnimation();
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
    model?: THREE.Object3D;

    // 基本动画循环
    animate = () => {
        requestAnimationFrame(this.animate);
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
    }

    // 启动机器人动画
    startRobotAnimation() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.animateRobotObjects();
    }

    // 停止机器人动画
    stopRobotAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.isAnimating = false;
    }

    // 机器人对象动画循环
    private animateRobotObjects = () => {
        if (!this.model) {
            this.stopRobotAnimation();
            return;
        }
        const robotObject3 = this.model?.getObjectByName("2409-02-00 移栽装配-1_STEP");
        if (robotObject3) {
            robotObject3.visible = false
        }

        const robotObject = this.model?.getObjectByName("6700-300-2_70-单机器人装配图（含约束）_STEP");
        const robotObjects = this.model?.getObjectByName("等轴叶片自动化夹具装配图-250103_STEP");
        const robotObject2 = this.model?.getObjectByName("TQ-P-240123-SL-001 冷壳双层旋转上料台-数字孪生用_STEP");

        // 为货架对象添加持续旋转动画
        if (robotObject2) {
            // 每帧旋转一点，实现持续旋转效果
            robotObject2.rotation.y += 0.01; // 可以调整这个值来改变旋转速度
        }

        if (robotObjects && robotObject) {
            // 对机器人对象应用平滑动画
            robotObject.rotation.x += (this.robotAnimationTargets.rotation.x - robotObject.rotation.x) * this.lerpFactor;
            robotObject.rotation.y += (this.robotAnimationTargets.rotation.y - robotObject.rotation.y) * this.lerpFactor;
            robotObject.rotation.z += (this.robotAnimationTargets.rotation.z - robotObject.rotation.z) * this.lerpFactor;

            robotObject.position.x += (this.robotAnimationTargets.position.x - robotObject.position.x) * this.lerpFactor;
            robotObject.position.y += (this.robotAnimationTargets.position.y - robotObject.position.y) * this.lerpFactor;
            robotObject.position.z += (this.robotAnimationTargets.position.z - robotObject.position.z) * this.lerpFactor;

            // 对夹具对象应用平滑动画
            robotObjects.rotation.x += (this.objectsAnimationTargets.rotation.x - robotObjects.rotation.x) * this.lerpFactor;
            robotObjects.rotation.y += (this.objectsAnimationTargets.rotation.y - robotObjects.rotation.y) * this.lerpFactor;
            robotObjects.rotation.z += (this.objectsAnimationTargets.rotation.z - robotObjects.rotation.z) * this.lerpFactor;

            robotObjects.position.x += (this.objectsAnimationTargets.position.x - robotObjects.position.x) * this.lerpFactor;
            robotObjects.position.y += (this.objectsAnimationTargets.position.y - robotObjects.position.y) * this.lerpFactor;
            robotObjects.position.z += (this.objectsAnimationTargets.position.z - robotObjects.position.z) * this.lerpFactor;

            // 检查是否已经接近目标位置
            const robotPositionReached =
                Math.abs(robotObject.position.x - this.robotAnimationTargets.position.x) < this.positionThreshold &&
                Math.abs(robotObject.position.y - this.robotAnimationTargets.position.y) < this.positionThreshold &&
                Math.abs(robotObject.position.z - this.robotAnimationTargets.position.z) < this.positionThreshold;

            const robotRotationReached =
                Math.abs(robotObject.rotation.x - this.robotAnimationTargets.rotation.x) < this.rotationThreshold &&
                Math.abs(robotObject.rotation.y - this.robotAnimationTargets.rotation.y) < this.rotationThreshold &&
                Math.abs(robotObject.rotation.z - this.robotAnimationTargets.rotation.z) < this.rotationThreshold;

            const objectsPositionReached =
                Math.abs(robotObjects.position.x - this.objectsAnimationTargets.position.x) < this.positionThreshold &&
                Math.abs(robotObjects.position.y - this.objectsAnimationTargets.position.y) < this.positionThreshold &&
                Math.abs(robotObjects.position.z - this.objectsAnimationTargets.position.z) < this.positionThreshold;

            const objectsRotationReached =
                Math.abs(robotObjects.rotation.x - this.objectsAnimationTargets.rotation.x) < this.rotationThreshold &&
                Math.abs(robotObjects.rotation.y - this.objectsAnimationTargets.rotation.y) < this.rotationThreshold &&
                Math.abs(robotObjects.rotation.z - this.objectsAnimationTargets.rotation.z) < this.rotationThreshold;

            // 如果所有对象都到达了目标位置，停止动画
            if (robotPositionReached && robotRotationReached && objectsPositionReached && objectsRotationReached) {
                this.stopRobotAnimation();
                console.log("Robot animation completed");

                // 如果有设置回调函数，则调用它
                if (this.animationCompleteCallback) {
                    this.animationCompleteCallback();
                }
            } else {
                // 继续动画循环
                this.animationId = requestAnimationFrame(() => this.animateRobotObjects());
            }
        } else {
            // 如果对象不存在，停止动画
            this.stopRobotAnimation();
        }
    }

    private initCanvasSize = () => {
        const devicePixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
        this.canvas.height = this.canvas.clientHeight * devicePixelRatio;
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }


    // 将对象平滑移动到目标位置和旋转
    animateObjectToPosition = (object: THREE.Object3D, targetPosition: THREE.Vector3, targetRotation?: THREE.Euler, duration: number = 1000) => {
        if (!object) return;

        const startPosition = object.position.clone();
        const startRotation = object.rotation.clone();
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用缓动函数使动画更平滑
            const easeProgress = this.easeInOutQuad(progress);

            // 更新对象位置
            object.position.x = startPosition.x + (targetPosition.x - startPosition.x) * easeProgress;
            object.position.y = startPosition.y + (targetPosition.y - startPosition.y) * easeProgress;
            object.position.z = startPosition.z + (targetPosition.z - startPosition.z) * easeProgress;

            // 如果提供了目标旋转，则更新旋转
            if (targetRotation) {
                object.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * easeProgress;
                object.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * easeProgress;
                object.rotation.z = startRotation.z + (targetRotation.z - startRotation.z) * easeProgress;
            }

            // 如果动画未完成，继续动画
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                console.log(`Animation completed for ${object.name}`);
            }
        };

        // 开始动画
        animate();
    };

    // 添加缓动函数：使动画更平滑
    easeInOutQuad = (t: number): number => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };
}
