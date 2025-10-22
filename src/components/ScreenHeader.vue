<template>
    <div class="header-container" :style="{ backgroundImage: `url(${ ScreenHeaderBackground })`,backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}">
        <div class="title">数字孪生系统</div>
        <div class="sub-title">Digital Twin Real time System</div>
        <div class="time"></div>
        <div class="date"></div>
        <div class="week"></div>
    </div>
</template>
<script setup lang="ts">
import { Store } from '../store/index';
const ScreenHeaderBackground = Store.assetsMap.ScreenHeaderBackground.src;
</script>
<style scoped>
.header-container {
    width: 1894px;
    height: 78px;

    position: relative;

}

.title {
    /* background-image: linear-gradient(to bottom, #ffffff, #d5f7ff); */
    background: linear-gradient(90deg, #17A0F3 0%, #016EAE 100%);
    -webkit-background-clip: text; /* 用于 Safari 浏览器 */
    color: transparent; /* 隐藏文字原本颜色 */
    font-size: 32px;
    letter-spacing: 6px;

    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
}

.sub-title {
    color: #11f4fa;
    letter-spacing: 5px;
    font-size: 16px;

    position: absolute;
    bottom: 9px;
    left: 50%;
    transform: translateX(-50%);
}
</style>