// 教学点用户
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="5" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height: 100%"></a-divider>
                        </a-col>
                        <a-col :span="18">
                            <crud-table
                                ref="crudTable"
                                :showKeywords="true"
                                :commands="tableCommands"
                                :actions="tableActions"
                                :columns="columns"
                                :api="api"
                                :scrollX="600"
                                :defaultPagination="true"
                                :rowSelection="{}"
                            >
                            </crud-table>
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
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        //侧边栏数据
        const treeData = [
            {
                title: '党校研究生',
                key: 'dxyjs',
                children: [
                    {
                        title: '2021',
                        key: '1',
                        children: [
                            {
                                title: '中共广西区委党校',
                                key: '101',
                            },
                        ],
                    },
                    {
                        title: '2020',
                        key: '2',
                        children: [
                            {
                                title: '广西区委党校',
                                key: '201',
                            },
                        ],
                    },
                    {
                        title: '2019',
                        key: '3',
                        children: [
                            {
                                title: '百色市委党校',
                                key: '301',
                            },
                            {
                                title: '广西区委党校',
                                key: '302',
                            },
                            {
                                title: '北海市委党校',
                                key: '303',
                            },
                            {
                                title: '桂林市委党校',
                                key: '304',
                            },
                            {
                                title: '河池市委党校',
                                key: '305',
                            },
                            {
                                title: '贺州市委党校',
                                key: '306',
                            },
                            {
                                title: '来宾市委党校',
                                key: '307',
                            },
                            {
                                title: '柳州市委党校',
                                key: '308',
                            },
                            {
                                title: '梧州市委党校',
                                key: '309',
                            },
                            {
                                title: '玉林市委党校',
                                key: '310',
                            },
                        ],
                    },
                ],
            },
        ];
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            name: '@cname',
                            sex: '@pick(["男","女"])',
                            teachPoint:
                                '@pick(["来宾市委党校", "北海市委党校", "百色市委党校", "钦州市委党校", "河池市委党校", "玉林市委党校", "梧州市委党校"])',
                            birthDate: '@date',
                            workDate: '@date',
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            nativePlace: '@province',
                            culture: '@pick(["本科","专科"])',
                            graduationSchool:
                                '@pick(["广西民族大学","河北师范大学","重庆大学","广西大学","中央党校函授学院","广西师范大学","广西民族大学","天津商业大学","山西财经大学"])',
                            grade: '@pick(["初级","中级","高级","其他"])',
                            duties:
                                '@pick(["第一书记","干部","科员","教师","人事科科员","党委组织委员","副书记","科长","民政办负责人","副组长"])',
                            title: '@pick(["初级","中级","高级","其他"])',
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
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 150,
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',
                width: 150,
            },
            {
                dataIndex: 'birthDate',
                title: '出生年月',
                width: 150,
            },
            {
                dataIndex: 'workDate',
                title: '工作时间',
                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',
                width: 150,
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',
                width: 150,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',
                width: 150,
            },
            {
                dataIndex: 'graduationSchool',
                title: '毕业院校',
                width: 150,
            },
            {
                dataIndex: 'grade',
                title: '级别',
                width: 150,
            },
            {
                dataIndex: 'duties',
                title: '职务',
                width: 150,
            },
            {
                dataIndex: 'title',
                title: '职称',
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
                icon: 'plus',
                title: '新增',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '删除',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '导入系统用户',
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
        ];

        return {
            columns,
            showOrg: true,
            realm: {
                id: '1',
            },
            treeData,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
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
