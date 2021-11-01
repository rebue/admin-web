<template>
    <a-card class="manager-card" :bordered="false">
        <div class="title">账号总概况</div>
        <div class="top-panel">
            <a-row :gutter="32">
                <a-col class="gutter-row" :span="6">
                    <div class="top-li shadow">
                        <div class="li-title">账号总数</div>
                        <div class="li-num">15376</div>
                    </div>
                </a-col>
                <a-col class="gutter-row" :span="6">
                    <div class="top-li shadow">
                        <div class="li-title">总认证数</div>
                        <div class="li-num">15376</div>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="title">今日账号数据统计</div>
        <div class="info-panel shadow">
            <a-row>
                <a-col :span="infoIndex">
                    <div class="li">
                        <div>登录总数</div>
                        <div>1245</div>
                    </div>
                </a-col>
                <a-col :span="infoIndex">
                    <div class="li">
                        <div>添加总数</div>
                        <div>1245</div>
                    </div>
                </a-col>
                <a-col :span="infoIndex">
                    <div class="li">
                        <div>删除总数</div>
                        <div>1245</div>
                    </div>
                </a-col>
                <a-col :span="infoIndex">
                    <div class="li">
                        <div>修改总数</div>
                        <div>1245</div>
                    </div>
                </a-col>
                <a-col :span="infoIndex">
                    <div class="li">
                        <div>密码修改总数</div>
                        <div>1245</div>
                    </div>
                </a-col>
                <a-col :span="infoIndex">
                    <div class="li">
                        <div>认证成功总数</div>
                        <div>1245</div>
                    </div>
                </a-col>
                <a-col :span="infoIndex">
                    <div class="li">
                        <div>认证失败总数</div>
                        <div>1245</div>
                    </div>
                </a-col>
            </a-row>
        </div>

        <a-row :gutter="32">
            <a-col :span="12">
                <div class="shadow">
                    <h3 class="chart-title">今日访问情况</h3>
                    <echart :chartData="lineChartData"></echart>
                </div>
            </a-col>
            <a-col :span="12">
                <div class="shadow">
                    <h3 class="chart-title">今日访问情况</h3>
                    <echart :chartData="barChartData"></echart>
                </div>
            </a-col>
        </a-row>
    </a-card>
</template>

<script>
// import LineChart from '@/component/echarts/LineChart.vue';
// import BarChart from '@/component/echarts/BarChart.vue';

import echart from '@/component/echarts/index.vue';

export default {
    name: 'Authentication',
    props: [],
    components: { echart },
    data() {
        return {
            infoIndex: 3,
            totalData: {},
            barChartData: {
                chartId: 'BarChart1',
                chartType: 'BarChart',
                legendData: ['访问量'],
                listName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                list: [[120, 200, 150, 80, 70, 110, 130]],
            },
            lineChartData: {
                chartId: 'LineChart1',
                chartType: 'LineChart',
                legendData: ['访问量'],
                listName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                list: [120, 200, 150, 80, 70, 110, 130],
            },
        };
    },
    computed: {},
    // created() {},
    // mounted() {},
    // destroyed() {},
    methods: {},
    watch: {},
    filters: {},
};
</script>

<style scoped>
.title {
    font-size: 22px;
    color: #1890ff;
}
.top-panel {
    margin: 20px 0 40px;
}
.top-panel .top-li {
    height: 100px;
    padding: 20px;
}
.top-panel .li-title {
    color: #1890ff;
}
.top-panel .li-num {
    font-size: 24px;
    text-align: center;
    font-weight: 600;
}
.shadow {
    box-shadow: 6px 6px 10px #888888;
}
.info-panel {
    height: 100px;
    border-radius: 3px;
    margin: 20px 0 40px;
    text-align: center;
}
.info-panel .li {
    font-weight: 600;
    font-size: 16px;
    margin-top: 20px;
    line-height: 28px;
}
.chart-title {
    padding: 10px 20px;
}
</style>
