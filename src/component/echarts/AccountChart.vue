<template>
    <div :id="chartData.chartId" :style="chartSize"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'AccountChart',
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
        this.createChart()
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
            let num = 0
            for(const i in this.chartData.list) {
                num += Number(this.chartData.list[i].value)
            }
            var option = {
                color: ['#00d88a', '#f26c55', '#f4e051'],
                legend: {
                    icon: 'rect',
                    textStyle: {
                        color: '#fff',
                    },
                    data: this.chartData.list,
                },
                tooltip: {
                    trigger: 'item',
                },
                title: [
                    {
                        text: num,
                        subtext: '账号总数',
                        top: '40%',
                        left: '49%',
                        textAlign: 'center',
                        subtextStyle: {
                            color: '#fff',
                            fontSize: this.chartData.fontNum * 2.5,
                            align: 'center',
                        },
                        textStyle: {
                            color: '#10fba6',
                            fontSize: this.chartData.fontNum * 6,
                        },
                    },
                ],
                series: [
                    //环形
                    {
                        name: '',
                        type: 'pie',
                        radius: ['55%', '80%'],
                        center: ['50%', '50%'],
                        hoverAnimation: false,
                        itemStyle: {
                            borderRadius: 5,
                            borderColor: '#5497e7',
                            borderWidth: 5
                        },
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false,
                            },
                        },
                        zlevel: 1,
                        labelLine: {
                            normal: {
                                show: false,
                            },
                        },
                        data: this.chartData.list,
                    }
                ]
            };

            this.myChart.setOption(option);
            this.myChart.resize();
        },
    },
    watch: {},
    filters: {}
};
</script>

<style scoped></style>
