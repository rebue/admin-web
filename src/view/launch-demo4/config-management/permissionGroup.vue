<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row>
                    <a-col :span="6">
                        <div class="table-left">
                            <a-tree class="ant-card-body" :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </div>
                    </a-col>
                    <a-col :span="18">
                        <a-tabs>
                            <a-tab-pane :key="1" tab="组权限"></a-tab-pane>
                            <a-tab-pane :key="2" tab="组成员"></a-tab-pane>
                        </a-tabs>
                        <a-row>
                            <a-tree checkable class="ant-card-body" :defaultExpandAll="true" :tree-data="permData" />
                        </a-row>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';

export default {
    name: 'Manager',
    components: {
        BaseManager,
    },
    data() {
        const treeData = [
            {
                title: '党校研究生',
                key: '20181',
                children: [
                    {
                        title: '研究生招生管理',
                        key: '20181-1',
                    },
                    {
                        title: '编码管理',
                        key: '20181-2',
                    },
                ],
            },
            {
                title: '角色',
                key: '20182',
                children: [
                    {
                        title: '研究生入学管理',
                        key: '20182-1',
                    },
                    {
                        title: '研究生处教学科长',
                        key: '20182-2',
                    },
                    {
                        title: '研究生学员',
                        key: '20182-3',
                    },
                    {
                        title: '任课教师',
                        key: '20182-4',
                    },
                    {
                        title: '教学点管理人员',
                        key: '20182-5',
                    },
                    {
                        title: '教务科',
                        key: '20182-6',
                    },
                    {
                        title: '研究生处管理教师',
                        key: '20182-7',
                    },
                    {
                        title: '研究生处管理员',
                        key: '20182-8',
                    },
                ],
            },
        ];

        const permData = [
            {
                title: '办公系统',
                key: '1',
                children: [
                    {
                        title: '我的桌面',
                        key: '1-1',
                    },
                ],
            },
            {
                title: '研究生系统',
                key: '2',
                children: [
                    {
                        title: '查看数据范围',
                        key: '2-1',
                        children: [
                            {
                                title: '党校研究生',
                                key: '2-1-1',
                            },
                            {
                                title: '中政大研究生',
                                key: '2-1-2',
                            },
                            {
                                title: '教学点用户',
                                key: '2-1-3',
                            },
                            {
                                title: '研究生处用户',
                                key: '2-1-4',
                            },
                        ],
                    },
                    {
                        title: '入学网上报名',
                        key: '2-2',
                        children: [
                            {
                                title: '网上报名配置',
                                key: '2-2-1',
                            },
                            {
                                title: '报名录入',
                                key: '2-2-2',
                            },
                            {
                                title: '报名资格审查',
                                key: '2-2-3',
                            },
                        ],
                    },
                ],
            },
        ];
        return {
            treeData,
            permData,
        };
    },
    methods: {},
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
