<template>
    <div>
        <div class="top-panel">
            <a-row :gutter="20">
                <a-col :span="5">
                    <echart ref="chart3" :chartData="accChartData"></echart>
                </a-col>
                <a-col :span="5">
                    <echart ref="chart4" :chartData="cockpitChartData"></echart>
                </a-col>
                <a-col :span="5">
                    <echart ref="chart5" :chartData="approveChartData"></echart>
                </a-col>
            </a-row>
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
                    <h3 class="chart-title">今日认证情况</h3>
                    <echart ref="chart1" :chartData="barChartData"></echart>
                </div>
            </a-col>
            <a-col :span="12">
                <div class="chart-panel">
                    <h3 class="chart-title">今日访问情况</h3>
                    <echart ref="chart2" :chartData="lineChartData"></echart>
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
            accChartData: {
                chartType: 'AccountChart',
                fontNum: 6,
                list: [
                    { value: 100, name: '正常账号' },
                    { value: 10, name: '异常账号' },
                    { value: 23, name: '封禁账号' },
                ],
            },
            cockpitChartData: {
                chartType: 'CockpitChart',
                fontNum: 6,
                list: [
                    { value: 83, name: '登录成功占比' },
                    { value: 15376, name: '登录总次数' },
                ],
            },
            approveChartData: {
                chartType: 'CockpitChart',
                fontNum: 6,
                list: [
                    { value: 95, name: '认证成功占比' },
                    { value: 5736, name: '总认证数' },
                ],
            },
            barChartData: {
                chartType: 'BarChart',
                legendData: ['待认证数', '认证数'],
                listName: ['8点', '9点', '10点', '11点', '12点', '13点', '14点'],
                list: [
                    [10, 200, 150, 80, 70, 110, 130],
                    [309, 117, 455, 210, 219, 333],
                ],
            },
            lineChartData: {
                chartType: 'LineChart',
                legendData: ['登录量', '访问量'],
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
    mounted() {
        window.onresize = () => {
            this.$refs.chart1.reDrawChart();
            this.$refs.chart2.reDrawChart();
            this.$refs.chart3.reDrawChart();
            this.$refs.chart4.reDrawChart();
            this.$refs.chart5.reDrawChart();
        };
    },
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
    padding-top: 40px;
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
