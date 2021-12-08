<template>
    <div>
        <fragment>
            <a-row>
                <div class="btn-group">
                    <a-button class="btn">新增子分组</a-button>
                    <a-button class="btn">修改子分组</a-button>
                    <a-button class="btn">删除子分组</a-button>
                </div>
            </a-row>
            <a-row>
                <a-col :span="6">
                    <a-tree
                        class="ant-card-body"
                        v-model="checkedKeys"
                        :auto-expand-parent="autoExpandParent"
                        :default-selected-keys="selectedKeys"
                        :default-checked-keys="checkedKeys"
                        :defaultExpandAll="true"
                        :default-expanded-keys="expandedKeys"
                        :tree-data="treeData"
                        @check="onCheck"
                    />
                </a-col>
                <a-col :span="18">
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="组权限">
                            <div>
                                <a-table
                                    :columns="columns"
                                    :data-source="tableData"
                                    :row-selection="rowSelection"
                                    :expanded-row-keys.sync="expandedRowKeys"
                                />
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="组成员" force-render>
                            <div>
                                <a-table
                                    :columns="columns"
                                    :data-source="tableData"
                                    :row-selection="rowSelection"
                                    :expanded-row-keys.sync="expandedRowKeys"
                                />
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
        </fragment>
    </div>
</template>

<script>
const columns = [
    {
        title: '权限名称',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
    },
];

const tableData = [
    {
        key: 1,
        name: '绩效工作量',
        children: [
            {
                key: 11,
                name: '系统框架',
                children: [
                    {
                        key: 111,
                        name: '工作量管理部门',
                    },
                    {
                        key: 112,
                        name: '工作量年份',
                    },
                ],
            },
            {
                key: 12,
                name: '工作量设置',
                children: [
                    {
                        key: 121,
                        name: '教务处设置',
                    },
                    {
                        key: 122,
                        name: '项目管理',
                    },
                ],
            },
        ],
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};
export default {
    data() {
        const treeData = [
            {
                title: '教学工作量',
                key: '1',
                children: [
                    {
                        title: '主体班级工作量角色',
                        key: '1-1',
                        children: [
                            {
                                title: '主体班任课老师',
                                key: '1-1-1',
                            },
                        ],
                    },
                    {
                        title: '研究生班工作量角色',
                        key: '1-2',
                        children: [
                            {
                                title: '教师',
                                key: '1-2-1',
                            },
                            {
                                title: '研究生管理员',
                                key: '1-2-2',
                            },
                        ],
                    },
                    {
                        title: '其他工作量角色',
                        key: '1-3',
                    },
                ],
            },
        ];

        return {
            expandedKeys: ['2018', '20181'],
            autoExpandParent: true,
            selectedKeys: [],
            checkedKeys: [],
            treeData,
            tableData,
            columns,
            rowSelection,
            expandedRowKeys: [],
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        onCheck(checkedKeys, info) {
            console.log('onCheck', checkedKeys, info);
        },
        onSelect(selectedKeys, info) {
            console.log('onSelect', info);
            this.selectedKeys = selectedKeys;
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 新增事件
         */
        handleAdd() {
            // this.editForm.show(EditFormTypeDic.Add, {});
        },

        /**
         * 删除事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            this.$nextTick(this.refreshTableData);
        },
    },
    watch: {
        checkedKeys(val) {
            console.log('onCheck', val);
        },
    },
};
</script>

<style type="text/css">
.ant-row {
    background-color: #ffffff;
}
.btn-group {
    margin: 30px 0 0 30px;
}
.btn {
    margin-right: 10px;
}
</style>
