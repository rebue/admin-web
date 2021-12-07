<template>
    <div>
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
                                            <a-button style=" margin-left: 30px;" type="link" icon="table"
                                                >新增</a-button
                                            >
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
    </div>
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
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            time: '@date("hh:mm")',
                            2: '@cparagraph(1)',
                            3: '@cparagraph(1)',
                            4: '@csentence(5)',
                            5: '@csentence(4)',
                            6: '@cparagraph(1)',
                            7: '@csentence(4)',
                            8: '@csentence(5)',
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
                dataIndex: 'time',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: '2',
                width: 150,
            },
            {
                dataIndex: '3',
                width: 150,
            },
            {
                dataIndex: '4',
                width: 150,
            },
            {
                dataIndex: '5',
                width: 150,
            },
            {
                dataIndex: '6',
                width: 150,
            },
            {
                dataIndex: '7',
                width: 150,
            },
            {
                dataIndex: '8',
                width: 150,
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
