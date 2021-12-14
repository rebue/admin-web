//院委会研究
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="4">
                            <a-tree
                                v-model="checkedKeys"
                                :auto-expand-parent="autoExpandParent"
                                :default-selected-keys="selectedKeys"
                                :default-checked-keys="checkedKeys"
                                :default-expanded-keys="expandedKeys"
                                :tree-data="treeData"
                                @check="onCheck"
                            />
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height:100%"></a-divider>
                        </a-col>
                        <a-col :span="19">
                            <crud-table
                                ref="crudTable"
                                :actions="tableActions"
                                :columns="columns"
                                :api="api"
                                :query="{ orgId: curOrgId }"
                                :scrollX="800"
                                :defaultPagination="true"
                                :rowSelection="{}"
                            >
                                <template #commands>
                                    <a-select
                                        :default-value="year[0]"
                                        style="width: 80px; margin-right: 10px"
                                        @change="handleProvinceChange"
                                    >
                                        <a-select-option v-for="year in year" :key="year">
                                            {{ year }}
                                        </a-select-option>
                                    </a-select>
                                    <a-select
                                        :default-value="date[0]"
                                        style="width: 80px;margin-right:10px"
                                        @change="handleProvinceChange"
                                    >
                                        <a-select-option v-for="date in date" :key="date">
                                            {{ date }}
                                        </a-select-option>
                                    </a-select>
                                    <a-button class="btn">配置管理员</a-button>
                                    <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消">
                                        <a-button class="btn">删除</a-button>
                                    </a-popconfirm>
                                </template>
                            </crud-table>
                        </a-col>
                    </a-row>
                    <div>
                        <a-modal
                            width="600px"
                            :title="title"
                            :visible="visible"
                            :confirm-loading="confirmLoading"
                            @cancel="handleCancel"
                        >
                            <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" layout="horizontal">
                                <a-form-model-item label="文件号:">
                                    <a-input placeholder="" v-model="tableObj.fileNum" :disabled="context" />
                                </a-form-model-item>
                                <a-form-model-item label="标题:">
                                    <a-input
                                        type="textarea"
                                        placeholder=""
                                        v-model="tableObj.title"
                                        :disabled="context"
                                    />
                                </a-form-model-item>
                            </a-form-model>
                        </a-modal>
                    </div>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { forIn } from 'lodash';

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
                            yd: '',
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
                scopedSlots: { customRender: 'serial' },
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
                width: 200,
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
                onClick: res => this.handleShow(res),
                /**/
            },
            {
                type: 'more',
                items: [
                    {
                        type: 'a',
                        title: '上移',
                        onClick: record => this.handleYd(record, 1),
                    },
                    {
                        type: 'a',
                        title: '下移',
                        onClick: record => this.handleYd(record, 2),
                    },
                ],
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
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
            title: '',
            context: false,
            idEdit: false,
            visible: false,
            tableObj: {
                fileNum: '',
                title: '',
            },
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
        //移动数据
        handleYd(value, type) {
            let b = true;
            const index = this.crudTable.dataSource.findIndex(v => {
                return v.id == value.id;
            });
            if (type == 1) {
                const preIndex = index - 1;
                const preRecord = this.crudTable.dataSource[preIndex];
                console.log('---index', index, preIndex, preRecord);
                if (preIndex < 0) {
                    b = false;
                    this.$message.error('已经在最顶部');
                    return;
                }
                this.$set(this.crudTable.dataSource, preIndex, value);
                this.$set(this.crudTable.dataSource, index, preRecord);
            } else {
                const preIndex = index + 1;
                const preRecord = this.crudTable.dataSource[preIndex];
                console.log('---index', index, preIndex, preRecord);
                if (preIndex > this.crudTable.dataSource.length - 1) {
                    b = false;
                    this.$message.error('已经在最底部');
                    return;
                }
                this.$set(this.crudTable.dataSource, preIndex, value);
                this.$set(this.crudTable.dataSource, index, preRecord);
            }
            if (b) {
                this.$message.success('移动成功');
            }
        },
        handleCancel() {
            this.visible = false;
        },
        handleShow(value) {
            this.title = '查看详情';
            this.tableObj = value;
            this.context = true;
            this.visible = true;
        },
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
.btn {
    margin-right: 10px;
}
</style>
