<template>
    <components style="width: 500px; height: 300px;" :is="chartData.chartType" :chartData="chartData" ref="chartPanel"></components>
</template>

<script>
import BarChart from '@/component/echarts/BarChart.vue';
import ClockChart from '@/component/echarts/ClockChart.vue';
import LineChart from '@/component/echarts/LineChart.vue';
import PieChart from '@/component/echarts/PieChart.vue';
import PoloChart from '@/component/echarts/PoloChart.vue';
export default {
    name: 'index',
    props: {
        chartData: Object
    },
    components: { BarChart, ClockChart, LineChart, PieChart, PoloChart },
    data() {
        return {};
    },
    computed: {},
    // created() {},
    // mounted() {},
    // destroyed() {},
    methods: {},
    watch: {},
    filters: {}
};
</script>

<style scoped></style>
