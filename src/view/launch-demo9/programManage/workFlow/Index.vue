<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div class="stepsCss">
                    <a-steps :current="1">
                        <a-step>
                            <template slot="title">
                                Finished
                            </template>
                            <span slot="description">This is a description.</span>
                        </a-step>
                        <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
                        <a-step title="Waiting" description="This is a description." />
                        <a-step title="Waiting" description="This is a description." />
                        <a-step title="Waiting" description="This is a description." />
                    </a-steps>
                </div>
                <template>
                    <div v-show="showOrg" class="table-left">
                        <org-tree
                            ref="orgTree"
                            :show.sync="showOrg"
                            realmId="platform"
                            @click="handleOrgMenuClick"
                            @select="handleOrgTreeSelect"
                        />
                        <div class="table-divider"></div>
                    </div>
                </template>
                <div class="fromCss">
                    <a-form-model
                        layout="inline"
                        :model="formInline"
                        @submit="handleSubmit"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-row>
                            <a-col :span="12" v-for="(item, index) in fromList" :key="index">
                                <a-form-model-item :label="item.name">
                                    <a-input
                                        v-model="formInline.user"
                                        disabled
                                        :placeholder="item.placeholder"
                                    ></a-input>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                    </a-form-model>
                </div>
                <!-- <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="false"
                >
                </crud-table>  -->
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import CrudTable from '@/component/rebue/CrudTable.vue';
import OrgTree from '../../../rac/rac-org/Tree.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // CrudTable,
        OrgTree,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // 数据列表在这里设置
                const dataSource = [
                    {
                        value1: '1区',
                        value2: '1',
                        value3: '2',
                        value4: '1',
                        value5: 'No1',
                        value6: '4',
                        value7: '6',
                        value8: '400',
                        value9: '6',
                        value10: '600',
                        value11: '',
                    },
                ];
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
                title: '所属区域',
            },
            {
                dataIndex: 'value2',
                title: '密集架类型',
            },
            {
                dataIndex: 'value3',
                title: '单双面选择',
            },
            {
                dataIndex: 'value4',
                title: '列编号',
            },
            {
                dataIndex: 'value5',
                align: 'center',
                title: '列名称',
            },
            {
                dataIndex: 'value6',
                title: '密集架类型',
            },
            {
                dataIndex: 'value7',
                title: '节数',
            },
            {
                dataIndex: 'value8',
                title: '节长度',
            },
            {
                dataIndex: 'value9',
                title: '层数',
            },
            {
                dataIndex: 'value10',
                align: 'center',
                title: '层高',
            },
            {
                dataIndex: 'value11',
                title: '备注',
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 200,
                fixed: 'right',
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
                title: '原信息维护',
                onClick: record => this.handleEdit(record),
            },
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
            fromList: [
                {
                    name: '主键ID',
                    placeholder: '沒有值',
                },
                {
                    name: '名称',
                    placeholder: '沒有值',
                },
                {
                    name: '描述信息',
                    placeholder: '沒有值',
                },
                {
                    name: '执行监听器',
                    placeholder: '未配置执行监听器',
                },
                {
                    name: '启动器',
                    placeholder: '沒有值',
                },
                {
                    name: '表单编号',
                    placeholder: '沒有值',
                },
                {
                    name: '表单属性',
                    placeholder: '未选择表单属性',
                },
            ],
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            formInline: {
                user: '',
                password: '',
            },
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            showOrg: true,
        };
    },
    mounted() {
        //
    },
    methods: {
        handleSubmit(e) {
            console.log(this.formInline);
        },
        handleOrgMenuClick() {
            //
        },
        handleOrgTreeSelect() {
            //
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
            this.editForm.show(EditFormTypeDic.Add, {
                realmId: this.curRealmId,
            });
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
.stepsCss {
    width: calc(100% - 200px);
    margin-top: 20px;
    float: right;
}
.fromCss {
    width: calc(100% - 200px);
    margin-top: 50px;
    float: right;
    /deep/ .ant-form-item {
        width: 100%;
    }
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
