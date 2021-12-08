//院委会研究
<template>
    <fragment>
        <a-row>
            <a-col :span="4">
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
            <a-col :span="20">
                <base-manager ref="baseManager">
                    <template #managerCard>
                        <div style="float: left; margin-top: 5px; margin-right: 16px">
                            <a-select
                                :default-value="year[0]"
                                style="width: 80px; margin-right: 16px"
                                @change="handleProvinceChange"
                            >
                                <a-select-option v-for="year in year" :key="year">
                                    {{ year }}
                                </a-select-option>
                            </a-select>
                            <a-select :default-value="date[0]" style="width: 80px" @change="handleProvinceChange">
                                <a-select-option v-for="date in date" :key="date">
                                    {{ date }}
                                </a-select-option>
                            </a-select>
                        </div>
                        <crud-table
                            ref="crudTable"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ orgId: curOrgId }"
                            :scrollX="800"
                            :defaultPagination="true"
                            :rowSelection="{}"
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

const year = ['2021', '2020', '2019', '2018', '2017', '2016'];
const date = ['全部', '待议', '已议'];
export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
        // OrgTree,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            'fileNum|100000-900000': 111111,
                            title:
                                '关于商请减免区机关事务管理局十九届五中全会精神暨习近平总书记视察广西时的重要讲话精神培训费的函',
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
        const treeData = [
            {
                title: '待议',
                key: '2021',
            },
            {
                title: '2021-01-07议题',
                key: '20211',
            },
            {
                title: '2021-01-12议题',
                key: '20212',
            },
            {
                title: '2021-01-26议题',
                key: '20213',
            },
            {
                title: '2021-02-22议题',
                key: '20214',
            },
            {
                title: '2021-03-04议题',
                key: '20215',
            },
            {
                title: '2021-03-22议题',
                key: '20216',
            },
            {
                title: '2021-03-22议题',
                key: '20216',
            },
            {
                title: '2021-03-22议题',
                key: '20216',
            },
            {
                title: '2021-05-27议题',
                key: '20216',
            },
        ];

        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
            },
            {
                dataIndex: 'fileNum',
                title: '文件号',
                width: 200,
            },
            {
                dataIndex: 'title',
                title: '标题',
                width: 800,
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
                title: '配置管理员',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '删除',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看',
                onClick: () => {
                    /**/
                },
            },
            {
                type: 'a',
                title: '移动',
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
            expandedKeys: ['2021', '20211'],
            autoExpandParent: true,
            selectedKeys: [],
            checkedKeys: [],
            treeData,
            columns,
            showOrg: false,
            curOrgId: undefined,
            year,
            date,
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
</style>
