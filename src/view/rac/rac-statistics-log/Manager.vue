<template>
    <div>
        <a-tabs class="realm-tabs" :activeKey="curRealmId" @change="handleRealmChanged">
            <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name">
                <a-row :gutter="[20, 20]">
                    <a-col :span="12" v-for="(item, index) in chartData" :key="index">
                        <chart-panel ref="chartList" @handleShow="handleShow" :item="item"></chart-panel>
                    </a-col>
                </a-row>
            </a-tab-pane>
        </a-tabs>
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
                        }"
                        @change="onChange"
                    />
                </a-form-model-item>
            </a-form-model>
        </base-modal>
    </div>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import ChartPanel from './ChartPanel.vue';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh_cn');
import { racRealmApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseModal,
        ChartPanel,
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
            curRealmId: '',
            realms: [],
            visible: false,
            title: '',
            isCancelClick: true,
            model: {},
            query: {},
            moment,
            dateFormat: 'YYYY/MM/DD',
            monthFormat: 'YYYY/MM',
            chartData: [],
            defaultData: [
                {
                    title: '今日访问情况',
                    data: {
                        chartType: 'LineChart',
                        legendData: ['访问量'],
                        listName: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点'],
                        list: [[59, 97, 25, 26, 27, 33, 44, 85, 78, 89, 17]],
                    },
                },
                {
                    title: '今日认证情况',
                    data: {
                        chartType: 'BarChart',
                        legendData: ['认证成功', '认证失败'],
                        listName: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点'],
                        list: [
                            [59, 97, 25, 26, 27, 33, 44, 85, 78, 89, 17],
                            [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
                        ],
                    },
                },
                {
                    title: '今日登录情况',
                    data: {
                        chartType: 'PieChart',
                        legendData: ['访问量'],
                        list: [
                            { value: '303', name: '登陆成功' },
                            { value: '13', name: '登陆失败' },
                        ],
                    },
                },
            ],
            platformData: [
                {
                    title: '今日平台访问情况',
                    data: {
                        chartType: 'LineChart',
                        legendData: ['访问量'],
                        listName: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点'],
                        list: [[509, 917, 2455, 2610, 2719, 3033, 3044, 3185, 2708, 2809, 2117]],
                    },
                },
            ],
            opsData: [
                {
                    title: '今日运营登录情况',
                    data: {
                        chartType: 'LineChart',
                        legendData: ['访问量'],
                        listName: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点'],
                        list: [[509, 917, 2455, 2610, 2719, 3033, 3044, 3185, 2708, 2809, 2117]],
                    },
                },
            ],
        };
    },
    computed: {},
    mounted() {
        this.refreshData();
        this.chartData = this.defaultData;
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
        /**
         * 处理改变领域的事件
         */
        handleRealmChanged(realmId) {
            console.log(realmId);
            this.update = false;
            this.chartData = [];
            this.curRealmId = realmId;
            this.query = {
                ...this.query,
                realmId: this.curRealmId,
            };

            this.$nextTick(() => {
                if (realmId == 'default') {
                    this.chartData = this.defaultData;
                } else if (realmId == 'platform') {
                    this.chartData = this.platformData;
                } else if (realmId == 'ops') {
                    this.chartData = this.opsData;
                }
            });
        },
        onChange(dates, dateStrings) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
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
