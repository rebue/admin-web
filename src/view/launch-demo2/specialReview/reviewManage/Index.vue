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
                    <template #keywordsLeft>
                        <label style="width: 100px; line-height: 30px; text-align: right;">选择学期：</label>
                        <a-select default-value="2021" style="width: 120px" @change="handleChange">
                            <a-select-option value="2021">
                                2021
                            </a-select-option>
                            <a-select-option value="2020">
                                2020
                            </a-select-option>
                        </a-select>
                    </template>
                </crud-table>
                <div>
                    <a-modal width="600px" :title="title" :visible="visible" @cancel="handleCancel">
                        <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" layout="horizontal">
                            <a-form-model-item label="专题名称:">
                                <a-input :disabled="context" v-model="tableObj.value1" placeholder="" />
                            </a-form-model-item>

                            <a-form-model-item label="分组:">
                                <a-select
                                    v-model="tableObj.value2"
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
                            value1:
                                '@pick(["习近平新时代中国特色社会主义思想学习问答", "深入学习领会习近平总书记在庆祝中国共产党成立100周年大会的讲话精神"])',
                            'value2|+1': 1,
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
            },
            {
                dataIndex: 'value2',
                title: '分组',
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 400,

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
                title: '开通评审',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '显示',
                // confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'a',
                title: '清除评分',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'a',
                title: '查看排名',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'a',
                title: '统计分数',
                onClick: record => this.handleEdit(record),
            },
        ];
        return {
            idEdit: false,
            context: false,
            visible: false,
            tableObj: {
                value1: '',
                value2: '',
            },
            loading: false,
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
        handleCancel() {
            this.visible = false;
        },
        handleChange() {
            //
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
            };
            this.visible = true;
            this.context = false;
            this.idEdit = false;
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
