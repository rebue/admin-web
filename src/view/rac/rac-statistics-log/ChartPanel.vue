<template>
    <div class="chart-panel">
        <div class="chart-ti">
            <h3 class="chart-title">{{ item.title }}</h3>
            <div class="chart-right">
                <a-icon type="calendar" @click="handleShow(item)" />
            </div>
        </div>
        <echart ref="chart" :chartData="item.data"></echart>
    </div>
</template>

<script>
import echart from '@/component/echarts/index.vue';
export default {
    name: 'ChartPanel',
    props: {
        item: Object,
    },
    components: {
        echart,
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {
        window.onresize = () => {
            // this.$refs.chart.reDrawChart();
            for (const i in this.chartData) {
                this.$refs.chart[i].reDrawChart();
            }
        };
    },
    methods: {
        handleShow(item) {
            this.$emit('handleShow', item);
        },
        reload() {
            console.log(111);
            this.$forceUpdate();
        },
    },
    watch: {},
    filters: {},
};
</script>

<style lang="less" scoped>
.chart-panel {
    background: #ffffff;
    border-radius: 10px;
    .chart-ti {
        display: flex;
        justify-content: space-between;
        .chart-title {
            padding: 10px 20px;
        }
        .chart-right {
            font-size: 20px;
            padding: 5px 20px 0 0;
        }
    }
}
</style>
