<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs>
                    <a-tab-pane :key="1" tab="允许学员修改档案信息配置"></a-tab-pane>
                    <a-tab-pane :key="2" tab="学员超级登录密码"></a-tab-pane>
                    <a-tab-pane :key="3" tab="学员手册"></a-tab-pane>
                    <a-tab-pane :key="4" tab="其他"></a-tab-pane>
                </a-tabs>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                >
                    <template #commands>
                        <div>开学后允许学员自主修改个人资料</div>
                        <a-form-model layout="inline" :model="formInline">
                            <a-form-model-item label="开班后多少天内允许修改">
                                <a-input :style="{ width: '250px' }" v-model.trim="formInline.day" />
                            </a-form-model-item>
                        </a-form-model>
                    </template>
                </crud-table>
            </template>
        </base-manager>
        <!-- <edit-form ref="editForm" @close="handleEditFormClose" /> -->
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            term: '@date(yyyy年)@cword("春秋")季学期',
                            className: '@pick(["区直单位中心组成员","中心组学习室联络班","区直机关处级学习班"])',
                            startTime: '@date(yyyy-MM-dd)',
                            endTime: '@date(yyyy-MM-dd)',
                            signupStartTime: '@date(yyyy-MM-dd)',
                            signupEndTime: '@date(yyyy-MM-dd)',
                            creator: '@cname(),@cname()',
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
                dataIndex: 'term',
                title: '学期',
                width: 150,
                // scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'className',
                title: '班级名称',
                width: 150,
            },
            {
                dataIndex: 'startTime',
                title: '开始时间',
                width: 150,
            },
            {
                dataIndex: 'endTime',
                title: '结束时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupStartTime',
                title: '网上报名开通时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupEndTime',
                title: '网上报名关闭时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'creator',
                title: '组织员',
                width: 150,
                ellipsis: true,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '批量设置组号',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '生成excel报表',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '手动打印报表',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '小组信息',
                onClick: () => {
                    /**/
                },
            },
            {
                type: 'a',
                title: '编辑',
                onClick: () => {
                    /**/
                },
            },
        ];

        return {
            columns,
            formInline: {
                day: '',
            },
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理添加场地的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑场地的事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除场地的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
        // 学期下拉菜单
        handleTermChange() {
            //
        },
        // 班级下拉菜单
        handleClassChange() {
            //
        },
    },
};
</script>
<style scoped>
.btn-group {
    margin: 10px 0;
}
.btn {
    margin-right: 10px;
}
</style>
