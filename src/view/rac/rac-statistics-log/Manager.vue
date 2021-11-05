<template>
    <div>
        <a-card class="manager-card" :bordered="false">
            <a-tabs class="realm-tabs" :activeKey="curRealmId" @change="handleRealmChanged">
                <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name"></a-tab-pane>
            </a-tabs>
            <a-range-picker
                :ranges="{
                    Today: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                    'This Month': [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss').endOf('month')],
                }"
                show-time
                format="YYYY/MM/DD HH:mm:ss"
                @change="onChange"
            />
            <echart :chartData="lineChartData"></echart>
        </a-card>
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
            lineChartData: {
                chartId: 'LineChart1',
                chartType: 'LineChart',
                legendData: ['访问量', '订单量'],
                listName: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日'],
                list: [
                    [509, 917, 2455, 2610, 2719, 3033, 3044, 3185, 2708, 2809, 2117],
                    [2136, 3693, 2962, 3810, 3519, 3484, 3915, 3823, 3455, 4310, 4019],
                ],
            },
        };
    },
    computed: {},
    mounted() {
        this.refreshData();
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
.realm-tabs {
    overflow: visible; // 否则表格的分页选择框展开时会被遮挡
}
</style>
<style type="text/css">
.mystyle {
    width: 50%;
    right: 200px;
}
</style>
