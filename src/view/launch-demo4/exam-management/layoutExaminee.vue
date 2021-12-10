// 编排考生
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="5" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height: 100%"></a-divider>
                        </a-col>
                        <a-col :span="18">
                            <crud-table
                                ref="crudTable"
                                :query="{ orgId: curOrg.id }"
                                :commands="tableCommands"
                                :columns="columns"
                                :api="api"
                                :scrollX="600"
                                :defaultPagination="true"
                                :rowSelection="{}"
                            >
                            </crud-table>
                        </a-col>
                    </a-row>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        //侧边栏数据
        const treeData = [
            {
                title: '2021',
                key: '2021',
                children: [
                    {
                        title: '党校研究生',
                        key: 'dxyjs',
                        children: [
                            {
                                title: '中共广西区委党校',
                                key: '20211',
                                children: [
                                    {
                                        title: '1.中共广西区委党校01',
                                        key: '20211-1',
                                    },
                                    {
                                        title: '2.中共广西区委党校02',
                                        key: '20211-2',
                                    },
                                    {
                                        title: '3.中共广西区委党校03',
                                        key: '20211-3',
                                    },
                                    {
                                        title: '4.中共广西区委党校04',
                                        key: '20211-4',
                                    },
                                    {
                                        title: '5.中共广西区委党校05',
                                        key: '20211-5',
                                    },
                                    {
                                        title: '6.中共广西区委党校06',
                                        key: '20211-6',
                                    },
                                ],
                            },
                            {
                                title: '中国政法大学',
                                key: '20201',
                                children: [
                                    {
                                        title: '1.中国政法大学01',
                                        key: '20201-1',
                                    },
                                    {
                                        title: '2.中国政法大学02',
                                        key: '20201-2',
                                    },
                                    {
                                        title: '3.中国政法大学03',
                                        key: '20201-3',
                                    },
                                    {
                                        title: '4.中国政法大学04',
                                        key: '20201-4',
                                    },
                                    {
                                        title: '5.中国政法大学05',
                                        key: '20201-5',
                                    },
                                    {
                                        title: '6.中国政法大学06',
                                        key: '20201-6',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            grade: '@pick(["2021", "2020", "2019", "2018", "2017", "2016"])',
                            teachPoint: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务"])',
                            'number|1-500': 1,
                            name: '@cname',
                            examQualification: '@pick(["是","否"])',
                            'admissionTicketNum|1000000000-9999999999': 1111111111,
                            examinationRoomSite: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            'seatNum|1-35': 30,
                            shift: '@pick(["党校研究生"])',
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
                dataIndex: 'grade',
                title: '年级',
                width: 150,
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',
                width: 250,
            },
            {
                dataIndex: 'major',
                title: '专业',
                width: 150,
            },
            {
                dataIndex: 'number',
                title: '序号',
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'examQualification',
                title: '报考资格',
                width: 150,
            },
            {
                dataIndex: 'admissionTicketNum',
                title: '准考证号',
                width: 150,
            },
            {
                dataIndex: 'examinationRoomSite',
                title: '考场地址',
                width: 250,
            },
            {
                dataIndex: 'seatNum',
                title: '座位号',
                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',
                width: 150,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '添加考生',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '移出考场',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '清空编排',
                onClick: this.handleAdd,
            },
        ];
        return {
            columns,
            showOrg: false,
            curOrg: '',
            treeData,
        };
    },
    mounted() {
        this.crudTable = this.$refs['orgTree.platform'];
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleOrgMenuClick(item) {
            this.curOrg = item;
            this.refreshTableData();
            //
        },
        handleOrgTreeSelect(item) {
            this.curOrg = item;
            //
        },
        handleAdd() {
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
