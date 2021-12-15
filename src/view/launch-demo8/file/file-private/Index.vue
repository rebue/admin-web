//私有文档
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="4" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height: 100%"></a-divider>
                        </a-col>
                        <a-col :span="19">
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
                title: '文件共享',
                key: '1',
            },
            {
                title: '办公系统帮助文档',
                key: '2',
            },
            {
                title: '第10期县处级公务员任职培训班',
                key: '3',
            },
            {
                title: '第10期乡(镇)长培训班',
                key: '4',
            },
            {
                title: '第10期自治区管理干部进修班',
                key: '5',
            },
            {
                title: '第11期全区党校系统师资进修班',
                key: '6',
            },
            {
                title: '第11期县处级公务员任职培训班',
                key: '7',
            },
            {
                title: '第11期自治区管理干部培训班',
                key: '8',
            },
            {
                title: '第12期县处级公务员任职培训班',
                key: '9',
            },
            {
                title: '第12期自治区管理干部培训班',
                key: '10',
            },
            {
                title: '第13期全区党校系统师资进修班',
                key: '11',
            },
            {
                title: '第13期县处级公务员任职培训班',
                key: '12',
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
                            title: '新文档.doc',
                            useState: '@pick(["使用中","未使用"])',
                            degree: '@pick(["一般","中等","重要"])',
                            'date|+1': [
                                '2021-12-25',
                                '2021-12-18',
                                '2021-12-05',
                                '2021-11-27',
                                '2021-11-08',
                                '2021-10-25',
                                '2021-10-11',
                                '2021-09-20',
                                '2021-09-10',
                                '2021-09-09',
                                '2021-08-19',
                            ],
                            dep:
                                '@pick(["教工部", "回收站", "市县党校", "区纪检组", "跟班学习离职", "校-院领导", "办公室", "监控室"])',
                            administrator: '@cname',
                            sourceType: '',
                            businessType: '',
                            'submitDate|+1': [
                                '2021-12-25 10:21:21',
                                '2021-12-18 09:25:32',
                                '2021-12-05 12:31:06',
                                '2021-11-27 07:03:22',
                                '2021-11-08 09:54:56',
                                '2021-10-25 15:36:45',
                                '2021-10-11 10:55:32',
                                '2021-09-20 10:27:22',
                                '2021-09-10 08:00:06',
                                '2021-09-09 11:26:45',
                                '2021-08-19 17:06:52',
                            ],
                            submitter: '@cname',
                            'visitsNum|10-50': 10,
                            'enclosureLength|100000-500000': 111111,
                            custom: '',
                            keyword: '',
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
                dataIndex: 'title',
                title: '标题',
                width: 150,
            },
            {
                dataIndex: 'useState',
                title: '使用状态',
                width: 150,
            },
            {
                dataIndex: 'degree',
                title: '重要程度',
                width: 150,
            },
            {
                dataIndex: 'date',
                title: '年度时间',
                width: 150,
            },
            {
                dataIndex: 'dep',
                title: '所属部门',
                width: 150,
            },
            {
                dataIndex: 'administrator',
                title: '管理人员',
                width: 150,
            },
            {
                dataIndex: 'sourceType',
                title: '来源类型',
                width: 150,
            },
            {
                dataIndex: 'businessType',
                title: '业务类型',
                width: 150,
            },
            {
                dataIndex: 'submitDate',
                title: '提交时间',
                width: 250,
            },
            {
                dataIndex: 'submitter',
                title: '提交人',
                width: 150,
            },
            {
                dataIndex: 'visitsNum',
                title: '访问次数',
                width: 150,
            },
            {
                dataIndex: 'enclosureLength',
                title: '附件长度',
                width: 150,
            },
            {
                dataIndex: 'custom',
                title: '自定义属性',
                width: 150,
            },
            {
                dataIndex: 'keyword',
                title: '关键字',
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 150,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '新增',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '上传',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '下载',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '删除',
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
                type: 'a',
                title: '查看',
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
            realm: {
                id: '1',
            },
            visible: false,
            confirmLoading: false,
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
