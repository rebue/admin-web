<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row>
                    <a-col :span="5">
                        <div class="table-left">
                            <a-tree class="ant-card-body" show-icon :defaultExpandAll="true" :tree-data="treeData">
                                <a-icon slot="clock-circle" type="clock-circle-o" />
                            </a-tree>
                            <div class="table-divider"></div>
                        </div>
                    </a-col>
                    <a-col :span="19">
                        <crud-table
                            ref="crudTable"
                            :showKeywords="true"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ orgId: curOrgId }"
                            :scrollX="600"
                            :defaultPagination="true"
                        >
                        </crud-table>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
        <!-- <edit-form ref="editForm" @close="handleEditFormClose" /> -->
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';
import OrgTree from '@/view/rac/rac-org/Tree';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            name: '@cname',
                            ICID: '@integer(10000,99999)',
                            ICID2: '@integer(10000,99999)',
                            carId: '桂@character("upper") @integer(00000,99999)',
                            sex: '@pick(["男","女"])',
                            birth: '@date(yyyy-MM)',
                            'stunum|+1': 20211000,
                            level: '@pick(["班长","学生"])',
                            idCard: '@id()',
                            phone: '136@integer(00000000,99999999)',
                            'dormitoryId|+1': 100,
                            classbname: '@pick(["2019微信测试班","第47期县处级领导干部进修一班"])',
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
                title: 'ID编号',
                width: 150,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'ICID',
                title: 'IC卡号',
                width: 150,
            },
            {
                dataIndex: 'ICID2',
                title: 'IC卡号2',
                width: 150,
            },
            {
                dataIndex: 'carId',
                title: '车牌号',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 150,
            },
            {
                dataIndex: 'birth',
                title: '出生年月',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'stunum',
                title: '学号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'level',
                title: '班级职务',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'idCard',
                title: '证件号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'phone',
                title: '手机',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'dormitoryId',
                title: '宿舍编号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'classbname',
                title: '班级',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 250,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'more',
                title: '更多',
                items: [
                    {
                        type: 'a',
                        // icon: 'plus',
                        title: '上传学员到所有考勤机上',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        // icon: 'plus',
                        title: '从所有考勤机上清空学员',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        // icon: 'plus',
                        title: '清空并上传一学期所有学员到所有考勤机',
                        onClick: () => {
                            /**/
                        },
                    },
                ],
            },
        ];
        const treeData = [
            {
                title: '所有学期',
                key: '100',
            },
            {
                title: '2021年秋季学期',
                key: '101',
                children: [
                    {
                        title: '防范化解重大风险能力和突发公共事件应急能力提升专题研讨班',
                        key: '101-1',
                    },
                    {
                        title: '开班临时测试（测试需要)',
                        key: '101-2',
                    },
                    {
                        title: '全区党校(行政院校)系统师资培训班(第21期)',
                        key: '101-3',
                    },
                    {
                        title: '全区党校(行政院校)系统师资培训班(第22期)',
                        key: '101-4',
                    },
                ],
            },
        ];

        return {
            columns,
            treeData,
            curOrgId: undefined,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理添加场地的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑场地的事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除场地的事件
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
<style lang="less" scoped>
.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    width: 200px;
    overflow: scroll;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
