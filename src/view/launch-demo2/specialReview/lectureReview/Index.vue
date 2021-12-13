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
                    <a-modal width="600px" :title="title" :visible="visible" @cancel="handleCancel">
                        <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" layout="horizontal">
                            <a-form-model-item label="专题名称:">
                                <a-input :disabled="context" v-model="tableObj.value1" />
                            </a-form-model-item>
                            <a-form-model-item label="试讲人工号:">
                                <a-input :disabled="context" v-model="tableObj.value2"> </a-input>
                            </a-form-model-item>
                            <a-form-model-item label="试讲人名称:">
                                <a-input :disabled="context" v-model="tableObj.value3" placeholder="" />
                            </a-form-model-item>
                            <a-form-model-item label="学期:">
                                <a-input :disabled="context" v-model="tableObj.value4" placeholder="" />
                            </a-form-model-item>
                            <a-form-model-item label="分组:">
                                <a-select
                                    v-model="tableObj.value5"
                                    v-decorator="['gender', { rules: [{ required: true, message: '请选择组别' }] }]"
                                    placeholder="请选择组别"
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
                            <a-form-model-item label="评委组:">
                                <a-input :disabled="context" v-model="tableObj.value6" placeholder="" />
                            </a-form-model-item>
                            <a-form-model-item label="试讲分数:">
                                <a-input :disabled="context" v-model="tableObj.value7" placeholder="" />
                            </a-form-model-item>
                            <a-form-model-item label="试讲时间:">
                                <!-- <a-input :disabled="context"  v-model="tableObj.value8" placeholder="" /> -->
                                <a-date-picker
                                    v-model="tableObj.value8"
                                    v-decorator="['请选择试讲时间', config]"
                                    show-time
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
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
import { racAccountApi } from '@/api/Api';

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
                            value1: '@pick(["理论教育（基本理论）","广西区情与实践"])',
                            'value2|1-10000': 10000,
                            value3: '@cname()',
                            value4: '@pick(["2021年秋季学期", "2020年秋季学期","2019年秋季学期"])',
                            'value5|1-10': 10,
                            value6: '',
                            'value7|1-100': 100,
                            value8: '@date("yyyy-MM-dd")',
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
                title: '专题名称',
                width: 250,
            },
            {
                dataIndex: 'value2',
                title: '试讲人工号',
                width: 150,
            },
            {
                dataIndex: 'value3',
                title: '试讲人名称',
                width: 150,
            },
            {
                dataIndex: 'value4',
                title: '学期',
                width: 150,
            },
            {
                dataIndex: 'value5',
                title: '分组',
                width: 150,
            },
            {
                dataIndex: 'value6',
                title: '评委组',
                width: 150,
            },
            {
                dataIndex: 'value7',
                title: '试讲分数',
                width: 150,
            },
            {
                dataIndex: 'value8',
                title: '试讲时间',
                width: 150,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 200,

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
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
        ];
        return {
            title: '',
            tableObj: {
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
                value6: '',
                value7: '',
                value8: '',
            },
            visible: false,
            idEdit: false,
            loading: false,
            context: false,
            curRealmId: '',
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
        handleChange() {
            //
        },
        handleCancel() {
            this.visible = false;
        },

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
        /**
         * 处理添加应用的事件
         */
        handleAdd() {
            // this.editForm.show(EditFormTypeDic.Add, {
            //     realmId: this.curRealmId,
            // });
            this.tableObj = {
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
                value6: '',
                value7: '',
                value8: '',
            };
            this.title = '新建';
            this.visible = true;
            this.idEdit = false;
            this.context = false;
        },
        /**
         * 处理编辑应用的事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
            this.title = '编辑';

            this.idEdit = true;
            this.context = false;
            this.tableObj = record;
            this.visible = true;
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
