<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <a-tabs class="realm-tabs" :activeKey="curRealmId" @change="handleRealmChanged">
                <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name">
                    <crud-table
                        :showKeywords="true"
                        :ref="`crudTable.${realm.id}`"
                        :columns="columns"
                        :api="api"
                        :query="query"
                        :scrollX="600"
                        :expandable="false"
                    >
                        <template #keywordsLeft>
                            <!-- <label style="width: 100px; line-height: 30px">选择日期：</label> -->
                            <a-range-picker
                                :locale="chinese"
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
import { racRealmApi, racLockLogApi } from '@/api/Api';
import chinese from 'ant-design-vue/es/date-picker/locale/zh_CN';
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
        this.api = racLockLogApi;
        const columns = [
            {
                dataIndex: 'signInName',
                title: '账号名称',
                fixed: 'left',
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
                            <p>微信昵称：{record.wxNickname}</p>
                            <p>QQ昵称：{record.qqNickname}</p>
                            <p>锁定原因：{record.lockReason}</p>
                            <p>解锁原因：{record.unlockReason}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'locksignInName',
                title: '锁定操作员',
                ellipsis: true,
                width: 120,
                customRender: (text, record) => (
                    <a-popover
                        title={(record.lockSignInName || record.lockSignInMobile || record.lockSignInEmail) + '详情'}
                    >
                        {record.lockSignInName || record.lockSignInMobile || record.lockSignInEmail}
                        <template slot="content">
                            <p>账户名：{record.lockSignInName}</p>
                            <p>手机号：{record.lockSignInMobile}</p>
                            <p>邮箱：{record.lockSignInEmail}</p>
                            <p>账户昵称：{record.lockSignInNickname}</p>
                            <p>微信昵称：{record.lockwxNickname}</p>
                            <p>QQ昵称：{record.lockqqNickname}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'lockAgentSignInName',
                title: '代理解锁操作员',
                width: 130,
                ellipsis: true,
                customRender: (text, record) => (
                    <a-popover
                        title={
                            (record.lockAgentSignInName ||
                                record.lockAgentSignInMobile ||
                                record.lockAgentSignInEmail) + '详情'
                        }
                    >
                        {record.lockAgentSignInName || record.lockAgentSignInMobile || record.lockAgentSignInEmail}
                        <template slot="content">
                            <p>账户名：{record.lockAgentSignInName}</p>
                            <p>手机号：{record.lockAgentSignInMobile}</p>
                            <p>邮箱：{record.lockAgentSignInEmail}</p>
                            <p>账户昵称：{record.lockAgentSignInNickname}</p>
                            <p>微信昵称：{record.lockAgentwxNickname}</p>
                            <p>QQ昵称：{record.lockAgentqqNickname}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'lockDatetime',
                title: '锁定时间',
                ellipsis: true,
                width: 165,
                sorter: true,
                sortDirections: ['ascend', 'descend', 'ascend'],
            },
            {
                dataIndex: 'unlocksignInName',
                title: '解锁操作员',
                width: 120,
                ellipsis: true,
                customRender: (text, record) => (
                    <a-popover
                        title={
                            (record.unlockSignInName || record.unlockSignInMobile || record.unlockSignInEmail) + '详情'
                        }
                    >
                        {record.unlockSignInName || record.unlockSignInMobile || record.unlockSignInEmail}
                        <template slot="content">
                            <p>账户名：{record.unlockSignInName}</p>
                            <p>手机号：{record.unlockSignInMobile}</p>
                            <p>邮箱：{record.unlockSignInEmail}</p>
                            <p>账户昵称：{record.unlockSignInNickname}</p>
                            <p>微信昵称：{record.unlockwxNickname}</p>
                            <p>QQ昵称：{record.unlockqqNickname}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'unlockAgentSignInName',
                title: '代理解锁操作员',
                ellipsis: true,
                customRender: (text, record) => (
                    <a-popover
                        title={
                            (record.unlockAgentSignInName ||
                                record.unlockAgentSignInMobile ||
                                record.unlockAgentSignInEmail) + '详情'
                        }
                    >
                        {record.unlockAgentSignInName ||
                            record.unlockAgentSignInMobile ||
                            record.unlockAgentSignInEmail}
                        <template slot="content">
                            <p>账户名：{record.unlockAgentSignInName}</p>
                            <p>手机号：{record.unlockAgentSignInMobile}</p>
                            <p>邮箱：{record.uunlockAgentSignInEmail}</p>
                            <p>账户昵称：{record.unlockAgentSignInNickname}</p>
                            <p>微信昵称：{record.unlockAgentwxNickname}</p>
                            <p>QQ昵称：{record.unlockAgentqqNickname}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'unlockDatetime',
                title: '解锁时间',
                ellipsis: true,
                width: 165,
                sorter: true,
                sortDirections: ['ascend', 'descend', 'ascend'],
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
            chinese,
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable.' + this.curRealmId][0];
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
                delete this.query['startDate'];
                delete this.query['endDate'];
                this.refreshTableData();
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
