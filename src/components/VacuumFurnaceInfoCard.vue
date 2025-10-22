<template>
    <div class="card-container" :style="{ backgroundImage: `url(${ VacuumFurnaceBg })` }">
        <div class="current-label">真空炉当前产品</div>
        <div class="current-value">{{ Store.appData.vacuumFurnaceCurrentProduct.value }}</div>
        <div class="divider"></div>
        <div class="time-label">真空炉已熔炼时间</div>
        <div class="time-value">{{ Store.appData.vacuumFurnaceMeltingTime }}min</div>
    </div>
</template>
<script lang="ts" setup>
import { Store } from '../store/index';

const VacuumFurnaceBg = Store.assetsMap.VacuumFurnaceBg.src;
</script>
<style scoped>
.card-container {
    width: 750px;
    height: 40px;
    background-size: 100% 100%;
}

.current-label {
    width: 112px;
    height: 22px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 14px;
    color: #999999;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    position: absolute;
    top: 8px;
    left: 37px;
}

.current-value {
    width: 120px;
    height: 25px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 14px;
    color: #0096FF;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    position: absolute;
    top: 7px;
    left: 175px;
}

.divider {
    width: 2px;
    height: 20px;
    background: #FFFFFF;
    border-radius: 1px;
    border: 1px solid #979797;
    opacity: 0.12;
    position: absolute;
    top: 11px;
    left: 348px;
}

.time-label {
    width: 128px;
    height: 22px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 14px;
    color: #999999;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    position: absolute;
    top: 8px;
    left: 402px;
}

.time-value {
    width: 53px;
    height: 25px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 14px;
    color: #0096FF;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    position: absolute;
    top: 7px;
    left: 556px;
}
</style>