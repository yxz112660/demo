<template>
    <div class="chart-container" ref="containerRef"></div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import { fontSize } from '../utils';

const containerRef = ref<HTMLDivElement>();
const chartRef = ref<echarts.ECharts>();

onMounted(() => {
    chartRef.value = echarts.init(containerRef.value);
    initChart();

    window.addEventListener('reset', onWindowResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize);
})

const onWindowResize = () => {
    chartRef.value?.resize();
}

const getGaugeSerie = (startAngle: number, endAngle: number, value: number) => ({
    type: 'gauge',
    startAngle,
    endAngle,
    radius: fontSize(40),
    center: [fontSize(370), fontSize(190)],
    pointer: {
        show: false
    },
    progress: {
        show: true,
        overlap: false,
        clip: false,
        itemStyle: {
            color: '#2fc0ff'
        }
    },
    axisLine: {
        lineStyle: {
            width: fontSize(8),
            color: [[1, 'rgba(200, 255, 233, .1)']]
        }
    },
    splitLine: {
        show: false
    },
    axisTick: {
        show: false
    },
    axisLabel: {
        show: false
    },
    data: [
        {
            value,
            name: '',
            detail: {
                show: false
            }
        }
    ]
});

const getInnerGaugeSerie = () => ({
    type: 'gauge',
    startAngle: 45,
    endAngle: -225,
    radius: fontSize(28),
    center: [fontSize(370), fontSize(190)],
    pointer: {
        show: false
    },
    splitLine: {
        show: false
    },
    axisTick: {
        show: false
    },
    axisLabel: {
        show: false
    },
    progress: {
        show: true,
        overlap: false,
        clip: false,
        itemStyle: {
            color: '#2fc0ff'
        }
    },
    axisLine: {
        lineStyle: {
            width: fontSize(1.2),
            color: [[1, '#eeeeee']]
        }
    },
    data: [
        {
            value: 20,
            name: '',
            detail: {
                show: false
            }
        }
    ]
});

const getTopGraphicElement = () => ({
    type: 'group',
    right: fontSize(39),
    bottom: fontSize(79),
    children: [
        {
            type: 'rect',
            shape: {
                width: fontSize(4),
                height: fontSize(115)
            },
            bottom: fontSize(-100),
            style: {
                fill: 'rgba(200, 255, 233, .1)'
            }
        },
        {
            type: 'rect',
            shape: {
                width: fontSize(4),
                height: fontSize(70)
            },
            bottom: fontSize(-100),
            style: {
                fill: '#2fc0ff'
            }
        },
        {
            type: 'rect',
            shape: {
                width: fontSize(4),
                height: fontSize(10)
            },
            bottom: fontSize(-112),
            style: {
                fill: '#377da1'
            }
        },
        {
            type: 'rect',
            shape: {
                width: fontSize(4),
                height: fontSize(10)
            },
            bottom: fontSize(-120),
            rotation: 7,
            style: {
                fill: '#377da1'
            }
        }
    ]
});

const getCenterIconGraphicElement = () => ({
    type: 'group',
    top: fontSize(170),
    left: fontSize(350),
    children: [{
        type: 'circle',
        shape: {
            r: fontSize(20)
        },
        style: {
            fill: '#192f46'
        }
    }, {
        type: 'rect',
        left: fontSize(-10),
        bottom: fontSize(-8),
        shape: {
            width: fontSize(4),
            height: fontSize(12),
            r: [fontSize(5), fontSize(5), 0, 0]
        },
        style: {
            fill: '#63778f'
        }
    },
    {
        type: 'rect',
        left: fontSize(-2),
        bottom: fontSize(-8),
        shape: {
            width: fontSize(4),
            height: fontSize(16),
            r: [fontSize(5), fontSize(5), 0, 0]
        },
        style: {
            fill: '#63778f'
        }
    },
    {
        type: 'rect',
        right: fontSize(-9),
        bottom: fontSize(-8),
        shape: {
            width: fontSize(4),
            height: fontSize(8),
            r: [fontSize(5), fontSize(5), 0, 0]
        },
        style: {
            fill: '#63778f'
        }
    }]
});

const initChart = () => {
    chartRef.value?.setOption({
        title: [{
            text: '各线体当日计划量/完成量',
            textStyle: {
                color: '#d3e5f9',
                fontSize: fontSize(16)
            },
            left: fontSize(15)
        }, {
            text: '今\n日\n总\n统\n计',
            textStyle: {
                color: '#FFFFFF',
                fontSize: fontSize(14),
                fontWeight: 'normal',
                lineHeight: fontSize(20),
            },
            backgroundColor: 'rgba(200, 255, 233, .1)',
            borderRadius: fontSize(4),
            padding: fontSize(8),
            top: fontSize(36),
            left: fontSize(345)
        }],
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top: fontSize(7),
            right: fontSize(10),
            itemWidth: fontSize(20),
            itemHeight: fontSize(4),
            itemGap: fontSize(6),
            padding: 0,
            textStyle: {
                color: '#d3e5f9',
                fontSize: fontSize(14)
            },
            data: [{
                name: '计划量',
                itemStyle: {
                    color: '#1f5474'
                }
            }, {
                name: '完成量',
                itemStyle: {
                    color: '#30c0fc'
                }
            }, {
                name: '完成率',
                itemStyle: {
                    color: '#1a50cc'
                }
            }]
        },
        grid: [{
            top: '15%',
            left: '0%',
            right: fontSize(120),
            bottom: '10%',
            containLabel: true
        }, {
            width: '0%',
            height: '54%',
            right: '10%',
            bottom: '35%'
        }],
        xAxis: [{
            type: 'value',
            position: 'top',
            axisLabel: {
                fontSize: fontSize(12),
                formatter: (value: number, index: number) => {
                    return index === 0 ? `${value}` : `${value}万`;
                },
                color: '#d3e5f9'
            },
            splitLine: {
                lineStyle: {
                    width: fontSize(2),
                    color: '#FFFFFF',
                    type: [2, 3],
                    opacity: 0.3
                }
            }
        }, {
            type: 'category',
            boundaryGap: false,
            data: ['0', '20%', '40%', '60%', '80%', '100%'],
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        }, {
            gridIndex: 1,
            show: false,
        }],
        yAxis: [{
            type: 'category',
            data: ['1N', '1N', '1N', '1N', '1N', '1N'],
            boundaryGap: ['0%', '0%'],
            axisLabel: {
                color: '#d3e5f9',
                fontSize: fontSize(12)
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width: fontSize(2),
                    color: '#375064'
                }
            }
        },
        {
            type: 'category',
            gridIndex: 1,
            data: ['0', '20万', '40万', '60万', '80万', '100万'],
            axisLine: {
                show: false
            },
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                fontSize: fontSize(12)
            },
            position: 'right'
        }],
        series: [
            {
                name: '完成量',
                type: 'bar',
                stack: 'Work',
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: 'rgba(44, 194, 255, 0)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(44, 194, 255, 1)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                data: [20, 40, 60, 80, 60, 40]
            },
            {
                name: '计划量',
                type: 'bar',
                stack: 'Work',
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: 'rgba(31, 84, 116, 0.75)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(31, 84, 116, 1)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                data: [20, 40, 60, 80, 60, 40]
            },
            {
                name: '完成率',
                type: 'bar',
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: 'rgba(25, 80, 209, 0)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(25, 80, 209, 1)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                barGap: '133%',
                barCategoryGap: '50%',
                data: [20, 40, 60, 80, 60, 40]
            },
            getGaugeSerie(45, -29, 20),
            getGaugeSerie(-31, -89, 0),
            getGaugeSerie(-91, -149, 0),
            getGaugeSerie(-151, -225, 0),
            getInnerGaugeSerie()
        ],
        graphic: {
            elements: [getTopGraphicElement(), getCenterIconGraphicElement()]
        }
    });
}

</script>
<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
</style>