<template>
    <div class="container" :style="{ height: `${screenHeight}px`, backgroundImage: `url(${ ScreenBackground })` }">
        <ThreeDemo class="three-demo" />
        <ScreenHeader class="screen-header" />
        <RobotInfoCard class="robot-info-card" />
        <PlanInfoCard class="plan-info-card" />
        <VacuumFurnaceInfoCard class="vacuum-furnace-info-card" />
        <PreheatingFurnaceInfoCard class="preheating-furnace-info-card" />
        <InsulationWarehouseInfoCard class="insulation-warehouse-info-card" />
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Store } from '../store/index';

import ThreeDemo from './ThreeDemo.vue';

import ScreenHeader from '../components/ScreenHeader.vue';
import RobotInfoCard from '../components/RobotInfoCard.vue';
import PlanInfoCard from '../components/PlanInfoCard.vue';
import VacuumFurnaceInfoCard from '../components/VacuumFurnaceInfoCard.vue';
import PreheatingFurnaceInfoCard from '../components/PreheatingFurnaceInfoCard.vue';
import InsulationWarehouseInfoCard from '../components/InsulationWarehouseInfoCard.vue';

const ScreenBackground = Store.assetsMap.ScreenBackground.src;
const screenHeight = ref<number>(window.innerWidth * 1080 / 1920);

onMounted(() => {
    window.addEventListener('resize', onWindowResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize);
});

const onWindowResize = () => {
    screenHeight.value = window.innerWidth * 1080 / 1920;
}
</script>
<style scoped>
.container {
    width: 100vw;
    height: 100vh;

    position: relative;

    background-size: cover;

    overflow: hidden;
}

.three-demo {
    position: absolute;
    top: 274px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}

.screen-header {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
}

.robot-info-card {
    position: absolute;
    top: 125px;
    left: 12px;
}

.plan-info-card {
    position: absolute;
    top: 125px;
    left: 372px;
}

.vacuum-furnace-info-card {
    position: absolute;
    top: 260px;
    left: 12px;
}

.preheating-furnace-info-card {
    position: absolute;
    top: 95px;
    left: 778px;
}

.insulation-warehouse-info-card {
    position: absolute;
    top: 95px;
    left: 1351px;
}
</style>