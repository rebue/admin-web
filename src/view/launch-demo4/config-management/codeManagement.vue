// 编码管理
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
                                :commands="tableCommands"
                                :actions="tableActions"
                                :columns="columns"
                                :api="api"
                                :scrollX="600"
                                :defaultPagination="true"
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
                title: '研究生报名审核状态',
                key: 'value1',
            },
            {
                title: '干部属性',
                key: 'value2',
            },
            {
                title: '学籍变动类型',
                key: 'value3',
            },
            {
                title: '考核形式',
                key: 'value4',
            },
            {
                title: '研究生班级职务',
                key: 'value5',
            },
            {
                title: '研究生文化程度',
                key: 'value6',
            },
            {
                title: '免试条件',
                key: 'value7',
            },
            {
                title: '荣誉称号',
                key: 'value8',
            },
            {
                title: '研究生录取指标类型',
                key: 'value9',
            },
            {
                title: '研究生新生录取',
                key: 'value10',
            },
            {
                title: '是否允许毕业',
                key: 'value11',
            },
            {
                title: '研究生报名审核结果',
                key: 'value12',
            },
            {
                title: '职称',
                key: 'value13',
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
                            'enumValue|0-10': 1,
                            valueContent: '@pick(["未审核", "初审通过", "初审不通过", "复审通过", "复审不通过"])',
                            detailedDesc: '',
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
                dataIndex: 'enumValue',
                title: '枚举数值',
                width: 150,
            },
            {
                dataIndex: 'valueContent',
                title: '数值内容',
                width: 150,
            },
            {
                dataIndex: 'detailedDesc',
                title: '详细说明',
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
