<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row>
                    <a-col :span="5">
                        <p style="text-align: center;">活动安排</p>
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
                        <div v-show="showOrg" class="table-left">
                            <org-tree
                                :ref="`orgTree.platform`"
                                :show.sync="showOrg"
                                realmId="platform"
                                @click="handleOrgMenuClick"
                                @select="handleOrgTreeSelect"
                            />
                            <div class="table-divider"></div>
                        </div>
                    </a-col>
                    <a-col :span="19">
                        <a-tabs style="left: 10px;" type="card" :activeKey="curRealmId" @change="handleRealmChanged">
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
                                        <a-button style=" margin-left: 30px;" type="link" icon="table">新增</a-button>
                                        <span>【表格内双击快速添加】</span>
                                    </template>
                                </crud-table>
                            </a-tab-pane>
                        </a-tabs>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import OrgTree from '@/view/rac/rac-org/Tree';
import { racRealmApi } from '@/api/Api';
export default {
    name: 'schedule',
    components: {
        BaseManager,
        CrudTable,
        OrgTree,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|1-30': [
                        {
                            'id|+1': 10000000,
                            // 'realmId|+1': ['default', 'platform', 'ops'],
                            // "accountId|1-1000000": 193201,
                            updator: '@cname()',
                            updatedTime: '@now("yyyy-MM-dd HH:mm:ss")',
                            student: '@cname()',
                            startTime: '@now("yyyy-MM-dd HH:mm:ss")',
                            course: '@pick(["锁定", "启用"])',
                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list || [
                    {
                        id: 1,
                        // no: 1,
                        updator: 'zzm',
                        updatedTime: '2021-12-01 16:39:00',
                        course: '计算机科学与技术',
                        startTime: '2021-12-04 16:39:00',
                        student: '章三',
                        before: 'xx',
                        after: 'xx',
                    },
                ];
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
                dataIndex: '1',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: '2',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: '3',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: '4',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: '5',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: '6',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: '7',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: '8',
                width: 150,
                fixed: 'left',
            },
        ];

        return {
            columns,
            showOrg: false,
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
                        { id: 'day', name: '日', remark: '' },
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
}
</style>
