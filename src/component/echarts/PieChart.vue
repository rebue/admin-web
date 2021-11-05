<template>
    <div :id="chartData.chartId" :style="chartSize"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'PieChart',
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
    // mounted() {},
    // destroyed() {},
    methods: {
        createChart() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById(this.chartData.chartId));
            // 绘制图表

            const option = {
                // title: {
                //     text: 'Referer of a Website',
                //     subtext: 'Fake Data',
                //     left: 'center',
                // },
                tooltip: {
                    trigger: 'item',
                },
                // legend: {
                //     orient: 'vertical',
                //     left: 'left',
                // },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['0%', '80%'],
                        // roseType: 'radius',
                        data: this.chartData.list,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
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
