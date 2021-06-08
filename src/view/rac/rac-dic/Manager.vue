<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <!-- :query="{ domainId: curDomainId }" -->
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :columns="columns"
                    :api="api"
                    :query="{}"
                    :scrollX="600"
                    :scrollY="600"
                    :expandable="true"
                    :showKeywords="true"
                >
                </crud-table>
            </template>
        </base-manager>
        <edit-form ref="dicEditForm" @close="handleEditFormClose" />
        <edit-dic-item-form ref="dicItemeditForm" @close="handleEditFormClose" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditDicItemForm from './EditDicItemForm.vue';
import EditForm from './EditForm.vue';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racDicApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        EditDicItemForm,
        CrudTable,
    },
    data() {
        this.api = racDicApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '名称',
                width: 250,
                fixed: 'left',
                customRender: (text, record) => {
                    if (!record.dicId) {
                        return (
                            <span>
                                <a-tag color="blue">
                                    字典
                                    <a-icon type="tags" />
                                </a-tag>
                                {{ text }}
                            </span>
                        );
                    } else {
                        return (
                            <fragment>
                                <a-tag color="blue">
                                    字典项
                                    <a-icon type="tag" />
                                </a-tag>
                                {{ text }}
                            </fragment>
                        );
                    }
                },
            },
            {
                dataIndex: 'domainId',
                key: 'domainId',
                title: '领域',
                with: 100,
                ellipsis: true,
                filters: [
                    { text: '平台领域', value: 'platform' },
                    { text: '运营领域', value: 'ops' },
                    { text: '默认领域', value: 'default' },
                ],
            },
            {
                dataIndex: 'sysId',
                key: 'sysId',
                title: '系统',
                with: 120,
                ellipsis: true,
                filters: [
                    { text: '平台系统', value: 'ops-admin-web' },
                    { text: '运营系统', value: 'platform-admin-web' },
                    { text: '默认系统', value: 'default' },
                ],
            },
            {
                dataIndex: 'remark',
                title: '备注',
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 200,
                fixed: 'right',
                customRender: (text, record) => {
                    if (!record.dicId) {
                        return (
                            <span>
                                <a onClick={() => this.handleDicEdit(record)}>编辑</a>
                                <a-divider type="vertical" />
                                <a-popconfirm
                                    title="你确定要删除本条记录吗?"
                                    onConfirm={() => this.handleDicDel(record)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <a>删除</a>
                                </a-popconfirm>
                                <a-divider type="vertical" />
                                <a onClick={() => this.handleAdd(record)}>添加字典项</a>
                            </span>
                        );
                    } else {
                        return (
                            <span>
                                <a onClick={() => this.handleEdit(record)}>编辑</a>
                                <a-divider type="vertical" />
                                <a-popconfirm
                                    title="你确定要删除本条记录吗?"
                                    onConfirm={() => this.handleDel(record)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <a>删除</a>
                                </a-popconfirm>
                            </span>
                        );
                    }
                },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建字典',
                onClick: this.handleDicAdd,
            },
        ];

        return {
            loading: false,
            curDomainId: '',
            domains: [],
            columns,
            edintLinkFormVisible: false,
            manageMenuFormVisible: false,
            curRecord: {},
        };
    },
    computed: {
        //
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
        this.dicItemeditForm = this.$refs.dicItemeditForm;
        this.dicEditForm = this.$refs.dicEditForm;
        //this.refreshTableData();
    },
    methods: {
        // /**
        //  * 刷新数据
        //  */
        // refreshData() {
        //     this.loading = true;
        //     racDomainApi
        //         .listAll()
        //         .then((ro) => {
        //             this.domains = ro.extra.list;
        //             if (!this.curDomainId) this.curDomainId = this.domains[0].id;
        //         })
        //         .finally(() => (this.loading = false));
        // },
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
        /**
         * 处理添加字典的事件
         */
        handleDicAdd() {
            this.dicEditForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑字典的事件
         */
        handleDicEdit(record) {
            this.dicEditForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除字典的事件
         */
        handleDicDel(record) {
            this.loading = true;
            racDicApi.delById(record.id).finally(() => {
                this.refreshTableData();
            });
            this.loading = false;
        },
        /**
         * 处理添加字典项的事件
         */
        handleAdd(record) {
            this.crudTable.expand(record.id);
            this.dicItemeditForm.show(EditFormTypeDic.Add, { dicId: record.id });
        },
        /**
         * 处理字典项的事件
         */
        handleEdit(record) {
            this.dicItemeditForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除字典项的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
            this.loading = false;
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>
