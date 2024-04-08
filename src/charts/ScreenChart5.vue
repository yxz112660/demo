<template>
    <div class="chart-container" ref="containerRef"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { fontSize } from '../utils';
import LinaChartIcon1 from '../assets/LinaChartIcon-1.png?data-url';

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
            right: fontSize(50),
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
                color: 'rgba(220, 220, 255, 0.7)',
                fontSize: fontSize(14)
            },
            data: ['1N1', '1N2', '1N3', '1N4', '1N5', '1N6', '1N7', '1N8', '1N9']
        },
        yAxis: [{
            splitLine: {
                show: false
            }
        }, {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: 'rgba(55, 145, 207, 0.3)',
                    type: [5, 5]
                }
            },
            axisLabel: {
                color: 'rgba(220, 220, 255, 0.7)',
                align: 'left',
                formatter: '{value}%'
            }
        }],
        aria: {
            enabled: true,
            decal: {
                show: true
            }
        },
        series: [
            {
                data: [20, 35, 24, 16, 48, 44, 34, 31, 35],
                type: 'bar',
                barWidth: fontSize(16),
                itemStyle: {
                    decal: {
                        symbol: 'circle',
                        color: 'rgba(24, 180, 241, 1)',
                        dashArrayX: [
                            fontSize(5), fontSize(0)
                        ],
                        dashArrayY: [fontSize(7), fontSize(1)]
                    }
                },
                barGap: '-100%',
                // barCategoryGap: '50%',
            },
            {
                type: 'bar',
                showBackground: false,
                barWidth: fontSize(16),
                itemStyle: {
                    decal: {
                        symbol: 'none'
                    },
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                data: [12, 12, 12, 5, 12, 30, 25, 29, 24]
            },
            {
                yAxisIndex: 1,
                data: [54, 34, 56, 62, 60, 64, 60, 90, 40],
                type: 'line',
                symbol: LinaChartIcon1,
                symbolSize: fontSize(20),
                lineStyle: {
                    color: '#fd6600'
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