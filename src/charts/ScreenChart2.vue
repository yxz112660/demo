<template>
    <div class="chart-container" ref="containerRef"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { fontSize } from '../utils';

const containerRef = ref<HTMLDivElement>();
const chartRef = ref<echarts.ECharts>();
const chartData = ref<{
    value: number;
    name: string;
    itemStyle: {
        color: string;
    };
}[]>([]);

onMounted(() => {
    getChartData();
    chartRef.value = echarts.init(containerRef.value);
    initChart();
    // initMeshChart();
});

const getChartData = () => {
    chartData.value = [
        { value: 1215, name: '深圳车间', itemStyle: { color: '#3576ec' } },
        { value: 500, name: '测量中心', itemStyle: { color: '#5d7090' } },
        { value: 520, name: 'PD7', itemStyle: { color: '#00b75d' } },
        { value: 120, name: 'PD6', itemStyle: { color: '#bb9415' } },
        { value: 450, name: 'PD5', itemStyle: { color: '#6e38e8' } },
        { value: 650, name: 'PD3', itemStyle: { color: '#20b0e4' } }
    ];

    chartData.value.sort(function (a, b) { return b.value - a.value; });
}

const initChart = () => {
    chartRef.value?.setOption({
        title: {
            text: '3600',
            subtext: 'NVR问题',
            top: '38%',
            right: '67%',
            textStyle: {
                color: '#FFFFFF',
                fontSize: fontSize(24)
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: [{
            top: 'middle',
            left: '50%',
            orient: 'vertical',
            align: 'left',
            itemWidth: fontSize(14),
            itemGap: fontSize(18),
            textStyle: {
                color: '#FFFFFF',
                fontSize: fontSize(18),
                padding: [0, 0, 0, fontSize(14)],
                fontWeight: 'lighter'
            }
        }, {
            top: 'middle',
            left: 'right',
            orient: 'vertical',
            align: 'right',
            itemGap: fontSize(18),
            icon: 'none',
            textStyle: {
                color: '#FFFFFF',
                fontSize: fontSize(18),
                padding: [0, 0, 0, fontSize(14)]
            },
            formatter: (name: string) => {
                return {
                    '深圳车间': 1215,
                    '测量中心': 500,
                    'PD7': 520,
                    'PD6': 120,
                    'PD5': 450,
                    'PD3': 650
                }[name];
            }
        }],
        series: [
            {
                name: 'NVR 问题',
                type: 'pie',
                radius: [fontSize(60), fontSize(94)],
                top: 'middle',
                right: '50%',
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: false
                    }
                },
                labelLine: {
                    show: false
                },
                data: chartData.value
            },
            initMeshChart()
        ]
    });
}

const initMeshChart = () => {
    const sum = chartData.value.reduce(function (prev, curr) { return prev + curr.value; }, 0);
    const startAngle = 90;

    const endAngle = startAngle - (chartData.value[0].value / sum) * 360;

    console.log(startAngle, endAngle);

    return {
        type: 'pie',
        radius: [fontSize(60), fontSize(110)],
        top: 'middle',
        right: '50%',
        startAngle,
        endAngle,
        label: {
            show: false
        },
        emphasis: {
            label: {
                show: false
            }
        },
        labelLine: {
            show: false
        },
        data: [{
            ...chartData.value[0],
            itemStyle: {
                color: chartData.value[0].itemStyle.color,
                opacity: 0.5
            }
        }]
    }
};
</script>
<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
</style>