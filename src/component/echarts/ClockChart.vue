<template>
    <div :id="chartName" :style="chartSize"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'ClockChart',
    props: {
        chartName: String,
        chartData: Number,
    },
    components: {},
    data() {
        return {
            chartSize: {
                width: '100%',
                height: '100%',
            },
            myChart: null,
        };
    },
    computed: {},
    // created() {},
    mounted() {
        this.createChart();
    },
    // destroyed() {},
    methods: {
        createChart() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById(this.chartName));
            // 绘制图表

            const option = {
                tooltip: {
                    show: false,
                    formatter: '{a} <br/>{c} {b}',
                },
                series: [
                    {
                        name: '小时',
                        type: 'gauge',
                        min: 0,
                        max: 12,
                        splitNumber: 12,
                        center: ['50%', '50%'],
                        radius: '90%',
                        startAngle: 90,
                        endAngle: -269.999,
                        animation: 0,
                        axisLine: {
                            // 坐标轴线
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                color: [[1, '#d73d32']],
                                width: 0,
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            // 坐标轴小标记
                            show: false,
                        },
                        splitLine: {
                            // 分隔线
                            show: false,
                        },
                        pointer: {
                            // 分隔线
                            shadowColor: '#000000', //默认透明
                            color: '#f00',
                            shadowBlur: 10,
                            length: '40%',
                            width: 5,
                        },
                        detail: {
                            show: false,
                        },
                        data: [{ value: 0, name: '' }],
                    },
                    {
                        name: '分钟',
                        type: 'gauge',
                        min: 0,
                        max: 12,
                        splitNumber: 12,
                        radius: '90%',
                        startAngle: 90,
                        endAngle: -269.999,
                        animation: 0,
                        axisLine: {
                            // 坐标轴线
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                color: [[1, '#f4b400']],
                                width: 0,
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            // 坐标轴小标记
                            show: false,
                        },
                        splitLine: {
                            // 分隔线
                            show: false,
                        },
                        pointer: {
                            // 分隔线
                            shadowColor: '#000000', //默认透明
                            color: 'f00',
                            shadowBlur: 10,
                            length: '60%',
                            width: 4,
                        },
                        detail: {
                            show: false,
                        },
                        data: [{ value: 0, name: '' }],
                    },
                    {
                        name: '秒',
                        type: 'gauge',
                        min: 0,
                        max: 12,
                        splitNumber: 12,
                        radius: '90%',
                        startAngle: 90,
                        endAngle: -269.999,
                        animation: 0,
                        axisLine: {
                            // 坐标轴线
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                color: [[1, '#1e90ff']],
                                width: 2,
                                shadowColor: '#000000', //默认透明
                                shadowBlur: 10,
                            },
                        },
                        axisLabel: {
                            // 坐标轴小标记
                            formatter: function(v) {
                                switch (v + '') {
                                    case '0':
                                        return '';
                                    default:
                                        return v;
                                }
                            },
                            textStyle: {
                                // 小时数字属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#f00',
                                shadowColor: '#000000', //默认透明
                                shadowBlur: 10,
                            },
                        },
                        splitLine: {
                            // 小时分隔线
                            length: 15, // 属性length控制线长
                            lineStyle: {
                                // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 3,
                                color: '#1e90ff',
                                // shadowColor: '#000000', //默认透明
                                // shadowBlur: 10,
                            },
                        },
                        axisTick: {
                            // 分钟分隔线，坐标轴小标记，阴影
                            length: 10, // 属性length控制线长
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor: '#1e90ff', //默认透明
                                shadowBlur: 10,
                            },
                        },
                        pointer: {
                            // 秒针
                            shadowColor: '#000000', //默认透明
                            shadowBlur: 10,
                            length: '80%',
                            width: 3,
                        },
                        title: {
                            show: false,
                            textStyle: {
                                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 10,
                                fontStyle: 'italic',
                                color: '#000000',
                                shadowColor: '#000000', //默认透明
                                shadowBlur: 10,
                            },
                        },
                        detail: {
                            show: false,
                        },
                        data: [{ value: 0, name: '' }],
                    },
                ],
            };

            this.myChart.resize();

            setInterval(() => {
                const d = new Date();
                const h = d.getHours() >= 12 ? d.getHours() - 12 : d.getHours();
                const m = d.getMinutes() / 5;
                const s = d.getSeconds() / 5;

                option.series[0].data[0].value = h;
                option.series[1].data[0].value = m.toFixed(1);
                option.series[2].data[0].value = s.toFixed(1);
                this.myChart.setOption(option);
            }, 1000);
        },
    },
    watch: {},
    filters: {},
};
</script>

<style scoped></style>
