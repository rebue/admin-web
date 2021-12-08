// 毕业证管理
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
                    :rowSelection="{}"
                >
                    <template #left>
                        <div v-show="showOrg" class="table-left">
                            <org-tree
                                ref="orgTree.platform"
                                :show.sync="showOrg"
                                realmId="platform"
                                @click="handleOrgMenuClick"
                                @select="handleOrgTreeSelect"
                            />
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
import OrgTree from '@/view/rac/rac-org/Tree';
export default {
    name: 'signupConf',
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
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            'stuNum|100000000-200000000': 111111111,
                            name: '@cname',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            grade: '@pick(["2021", "2020", "2019", "2018", "2017", "2016"])',
                            sex: '@pick(["男","女"])',
                            birthDate: '@date',
                            shift: '@pick(["中政大研究生","党校研究生"])',
                            'diplomaNum|1000000000-9999999999': 1111111111,
                            graduationYear: '@date',
                            fileRoute: '/data/nfs/student/images2021/1112352.jpg',
                            isGraduation: '@pick(["是","否"])',
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
                dataIndex: 'no',
                title: '#',
                width: 50,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'stuNum',
                title: '学号',

                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',

                width: 150,
            },
            {
                dataIndex: 'major',
                title: '专业',

                width: 150,
            },
            {
                dataIndex: 'grade',
                title: '年级',

                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',

                width: 150,
            },
            {
                dataIndex: 'birthDate',
                title: '生日',

                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',

                width: 150,
            },
            {
                dataIndex: 'diplomaNum',
                title: '毕业证号',

                width: 150,
            },
            {
                dataIndex: 'graduationYear',
                title: '毕业年份',

                width: 150,
            },
            {
                dataIndex: 'fileRoute',
                title: '文件路径',

                width: 350,
            },
            {
                dataIndex: 'isGraduation',
                title: '毕业否',

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
                title: '删除',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '生成2018级前毕业证',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看',
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
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                // this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            // this.$nextTick(this.refreshTableData);
        },
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
