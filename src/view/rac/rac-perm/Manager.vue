<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <a-tabs :activeKey="curDomainId" @change="handleDomainChanged">
                <a-tab-pane v-for="item in domains" :key="item.id" :tab="item.name">
                    <crud-table
                        :ref="'crudTable.' + item.id"
                        :commands="tableCommands"
                        :actions="tableActions"
                        :columns="columns"
                        :api="api"
                        :query="{ domainId: curDomainId }"
                        :scrollX="600"
                        :pagination="false"
                        :fullScreenDom="fullScreenDom"
                    >
                        <template #customRender>
                            <span slot="enable" slot-scope="text, record">
                                {{ record }}
                            </span>
                            <span slot="sort" slot-scope="text, record">
                                {{ record }}
                            </span>
                        </template>
                        <template #editForm="slotProps">
                            <edit-form
                                :ref="'editForm.' + item.id"
                                :width="640"
                                @close="slotProps.handleEditFormClose"
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
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racDomainApi } from '@/api/Api';
import { racPermApi } from '@/api/Api';

const columns = [
    {
        dataIndex: 'no',
        title: '#',
        scopedSlots: { customRender: 'serial' },
        width: 50,
        fixed: 'left',
    },
    {
        dataIndex: 'name',
        title: '名称',
        width: 150,
        fixed: 'left',
    },
    {
        dataIndex: 'remark',
        title: '备注',
        ellipsis: true,
    },
    {
        dataIndex: 'enable',
        title: '启用',
        width: 80,
        fixed: 'right',
        scopedSlots: { customRender: 'enable' },
    },
    {
        dataIndex: 'sort',
        title: '排序',
        width: 80,
        fixed: 'right',
        scopedSlots: { customRender: 'sort' },
    },
    {
        dataIndex: 'action',
        title: '操作',
        width: 130,
        fixed: 'right',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        CrudTable,
    },
    data() {
        this.api = racPermApi;
        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建分组',
                onClick: () =>
                    this.$refs['editForm.' + this.curDomainId][0].show(EditFormTypeDic.Add, {
                        domainId: this.curDomainId,
                    }),
            },
        ];
        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.$refs['editForm.' + this.curDomainId][0].show(EditFormTypeDic.Modify, record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.$refs['crudTable.' + this.curDomainId][0].handleDel(record),
            },
        ];

        return {
            loading: false,
            fullScreenDom: {},
            curDomainId: '',
            domains: [],
            columns,
        };
    },
    watch: {},
    mounted() {
        this.fullScreenDom = this.$refs.baseManager;
        this.refreshData();
    },
    methods: {
        refreshData() {
            this.loading = true;
            racDomainApi
                .listAll()
                .then(ro => {
                    this.domains = ro.extra.list;
                    this.curDomainId = this.domains[0].id;
                })
                .finally(() => (this.loading = false));
        },
        handleDomainChanged(domainId) {
            console.log(domainId);
            this.curDomainId = domainId;
        },
    },
};
</script>
