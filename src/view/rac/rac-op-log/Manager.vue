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
import { racRealmApi, racOpLogApi } from '@/api/Api';
import { OpTypeDic } from '@/dic/OpTypeDic';
import chinese from 'ant-design-vue/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh_cn');

const opTypeDic = Object.values(OpTypeDic).map(item => {
    return {
        value: item,
        text: item,
    };
});
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
                            邮箱：{record.signInEmail}
                            <br />
                            账户昵称：{record.signInNickname}
                            <br />
                            微信昵称：{record.wxNickname}
                            <br />
                            QQ昵称：{record.qqNickname}
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'agentSignInName',
                key: 'agentSignInName',
                title: '代理账号名称',
                fixed: 'left',
                ellipsis: true,
                width: 150,
                customRender: (text, record) => (
                    <a-popover
                        title={(record.agentSignInName || record.agentSignInMobile || record.agentSignInEmail) + '详情'}
                    >
                        {record.agentSignInName || record.agentSignInMobile || record.agentSignInEmail}
                        <template slot="content">
                            <p>代理人账户ID：{record.agentId}</p>
                            <p>代理人账户名：{record.agentSignInName}</p>
                            <p>代理人手机号：{record.agentSignInMobile}</p>
                            代理人邮箱：{record.agentSignInEmail}
                            <br />
                            代理人账户昵称：{record.agentSignInNickname}
                            <br />
                            代理人微信昵称：{record.agentwxNickname}
                            <br />
                            代理人QQ昵称：{record.agentqqNickname}
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
                    <a-popover overlayClassName="mystyle" title={text + '详情'}>
                        {text}
                        <template slot="content">
                            <p>系统名称：{record.sysName}</p>
                            <p>领域ID：{record.realmId}</p>
                            <p>菜单：{record.menu}</p>
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
                filters: opTypeDic,
                // [
                //     { text: OpTypeDic.login, value: OpTypeDic.login },
                //     { text: OpTypeDic.register, value: OpTypeDic.register },
                //     { text: OpTypeDic.add, value: OpTypeDic.add },
                //     { text: OpTypeDic.modify, value: OpTypeDic.modify },
                // ],
                customRender: (text, record) => (
                    <a-popover overlayClassName="mystyle" title={text + '详情'}>
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
            curRealmId: '',
            query: {},
            realms: [],
            chinese,
            moment,
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
