/**
 * 优化后的动画控制逻辑
 * 提取了重复代码，使用更清晰的异步结构
 */

// 定义动画序列的接口
interface AnimationStep {
    name: string;
    duration?: number;
    animations: Array<{
        object: THREE.Object3D | null;
        position: THREE.Vector3;
        rotation?: THREE.Euler;
    }>;
}

// 定义动画序列
const animationSequence: AnimationStep[] = [
    {
        name: "初始位置设置",
        animations: [
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(1800, 428, 4000),
                rotation: new THREE.Euler(-1.5, 0, -0.94)
            }
        ]
    },
    {
        name: "机器人初始位置",
        animations: [
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-1000, -603, 603),
                rotation: new THREE.Euler(-1.9, -0.250291665001756, 2.5)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-3000, 1100, -1300),
                rotation: new THREE.Euler(-1.5935661742816212, -0.13815675123798693, -2.599862376965988)
            }
        ]
    },
    {
        name: "打开炉门并移动机器人",
        animations: [
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-545, 900, 225),
                rotation: new THREE.Euler(0, 0, 0)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(2500, 428, 3500),
                rotation: new THREE.Euler(-1.5, 0, -0.94)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-1200, -603, 303),
                rotation: new THREE.Euler(-1.9, -0.250291665001756, 2.5)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-3000, 1100, -1900),
                rotation: new THREE.Euler(-1.5935661742816212, -0.13815675123798693, -2.599862376965988)
            }
        ]
    },
    {
        name: "关闭炉门",
        animations: [
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-545, 200, 225),
                rotation: new THREE.Euler(0, 0, 0)
            }
        ]
    },
    {
        name: "打开炉门并移入机器人",
        animations: [
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-545, 900, 225),
                rotation: new THREE.Euler(0, 0, 0)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-1200, -603, 303),
                rotation: new THREE.Euler(-1.9, -0.250291665001756, 2.5)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-3000, 1100, -1900),
                rotation: new THREE.Euler(-1.5935661742816212, -0.13815675123798693, -2.599862376965988)
            }
        ]
    },
    {
        name: "移动立体库和机器人",
        animations: [
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-200, 900, 4000),
                rotation: new THREE.Euler(-1.5, 0, -0.94)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-545, 200, 225),
                rotation: new THREE.Euler(0, 0, 0)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-1200, -600, 303),
                rotation: new THREE.Euler(-1.9, -0.25, 3.5)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(-3600, 1200, -100),
                rotation: new THREE.Euler(-1.59, -0.13, -1.5)
            }
        ]
    },
    {
        name: "最终位置1",
        animations: [
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(3509, 1300, 9720),
                rotation: new THREE.Euler(-1.5, 0, -0.94)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(800, -900, -160),
                rotation: new THREE.Euler(-1.59, -0.13, 0)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(2200, 1800, -180),
                rotation: new THREE.Euler(-1.7, -0.13815675123798693, 1.5)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(500, -1900, -643),
                rotation: new THREE.Euler(-3.14, 1.5, -3.1)
            }
        ]
    },
    {
        name: "最终位置2",
        animations: [
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(4400, 800, 11000),
                rotation: new THREE.Euler(-1.5, 0, -0.94)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(1500, -600, -160),
                rotation: new THREE.Euler(-1.59, 0.2, 0)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(3800, 1500, -180),
                rotation: new THREE.Euler(-1.7, -0.13815675123798693, 1.5)
            }
        ]
    },
    {
        name: "最终位置3",
        animations: [
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(500, -600, -160),
                rotation: new THREE.Euler(-1.59, 0.2, 0)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(2500, 1500, -180),
                rotation: new THREE.Euler(-1.7, -0.13815675123798693, 1.5)
            },
            {
                object: null, // 将在运行时设置
                position: new THREE.Vector3(100, -1900, -643),
                rotation: new THREE.Euler(-3.14, 0, -3.1)
            }
        ]
    }
];

// 对象名称映射
const objectNameMap = {
    storage: "上壳限位-v02_STEP",
    robot: "6700-300-2_70-单机器人装配图（含约束）_STEP",
    robotObjects: "等轴叶片自动化夹具装配图-250103_STEP",
    xinDoor: "xin门.STEP.STEP(默认)显示状态 1",
    door: "_______Default________.STEP.STEP(默认)显示状态 1"
};

/**
 * 执行动画序列
 * @param model - 3D模型对象
 * @param animateObjectToPosition - 动画函数
 * @param stepDelay - 步骤之间的延迟时间（毫秒）
 */
export async function executeAnimationSequence(
    model: THREE.Object3D | undefined,
    animateObjectToPosition: (object: THREE.Object3D, targetPosition: THREE.Vector3, targetRotation?: THREE.Euler, duration?: number) => void,
    stepDelay: number = 2000
): Promise<void> {
    if (!model) {
        console.error("Model is not available");
        return;
    }

    // 获取所有需要的对象
    const objects = {
        storage: model.getObjectByName(objectNameMap.storage),
        robot: model.getObjectByName(objectNameMap.robot),
        robotObjects: model.getObjectByName(objectNameMap.robotObjects),
        xinDoor: model.getObjectByName(objectNameMap.xinDoor),
        door: model.getObjectByName(objectNameMap.door)
    };

    // 验证所有对象是否存在
    const missingObjects = Object.entries(objects)
        .filter(([key, obj]) => obj === null)
        .map(([key]) => key);

    if (missingObjects.length > 0) {
        console.error(`Missing objects: ${missingObjects.join(", ")}`);
        return;
    }

    console.log("All required objects found, starting animation sequence");

    // 执行动画序列
    for (const step of animationSequence) {
        console.log(`Executing animation step: ${step.name}`);

        // 为每个动画步骤设置对象引用
        const animationsWithObjects = step.animations.map(anim => {
            let object: THREE.Object3D | null = null;

            // 根据位置和旋转特征确定是哪个对象
            if (anim.position.x === -545 && anim.position.y === 900) {
                object = objects.xinDoor;
            } else if (anim.position.x === -545 && anim.position.y === 200) {
                object = objects.xinDoor;
            } else if (anim.position.x > 1000 && anim.position.y > 400 && anim.position.z > 3000) {
                object = objects.storage;
            } else if (anim.position.x < 0 && anim.position.y < 0) {
                object = objects.robot;
            } else if (anim.position.x < 0 && anim.position.y > 1000) {
                object = objects.robotObjects;
            } else if (anim.position.x < 0 && anim.position.y < -1000) {
                object = objects.door;
            }

            return {
                ...anim,
                object
            };
        });

        // 执行当前步骤的所有动画
        animationsWithObjects.forEach(anim => {
            if (anim.object) {
                animateObjectToPosition(
                    anim.object,
                    anim.position,
                    anim.rotation,
                    step.duration
                );
            } else {
                console.warn("Could not determine object for animation:", anim);
            }
        });

        // 等待一段时间再执行下一步
        await new Promise(resolve => setTimeout(resolve, stepDelay));
    }

    console.log("Animation sequence completed");
}

/**
 * 简化版的动画控制函数
 * @param model - 3D模型对象
 * @param animateObjectToPosition - 动画函数
 */
export function startOptimizedAnimation(
    model: THREE.Object3D | undefined,
    animateObjectToPosition: (object: THREE.Object3D, targetPosition: THREE.Vector3, targetRotation?: THREE.Euler, duration?: number) => void
): void {
    // 设置动画完成后的回调函数
    this.setAnimationCompleteCallback(() => {
        executeAnimationSequence(model, animateObjectToPosition);
    });
}
