<template>
    <div ref="echart" :style="chartSize"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'BarChart',
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
    // mounted() {},
    // destroyed() {},
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
                    data: this.chartData.list[i],
                    type: 'bar',
                    barWidth: '30%',
                    itemStyle: {
                        barBorderRadius: [30, 30, 0, 0],
                    },
                };
                arr.push(obj);
            }
            var option = {
                legend: {
                    data: this.chartData.legendData,
                },
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
                xAxis: {
                    type: 'category',
                    data: this.chartData.listName,
                },
                yAxis: {
                    type: 'value',
                },
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
