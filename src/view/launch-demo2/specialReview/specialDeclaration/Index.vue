<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                    :showKeywords="false"
                    :query="{ orgId: curOrgId }"
                >
                </crud-table>
                <div>
                    <a-modal
                        width="600px"
                        :title="title"
                        :visible="visible"
                        :confirm-loading="confirmLoading"
                        @cancel="handleCancel"
                    >
                        <a-form-model :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" layout="horizontal">
                            <a-form-model-item label="学期:">
                                <a-input :disabled="context" v-model="tableObj.value1" />
                            </a-form-model-item>
                            <a-form-model-item label="专题名称:">
                                <a-input type="textarea" :disabled="context" v-model="tableObj.value2" />
                            </a-form-model-item>
                            <a-form-model-item label="分组:">
                                <a-select
                                    v-model="tableObj.value3"
                                    v-decorator="['gender', { rules: [{ required: true, message: '请选择组别' }] }]"
                                    placeholder=""
                                    @change="handleSelectChange"
                                >
                                    <a-select-option value="1">
                                        1
                                    </a-select-option>
                                    <a-select-option value="2">
                                        2
                                    </a-select-option>
                                    <a-select-option value="3">
                                        3
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                            <a-form-model-item label="排序:">
                                <a-input :disabled="idEdit" v-model="tableObj.value4" placeholder="" />
                            </a-form-model-item>
                            <a-form-model-item label="申请人:">
                                <a-input :disabled="idEdit" v-model="tableObj.value5" placeholder="" />
                            </a-form-model-item>
                        </a-form-model>
                    </a-modal>
                </div>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|1-20': [
                        {
                            value1: '@pick(["2021年秋季学期", "2020年秋季学期","2019年秋季学期"])',
                            value2:
                                '@pick(["习近平新时代中国特色社会主义思想学习问答", "深入学习领会习近平总书记在庆祝中国共产党成立100周年大会的讲话精神"])',
                            'value3|+1': 1,
                            'value4|1-100': 100,
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 50,
                        },
                        list: dataSource,
                    },
                };
                resolve(ro);
            });

            return p;
        };
        this.api = {
            page,
            listAll: page,
            list: page,
        };
        const columns = [
            {
                dataIndex: 'value1',
                title: '学期',
                width: 150,
            },
            {
                dataIndex: 'value2',
                title: '专题名称',
                ellipsis: true,
                width: 600,
            },
            {
                dataIndex: 'value3',
                title: '分组',
                width: 150,
            },
            {
                dataIndex: 'value4',
                align: 'center',
                title: '排序',
                width: 150,
            },
            {
                dataIndex: 'value5',
                align: 'center',
                title: '申报人',
                width: 150,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,

                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '申报',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '撤销申报',
                confirmTitle: '你确定要撤销申报吗?',
                onClick: record => this.handleDel(record),
            },
        ];
        return {
            title: '',
            loading: false,
            curRealmId: '',
            visible: false,
            tableObj: {
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
            },
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            showOrg: true,
            curOrgId: undefined,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.refreshData();
    },
    methods: {
        refreshData() {
            this.loading = true;
            // racRealmApi
            //     .listAll()
            //     .then(ro => {
            //         this.realms = ro.extra.list;
            //         this.curRealmId = this.realms[0].id;
            //     })
            //     .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleRealmChanged(realmId) {
            this.curRealmId = realmId;
        },
        /**
         * 处理添加应用的事件
         */
        handleCancel() {
            this.visible = false;
        },
        handleAdd() {
            // this.editForm.show(EditFormTypeDic.Add, {
            //     realmId: this.curRealmId,
            // });
            this.visible = true;
            this.title = '新建';
        },
        /**
         * 处理编辑应用的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除应用的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api
                .delById(record.id)
                .then(() => {
                    this.refreshTableData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        /**
         * 处理应用菜单的事件
         */
        handleMenus(record) {
            this.curApp = record;
            this.manageMenusFormVisible = true;
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>

<style lang="less" scoped>
.realm-tabs {
    overflow: visible; /* 否则表格的分页选择框展开时会被遮挡 */
}

.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
