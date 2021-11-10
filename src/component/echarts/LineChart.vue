<template>
    <div ref="echart" :style="chartSize"></div>
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
            myChart: null
        };
    },
    computed: {},
    methods: {
        reDrawChart() {
            if(this.myChart) {
                this.myChart.resize();
            }
        },
        createChart() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(this.$refs.echart);

            // 绘制图表
            let arr = [];
            let obj = {};
            for (const i in this.chartData.list) {
                obj = {
                    name: this.chartData.legendData[i],
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
                    data: this.chartData.list[i],
                }
                arr.push(obj);
            };

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
                    left: 50,
                    textStyle: {
                        color: '#fff',
                    },
                },
                legend: {
                    data: this.chartData.legendData,
                },

                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: this.chartData.listName,
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
                series: arr,
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
