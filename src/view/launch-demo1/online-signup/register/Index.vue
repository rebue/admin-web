<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="5" style="overflow:auto">
                        <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <crud-table
                            ref="crudTable"
                            :commands="tableCommands"
                            :columns="columns"
                            :actions="tableActions"
                            :api="api"
                            :scrollX="800"
                            :defaultPagination="true"
                            :showKeywords="false"
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
                    'list|20': [
                        {
                            'id|+1': 10000000,
                            name: '@cname()',
                            sex: '@pick(["男", "女"])',
                            // birth: '@date("yyyy-MM")',
                            'birth|+1': ['1995-11', '1996-04', '1997-10', '1998-08'],
                            'idCard|1-100000000000000000': 12345679012345678,
                            'cardId|1-1000000': 193201,
                            'qrcode|1-1000000': 193201,
                            'class|+1': [
                                '市场营销一班',
                                '国际贸易一班',
                                '网络工程一班',
                                '计算机一班',
                                '计算机二班',
                                'GC班',
                            ],
                            'company|+1': [
                                '上汽通用五菱汽车股份有限公司',
                                '广西投资集团有限公司',
                                '广西建工集团有限责任公司',
                                '广西电网有限责任公司',
                                '广西柳州钢铁集团有限公司',
                                '广西北部湾国际港务集团有限公司',
                                '广西壮族自治区农村信用社联合社',
                                '广西玉柴机器集团有限公司',
                                '广西盛隆冶金有限公司',
                                '中国石油天然气股份有限公司广西石化分公司',
                            ],
                            flag: '@pick(["是", "否"])',
                            'lastModifiedTime|+1': ['2021-12-01', '2021-11-20', '2021-11-10', '2021-12-04'],
                            lastChecker: '@cname()',
                            by: '@pick(["自驾","公交","火车", "飞机"])',
                            arriveTime: '@pick(["2021-12-12","2021-12-13","2021-12-14","2021-12-15"])',
                            meet: '@pick(["是", "否"])',
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
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 250,
            //     // fixed: 'right',
            //     scopedSlots: { customRender: 'action' },
            // },
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
            // {
            //     type: 'a',
            //     title: '编辑',
            //     onClick: record => this.handleEdit(record),
            // },
        ];

        //侧边栏数据
        const treeData = [
            {
                title: '2022年春季学期培训班次',
                key: '1',
                children: [
                    {
                        title: '第9期干部教育培训改革创新研讨班',
                        key: '101',
                    },
                    {
                        title: '第16期县处级干部”学习贯彻习近平新时代中国特色社会主义思想，加强党性修养”专题培训班',
                        key: '102',
                    },
                    {
                        title:
                            '第14期自治区党委管理干部“学习贯彻习近平新时代中国特色社会主义思想，加强党性修养”专题培训班',
                        key: '103',
                    },
                ],
            },
            {
                title: '2021年秋季学期培训班次',
                key: '2',
                children: [
                    {
                        title:
                            '第13期自治区党委管理干部“学习贯彻习近平新时代中国特色社会主义思想，加强党性修养”专题培训班',
                        key: '201',
                    },
                    {
                        title: '第15期县处级干部“学习贯彻习近平新时代中国特色社会主义思想，加强党性修养”专题培训班',
                        key: '202',
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
