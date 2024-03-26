<template>
    <div class="container" :style="{ backgroundImage: `url(${ ScreenBackground })` }">
        <ScreenHeader class="screen-header" />
        <ScreenPanel class="screen-panel-1" :title="'多种图形展示样式'"></ScreenPanel>
        <ScreenPanel class="screen-panel-2" :title="'饼状图展示样式'"></ScreenPanel>
        <ScreenPanel class="screen-panel-3" :title="'柱状图展示样式'"></ScreenPanel>
        <ScreenPanel class="screen-panel-4" :title="'本周完成情况汇总'"></ScreenPanel>
        <ScreenPanel class="screen-panel-5" :title="'柱状图展示样式'"></ScreenPanel>
        <ScreenPanel class="screen-panel-6" :title="'柱状图展示样式'"></ScreenPanel>
    </div>
</template>
<script setup lang="ts">
import { Store } from '../Store';
import ScreenHeader from '../components/ScreenHeader.vue';
import ScreenPanel from '../components/ScreenPanel.vue';

const ScreenBackground = Store.assetsMap.ScreenBackground.src;
</script>
<style scoped>
.container {
    width: 100vw;
    height: 100vh;

    position: relative;

    background-size: cover;
}

.screen-header {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
}

.screen-panel-1 {
    position: absolute;
    top: 92px;
    left: 15px;
}

.screen-panel-2 {
    position: absolute;
    top: 422px;
    left: 15px;
}

.screen-panel-3 {
    position: absolute;
    top: 752px;
    left: 15px;
}

.screen-panel-4 {
    position: absolute;
    top: 92px;
    right: 15px;
}

.screen-panel-5 {
    position: absolute;
    top: 422px;
    right: 15px;
}

.screen-panel-6 {
    position: absolute;
    top: 752px;
    right: 15px;
}
</style>