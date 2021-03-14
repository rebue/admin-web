<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <a-tabs class="domain-tabs" :activeKey="curDomainId" @change="handleDomainChanged">
                <a-tab-pane v-for="domain in domains" :key="domain.id" :tab="domain.name">
                    <crud-table
                        :showKeywords="true"
                        :ref="'crudTable.' + domain.id"
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

export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        this.api = racOpLogApi;
        const columns = [
            {
                dataIndex: 'accountId',
                title: '账号ID',
                fixed: 'left',
            },
            {
                dataIndex: 'accountName',
                title: '账号名称',
                ellipsis: true,
            },
            {
                dataIndex: 'opType',
                title: '操作类型',
                ellipsis: true,
                filters: [
                    { text: '登录', value: '登录' },
                    { text: '注册', value: '注册' },
                    { text: '操作', value: '操作' },
                ],
            },
            {
                dataIndex: 'opTitle',
                title: '操作标题',
                ellipsis: true,
            },
            {
                dataIndex: 'opDetail',
                title: '操作详情',
                ellipsis: true,
            },
            {
                dataIndex: 'opDateTime',
                title: '操作时间',
                ellipsis: true,
            },
        ];

        return {
            loading: false,
            curDomainId: '',
            domains: [],
            columns,
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
