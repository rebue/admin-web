<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <a-tabs class="realm-tabs" :activeKey="curRealmId" @change="handleRealmChanged">
                <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name"> </a-tab-pane>
            </a-tabs>
            <crud-table
                v-if="curRealmId"
                :showKeywords="true"
                :key="`crudTable.${curRealmId}`"
                :ref="`crudTable.${curRealmId}`"
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
                        style="width: 400px; margin-right: 20px"
                    />
                </template>
            </crud-table>
        </template>
    </base-manager>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi, racDisableLogApi } from '@/api/Api';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh_cn');

export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        this.api = racDisableLogApi;
        const columns = [
            {
                dataIndex: 'signInName',
                title: '账号名称',

                ellipsis: true,
                width: 120,
                customRender: (text, record) => (
                    <a-popover title={(record.signInName || record.signInMobile || record.signInEmail) + '详情'}>
                        {record.signInName || record.signInMobile || record.signInEmail}
                        <template slot="content">
                            <p>账户名：{record.signInName}</p>
                            <p>手机号：{record.signInMobile}</p>
                            <p>邮箱：{record.signInEmail}</p>
                            <p>账户昵称：{record.signInNickname}</p>
                            <p>禁用原因：{record.disableReason}</p>
                            <p>启用原因：{record.enableReason}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'disableSignInName',
                title: '禁用操作员',
                ellipsis: true,
                width: 120,
                customRender: (text, record) => (
                    <a-popover
                        title={
                            (record.disableSignInName || record.disableSignInMobile || record.disableSignInEmail) +
                            '详情'
                        }
                    >
                        {record.disableSignInName || record.disableSignInMobile || record.disableSignInEmail}
                        <template slot="content">
                            <p>账户名：{record.disableSignInName}</p>
                            <p>手机号：{record.disableSignInMobile}</p>
                            <p>账户昵称：{record.disableSignInNickname}</p>
                            邮箱：{record.disableSignInEmail}
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'disableAgentSignInName',
                title: '代理禁用操作员',
                width: 130,
                ellipsis: true,
                customRender: (text, record) => (
                    <a-popover
                        title={
                            (record.disableAgentSignInNickname ||
                                record.disableAgentSignInMobile ||
                                record.disableAgentSignInEmail) + '详情'
                        }
                    >
                        {record.disableAgentSignInNickname ||
                            record.disableAgentSignInMobile ||
                            record.disableAgentSignInEmail}
                        <template slot="content">
                            <p>账户名：{record.disableAgentSignInName}</p>
                            <p>手机号：{record.disableAgentSignInMobile}</p>
                            <p>账户昵称：{record.disableAgentSignInNickname}</p>
                            邮箱：{record.disableAgentSignInEmail}
                            <br />
                            微信昵称：{record.disableAgentwxNickname}
                            <br />
                            QQ昵称：{record.disableAgentqqNickname}
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'disableDatetime',
                title: '禁用时间',
                ellipsis: true,
                width: 220,
                sorter: true,
                sortDirections: ['ascend', 'descend', 'ascend'],
            },
            {
                dataIndex: 'disableReason',
                title: '禁用原因',
                width: 220,
                ellipsis: true,
            },
            {
                dataIndex: 'enableSignInName',
                title: '启用操作员',
                width: 120,
                ellipsis: true,
                customRender: (text, record) => (
                    <a-popover
                        title={
                            (record.enableSignInName || record.enableSignInMobile || record.enableSignInEmail) + '详情'
                        }
                    >
                        {record.enableSignInName || record.enableSignInMobile || record.enableSignInEmail}
                        <template slot="content">
                            <p>账户名：{record.enableSignInName}</p>
                            <p>手机号：{record.enableSignInMobile}</p>
                            <p>账户昵称：{record.enableSignInNickname}</p>
                            邮箱：{record.enableSignInEmail}
                            <br />
                            微信昵称：{record.enablewxNickname}
                            <br />
                            QQ昵称：{record.enableqqNickname}
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'enableAgentSignInName',
                title: '代理启用操作员',
                width: 130,
                ellipsis: true,
                customRender: (text, record) => (
                    <a-popover
                        title={
                            (record.enableAgentSignInName ||
                                record.enableAgentSignInMobile ||
                                record.enableAgentSignInEmail) + '详情'
                        }
                    >
                        {record.enableAgentSignInName ||
                            record.enableAgentSignInMobile ||
                            record.enableAgentSignInEmail}
                        <template slot="content">
                            <p>账户名：{record.enableAgentSignInName}</p>
                            <p>手机号：{record.enableAgentSignInMobile}</p>
                            <p>账户昵称：{record.enableAgentSignInNickname}</p>
                            邮箱：{record.enableAgentSignInEmail}
                            <br />
                            微信昵称：{record.enableAgentwxNickname}
                            <br />
                            QQ昵称：{record.enableAgentqqNickname}
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'enableDatetime',
                title: '启用时间',
                ellipsis: true,
                width: 220,
                sorter: true,
                sortDirections: ['ascend', 'descend', 'ascend'],
            },
            {
                dataIndex: 'enableReason',
                title: '启用原因',
                width: 220,
                ellipsis: true,
            },
        ];

        return {
            loading: false,
            curRealmId: '',
            query: {},
            realms: [],
            data: this.api,
            columns,
            moment,
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable.' + this.curRealmId];
        },
    },
    mounted() {
        this.refreshData();
    },
    methods: {
        /**
         * 限制选择时间范围
         * 只能选择今天当天之后的时间
         */
        disabledDate(current) {
            return current && current > moment().endOf('day');
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
                this.crudTable.fetchFirstPage();
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
                delete this.query['startDate'];
                delete this.query['endDate'];
                this.crudTable.fetchFirstPage();
            }
        },
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
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理改变领域的事件
         */
        handleRealmChanged(realmId) {
            this.curRealmId = realmId;
            this.query = {
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
