<template>
    <components
        ref="chartPanel"
        v-bind:style="{ width: chartWidth, height: '300px' }"
        :is="chartData.chartType"
        :chartData="chartData">
    </components>
</template>

<script>
import BarChart from '@/component/echarts/BarChart.vue';
import ClockChart from '@/component/echarts/ClockChart.vue';
import LineChart from '@/component/echarts/LineChart.vue';
import PieChart from '@/component/echarts/PieChart.vue';
import PoloChart from '@/component/echarts/PoloChart.vue';
import CockpitChart from '@/component/echarts/CockpitChart.vue';
import AccountChart from '@/component/echarts/AccountChart.vue';

export default {
    name: 'index',
    props: {
        chartData: Object
    },
    components: {
        BarChart,
        ClockChart,
        LineChart,
        PieChart,
        PoloChart,
        CockpitChart,
        AccountChart
    },
    data() {
        return {
            chartWidth: '',
            chartHeight: ''
        };
    },
    computed: {},
    mounted() {
        this.chartWidth = (this.$refs.chartPanel.$parent.$parent.$el.clientWidth) + 'px'
        this.$refs.chartPanel.createChart();
    },
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
