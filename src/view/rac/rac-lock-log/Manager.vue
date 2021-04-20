<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <a-tabs class="domain-tabs" :activeKey="curDomainId" @change="handleDomainChanged">
                <a-tab-pane v-for="domain in domains" :key="domain.id" :tab="domain.name">
                    <crud-table
                        :showKeywords="true"
                        :ref="`crudTable.${domain.id}`"
                        :columns="columns"
                        :api="api"
                        :query="query"
                        :scrollX="600"
                        :expandable="true"
                        bordered
                    >
                        <template #keywordsLeft>
                            <label style="width: 100px; line-height: 30px">选择日期：</label>
                            <a-range-picker
                                format="YYYY-MM-DD HH:mm:ss"
                                :show-time="{
                                    hideDisabledOptions: true,
                                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                }"
                                @change="onChangeBir"
                                @openChange="onOpenChange"
                                @ok="onOK"
                                style="width: 350px; padding-right: 20px"
                            />
                        </template>
                    </crud-table>
                </a-tab-pane>
            </a-tabs>
        </template>
    </base-manager>
</template>

<script>
import Vue from 'vue';
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racDomainApi, racLockLogApi } from '@/api/Api';
import moment from 'moment';
import VueDraggableResizable from 'vue-draggable-resizable';

Vue.component('vue-draggable-resizable', VueDraggableResizable);

export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        this.api = racLockLogApi;
        let nameId;
        const columns = [
            {
                dataIndex: 'accountName',
                title: '锁定账户的账户',
                ellipsis: true,
                width: 150,
                customRender: (text, record) => (
                    <a-popover title={text + '详情'}>
                        <template slot="content">
                            <p>账户ID：{record.accountId}</p>
                            <p>账户名：{{ text }}</p>
                        </template>
                        {{ text }}
                    </a-popover>
                ),
            },
            {
                dataIndex: 'lockOpName',
                title: '锁定操作员的账户',
                ellipsis: true,
                width: 150,
                customRender: (text, record) => (
                    (nameId = this.getInformation(text, record)),
                    (
                        <a-popover title={text + '详情'}>
                            <template slot="content">
                                <p>账户ID：{nameId}</p>
                                <p>账户名：{{ text }}</p>
                            </template>
                            {{ text }}
                        </a-popover>
                    )
                ),
            },
            {
                dataIndex: 'lockReason',
                title: '锁定原因',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'lockDateTime',
                title: '锁定时间',
                ellipsis: true,
                width: 150,
                sorter: (a, b) => new Date(a.lockDateTime).getTime() - new Date(b.lockDateTime).getTime(),
            },
            {
                dataIndex: 'unlockReason',
                title: '解锁原因',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'unlockDateTime',
                title: '解锁时间',
                ellipsis: true,
                width: 150,
                sorter: (a, b) => new Date(a.unlockDateTime).getTime() - new Date(b.unlockDateTime).getTime(),
            },
            {
                dataIndex: 'unlockOpName',
                title: '解锁操作员的账户',
                ellipsis: true,
                width: 150,
                customRender: (text, record) => (
                    (nameId = this.getInformation(text, record)),
                    (
                        <a-popover title={text + '详情'}>
                            <template slot="content">
                                <p>账户ID：{nameId}</p>
                                <p>账户名：{{ text }}</p>
                            </template>
                            {{ text }}
                        </a-popover>
                    )
                ),
            },
        ];

        return {
            loading: false,
            curDomainId: '',
            query: {},
            domains: [],
            data: this.api,
            columns,
            // rowClick: (record, index) => ({
            //     on: {
            //         click: () => {
            //             //点击行要做的操作
            //             console.log(record);
            //             console.log(index);
            //         },
            //     },
            // }),
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable.' + this.curDomainId][0];
        },
    },
    mounted() {
        this.refreshData();
    },
    methods: {
        moment,
        /**
         * 限制选择时间范围
         * 只能选择今天当天之后的时间
         */
        disabledDate(current) {
            return current && current > moment().endOf('day');
        },
        getInformation() {
            return Math.ceil(Math.random() * 1000000);
        },
        onPanelChange() {
            console.log('有变化');
        },
        /**
         * ok按扭回调
         */
        onOK() {
            // this.refreshTableData();
        },
        /**
         * 弹出日历和关闭日历的回调
         */
        onOpenChange(status) {
            if (!status) {
                this.refreshTableData();
            }
        },
        /**
         * 根据时间发生变化的回调
         */
        onChangeBir(date, dateDates) {
            // this.searchsdates=dateDates
            // this.query = {
            //     ...this.query,
            //     startDate: dateDates[0],
            //     endDate: dateDates[1],
            // };
            this.query.startDate = dateDates[0];
            this.query.endDate = dateDates[1];
            if (dateDates[0] === '') {
                this.refreshTableData();
            }
        },
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            racDomainApi
                .listAll()
                .then(ro => {
                    this.domains = ro.extra.list;
                    if (!this.curDomainId) {
                        this.curDomainId = this.domains[0].id;
                        this.query = {
                            domainId: this.curDomainId,
                        };
                    }
                })
                .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理改变领域的事件
         */
        handleDomainChanged(domainId) {
            this.curDomainId = domainId;
            this.query = {
                ...this.query,
                domainId: this.curDomainId,
            };
        },
    },
};
</script>
<style lang="less" scoped>
.domain-tabs {
    overflow: visible; // 否则表格的分页选择框展开时会被遮挡
}
</style>
