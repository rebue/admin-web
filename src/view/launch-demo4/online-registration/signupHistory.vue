// 报考历史
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :query="{ orgId: curOrg.id }"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
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
                            grade: '@pick(["2021", "2020", "2019", "2018", "2017", "2016"])',
                            teachPoint: '@pick(["党校研究生","中政大研究生"])',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务"])',
                            name: '@cname',
                            sex: '@pick(["男", "女"])',
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            'ID|100000000000000000-600000000000000000': 400000000000000000,
                            birthData: '@date',
                            nativePlace: '@province',
                            culture: '@pick(["本科","大专"])',
                            teachMajor:
                                '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","物流管理","体育教育","物理学","日语"])',
                            gradSchool:
                                '@pick(["钦州学院","玉林师范学院","广西师范大学","广西民族大学","钦州学院","广西大学","中南民族大学","北京邮电大学","广西农业职业技术大学"])',
                            gradData: '@date',
                            workData: '@date',
                            'diplomaNum|0000000000000001-90000000000000000': 111111111111111,
                            partyData: '@date',
                            workPlace: '@city',
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
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'grade',
                title: '年级',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'major',
                title: '专业',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'ID',
                title: '身份证号',
                ellipsis: true,
                width: 250,
            },
            {
                dataIndex: 'birthData',
                title: '出生时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'teachMajor',
                title: '所学专业',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'gradSchool',
                title: '毕业院校',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'gradData',
                title: '毕业时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'workData',
                title: '工作时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'diplomaNum',
                title: '毕业证号',
                ellipsis: true,
                width: 250,
            },
            {
                dataIndex: 'partyData',
                title: '入党时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'workPlace',
                title: '工作地点',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 60,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '导出',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看',
                onClick: record => this.handleEdit(record),
            },
        ];

        return {
            columns,
            showOrg: false,
            curOrg: '',
        };
    },
    mounted() {
        this.crudTable = this.$refs['orgTree.platform'];
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleOrgMenuClick(item) {
            this.curOrg = item;
            this.refreshTableData();
            //
        },
        handleOrgTreeSelect(item) {
            this.curOrg = item;
            //
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
