<template>
    <div>
        <a-tabs class="realm-tabs" :activeKey="curRealmId" @change="handleRealmChanged">
            <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name"></a-tab-pane>
        </a-tabs>
        <a-row :gutter="[20, 20]">
            <a-col :span="12" v-for="(item, index) in chartData" :key="index">
                <div class="chart-panel">
                    <div class="chart-ti">
                        <h3 class="chart-title">{{ item.title }}</h3>
                        <div class="chart-right">
                            <a-icon type="calendar" @click="handleShow(item)" />
                        </div>
                    </div>
                    <echart ref="chart" :chartData="item.data"></echart>
                </div>
            </a-col>
        </a-row>
        <base-modal
            ref="baseModal"
            :title="title"
            :loading="loading"
            :visible.sync="visible"
            :isCancelClick="isCancelClick"
            v-bind="$attrs"
            v-on="$listeners"
            @ok="handleOk"
        >
            <a-form-model ref="form" :model="model" v-bind="formLayout">
                <a-form-model-item key="signInPswd" label="日期范围">
                    <a-range-picker
                        :ranges="{
                            今日: [moment(), moment()],
                            这周: [moment().startOf('week'), moment().endOf('week')],
                            这个月: [moment().startOf('month'), moment().endOf('month')],
                            今年: [moment().startOf('year'), moment().endOf('year')],
                        }"
                        @change="onChange"
                    />
                </a-form-model-item>
            </a-form-model>
        </base-modal>
    </div>
</template>

<script>
import echart from '@/component/echarts/index.vue';
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racRealmApi } from '@/api/Api';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh_cn');

export default {
    name: 'Manager',
    components: {
        echart,
        BaseModal,
    },
    data() {
        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        return {
            loading: false,
            visible: false,
            title: '',
            isCancelClick: true,
            model: {},
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
                        listName: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点'],
                        list: [[509, 917, 2455, 2610, 2719, 3033, 3044, 3185, 2708, 2809, 2117]],
                    },
                },
                {
                    title: '今日认证情况',
                    data: {
                        chartId: 'BarChart1',
                        chartType: 'BarChart',
                        legendData: ['认证成功', '认证失败'],
                        listName: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点'],
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
                {
                    title: '今日密码情况',
                    data: {
                        chartId: 'LineChart2',
                        chartType: 'LineChart',
                        legendData: ['密码修改'],
                        listName: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点'],
                        list: [[59, 17, 24, 10, 21, 33, 34, 35, 27, 28, 17]],
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
        // 仪表盘查询条件
        handleShow(item) {
            this.title = item.title;
            this.visible = true;
            console.log(item);
        },
        handleOk() {
            this.visible = false;
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
