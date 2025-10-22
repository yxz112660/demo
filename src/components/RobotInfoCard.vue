<template>
    <div class="card-container" :style="{ backgroundImage: `url(${ StateBg })` }">
        <div class="mode-container" :style="{ backgroundImage: `url(${ OperatingModeBg })` }">
            <div class="label">机器人运行模式</div>
            <div class="message-box">
                <div class="text">{{ Store.appData.robotOperationMode.value }}</div>
            </div>
        </div>
        <div class="interface-icon" :style="{ backgroundImage: `url(${ OperatingModeIcon })` }"></div>
        <div class="status-container" :style="{ backgroundImage: `url(${ OperatingModeBg })` }">
            <div class="label">机器人状态</div>
            <div class="message-box">
                <div class="text">{{ Store.appData.robotStatus.value }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Store } from '../store/index';

const StateBg = Store.assetsMap.StateBg.src;
const OperatingModeBg = Store.assetsMap.OperatingModeBg.src;
const OperatingModeIcon = Store.assetsMap.OperatingModeIcon.src;
</script>

<style scoped>
    .card-container {
        width: 344px;
        height: 120px;
        position: relative;
        background-size: 100% 100%;
    }

    .mode-container {
        width: 121px;
        height: 94px;
        position: absolute;
        top: 11px;
        left: 20px;
        background-size: 100% 100%;
    }
    
    .mode-container .label {
        width: 98px;
        height: 20px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #999999;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        position: absolute;
        top: 15px;
        left: 13px;
    }

    .mode-container .message-box {
        width: 60px;
        height: 32px;
        background: rgba(0,81,146,0.65);
        border: 2px solid #2678C0;
        position: absolute;
        top: 45px;
        left: 32px;
    }

    .mode-container .message-box .text {
        width: 32px;
        height: 22px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        position: absolute;
        top: 5px;
        left: 14px;
    }

    .interface-icon {
        width: 47px;
        height: 35px;
        position: absolute;
        top: 39px;
        left: 148px;
        background-size: 100% 100%;
    }

    .status-container {
        width: 121px;
        height: 94px;
        position: absolute;
        top: 12px;
        left: 206px;
        background-size: 100% 100%;
    }

    .status-container .label {
        width: 70px;
        height: 20px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #999999;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        position: absolute;
        top: 13px;
        left: 27px;
    }

    .status-container .message-box {
        width: 66px;
        height: 32px;
        background: rgba(0,81,146,0.65);
        border: 2px solid #2678C0;
        position: absolute;
        top: 43px;
        left: 29px;
    }

    .status-container .message-box .text {
        width: 48px;
        height: 22px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        position: absolute;
        top: 5px;
        left: 14px;
    }
</style>