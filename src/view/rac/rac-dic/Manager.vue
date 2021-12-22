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
                    @moveUp="handleMoveUp"
                    @moveDown="handleMoveDown"
                >
                </crud-table>
            </template>
        </base-manager>
        <edit-form ref="dicEditForm" @success="handleEditFormClose" />
        <edit-dic-item-form ref="dicItemeditForm" @success="handleEditFormClose" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditDicItemForm from './EditDicItemForm.vue';
import EditForm from './EditForm.vue';
import CrudTable from './dicCrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racDicApi, racDicItemApi, racAppApi, racRealmApi } from '@/api/Api';

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
        this.columns = [
            {
                dataIndex: 'name',
                title: '名称',
                width: 300,

                customRender: (text, record) => {
                    if (!record.dicId) {
                        return (
                            <span>
                                <a-tag color="blue">
                                    字典
                                    <a-icon type="tags" />
                                </a-tag>
                                {text}
                            </span>
                        );
                    } else {
                        return (
                            <fragment>
                                <a-tag color="blue">
                                    字典项
                                    <a-icon type="tag" />
                                </a-tag>
                                {text}
                            </fragment>
                        );
                    }
                },
            },
            {
                dataIndex: 'realmId',
                title: '领域',
                width: 100,
                ellipsis: true,
                customRender: (text, record) => {
                    const item = this.realms.find(v => {
                        return v.id == record.realmId;
                    });

                    return item && item.name;
                },
            },
            {
                dataIndex: 'appId',
                title: '应用',
                width: 120,
                ellipsis: true,
                customRender: (text, record) => {
                    const item = this.apps.find(v => {
                        return v.id == record.appId;
                    });

                    return item && item.name;
                },
            },
            {
                dataIndex: 'remark',
                title: '备注',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 200,

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
            {
                dataIndex: 'sort',
                align: 'center',
                title: '排序',
                width: 100,

                scopedSlots: { customRender: 'sort' },
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
            edintLinkFormVisible: false,
            manageMenuFormVisible: false,
            curRecord: {},
            realms: [],
            apps: [],
        };
    },
    created() {
        racAppApi.list().then(ro => {
            this.apps = ro.extra.list;
        });
        racRealmApi.listAll().then(ro => {
            this.realms = ro.extra.list;
        });
    },
    computed: {},
    mounted() {
        this.crudTable = this.$refs.crudTable;
        this.dicItemeditForm = this.$refs.dicItemeditForm;
        this.dicEditForm = this.$refs.dicEditForm;
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
        /**
         * 上移
         */
        handleMoveUp(record) {
            this.loading = true;
            racDicItemApi.moveUp(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 下移
         */
        handleMoveDown(record) {
            this.loading = true;
            racDicItemApi.moveDown(record.id).finally(() => {
                this.refreshTableData();
            });
        },
    },
};
</script>
