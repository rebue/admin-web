<template>
    <a-card class="manager-card" :bordered="false">
        <div class="title">账号总概况</div>
        <div class="top-panel">
            <a-row :gutter="20">
                <a-col class="gutter-row" :span="8">
                    <div class="top-li-flex">
                        <div class="top-li shadow">
                            <div class="li-title">账号总数</div>
                            <div class="li-num">9527</div>
                        </div>
                    </div>
                </a-col>
                <a-col class="gutter-row" :span="8">
                    <echart :chartData="cockpitChartData"></echart>
                </a-col>
                <a-col class="gutter-row" :span="8">
                    <echart :chartData="approveChartData"></echart>
                </a-col>
            </a-row>
        </div>
        <div class="title">今日账号数据统计</div>
        <div class="info-panel">
            <a-row :gutter="10">
                <a-col :span="infoIndex">
                    <div class="li">
                        <div class="li-title">添加总数</div>
                        <div class="li-num">1453</div>
                    </div>
                </a-col>
                <a-col :span="infoIndex">
                    <div class="li">
                        <div>锁定总数</div>
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

        <a-row :gutter="20">
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
            infoIndex: 4,
            totalData: {},
            cockpitChartData: {
                chartId: 'Cockpit1',
                chartType: 'CockpitChart',
                fontNum: 7,
                list: [
                    { value: 83, name: '登录成功占比' },
                    { value: 15376, name: '登录总次数' },
                ],
            },
            approveChartData: {
                chartId: 'Cockpit2',
                chartType: 'CockpitChart',
                fontNum: 7,
                list: [
                    { value: 95, name: '认证成功占比' },
                    { value: 5736, name: '总认证数' },
                ],
            },
            barChartData: {
                chartId: 'BarChart1',
                chartType: 'BarChart',
                legendData: ['访问量', '订单量'],
                listName: ['8点', '9点', '10点', '11点', '12点', '13点', '14点'],
                list: [
                    [10, 200, 150, 80, 70, 110, 130],
                    [309, 117, 455, 210, 219, 333],
                ],
            },
            lineChartData: {
                chartId: 'LineChart1',
                chartType: 'LineChart',
                legendData: ['访问量', '订单量'],
                listName: ['8点', '9点', '10点', '11点', '12点', '13点', '14点'],
                list: [
                    [10, 200, 150, 80, 70, 110, 130],
                    [309, 117, 455, 210, 219, 333],
                ],
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
}
.top-panel .top-li-flex {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 300px;
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
    /* box-shadow: -1px -1px 10px #888888; */
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 3px;
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
    line-height: 28px;
    padding: 10px 0;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 3px;
}
.chart-title {
    padding: 10px 20px;
}
</style>
