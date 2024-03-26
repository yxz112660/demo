<template>
    <canvas ref="loadingCanvasRef"></canvas>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const loadingCanvasRef = ref<HTMLCanvasElement>();
const maxGeneration = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 5 : 6;
const frameDuration = 1000 / 60;
const duration = 3000;
const rotationSpeed = 0.3;
const totalIterations = Math.floor(duration / frameDuration);
const maxBaseSize = 100;
const baseSizeSpeed = 0.02;
let iteration = 0;
let animationDirection = 1;
const sizeVariationRange = .15;
let baseRotation = 0;
let baseSize = 50;
let c1 = 43;
let c1S = 1;
let c2 = 205;
let c2S = 1;
let c3 = 255;
let c3S = 1;

let shapes = [];
let sizeVariation: number;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let canvasWidth = document.documentElement.clientWidth;
let canvasHeight = document.documentElement.clientHeight;

const degToRad = (deg: number) => {
    return Math.PI / 180 * deg;
}

const easeInOutSine = (
    currentIteration: number,
    startValue: number,
    changeInValue: number,
    totalIterations: number
) => {
    return (
        changeInValue /
        2 *
        (1 - Math.cos(Math.PI * currentIteration / totalIterations)) +
        startValue
    );
}

const animate = () => {
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0,0,0,.1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalCompositeOperation = "lighter";
    shapes = [];
    shapes.push(
        new Shape(0, canvasWidth / 2, canvasHeight / 2, baseSize, baseRotation)
    );

    changeColor();
    iteration++;
    if (baseSize < maxBaseSize) baseSize += baseSizeSpeed;
    baseRotation += rotationSpeed;
    sizeVariation = easeInOutSine(
        iteration,
        1 - sizeVariationRange * animationDirection,
        sizeVariationRange * 2 * animationDirection,
        totalIterations
    );
    if (iteration >= totalIterations) {
        iteration = 0;
        animationDirection *= -1;
    }
    requestAnimationFrame(animate);
}

const changeColor = () => {
    if (c1 == 0 || c1 == 255) c1S *= -1;
    if (c2 == 0 || c2 == 255) c2S *= -1;
    if (c3 == 0 || c3 == 255) c3S *= -1;
    c1 += 1 * c1S;
    c2 += 1 * c2S;
    c3 += 1 * c3S;
}

class Shape {
    constructor(gen: number, x: number, y: number, size: number, rotation: number) {
        this.generation = gen;
        this.size = size;
        this.rotation = -rotation;
        this.start = {
            x: x,
            y: y
        };
        this.end = {
            x_1: this.start.x + Math.cos(degToRad(this.rotation)) * this.size,
            y_1: this.start.y + Math.sin(degToRad(this.rotation)) * this.size,
            x_2: this.start.x + Math.cos(degToRad(this.rotation + 360 / 3)) * this.size,
            y_2: this.start.y + Math.sin(degToRad(this.rotation + 360 / 3)) * this.size,
            x_3: this.start.x +
                Math.cos(degToRad(this.rotation + 360 / 3 * 2)) * this.size,
            y_3: this.start.y + Math.sin(degToRad(this.rotation + 360 / 3 * 2)) * this.size
        };

        this.init();
    }

    generation: number;
    size: number;
    rotation: number;
    start: { x: number; y: number; }
    end: {
        x_1: number;
        y_1: number;
        x_2: number;
        y_2: number;
        x_3: number;
        y_3: number;
    }

    init = () => {
        if (this.generation < maxGeneration) {
            var gen = this.generation + 1,
                newSize = this.size * sizeVariation,
                newRotation = this.rotation;

            shapes.push(
                new Shape(gen, this.end.x_1, this.end.y_1, newSize, newRotation)
            );
            shapes.push(
                new Shape(gen, this.end.x_2, this.end.y_2, newSize, newRotation)
            );
            shapes.push(
                new Shape(gen, this.end.x_3, this.end.y_3, newSize, newRotation)
            );
        }
        this.draw();
    };

    draw = () => {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x_1, this.end.y_1);
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x_2, this.end.y_2);
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x_3, this.end.y_3);
        //ctx.closePath();
        ctx.strokeStyle =
            "rgba(" + c1 + "," + c2 + "," + c3 + "," + 1 / this.generation / 5 + ")";
        ctx.stroke();
        //ctx.fill();
    };
}

onMounted(() => {
    canvas = loadingCanvasRef.value!;
    ctx = canvas.getContext("2d")!;

    canvas.setAttribute("width", canvasWidth.toString());
    canvas.setAttribute("height", canvasHeight.toString());

    ctx.globalCompositeOperation = "lighter";
    animate();

    window.addEventListener("resize", function () {
        canvasWidth = document.documentElement.clientWidth;
        canvasHeight = document.documentElement.clientHeight;

        canvas.setAttribute("width", canvasWidth.toString());
        canvas.setAttribute("height", canvasHeight.toString());
        ctx.strokeStyle = "rgba(66,134,240,.3)";
        ctx.globalCompositeOperation = "lighter";
    });
});

</script>
<style scoped></style>