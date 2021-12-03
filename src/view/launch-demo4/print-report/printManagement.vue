<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div style="margin-bottom: 20px;">
                    <a-button class="btn">新增</a-button>
                    <a-button class="btn">编辑</a-button>
                    <a-button class="btn">删除</a-button>
                    <a-button class="btn">生成报表</a-button>
                    <a-button class="btn">清空报表</a-button>
                    <a-button class="btn">数据归档</a-button>
                    <a-checkbox>操作全部报表</a-checkbox>
                </div>
                <a-divider />
                <a-row type="flex">
                    <a-col :span="3">
                        <a-tree
                            class="ant-card-body"
                            v-model="checkedKeys"
                            :auto-expand-parent="autoExpandParent"
                            :default-selected-keys="selectedKeys"
                            :default-checked-keys="checkedKeys"
                            :default-expanded-keys="expandedKeys"
                            :tree-data="treeData"
                            @check="onCheck"
                        />
                    </a-col>
                    <a-col :span="1" style="margin-right:10px;border-right:1px solid #ededed"></a-col>
                    <a-col :span="18">
                        <p>
                            学期：<a-select default-value="lucy" style="width: 120px">
                                <a-select-option value="lucy">
                                    2021年秋季学期
                                </a-select-option>
                            </a-select>
                            班级：
                            <a-select default-value="lucy">
                                <a-select-option value="lucy">
                                    01中青年干部培训一班（第45期）
                                </a-select-option>
                            </a-select>
                        </p>
                        <p>
                            <a-checkbox>批量模式：</a-checkbox>每个弹出的网页一次可以打印纸张<a-input
                                value="101"
                                style="width:60px;"
                            />页, <a-button type="link">第一批</a-button>
                        </p>
                        <p>
                            <a-checkbox default-checked>连续打印</a-checkbox> 等待打印完成时间：<a-input
                                value="2"
                                style="width:60px;"
                            />秒, <a-button class="btn">打印</a-button><a-button class="btn">暂停</a-button
                            ><a-button class="btn">打印预览</a-button>
                        </p>
                        <div style="padding: 20px 0;border: 1px solid #ededed">
                            <h2 style="text-align:center">中共广西区党委校在职研究生班学期成绩登记表</h2>
                            <a-row type="flex">
                                <a-col flex="1">中共广西区党委校</a-col>
                                <a-col flex="1">公共管理</a-col>
                                <a-col flex="1">2020级（第1学期）</a-col>
                                <a-col flex="1">任课教师/班主任（签名）</a-col>
                                <a-col flex="1">2021年11月9日</a-col>
                            </a-row>
                            <crud-table
                                ref="crudTable"
                                :showKeywords="false"
                                :commands="tableCommands"
                                :actions="tableActions"
                                :columns="columns"
                                :api="api"
                                :query="{ orgId: curOrgId }"
                                :scrollX="800"
                                :defaultPagination="false"
                            >
                            </crud-table>
                        </div>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
        // OrgTree,
    },
    data() {
        this.api = {};
        const treeData = [
            {
                title: '主岗正高职称',
                key: '20181',
            },
            {
                title: '主岗副高职称',
                key: '20182',
            },
            {
                title: '主岗中级职称',
                key: '20183',
            },
            {
                title: '主岗初级职称',
                key: '20184',
            },
            {
                title: '博士初期',
                key: '20185',
            },
            {
                title: '辅岗专技人员',
                key: '20186',
            },
        ];

        const columns = [
            // {
            //     dataIndex: 'no',
            //     title: '#',
            //     width: 50,
            //     fixed: 'left',
            // },
            {
                dataIndex: 'stuId',
                title: '学号',
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'class',
                title: '马克思主义理论研究（科学社会主义）',
                width: 150,
                children: [
                    {
                        dataIndex: 'class',
                        title: '考勤',
                        width: 150,
                    },
                    {
                        dataIndex: 'class',
                        title: '作业',
                        width: 150,
                    },
                    {
                        dataIndex: 'class',
                        title: '考试',
                        width: 150,
                    },
                    {
                        dataIndex: 'class',
                        title: '补考',
                        width: 150,
                    },
                ],
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 120,
            //     fixed: 'right',
            //     scopedSlots: { customRender: 'action' },
            // },
        ];

        const page = function() {
            const p = new Promise((resolve, reject) => {
                // 数据列表在这里设置
                const dataSource = [
                    {
                        id: 1,
                        no: 1,
                        name: '吴建国',
                        bm: '法学教研部',
                        zc: '教师',
                        xb: '男',
                    },
                    {
                        id: 2,
                        no: 2,
                        name: '黄建国',
                        bm: '法学教研部',
                        zc: '教授',
                        xb: '男',
                    },
                ];
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: dataSource.length,
                        },
                        list: dataSource,
                    },
                };
                resolve(ro);
            });
            return p;
        };

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     title: '新增',
            //     onClick: () => {
            //         /**/
            //     },
            // }
        ];

        this.tableActions = [
            // {
            //     type: 'a',
            //     title: '编辑',
            //     onClick: () => {
            //         /**/
            //     },
            // }
        ];
        this.api = {
            page,
            listAll: page,
            list: page,
        };
        return {
            expandedKeys: ['2018', '20181'],
            autoExpandParent: true,
            selectedKeys: [],
            checkedKeys: [],
            treeData,
            columns,
            showOrg: false,
            curOrgId: undefined,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        onCheck(checkedKeys, info) {
            console.log('onCheck', checkedKeys, info);
        },
        onSelect(selectedKeys, info) {
            console.log('onSelect', info);
            this.selectedKeys = selectedKeys;
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 新增事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 编辑事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 删除事件
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
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            this.$nextTick(this.refreshTableData);
        },
    },
};
</script>
<style type="text/css" scoped>
.btn {
    margin-right: 10px;
}
>>> .table-tools {
    display: none;
}
</style>
