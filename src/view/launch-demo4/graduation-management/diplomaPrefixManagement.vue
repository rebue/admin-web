// 证号前缀管理
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
                        key: '1',
                    },
                    {
                        title: '2020',
                        key: '2',
                    },
                    {
                        title: '2019',
                        key: '3',
                    },
                    {
                        title: '2018',
                        key: '4',
                    },
                    {
                        title: '2017',
                        key: '5',
                    },
                    {
                        title: '2016',
                        key: '6',
                    },
                ],
            },
            {
                title: '中政大研究生',
                key: 'zzdyjs',
                children: [
                    {
                        title: '2021',
                        key: '7',
                    },
                    {
                        title: '2020',
                        key: '8',
                    },
                    {
                        title: '2019',
                        key: '9',
                    },
                    {
                        title: '2018',
                        key: '10',
                    },
                    {
                        title: '2017',
                        key: '11',
                    },
                    {
                        title: '2016',
                        key: '12',
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
                            'sequenceNum|0-10': 1,
                            majorCode: '@pick(["M","D","F","X","J"])',
                            majorName: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            researchDirection: '',
                            'diplomaNumfront|10000-99999': 11111,
                            desc:
                                '@pick(["研究方向:马克思主义中国化","研究方向:新时期党的建设理论与实践","研究方向:公共领导","研究方向:宏观经济管理",""])',
                            grade: '@pick(["2021", "2020", "2019", "2018", "2017", "2016"])',
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
                dataIndex: 'sequenceNum',
                title: '顺序号',

                width: 150,
            },
            {
                dataIndex: 'majorCode',
                title: '专业代码',

                width: 150,
            },
            {
                dataIndex: 'majorName',
                title: '专业名称',

                width: 150,
            },
            {
                dataIndex: 'researchDirection',
                title: '研究方向',

                width: 150,
            },
            {
                dataIndex: 'diplomaNumfront',
                title: '毕业证号前缀',

                width: 150,
            },
            {
                dataIndex: 'desc',
                title: '说明',

                width: 300,
            },
            {
                dataIndex: 'grade',
                title: '年级',

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
        handleEdit() {
            //
        },
        handleDel() {
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
