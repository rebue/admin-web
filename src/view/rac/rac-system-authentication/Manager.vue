<template>
    <div>
        <div class="top-panel">
            <div class="top-list">
                <!-- <div class="lis">
                    <div class="ti">总人数</div>
                    <div class="num">2300000</div>
                </div>
                <div class="lis">
                    <div class="ti">总人数</div>
                    <div class="num">2300000</div>
                </div>
                <div class="lis">
                    <div class="ti">总人数</div>
                    <div class="num">2300000</div>
                </div> -->
                <a-row :gutter="20">
                    <a-col class="gutter-row" :span="12">
                        <echart style="width: 300px; height: 300px;" :chartData="cockpitChartData"></echart>
                    </a-col>
                    <a-col class="gutter-row" :span="12">
                        <echart style="width: 300px; height: 300px;" :chartData="approveChartData"></echart>
                    </a-col>
                </a-row>
            </div>
            <!-- <div class="title">
                <div>账号总数</div>
                <div class="num">280个</div>
            </div> -->
            <img class="top-bg" :src="require('./top-bg.png')" />
        </div>
        <div class="account-panel">
            <div class="title">账号总概况</div>
            <div class="account-li">
                <div class="li-panel">
                    <img :src="require('./icon01.png')" />
                    <div class="info">
                        <div class="num">9527</div>
                        <div class="ti">添加总数</div>
                    </div>
                </div>
                <div class="li-panel">
                    <img :src="require('./icon02.png')" />
                    <div class="info">
                        <div class="num">9527</div>
                        <div class="ti">锁定总数</div>
                    </div>
                </div>
                <div class="li-panel">
                    <img :src="require('./icon03.png')" />
                    <div class="info">
                        <div class="num">9527</div>
                        <div class="ti">修改总数</div>
                    </div>
                </div>
                <div class="li-panel">
                    <img :src="require('./icon04.png')" />
                    <div class="info">
                        <div class="num">9527</div>
                        <div class="ti">密码修改总数</div>
                    </div>
                </div>
                <div class="li-panel">
                    <img :src="require('./icon05.png')" />
                    <div class="info">
                        <div class="num">9527</div>
                        <div class="ti">认证成功总数</div>
                    </div>
                </div>
                <div class="li-panel">
                    <img :src="require('./icon06.png')" />
                    <div class="info">
                        <div class="num">9527</div>
                        <div class="ti">认证失败总数</div>
                    </div>
                </div>
            </div>
        </div>
        <a-row :gutter="20">
            <a-col :span="12">
                <div class="chart-panel">
                    <h3 class="chart-title">今日访问情况</h3>
                    <echart :chartData="lineChartData"></echart>
                </div>
            </a-col>
            <a-col :span="12">
                <div class="chart-panel">
                    <h3 class="chart-title">今日认证情况</h3>
                    <echart :chartData="barChartData"></echart>
                </div>
            </a-col>
        </a-row>
    </div>
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
                fontNum: 6,
                list: [
                    { value: 83, name: '登录成功占比' },
                    { value: 15376, name: '登录总次数' },
                ],
            },
            approveChartData: {
                chartId: 'Cockpit2',
                chartType: 'CockpitChart',
                fontNum: 6,
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
.top-panel {
    background-color: #5497e7;
    height: 350px;
    color: #ffffff;
    border-radius: 10px;
}
.top-panel .title {
    font-size: 30px;
}
.top-panel .title .num {
    background-color: #1dcb8c;
    min-width: 120px;
    height: 45px;
    text-align: center;
    border-radius: 4px;
    margin-left: 20px;
    padding: 0 20px;
}
.top-panel .top-list {
    display: flex;
    padding-top: 20px;
}
.top-panel .top-list .lis {
    width: 140px;
    height: 120px;
    background: rgba(243, 246, 253, 0.13);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
}
.top-panel .top-list .lis .ti {
    font-size: 18px;
}
.top-panel .top-list .lis .num {
    font-size: 30px;
    font-weight: bold;
}
.top-panel .top-bg {
    position: absolute;
    width: 318px;
    height: 279px;
    top: -15px;
    right: 47px;
}
.account-panel {
    width: 100%;
    height: 166px;
    background: #ffffff;
    border-radius: 10px;
    margin: 20px 0;
}
.account-panel .title {
    font-size: 20px;
    color: #222222;
    line-height: 57px;
    margin-left: 29px;
}
.account-panel .account-li {
    display: flex;
}
.account-panel .account-li .li-panel {
    width: 16.6%;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* .account-panel .account-li .li-panel::after {
    content: '';
    position: relative;
    right: 0;
    width: 2px;
    height: 40px;
    background: #F1F1F2;
} */
.account-panel .account-li .li-panel img {
    width: 29px;
    height: 29px;
    margin-right: 20px;
}
.account-panel .account-li .li-panel .info .num {
    font-size: 26px;
    font-weight: bold;
    color: #333333;
}
.account-panel .account-li .li-panel .info .ti {
    font-size: 16px;
    font-weight: 400;
    color: #a1a0a0;
}
.chart-panel {
    background: #ffffff;
    border-radius: 10px;
}
.chart-panel .chart-title {
    padding: 10px 20px;
}
</style>
