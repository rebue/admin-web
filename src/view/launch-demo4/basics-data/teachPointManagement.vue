// 教学点管理
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="3" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height: 100%"></a-divider>
                        </a-col>
                        <a-col :span="20">
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
                title: '党校研究生',
                key: 'dxyjs',
                children: [
                    {
                        title: '2021',
                        key: '101',
                    },
                    {
                        title: '2020',
                        key: '102',
                    },
                    {
                        title: '2019',
                        key: '103',
                    },
                    {
                        title: '2018',
                        key: '104',
                    },
                    {
                        title: '2017',
                        key: '105',
                    },
                    {
                        title: '2016',
                        key: '106',
                    },
                ],
            },
            {
                title: '中政大研究生',
                key: 'zzdyjs',
                children: [
                    {
                        title: '2021',
                        key: '201',
                    },
                    {
                        title: '2020',
                        key: '202',
                    },
                    {
                        title: '2019',
                        key: '203',
                    },
                    {
                        title: '2018',
                        key: '204',
                    },
                    {
                        title: '2017',
                        key: '205',
                    },
                    {
                        title: '2016',
                        key: '206',
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
                            teachPointCode: '@pick(["4100", "5200"])',
                            teachPointName: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            grade: '@pick(["2021"])',
                            examPlace: '',
                            desc: '',
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
                dataIndex: 'teachPointCode',
                title: '教学点代码',
                width: 150,
            },
            {
                dataIndex: 'teachPointName',
                title: '教学点名称',
                width: 250,
            },
            {
                dataIndex: 'grade',
                title: '年级',
                width: 150,
            },
            {
                dataIndex: 'examPlace',
                title: '招生考试地点',
                width: 150,
            },
            {
                dataIndex: 'desc',
                title: '说明',
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
                icon: 'plus',
                title: '新增',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '删除',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '复制',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '粘贴',
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
            showOrg: true,
            realm: {
                id: '1',
            },
            treeData,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
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
