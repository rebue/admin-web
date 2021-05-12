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
                        :query="{ domainId: curDomainId }"
                        :scrollX="600"
                    >
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
                    <a-popover title={text + '详情'}>
                        {text}
                        <template slot="content">
                            <p>账户ID：{record.accountId}</p>
                            <p>账户名：{record.signInName}</p>
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
                width: 150,
                filters: [
                    { text: OpTypeDic.login, value: OpTypeDic.login },
                    { text: OpTypeDic.register, value: OpTypeDic.register },
                    { text: OpTypeDic.operation, value: OpTypeDic.operation },
                ],
            },
            {
                dataIndex: 'opTitle',
                key: 'opTitle',
                title: '操作标题',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'opDetail',
                key: 'opDetail',
                title: '操作详情',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'opDatetime',
                key: 'opDatetime',
                title: '操作时间',
                ellipsis: true,
                width: 150,
                sorter: true,
                sortDirections: ['ascend', 'descend', 'ascend'],
            },
        ];
        return {
            loading: false,
            curDomainId: '',
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
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            racDomainApi
                .listAll()
                .then(ro => {
                    this.domains = ro.extra.list;
                    if (!this.curDomainId) this.curDomainId = this.domains[0].id;
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
        },
    },
};
</script>
<style lang="less" scoped>
.domain-tabs {
    overflow: visible; // 否则表格的分页选择框展开时会被遮挡
}
</style>
