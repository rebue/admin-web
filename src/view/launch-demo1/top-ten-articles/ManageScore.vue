<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="5" style="overflow: auto">
                        <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height: 100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <a-tabs style="left: 10px" :activeKey="curRealmId" @change="handleRealmChanged">
                            <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name">
                                <crud-table
                                    :ref="`crudTable.${realm.id}`"
                                    :commands="tableCommands"
                                    :actions="tableActions"
                                    :columns="columns"
                                    :api="api"
                                    :query="{ realmId: curRealmId }"
                                    :scrollX="600"
                                    :defaultPagination="false"
                                    @moveUp="handleMoveUp"
                                    @moveDown="handleMoveDown"
                                >
                                    <template #left>
                                        <div style="float: left" v-show="showOrg" class="table-left">
                                            <org-tree
                                                :ref="`orgTree.platform`"
                                                :show.sync="showOrg"
                                                realmId="platform"
                                                @click="handleOrgMenuClick"
                                                @select="handleOrgTreeSelect"
                                            />
                                            <div class="table-divider"></div>
                                        </div>
                                    </template>
                                </crud-table>
                            </a-tab-pane>
                        </a-tabs>
                    </a-col>
                </a-row>
            </template>
        </base-manager>

        <edit-form ref="editForm" @close="handleEditFormClose" />
        <manage-menus-form :curApp.sync="curApp" :visible.sync="manageMenusFormVisible" @close="handleEditFormClose" />
        <edit-auth-form ref="editAuthForm" @close="handleEditFormClose" />
    </fragment>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi, racAppApi, oapAppApi } from '@/api/Api';
import BaseManager from '../../../component/rebue/BaseManager';
import EditForm from '../../rac/rac-account/EditForm';
import EditAuthForm from '../../rac/rac-app/EditAuthForm';
import ManageMenusForm from '../../rac/rac-app/ManageMenusForm';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        EditAuthForm,
        CrudTable,
        ManageMenusForm,
        // eslint-disable-next-line no-undef
    },
    data() {
        //侧边栏数据
        const treeData = [
            {
                title: '2021年春季学期',
                key: '1',
                children: [
                    {
                        title: '2021年3月份十佳文章评比',
                        key: '101',
                    },
                    {
                        title: '班2021年4月份十佳文章评比级2',
                        key: '102',
                    },
                    {
                        title: '2021年5月份十佳文章评比',
                        key: '103',
                    },
                ],
            },
            {
                title: '2021年秋季学期',
                key: '2',
                children: [
                    {
                        title: '2021年11月份十佳文章评比',
                        key: '201',
                    },
                    {
                        title: '2021年10月份十佳文章评比',
                        key: '202',
                    },
                    {
                        title: '2021年9月份十佳文章评比',
                        key: '203',
                    },
                ],
            },
            {
                title: '2020年春季学期',
                key: '3',
                children: [
                    {
                        title: '2020年3月份十佳文章评比',
                        key: '301',
                    },
                    {
                        title: '班2020年4月份十佳文章评比级2',
                        key: '302',
                    },
                    {
                        title: '2020年5月份十佳文章评比',
                        key: '303',
                    },
                ],
            },
            {
                title: '2020年秋季学期',
                key: '4',
                children: [
                    {
                        title: '2020年11月份十佳文章评比',
                        key: '401',
                    },
                    {
                        title: '2020年10月份十佳文章评比',
                        key: '402',
                    },
                    {
                        title: '2020年9月份十佳文章评比',
                        key: '403',
                    },
                ],
            },
        ];
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const arr = ['计算机一班', '计算机二班', 'GC班'];
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            className: '@pick(["计算机一班", "计算机二班","GC班"])',
                            judges: '@cname',
                            scoringElements: '@pick(["观点新颖，有独特的见解"])',
                            'grade|50-100': 100,

                            // meet: '@pick(["是", "否"])',
                            // 'realmId|+1': ['default', 'platform', 'ops'],
                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
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
            // {
            //     dataIndex: 'no',
            //     title: '#',
            //     scopedSlots: { customRender: 'serial' },
            //     width: 50,
            //     fixed: 'left',
            // },
            {
                dataIndex: 'className',
                title: '班级',
                width: 200,
            },
            {
                dataIndex: 'judges',
                title: '评委',
                width: 180,
            },
            {
                dataIndex: 'scoringElements',
                title: '评分要素',
                width: 180,
                ellipsis: true,
            },
            {
                dataIndex: 'grade',
                title: '分数',
                width: 120,
                ellipsis: true,
            },

            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 200,
            //     fixed: 'right',
            //     scopedSlots: { customRender: 'action' },
            // },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '查看',
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
            {
                type: 'a',
                title: '菜单',
                onClick: record => this.handleMenus(record),
            },
            {
                type: 'a',
                title: '认证',
                onClick: record => this.handleAuth(record),
            },
        ];

        return {
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            showOrg: false,
            treeData,
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable.' + this.curRealmId][0];
        },
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.refreshData();
    },
    methods: {
        handleOrgMenuClick() {
            //
        },
        handleOrgTreeSelect() {
            //
        },
        /**
         * 启用禁用确认
         */
        confirmEnable(e, record) {
            const isEnabled = !record.isEnabled;
            //调用启用禁用接口
            racAppApi
                .enable({
                    id: record.id,
                    isEnabled,
                })
                .then(() => {
                    this.$set(record, 'isEnabled', isEnabled);
                    //或者重新加载table
                });
        },
        // 	显示隐藏的回调
        handleEnableVisibleChange(visible, record) {
            this.$set(record, 'enabledVisible', visible);
        },
        refreshData() {
            this.loading = true;
            racRealmApi
                .listAll()
                .then(ro => {
                    this.realms = [
                        { id: 'manage', name: '评委评分', remark: '十佳文章管理' },
                        { id: 'count', name: '文章评分', remark: '十佳文章统计' },
                        { id: '1', name: '评分统计', remark: '十佳文章统计' },
                        { id: '2', name: '评比结果', remark: '十佳文章统计' },
                    ];

                    this.curRealmId = this.realms[0].id;
                })
                .finally(() => (this.loading = false));
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
        /**
         * 处理应用认证的事件
         */
        handleAuth(record) {
            //根据appId查询认证信息，判断是展示添加弹窗还是编辑弹窗
            oapAppApi.getByAppId(record.id).then(ro => {
                let item = {
                    appId: record.id, // 添加认证需要appId
                    appName: record.name, //把应用名称带到弹窗
                };
                item = { ...item, ...ro.extra };
                if (ro?.extra.id != undefined) {
                    this.$refs.editAuthForm.show(EditFormTypeDic.Modify, item);
                    return;
                }
                this.$refs.editAuthForm.show(EditFormTypeDic.Add, item);
            });
        },
        /**
         * 上移
         */
        handleMoveUp(record) {
            this.loading = true;
            this.api
                .moveUp(record.id)
                .then(() => {
                    this.refreshTableData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        /**
         * 下移
         */
        handleMoveDown(record) {
            this.loading = true;
            this.api
                .moveDown(record.id)
                .then(() => {
                    this.refreshTableData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
