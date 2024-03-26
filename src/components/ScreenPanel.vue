<template>
<div class="panel-container">
    <div class="header" :style="{ backgroundImage: `url(${ ScreenPanelTitleBackground })` }">
        <div class="title">{{ props.title }}</div>
    </div>
    <div class="body" :style="{ backgroundImage: `url(${ ScreenPanelBoxBackground })` }">
        <slot></slot>
    </div>
</div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { Store } from '../Store';

const ScreenPanelBoxBackground = Store.assetsMap.ScreenPanelBoxBackground.src;
const ScreenPanelTitleBackground = Store.assetsMap.ScreenPanelTitleBackground.src;

const props = defineProps<{
    title: string;
}>()
</script>
<style scoped>
.panel-container {
    width: 454px;
    height: 316px;
    position: relative;
}

.header {
    width: 454px;
    height: 49px;

    position: absolute;
    top: 0px;

    background-size: cover;
}

.title {
    color: #ffffff;
    font-size: 18px;

    margin-left: 54px;
    margin-top: 8px;
}

.body {
    width: 454px;
    height: 283px;

    position: absolute;
    bottom: 0px;

    background-size: cover;
}
</style>