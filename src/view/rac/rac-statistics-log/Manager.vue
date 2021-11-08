<template>
    <div>
        <a-tabs class="realm-tabs" :activeKey="curRealmId" @change="handleRealmChanged">
            <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name"></a-tab-pane>
        </a-tabs>
        <!-- <a-range-picker
            :ranges="{
                Today: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                'This Month': [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss').endOf('month')],
            }"
            show-time
            format="YYYY/MM/DD HH:mm:ss"
            @change="onChange"
        /> -->
        <a-row :gutter="[20, 20]">
            <a-col :span="12" v-for="(item, index) in chartData" :key="index">
                <div class="chart-panel">
                    <div class="chart-ti">
                        <h3 class="chart-title">{{ item.title }}</h3>
                        <div class="chart-right">
                            <a-icon type="calendar" />
                        </div>
                    </div>
                    <echart ref="chart" :chartData="item.data"></echart>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import echart from '@/component/echarts/index.vue';
import { racRealmApi } from '@/api/Api';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh_cn');

export default {
    name: 'Manager',
    components: {
        echart,
    },
    data() {
        return {
            loading: false,
            curRealmId: '',
            realms: [],
            query: {},
            moment,
            dateFormat: 'YYYY/MM/DD',
            monthFormat: 'YYYY/MM',
            chartData: [
                {
                    title: '今日访问情况',
                    data: {
                        chartId: 'LineChart1',
                        chartType: 'LineChart',
                        legendData: ['访问量'],
                        listName: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日'],
                        list: [[509, 917, 2455, 2610, 2719, 3033, 3044, 3185, 2708, 2809, 2117]],
                    },
                },
                {
                    title: '今日认证情况',
                    data: {
                        chartId: 'BarChart1',
                        chartType: 'BarChart',
                        legendData: ['认证成功', '认证失败'],
                        listName: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日'],
                        list: [
                            [509, 917, 455, 610, 719, 333, 344, 385, 208, 209, 217],
                            [0, 1, 0, 2, 0, 0, 3, 0, 3, 0, 4],
                        ],
                    },
                },
                {
                    title: '今日登录情况',
                    data: {
                        chartId: 'PieChart1',
                        chartType: 'PieChart',
                        list: [
                            { value: 1048, name: '登录成功' },
                            { value: 5, name: '登陆失败' },
                            { value: 3, name: '登录异常' },
                        ],
                    },
                },
            ],
        };
    },
    computed: {},
    mounted() {
        this.refreshData();
        window.onresize = () => {
            // this.$refs.chart.reDrawChart();
            for (const i in this.chartData) {
                this.$refs.chart[i].reDrawChart();
            }
        };
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            racRealmApi
                .listAll()
                .then(ro => {
                    this.realms = ro.extra.list;
                    if (!this.curRealmId) {
                        this.curRealmId = this.realms[0].id;
                        this.query = {
                            realmId: this.curRealmId,
                        };
                    }
                })
                .finally(() => (this.loading = false));
        },
        onChange(dates, dateStrings) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        },
        /**
         * 处理改变领域的事件
         */
        handleRealmChanged(realmId) {
            console.log(realmId);
            this.curRealmId = realmId;
            this.query = {
                ...this.query,
                realmId: this.curRealmId,
            };
        },
    },
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
