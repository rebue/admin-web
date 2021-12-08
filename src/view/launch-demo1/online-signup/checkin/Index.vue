<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row>
                    <a-col :span="6">
                        <div class="table-left">
                            <a-tree class="ant-card-body" :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </div>
                    </a-col>
                    <a-col :span="18">
                        <crud-table
                            ref="crudTable"
                            :showKeywords="false"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ orgId: curOrgId }"
                            :scrollX="600"
                            :defaultPagination="true"
                        ></crud-table>
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
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|1-20': [
                        {
                            'id|+1': 10000000,
                            name: '@cname()',
                            sex: '@pick(["男", "女"])',
                            birth: '@date("yyyy-MM")',
                            'idCard|1-100000000000000000': 12345679012345678,
                            'cardId|1-1000000': 193201,
                            'qrcode|1-1000000': 193201,
                            class: '@pick(["计算机一班", "计算机二班","GC班"])',
                            company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            flag: '@pick(["是", "否"])',
                            lastModifiedTime: '@date("yyyy-MM-dd")',
                            lastChecker: '@cname()',
                            by: '@pick(["自驾","公交","火车", "飞机"])',
                            arriveTime: '@now("yyyy-MM-dd")',
                            meet: '@pick(["是", "否"])',
                            // 'realmId|+1': ['default', 'platform', 'ops'],
                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
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
                dataIndex: 'no',
                title: '序号',
                width: 80,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 60,
            },
            {
                dataIndex: 'birth',
                title: '出生年月',
                width: 100,
            },
            {
                dataIndex: 'idCard',
                title: '证件号',
                width: 250,
                ellipsis: true,
            },
            {
                dataIndex: 'cardId',
                title: '一卡通卡号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'class',
                title: '班级',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'company',
                title: '工作单位',
                width: 200,
            },
            {
                dataIndex: 'flag',
                title: '可转入学籍',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'checker',
                title: '审核人',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'lastModifiedTime',
                title: '最后修改时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'lastChecker',
                title: '最后录入人',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'by',
                title: '到校交通方式',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'arriveTime',
                title: '交通到站时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'meet',
                title: '是否要接站',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'desc',
                title: '其他交通备注',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     title: '新建',
            //     onClick: () => {
            //         /**/
            //     },
            // },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看',
                onClick: () => {
                    /**/
                },
            },
        ];

        const treeData = [
            {
                title: '2022年春季学期培训班次',
                key: '20181',
                children: [
                    {
                        title: '班级1',
                        key: '20181-1',
                    },
                    {
                        title: '班级2',
                        key: '20181-2',
                    },
                    {
                        title: '班级3',
                        key: '20181-3',
                    },
                ],
            },
            {
                title: '2021年秋季学期培训班次',
                key: '20182',
                children: [
                    {
                        title:
                            '自治区党委管理干部“学习贯彻习近平新时代中国特色社会主义思想，加强党性修养”专题培训班第13期',
                        key: '20182-1',
                    },
                    {
                        title: '县处级干部“学习贯彻习近平新时代中国特色社会主义思想，加强党性修养”专题培训班第15期',
                        key: '20182-2',
                    },
                    {
                        title: '班级3',
                        key: '20182-3',
                    },
                ],
            },
        ];

        return {
            columns,
            curOrgId: undefined,
            treeData,
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
