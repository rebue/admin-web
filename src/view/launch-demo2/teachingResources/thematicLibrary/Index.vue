<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                    :showKeywords="false"
                    :query="{ orgId: curOrgId }"
                >
                    <template #left>
                        <div v-show="showOrg" class="table-left">
                            <a-tree class="ant-card-body" :defaultExpandAll="true" :tree-data="treeData" />
                            <!-- <org-tree
                                :ref="`orgTree.platform`"
                                :show.sync="showOrg"
                                realmId="platform"
                                @click="handleOrgMenuClick"
                                @select="handleOrgTreeSelect"
                            /> -->
                            <div class="table-divider"></div>
                        </div>
                    </template>
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
// import OrgTree from '../../../rac/rac-org/Tree.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

export default {
    name: 'Manager',
    components: {
        BaseManager,
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
                    'list|1-20': [
                        {
                            'value1|1-1000': 1234,
                            value2: '@pick(["理论教育（基本理论）","广西区情与实践"])',
                            value3:
                                '@pick(["已模式创新推进园区开发建设","习近平视察广西现场教学：北海合浦县汉代文化博物馆、铁山港公用码头、金海湾红树林生态保护区"])',
                            value4: '@date("yyyy-MM-dd")',
                            value5: '@pick(["讲授式", "现场教学","研讨式"])',
                            value6: '@cname()',
                            value7: '@pick(["是","否"])',
                            'value8|1-40': 40,
                            value9: '',
                            value10: '@pick(["内部试讲通过","内部试讲未通过"])',
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
                dataIndex: 'value1',
                title: '专题编号',
                width: 150,
            },
            {
                dataIndex: 'value2',
                title: '专题类别',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value3',
                title: '专题名称',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value4',
                title: '申报时间',
                width: 150,
            },
            {
                dataIndex: 'value5',
                align: 'center',
                title: '教学方式',
                width: 150,
            },
            {
                dataIndex: 'value6',
                align: 'center',
                title: '任课教师',
                width: 150,
            },
            {
                dataIndex: 'value7',
                align: 'center',
                title: '是否外请专题',
                width: 150,
            },
            {
                dataIndex: 'value8',
                align: 'center',
                title: '上课时长(分钟)',
                width: 150,
            },
            {
                dataIndex: 'value9',
                align: 'center',
                title: '课件URL',
                width: 150,
            },
            {
                dataIndex: 'value10',
                align: 'center',
                title: '试讲通过标志',
                width: 150,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 120,

                scopedSlots: { customRender: 'action' },
            },
        ];
        const treeData = [
            {
                title: '理论教育（基本理论）',
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
                title: '党性教育',
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
        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
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
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            showOrg: true,
            curOrgId: undefined,
            treeData,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.refreshData();
    },
    methods: {
        refreshData() {
            this.loading = true;
            // racRealmApi
            //     .listAll()
            //     .then(ro => {
            //         this.realms = ro.extra.list;
            //         this.curRealmId = this.realms[0].id;
            //     })
            //     .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleRealmChanged(realmId) {
            this.curRealmId = realmId;
        },
        /**
         * 处理添加应用的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {
                realmId: this.curRealmId,
            });
        },
        /**
         * 处理编辑应用的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除应用的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api
                .delById(record.id)
                .then(() => {
                    this.refreshTableData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        /**
         * 处理应用菜单的事件
         */
        handleMenus(record) {
            this.curApp = record;
            this.manageMenusFormVisible = true;
        },
        handleEditFormClose() {
            this.refreshTableData();
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
    .ant-card-body {
        width: 200px;
        overflow: auto;
        padding: 0;
    }
}
</style>
