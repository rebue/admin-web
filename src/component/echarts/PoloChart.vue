<template>
    <div ref="echart" :style="chartSize"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill';

export default {
    name: 'PoloChart',
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
        reDrawChart() {
            if(this.myChart) {
                this.myChart.resize();
            }
        },
        createChart() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(this.$refs.echart);
            // 绘制图表
            const num = this.chartData / 100;

            const option = {
                series: [
                    {
                        type: 'liquidFill',
                        radius: '85%',
                        center: ['50%', '50%'],
                        data: [num, num, num], // data个数代表波浪数
                        backgroundStyle: {
                            borderWidth: 1,
                            color: 'rgb(255,0,255,0.1)',
                        },
                        // 修改波浪颜色
                        // color:['yellow'], 所有波浪一个颜色
                        // color:['yellow','red','pink'], //每个波浪不同颜色，颜色数组长度为对应的波浪个数
                        label: {
                            normal: {
                                formatter: this.chartData + '%',
                                textStyle: {
                                    fontSize: 26,
                                },
                            },
                        },
                        outline: {
                            show: false,
                        },
                    },
                    {
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['85%', '89%'],
                        hoverAnimation: false,
                        data: [
                            {
                                name: '',
                                type: 'bar',
                                roundCap: true,
                                value: this.chartData,
                                labelLine: {
                                    show: false,
                                },
                                itemStyle: {
                                    color: '#1890ff',
                                },
                                emphasis: {
                                    labelLine: {
                                        show: false,
                                    },
                                    itemStyle: {
                                        color: '#1890ff',
                                    },
                                },
                            },
                            {
                                //画剩余的刻度圆环
                                name: '',
                                value: 100 - this.chartData,
                                itemStyle: {
                                    color: 'rgb(0, 0, 0, 0.1)',
                                },
                                label: {
                                    show: false,
                                },
                                labelLine: {
                                    show: false,
                                },
                                emphasis: {
                                    labelLine: {
                                        show: false,
                                    },
                                    itemStyle: {
                                        color: 'rgba(255,255,255,0)',
                                    },
                                },
                            },
                        ],
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
