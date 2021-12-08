<template>
    <fragment>
        <a-row>
            <a-col :span="6">
                <a-tree
                    class="ant-card-body"
                    v-model="checkedKeys"
                    :auto-expand-parent="autoExpandParent"
                    :default-selected-keys="selectedKeys"
                    :default-checked-keys="checkedKeys"
                    :default-expanded-keys="expandedKeys"
                    :tree-data="treeData"
                    @check="onCheck"
                />
            </a-col>
            <a-col :span="18">
                <base-manager ref="baseManager">
                    <template #managerCard>
                        <crud-table
                            ref="crudTable"
                            :showKeywords="true"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ orgId: curOrgId }"
                            :scrollX="800"
                            :defaultPagination="true"
                        >
                        </crud-table>
                    </template>
                </base-manager>
            </a-col>
        </a-row>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
        // OrgTree,
    },
    data() {
        this.api = {};
        const treeData = [
            {
                title: '2018年',
                key: '2018',
                children: [
                    {
                        title: '主体班教学工作量统计流程',
                        key: '20181',
                    },
                    {
                        title: '公培处工作量统计流程',
                        key: '20182',
                    },
                    {
                        title: '应急部工作量统计流程',
                        key: '20183',
                    },
                    {
                        title: '网络部工作量统计流程',
                        key: '20184',
                    },
                    {
                        title: '领导力工作量统计流程',
                        key: '20185',
                    },
                    {
                        title: '党性教育工作量统计流程',
                        key: '20186',
                    },
                ],
            },
            {
                title: '2017年',
                key: '2017',
                children: [
                    {
                        title: '主体班教学工作量统计流程',
                        key: '20171',
                    },
                    {
                        title: '公培处工作量统计流程',
                        key: '20172',
                    },
                    {
                        title: '应急部工作量统计流程',
                        key: '20173',
                    },
                    {
                        title: '网络部工作量统计流程',
                        key: '20174',
                    },
                    {
                        title: '领导力工作量统计流程',
                        key: '20175',
                    },
                    {
                        title: '党性教育工作量统计流程',
                        key: '20176',
                    },
                ],
            },
        ];

        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
            },
            {
                dataIndex: 'name',
                title: '项目名称',
                width: 200,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 100,
                scopedSlots: { customRender: 'action' },
            },
        ];

        const page = function() {
            const p = new Promise((resolve, reject) => {
                // 数据列表在这里设置
                const dataSource = [
                    {
                        id: 1,
                        no: 1,
                        name: '主体班单人课堂专题授课',
                    },
                    {
                        id: 2,
                        no: 2,
                        name: '主体班课堂合作授课不分主次',
                    },
                ];
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: dataSource.length,
                        },
                        list: dataSource,
                    },
                };
                resolve(ro);
            });
            return p;
        };

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '新增',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '复制',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '粘贴',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '排序',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: () => {
                    /**/
                },
            },
            {
                type: 'a',
                title: '删除',
                onClick: () => {
                    /**/
                },
            },
        ];
        this.api = {
            page,
            listAll: page,
            list: page,
        };
        return {
            expandedKeys: ['2018', '20181'],
            autoExpandParent: true,
            selectedKeys: [],
            checkedKeys: [],
            treeData,
            columns,
            showOrg: false,
            curOrgId: undefined,
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
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 编辑事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
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
};
</script>
<style type="text/css">
.ant-row {
    background-color: #ffffff;
}
</style>
