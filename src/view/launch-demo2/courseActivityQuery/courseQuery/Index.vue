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
                    <template #keywordsLeft>
                        <label style="width: 100px; line-height: 30px; text-align: right;">选择学期：</label>
                        <a-select default-value="2021" style="width: 120px" @change="handleChange">
                            <a-select-option value="2021">
                                2021
                            </a-select-option>
                            <a-select-option value="2020">
                                2020
                            </a-select-option>
                        </a-select>
                    </template>
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

export default {
    name: 'Manager',
    components: {
        BaseManager,
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
                            value1: '@pick(["2021年秋季学期", "2020年秋季学期","2019年秋季学期"])',
                            value2:
                                '@pick(["第35期中青年干部培训一班", "中青年干部培训一班（第45期）","中青年干部培训二班（第8期）"])',
                            value3: '@pick(["毕业典礼"])',
                            value4: '@date("yyyy-MM-dd")',
                            value5: '@pick(["上午","下午"])',
                            value6: '@cname()',
                            value7: '@pick(["305教室","地点待定","会议中心报告厅"])',
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
                title: '学期',
                width: 150,
            },
            {
                dataIndex: 'value2',
                title: '班级',
                ellipsis: true,
                width: 250,
            },
            {
                dataIndex: 'value3',
                title: '课程名称',
                width: 200,
            },
            {
                dataIndex: 'value4',
                title: '日期',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value5',
                title: '时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value6',
                title: '教室名称',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value7',
                title: '地点',
            },
        ];

        this.tableCommands = [
            //
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
}
</style>
