<template>
    <components v-bind:style="{ width: chartWidth, height: '300px' }" :is="chartData.chartType" :chartData="chartData" ref="chartPanel"></components>
</template>

<script>
import BarChart from '@/component/echarts/BarChart.vue';
import ClockChart from '@/component/echarts/ClockChart.vue';
import LineChart from '@/component/echarts/LineChart.vue';
import PieChart from '@/component/echarts/PieChart.vue';
import PoloChart from '@/component/echarts/PoloChart.vue';
import CockpitChart from '@/component/echarts/CockpitChart.vue';

export default {
    name: 'index',
    props: {
        chartData: Object
    },
    components: { BarChart, ClockChart, LineChart, PieChart, PoloChart, CockpitChart },
    data() {
        return {
            chartWidth: ''
        };
    },
    computed: {},
    // created() {},
    mounted() {
        setTimeout(() => {
            this.chartWidth = (this.$refs.chartPanel.$parent.$parent.$el.clientWidth) + 'px'
            this.$refs.chartPanel.createChart();
        }, 100)
    },
    // destroyed() {},
    methods: {
        reDrawChart() {
            this.chartWidth = (this.$refs.chartPanel.$parent.$parent.$el.clientWidth - 20) + 'px'
            this.$refs.chartPanel.reDrawChart();
        }
    },
    watch: {},
    filters: {}
};
</script>

<style scoped></style>
