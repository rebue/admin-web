<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="6" style="overflow: auto">
                            <p style="text-align: center;">计划总结列表</p>
                            <a-calendar :fullscreen="false" style="width: 250px" />
                            <a-collapse default-active-key="" :bordered="false">
                                <a-collapse-panel key="1" header="我的日历" style="background: white;">
                                    <p>我的日历</p>
                                </a-collapse-panel>
                            </a-collapse>
                            <div>
                                <a-button type="link">我能看谁？</a-button>
                                <a-button type="link">谁能看我？</a-button>
                            </div>
                            <div>
                                <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            </div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height:100%"></a-divider>
                        </a-col>
                        <a-col :span="17">
                            <a-tabs
                                style="left: 10px;"
                                type="card"
                                :activeKey="curRealmId"
                                @change="handleRealmChanged"
                            >
                                <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name">
                                    <crud-table
                                        ref="crudTable"
                                        :showKeywords="false"
                                        :columns="columns"
                                        :api="api"
                                        :scrollX="600"
                                        :defaultPagination="true"
                                    >
                                        <template #commands>
                                            <a-tag>今日</a-tag>
                                            <span>{{ nowDate }}</span>
                                            <span style=" margin-left: 30px;">【表格内双击快速添加】</span>
                                        </template>
                                    </crud-table>
                                </a-tab-pane>
                            </a-tabs>
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
import { racRealmApi } from '@/api/Api';
import moment from 'moment';
export default {
    name: 'schedule',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|7': [
                        {
                            'index|+1': 0,
                            week:
                                '@date("MM月dd日")@pick(["星期一","星期二","星期三","星期四","星期五","星期六","星期日"])',
                            plan: '',
                            conclusion: '',
                            evaluation: '',
                            leader: '',
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
        // 初始化数据end
        const columns = [
            {
                dataIndex: 'week',
                title: '星期',
                width: 150,
                ellipsis: true,
                customRender: (text, record) => {
                    const weekofday = moment().format('E');
                    return moment()
                        .add(record.index - weekofday, 'days')
                        .format('MM月DD日 星期dd');
                },
            },
            {
                dataIndex: 'plan',
                title: '工作计划',
                width: 210,
                ellipsis: true,
            },
            {
                dataIndex: 'conclusion',
                title: '工作总结',
                width: 250,
                ellipsis: true,
            },
            {
                dataIndex: 'evaluation',
                title: '领导评价',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'leader',
                title: '领导',
                width: 80,
                ellipsis: true,
            },
        ];
        const treeData = [
            {
                title: '教工部',
                key: '101',
                children: [
                    {
                        title: '校(院)领导',
                        key: '101-1',
                    },
                    {
                        title: '办公室(业务指导工作处)',
                        key: '101-2',
                        children: [
                            {
                                title: '监控员',
                                key: '101-2-1',
                            },
                        ],
                    },
                    {
                        title: '组织人事',
                        key: '101-3',
                    },
                    {
                        title: '机关党委',
                        key: '101-4',
                    },
                    {
                        title: '财务处',
                        key: '101-5',
                    },
                    {
                        title: '资产管理处',
                        key: '101-6',
                    },
                    {
                        title: '学院工作处',
                        key: '101-7',
                    },
                ],
            },
        ];
        return {
            columns,
            treeData,
            nowDate: '',
            curRealmId: '',
            realms: [],
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
        this.refreshData();
    },
    created() {
        const aData = new Date();
        this.nowDate = aData.getFullYear() + '年' + (aData.getMonth() + 1) + '月' + aData.getDate() + '日';
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleOrgMenuClick() {
            //
        },
        handleOrgTreeSelect() {
            //
        },
        handleRealmChanged(realmId) {
            this.curRealmId = realmId;
        },
        refreshData() {
            this.loading = true;
            racRealmApi
                .listAll()
                .then(ro => {
                    this.realms = [
                        { id: 'week', name: '周', remark: '' },
                        { id: 'month', name: '月', remark: '' },
                        { id: 'year', name: '年', remark: '' },
                    ];
                    console.log('@' + JSON.stringify(this.realms));
                    this.curRealmId = this.realms[0].id;
                })
                .finally(() => (this.loading = false));
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
