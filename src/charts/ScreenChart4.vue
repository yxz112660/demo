<template>
    <div class="chart-container" ref="containerRef"></div>
    <div class="legend">单位：百分比</div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { fontSize } from '../utils';
import LinaChartIcon0 from '../assets/LinaChartIcon-0.png?data-url';

const containerRef = ref<HTMLDivElement>();
const chartRef = ref<echarts.ECharts>();

onMounted(() => {
    chartRef.value = echarts.init(containerRef.value);
    initChart();
});

const initChart = () => {
    chartRef.value?.setOption({
        grid: {
            top: fontSize(50),
            left: fontSize(50),
            right: fontSize(30),
            bottom: fontSize(50)
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#2f4b73'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: fontSize(14)
            },
            data: ['6/24', '6/25', '6/26', '6/27', '6/28', '6/29', '6/30']
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: 'rgba(55, 145, 207, 0.3)',
                    type: [5, 5]
                }
            },
            axisLabel: {
                align: 'right',
                formatter: '{value}%'
            }
        },
        series: [
            {
                data: [55, 85, 55, 48, 77, 77, 82],
                type: 'line',
                symbol: LinaChartIcon0,
                symbolSize: fontSize(20),
                lineStyle: {
                    width: fontSize(6),
                    color: '#23addc'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(35, 173, 220, .5)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(35, 173, 220, 0)'
                        }
                    ])
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
    color: #FFFFFF;
    font-size: 14px;
    position: absolute;
    top: 36px;
    left: 20px;
}
</style>