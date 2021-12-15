//部门管理
<template>
    <div>
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
                        :rowSelection="{}"
                    >
                        <template #left>
                            <div>
                                <a-modal
                                    width="600px"
                                    title="新增部门"
                                    :visible="visible"
                                    :confirm-loading="confirmLoading"
                                    @ok="handleOk"
                                    @cancel="handleCancel"
                                >
                                    <a-form-model
                                        :label-col="{ span: 3 }"
                                        :wrapper-col="{ span: 20 }"
                                        layout="horizontal"
                                    >
                                        <a-form-model-item label="部门编号:">
                                            <a-input placeholder="20314523" disabled="true" />
                                        </a-form-model-item>
                                        <a-form-model-item label="部门编码:">
                                            <a-input placeholder="请输入部门编码" />
                                        </a-form-model-item>
                                        <a-form-model-item label="部门级别:">
                                            <a-select :default-value="depLevel[3]" @change="handleProvinceChange">
                                                <a-select-option v-for="depLevel in depLevel" :key="depLevel">
                                                    {{ depLevel }}
                                                </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                        <a-form-model-item label="部门领导:">
                                            <a-input-search placeholder="请输入部门领导名称" />
                                        </a-form-model-item>
                                        <a-form-model-item label="部门邮箱:">
                                            <a-input placeholder="请输入部门邮箱" />
                                        </a-form-model-item>
                                        <a-form-model-item label="部门名称:">
                                            <a-input placeholder="请输入部门名称" />
                                        </a-form-model-item>
                                        <a-form-model-item label="顺序号:">
                                            <a-input placeholder="请输入顺序号" />
                                        </a-form-model-item>
                                        <a-form-model-item label="上级部门:">
                                            <a-select :default-value="superiorDep[0]" @change="handleProvinceChange">
                                                <a-select-option v-for="superiorDep in superiorDep" :key="superiorDep">
                                                    {{ superiorDep }}
                                                </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                        <a-form-model-item label="部门电话:">
                                            <a-input placeholder="请输入部门电话" />
                                        </a-form-model-item>
                                        <a-form-model-item label="部门状态:">
                                            <a-select :default-value="depState[0]" @change="handleProvinceChange">
                                                <a-select-option v-for="depState in depState" :key="depState">
                                                    {{ depState }}
                                                </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                        <a-form-model-item label="部门职责:">
                                            <a-textarea
                                                placeholder="请输入部门职责"
                                                :auto-size="{ minRows: 2, maxRows: 6 }"
                                            />
                                        </a-form-model-item>
                                    </a-form-model>
                                </a-modal>
                            </div>
                        </template>
                    </crud-table>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

const depLevel = ['低一级', '低二级', '低三级', '中一级', '中二级', '中三级', '高一级', '高二级', '高三级'];
const superiorDep = ['办公室', '绩效办', '组织部', '研发部'];
const depState = ['活动', '冻结', '撤销'];

export default {
    name: 'signupConf',
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
                    'list|3-11': [
                        {
                            'id|+1': 10000000,
                            'number|100000-900000': 111111,
                            'depName|+1': [
                                '教工部',
                                '市县党校',
                                '办公室',
                                '监控室',
                                '绩效办公室',
                                '机关党委',
                                '财务处',
                                '艺术处',
                                '研发部',
                            ],
                            depLeader: '@cname',
                            superiorDep: '@pick(["市县党校", "区纪检组", "校-院领导", "办公室", "指挥部办公室"])',
                            depState: '@pick(["撤销","活动"," "])',
                            code: '',
                            'orderNum|100-999': 111,
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 20,
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
                dataIndex: 'no',
                title: '#',
                width: 50,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'number',
                title: '编号',
                width: 150,
            },
            {
                dataIndex: 'depName',
                title: '部门名称',
                width: 150,
            },
            {
                dataIndex: 'depLeader',
                title: '部门领导',
                width: 150,
            },
            {
                dataIndex: 'superiorDep',
                title: '上级部门',
                width: 150,
            },
            {
                dataIndex: 'depState',
                title: '部门状态',
                width: 150,
            },
            {
                dataIndex: 'code',
                title: '编码',
                width: 150,
            },
            {
                dataIndex: 'orderNum',
                title: '顺序号',
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '新增',
                onClick: this.showModal,
            },
            {
                buttonType: 'primary',
                title: '导入',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '导出',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '删除',
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
            columns,
            realm: {
                id: '1',
            },
            visible: false,
            confirmLoading: false,
            depLevel,
            superiorDep,
            depState,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                // this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            // this.$nextTick(this.refreshTableData);
        },
        handleAdd() {
            //
        },
        // 弹窗打开
        showModal() {
            this.visible = true;
        },
        // 弹窗点击ok
        handleOk(e) {
            this.ModalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            }, 2000);
        },
        // 弹窗点击取消
        handleCancel(e) {
            console.log('Clicked cancel button');
            this.visible = false;
        },
        // 下拉选项
        handleProvinceChange(value) {
            //
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
