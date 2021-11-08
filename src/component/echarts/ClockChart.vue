<template>
    <div :id="chartData.chartId" :style="chartSize"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'ClockChart',
    props: {
        chartData: Object
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
        reDrawChart() {
            if(this.myChart) {
                this.myChart.resize();
            }
        },
        createChart() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById(this.chartData.chartId));
            // 绘制图表

            const option = {
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
                                color: [[1, '#ffffff']],
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
                            shadowColor: '#ffffff',
                            color: '#ffffff',
                            shadowBlur: 10,
                            length: '40%',
                            width: 5,
                        },
                        itemStyle: {
                            // 表盘指针的颜色
                            color: "#ffffff",
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
                                color: [[1, '#ffffff']],
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
                            shadowColor: '#ffffff',
                            color: '#ffffff',
                            shadowBlur: 10,
                            length: '50%',
                            width: 4,
                        },
                        itemStyle: {
                            // 表盘指针的颜色
                            color: "#ffffff",
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
                        radius: '95%',
                        startAngle: 90,
                        endAngle: -269.999,
                        animation: 0,
                        axisLine: {
                            // 坐标轴线
                            lineStyle: {
                                color: [[1, '#ffffff']],
                                width: 1,
                                shadowColor: '#ffffff',
                                shadowBlur: 10,
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        pointer: {
                            // 秒指针
                            shadowColor: '#ffffff',
                            color: '#ffffff',
                            shadowBlur: 10,
                            length: '60%',
                            width: 3,
                        },
                        axisTick: {
                            show: false,
                            // 分钟分隔线，坐标轴小标记，阴影
                            length: 5,
                            lineStyle: {
                                color: 'auto',
                                shadowColor: '#ffffff',
                                shadowBlur: 10,
                            },
                        },
                        title: {
                            show: false,
                            textStyle: {
                                fontWeight: 'bolder',
                                fontSize: 10,
                                fontStyle: 'italic',
                                color: '#ffffff',
                                shadowColor: '#ffffff',
                                shadowBlur: 10,
                            },
                        },
                        itemStyle: {
                            // 表盘指针的颜色
                            color: "#ffffff",
                        },
                        detail: {
                            show: false,
                        },
                        data: [{ value: 0, name: '' }],
                    },
                    {
                        name: "白色圈刻度",
                        type: "gauge",
                        radius: "115%",
                        startAngle: 90,
                        endAngle: -269.999,
                        min: 0,
                        max: 12,
                        splitNumber: 12,
                        z: 8,
                        axisTick: {
                            // 分钟分隔线，坐标轴小标记，阴影
                            length: 5,
                            lineStyle: {
                                color: 'auto',
                                shadowColor: '#ffffff',
                                shadowBlur: 10,
                            },
                        },
                        splitLine: {
                            // 时分隔线，坐标轴小标记，阴影
                            length: 15,
                            lineStyle: {
                                width: 2,
                                color: "#ffffff",
                            }, //刻度节点线
                        },
                        axisLabel: {
                            // 时钟数字
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
                                color: '#ffffff',
                                shadowColor: '#ffffff',
                                shadowBlur: 10,
                            },
                        },
                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        detail: {
                            show: false,
                        },
                        data: [{
                            value: 0,
                            name: "",
                        }, ],
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
