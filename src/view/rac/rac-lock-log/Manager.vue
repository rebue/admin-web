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
import { racDomainApi, racLockLogApi } from '@/api/Api';

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
                dataIndex: 'id',
                title: '锁定日志',
                fixed: 'left',
            },
            {
                dataIndex: 'domainName',
                title: '系统',
                ellipsis: true,
            },
            {
                dataIndex: 'accountName',
                title: '锁定账户的账户',
                ellipsis: true,
            },
            {
                dataIndex: 'lockOpName',
                title: '锁定操作员的账户',
                ellipsis: true,
            },
            {
                dataIndex: 'lockReason',
                title: '锁定原因',
                ellipsis: true,
            },
            {
                dataIndex: 'lockDateTime',
                title: '锁定时间',
                ellipsis: true,
            },
            {
                dataIndex: 'unlockReason',
                title: '解锁原因',
                ellipsis: true,
            },
            {
                dataIndex: 'unlockDateTime',
                title: '解锁时间',
                ellipsis: true,
            },
            {
                dataIndex: 'unlockOpName',
                title: '解锁操作员的账户',
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
        clickk() {
            console.log(564);
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
