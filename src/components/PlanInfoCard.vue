<template>
    <div class="card-container" :style="{ backgroundImage: `url(${ PlanBg })` }">
        <div class="plan-icon-1" :style="{ backgroundImage: `url(${ PlanIcon1 })` }"></div>
        <div class="plan-count-label">计划数量</div>
        <div class="plan-count-value">{{ Store.appData.planCount }}</div>
        <div class="plan-count-unit">件</div>
        <div class="plan-icon-2" :style="{ backgroundImage: `url(${ PlanIcon2 })` }"></div>
        <div class="complete-count-label">完成数量</div>
        <div class="complete-count-value">{{ Store.appData.completeCount }}</div>
        <div class="complete-count-unit">件</div>
        <div class="plan-icon-3" :style="{ backgroundImage: `url(${ PlanIcon3 })` }"></div>
        <div class="loss-count-label">报废数量</div>
        <div class="loss-count-value">{{ Store.appData.lossCount }}</div>
    </div>
</template>
<script lang="ts" setup>
import { Store } from '../store/index';

const PlanBg = Store.assetsMap.PlanBg.src;
const PlanIcon1 = Store.assetsMap.PlanIcon1.src;
const PlanIcon2 = Store.assetsMap.PlanIcon2.src;
const PlanIcon3 = Store.assetsMap.PlanIcon3.src;
</script>
<style scoped>
.card-container {
    width: 390px;
    height: 120px;
    background-size: 100% 100%;
    position: relative;
}

.plan-icon-1 {
    width: 34px;
    height: 34px;
    background-size: 100% 100%;
    position: absolute;
    top: 17px;
    left: 20px;
}

.plan-count-label {
    width: 56px;
    height: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    position: absolute;
    top: 24px;
    left: 59px;
}

.plan-count-value {
    width: 80px;
    height: 50px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28px;
    color: #616466;
    line-height: 50px;
    text-align: right;
    font-style: normal;
    position: absolute;
    top: 7px;
    left: 123px;
}

.plan-count-unit {
    width: 35px;
    height: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    position: absolute;
    top: 24px;
    left: 198px;
}

.plan-icon-2 {
    width: 35px;
    height: 35px;
    position: absolute;
    top: 69px;
    left: 19px;
    background-size: 100% 100%;
}

.complete-count-label {
    width: 63px;
    height: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    position: absolute;
    top: 77px;
    left: 59px;
}

.complete-count-value {
    width: 65px;
    height: 50px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28px;
    color: #616466;
    line-height: 50px;
    text-align: right;
    font-style: normal;
    position: absolute;
    top: 60px;
    left: 138px;
}

.complete-count-unit {
    width: 35px;
    height: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    position: absolute;
    top: 77px;
    left: 198px;
}
.plan-icon-3 {
    width: 64px;
    height: 64px;
    position: absolute;
    top: 33px;
    left: 240px;
    background-size: 100% 100%;
}
.loss-count-label {
    width: 64px;
    height: 22px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #999999;
    line-height: 22px;
    text-align: right;
    font-style: normal;
    position: absolute;
    top: 71px;
    left: 318px;
}
.loss-count-value {
    width: 44px;
    height: 50px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24px;
    color: #FF0303;
    line-height: 50px;
    text-align: right;
    font-style: normal;
    position: absolute;
    top: 30px;
    left: 313px;
}
</style>