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
                        :expandable="false"
                    >
                        <template #keywordsLeft>
                            <!-- <label style="width: 100px; line-height: 30px">选择日期：</label> -->
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
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racDomainApi, racOpLogApi } from '@/api/Api';
import { OpTypeDic } from '@/dic/OpTypeDic';
import moment from 'moment';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        this.api = racOpLogApi;
        this.columns = [
            {
                dataIndex: 'signInName',
                key: 'signInName',
                title: '账号名称',
                fixed: 'left',
                ellipsis: true,
                width: 150,
                customRender: (text, record) => (
                    <a-popover title={(record.signInName || record.signInMobile || record.signInEmail) + '详情'}>
                        {record.signInName || record.signInMobile || record.signInEmail}
                        <template slot="content">
                            <p>账户ID：{record.accountId}</p>
                            <p>账户名：{record.signInName}</p>
                            <p>手机号：{record.signInMobile}</p>
                            <p>邮箱：{record.signInEmail}</p>
                            <p>账户昵称：{record.signInNickname}</p>
                            <p>微信昵称：{record.wxNickname}</p>
                            <p>QQ昵称：{record.qqNickname}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'sysName',
                key: 'sysName',
                title: '系统名称',
                ellipsis: true,
                width: 150,
                customRender: (text, record) => (
                    <a-popover title={text + '详情'}>
                        {text}
                        <template slot="content">
                            <p>系统名称：{record.sysName}</p>
                            <p>领域ID：{record.domainId}</p>
                            <p>菜单：{record.menuUrn}</p>
                            <p>系统备注：{record.remark}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'opType',
                key: 'opType',
                title: '操作类型',
                ellipsis: true,
                filters: [
                    { text: OpTypeDic.login, value: OpTypeDic.login },
                    { text: OpTypeDic.register, value: OpTypeDic.register },
                    { text: OpTypeDic.operation, value: OpTypeDic.operation },
                ],
                customRender: (text, record) => (
                    <a-popover title={text + '详情'}>
                        {text}
                        <template slot="content">
                            <p>操作标题：{record.opTitle}</p>
                            <p>操作详情：{record.opDetail}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'opDatetime',
                key: 'opDatetime',
                title: '操作时间',
                ellipsis: true,
                width: 165,
                sorter: true,
                sortDirections: ['ascend', 'descend', 'ascend'],
            },
        ];
        return {
            loading: false,
            curDomainId: '',
            query: {},
            domains: [],
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
        /**
         * 弹出日历和关闭日历的回调
         */
        onOpenChange(status) {
            if (!status) {
                this.refreshTableData();
            }
        },
        /**
         * ok按扭回调
         */
        onOK() {
            // this.refreshTableData();
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
                delete this.query['startDate'];
                delete this.query['endDate'];
                this.refreshTableData();
            }
        },
    },
};
</script>
<style lang="less" scoped>
.domain-tabs {
    overflow: visible; // 否则表格的分页选择框展开时会被遮挡
}
</style>
