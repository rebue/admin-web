<template>
    <div :id="chartData.chartId" :style="chartSize"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'LineChart',
    props: {
        chartData: Object,
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
            this.myChart = echarts.init(document.getElementById(this.chartData.chartId));
            // 绘制图表

            let xData = (function() {
                const data = [];
                for (let i = 1; i < 11; i++) {
                    data.push(i + '日');
                }
                return data;
            })();

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                },
                grid: {
                    borderWidth: 0,
                    top: 50,
                    right: 20,
                    bottom: 70,
                    textStyle: {
                        color: '#fff',
                    },
                },
                legend: {
                    data: ['访问量', '订单量'],
                },

                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        data: xData,
                    },
                ],

                yAxis: [
                    {
                        type: 'value',
                    },
                ],
                dataZoom: [
                    {
                        show: false,
                        height: 20,
                        bottom: 30,
                        start: 0,
                        end: 100,
                    },
                    {
                        type: 'inside',
                        show: true,
                        height: 15,
                        start: 1,
                        end: 35,
                    },
                ],
                series: [
                    {
                        name: '访问量',
                        type: 'line',
                        symbolSize: 10,
                        symbol: 'circle',
                        markPoint: {
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            },
                            data: [
                                {
                                    type: 'max',
                                    name: '最大值',
                                },
                                {
                                    type: 'min',
                                    name: '最小值',
                                },
                            ],
                        },
                        data: [509, 917, 2455, 2610, 2719, 3033, 3044, 3085, 2708, 2809, 2117],
                    },
                    {
                        name: '订单量',
                        type: 'line',
                        symbolSize: 10,
                        symbol: 'circle',
                        markPoint: {
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            },
                            data: [
                                {
                                    type: 'max',
                                    name: '最大值',
                                },
                                {
                                    type: 'min',
                                    name: '最小值',
                                },
                            ],
                        },
                        data: [2136, 3693, 2962, 3810, 3519, 3484, 3915, 3823, 3455, 4310, 4019],
                    },
                ],
            };

            this.myChart.setOption(option);
            this.myChart.resize();
        },
    },
    watch: {},
    filters: {},
};
</script>

<style scoped></style>
