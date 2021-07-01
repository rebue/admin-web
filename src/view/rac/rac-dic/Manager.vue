<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :columns.sync="columns"
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
import { racDicApi, racDicItemApi, racSysApi, racDomainApi } from '@/api/Api';

let domains = [];
let syss = [];
racSysApi.list().then(ro => {
    syss = Object.values(ro.extra.list).map(item => {
        return {
            value: item.id,
            text: item.name,
        };
    });
});
racDomainApi.listAll().then(ro => {
    domains = Object.values(ro.extra.list).map(item => {
        return {
            value: item.id,
            text: item.name,
        };
    });
});
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
        // racDomainApi.listAll().then(ro => {
        //     this.domains = Object.values(ro.extra.list).map(item => {
        //         return {
        //             value: item.id,
        //             text: item.name,
        //         };
        //     });
        // });
        // racSysApi.list().then(ro => {
        //     this.syss = Object.values(ro.extra.list).map(item => {
        //         return {
        //             value: item.id,
        //             text: item.name,
        //         };
        //     });
        // });
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
            domains: domains,
            edintLinkFormVisible: false,
            manageMenuFormVisible: false,
            curRecord: {},
            syss: syss,
        };
    },
    computed: {
        columns() {
            return [
                {
                    dataIndex: 'name',
                    title: '名称',
                    width: 300,
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
                    key: 'domainIds',
                    title: '领域',
                    with: 100,
                    ellipsis: true,
                    filters: this.domains,
                },
                {
                    dataIndex: 'sysId',
                    key: 'sysIds',
                    title: '系统',
                    with: 120,
                    ellipsis: true,
                    filters: this.syss,
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
                                    <a-divider type="vertical" />
                                    <a onClick={() => this.handleItemAdd(record)}>添加字典项</a>
                                </span>
                            );
                        }
                    },
                },
            ];
        },
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
        this.dicItemeditForm = this.$refs.dicItemeditForm;
        this.dicEditForm = this.$refs.dicEditForm;
        // racDomainApi.listAll().then((ro) => {
        //     this.domains = Object.values(ro.extra.list).map((item) => {
        //         return {
        //             value: item.id,
        //             text: item.name,
        //         };
        //     });
        // });
        // racSysApi.list().then((ro) => {
        //     this.syss = Object.values(ro.extra.list).map((item) => {
        //         return {
        //             value: item.id,
        //             text: item.name,
        //         };
        //     });
        // });
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
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
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
            this.loading = false;
        },
        /**
         * 处理字典添加字典项的事件
         */
        handleAdd(record) {
            this.crudTable.expand(record.id);
            this.dicItemeditForm.show(EditFormTypeDic.Add, { dicId: record.id });
        },
        /**
         * 处理字典项添加字典项的事件
         */
        handleItemAdd(record) {
            this.crudTable.expand(record.id);
            const { dicId, id } = { ...record };
            const parentId = id;
            this.dicItemeditForm.show(EditFormTypeDic.Add, { dicId, parentId });
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
            racDicItemApi.delById(record.id).finally(() => {
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
