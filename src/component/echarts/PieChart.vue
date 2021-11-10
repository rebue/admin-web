<template>
    <div ref="echart" :style="chartSize"></div>
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

            const option = {
                tooltip: {
                    trigger: 'item',
                },
                // legend: {
                //     orient: 'vertical',
                //     left: 'left',
                // },
                series: [
                    {
                        name: '',
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
