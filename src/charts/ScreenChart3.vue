<template>
    <div class="legend">
        <div class="block"></div>
        <div class="name">功率KW</div>
    </div>
    <div class="chart-container" ref="containerRef"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { fontSize } from '../utils';

const containerRef = ref<HTMLDivElement>();
const chartRef = ref<echarts.ECharts>();

onMounted(() => {
    chartRef.value = echarts.init(containerRef.value);
    initChart();
});

const initChart = () => {
    chartRef.value?.setOption({
        grid: {
            top: fontSize(26),
            left: fontSize(50),
            right: fontSize(30),
            bottom: fontSize(30)
        },
        xAxis: {
            type: 'category',
            data: ['01', '02', '03', '04', '05', '06', '07'],
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    type: [5, 5]
                }
            },
            axisLabel: {
                // margin: fontSize(-30)
            }
        },
        aria: {
            enabled: true,
            decal: {
                show: true
            }
        },
        series: [
            {
                name: '功率KW',
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                barWidth: fontSize(24),
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(51, 191, 250, 0.4)',
                },
                itemStyle: {
                    color: 'rgba(51, 191, 250, 0.6)',
                }
            }
        ]
    });
}
</script>
<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
}

.legend {
    width: 72px;
    height: 12px;
    position: absolute;
    top: 12px;
    right: 18px;
    display: flex;
    align-items: center;
}

.legend .block {
    width: 10px;
    height: 10px;
    margin-right: 10px;
    background-color: #aae1ff;
}

.legend .name {
    color: #FFFFFF;
    font-size: 14px;
}
</style>