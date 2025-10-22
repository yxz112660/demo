<template>
    <div class="card-container">
        <div class="header-container">
            <div class="title"  :style="{ backgroundImage: `url(${ PreheatingFurnaceTitle })`,backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}">立体保温库</div>
        </div>
        <div class="content-container" :style="{ backgroundColor: '#ffffff'}">
            <div class="list-container">
                <div class="row" v-for="(data, index) in listData">
                    <div class="column grey" style="width: 52px; flex-grow: unset; flex-shrink: 0;">温度{{ index + 1 }}</div>
                    <div class="column blue" style="width: 42px; flex-grow: unset; flex-shrink: 0;">{{ data.temperature }}</div>
                    <div class="column grey">当前产品{{ index + 1 }}</div>
                    <div class="column blue">{{ data.product }}</div>
                    <div class="column grey" style="width: 100px; flex-shrink: 0;">已保温/冷却时间{{ index + 1 }}</div>
                    <div class="column blue" style="width: 52px; flex-grow: unset; flex-shrink: 0;">{{ data.roastedTime }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Store } from '../store/index';

const PreheatingFurnaceTitle = Store.assetsMap.PreheatingFurnaceTitle2.src;
const PreheatingFurnaceBg = Store.assetsMap.PreheatingFurnaceBg.src;
const ListBg = Store.assetsMap.ListBg.src;

const listData = Store.appData.insulationWarehouseList;
</script>
<style scoped>
.card-container {
    width: 557px;
    height: 179px;
}

.header-container {
    width: 557px;
    height: 42px;
    background-size: 100% 100%;
    position: absolute;
    top: 0px;
    left: 0px;
}

.header-container .title {
    width: 116px;
    height: 28px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 20px;
    color: #E4EFFD;
    line-height: 28px;
    text-align: left;
    font-style: normal;
    position: absolute;
    top: 4px;
    /* left: 36px; */
}

.content-container {
    width: 557px;
    height: 180px;
    background-size: 100% 100%;
    position: absolute;
    top: 28px;
    left: 0px;
}

.content-container .list-container {
    width: 515px;
    height: 133px;
    position: absolute;
    top: 24px;
    left: 21px;
    overflow: auto;
}

.content-container .list-container .row {
    width: 515px;
    height: 35px;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
}

.content-container .list-container .row .column {
    flex-grow: 1;
    text-align: center;
}

.white {
    width: 39px;
    height: 22px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #E4EEF6;
    line-height: 22px;
    text-align: left;
    font-style: normal;
}
.grey {
    width: 39px;
    height: 22px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 14px;
    color: #999999;
    line-height: 22px;
    text-align: left;
    font-style: normal;
}

.blue {
    width: 39px;
    height: 25px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 14px;
    color: #333333;
    line-height: 25px;
    text-align: left;
    font-style: normal;
}
</style>