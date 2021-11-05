<template>
    <div :id="chartData.chartId" :style="chartSize"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'CockpitChart',
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
        this.createChart()
    },
    // destroyed() {},
    methods: {
        createChart() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById(this.chartData.chartId));

            // 绘制图表
            const fontNum = this.chartData.fontNum;
            var colorSet = [
                [this.chartData.list[0].value/100, '#468EFD'],
                [1, '#15337C']
            ];
            var rich = {
                white: {
                    fontSize: 4 * fontNum,
                    color: '#fff',
                    padding: [3, 0, 0, 0]
                },
                bule: {
                    fontSize: 6 * fontNum,
                    color: '#fff',
                },
                total: {
                    fontSize: 4 * fontNum,
                    color: '#fff',
                },
                radius: {
                    width: 350,
                    height: 80,
                    borderWidth: 1,
                    borderColor: '#0092F2',
                    fontSize: 6 * fontNum,
                    color: '#fff',
                    backgroundColor: '#1B215B',
                    borderRadius: 20,
                    textAlign: 'center',
                },
                // size: {
                //     height: 400,
                //     padding: [100, 0, 0, 0]
                // }
            }
            const option = {
                tooltip: {
                        formatter: "{a} <br/>{b} : {c}%"
                },
                series: [
                    { //内圆
                        type: 'pie',
                        radius: '100%',
                        center: ['50%', '50%'],
                        z: 0,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.RadialGradient(.5, .5, 1, [{
                                        offset: 0,
                                        color: 'rgba(17,24,43,0)'
                                    },
                                    {
                                        offset: .5,
                                        // color: '#1E2B57'
                                        color: 'rgba(28,42,91,.6)'
                                    },
                                    {
                                        offset: 1,
                                        color: '#141C33',
                                        // color:'rgba(17,24,43,0)'
                                    }
                                ], false),
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                        },
                        hoverAnimation: false,
                        label: {
                            show: false,
                        },
                        tooltip: {
                            show: false
                        }
                    },
                    {
                        type: 'gauge',
                        name: '外层辅助',
                        radius: '78%',
                        startAngle: '225',
                        endAngle: '-45',
                        min: 0,
                        max: 100,
                        splitNumber: 4,
                        pointer: {
                            show: false
                        },
                        title: {
                            show: true,
                            color: '#fff',
                            fontSize: 2 * fontNum,
                            "offsetCenter": ['0%', "82%"],
                        },
                        detail: {
                            formatter: function(value) {
                                const num = Math.round(value);
                                return '{total|' + num + '}';
                            },
                            rich: rich,
                            "offsetCenter": ['0%', "104%"],
                        },
                        data: [ this.chartData.list[1] ],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [
                                    [1, '#00FFFF']
                                ],
                                width: 2,
                                opacity: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            length: -45,
                            lineStyle: {
                                color: '#051932',
                                width: 0,
                                type: 'solid',
                            },
                        },
                        axisLabel: {
                            show: true,
                            formatter: function(value) { return  value + '%'},
                            fontSize: 2 * fontNum,
                            color: '#ffffff'
                        },

                    },
                    {
                        type: 'gauge',
                        radius: '73%',
                        startAngle: '225',
                        endAngle: '-45',
                        pointer: {
                            show: false
                        },
                        detail: {
                            formatter: function(value) {
                                const num = Math.round(value);
                                return '{bule|' + num + '}{white|%}' + '{size|' + '}';
                            },
                            rich: rich,
                            "offsetCenter": ['0%', "0%"],
                        },
                        data: [ this.chartData.list[0] ],
                        title: {
                            show: true,
                            color: '#fff',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 2 * fontNum,
                            "offsetCenter": ['0%', "30%"],
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colorSet,
                                width: 25,
                                // shadowBlur: 15,
                                // shadowColor: '#B0C4DE',
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                opacity: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            length: 25,
                            lineStyle: {
                                color: '#00377a',
                                width: 2,
                                type: 'solid',
                            },
                        },
                        axisLabel: {
                            show: false
                        },
                    },
                    {
                        name: '灰色内圈', //刻度背景
                        type: 'gauge',
                        z: 2,
                        radius: '56%',
                        startAngle: '225',
                        endAngle: '-45',
                        //center: ["50%", "75%"], //整体的位置设置
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [1, '#018DFF']
                                ],
                                width: 2,
                                opacity: 1, //刻度背景宽度
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        // data: [{
                        //     show: false,
                        //     value: '80'
                        // }], //作用不清楚
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        detail: {
                            show: false
                        }
                    },
                    {
                        name: "白色圈刻度",
                        type: "gauge",
                        radius: "65%",
                        startAngle: 225, //刻度起始
                        endAngle: -45, //刻度结束
                        z: 4,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            length: 10, //刻度节点线长度
                            lineStyle: {
                                width: 2,
                                color: 'rgba(1,244,255, 0.9)'
                            } //刻度节点线
                        },
                        axisLabel: {
                            color: 'rgba(255,255,255,0)',
                            fontSize: 6.6 * fontNum,
                        }, //刻度节点文字颜色
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0
                            }
                        },
                        detail: {
                            show: false
                        },
                        data: [{
                            value: 0,
                            name: ""
                        }]
                    },
                    { //内圆
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        z: 1,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.RadialGradient(.5, .5, .8, [{
                                        offset: 0,
                                        color: '#4978EC'
                                    },
                                    {
                                        offset: .5,
                                        color: '#1E2B57'
                                    },
                                    {
                                        offset: 1,
                                        color: '#141F3D'
                                    }
                                ], false),
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                        },
                        hoverAnimation: false,
                        label: {
                            show: false,
                        },
                        tooltip: {
                            show: false
                        },
                        data: [100],
                    },
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
